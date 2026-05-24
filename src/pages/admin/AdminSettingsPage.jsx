import { useState } from 'react';
import { Save, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/Modal';
import { backupService } from '@/services/backupService';
import { storageService } from '@/services/storageService';

export function AdminSettingsPage() {
  const { data, updateSection, reload } = usePortfolio();
  const toast = useToast();
  const [resetOpen, setResetOpen] = useState(false);
  const [accent, setAccent] = useState(data?.theme?.accentColor || '#63d3bf');

  const handleSaveTheme = () => {
    updateSection('theme', { ...data?.theme, accentColor: accent });
    toast.success('Theme saved!');
  };

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

  const handleReset = () => {
    storageService.clearData();
    reload();
    toast.success('Data reset to defaults.');
  };

  const ACCENT_PRESETS = ['#63d3bf', '#a78bfa', '#fbbf24', '#fb7185', '#34d399', '#60a5fa', '#f472b6'];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Settings</h1>

      {/* Theme */}
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
        <h2 className="font-bold font-display text-[#f0f4ff] mb-5">Theme</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-[#8892a4] mb-3">Accent Color</p>
            <div className="flex items-center gap-3 flex-wrap">
              {ACCENT_PRESETS.map((c) => (
                <button
                  key={c}
                  onClick={() => setAccent(c)}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{ backgroundColor: c, borderColor: accent === c ? '#f0f4ff' : 'transparent' }}
                />
              ))}
              <div className="flex items-center gap-2">
                <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                <span className="text-xs font-mono text-[#4b5563]">{accent}</span>
              </div>
            </div>
          </div>
          <Button onClick={handleSaveTheme}><Save size={16} /> Save Theme</Button>
        </div>
      </div>

      {/* Backup */}
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
        <h2 className="font-bold font-display text-[#f0f4ff] mb-5">Data Management</h2>
        <div className="space-y-3">
          <button onClick={handleBackup} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(99,211,191,0.2)] text-sm text-[#63d3bf] hover:bg-[rgba(99,211,191,0.06)] transition-all">
            <Download size={16} /> Export Full Backup (JSON)
          </button>
          <label className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-[rgba(167,139,250,0.2)] text-sm text-[#a78bfa] hover:bg-[rgba(167,139,250,0.06)] transition-all cursor-pointer">
            <Upload size={16} /> Restore from Backup
            <input type="file" accept=".json" onChange={handleRestore} className="hidden" />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass rounded-2xl border border-[rgba(251,113,133,0.2)] p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={18} className="text-[#fb7185]" />
          <h2 className="font-bold font-display text-[#fb7185]">Danger Zone</h2>
        </div>
        <p className="text-sm text-[#8892a4] mb-4">Reset all portfolio data to the default template. This cannot be undone.</p>
        <Button variant="danger" onClick={() => setResetOpen(true)}><Trash2 size={16} /> Reset to Defaults</Button>
      </div>

      <ConfirmDialog
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
        title="Reset Portfolio Data"
        message="This will permanently delete all your custom content and restore defaults. Are you sure?"
        confirmLabel="Yes, Reset"
        danger
      />
    </div>
  );
}
