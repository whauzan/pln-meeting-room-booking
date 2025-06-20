# 🏢 PLN Meeting Room Booking System

> **🧪 Proyek ini dibuat sebagai bagian dari _Technical Test Frontend Developer_ untuk PLN (Perusahaan Listrik Negara).**

Sistem aplikasi pemesanan ruang meeting untuk memenuhi kebutuhan operasional karyawan PLN Group yang dapat digunakan oleh seluruh pegawai PLN Pusat.

![PLN Meeting Room Booking](https://img.shields.io/badge/PLN-Meeting%20Room%20Booking-blue)
![React](https://img.shields.io/badge/React-19+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6+-646CFF?logo=vite)

## 📋 Deskripsi Proyek

Divisi GA PLN membutuhkan sistem aplikasi untuk melakukan pemesanan ruang meeting yang dapat dipesan secara langsung oleh seluruh pegawai PLN Pusat. Sistem ini mendukung pemesanan mandiri oleh pegawai maupun melalui Admin Unit yang ditunjuk oleh SuperAdmin.

## ✨ Fitur Utama

### 🎯 Dashboard Analytics
- **Overview Pemakaian**: Statistik penggunaan ruang meeting per periode
- **Monitoring Konsumsi**: Tracking nominal konsumsi dan breakdown per kategori
- **Visualisasi Data**: Grafik okupansi dan consumption breakdown per ruangan
- **Filter Periode**: Analisis data berdasarkan periode waktu tertentu

### 📅 Sistem Pemesanan
- **Pemesanan Mandiri**: Pegawai dapat memesan ruang meeting secara langsung
- **Admin Booking**: Admin Unit dapat melakukan pemesanan untuk pegawai lain
- **Real-time Availability**: Pengecekan ketersediaan ruang secara real-time
- **Manajemen User**: Sistem role-based untuk SuperAdmin, Admin, dan User

### 🍽️ Sistem Konsumsi Otomatis
- **Auto-calculation**: Perhitungan otomatis jenis dan nominal konsumsi
- **Smart Rules**: Deteksi otomatis jenis konsumsi berdasarkan waktu meeting
- **Cost Management**: Tracking biaya konsumsi per peserta dan total

## 🛠️ Tech Stack

### Frontend
- **React 19** - Library UI
- **TypeScript** - Type-safe development
- **Vite** - Build tool dan development server
- **TanStack Router** - Client-side routing
- **TanStack Query** - Data fetching dan state management
- **Tailwind CSS** - Utility-first CSS framework

### Form & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Date-fns** - Date manipulation

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📁 Struktur Proyek

```
pln-meeting-room-booking/
├── src/
│   ├── features/              # Feature-based modules
│   │   ├── dashboard/         # Dashboard analytics
│   │   └── meeting/          # Meeting booking
│   ├── shared/               # Shared components & utilities
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/           # Custom hooks
│   │   └── lib/             # Utilities & configurations
│   └── routes/              # Route definitions
├── public/                  # Static assets
```

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js 22+ 
- pnpm (recommended) atau npm

### Installation Steps

1. **Clone repository**
   ```bash
   git clone https://github.com/whauzan/pln-meeting-room-booking
   cd pln-meeting-room-booking
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # atau
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` dan sesuaikan dengan konfigurasi Anda.

4. **Start development server**
   ```bash
   pnpm dev
   # atau
   npm run dev
   ```

5. **Buka aplikasi**
   ```
   http://localhost:5173
   ```

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build untuk production
pnpm preview      # Preview build hasil
pnpm lint         # Run ESLint
```

## 📊 API Endpoints

### Master Data
- **Summary Booking**: `https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings`
- **Master Unit**: `https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice`
- **Master Meeting Rooms**: `https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms`
- **Master Jenis Konsumsi**: `https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi`

## 🎯 Business Rules

### ⏰ Aturan Konsumsi
| Waktu Meeting | Jenis Konsumsi | Harga per Peserta |
|---------------|----------------|-------------------|
| Sebelum 11:00 | Snack Siang | Rp 20.000 |
| 11:00 - 14:00 | Makan Siang | Rp 30.000 |
| Setelah 14:00 | Snack Sore | Rp 20.000 |

**Catatan**: Jika meeting melintasi beberapa periode waktu, peserta mendapat konsumsi sesuai aturan yang berlaku (akumulatif).

### ✅ Validasi Sistem
- Waktu mulai ≥ tanggal hari ini
- Waktu mulai < waktu selesai
- Jumlah peserta ≤ kapasitas ruangan
- Ruangan tersedia pada waktu yang dipilih

## 🏗️ Architecture

### Feature-Based Structure
Proyek ini menggunakan arsitektur feature-based dimana setiap fitur memiliki:
- **Components**: React components specific untuk fitur
- **Hooks**: Custom hooks untuk state management
- **Services**: API calls dan business logic
- **Types**: TypeScript interfaces
- **Utils**: Utility functions

### State Management
- **TanStack Query**: Server state management
- **React Hook Form**: Form state management

<div align="center">
  <strong>PLN Meeting Room Booking System</strong><br>
  Memudahkan pemesanan ruang meeting untuk operasional PLN Group
</div>