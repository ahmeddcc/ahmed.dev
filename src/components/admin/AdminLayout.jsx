import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { session } = useAdminAuth();

  return (
    <div className="flex h-screen bg-[#080b14] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-6 shrink-0 bg-[#080b14]">
          <button
            className="md:hidden p-1 text-[#8892a4] hover:text-[#f0f4ff]"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-[#4b5563]">Signed in as</p>
              <p className="text-sm font-medium text-[#f0f4ff]">{session?.username}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#63d3bf] to-[#a78bfa] flex items-center justify-center text-[#080b14] text-sm font-bold">
              {session?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
