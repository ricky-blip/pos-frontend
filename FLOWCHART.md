# 🔄 Flowchart Aplikasi POS Frontend

---

## 📋 Daftar Isi

- [1. Flow Utama Aplikasi](#1-flow-utama-aplikasi)
- [2. Flow Autentikasi](#2-flow-autentikasi)
- [3. Flow Dashboard Kasir](#3-flow-dashboard-kasir)
- [4. Flow Dashboard Admin](#4-flow-dashboard-admin)
- [5. Flow ProtectedRoute](#5-flow-protectedroute)
- [6. Flow AuthContext](#6-flow-authcontext)
- [7. Flow Lengkap dari Awal sampai Akhir](#7-flow-lengkap-dari-awal-sampai-akhir)

---

## 1. Flow Utama Aplikasi

```mermaid
flowchart TD
    A[Aplikasi Dibuka] --> B[main.jsx Entry Point]
    B --> C[AuthProvider Wrapper]
    C --> D[BrowserRouter]
    D --> E[Routes Configuration di App.jsx]
    E --> F{Cek URL Path}

    F -->|/| G[SplashScreen]
    F -->|/login| H[AuthLayout > LoginPage]
    F -->|/register| I[AuthLayout > RegisPage]
    F -->|/reset-password| J[AuthLayout > ResetPassPage]
    F -->|/dashboard/*| K[ProtectedRoute > CashierLayout]
    F -->|/admin/*| L[ProtectedRoute > AdminLayout]
    F -->|* (lainnya)| M[Navigate to /]

    G --> N[Timer 3 Detik]
    N --> O[Redirect ke /login]

    H --> P{User Login?}
    I --> Q{User Register?}
    J --> R{Reset Password?}

    K --> S[Cek Role = cashier?]
    L --> T[Cek Role = admin?]

    S -->|Ya| U[Render Halaman Kasir]
    S -->|Tidak| V[Redirect ke Dashboard Sesuai Role]

    T -->|Ya| W[Render Halaman Admin]
    T -->|Tidak| X[Redirect ke Dashboard Sesuai Role]
```

---

## 2. Flow Autentikasi

### 2.1 Flow Login

```mermaid
flowchart TD
    A[User Buka /login] --> B[AuthLayout Render]
    B --> C[Tampil: Form Login + Background Image]
    C --> D[User Isi Username & Password]
    D --> E[Klik Tombol Login]
    E --> F[handleLogin Dijalankan]
    F --> G[Set isLoading = true]
    G --> H[Simulasi API Call - 1 Detik]
    H --> I{Validasi Credentials}

    I -->|Valid| J[Panggil login dari AuthContext]
    J --> K[Set User State]
    K --> L[Simpan ke localStorage]
    L --> M{Role User?}

    M -->|cashier| N[Navigate ke /dashboard]
    M -->|admin| O[Navigate ke /admin/dashboard]

    I -->|Invalid| P[Set Error Message]
    P --> Q[Tampilkan Error di UI]
    Q --> D

    I -->|Valid| R[Set isLoading = false]
    R --> M
```

### 2.2 Flow Register

```mermaid
flowchart TD
    A[User Buka /register] --> B[AuthLayout Render]
    B --> C[Tampil: Form Register]
    C --> D[User Isi Data]
    D --> E[Klik Tombol Register]
    E --> F[handleRegister Dijalankan]
    F --> G[Simulasi API Call]
    G --> H{Berhasil?}

    H -->|Ya| I[Redirect ke /login]
    H -->|Tidak| J[Tampilkan Error]
    J --> D
```

### 2.3 Flow Reset Password

```mermaid
flowchart TD
    A[User Buka /reset-password] --> B[AuthLayout Render]
    B --> C[Tampil: Form Reset Password]
    C --> D[User Isi Email/Username]
    D --> E[Klik Tombol Reset]
    E --> F[Simulasi Kirim Email Reset]
    F --> G[Tampilkan Pesan Sukses]
    G --> H[Redirect ke /login]
```

---

## 3. Flow Dashboard Kasir

```mermaid
flowchart TD
    A[User Login sebagai Cashier] --> B[ProtectedRoute Cek Role]
    B -->|Role = cashier| C[CashierLayout Render]
    B -->|Role != cashier| D[Redirect ke Role Dashboard]

    C --> E[CashierHeader + CashierSidebar]
    E --> F{Cek Path}

    F -->|/dashboard| G[CashierDashboardPage]
    F -->|/dashboard/sales-report| H[SalesReportPage]
    F -->|/dashboard/settings| I[SettingsPage]

    G --> J[Tampil: Order Panel + Menu Grid]
    J --> K[User Pilih Kategori]
    K --> L[Filter Menu Items]
    L --> M[User Pilih Menu Item]
    M --> N[Tambah ke Keranjang]

    N --> O{Ada Item di Cart?}
    O -->|Ya| P[Update Total Harga]
    O -->|Tidak| Q[Tampil Empty State]

    P --> R[User Klik Pay]
    R --> S[Payment Section Open]
    S --> T[User Pilih Metode Pembayaran]
    T --> U[Proses Pembayaran]
    U --> V[Transaction Success Modal]
    V --> W[Reset Cart]
    W --> J

    H --> X[Tampil Laporan Penjualan]
    I --> Y[Tampil Pengaturan]
```

### 3.1 Komponen Dashboard Kasir

```mermaid
flowchart LR
    A[CashierDashboardPage] --> B[OrderPanel]
    A --> C[MenuGrid]

    B --> D[OrderHeader]
    B --> E[OrderItemsList]
    B --> F[PayBar]
    B --> G[OrderSummary]

    D --> H[OrderTypeToggle]

    C --> I[CategoryTabs]
    C --> J[MenuSection]
    C --> K[MenuCard]

    K --> L[DetailMenuModal]
    K --> M[ItemNoteModal]

    F --> N[PaymentSection]
    N --> O[CustomerForm]
    N --> P[EmptyOrderState]

    B --> Q[TransactionSuccessModal]
    B --> R[OrderArchiveModal]
```

---

## 4. Flow Dashboard Admin

```mermaid
flowchart TD
    A[User Login sebagai Admin] --> B[ProtectedRoute Cek Role]
    B -->|Role = admin| C[AdminLayout Render]
    B -->|Role != admin| D[Redirect ke Role Dashboard]

    C --> E[AdminHeader + AdminSidebar]
    E --> F{Cek Path}

    F -->|/admin/dashboard| G[AdminDashboardPage]
    F -->|/admin/catalog| H[CatalogPage]
    F -->|/admin/sales-report| I[SalesReportPage]
    F -->|/admin/settings| J[SettingsPage]

    G --> K[Tampil: StatsCard + Analytics]
    H --> L[Tampil: Menu Management + Add Form]
    I --> M[Tampil: Laporan Lengkap]
    J --> N[Tampil: Pengaturan Admin]

    L --> O[User Tambah Menu Baru]
    O --> P[AddMenuForm Render]
    P --> Q[Simpan Menu]
    Q --> R[Update UI]

    L --> S[User Edit Menu]
    S --> T[DetailMenuPanel Render]
    T --> U[Update Data]
    U --> R

    L --> V[User Hapus Menu]
    V --> W[DeleteConfirmModal Render]
    W -->|Konfirmasi| X[Hapus dari Database]
    W -->|Batal| R
    X --> R
```

### 4.1 Komponen Dashboard Admin

```mermaid
flowchart LR
    A[AdminDashboardPage] --> B[StatCard]
    A --> C[TransactionDetailModal]

    H[CatalogPage] --> D[AddMenuForm]
    H --> E[CategoryFilter]
    H --> F[CategoryPopup]
    H --> G[MenuCard]
    H --> I[DetailMenuPanel]
    H --> J[DeleteConfirmModal]

    I[SalesReportPage] --> K[Toast]

    J[SettingsPage] --> L[AdminSidebar]
    J --> M[AdminHeader]
```

---

## 5. Flow ProtectedRoute

```mermaid
flowchart TD
    A[User Akses Protected Route] --> B[ProtectedRoute Component]
    B --> C[Ambil Auth dari AuthContext]
    C --> D{Is Authenticated?}

    D -->|Tidak| E[Redirect ke /login]
    E --> F[Tampilkan LoginPage]

    D -->|Ya| G{Required Role Set?}
    G -->|Tidak| H[Render Outlet - Akses Diberikan]

    G -->|Ya| I{User Role = Required Role?}
    I -->|Ya| H

    I -->|Tidak| J{User Role Saat Ini?}
    J -->|admin| K[Redirect ke /admin/dashboard]
    J -->|cashier| L[Redirect ke /dashboard]
```

---

## 6. Flow AuthContext

```mermaid
flowchart TD
    A[App.jsx Mount] --> B[AuthProvider Initialize]
    B --> C[Cek localStorage untuk pos-user]
    C --> D{Ada Data di localStorage?}

    D -->|Ya| E[Parse JSON dan Set User State]
    D -->|Tidak| F[Set User = null]

    E --> G[State: user, isAuthenticated, isAdmin, isCashier]
    F --> G

    G --> H[Provide Context Value]
    H --> I[Children Components Bisa Akses via useAuth]

    I --> J{User Panggil Method?}

    J -->|login| K[Set User State + Simpan ke localStorage]
    J -->|logout| L[Set User = null + Hapus dari localStorage]

    K --> M[State Update Trigger Re-render]
    L --> M
    M --> N[UI Update Otomatis]
```

---

## 7. Flow Lengkap dari Awal sampai Akhir

```mermaid
flowchart TD
    A[🚀 Aplikasi Dibuka] --> B[main.jsx Running]
    B --> C[AuthProvider Inisialisasi - Cek localStorage]
    C --> D[BrowserRouter Setup]
    D --> E[Routes di App.jsx Dijalankan]

    E --> F{Cek Path Saat Ini}

    F -->|/| G[🎬 SplashScreen]
    F -->|/login| H[🔐 LoginPage]
    F -->|/register| I[📝 RegisPage]
    F -->|/reset-password| J[🔄 ResetPassPage]
    F -->|/dashboard/*| K[💰 ProtectedRoute - Cashier]
    F -->|/admin/*| L[👨‍💼 ProtectedRoute - Admin]
    F -->|* lainnya| M[❌ Redirect ke /]

    G --> N[Progress Bar 0-100%]
    N --> O[Timer 3 Detik]
    O --> P[Redirect ke /login]
    P --> H

    H --> Q[User Input Credentials]
    Q --> R{Valid Login?}

    R -->|Tidak| S[Tampilkan Error]
    S --> Q

    R -->|Ya| T[Panggil login dari AuthContext]
    T --> U[Set User State]
    U --> V[Simpan ke localStorage]
    V --> W{Role User?}

    W -->|cashier| X[👉 Redirect ke /dashboard]
    W -->|admin| Y[👉 Redirect ke /admin/dashboard]

    X --> Z[CashierLayout Render]
    Z --> AA[CashierHeader + CashierSidebar]
    AA --> AB{Navigasi Kasir?}

    AB -->|/dashboard| AC[📊 Dashboard - Buat Pesanan]
    AB -->|/dashboard/sales-report| AD[📈 Laporan Penjualan]
    AB -->|/dashboard/settings| AE[⚙️ Pengaturan]

    AC --> AF[Pilih Kategori Menu]
    AF --> AG[Pilih Item Menu]
    AG --> AH[Tambah ke Cart]
    AH --> AI[Update Total]
    AI --> AJ{Klik Pay?}

    AJ -->|Tidak| AC
    AJ -->|Ya| AK[Buka Payment Panel]
    AK --> AL[Pilih Metode Pembayaran]
    AL --> AM[Proses Transaksi]
    AM --> AN[Transaction Success Modal]
    AN --> AO[Reset Cart]
    AO --> AC

    Y --> AP[AdminLayout Render]
    AP --> AQ[AdminHeader + AdminSidebar]
    AQ --> AR{Navigasi Admin?}

    AR -->|/admin/dashboard| AS[📊 Dashboard - Analytics]
    AR -->|/admin/catalog| AT[🍽️ Kelola Menu]
    AR -->|/admin/sales-report| AU[📈 Laporan Lengkap]
    AR -->|/admin/settings| AV[⚙️ Pengaturan Admin]

    AT --> AW{Aksi Menu?}
    AW -->|Tambah| AX[AddMenuForm]
    AW -->|Edit| AY[DetailMenuPanel]
    AW -->|Hapus| AZ[DeleteConfirmModal]
    AW -->|Lihat Detail| BA[DetailMenuPanel]

    AX --> BB[Simpan Menu Baru]
    AY --> BC[Update Menu]
    AZ --> BD[Hapus Menu]
    BA --> BE[Lihat Detail]

    BB --> BF[Refresh UI]
    BC --> BF
    BD --> BF
    BE --> BF

    BF --> AS

    I --> BG[Form Register]
    BG --> BH[Submit Data]
    BH --> BI{Berhasil?}
    BI -->|Ya| H
    BI -->|Tidak| BJ[Tampil Error]
    BJ --> BG

    J --> BK[Form Reset]
    BK --> BL[Kirim Reset Link]
    BL --> BM[Tampil Pesan Sukses]
    BM --> H
```

---

## 🗺️ Peta Interaksi User per Halaman

### 👤 Kasir (Cashier)

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD KASIR                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐          ┌──────────────────────────────┐ │
│  │              │          │                              │ │
│  │  CATEGORY    │          │       MENU GRID              │ │
│  │  TABS        │   ────▶  │   ┌────┐  ┌────┐  ┌────┐   │ │
│  │              │          │   │ ☕ │  │ 🍔 │  │ 🍕 │   │ │
│  │  - All       │          │   └────┘  └────┘  └────┘   │ │
│  │  - Drinks    │          │                              │ │
│  │  - Food      │          │  Klik Item ▶ Tambah ke Cart  │ │
│  │  - Snacks    │          │                              │ │
│  │              │          │  Detail Modal:               │ │
│  │              │          │  - Note per Item             │ │
│  │              │          │  - Qty Adjustment            │ │
│  │              │          │  - Special Instructions      │ │
│  └──────────────┘          └──────────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  ORDER PANEL                         │   │
│  │                                                      │   │
│  │  Order Type: Dine In | Take Away | Delivery          │   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │ Cart Items:                                  │   │   │
│  │  │ ☕ Kopi Susu x2          Rp 30.000           │   │   │
│  │  │ 🍔 Burger Keju x1        Rp 45.000           │   │   │
│  │  │                              ──────────────  │   │   │
│  │  │                              TOTAL: Rp 75K   │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  │                                                      │   │
│  │  [ PAY ]                                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 👨‍💼 Admin

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD ADMIN                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Today     │  │  This      │  │  Total     │            │
│  │  Sales     │  │  Week      │  │  Orders    │            │
│  │  Rp 2.5M   │  │  Rp 15M    │  │  150       │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   SIDEBAR NAV                        │   │
│  │                                                      │   │
│  │  📊 Dashboard        (active)                        │   │
│  │  🍽️ Catalog                                          │   │
│  │  📈 Sales Report                                      │   │
│  │  ⚙️ Settings                                          │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              CATALOG (jika dipilih)                  │   │
│  │                                                      │   │
│  │  [ + Add Menu ]  [ Filter by Category ]              │   │
│  │                                                      │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐               │   │
│  │  │ ☕   │ │ 🍔   │ │ 🍕   │ │ 🥤   │               │   │
│  │  │ Edit │ │ Edit │ │ Edit │ │ Edit │               │   │
│  │  │ Del  │ │ Del  │ │ Del  │ │ Del  │               │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘               │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 State Management Flow

```mermaid
flowchart TD
    A[User Action] --> B{Action Type?}

    B -->|Login| C[login dari AuthContext]
    B -->|Logout| D[logout dari AuthContext]
    B -->|Navigate| E[useNavigate]

    C --> F[setUser]
    F --> G[localStorage.setItem]
    G --> H[Context Provider Update]
    H --> I[All Consumers Re-render]
    I --> J[UI Update - ProtectedRoute Pass]

    D --> K[setUser null]
    K --> L[localStorage.removeItem]
    L --> M[Context Provider Update]
    M --> N[All Consumers Re-render]
    N --> O[UI Update - Redirect to Login]

    E --> P[navigate to path]
    P --> Q{Protected Route?}
    Q -->|Ya| R[ProtectedRoute Check]
    Q -->|Tidak| S[Render Page]

    R --> T{Authenticated + Role OK?}
    T -->|Ya| S
    T -->|Tidak| U[Redirect]
```

---

## 📊 Komponen Hierarki Lengkap

### Cashier Layout Components

```
CashierLayout
├── CashierHeader
│   ├── User Info
│   └── Logout Button
├── CashierSidebar
│   └── Navigation Links
└── Main Content (Outlet)
    ├── CashierDashboardPage
    │   ├── OrderPanel
    │   │   ├── OrderHeader
    │   │   │   └── OrderTypeToggle
    │   │   ├── OrderItemsList
    │   │   ├── OrderSummary
    │   │   └── PayBar
    │   ├── CategoryTabs
    │   ├── MenuSection
    │   │   └── MenuGrid
    │   │       └── MenuCard
    │   │           ├── DetailMenuModal
    │   │           └── ItemNoteModal
    │   ├── PaymentSection
    │   │   ├── CustomerForm
    │   │   └── EmptyOrderState
    │   ├── TransactionSuccessModal
    │   └── OrderArchiveModal
    ├── SalesReportPage
    └── SettingsPage
```

### Admin Layout Components

```
AdminLayout
├── AdminHeader
│   ├── User Info
│   └── Logout Button
├── AdminSidebar
│   └── Navigation Links
└── Main Content (Outlet)
    ├── AdminDashboardPage
    │   ├── StatCard
    │   └── TransactionDetailModal
    ├── CatalogPage
    │   ├── AddMenuForm
    │   ├── CategoryFilter
    │   ├── CategoryPopup
    │   ├── MenuCard
    │   ├── DetailMenuPanel
    │   └── DeleteConfirmModal
    ├── SalesReportPage
    └── SettingsPage
```

---

## 🚀 Tips Membaca Flowchart

1. **Mulai dari atas** → `Aplikasi Dibuka` adalah titik awal
2. **Ikuti panah** → Setiap panah menunjukkan alur berikutnya
3. **Decision boxes (diamond)** → Ada kondisi yang menentukan jalur
4. **Boxes (rectangle)** → Komponen atau action yang dijalankan
5. **Lingkaran** → State atau kondisi

---

**Dibuat untuk dokumentasi aplikasi POS Frontend** 📝
