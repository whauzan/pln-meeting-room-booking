import { Link } from '@tanstack/react-router';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="max-w-md w-full text-center flex flex-col gap-4">
        <div className="flex flex-col gap-6">
          <div className="w-24 h-24 flex items-center justify-center mx-auto">
            <img src="/logo.png" alt="Logo PLN" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-6xl font-bold text-gray-900">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700">
                Halaman Tidak Ditemukan
              </h2>
            </div>
            <p className="text-gray-600">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman
              mungkin telah dipindahkan atau dihapus.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link to="/dashboard">
            <button className="px-4 py-2 cursor-pointer rounded-lg bg-[#05ADEE] hover:bg-[#05ADEE]/70 text-white flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 cursor-pointer rounded-lg border border-[#05ADEE] hover:bg-[#05ADEE]/75 hover:text-white transition-colors flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Halaman Sebelumnya
          </button>
        </div>
      </div>
    </div>
  );
}
