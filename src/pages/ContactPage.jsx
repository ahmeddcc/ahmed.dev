import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/shared/SocialIcons";
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { MotionSection } from '@/components/shared/MotionSection';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { usePortfolio } from '@/context/PortfolioContext';
import { useToast } from '@/hooks/useToast';
import { contactService } from '@/services/contactService';
import { validateForm, contactSchema } from '@/services/validationService';

export function ContactPage() {
  const { data } = usePortfolio();
  const toast = useToast();
  const personal = data?.personal || {};
  const social = data?.social || {};

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, errors: valErrors } = validateForm(contactSchema, form);
    if (!valid) { setErrors(valErrors); return; }
    setLoading(true);
    try {
      await contactService.send(form);
      toast.success('Message sent! I will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Section>
        <SectionHeader eyebrow="Get In Touch" title="Contact Me" description="Have a project in mind or just want to say hello? I'd love to hear from you." />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <MotionSection>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Your Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                <Input label="Email Address" name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} error={errors.email} />
              </div>
              <Input label="Subject" name="subject" placeholder="Project inquiry" value={form.subject} onChange={handleChange} error={errors.subject} />
              <Textarea label="Message" name="message" rows={6} placeholder="Tell me about your project..." value={form.message} onChange={handleChange} error={errors.message} />
              <Button type="submit" loading={loading} size="lg" className="w-full">
                <Send size={16} /> Send Message
              </Button>
            </form>
          </MotionSection>

          {/* Info */}
          <MotionSection delay={0.15}>
            <div className="space-y-6">
              <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 space-y-4">
                <h3 className="font-bold font-display text-[#f0f4ff] text-lg">Contact Info</h3>
                {personal.email && (
                  <div className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(99,211,191,0.1)] flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-[#63d3bf]" />
                    </div>
                    <a href={`mailto:${personal.email}`} className="hover:text-[#63d3bf] transition-colors">{personal.email}</a>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(99,211,191,0.1)] flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-[#63d3bf]" />
                    </div>
                    {personal.phone}
                  </div>
                )}
                {personal.location && (
                  <div className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(99,211,191,0.1)] flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-[#63d3bf]" />
                    </div>
                    {personal.location}
                  </div>
                )}
              </div>

              <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6">
                <h3 className="font-bold font-display text-[#f0f4ff] text-lg mb-4">Follow Me</h3>
                <div className="flex gap-3">
                  {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.07)] text-sm text-[#8892a4] hover:text-[#f0f4ff] hover:border-[rgba(99,211,191,0.3)] transition-all"><GithubIcon size={16} /> GitHub</a>}
                  {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[rgba(255,255,255,0.07)] text-sm text-[#8892a4] hover:text-[#f0f4ff] hover:border-[rgba(99,211,191,0.3)] transition-all"><LinkedinIcon size={16} /> LinkedIn</a>}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[rgba(99,211,191,0.05)] to-[rgba(167,139,250,0.05)] border border-[rgba(99,211,191,0.1)]">
                <p className="text-sm text-[#8892a4] leading-relaxed">
                  Typically respond within <span className="text-[#63d3bf] font-medium">24 hours</span>. For urgent inquiries, feel free to reach out directly via email.
                </p>
              </div>
            </div>
          </MotionSection>
        </div>
      </Section>
    </PageLayout>
  );
}
