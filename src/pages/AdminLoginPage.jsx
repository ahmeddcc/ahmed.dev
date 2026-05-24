import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Code2 } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useToast } from '@/hooks/useContexts';
import { Button } from '@/components/ui/Button';

export function AdminLoginPage() {
  const { login } = useAdminAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('Both fields are required'); return; }
    setLoading(true);
    setError('');
    await new Promise((r) => setTimeout(r, 500));
    const result = login(form.username, form.password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#080b14]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#63d3bf]/5 via-transparent to-[#a78bfa]/5 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl border border-[rgba(255,255,255,0.07)] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#63d3bf] to-[#a78bfa] flex items-center justify-center mx-auto mb-4">
              <Code2 size={24} className="text-[#080b14]" />
            </div>
            <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Admin Portal</h1>
            <p className="text-sm text-[#4b5563] mt-1">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b5563]" />
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] text-sm placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/50 transition-all"
                autoComplete="username"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b5563]" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] text-sm placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/50 transition-all"
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b5563] hover:text-[#8892a4]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#fb7185]/10 border border-[#fb7185]/20 text-sm text-[#fb7185]">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full" size="lg">Sign In</Button>
          </form>

          <p className="text-xs text-center text-[#4b5563] mt-6">
            Default: <span className="font-mono text-[#63d3bf]/70">ahmed</span> / <span className="font-mono text-[#63d3bf]/70">ahmed2024portfolio</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
