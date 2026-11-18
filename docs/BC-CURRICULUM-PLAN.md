# BC Handbook — Rencana Kurikulum & Spesifikasi Situs

> Dokumen ini adalah **brief untuk AI agent** yang akan membangun situs "BC Handbook":
> kurikulum Dynamics 365 Business Central (BC) dari dasar sampai mahir, cheatsheet, dan latihan.
> Pemilik: Irfan. Bahasa konten: **Indonesia, istilah teknis tetap English**.
> Terakhir diverifikasi: 2026-11-18. Versi BC terbaru saat itu: **29.x (2026 release wave 2, rilis Oktober 2026)**.

---

## Status penerapan dan keputusan proyek — 2026-11-18

- Dokumen ini menggabungkan lampiran kurikulum terbaru dengan status proyek. Penambahan rencana tidak berarti materi, folder, sidebar, atau kode AL sudah diterapkan. Detail bukti dan batas pengujian berada di `docs/PROGRESS.md`.
- Fase 5.0–5.6 selesai sebagai materi situs; Fase 5.6 mencakup 9 modul BA, indeks, cheatsheet #15–#16 dan latihan E1–E3. Status ini tidak menyatakan praktik sandbox atau UAT sudah dijalankan. Fase 5.7, 5.7a–5.7c, 5.8 dan 5.9 belum selesai; jalur AL baru belum dimulai. Urutan implementasi tetap tabel Bagian 5 sampai pemilik menyetujui perubahan prioritas.
- Pilot alur Sales interaktif (putar/jeda/ulang/per tahap) dan video referensi sudah tersedia. Perluasan ke materi lain belum dijadwalkan; perilaku komponen mengikuti `docs/DESIGN.md`.
- Pembaruan UI mengikuti Lampiran A `docs/DESIGN.md`: U1–U2 selesai; perbaikan layout, TOC akhir halaman, dan urutan latihan Basic → Intermediate → Expert telah di-commit terpisah. U3 belum dimulai; sebagian navigasi terkait U4 sudah disesuaikan, tetapi U4 belum ditutup. U5–U6 belum selesai.
- Situs tetap lokal. Vercel/Cloudflare Pages adalah pilihan deployment kelak, bukan izin untuk push atau deploy sekarang.
- Klaim teknis versi/runtime, perubahan table extension, dan deprecation SOAP/OData pada lampiran belum diverifikasi ulang dalam pembaruan dokumen ini; tanggal verifikasi di bagian pembuka berasal dari lampiran. Verifikasi sumber resmi dan symbols diperlukan sebelum materi terkait dipublikasikan atau kode dianggap benar.
- Temuan yang perlu keputusan: AL9 bersifat opsional pada Bagian 6.5 tetapi tercantum dalam gate AL-3; Bagian 6.6 menyebut capstone Invoice-to-BC, sementara Bagian 6.4 bernama Spreadsheet-to-BC. Isi lampiran dipertahankan sampai diputuskan. `AGENTS.md` masih menyebut AL opsional kecuali diminta; permintaan terbaru memasukkan AL ke rencana, tanpa memulai implementasinya.

---

## 0. Aturan kerja untuk AI agent (WAJIB dibaca dulu)

1. **Kerja per langkah kecil.** Selesaikan satu langkah → berikan *commit message* → update `docs/PROGRESS.md` → baru lanjut. Jangan membangun semuanya sekaligus.
2. **Jangan menyalin teks Microsoft Learn.** Tulis ulang dengan kata sendiri, ringkas, lalu **tautkan ke sumber resmi**. Situs ini = "contekan + peta", bukan salinan dokumentasi.
3. **Setiap halaman wajib punya front-matter** `bc_version_verified` (mis. `29.1`) dan `last_verified` (tanggal). BC rilis 2 major wave/tahun + update bulanan, jadi konten cepat usang. Halaman tanpa field ini dianggap belum selesai.
4. **Dilarang menaruh data rahasia di repo**: tenant ID, client secret, nama environment produksi, data pelanggan/perusahaan, screenshot yang berisi data nyata. Pakai placeholder `<TENANT_ID>`, `<ENV>`, `<COMPANY_ID>`. Semua contoh memakai **data demo (CRONUS)** dan **sandbox**.
5. **Jika ragu soal fakta BC → tulis `> ⚠️ Verifikasi:` di halaman**, jangan mengarang. Nomor tabel/page/event signature harus dicek ke docs atau symbols AL sebelum dianggap final.
6. Semua halaman harus **mobile-friendly** dan **bisa dicari** (full-text search) — situs ini dipakai sambil bekerja.
7. **Semua keputusan UI mengikuti `docs/DESIGN.md`** (token, komponen, layout, larangan). Jika permintaan bertentangan dengan `docs/DESIGN.md`, `docs/DESIGN.md` menang; jika butuh komponen baru, **tambahkan dulu ke `docs/DESIGN.md`** lalu pakai. Jangan menambah font, warna, atau library UI di luar yang tercantum.
8. **Aturan khusus kode AL.** (a) Agent tidak punya sandbox BC, jadi **semua snippet AL berstatus *belum dikompilasi*** sampai pemilik mengompilasi dan menjalankannya di sandbox sendiri; tandai di halaman dengan `:::caution[Belum dikompilasi]` dan ganti menjadi `:::tip[Dikompilasi di 29.x — <tanggal>]` setelah pemilik memverifikasi. (b) **Dilarang** menaruh kode, nama objek, ID range, skema, atau nama klien milik kantor/klien di repo; contoh memakai prefix demo `MYP` dan data CRONUS. (c) Kode AL yang dibuat dengan bantuan AI **wajib dikompilasi dan diuji**; signature event, nama field, dan nomor objek wajib dicocokkan dengan symbols, bukan dari ingatan model. (d) Pastikan bahasa `al` ter-highlight di code block; bila tidak didukung, pakai teks biasa dan laporkan — **jangan menambah dependensi**.

---

## 1. Keputusan arsitektur situs

### Konteks
Situs dibaca berulang saat bekerja → prioritas: **cepat dibuka, search bagus, gampang di-update, murah dirawat**. Konten dominan teks/tabel/code snippet.

### Opsi
| Opsi | Pro | Kontra |
|---|---|---|
| **A. Astro Starlight** | Content-first (Markdown/MDX), search (Pagefind) bawaan, dark mode, sidebar otomatis, sangat ringan | Interaktivitas custom (progress tracker) perlu "island" React; ekosistem lebih kecil dari Docusaurus |
| **B. Docusaurus** | Matang, versioning docs, plugin banyak, React | Lebih berat, search butuh Algolia/plugin lokal, config lebih banyak |
| **C. Nextra (Next.js)** | Familiar jika sudah biasa Next.js, mudah tambah komponen React | Lebih terikat Next.js; perubahan major bisa memaksa migrasi |
| **D. Custom Next.js + CMS sendiri** | Bebas penuh | Over-engineering; waktu habis di membangun situs, bukan belajar BC |

### Rekomendasi: **A. Astro Starlight + Pagefind**, deploy ke Vercel (atau Cloudflare Pages).
Alasan: tujuan utamanya *belajar & contekan*, bukan membuat produk web. Konten = file `.md` di Git → mudah di-update oleh AI agent dan di-review lewat diff.
**Fallback**: jika butuh banyak komponen interaktif → pindah ke C (Nextra).

### Risiko
- Jebakan "menyempurnakan situs, bukan belajar" → batasi Fase pembangunan situs (Bagian 5) maksimal ~20% total waktu.
- Konten usang → wajib `last_verified` + jadwal review tiap rilis wave (April & Oktober).

---

## 2. Struktur folder yang diminta

