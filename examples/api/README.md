# Contoh client BC API

Contoh belajar untuk CRONUS sandbox. Tidak ada request saat modul diimpor. Pemilik memilih environment sandbox sendiri dan menjalankan praktik; tes otomatis memakai `httpx.MockTransport`, bukan tenant BC.

Jalankan tes dari root proyek:

```sh
uv run --no-project --with httpx==0.28.1 python -m unittest discover -s examples/api -p "test_*.py" -v
```

Jika Windows menolak rename cache environment sementara dengan `Access is denied`, alternatif berikut berhasil diuji dari root proyek; tidak mengubah izin sistem:

```powershell
$env:UV_CACHE_DIR = Join-Path (Get-Location) '.codex-tmp/uv-cache-phase57-retry'
$env:PYTHONDONTWRITEBYTECODE = '1'
uv venv .codex-tmp/api-tests-venv
uv pip install --python .codex-tmp/api-tests-venv/Scripts/python.exe --link-mode copy httpx==0.28.1
uv run --no-project --python .codex-tmp/api-tests-venv/Scripts/python.exe python -m unittest discover -s examples/api -p "test_*.py" -v
```

Jalankan setiap perintah hanya jika sebelumnya berhasil. Environment ini khusus tes dan diabaikan Git. Tujuh tes mock lulus pada CPython 3.14.7; penyebab pasti error rename cache sementara belum dipastikan. Jangan mengubah ACL/antivirus sebagai langkah otomatis.

`httpx` dipasang oleh uv di environment terisolasi, bukan dependency situs atau Python sistem. Untuk praktik, panggil `from_environment()` dengan `httpx.Client(timeout=30, follow_redirects=False)`. Isi BC_TENANT_ID, BC_CLIENT_ID, BC_CLIENT_SECRET, BC_ENV hanya lewat pengelola secret/environment milikmu; jangan simpan file kredensial atau menampilkan token. Company dipilih dari hasil `GET companies`, bukan diasumsikan record pertama. Nama environment tidak membuktikan sandbox: cek tipe environment di Admin Center.

`rows()` mengikuti nextLink dengan batas 1000 halaman; GET 429/503 maksimal tiga percobaan. Retry-After lebih dari 60 detik meminta penjadwalan ulang, bukan retry lebih cepat. POST/PATCH tidak diulang otomatis. Setelah timeout write, cek keadaan BC sebelum mengambil keputusan. ETag wildcard ditolak. Token diperoleh sekali; pemilik menangani pembaruan token setelah expiry. Client ini belum menyediakan penyimpanan checkpoint/idempotency, token cache, importer CSV lengkap, webhook receiver atau posting otomatis.

Contoh JSON draft ada di modul 3B.4. Berikan object hasil `json.load()` kepada `create_draft(company_id, payload)`. Deep insert membuat draft beserta lines; tidak memposting. Payload harus divalidasi terhadap master data, setup dan kebutuhan bisnis sebelum dikirim. Test mock bukan bukti payload sudah berhasil di BC.

Sumber: [API invoice](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/api/dynamics_purchaseinvoice_create), [HTTPX](https://www.python-httpx.org/quickstart/), [MockTransport](https://www.python-httpx.org/advanced/transports/).
