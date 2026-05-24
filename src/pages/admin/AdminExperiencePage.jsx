import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';
import { useToast } from '@/hooks/useToast';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { validateForm, experienceSchema } from '@/services/validationService';
import { staggerContainer, fadeUp } from '@/animations/variants';

const EMPTY_EXP = {
  company: '', role: '', period: '', location: '', description: '', technologies: [], highlights: [],
};

export function AdminExperiencePage() {
  const { data, updateSection } = usePortfolio();
  const toast = useToast();
  const experience = data?.experience || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_EXP);
  const [errors, setErrors] = useState({});
  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const openAdd = () => { setEditing(null); setForm(EMPTY_EXP); setErrors({}); setTechInput(''); setHighlightInput(''); setModalOpen(true); };
  const openEdit = (e) => { setEditing(e.id); setForm({ ...e }); setErrors({}); setTechInput(''); setHighlightInput(''); setModalOpen(true); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) setForm((p) => ({ ...p, technologies: [...p.technologies, t] }));
    setTechInput('');
  };
  const removeTech = (t) => setForm((p) => ({ ...p, technologies: p.technologies.filter((x) => x !== t) }));

  const addHighlight = () => {
    const h = highlightInput.trim();
    if (h) setForm((p) => ({ ...p, highlights: [...p.highlights, h] }));
    setHighlightInput('');
  };
  const removeHighlight = (i) => setForm((p) => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) }));

  const handleSave = () => {
    const { valid, errors: valErrors } = validateForm(experienceSchema, form);
    if (!valid) { setErrors(valErrors); return; }
    const id = editing || String(Date.now());
    const updated = editing
      ? experience.map((e) => (e.id === editing ? { ...form, id } : e))
      : [...experience, { ...form, id }];
    updateSection('experience', updated);
    toast.success(editing ? 'Experience updated!' : 'Experience added!');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    updateSection('experience', experience.filter((e) => e.id !== id));
    toast.success('Experience deleted.');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Experience</h1>
          <p className="text-sm text-[#4b5563] mt-1">{experience.length} entr{experience.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} /> Add Experience</Button>
      </div>

      {experience.length === 0 ? (
        <EmptyState title="No experience yet" description="Add your work history." action={<Button onClick={openAdd}><Plus size={16} /> Add Experience</Button>} />
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
          {experience.map((exp) => (
            <motion.div key={exp.id} variants={fadeUp} className="glass rounded-xl border border-[rgba(255,255,255,0.05)] p-5 hover:border-[rgba(99,211,191,0.1)] transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold font-display text-[#f0f4ff]">{exp.role}</p>
                  <p className="text-sm text-[#63d3bf]">{exp.company}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#4b5563]">
                    <span>{exp.period}</span>
                    {exp.location && <span className="flex items-center gap-1"><MapPin size={10} />{exp.location}</span>}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.technologies.slice(0, 5).map((t) => <Badge key={t} variant="gray">{t}</Badge>)}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(exp)} className="p-1.5 text-[#4b5563] hover:text-[#a78bfa] transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => setDeleteId(exp.id)} className="p-1.5 text-[#4b5563] hover:text-[#fb7185] transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Experience' : 'Add Experience'} size="lg">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Company *" name="company" value={form.company} onChange={handleChange} error={errors.company} placeholder="Company name" />
            <Input label="Role *" name="role" value={form.role} onChange={handleChange} error={errors.role} placeholder="Job title" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Period *" name="period" value={form.period} onChange={handleChange} error={errors.period} placeholder="2022 – Present" />
            <Input label="Location *" name="location" value={form.location} onChange={handleChange} error={errors.location} placeholder="Cairo, Egypt" />
          </div>
          <Textarea label="Description *" name="description" value={form.description} onChange={handleChange} error={errors.description} rows={3} placeholder="Role overview..." />

          <div>
            <label className="text-sm font-medium text-[#8892a4] block mb-1.5">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Add tech, press Enter" className="flex-1 px-3 py-2 text-sm rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/50" />
              <button type="button" onClick={addTech} className="px-3 py-2 rounded-lg bg-[rgba(99,211,191,0.1)] text-[#63d3bf] text-sm border border-[rgba(99,211,191,0.2)]">Add</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.technologies.map((t) => (
                <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[rgba(99,211,191,0.1)] text-[#63d3bf] border border-[rgba(99,211,191,0.2)]">
                  {t}<button onClick={() => removeTech(t)} className="hover:text-[#fb7185]">×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#8892a4] block mb-1.5">Highlights</label>
            <div className="flex gap-2 mb-2">
              <input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                placeholder="Add achievement, press Enter" className="flex-1 px-3 py-2 text-sm rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/50" />
              <button type="button" onClick={addHighlight} className="px-3 py-2 rounded-lg bg-[rgba(167,139,250,0.1)] text-[#a78bfa] text-sm border border-[rgba(167,139,250,0.2)]">Add</button>
            </div>
            <div className="space-y-1.5">
              {form.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#8892a4] bg-[rgba(255,255,255,0.03)] rounded-lg px-3 py-2">
                  <span className="flex-1">{h}</span>
                  <button onClick={() => removeHighlight(i)} className="text-[#4b5563] hover:text-[#fb7185]">×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Experience'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId)}
        title="Delete Experience" message="Are you sure? This cannot be undone." confirmLabel="Delete" danger />
    </div>
  );
}