```
/
├─ AGENTS.md                   # aturan kerja agent
├─ docs/
│  ├─ BC-CURRICULUM-PLAN.md    # kurikulum dan spesifikasi situs
│  ├─ PROGRESS.md              # checklist langkah + commit message terakhir
│  └─ DESIGN.md                # design system (sumber kebenaran UI)
├─ src/content/docs/
│  ├─ index.mdx                # landing: "mulai dari mana?" + link cepat ke cheatsheet
│  ├─ 00-orientasi/
│  ├─ 01-basic/
│  ├─ 02-intermediate/
│  ├─ 03-expert/
│  │   ├─ business-analysis/
│  │   ├─ integrasi-api/
│  │   └─ admin-devops/
│  ├─ 04-al-developer/          # jalur paralel, lihat Bagian 3.1
│  │   ├─ al-1-fundamentals/
│  │   ├─ al-2-intermediate/
│  │   └─ al-3-advanced/
│  ├─ cheatsheets/
│  ├─ latihan/
│  │   ├─ basic/ ├─ intermediate/ ├─ expert/ └─ al/
│  ├─ glosarium.md
│  └─ referensi.md
└─ astro.config.mjs
```

**Template halaman materi** (semua modul harus ikut): `Tujuan belajar` → `Konsep singkat` → `Langkah di BC (klik-klik)` → `Cheat box` (ringkasan 5–8 baris) → `Kesalahan umum` → `Latihan terkait` → `Sumber resmi`.

---

## 3. Kurikulum

Estimasi total: **± 10–12 minggu** jika ±1–1,5 jam/hari. Setiap level punya *gate* (syarat lulus) sebelum lanjut. **Jalur AL Developer (Bagian 3.1) berjalan paralel dan menambah ± 8–11 minggu kerja bertahap** (perkiraan kasar, bukan data).

### Level 0 — Orientasi (1–2 hari)
- Apa itu BC: ERP SMB berbasis cloud (SaaS), modul inti: Finance, Sales, Purchasing, Inventory, (opsional: Manufacturing, Warehouse, Service, Projects).
- Online vs on-premises; **environment**: Production vs Sandbox; **company**; **tenant**; **Admin Center**.
- Siklus rilis: 2 *release wave* per tahun (Wave 1 ≈ April, Wave 2 ≈ Oktober) + update bulanan (mis. 29.1). Sejak September 2026 Microsoft berhenti menerbitkan *Release Plans* dan memindahkan info fitur baru ke **AI at Work roadmap**.
- Lokalisasi: **Indonesia = partner localization di atas W1 (global)**; pajak PPN/e-Faktur/PPh biasanya lewat app partner di AppSource. Catat app lokalisasi apa yang dipakai perusahaan/klien.
- Peta UI: Role Center, **Tell Me / search (Alt+Q)**, FactBoxes, Fast Tabs, filter & *Personalize*, *Page Inspection* (Ctrl+Alt+F1).
- **Gate:** bisa membuka sandbox, ganti company, mencari halaman lewat Tell Me, dan menjelaskan beda sandbox vs production.

### Level 1 — BASIC: Operasional & konsep inti (2–3 minggu)
| Modul | Isi | Output belajar |
|---|---|---|
| 1.1 Navigasi & produktivitas | Role Center, search, filter, list vs card, Edit in Excel, bookmark, keyboard shortcuts | Bisa bergerak tanpa mouse berlebihan |
| 1.2 Master data | Customer, Vendor, Item, G/L Account, Bank Account, Dimension (konsep), Templates | Bisa membuat & mengubah master data dengan benar |
| 1.3 Chart of Accounts & General Ledger | Struktur akun, posting, General Journal, G/L Entry, periode akuntansi | Paham "uang masuk ke buku besar lewat posting" |
| 1.4 Sales (Order-to-Cash) | Quote → Order → Shipment → Invoice → Posted; Customer Ledger; Payment & Apply | Satu siklus penjualan end-to-end |
| 1.5 Purchasing (Purchase-to-Pay) | Quote → Order → Receipt → Invoice → Posted; Vendor Ledger; Payment Journal | Satu siklus pembelian end-to-end |
| 1.6 Inventory dasar | Item card, UoM, costing method (konsep), Item Ledger, Item Journal, stok & availability | Paham stok berubah karena *posting*, bukan edit manual |
| 1.7 Laporan dasar | Report, Trial Balance, Aged Receivables/Payables, Account Schedules (pengenalan) | Bisa menarik & export laporan |
| 1.8 Konsep posting | Posting vs release, Posted documents, Undo/Correct/Cancel, Reverse | Tahu cara membetulkan kesalahan tanpa merusak ledger |

**Gate Level 1:** lulus latihan B1–B8 (Bagian 6) tanpa melihat contekan lebih dari 2 kali.

### Level 2 — INTERMEDIATE: Konfigurasi & otomasi (3–4 minggu)
| Modul | Isi |
|---|---|
| 2.1 Setup inti | General Ledger Setup, Sales & Receivables Setup, Purchases & Payables Setup, Inventory Setup, No. Series, Allowed Posting Dates (User Setup) |
| 2.2 **Posting Groups** | General Business PG × General Product PG → akun G/L; Customer/Vendor/Inventory Posting Group; **VAT Posting Setup** (inti pajak) |
| 2.3 Dimensions | Global & Shortcut Dimensions, Dimension Combinations, Default Dimensions, Analysis Views |
| 2.4 Approval & Workflow | Approval Workflow, Approval User Setup, Workflow Templates, Notification |
| 2.5 Bank & Cash | Bank Account Reconciliation, Payment Reconciliation Journal, Payment Terms, Payment Methods |
| 2.6 Fixed Assets & Periodic | FA Setup, Depreciation Book, Depreciation run, Allocation, Recurring Journal, Period closing (konsep Year-end) |
| 2.7 Currency & Intercompany | Currency, Exchange Rates, Adjust Exchange Rates, (opsional) Intercompany |
| 2.8 **Company configuration & data migration (RapidStart Services)** | **Configuration Worksheet** (merencanakan & melacak tabel setup yang akan dikonfigurasi/dimigrasi) → **Config. Package** (pilih tabel & field via *Include Field*, *Assign Package*, export/import `.rapidstart` atau Excel, validasi error, *Apply Package*) → **Configuration Template** (nilai default untuk record master data) → **Configuration Questionnaire** (mengumpulkan informasi setup dari user bisnis); paket default bawaan BC online & cara menyalinnya; batasan versi & performa; plus Edit in Excel, Import Bank Statement, Data Exchange Definition |
| 2.9 Permissions & Users | Permission Set, Permission Set Group, User Group, Entra/Microsoft 365 license mapping, prinsip least privilege |
| 2.10 Reporting lanjutan | Account Schedules/Financial Reports, Power BI apps, Excel reports, Report layouts (Word/RDLC/Excel) |
| 2.11 Power Platform | Power Automate (trigger BC), Power Apps (konektor), Dataverse (pengenalan) |
| 2.12 Extensions & AppSource | Install/uninstall app, Extension Management, per-tenant extension vs AppSource app, **Feature Management** |
| 2.13 Copilot & agents (sisi pengguna) | Copilot di BC, **Sales Order Agent**, **Payables Agent**, Expense Agent (preview saat penulisan), review & approval hasil agent, audit log |
| 2.14 **Job Queue & proses latar belakang** | Job Queue Entries & Log Entries, jadwal posting/report/codeunit, status Error/Ready/In Process, restart job — penting untuk integrasi & troubleshooting agent. ⚠️ Verifikasi nama halaman |
| 2.15 **Audit & tata kelola data** | Change Log (setup & lihat perubahan), Retention Policies, klasifikasi data/privasi (pengenalan). ⚠️ Verifikasi nama halaman di versi terpasang |
| 2.16 Setup bantu (*Assisted Setup* & *Manual Setup*) | Cara BC memandu setup (wizard) vs setup manual per area; kapan pakai yang mana; *Copy Company* untuk membuat salinan uji |
| 2.17 *(opsional)* Penagihan & arus kas | Reminders, Finance Charge Memos, Cash Flow Forecast (pengenalan) |

