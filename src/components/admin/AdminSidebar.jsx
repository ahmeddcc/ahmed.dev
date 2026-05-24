import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Briefcase, Award, User, Settings, LogOut, Code2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/useContexts';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Projects', icon: FolderOpen, path: '/admin/projects' },
  { label: 'Experience', icon: Briefcase, path: '/admin/experience' },
  { label: 'Certifications', icon: Award, path: '/admin/certifications' },
  { label: 'Personal Info', icon: User, path: '/admin/personal' },
  { label: 'Settings', icon: Settings, path: '/admin/settings' },
];

export function AdminSidebar({ onClose }) {
  const { pathname } = useLocation();
  const { logout } = useAdminAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully');
    navigate('/admin');
  };

  return (
    <aside className="w-64 h-full bg-[#0d1220] border-r border-[rgba(255,255,255,0.05)] flex flex-col">
      <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#63d3bf] to-[#a78bfa] flex items-center justify-center">
            <Code2 size={16} className="text-[#080b14]" />
          </div>
          <span className="font-display font-bold text-[#f0f4ff]">Portfolio CMS</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-[rgba(99,211,191,0.1)] text-[#63d3bf]' : 'text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.04)]'}`}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#8892a4] hover:text-[#fb7185] hover:bg-[rgba(251,113,133,0.05)] transition-all"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
