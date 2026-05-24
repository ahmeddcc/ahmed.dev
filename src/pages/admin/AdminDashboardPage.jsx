import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, Briefcase, Award, Activity, Download, Upload, ArrowRight } from 'lucide-react';
import { usePortfolio } from '@/hooks/useContexts';
import { useToast } from '@/hooks/useContexts';
import { backupService } from '@/services/backupService';
import { staggerContainer, scaleIn } from '@/animations/variants';

const STAT_CARDS = [
  { label: 'Projects', icon: FolderOpen, key: 'projects', path: '/admin/projects', color: '#63d3bf' },
  { label: 'Experience', icon: Briefcase, key: 'experience', path: '/admin/experience', color: '#a78bfa' },
  { label: 'Certifications', icon: Award, key: 'certifications', path: '/admin/certifications', color: '#fbbf24' },
  { label: 'Skills', icon: Activity, key: 'skills', path: '/admin/personal', color: '#fb7185' },
];

export function AdminDashboardPage() {
  const { data, reload } = usePortfolio();
  const toast = useToast();

  const handleBackup = () => {
    try { backupService.createBackup(); toast.success('Backup downloaded!'); }
    catch { toast.error('Backup failed.'); }
  };

  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    backupService.restoreBackup(file)
      .then(() => { toast.success('Restored successfully!'); reload(); })
      .catch((err) => toast.error(err.message));
    e.target.value = '';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Dashboard</h1>
        <p className="text-sm text-[#4b5563] mt-1">Overview of your portfolio content</p>
      </div>

      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const count = data?.[card.key]?.length ?? 0;
          return (
            <motion.div key={card.key} variants={scaleIn}>
              <Link to={card.path} className="block glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-5 hover:border-[rgba(99,211,191,0.15)] transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}14` }}>
                    <Icon size={18} style={{ color: card.color }} />
                  </div>
                  <ArrowRight size={14} className="text-[#4b5563] group-hover:text-[#63d3bf] transition-colors" />
                </div>
                <p className="text-2xl font-bold font-display text-[#f0f4ff]">{count}</p>
                <p className="text-xs text-[#4b5563] mt-0.5">{card.label}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
          <h2 className="font-bold font-display text-[#f0f4ff] mb-4">Data Management</h2>
          <div className="space-y-3">
            <button onClick={handleBackup} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(99,211,191,0.2)] text-sm text-[#63d3bf] hover:bg-[rgba(99,211,191,0.06)] transition-all">
              <Download size={16} /> Export Backup (JSON)
            </button>
            <label className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(167,139,250,0.2)] text-sm text-[#a78bfa] hover:bg-[rgba(167,139,250,0.06)] transition-all cursor-pointer">
              <Upload size={16} /> Restore from Backup
              <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
            </label>
          </div>
        </div>

        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
          <h2 className="font-bold font-display text-[#f0f4ff] mb-4">Quick Links</h2>
          <div className="space-y-2">
            {[
              { label: 'View Live Portfolio', path: '/' },
              { label: 'Edit Personal Info', path: '/admin/personal' },
              { label: 'Manage Projects', path: '/admin/projects' },
              { label: 'Update Settings', path: '/admin/settings' },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.04)] transition-all">
                {item.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