**Gate Level 2:** bisa men-setup company baru (CRONUS clean) sampai bisa posting sales & purchase dengan pajak dan dimension, dan menjelaskan *kenapa* posting gagal dari pesan error.

### Level 3 — EXPERT: pilih track (4–6 minggu, bisa paralel/bertahap)

#### Track 3A — Business Analysis (**prioritas tinggi** — sesuai role di kantor)
- Peran BA di proyek BC: menjembatani kebutuhan bisnis & solusi teknis; bertanggung jawab atas requirements, gap-fit, UAT, dan dokumentasi fungsional.
- **Requirements gathering:** teknik wawancara stakeholder, workshop, observasi proses; output: Business Requirements Document (BRD) / Functional Requirements Document (FRD).
- **Process mapping:** mendokumentasikan proses bisnis as-is & to-be; notasi sederhana (flowchart/swimlane); identifikasi pain point & peluang otomasi di BC.
- **Gap-fit analysis:** membandingkan proses bisnis vs fitur standar BC; kategorisasi: Fit (standar) / Gap (butuh konfigurasi / customization / app pihak ketiga / workaround); matriks prioritas.
- **Functional specification:** mendokumentasikan solusi untuk setiap gap; menjadi brief untuk developer/konsultan teknis; format: deskripsi, acceptance criteria, mock-up jika perlu.
- **UAT (User Acceptance Testing):** menyusun test scenario & test script berdasarkan requirements; mendampingi user menjalankan UAT; melacak defect & sign-off.
- **Change management & training (pengenalan):** training plan, user adoption, dokumentasi SOP untuk end-user.
- **Sertifikasi terkait:** MB-800 (Business Central Functional Consultant) — cek status & syarat terbaru di Microsoft Learn.
- **Output:** satu dokumen gap-fit analysis untuk skenario demo (mis. perusahaan dagang kecil migrasi dari spreadsheet ke BC), lengkap dengan BRD ringkas, matriks gap-fit, dan rencana UAT.

#### Track 3B — Integrasi & API (**prioritas tinggi** — permintaan atasan)
- Jenis endpoint: **Standard API v2.0**, **Custom API page** (PageType = API), **OData v4 web services**, SOAP (legacy), webhooks/subscriptions.
- Auth: **OAuth 2.0**. Service-to-service (client credentials) vs delegated (authorization code). Registrasi app di **Microsoft Entra** + halaman **Microsoft Entra Applications** di BC + permission set (mis. D365 BUS FULL ACCESS / least privilege).
- OData: `$filter`, `$select`, `$expand`, `$top`, `$orderby`, `$skiptoken`/paging; **ETag + `If-Match`** untuk PATCH/DELETE; deep insert; bound action `Microsoft.NAV.post`.
- Pola integrasi: polling vs webhook, idempotency, retry/backoff, throttling (HTTP 429), logging & correlation ID.
- Automation APIs (setup company/tenant) — kasus khusus.
- **Perubahan platform yang memengaruhi integrasi:** di v29 halaman Microsoft tidak bisa lagi diekspos sebagai **SOAP** endpoint; mulai **v30** tidak bisa diekspos sebagai **OData** endpoint — salin kode halaman ke per-tenant extension (PTE) dan host di sana, atau gunakan API standar v2.0 / custom API page. ⚠️ Verifikasi di halaman *deprecated features* resmi.
- **Output:** client Python (httpx) yang membuat Purchase Invoice draft dari data JSON; dokumentasi endpoint yang dipakai.

#### Track 3C — AL Developer (**prioritas tinggi** — pekerjaan di kantor)
Karena AL menjadi tugas kerja, materi ini **tidak lagi satu track tipis**: dipecah menjadi **Jalur AL Developer (AL-1 → AL-3)** di Bagian 3.1 dan berjalan **paralel** dengan Level 2–3. Isi lama (setup, objek, event-driven, data, kualitas, output extension kecil) dipindahkan ke jalur tersebut.

#### Track 3D — Admin & DevOps (opsional)
- Admin Center: environments (create/copy/restore), update window, app management, telemetry.
- Environment strategy: sandbox per pengembang, UAT, Production; alur promosi extension.
- Upgrade: 2 wave/tahun; cek *features becoming mandatory*, obsolete, breaking changes; test regression.
- CI/CD: AL-Go for GitHub (konsep), BcContainerHelper (konsep), artifact & Docker sandbox.
- Observability: Application Insights/KQL untuk error & performa.

**Gate Level 3:** minimal **Track 3A (Business Analysis) dan Track 3B (API) selesai dengan output masing-masing** (Bagian 6.3–6.4). **Jalur AL punya gate sendiri** (Bagian 3.1).

### 3.1 Jalur AL Developer (AL-1 → AL-3) — **prioritas tinggi** (pekerjaan di kantor)

**Kenapa jalur sendiri, bukan satu track:** AL menghasilkan *kode yang dikirim ke environment nyata*, jadi salah sedikit lebih mahal dan kurva belajarnya paling curam. Jalur ini berjalan **paralel** dengan Level 2–3: AL-1 boleh dimulai begitu Level 1 selesai. Estimasi (perkiraan kasar): AL-1 2–3 minggu · AL-2 3–4 minggu · AL-3 3–4 minggu.

**Konteks versi (diverifikasi 2026-11-18; sebagian butir bersumber blog komunitas — cek ulang ke "What's new 29.0" di Microsoft Learn sebelum publish):**
- BC 29 (2026 release wave 2) memakai **AL runtime 18.0**; BC 28 = 17.0, BC 27 = 16.0. Atur `"runtime"` di `app.json` sesuai target.
- **Model data table extension berubah di v29:** semua field tabel AL (termasuk dari extension) disimpan dalam satu tabel SQL; kode AL tidak perlu diubah. Key/index kini dapat mencakup field base table + field table extension, dan index dapat diaktif/nonaktifkan dari kode AL. Compiler memberi peringatan **AL0914** (tabel) dan **AL0915** (table extension) bila jumlah field biasa terlalu banyak (batas kolom SQL).
- **Perubahan yang memengaruhi integrasi:** v29 menghapus kemampuan mengekspos halaman Microsoft sebagai **SOAP**; mulai **v30** tidak bisa sebagai **OData** — salin kode halaman ke per-tenant extension (PTE).
- Kerangka acuan topik sertifikasi: **MB-820** (BC Developer). Skills measured bisa berubah — cek halaman resmi.

**Memakai AI untuk menulis AL:** beri konteks aturan komunitas **AL Guidelines** (alguidelines.dev, inisiatif "Vibe Coding for AL"), tetapi tetap wajib kompilasi + uji (aturan 8 di Bagian 0). Jangan mengandalkan signature event dari ingatan model.

