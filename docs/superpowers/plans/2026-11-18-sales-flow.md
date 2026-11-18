# Pilot alur Sales — rencana implementasi

Tujuan: halaman terpisah dengan analogi CRONUS, enam tahap Sales dan video referensi resmi.
Arsitektur: Astro merender semua materi; custom element kecil meningkatkan navigasi tahap dan pemutaran. Tanpa JS, semua penjelasan dan tautan video tetap tersedia. Tidak ada dependensi baru atau akses sandbox nyata.

Rancangan disetujui pengguna pada 2026-11-18. Dikerjakan langsung tanpa subagen.

- [x] Tambahkan aturan FlowPlayer/ReferenceVideo ke DESIGN.md dan stylesheet terpisah dengan token yang sudah ada.
- [x] Buat FlowPlayer.astro (props steps: label, analogy, document, impact), ReferenceVideo.astro, dan halaman 01-basic/alur-sales.mdx. Mulai dijeda; tahap 8 detik; pause mempertahankan waktu; ulangi kembali awal dan dijeda; navigasi manual menjeda; selesai berhenti di tahap terakhir; tab tersembunyi menjeda.
- [x] Tambahkan e2e/sales-flow.ui.ts: manual/otomatis, jeda/lanjut, reset, akhir, keyboard, reduced motion, tanpa JS, axe, muat video setelah klik. Jalankan bun run build, bun test, dan bunx playwright test pada empat proyek browser yang tersedia.
- [x] Periksa screenshot desktop/mobile, git diff --check, catat hasil nyata dan keterbatasan di PROGRESS.md, lalu buat commit lokal.

Video Microsoft Learn: setup customer dari Sales Quick Start; dilabeli sebagai prasyarat, bukan demo seluruh flow. Embed tidak autoplay, baru dimuat setelah klik dan selalu memiliki tautan sumber. Jika player eksternal gagal, pembaca masih dapat memakai sumber. Jangan menyatakan video mendemonstrasikan BC 29.x tanpa bukti.
