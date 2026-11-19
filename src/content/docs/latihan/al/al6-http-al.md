---
title: "AL6 — Integrasi HTTP Client dan Parsing JSON"
bc_version_verified: "29.x"
last_verified: "2026-11-19"
level: Intermediate
sidebar:
  order: 6
---

**Estimasi waktu:** 60 menit. **Tujuan:** Menggunakan HttpClient dan tipe data JSON di AL untuk mengonsumsi API eksternal secara aman, mem-parsing respons, serta menangani error timeout dan kegagalan status HTTP.

## Prasyarat

Menyelesaikan modul [AL-2.6 Keamanan dan error handling](/04-al-developer/al-2-intermediate/06-keamanan-error/) dan [AL-2.8 HTTP dan JSON](/04-al-developer/al-2-intermediate/08-http-json/). Tersedia koneksi internet pada server/container BC untuk menjangkau endpoint API publik.

## Langkah

1. Tentukan endpoint publik demo yang bebas kredensial atau gunakan mock endpoint HTTPS (misal placeholder service publik untuk data kurs atau pos).
2. Buat Codeunit baru (ID 50219, prefix MYP) berisi procedure `FetchExternalData(EndpointUrl: Text)`.
3. Inisialisasi `HttpClient`, `HttpRequestMessage`, dan konfigurasi method GET beserta Accept header `application/json`.
4. Bungkus panggilan `Client.Send` dalam evaluasi boolean. Tangani kegagalan koneksi jaringan atau DNS resolver tanpa menimbulkan crash unhandled.
5. Periksa status HTTP via `ResponseMessage.HttpStatusCode()` dan `ResponseMessage.IsSuccessStatusCode()`. Jika bukan 2xx, ambil potongan teks respons dan tampilkan pesan error yang ramah pengguna.
6. Baca body dengan `ResponseMessage.Content().ReadAs(BodyText)`, lalu gunakan `JsonToken.ReadFrom(BodyText)` dan `JsonObject` untuk mengekstrak field nilai spesifik.
7. Buat Action pada Customer Card atau Vendor Card untuk memicu pemanggilan procedure ini dan tampilkan hasil nilai ekstrak melalui dialog Message.
8. Pastikan tidak ada hardcoded credentials, token rahasia, atau string koneksi privat di dalam repositori kode.

## Kriteria lulus

- Pemanggilan API sukses menampilkan payload yang ter-parse dengan benar pada dialog konfirmasi BC.
- Skenario negatif (URL salah atau server mati) tertangani anggun dan memunculkan notifikasi error yang jelas bagi user.
- Kode bersih dari API secret, token privat, maupun hardcoded URL sensitif.
- Kompilasi dan publish sukses di sandbox pengujian.

## Hint

<details><summary>Lihat hint</summary>

Jangan lupa mengatur properti "Allow HttpClient Requests" pada halaman **Extension Management** di Business Central client jika pengujian dijalankan pada lingkungan on-premise atau container Docker.

</details>

## Sumber resmi

- [httpclienttype](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/httpclient/httpclient-data-type).
- [jsontokentype](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/methods-auto/jsontoken/jsontoken-data-type).

**Status:** Belum dijalankan. Kompilasi/publish dan actual result harus diisi pemilik setelah praktik. Tes situs tidak membuktikan gate AL lulus.