#### AL-1 — Fundamentals (`LevelBadge: Basic`)
| Modul | Isi |
|---|---|
| AL-1.1 Peta extension model | Base app vs extension; **PTE vs AppSource app**; sandbox vs production; `app.json` (`id`, `name`, `publisher`, `version`, `platform`, `application`, **`runtime`**, `idRanges`, `dependencies`); prefix & ID range |
| AL-1.2 Environment dev | VS Code + AL Language extension; `AL: Go!`; `launch.json` (sandbox online, authentication); `AL: Download Symbols`; publish (F5 / Ctrl+F5); AL Explorer. **Selalu sandbox sendiri, tidak pernah production.** |
| AL-1.3 Dasar bahasa | Tipe data (Integer, Decimal, Text/Code, Boolean, Date/DateTime, Enum, List/Dictionary), `var`, procedure & aksesibilitas (`local`/`internal`), control flow, operator ternary, `Label`, `Message`/`Error`/`Confirm` |
| AL-1.4 Objek inti | Table, TableExtension, Page (Card/List/Document), PageExtension, Enum/EnumExtension, Codeunit; properti penting (`Caption`, `ToolTip`, `ApplicationArea`, `DataClassification`) |
| AL-1.5 Akses data | `Record`; `Get`, `FindSet`, `FindFirst`; `SetRange`/`SetFilter`; `Insert`/`Modify`/`Delete` dengan/tanpa trigger; `Validate` vs assignment; FlowField & `CalcFields`; `SetLoadFields`; transaksi & `Commit` (hindari) |
| AL-1.6 Permission & setup | Objek Permission set (kenapa tiap objek butuh permission); pola Setup table + Setup page (single record) |
| AL-1.7 Debug pertama | AL debugger, breakpoint, Page Inspection, membaca pesan error kompilasi |

**Output AL-1:** extension "MYP Hello BC" (tableext + pageext + page + codeunit + permission set) terpublish di sandbox CRONUS.
**Gate AL-1:** latihan AL1–AL3 lulus; bisa menjelaskan beda PTE vs AppSource dan fungsi `app.json`.

#### AL-2 — Intermediate (`LevelBadge: Intermediate`)
| Modul | Isi |
|---|---|
| AL-2.1 Event-driven | `EventSubscriber`; integration vs business events; pola `IsHandled`; parameter `var`; cara menemukan event (AL Explorer, Event Recorder ⚠️ verifikasi); `SingleInstance` & manual binding. **Jangan ubah base app — extend lewat event.** |
| AL-2.2 Posting & dokumen | Alur posting Sales/Purchase (Codeunit 80 / 90 ⚠️ verifikasi); validasi sebelum posting dengan `ErrorInfo` (actionable error); menambah field ke dokumen terposting lewat event |
| AL-2.3 Page lanjutan | Actions & pengelompokan (`area(Promoted)` / `actionref` ⚠️ verifikasi), FactBox, Document page, visibilitas dinamis, page background task (pengenalan) |
| AL-2.4 Report | Report & ReportExtension; layout Word/Excel/RDLC; dataset; request page |
| AL-2.5 Performa dasar | Query object, `SetCurrentKey`, `CalcSums`, `ModifyAll`/`DeleteAll`, `SetLoadFields`; implikasi v29 (satu tabel SQL, key lintas base + extension, AL0914/AL0915) |
| AL-2.6 Keamanan & error | Permission set group, `Permissions`/`InherentPermissions`; `IsolatedStorage`, `SecretText` ⚠️ verifikasi; `TryFunction`, `ErrorInfo`, collectible errors; `DataClassification` |
| AL-2.7 Pola ekstensibel | `interface`/`implements`, extensible enum, ekstensi interface; menyediakan event sendiri untuk extension lain |
| AL-2.8 HTTP & JSON dari AL | `HttpClient`, `JsonObject`/`JsonToken`; OAuth 2.0 dari AL; pola memanggil API eksternal dengan retry |
| AL-2.9 Custom API page | `PageType = API`, `APIPublisher`/`APIGroup`/`APIVersion`, `EntityName`/`EntitySetName`, `ODataKeyFields = SystemId`; versi API; hubungan dengan deprecation OData/SOAP (Track 3B) |

**Output AL-2:** extension "Approval + validasi + API" (Setup, event yang memblokir posting dengan `ErrorInfo`, custom API page, satu report dengan layout Word, permission set).
**Gate AL-2:** latihan AL4–AL6 lulus; semua signature event dicocokkan dengan symbols.

#### AL-3 — Advanced (`LevelBadge: Expert`)
| Modul | Isi |
|---|---|
| AL-3.1 Testing | Test codeunit (`Subtype = Test`), `[Test]`, `TestPage`, `[HandlerFunctions]`, library test (Library - Sales dst. ⚠️ verifikasi dependensi), pola Given/When/Then, AL Test Tool, isolasi test |
| AL-3.2 Debug & diagnosa | Debugger lanjutan, snapshot debugging ⚠️ verifikasi, profiler; telemetry (`Session.LogMessage`, Feature Telemetry); Application Insights & KQL |
| AL-3.3 Siklus hidup & upgrade | Install & Upgrade codeunit, upgrade tags, `ObsoleteState`/`ObsoleteReason`/`ObsoleteTag`, aturan breaking change, menaikkan `runtime`/`application` tiap wave |
| AL-3.4 Kualitas kode | CodeCop, UICop, PerTenantExtensionCop, AppSourceCop; file ruleset; AL Guidelines komunitas |
| AL-3.5 Performa & background | Set-based vs row-by-row, locking, `StartSession`/TaskScheduler/Job Queue, page background task |
| AL-3.6 DevOps | Git; **AL-Go for GitHub** (template PTE); pipeline compile → test → publish ke sandbox; BcContainerHelper (konsep); terjemahan XLIFF |
| AL-3.7 PTE vs AppSource (pengenalan) | Kapan PTE cukup; apa yang ditambah validasi AppSource |
| AL-3.8 *(opsional)* AI di AL | Copilot extensibility, Azure OpenAI dari AL, pengembangan agent — ⚠️ status (GA/Preview) dan biaya |

**Output AL-3:** capstone AL (Bagian 6.6).
**Gate AL-3:** latihan AL7–AL9 + capstone AL lulus; semua snippet berstatus jelas (dikompilasi / belum).

### Modul opsional (hanya jika dibutuhkan pekerjaan)
Manufacturing (BOM, Routing, Production Order), Warehouse (Location, Bin, Put-away/Pick), Service Management, Projects/Jobs, Cost Accounting, Consolidation, Localization Indonesia (PPN, e-Faktur, PPh — **ikuti app partner yang dipakai**), **AI/Agents/MCP** (Copilot, Sales Order Agent, Payables Agent, Agent Designer, MCP server BC — pelajari jika role berkembang ke arah AI integration).

---

## 4. Daftar cheatsheet yang harus dibuat (`/cheatsheets`)

Format tiap cheatsheet: **1 halaman, tabel/ringkas, bisa dicetak, ada tombol "copy" pada code block**.

