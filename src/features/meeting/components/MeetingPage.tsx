import { Link } from '@tanstack/react-router';
import { Button } from '../../../shared/components/ui/button';
import { Plus } from 'lucide-react';

export default function MeetingPage() {
  return (
    <div className="py-6 pl-7 pr-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-text font-bold text-[28px]">Ruang Meeting</h1>
          <p className="text-sm text-primary font-normal">Ruang Meeting</p>
        </div>

        <Link to="/meeting/pesan-ruangan">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            Pesan Ruangan
          </Button>
        </Link>
      </div>
    </div>
  );
}
