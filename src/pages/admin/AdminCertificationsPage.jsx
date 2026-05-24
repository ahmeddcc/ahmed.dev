import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Award } from 'lucide-react';
import { usePortfolio } from '@/hooks/useContexts';
import { useToast } from '@/hooks/useContexts';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { validateForm, certificationSchema } from '@/services/validationService';
import { staggerContainer, fadeUp } from '@/animations/variants';

const EMPTY_CERT = { title: '', issuer: '', date: '', credentialId: '', verifyUrl: '', expires: '', image: '' };

export function AdminCertificationsPage() {
  const { data, updateSection } = usePortfolio();
  const toast = useToast();
  const certifications = data?.certifications || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_CERT);
  const [errors, setErrors] = useState({});

  const openAdd = () => { setEditing(null); setForm(EMPTY_CERT); setErrors({}); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c.id); setForm({ ...c }); setErrors({}); setModalOpen(true); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSave = () => {
    const { valid, errors: valErrors } = validateForm(certificationSchema, form);
    if (!valid) { setErrors(valErrors); return; }
    const id = editing || String(Date.now());
    const updated = editing
      ? certifications.map((c) => (c.id === editing ? { ...form, id } : c))
      : [...certifications, { ...form, id }];
    updateSection('certifications', updated);
    toast.success(editing ? 'Certification updated!' : 'Certification added!');
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    updateSection('certifications', certifications.filter((c) => c.id !== id));
    toast.success('Certification deleted.');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#f0f4ff]">Certifications</h1>
          <p className="text-sm text-[#4b5563] mt-1">{certifications.length} certification{certifications.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} /> Add Certification</Button>
      </div>

      {certifications.length === 0 ? (
        <EmptyState title="No certifications yet" description="Showcase your professional credentials." action={<Button onClick={openAdd}><Plus size={16} /> Add Certification</Button>} />
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={fadeUp} className="glass rounded-xl border border-[rgba(255,255,255,0.05)] p-5 hover:border-[rgba(99,211,191,0.1)] transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(99,211,191,0.1)] flex items-center justify-center shrink-0">
                  <Award size={18} className="text-[#63d3bf]" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(cert)} className="p-1.5 text-[#4b5563] hover:text-[#a78bfa] transition-colors"><Pencil size={14} /></button>
                  <button onClick={() => setDeleteId(cert.id)} className="p-1.5 text-[#4b5563] hover:text-[#fb7185] transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-semibold font-display text-[#f0f4ff] text-sm leading-snug">{cert.title}</p>
                <p className="text-xs text-[#63d3bf] mt-0.5">{cert.issuer}</p>
                <p className="text-xs text-[#4b5563] mt-1">{cert.date}{cert.expires ? ` · Expires ${cert.expires}` : ''}</p>
                {cert.credentialId && <p className="text-xs text-[#4b5563] font-mono mt-0.5">{cert.credentialId}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Certification' : 'Add Certification'} size="md">
        <div className="space-y-4">
          <Input label="Title *" name="title" value={form.title} onChange={handleChange} error={errors.title} placeholder="AWS Certified Solutions Architect" />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Issuer *" name="issuer" value={form.issuer} onChange={handleChange} error={errors.issuer} placeholder="Amazon Web Services" />
            <Input label="Date *" name="date" value={form.date} onChange={handleChange} error={errors.date} placeholder="2023" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Credential ID" name="credentialId" value={form.credentialId} onChange={handleChange} placeholder="AWS-SA-2023-001" />
            <Input label="Expires" name="expires" value={form.expires} onChange={handleChange} placeholder="2026 or No Expiry" />
          </div>
          <Input label="Verify URL" name="verifyUrl" value={form.verifyUrl} onChange={handleChange} error={errors.verifyUrl} placeholder="https://..." />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? 'Save Changes' : 'Add Certification'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => handleDelete(deleteId)}
        title="Delete Certification" message="Are you sure? This cannot be undone." confirmLabel="Delete" danger />
    </div>
  );
}
