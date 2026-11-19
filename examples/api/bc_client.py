"""Contoh pembelajaran BC SaaS; tidak melakukan jaringan saat diimpor."""
from __future__ import annotations

import os
import time
from collections.abc import Callable, Iterator
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from typing import Any
from urllib.parse import quote, urljoin, urlsplit
from uuid import UUID

import httpx


class BCError(RuntimeError):
    """Pesan aman: tidak menyertakan URL, token, payload atau response body."""


def get_token(client: httpx.Client, tenant: str, client_id: str, secret: str) -> str:
    tenant = str(UUID(tenant))
    client_id = str(UUID(client_id))
    try:
        response = client.post(
            f"https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
            data={"grant_type": "client_credentials", "client_id": client_id,
                  "client_secret": secret,
                  "scope": "https://api.businesscentral.dynamics.com/.default"},
        )
    except httpx.RequestError:
        raise BCError("Token: koneksi gagal; jangan log kredensial.") from None
    if response.status_code != 200:
        raise BCError(f"Token: HTTP {response.status_code}; periksa konfigurasi Entra.")
    token = response.json().get("access_token")
    if not isinstance(token, str) or not token:
        raise BCError("Token tidak ditemukan pada respons.")
    return token


def retry_delay(value: str | None, attempt: int) -> float:
    if value:
        try:
            delay = float(value)
        except ValueError:
            try:
                date = parsedate_to_datetime(value)
                delay = (date - datetime.now(timezone.utc)).total_seconds()
            except (ValueError, TypeError, OverflowError):
                delay = float(2 ** attempt)
        if delay > 60:
            raise BCError("Retry-After melebihi 60 detik; jadwalkan ulang pekerjaan.")
        if delay >= 0:
            return delay
    return float(2 ** attempt)


class BCClient:
    def __init__(self, client: httpx.Client, tenant: str, environment: str,
                 token: str, sleep: Callable[[float], None] = time.sleep) -> None:
        if not environment or environment in {".", ".."}:
            raise ValueError("Nama environment wajib diisi.")
        self.client = client
        self.base = ("https://api.businesscentral.dynamics.com/v2.0/"
                     f"{UUID(tenant)}/{quote(environment, safe='')}/api/v2.0/")
        self.token = token
        self.sleep = sleep

    def request(self, method: str, path: str, *, params: dict[str, str] | None = None,
                payload: dict[str, Any] | None = None, etag: str | None = None) -> dict[str, Any]:
        method = method.upper()
        url = urljoin(self.base, path)
        parsed = urlsplit(url)
        # nextLink tidak boleh membawa bearer token keluar dari API/environment ini.
        if parsed.scheme != "https" or parsed.netloc != "api.businesscentral.dynamics.com" or not url.startswith(self.base):
            raise BCError("URL ditolak: di luar API/environment yang dipilih.")
        if method == "PATCH" and (not etag or etag == "*"):
            raise BCError("PATCH memerlukan ETag spesifik dari GET terbaru.")
        headers = {"Authorization": f"Bearer {self.token}", "Accept": "application/json"}
        if etag:
            headers["If-Match"] = etag
        for attempt in range(3):
            try:
                response = self.client.request(method, url, headers=headers,
                                               params=params, json=payload)
            except httpx.RequestError:
                raise BCError("Koneksi gagal; untuk write, rekonsiliasi sebelum mencoba ulang.") from None
            if method == "GET" and response.status_code in {429, 503} and attempt < 2:
                self.sleep(retry_delay(response.headers.get("Retry-After"), attempt))
                continue
            if response.status_code == 412:
                raise BCError("HTTP 412: baca ulang, bandingkan perubahan; jangan menimpa otomatis.")
            if response.status_code >= 400:
                raise BCError(f"HTTP {response.status_code}; tidak ada retry write otomatis.")
            if response.status_code == 204:
                return {}
            body = response.json()
            if not isinstance(body, dict):
                raise BCError("Respons JSON bukan object.")
            return body
        raise BCError("Batas percobaan baca tercapai.")

    def rows(self, path: str, params: dict[str, str] | None = None) -> Iterator[dict[str, Any]]:
        seen: set[str] = set()
        for _ in range(1000):
            if path in seen:
                raise BCError("nextLink berulang; paging dihentikan.")
            seen.add(path)
            body = self.request("GET", path, params=params)
            for row in body.get("value", []):
                yield row
            path = body.get("@odata.nextLink", "")
            if not path:
                return
            params = None
        raise BCError("Batas 1000 halaman tercapai; pecah pekerjaan.")

    def create_draft(self, company: str, payload: dict[str, Any]) -> dict[str, Any]:
        lines = payload.get("purchaseInvoiceLines")
        if not payload.get("vendorId") or not isinstance(lines, list) or not lines:
            raise ValueError("vendorId dan minimal satu purchaseInvoiceLines wajib.")
        return self.request("POST", f"companies({UUID(company)})/purchaseInvoices", payload=payload)


def from_environment(client: httpx.Client) -> BCClient:
    """Dipanggil pemilik saat praktik; jangan cetak environment atau token."""
    tenant = os.environ["BC_TENANT_ID"]
    token = get_token(client, tenant, os.environ["BC_CLIENT_ID"], os.environ["BC_CLIENT_SECRET"])
    return BCClient(client, tenant, os.environ["BC_ENV"], token)
