import { Link } from '@tanstack/react-router';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '../ui/button';

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center">
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
            <Button variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Halaman Sebelumnya
          </Button>
        </div>
      </div>
    </div>
  );
}
