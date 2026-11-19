import json
import unittest

import httpx

from bc_client import BCClient, BCError, get_token

TENANT = "00000000-0000-0000-0000-000000000001"
COMPANY = "00000000-0000-0000-0000-000000000002"


class ClientTests(unittest.TestCase):
    def test_token_form_and_secret_not_in_error(self) -> None:
        def handler(request: httpx.Request) -> httpx.Response:
            self.assertIn(b"client_credentials", request.content)
            self.assertNotIn("demo-secret", str(request.url))
            return httpx.Response(401, text="demo-secret")
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            with self.assertRaises(BCError) as caught:
                get_token(client, TENANT, COMPANY, "demo-secret")
            self.assertNotIn("demo-secret", str(caught.exception))

    def test_paging_keeps_server_query(self) -> None:
        calls: list[httpx.Request] = []
        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(request)
            if len(calls) == 1:
                return httpx.Response(200, json={"value": [{"number": "A"}],
                    "@odata.nextLink": str(request.url.copy_with(query=b"$skiptoken=opaque"))})
            self.assertEqual(request.url.params.get("$skiptoken"), "opaque")
            self.assertNotIn("$top", request.url.params)
            return httpx.Response(200, json={"value": [{"number": "B"}]})
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            api = BCClient(client, TENANT, "Sandbox", "demo-token")
            self.assertEqual(len(list(api.rows("companies", {"$top": "2"}))), 2)

    def test_external_nextlink_rejected_before_sending_token(self) -> None:
        calls: list[str] = []
        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(str(request.url))
            return httpx.Response(200, json={"value": [], "@odata.nextLink": "https://example.invalid/collect"})
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            with self.assertRaises(BCError):
                list(BCClient(client, TENANT, "Sandbox", "demo-token").rows("companies"))
        self.assertEqual(len(calls), 1)

    def test_get_retries_429_with_bounded_attempts(self) -> None:
        calls: list[int] = []
        delays: list[float] = []
        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(1)
            return httpx.Response(429, headers={"Retry-After": "2"})
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            with self.assertRaises(BCError):
                BCClient(client, TENANT, "Sandbox", "demo-token", delays.append).request("GET", "companies")
        self.assertEqual(len(calls), 3)
        self.assertEqual(delays, [2, 2])

    def test_post_timeout_is_not_retried(self) -> None:
        calls: list[int] = []
        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(1)
            raise httpx.ReadTimeout("demo", request=request)
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            with self.assertRaises(BCError):
                BCClient(client, TENANT, "Sandbox", "demo-token").request("POST", "companies", payload={})
        self.assertEqual(len(calls), 1)

    def test_patch_sends_etag_and_stops_on_412(self) -> None:
        calls: list[int] = []
        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(1)
            self.assertEqual(request.headers["If-Match"], 'W/"old"')
            return httpx.Response(412)
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            api = BCClient(client, TENANT, "Sandbox", "demo-token")
            with self.assertRaises(BCError):
                api.request("PATCH", "companies", payload={}, etag='W/"old"')
            with self.assertRaises(BCError):
                api.request("PATCH", "companies", payload={}, etag="*")
        self.assertEqual(len(calls), 1)

    def test_draft_uses_deep_insert_without_posting(self) -> None:
        calls: list[str] = []
        def handler(request: httpx.Request) -> httpx.Response:
            calls.append(str(request.url))
            self.assertEqual(len(json.loads(request.content)["purchaseInvoiceLines"]), 1)
            return httpx.Response(201, json={"id": COMPANY, "status": "Draft"})
        with httpx.Client(transport=httpx.MockTransport(handler)) as client:
            result = BCClient(client, TENANT, "Sandbox", "demo-token").create_draft(COMPANY,
                {"vendorId": TENANT, "purchaseInvoiceLines": [{"lineType": "Item", "quantity": 1}]})
        self.assertEqual(result["status"], "Draft")
        self.assertEqual(len(calls), 1)
        self.assertNotIn("Microsoft.NAV.post", calls[0])


if __name__ == "__main__":
    unittest.main()
