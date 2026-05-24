import { useState, useEffect } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'API', 'Mobile', 'Other'];

export function AdminPersonalPage() {
  const { data, updateSection } = usePortfolio();
  const toast = useToast();

  const [personal, setPersonal] = useState(data?.personal || {});
  const [social, setSocial] = useState(data?.social || {});
  const [stats, setStats] = useState(data?.stats || []);
  const [skills, setSkills] = useState(data?.skills || []);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setPersonal(data.personal || {});
      setSocial(data.social || {});
      setStats(data.stats || []);
      setSkills(data.skills || []);
    }
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));
    updateSection('personal', personal);
    updateSection('social', social);
    updateSection('stats', stats);
    updateSection('skills', skills);
    toast.success('Personal info saved!');
    setSaving(false);
  };

  const updateStat = (i, field, value) => setStats((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  const addStat = () => setStats((prev) => [...prev, { label: '', value: '' }]);
  const removeStat = (i) => setStats((prev) => prev.filter((_, idx) => idx !== i));

  const updateSkill = (i, field, value) => setSkills((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  const addSkill = () => setSkills((prev) => [...prev, { name: '', level: 80, category: 'Frontend' }]);
  const removeSkill = (i) => setSkills((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Personal Info</h1>
        <Button onClick={handleSave} loading={saving}><Save size={16} /> Save All</Button>
      </div>

      {/* Personal */}
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
        <h2 className="font-bold font-display text-[#f0f4ff] mb-5">Basic Info</h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={personal.name || ''} onChange={(e) => setPersonal((p) => ({ ...p, name: e.target.value }))} placeholder="Ahmed Hassan" />
            <Input label="Title" value={personal.title || ''} onChange={(e) => setPersonal((p) => ({ ...p, title: e.target.value }))} placeholder="Full-Stack Developer" />
          </div>
          <Textarea label="Bio" value={personal.bio || ''} onChange={(e) => setPersonal((p) => ({ ...p, bio: e.target.value }))} rows={4} placeholder="Tell your story..." />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Location" value={personal.location || ''} onChange={(e) => setPersonal((p) => ({ ...p, location: e.target.value }))} placeholder="Cairo, Egypt" />
            <Input label="Email" value={personal.email || ''} onChange={(e) => setPersonal((p) => ({ ...p, email: e.target.value }))} placeholder="ahmed@example.com" />
          </div>
          <Input label="Phone" value={personal.phone || ''} onChange={(e) => setPersonal((p) => ({ ...p, phone: e.target.value }))} placeholder="+20 100 000 0000" />
        </div>
      </div>

      {/* Social */}
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
        <h2 className="font-bold font-display text-[#f0f4ff] mb-5">Social Links</h2>
        <div className="space-y-4">
          {['github', 'linkedin', 'twitter', 'youtube', 'website'].map((key) => (
            <Input key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={social[key] || ''} onChange={(e) => setSocial((p) => ({ ...p, [key]: e.target.value }))} placeholder={`https://${key}.com/...`} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold font-display text-[#f0f4ff]">Stats</h2>
          <button onClick={addStat} className="flex items-center gap-1.5 text-sm text-[#63d3bf] hover:text-[#63d3bf]/80"><Plus size={14} /> Add</button>
        </div>
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input placeholder="Label" value={stat.label} onChange={(e) => updateStat(i, 'label', e.target.value)} className="flex-1" />
              <Input placeholder="Value" value={stat.value} onChange={(e) => updateStat(i, 'value', e.target.value)} className="w-24" />
              <button onClick={() => removeStat(i)} className="p-2 text-[#4b5563] hover:text-[#fb7185] transition-colors shrink-0"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold font-display text-[#f0f4ff]">Skills</h2>
          <button onClick={addSkill} className="flex items-center gap-1.5 text-sm text-[#63d3bf] hover:text-[#63d3bf]/80"><Plus size={14} /> Add</button>
        </div>
        <div className="space-y-3">
          {skills.map((skill, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input placeholder="Skill name" value={skill.name} onChange={(e) => updateSkill(i, 'name', e.target.value)} className="flex-1" />
              <div className="flex flex-col gap-0.5 w-24 shrink-0">
                <input type="range" min="0" max="100" value={skill.level} onChange={(e) => updateSkill(i, 'level', Number(e.target.value))} className="accent-[#63d3bf]" />
                <span className="text-xs text-center text-[#4b5563] font-mono">{skill.level}%</span>
              </div>
              <select
                value={skill.category}
                onChange={(e) => updateSkill(i, 'category', e.target.value)}
                className="px-2 py-2 rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] text-xs outline-none w-28 shrink-0"
              >
                {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <button onClick={() => removeSkill(i)} className="p-2 text-[#4b5563] hover:text-[#fb7185] transition-colors shrink-0"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pb-8">
        <Button onClick={handleSave} loading={saving} size="lg"><Save size={16} /> Save All Changes</Button>
      </div>
    </div>
  );
}