1. **Navigasi & Shortcut** — Tell Me (Alt+Q), Page Inspection (Ctrl+Alt+F1), filter, Edit in Excel, Personalize, kolom/field cepat. ⚠️ Verifikasi daftar shortcut ke halaman "keyboard shortcuts" resmi sebelum publish.
2. **Alur Dokumen (Document Flow)** — Sales: Quote → Order → Shipment → Invoice → Posted; Return Order & Credit Memo; Purchase: Quote → Order → Receipt → Invoice; apa yang terposting pada setiap tahap (ledger mana yang tercipta).
3. **Ledger Entries Map** — G/L Entry, Cust./Vendor Ledger Entry (+ Detailed), Item Ledger Entry, Value Entry, Bank Account Ledger Entry, FA Ledger Entry: *kapan terbentuk* & *dipakai untuk apa*.
4. **Posting Groups Matrix** — tabel "Gen. Bus. PG × Gen. Prod. PG → Sales/Purchase Account", VAT Bus. × VAT Prod. → VAT Account, cara men-debug "posting group tidak lengkap".
5. **Troubleshooting Error Umum** — tabel: pesan error → penyebab umum → tempat memperbaiki (mis. posting date di luar Allowed Posting Dates, Posting Group kosong, Dimension wajib belum diisi, No. Series habis, permission, periode terkunci, OAuth 401/403).
6. **Setup Checklist** — urutan setup company baru & halaman Setup penting (G/L Setup, Sales/Purchase Setup, No. Series, User Setup, VAT Setup).
7. **Pre-Posting Checklist** — 10 hal yang dicek sebelum posting (tanggal, currency, dimension, pajak, payment terms, availability stok, dst.).
8. **Nomor Objek Penting** — Table: 18 Customer, 23 Vendor, 27 Item, 15 G/L Account, 36/37 Sales Header/Line, 38/39 Purchase Header/Line, 17 G/L Entry, 21 Cust. Ledger Entry, 25 Vendor Ledger Entry, 32 Item Ledger Entry, 5802 Value Entry; Codeunit 80 Sales-Post, 90 Purch.-Post. ⚠️ **Verifikasi** semua nomor di sandbox (Page Inspection / symbols) sebelum publish.
9. **API & OData Cheatsheet** — lihat Bagian 4.1.
10. **AL Cheatsheet** — lihat Bagian 4.2.
11. **Glosarium ID ↔ EN** — Bagan Akun = Chart of Accounts; Buku Besar = General Ledger; Faktur Pajak = (tax invoice) e-Faktur; PPN = VAT; PPh = Withholding Tax; Jurnal Umum = General Journal; Piutang = Receivables; Utang = Payables; Persediaan = Inventory; Aset Tetap = Fixed Assets; Rekonsiliasi Bank = Bank Reconciliation; dll.
12. **Release & Upgrade Checklist** — apa yang dicek tiap wave (feature mandatory, obsolete, test extension, update app AppSource).
13. **AI/Agent Safety Checklist** *(opsional)* — human review, scope permission minimal, audit log, biaya, data sensitif, evaluasi akurasi.
14. **Configuration Worksheet / RapidStart** — alur worksheet → package → template → questionnaire, urutan langkah export/import/apply, error umum; lihat Bagian 4.3.
15. **Gap-Fit Analysis Template** — tabel kebutuhan bisnis × fitur BC standar → Fit / Gap / Workaround; kolom: prioritas, rekomendasi solusi, estimasi effort. Lihat Bagian 4.4.
16. **Process Mapping Cheatsheet** — simbol flowchart/swimlane dasar, template as-is → to-be, contoh proses Order-to-Cash di BC.
17. **AL: Project & `app.json`** — struktur project, field `app.json`, tabel runtime ↔ versi BC, prefix & ID range, `launch.json`; lihat Bagian 4.5.
18. **AL: Sintaks & Tipe Data** — tipe data, procedure, control flow, `Label`, operator umum.
19. **AL: Record & Filter** — `Get`/`Find*`, `SetRange`/`SetFilter` (sintaks filter), `CalcFields`/`CalcSums`, `SetLoadFields`, `Modify`/`Insert` dan trigger.
20. **AL: Event & Pola Ekstensi** — kerangka `EventSubscriber`, cara menemukan event, `IsHandled`, `ErrorInfo`; ⚠️ signature wajib dicocokkan dengan symbols.
21. **AL: Testing & Debugging** — kerangka test codeunit, handler, library test, langkah debug, pertanyaan telemetri dasar (KQL).
22. **AL: Upgrade, Obsolete & Release Checklist** — Install/Upgrade codeunit, `Obsolete*`, apa yang dicek tiap wave (runtime, breaking changes, deprecation).

### 4.1 Isi minimal cheatsheet API

**URL pola (SaaS):**
```
https://api.businesscentral.dynamics.com/v2.0/<TENANT_ID>/<ENV>/api/v2.0/companies
https://api.businesscentral.dynamics.com/v2.0/<TENANT_ID>/<ENV>/api/v2.0/companies(<COMPANY_ID>)/customers
https://api.businesscentral.dynamics.com/v2.0/<TENANT_ID>/<ENV>/ODataV4/Company('<COMPANY_NAME>')/<WebServiceName>
```

**Ambil token (client credentials / S2S):**
```http
POST https://login.microsoftonline.com/<TENANT_ID>/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=<CLIENT_ID>
&client_secret=<CLIENT_SECRET>
&scope=https://api.businesscentral.dynamics.com/.default
```
Prasyarat: (1) app terdaftar di Entra + permission `API.ReadWrite.All` (Application) dengan admin consent; (2) app didaftarkan di BC lewat halaman **Microsoft Entra Applications**, state Enabled, dan diberi permission set (mulai dari least privilege; D365 BUS FULL ACCESS hanya untuk eksperimen sandbox). Simpan secret di Key Vault / env var, **bukan di repo**.

**Python (httpx) — contoh minimal:**
```python
import os, httpx

TENANT = os.environ["BC_TENANT_ID"]; ENV = os.environ["BC_ENV"]
def get_token() -> str:
    r = httpx.post(
        f"https://login.microsoftonline.com/{TENANT}/oauth2/v2.0/token",
        data={
            "grant_type": "client_credentials",
            "client_id": os.environ["BC_CLIENT_ID"],
            "client_secret": os.environ["BC_CLIENT_SECRET"],
            "scope": "https://api.businesscentral.dynamics.com/.default",
        },
    )
    r.raise_for_status()
    return r.json()["access_token"]

BASE = f"https://api.businesscentral.dynamics.com/v2.0/{TENANT}/{ENV}/api/v2.0"
headers = {"Authorization": f"Bearer {get_token()}"}
companies = httpx.get(f"{BASE}/companies", headers=headers).json()["value"]
```

**Tabel OData ringkas:** `$filter=displayName eq 'Adatum'`, `$select=number,displayName`, `$expand=salesInvoiceLines`, `$top=50`, `$orderby=number desc`. PATCH/DELETE wajib header `If-Match: <@odata.etag>`. Posting dokumen: `POST .../purchaseInvoices(<id>)/Microsoft.NAV.post`. Pola buat dokumen: `POST purchaseInvoices` (header) → `POST purchaseInvoices(<id>)/purchaseInvoiceLines` (per baris), atau deep insert. ⚠️ Verifikasi nama entity & field di API reference v2.0 sebelum publish.

**Error umum API:** 401 (token/audience salah), 403 (permission set / Entra Application belum Enabled), 404 (company/environment salah), 409/412 (ETag usang), 429 (throttling → retry dengan backoff), 400 (validasi field BC).

### 4.2 Isi minimal cheatsheet AL

**Workflow VS Code:** `Ctrl+Shift+P` → `AL: Go!` (scaffold project) → `AL: Download Symbols` → F5 (publish & debug ke sandbox).

```al
// TableExtension: tambah field di Customer
tableextension 50100 "MYP Customer Ext" extends Customer
{
    fields
    {
        field(50100; "MYP Internal Note"; Text[100])
        {
            Caption = 'Internal Note';
            DataClassification = CustomerContent;
        }
    }
}
```
```al
// Event subscriber (extend via event, jangan ubah base app)
codeunit 50101 "MYP Sales Post Events"
{
    [EventSubscriber(ObjectType::Codeunit, Codeunit::"Sales-Post", OnBeforePostSalesDoc, '', false, false)]
    local procedure CheckBeforePost(var SalesHeader: Record "Sales Header"; var IsHandled: Boolean)
    begin
        // validasi custom di sini
    end;
}
```
⚠️ Signature event **harus dicocokkan** dengan symbols/AL Explorer (parameter berubah antar versi).

