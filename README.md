# 📘 Panduan Aplikasi POS Frontend

Aplikasi Point of Sale (POS) yang dibangun dengan React, Vite, dan Tailwind CSS.

---

## 📚 Daftar Isi

- [📘 Panduan Aplikasi POS Frontend](#-panduan-aplikasi-pos-frontend)
  - [📚 Daftar Isi](#-daftar-isi)
  - [Aplikasi Ini Itu Apa?](#aplikasi-ini-itu-apa)
  - [Teknologi yang Digunakan](#teknologi-yang-digunakan)
  - [Alur Aplikasi dari Awal](#alur-aplikasi-dari-awal)
    - [Langkah 1: Aplikasi Dimulai dari `main.jsx`](#langkah-1-aplikasi-dimulai-dari-mainjsx)
    - [Langkah 2: `main.jsx` Memanggil `App.jsx`](#langkah-2-mainjsx-memanggil-appjsx)
    - [Langkah 3: `App.jsx` Mengatur Semua Halaman (Routing)](#langkah-3-appjsx-mengatur-semua-halaman-routing)
      - [🗺️ Peta Sederhana Routing:](#️-peta-sederhana-routing)
      - [📋 Detail Setiap Route:](#-detail-setiap-route)
  - [Penjelasan Routing (Perpindahan Halaman)](#penjelasan-routing-perpindahan-halaman)
    - [Splash Screen → Login](#splash-screen--login)
    - [Login → Dashboard Cashier](#login--dashboard-cashier)
    - [Login → Dashboard Admin](#login--dashboard-admin)
  - [Struktur Folder Fitur](#struktur-folder-fitur)
  - [Penjelasan Layout](#penjelasan-layout)
    - [1. AuthLayout](#1-authlayout)
    - [2. CashierLayout](#2-cashierlayout)
    - [3. AdminLayout](#3-adminlayout)
  - [Cara Menjalankan Aplikasi](#cara-menjalankan-aplikasi)
    - [Apa yang terjadi saat `npm run dev`?](#apa-yang-terjadi-saat-npm-run-dev)
  - [Cara Menambah Halaman Baru](#cara-menambah-halaman-baru)
    - [Langkah 1: Buat file halaman baru](#langkah-1-buat-file-halaman-baru)
    - [Langkah 2: Export dari index.js](#langkah-2-export-dari-indexjs)
    - [Langkah 3: Import di App.jsx](#langkah-3-import-di-appjsx)
    - [Langkah 4: Tambahkan route](#langkah-4-tambahkan-route)
    - [Langkah 5: Akses halaman](#langkah-5-akses-halaman)
  - [Konsep Penting React yang Digunakan](#konsep-penting-react-yang-digunakan)
    - [1. Component](#1-component)
    - [2. useState (State)](#2-usestate-state)
    - [3. useEffect (Effect)](#3-useeffect-effect)
    - [4. useNavigate (Navigasi)](#4-usenavigate-navigasi)
    - [5. Outlet (dari React Router)](#5-outlet-dari-react-router)
  - [Istilah-Istilah yang Sering Digunakan](#istilah-istilah-yang-sering-digunakan)
  - [🎯 Rangkuman Alur Aplikasi](#-rangkuman-alur-aplikasi)
  - [💡 Tips](#-tips)
  - [📚 Sumber Belajar Tambahan](#-sumber-belajar-tambahan)

---

## Aplikasi Ini Itu Apa?

Aplikasi ini adalah **sistem kasir digital (Point of Sale)** yang biasa digunakan di restoran, cafe, atau toko. Aplikasi ini punya beberapa jenis pengguna:

- **👨‍💼 Admin** → Bisa melihat laporan, mengatur menu, dan mengelola pengguna
- **💰 Kasir (Cashier)** → Bisa membuat pesanan, memproses pembayaran, dan melihat ringkasan penjualan

Setiap jenis pengguna punya tampilan dan fitur yang berbeda!

---

## Teknologi yang Digunakan

| Teknologi | Fungsi |
|-----------|--------|
| **React JS** | Library untuk membuat tampilan aplikasi (UI) |
| **Vite** | Alat untuk menjalankan dan membangun aplikasi dengan cepat |
| **React Router** | Alat untuk mengatur perpindahan halaman (routing) |
| **Tailwind CSS** | Alat untuk membuat tampilan cantik dengan CSS |

---

## Alur Aplikasi dari Awal

Begini perjalanan aplikasi dari **pertama kali dibuka** sampai **masuk ke halaman utama**:

---

### Langkah 1: Aplikasi Dimulai dari `main.jsx`

**File:** `src/main.jsx`

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

#### 📖 Penjelasan:

File `main.jsx` adalah **pintu masuk utama** aplikasi. File ini yang **pertama kali dijalankan** saat aplikasi dibuka.

**Penjelasan per baris:**

1. **`import { StrictMode } from 'react'`**
   - Mode di React yang membantu menemukan masalah dalam kode lebih awal

2. **`import { createRoot } from 'react-dom/client'`**
   - Fungsi untuk memasang (mount) aplikasi React ke halaman HTML

3. **`import '../src/styles/index.css'`**
   - Mengimpor file CSS global seperti font, warna dasar, dll

4. **`import App from './App.jsx'`**
   - Mengimpor komponen utama `App` yang mengatur semua halaman

5. **`createRoot(document.getElementById('root')).render(...)`**
   - Mencari elemen HTML dengan id `root` (ada di file `index.html`)
   - Lalu merender komponen `<App />` di dalamnya

---

### Langkah 2: `main.jsx` Memanggil `App.jsx`

**File:** `src/App.jsx`

Setelah `main.jsx` menjalankan aplikasi, selanjutnya adalah **`App.jsx`**. File ini adalah **pusat pengaturan routing** (perpindahan halaman).

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, RegisPage, ResetPassPage } from "./features/auth"
import { CashierDashboardPage, SettingsPage, SalesReportPage } from "./features/cashier"
import { AdminDashboardPage, ReportsPage, MenuManagementPage, UserManagementPage } from "./features/admin"
import SplashScreen from "./features/splashscreen/SplashScreen"
import AuthLayout from "./shared/AuthLayout"
import { CashierLayout } from "./features/cashier/layouts"
import { AdminLayout } from "./features/admin/layouts"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... semua route ada di sini ... */}
      </Routes>
    </BrowserRouter>
  )
}
```

#### 📖 Penjelasan:

**Konsep Penting:** `App.jsx` menggunakan **React Router** untuk mengatur perpindahan halaman.

**React Router** memungkinkan kita berpindah halaman **tanpa reload** (seperti aplikasi modern!).

**Komponen Utama:**

| Komponen | Fungsi |
|----------|--------|
| `<BrowserRouter>` | Pembungkus utama agar routing bisa bekerja |
| `<Routes>` | Wadah untuk semua rute/halaman |
| `<Route>` | Satu halaman spesifik dengan path tertentu |
| `<Navigate>` | Mengarahkan pengguna ke halaman lain |
| `<Outlet />` | Tempat konten anak ditampilkan (di dalam Layout) |

---

### Langkah 3: `App.jsx` Mengatur Semua Halaman (Routing)

Berikut adalah **semua rute** yang ada di aplikasi ini:

#### 🗺️ Peta Sederhana Routing:

```
Aplikasi Dibuka
     │
     ▼
[ Splash Screen ]  ← Halaman pertama yang muncul (3 detik)
     │
     ▼ (otomatis redirect)
[ Login Page ]  ← Pengguna login di sini
     │
     ├──────────────┐
     ▼              ▼
[ Dashboard    [ Dashboard
  Cashier ]      Admin   ]
     │              │
     ▼              ▼
Halaman lain   Halaman lain
```

#### 📋 Detail Setiap Route:

| Path | Halaman | Layout | Untuk Siapa |
|------|---------|--------|-------------|
| `/` | Splash Screen | Tidak ada (full screen) | Semua (awal buka) |
| `/login` | Login Page | AuthLayout (background saja) | Semua pengguna |
| `/register` | Register Page | AuthLayout (background saja) | Pengguna baru |
| `/reset-password` | Reset Password | AuthLayout (background saja) | Lupa password |
| `/dashboard` | Dashboard Kasir | CashierLayout (header + sidebar) | Kasir |
| `/dashboard/sales-report` | Laporan Penjualan | CashierLayout (header + sidebar) | Kasir |
| `/dashboard/settings` | Pengaturan | CashierLayout (header + sidebar) | Kasir |
| `/admin/dashboard` | Dashboard Admin | AdminLayout (header + sidebar) | Admin |
| `/admin/reports` | Laporan | AdminLayout (header + sidebar) | Admin |
| `/admin/menus` | Kelola Menu | AdminLayout (header + sidebar) | Admin |
| `/admin/users` | Kelola Pengguna | AdminLayout (header + sidebar) | Admin |

---

## Penjelasan Routing (Perpindahan Halaman)

### Splash Screen → Login

**File:** `src/features/splashscreen/SplashScreen.jsx`

Splash Screen adalah **halaman pertama** yang muncul saat aplikasi dibuka. Halaman ini menampilkan logo, judul "POS System", progress bar, dan versi aplikasi.

**Bagaimana bisa pindah ke Login?**

```jsx
// Di dalam SplashScreen.jsx
const navigate = useNavigate()

useEffect(() => {
  // Progress bar berjalan
  const progressInterval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(progressInterval)
        return 100
      }
      return prev + 2
    })
  }, 50)

  // Setelah 3 detik, pindah ke Login
  const redirectTimer = setTimeout(() => {
    setFadeOut(true)  // Efek fade out
    setTimeout(() => navigate("/login"), 600)  // Pindah ke /login
  }, 3000)

  return () => {
    clearInterval(progressInterval)
    clearTimeout(redirectTimer)
  }
}, [navigate])
```

**Penjelasan:**
1. `useEffect` dijalankan saat komponen pertama kali muncul (mount)
2. Progress bar berjalan dari 0% ke 100% (naik 2% setiap 50ms)
3. Setelah **3 detik**, aplikasi otomatis berpindah ke halaman `/login`
4. Ada efek `fadeOut` supaya perpindahan terlihat halus

---

### Login → Dashboard Cashier

**File:** `src/features/auth/pages/LoginPage.jsx`

Halaman Login adalah tempat pengguna memasukkan username dan password.

**Bagaimana cara login?**

```jsx
// Di dalam LoginPage.jsx
const navigate = useNavigate()

const handleLogin = async (e) => {
  e.preventDefault()     // Mencegah form reload halaman
  setIsLoading(true)     // Tampilkan loading
  
  // Simulasi proses login (nanti diganti dengan API sungguhan)
  setTimeout(() => {
    setIsLoading(false)
    navigate("/dashboard")  // Pindah ke dashboard kasir
  }, 1000)
}
```

**Penjelasan:**
1. Pengguna mengisi form username & password
2. Klik tombol "Login" → fungsi `handleLogin` dijalankan
3. Setelah "login berhasil" (simulasi 1 detik), pengguna diarahkan ke `/dashboard`
4. `/dashboard` menggunakan `CashierLayout` yang punya header dan sidebar

Catatan: Saat ini login masih **simulasi** (belum pakai API/database). Nanti bisa ditambahkan backend sungguhan!

---

### Login → Dashboard Admin

Untuk masuk ke dashboard admin, tinggal buka path `/admin/dashboard`. Saat ini tidak ada redirect otomatis dari login ke admin.

Catatan: Nanti bisa ditambahkan logika untuk mengecek role pengguna (admin/kasir) dan redirect otomatis!

---

## Struktur Folder Fitur

Aplikasi ini pakai **Feature-Based Architecture**. File-file dikelompokkan berdasarkan **fitur/role**, bukan berdasarkan jenis file.

```
src/
├── main.jsx                     ← PINTU MASUK UTAMA
├── App.jsx                      ← PENGATUR ROUTING (semua halaman)
│
├── features/                    ← FOLDER FITUR (berdasarkan role)
│   ├── auth/                    ← Fitur Authentication (Login, Register, Reset)
│   │   └── pages/
│   │       ├── LoginPage.jsx    ← Halaman Login
│   │       ├── RegisPage.jsx    ← Halaman Register
│   │       └── ResetPassPage.jsx← Halaman Reset Password
│   │
│   ├── splashscreen/            ← Fitur Splash Screen
│   │   └── SplashScreen.jsx     ← Halaman pembuka aplikasi
│   │
│   ├── cashier/                 ← Fitur untuk Kasir
│   │   ├── pages/               ← Halaman-halaman kasir
│   │   │   └── CashierDashboardPage.jsx
│   │   ├── layouts/             ← Layout untuk kasir
│   │   │   └── CashierLayout.jsx
│   │   ├── components/          ← Komponen-komponen kasir
│   │   │   └── shared/          ← Komponen yang dipakai bersama
│   │   │       ├── CashierHeader.jsx
│   │   │       ├── CashierSidebar.jsx
│   │   │       └── OrderArchiveModal.jsx
│   │   ├── dashboard/           ← Fitur dashboard kasir
│   │   │   └── components/      ← Komponen dashboard
│   │   ├── sales-report/        ← Fitur laporan penjualan
│   │   └── settings/            ← Fitur pengaturan
│   │
│   └── admin/                   ← Fitur untuk Admin
│       ├── pages/               ← Halaman-halaman admin
│       │   ├── AdminDashboardPage.jsx
│       │   ├── ReportsPage.jsx
│       │   ├── MenuManagementPage.jsx
│       │   └── UserManagementPage.jsx
│       └── layouts/             ← Layout untuk admin
│           └── AdminLayout.jsx
│
├── shared/                      ← KOMPONEN BERSAMA (dipakai di mana-mana)
│   └── AuthLayout.jsx           ← Layout untuk halaman auth (login, register)
│
├── styles/                      ← FILE CSS
│   └── index.css                ← CSS global
│
└── constants/                   ← KONSTANTA
    └── colors.js                ← Warna-warna yang dipakai
```

---

## Penjelasan Layout

Layout adalah "kerangka" halaman yang **tetap** (tidak berubah saat berpindah halaman). Misalnya, header dan sidebar tetap ada saat berpindah dari Dashboard ke Settings.

### 1. AuthLayout

**File:** `src/shared/AuthLayout.jsx`

Dipakai untuk halaman **Login, Register, dan Reset Password**.

```jsx
export default function AuthLayout() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-white">
      {/* Background Image */}
      <img src={authBackground} alt="background" />
      
      {/* Content - Di sinilah halaman Login/Register muncul */}
      <div className="relative z-10 ...">
        <Outlet />  ← HALAMAN ANAK MUNCUL DI SINI
      </div>
    </div>
  )
}
```

`<Outlet />` adalah tempat di mana **halaman anak** (child route) akan muncul:
- Saat pengguna di `/login`, maka `LoginPage.jsx` muncul di tempat `<Outlet />`
- Saat pengguna di `/register`, maka `RegisPage.jsx` muncul di tempat `<Outlet />`

### 2. CashierLayout

**File:** `src/features/cashier/layouts/CashierLayout.jsx`

Digunakan untuk semua halaman **Kasir** (Dashboard, Sales Report, Settings).

```jsx
export default function CashierLayout() {
  return (
    <div>
      <CashierSidebar />          ← Sidebar kiri (tetap)
      <div>
        <CashierHeader />         ← Header atas (tetap)
        <main>
          <Outlet />              ← Konten halaman berubah di sini
        </main>
      </div>
    </div>
  )
}
```

### 3. AdminLayout

**File:** `src/features/admin/layouts/AdminLayout.jsx`

Sama seperti CashierLayout, tapi untuk halaman **Admin**.

---

## Cara Menjalankan Aplikasi

```bash
# 1. Install semua dependensi
npm install

# 2. Jalankan aplikasi dalam mode development
npm run dev

# Aplikasi akan berjalan di http://localhost:5173
# Buka di browser untuk melihat hasilnya!
```

### Apa yang terjadi saat `npm run dev`?

1. Vite (build tool) membaca file `index.html`
2. `index.html` memanggil file `src/main.jsx`
3. `main.jsx` membuat root React dan merender `<App />`
4. `App.jsx` mengatur routing dan menampilkan halaman sesuai URL
5. Browser membuka di `http://localhost:5173`

---

## Cara Menambah Halaman Baru

Misalnya, kamu ingin menambahkan halaman **"Profil"** untuk kasir.

### Langkah 1: Buat file halaman baru

Buat file: `src/features/cashier/pages/ProfilePage.jsx`

```jsx
export default function ProfilePage() {
  return (
    <div>
      <h1>Profil Kasir</h1>
      <p>Ini adalah halaman profil</p>
    </div>
  )
}
```

### Langkah 2: Export dari index.js

Tambahkan export di: `src/features/cashier/index.js`

```js
export { default as ProfilePage } from "./pages/ProfilePage"
```

### Langkah 3: Import di App.jsx

Tambahkan import di `src/App.jsx`:

```jsx
import { CashierDashboardPage, SettingsPage, SalesReportPage, ProfilePage } from "./features/cashier"
```

### Langkah 4: Tambahkan route

Tambahkan route di dalam `<CashierLayout>`:

```jsx
<Route element={<CashierLayout />}>
  <Route path="/dashboard" element={<CashierDashboardPage />} />
  <Route path="/dashboard/sales-report" element={<SalesReportPage />} />
  <Route path="/dashboard/settings" element={<SettingsPage />} />
  <Route path="/dashboard/profile" element={<ProfilePage />} />  ← BARU!
</Route>
```

### Langkah 5: Akses halaman

Buka browser dan kunjungi: `http://localhost:5173/dashboard/profile`

**Selesai!** 🎉 Kamu berhasil menambahkan halaman baru!

---

## Konsep Penting React yang Digunakan

### 1. Component

Component adalah "blok bangunan" React. Setiap bagian UI adalah component.

```jsx
// Function component (paling sederhana)
function LoginPage() {
  return <div>Halaman Login</div>
}
```

### 2. useState (State)

`useState` digunakan untuk menyimpan data yang bisa berubah dan mempengaruhi tampilan.

```jsx
const [username, setUsername] = useState("")

// Saat username berubah, tampilan otomatis update!
<input value={username} onChange={(e) => setUsername(e.target.value)} />
```

### 3. useEffect (Effect)

`useEffect` digunakan untuk menjalankan kode saat komponen "mount" (ditampilkan) atau saat ada perubahan.

```jsx
useEffect(() => {
  // Kode ini dijalankan sekali saat komponen muncul
  console.log("SplashScreen muncul!")
  
  // Setelah 3 detik, pindah ke Login
  const timer = setTimeout(() => navigate("/login"), 3000)
  
  // Cleanup saat komponen hilang
  return () => clearTimeout(timer)
}, [])
```

### 4. useNavigate (Navigasi)

`useNavigate` digunakan untuk berpindah halaman secara programatik.

```jsx
const navigate = useNavigate()

// Pindah ke halaman login
navigate("/login")

// Pindah ke dashboard
navigate("/dashboard")
```

### 5. Outlet (dari React Router)

`<Outlet />` digunakan di dalam Layout untuk menampilkan halaman anak.

```jsx
// AuthLayout.jsx
export default function AuthLayout() {
  return (
    <div>
      <Outlet />  ← Di sini halaman anak (Login, Register, dll) muncul
    </div>
  )
}
```

---

## Istilah-Istilah yang Sering Digunakan

| Istilah | Arti | Penjelasan |
|---------|------|------------|
| **Routing** | Perpindahan halaman | Cara berpindah dari satu halaman ke halaman lain |
| **Route** | Satu rute halaman | Satu halaman dengan path tertentu, misal `/login` |
| **Layout** | Kerangka halaman | Template yang membungkus beberapa halaman |
| **Component** | Blok bangunan UI | Bagian kecil dari tampilan (tombol, form, dll) |
| **State** | Data yang berubah | Data yang disimpan dan mempengaruhi tampilan |
| **Props** | Data yang dikirim | Data yang dikirim dari parent ke child component |
| **Mount** | Komponen muncul | Saat komponen pertama kali ditampilkan di layar |
| **Unmount** | Komponen hilang | Saat komponen dihapus dari layar |
| **Render** | Menampilkan UI | Proses React mengubah komponen jadi tampilan |
| **Navigate** | Berpindah halaman | Fungsi untuk berpindah ke path lain |

---

## 🎯 Rangkuman Alur Aplikasi

```
┌─────────────────────────────────────────────────────────────┐
│                     APLIKASI DIBUKA                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  main.jsx                                                   │
│  - Pintu masuk utama                                        │
│  - Membuat root React                                       │
│  - Merender <App />                                         │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  App.jsx                                                    │
│  - Mengatur semua routing dengan React Router               │
│  - Menentukan halaman mana yang ditampilkan sesuai URL      │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Route: / (Splash Screen)                                   │
│  - Tampil selama 3 detik                                    │
│  - Ada progress bar animasi                                 │
│  - Otomatis redirect ke /login                              │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Route: /login (dengan AuthLayout)                          │
│  - Pengguna memasukkan username & password                   │
│  - Klik tombol "Login"                                      │
│  - Redirect ke /dashboard                                   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Route: /dashboard (dengan CashierLayout)                   │
│  - Tampilan dashboard kasir dengan Header & Sidebar         │
│  - Bisa membuat pesanan, pembayaran, dll                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 💡 Tips

1. **Mulai dari `main.jsx`** → Ini selalu pintu masuk aplikasi React
2. **Lihat `App.jsx`** → Di sini semua routing diatur
3. **Cari komponen di folder `features/`** → Setiap fitur punya folder sendiri
4. **Gunakan `<Outlet />` di Layout** → Supaya halaman anak bisa muncul
5. **Gunakan `useNavigate` untuk pindah halaman** → Jangan pakai `<a href>`
6. **Gunakan `useState` untuk data yang berubah** → Supaya UI otomatis update
7. **Gunakan `useEffect` untuk kode yang jalan sekali** → Seperti fetch data atau timer

---

## 📚 Sumber Belajar Tambahan

- [React Official Tutorial](https://react.dev/learn)
- [React Router Tutorial](https://reactrouter.com/en/main)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

---

**Selamat belajar! 🚀** Jika ada yang kurang jelas, jangan ragu untuk bertanya!

---

*Dibuat dengan ❤️*
