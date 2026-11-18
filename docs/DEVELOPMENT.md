# Development dan tes lokal

Gunakan bun dari root proyek. Jangan menaruh kredensial atau data produksi di fixture.

## Perintah utama

- `bun install` memasang dependensi dari lockfile.
- `bun run build` membangun situs dan indeks Pagefind.
- `bun test` menjalankan tes unit VersionBadge.

## Browser test

DevDependencies: `@playwright/test` sebagai runner dan `@axe-core/playwright` untuk pemeriksaan aksesibilitas.

1. Jalankan `bun run build` agar inventaris route pada tes sesuai konten terbaru.
2. Untuk browser bawaan Playwright, lakukan setup sekali: `bunx playwright install chromium`.
3. Jalankan `bunx playwright test`.

Alternatif memakai browser Chromium kompatibel yang sudah terpasang pada Windows:

```powershell
$env:PLAYWRIGHT_BROWSER_EXECUTABLE_PATH = 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe'
bunx playwright test
```

Tes memakai profil baru, bukan profil browser utama. Config mengelola preview sementara di port 4323 dan menghentikannya setelah tes. Kosongkan port tersebut sebelum menjalankan tes.

`e2e/layout.ui.ts` memakai akhiran `.ui.ts` agar tidak ikut runner `bun test`. Inventaris route mengikuti `dist/`; pengujian 404 mencakup direktori track yang saat ini belum memiliki halaman. Sesuaikan ekspektasi ketika halaman track tersebut ditambahkan.

Cakupan: route dan 404, overflow body, desktop 1280px/mobile 360px, light/dark, fokus skip-link, bayangan navigasi, pemenggalan kata tabel, serta warna/aksesibilitas konten Orientasi. Axe pada regression test memeriksa seluruh halaman Orientasi, termasuk header. Tes tambahan memeriksa label tema, spasi footer, Ctrl+K, hasil search, dan Escape.

Screenshot kegagalan dan trace tersimpan di `.codex-tmp/playwright-results/`, yang diabaikan Git. Tes ini bukan pengganti seluruh pemeriksaan keyboard manual, screen reader, atau browser Firefox/WebKit.