```al
// Custom API page
page 50102 "MYP Demo Item API"
{
    PageType = API;
    APIPublisher = 'myp';
    APIGroup = 'demo';
    APIVersion = 'v1.0';
    EntityName = 'demoItem';
    EntitySetName = 'demoItems';
    SourceTable = Item;
    DelayedInsert = true;
    ODataKeyFields = SystemId;

    layout { area(Content) { repeater(Group) {
        field(id; Rec.SystemId) { Editable = false; }
        field(number; Rec."No.") { }
        field(displayName; Rec.Description) { }
    } } }
}
```
Aturan emas: prefix object, ID range sendiri, `DataClassification` wajib, tidak ada logika berat di trigger OnAfterGetRecord, tulis test untuk setiap perilaku penting.

### 4.3 Isi minimal cheatsheet Configuration Worksheet (RapidStart Services)

**Empat komponen:** Configuration Worksheet · Configuration Package · Configuration Template · Configuration Questionnaire.

**Cari lewat Tell Me (Alt+Q):** `Configuration Worksheet`, `Config. Packages`, `Configuration Templates`, `Configuration Questionnaire`. ⚠️ Verifikasi nama persis di versi terpasang.

| Komponen | Fungsi | Tips |
|---|---|---|
| **Configuration Worksheet** | Daftar tabel yang akan disetup/dimigrasi; tempat merencanakan & melacak pekerjaan konfigurasi (ada *Responsible ID*, status, grouping) | Susun tabel dulu di worksheet, baru *Assign Package* ke baris-barisnya |
| **Config. Package** | Wadah tabel + field + data; di-export/import sebagai `.rapidstart` atau Excel | Atur *Include Field* agar template Excel hanya berisi kolom yang perlu |
| **Configuration Template** | Nilai default otomatis untuk record yang diimpor (mis. posting group default Customer) | Bantu konsistensi master data |
| **Configuration Questionnaire** | Daftar pertanyaan setup untuk user bisnis; jawaban bisa di-apply ke tabel setup | Validasi manual dulu sebelum Apply |

**Alur standar:** (1) Buat company baru → (2) isi Worksheet dengan tabel target → (3) *Assign Package* → (4) Export template Excel → (5) isi/bersihkan data → (6) Import dari Excel (masuk *staging*) → (7) **Validate / cek Package Errors** → (8) *Apply Package* ke tabel live.

**Hal yang wajib diingat:**
- Package harus dari **versi BC yang sama** dengan environment tujuan.
- Field yang berelasi ke tabel lain: **tabel relasinya harus ikut di package** agar mapping jalan.
- Import data besar bisa membebani performa dan mengganggu user lain → lakukan di sandbox/di luar jam kerja.
- BC online menyediakan satu package default (sesuai aplikasi + lokalisasi); **salin dulu, jangan edit aslinya**.
- Worksheet, questionnaire, dan template ikut ter-export otomatis kecuali dicentang *Exclude Configuration Tables*.
- Untuk Indonesia: pastikan app lokalisasi partner (pajak) terpasang **sebelum** apply package yang menyentuh tabel pajak.

### 4.4 Isi minimal cheatsheet Gap-Fit Analysis

| Kolom | Isi |
|---|---|
| **# / ID** | Nomor urut kebutuhan |
| **Kebutuhan bisnis** | Deskripsi singkat kebutuhan/proses dari user |
| **Modul BC** | Finance / Sales / Purchasing / Inventory / dll. |
| **Status** | ✅ Fit (standar) · ⚙️ Gap-Config (bisa via setup) · 🔧 Gap-Custom (perlu dev/app) · 🔄 Workaround |
| **Fitur/halaman BC** | Nama fitur atau halaman yang memenuhi kebutuhan |
| **Catatan gap** | Jika gap: apa yang kurang, opsi solusi (konfigurasi / extension / app AppSource / proses manual) |
| **Prioritas** | High / Medium / Low |
| **Estimasi effort** | S / M / L |

**Cara pakai:** (1) kumpulkan kebutuhan bisnis dari wawancara/workshop → (2) isi kolom per baris → (3) tandai status setelah uji di sandbox → (4) review dengan stakeholder → (5) kebutuhan berstatus Gap menjadi input Functional Spec untuk developer.

### 4.5 Isi minimal cheatsheet AL lanjutan (#17–#22)

| Runtime AL | Dikirim bersama | Versi internal |
|---|---|---|
| 16.0 | BC 2025 release wave 2 | 27.0 |
| 17.0 | BC 2026 release wave 1 | 28.0 |
| 18.0 | BC 2026 release wave 2 | 29.0 |

Aturan tiap cheatsheet AL: (1) kode berstatus *belum dikompilasi* sampai diverifikasi pemilik (aturan 8, Bagian 0); (2) maksimal satu halaman A4 saat dicetak — **tanpa komponen Tabs** (lihat `docs/DESIGN.md`); (3) memuat tag `bc_version_verified` dan catatan runtime; (4) memakai prefix demo `MYP` dan data CRONUS saja.

---

## 5. Rencana pembangunan situs (fase kecil — ikuti urutan)

Setiap fase = 1 siklus: kerjakan → tes lokal → **commit message** → update `docs/PROGRESS.md`. Jangan loncat fase.

| Fase | Pekerjaan | Commit message (saran) |
|---|---|---|
| 5.0 | Inisialisasi Astro Starlight, struktur folder Bagian 2, `docs/PROGRESS.md`, build lokal; deploy ditunda sampai diminta | `chore: init starlight site and content structure` |
| 5.1 | Tulis token & komponen dari `docs/DESIGN.md` ke `custom.css`; landing page + sidebar + search + dark mode + komponen VersionBadge/LevelBadge/CheatBox | `feat: design tokens, landing, search, core components` |
| 5.2 | Level 0 (Orientasi) lengkap | `docs: add level 0 orientation` |
| 5.3 | Cheatsheet #1–#7 (yang paling sering dipakai harian) | `docs: add core cheatsheets (nav, flow, ledger, posting, errors)` |
| 5.4 | Level 1 Basic (modul 1.1–1.8) + latihan B1–B8 | `docs: add level 1 basic and exercises` |
| 5.5 | Level 2 Intermediate + cheatsheet #14 (Configuration Worksheet) + latihan M1–M10 | `docs: add level 2 intermediate, rapidstart cheatsheet and exercises` |
| 5.6 | Level 3 Track 3A (Business Analysis) + cheatsheet #15–#16 + latihan E1–E3 | `docs: add business analysis track and exercises` |
| 5.7 | Track 3B (API) + cheatsheet API & AL + latihan E4–E6 + capstone | `docs: add api track, cheatsheets and capstone` |
| 5.7a | Jalur AL-1 + cheatsheet #17–#18 + latihan AL1–AL3; **perbarui `docs/DESIGN.md` 4.9 (grup sidebar "AL Developer") dan sidebar sebelum menambah halaman**; pindahkan folder `03-expert/developer-al/` ke `04-al-developer/` | `docs: add al developer path level 1 and cheatsheets` |
| 5.7b | Jalur AL-2 + cheatsheet #19–#20 + latihan AL4–AL6 | `docs: add al developer path level 2` |
| 5.7c | Jalur AL-3 + cheatsheet #21–#22 + latihan AL7–AL9 + capstone AL | `docs: add al developer path level 3 and capstone` |
| 5.8 | Glosarium, referensi, release checklist, komponen *progress tracker* (checkbox tersimpan di `localStorage`) | `feat: glossary, references, progress tracker` |
| 5.9 | Audit: link rusak, `last_verified`, tidak ada data rahasia, uji di mobile | `chore: content audit and link check` |

**Prioritas konten jika waktu terbatas:** Cheatsheet harian (5.3) → Level 1 → Business Analysis (5.6) → API (5.7) → **AL-1 (5.7a)** → AL-2/AL-3 → sisanya. *Jika tugas pertama di kantor adalah AL, geser 5.7a sebelum 5.6 — cukup ubah baris ini dan urutan fase.*

