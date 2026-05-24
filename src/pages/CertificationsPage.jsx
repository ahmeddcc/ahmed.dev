import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar, Hash } from 'lucide-react';
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { usePortfolio } from '@/hooks/useContexts';
import { staggerContainer, scaleIn } from '@/animations/variants';

export function CertificationsPage() {
  const { data } = usePortfolio();
  const certifications = data?.certifications || [];

  return (
    <PageLayout>
      <Section>
        <SectionHeader eyebrow="Credentials" title="Certifications" description="Professional certifications and credentials that validate my expertise." />

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={scaleIn}
              className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 hover:border-[rgba(99,211,191,0.2)] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#63d3bf]/10 to-[#a78bfa]/10 border border-[rgba(99,211,191,0.15)] flex items-center justify-center">
                  <Award size={22} className="text-[#63d3bf]" />
                </div>
                {cert.verifyUrl && (
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 text-[#4b5563] hover:text-[#63d3bf] transition-colors">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              <h3 className="font-bold font-display text-[#f0f4ff] mb-1 group-hover:text-[#63d3bf] transition-colors leading-snug">{cert.title}</h3>
              <p className="text-sm text-[#63d3bf] mb-4">{cert.issuer}</p>

              <div className="space-y-2 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-2 text-xs text-[#4b5563]">
                  <Calendar size={12} />
                  Issued: {cert.date}
                  {cert.expires && ` · Expires: ${cert.expires}`}
                </div>
                {cert.credentialId && (
                  <div className="flex items-center gap-2 text-xs text-[#4b5563]">
                    <Hash size={12} />
                    <span className="font-mono">{cert.credentialId}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {certifications.length === 0 && (
          <div className="text-center py-16 text-[#4b5563]">No certifications added yet.</div>
        )}
      </Section>
    </PageLayout>
  );
}
