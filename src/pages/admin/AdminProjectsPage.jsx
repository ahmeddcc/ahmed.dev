import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/shared/SocialIcons";
import { usePortfolio } from '@/hooks/useContexts';
import { useToast } from '@/hooks/useContexts';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { validateForm, projectSchema } from '@/services/validationService';
import { PROJECT_CATEGORIES } from '@/constants';
import { staggerContainer, fadeUp } from '@/animations/variants';

const EMPTY_PROJECT = {
  title: '', description: '', longDescription: '', technologies: [],
  category: 'Web', liveUrl: '', githubUrl: '', featured: false, status: 'Live', image: '',
};

export function AdminProjectsPage() {
  const { data, updateSection } = usePortfolio();
  const toast = useToast();
  const projects = data?.projects || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_PROJECT);
  const [errors, setErrors] = useState({});
  const [techInput, setTechInput] = useState('');

  const openAdd = () => { setEditing(null); setForm(EMPTY_PROJECT); setErrors({}); setTechInput(''); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p.id); setForm({ ...p }); setErrors({}); setTechInput(''); setModalOpen(true); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      setForm((prev) => ({ ...prev, technologies: [...prev.technologies, t] }));
    }
    setTechInput('');
  };

  const removeTech = (tech) => setForm((prev) => ({ ...prev, technologies: prev.technologies.filter((t) => t !== tech) }));

  const handleSave = () => {
    const { valid, errors: valErrors } = validateForm(projectSchema, form);
    if (!valid) { setErrors(valErrors); return; }
    const id = editing || String(Date.now());
    const updated = editing
      ? projects.map((p) => (p.id === editing ? { ...form, id } : p))
      : [...projects, { ...form, id }];
    updateSection('projects', updated);
    toast.success(editing ? 'Project updated!' : 'Project added!');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    updateSection('projects', projects.filter((p) => p.id !== id));
    toast.success('Project deleted.');
  };

  const catOptions = PROJECT_CATEGORIES.filter((c) => c !== 'All').map((c) => ({ value: c, label: c }));
  const statusOptions = [{ value: 'Live', label: 'Live' }, { value: 'In Progress', label: 'In Progress' }, { value: 'Archived', label: 'Archived' }];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Projects</h1>
          <p className="text-sm text-[#4b5563] mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} /> Add Project</Button>
      </div>

      {projects.length === 0 ? (
        <EmptyState title="No projects yet" description="Add your first project to showcase your work." action={<Button onClick={openAdd}><Plus size={16} /> Add Project</Button>} />
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-3">
          {projects.map((p) => (
            <motion.div key={p.id} variants={fadeUp} className="glass rounded-xl border border-[rgba(255,255,255,0.05)] p-4 hover:border-[rgba(99,211,191,0.1)] transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-semibold font-display text-[#f0f4ff]">{p.title}</h3>
                    <Badge variant={p.status === 'Live' ? 'default' : p.status === 'In Progress' ? 'amber' : 'gray'}>{p.status}</Badge>
                    {p.featured && <Badge variant="violet">Featured</Badge>}
                  </div>
                  <p className="text-sm text-[#4b5563] truncate">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {p.technologies.slice(0, 5).map((t) => <Badge key={t} variant="gray">{t}</Badge>)}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#4b5563] hover:text-[#63d3bf] transition-colors"><ExternalLink size={15} /></a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#4b5563] hover:text-[#f0f4ff] transition-colors"><GithubIcon size={15} /></a>}
                  <button onClick={() => openEdit(p)} className="p-1.5 text-[#4b5563] hover:text-[#a78bfa] transition-colors"><Pencil size={15} /></button>
                  <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-[#4b5563] hover:text-[#fb7185] transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Project' : 'Add Project'} size="lg">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Title *" name="title" value={form.title} onChange={handleChange} error={errors.title} placeholder="Project name" />
            <Select label="Category *" name="category" value={form.category} onChange={handleChange} options={catOptions} error={errors.category} />
          </div>
          <Textarea label="Short Description *" name="description" value={form.description} onChange={handleChange} error={errors.description} rows={2} placeholder="Brief overview..." />
          <Textarea label="Long Description" name="longDescription" value={form.longDescription} onChange={handleChange} rows={3} placeholder="Detailed description..." />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Live URL" name="liveUrl" value={form.liveUrl} onChange={handleChange} error={errors.liveUrl} placeholder="https://..." />
            <Input label="GitHub URL" name="githubUrl" value={form.githubUrl} onChange={handleChange} error={errors.githubUrl} placeholder="https://github.com/..." />
          </div>
          <Select label="Status *" name="status" value={form.status} onChange={handleChange} options={statusOptions} />

          <div>
            <label className="text-sm font-medium text-[#8892a4] block mb-1.5">Technologies *</label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="Add technology and press Enter"
                className="flex-1 px-3 py-2 text-sm rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/50"
              />
              <button type="button" onClick={addTech} className="px-3 py-2 rounded-lg bg-[rgba(99,211,191,0.1)] text-[#63d3bf] text-sm border border-[rgba(99,211,191,0.2)] hover:bg-[rgba(99,211,191,0.15)]">Add</button>
            </div>
            {errors.technologies && <p className="text-xs text-[#fb7185] mb-2">{errors.technologies}</p>}
            <div className="flex flex-wrap gap-1.5">
              {form.technologies.map((t) => (
                <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[rgba(99,211,191,0.1)] text-[#63d3bf] border border-[rgba(99,211,191,0.2)]">
                  {t}
                  <button onClick={() => removeTech(t)} className="ml-0.5 hover:text-[#fb7185]">×</button>
                </span>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-[#63d3bf]" />
            <span className="text-sm text-[#8892a4]">Mark as Featured</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Project'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => handleDelete(deleteId)}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmLabel="Delete"
        danger
      />
    </div>
  );
}