---

## 6. Latihan

Format setiap latihan: **Tujuan · Prasyarat · Langkah · Kriteria lulus (acceptance) · Estimasi waktu · Hint tersembunyi (collapsible)**. Semua dikerjakan di **sandbox** dengan data CRONUS/demo.

### 6.1 Basic (B1–B8)
- **B1 Navigasi:** temukan 10 halaman hanya lewat Tell Me; buat 1 list *Personalize* (kolom & filter) dan simpan sebagai view. *Lulus:* ≤ 3 menit per halaman.
- **B2 Master data:** buat 3 Customer, 3 Vendor, 5 Item (campuran Inventory & Service) dengan template. *Lulus:* tidak ada field wajib kosong; posting group terisi.
- **B3 Jurnal umum:** posting General Journal (mis. setoran modal) lalu cek G/L Entry & Trial Balance. *Lulus:* saldo Trial Balance seimbang & bisa menunjukkan entry-nya.
- **B4 Sales end-to-end:** Quote → Order → Ship & Invoice → terima pembayaran → Apply. *Lulus:* Customer Ledger Entry tertutup.
- **B5 Purchase end-to-end:** Order → Receive & Invoice → bayar → Apply. *Lulus:* Vendor Ledger Entry tertutup, stok bertambah.
- **B6 Inventory:** posting Item Journal (positive/negative adjustment), cek Item Ledger vs Value Entry. *Lulus:* jelaskan selisih kuantitas vs nilai.
- **B7 Koreksi:** buat invoice sengaja salah → koreksi via *Correct/Cancel* atau Credit Memo. *Lulus:* saldo akhir benar & jejak audit lengkap.
- **B8 Laporan:** hasilkan Aged Receivables, Aged Payables, Trial Balance; export ke Excel. *Lulus:* angka cocok dengan ledger.

### 6.2 Intermediate (M1–M10)
- **M1 Posting group debugging:** hapus sengaja satu kombinasi Gen. Posting Setup → reproduksi error → perbaiki lewat setup. *Lulus:* menjelaskan akar masalah dalam 3 kalimat.
- **M2 VAT:** setup VAT Posting Setup 11% (sesuaikan aturan lokal/app partner) → posting sales & purchase → verifikasi akun VAT. *Lulus:* VAT entry benar.
- **M3 Dimensions:** buat dimension *Department* & *Project*, jadikan wajib di akun tertentu → uji error saat kosong → laporan per dimension. *Lulus:* laporan per dimension sesuai.
- **M4 Approval:** buat workflow approval Purchase Order > nilai tertentu → uji 2 user (requester/approver). *Lulus:* PO tidak bisa dirilis sebelum approve.
- **M5 Bank reconciliation:** import bank statement dummy → match otomatis → posting. *Lulus:* saldo bank = statement.
- **M6 Fixed asset:** buat aset, depreciation book, jalankan Calculate Depreciation, posting. *Lulus:* FA Ledger & G/L konsisten.
- **M7 Migrasi data:** impor 50 Item & 20 Customer lewat **Edit in Excel** (versi RapidStart: lihat M9). *Lulus:* tanpa error, jumlah record cocok.
- **M8 Permission:** buat permission set read-only untuk akun "auditor" → uji bahwa tidak bisa posting. *Lulus:* tidak ada akses berlebih (least privilege).
- **M9 Configuration Worksheet:** di company CRONUS, isi Configuration Worksheet dengan tabel No. Series, Payment Terms, Customer Posting Group → *Assign Package* → export ke Excel → ubah beberapa nilai → import → validate → apply ke **company kosong baru**. Lalu buat 1 Configuration Template (default untuk Customer) dan 1 Questionnaire sederhana (3 pertanyaan setup). *Lulus:* company baru punya setup sama; 0 error di Package Errors; bisa menjelaskan kenapa package harus satu versi BC.
- **M10 Job Queue:** jadwalkan satu job (mis. report ke file atau codeunit sederhana) → paksa error → temukan pesan di Job Queue Log Entries → perbaiki & restart. *Lulus:* job berstatus Ready/berhasil dan penyebab error bisa dijelaskan.

### 6.3 Expert (E1–E8)

#### Business Analysis (E1–E3)
- **E1 Process mapping:** pilih satu proses bisnis di CRONUS (mis. Purchase-to-Pay) → dokumentasikan alur as-is (flowchart/swimlane) → identifikasi 3 pain point → gambar alur to-be dengan fitur BC. *Lulus:* dokumen as-is/to-be lengkap dengan penjelasan tiap perubahan.
- **E2 Gap-fit analysis:** ambil skenario: perusahaan dagang kecil (5 user) ingin migrasi dari spreadsheet → buat daftar 10 kebutuhan bisnis → bandingkan dengan fitur standar BC → isi matriks gap-fit (Fit / Gap / Workaround). *Lulus:* matriks lengkap; setiap gap punya rekomendasi solusi (konfigurasi, app, atau custom dev).
- **E3 UAT planning:** dari hasil gap-fit E2, buat 5 test scenario dengan test script (langkah-langkah + expected result) → jalankan di sandbox CRONUS → catat hasil Pass/Fail. *Lulus:* dokumen UAT dengan bukti eksekusi.

#### Integrasi & API (E4–E6)
- **E4 API baca:** token S2S → `GET companies`, `GET customers?$filter&$select&$top`. *Lulus:* skrip Python bekerja; secret hanya dari env var.
- **E5 API tulis:** buat Purchase Invoice (header + lines) lewat API → ubah dengan PATCH + `If-Match` → posting via `Microsoft.NAV.post` di sandbox. *Lulus:* entry muncul di ledger; menangani 412 & 429 dengan benar.
- **E6 Custom API page:** expose entity kustom, uji CRUD via REST client. *Lulus:* dokumentasi endpoint + contoh request.

#### Opsional (E7–E8)
- **E7 AL dasar:** *dipindahkan ke Jalur AL (AL1–AL4, Bagian 6.5).*
- **E8 Agent/MCP (eksplorasi):** aktifkan & uji Sales Order Agent atau Payables Agent di sandbox; tulis evaluasi (akurasi, kasus gagal, review effort). *Lulus:* laporan 1 halaman berisi temuan & rekomendasi.

### 6.4 Capstone (menggabungkan Track 3A + 3B)
**"Spreadsheet-to-BC":** skenario perusahaan dagang kecil yang ingin migrasi dari pencatatan manual/spreadsheet ke BC.
1. **BRD ringkas** — 1–2 halaman: latar belakang, kebutuhan bisnis utama (Sales, Purchasing, Inventory, Laporan).
2. **Gap-fit matrix** — tabel kebutuhan vs fitur standar BC, dengan rekomendasi per gap.
3. **Konfigurasi BC** — setup company baru di sandbox sesuai hasil gap-fit (Chart of Accounts, Posting Groups, Dimensions, No. Series, master data via RapidStart/Excel).
4. **Integrasi API** — skrip Python yang mengimpor data master (Customer/Vendor/Item) dari file CSV ke BC sandbox via API v2.0, dengan validasi & error handling.
5. **UAT & dokumentasi** — test scenario + eksekusi di sandbox + laporan hasil.
**Kriteria lulus:** company sandbox terkonfigurasi & bisa dipakai posting transaksi; data master berhasil diimpor via API tanpa error; dokumen BRD + gap-fit + UAT lengkap; tidak ada secret di repo.

### 6.5 Latihan Jalur AL (AL1–AL9)

Semua dikerjakan di **sandbox milik sendiri** dengan data CRONUS dan prefix demo `MYP`. Format sama dengan latihan lain (tujuan · prasyarat · langkah · kriteria lulus · estimasi · hint tertutup).

#### AL-1
- **AL1 Hello extension:** `AL: Go!` → atur `runtime` sesuai BC 29 (18.0), prefix & ID range → TableExtension Customer + 1 field → PageExtension → publish ke sandbox. *Lulus:* field tampil di Customer Card; extension muncul di Extension Management.
- **AL2 Data & filter:** codeunit yang menghitung total Sales Line per Customer memakai `SetRange`/`SetFilter`/`CalcSums`, dipanggil dari action di page, dengan `SetLoadFields`. *Lulus:* hasil cocok dengan laporan standar; tidak ada loop N+1.
- **AL3 Setup + dokumen kustom:** Setup table + Setup page (single record) dan satu dokumen kustom "MYP Request" (Table + Card + List) bernomor lewat No. Series. *Lulus:* nomor berurut; permission set minimal bekerja untuk user uji.

#### AL-2
- **AL4 Event subscriber:** blokir posting Sales Invoice jika field kustom kosong lewat event (tanpa mengubah base app), dengan `ErrorInfo` + action. *Lulus:* skenario positif/negatif dijalankan manual; signature event dicocokkan dengan symbols.
- **AL5 Report:** report daftar Open Vendor Ledger Entries dengan layout Word, diekspor ke PDF. *Lulus:* layout dipakai; angka cocok dengan Vendor Ledger.
- **AL6 HTTP dari AL:** `HttpClient` memanggil API publik/dummy, parse JSON, tangani error/timeout. *Lulus:* error tampil sebagai pesan yang bisa ditindaklanjuti; tidak ada secret di kode. *(E6 — custom API page — dikerjakan bersama jalur ini.)*

#### AL-3
- **AL7 Testing:** test codeunit untuk AL3 dan AL4 (≥ 1 test negatif per perilaku). *Lulus:* semua test hijau di AL Test Tool.
- **AL8 Upgrade & obsolete:** versi 1.0 → 1.1: tambah field baru, tandai field lama `ObsoleteState = Pending`, Upgrade codeunit memigrasi data. *Lulus:* data tidak hilang; upgrade tag tercatat.
- **AL9 CI pipeline *(opsional bila kantor sudah punya pipeline)*:** repo GitHub berisi hanya kode demo dengan AL-Go for GitHub (template PTE): compile + test di CI. *Lulus:* workflow hijau; tidak ada secret/data nyata di repo.

### 6.6 Capstone AL — "BC-side Invoice Staging"
Sisi BC dari capstone Invoice-to-BC (jika dikerjakan bersama Track 3B): extension PTE yang menerima data invoice lewat **custom API page** ke tabel staging "MYP Vendor Invoice Staging", memvalidasi vendor/item, lalu membuat **Purchase Invoice draft** (belum diposting) lewat tombol/action.
**Kriteria lulus:** (1) API page menerima create/read dengan `SystemId` sebagai key; (2) validasi vendor/item gagal dengan `ErrorInfo` yang jelas dan tercatat; (3) pembuatan draft idempotent (data yang sama tidak membuat dokumen ganda); (4) permission set minimal; (5) ≥ 6 test (positif + negatif) hijau; (6) Upgrade codeunit untuk perubahan versi; (7) pipeline CI sederhana (opsional); (8) tidak ada data/kode kantor di repo; semua snippet berstatus jelas.

---

## 7. Sumber referensi (tautkan, jangan salin)

- Dokumentasi BC (hub): https://learn.microsoft.com/en-us/dynamics365/business-central/
- Apa yang baru / per update (contoh 29.1): https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/whatsnew/whatsnew-update-29-1
- Autentikasi S2S & Automation APIs: https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/administration/automation-apis-using-s2s-authentication
- Ketersediaan negara/lokalisasi: https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/compliance/apptest-countries-and-translations
- Contoh kode resmi: GitHub `microsoft/BCTech` (OAuth2 flows, samples)
- Sertifikasi (verifikasi kode & status terbaru): MB-800 (Functional Consultant) dan **MB-820 (Business Central Developer)** — study guide: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/mb-820
- Memilih versi runtime AL: https://learn.microsoft.com/dynamics365/business-central/dev-itpro/developer/devenv-choosing-runtime
- Fitur yang dihapus/diganti (termasuk SOAP/OData halaman Microsoft): https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/upgrade/deprecated-features-platform
- Pedoman kode AL komunitas (juga untuk konteks AI): https://alguidelines.dev/docs/vibe-coding
- Roadmap fitur baru: **AI at Work roadmap** (pengganti Release Plans sejak September 2026)

---

## 8. Risiko & asumsi

| Risiko | Mitigasi |
|---|---|
| Konten cepat usang (wave tiap 6 bulan) | `bc_version_verified` + `last_verified` di tiap halaman; review tiap April & Oktober |
| Salah fakta (nomor objek, nama field, signature event) | Tandai `⚠️ Verifikasi`, cek di sandbox/symbols sebelum publish |
| Kebocoran data perusahaan/klien | Larangan Bagian 0 poin 4; audit di Fase 5.9 |
| Scope terlalu luas (BA + API + AL sekaligus) | Prioritaskan Level 1–2, lalu satu fokus utama per minggu; Jalur AL berjalan paralel tapi bertahap (AL-1 dulu); modul opsional hanya bila ada kebutuhan kerja |
| Kode AL salah/tidak terkompilasi (agent tidak punya sandbox) | Semua snippet berstatus *belum dikompilasi* sampai pemilik memverifikasi; signature dicocokkan dengan symbols (aturan 8) |
| Kode/skema/IP kantor atau klien bocor ke repo publik | Hanya kode demo (prefix `MYP`, CRONUS); audit khusus di Fase 5.9 |
| Perubahan platform v29/v30 (table extension, SOAP/OData) | Catat versi di tiap halaman; baca "What's new" dan *deprecated features* tiap wave |
| Terlalu lama membangun situs | Starlight + Markdown; batasi fase pembangunan; konten > fitur |
| Pelanggaran hak cipta | Tulis ulang, ringkas, tautkan sumber resmi |
| Belajar tanpa praktik | Setiap modul wajib terhubung ke latihan; gate di tiap level |
| Fitur AI/agent berubah cepat & ada yang masih preview | Tandai status (GA/Preview) + tanggal verifikasi; cek AI at Work roadmap; track ini sekarang opsional |

**Asumsi:** pemilik punya akses sandbox BC (online), bekerja dengan Python dan **AL**, dan tujuan utamanya adalah mampu bekerja dengan BC sebagai **Business Analyst** yang memahami API untuk integrasi **sekaligus AL developer** (kode dikerjakan di sandbox pemilik) — bukan AI engineer.

---

## 9. Definition of Done

- [ ] Semua level (0–3) punya halaman materi dengan template Bagian 2.
- [ ] 22 cheatsheet (#1–#22) selesai & bisa dicetak 1 halaman.
- [ ] Latihan B1–B8, M1–M10, E1–E6, AL1–AL9 + capstone (BA/API dan AL) terdokumentasi lengkap dengan kriteria lulus.
- [ ] Semua snippet AL berstatus jelas (`Belum dikompilasi` / `Dikompilasi di 29.x`) dan tidak ada kode/IP kantor di repo.
- [ ] Semua UI lolos checklist di akhir `docs/DESIGN.md`.
- [ ] Search berfungsi; situs nyaman di mobile.
- [ ] Setiap halaman punya `bc_version_verified` & `last_verified`; tidak ada `⚠️ Verifikasi` yang tersisa tanpa keputusan.
- [ ] Tidak ada secret/data nyata di repo.
- [ ] `docs/PROGRESS.md` terisi sampai fase terakhir.