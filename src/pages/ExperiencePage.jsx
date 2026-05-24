import { motion } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/Badge';
import { usePortfolio } from '@/hooks/useContexts';
import { staggerContainer, fadeUp } from '@/animations/variants';

export function ExperiencePage() {
  const { data } = usePortfolio();
  const experience = data?.experience || [];

  return (
    <PageLayout>
      <Section>
        <SectionHeader eyebrow="Career" title="Work Experience" description="My professional journey and the companies I've been fortunate to work with." />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#63d3bf] via-[#a78bfa] to-transparent hidden md:block" />

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            {experience.map((exp) => (
              <motion.div key={exp.id} variants={fadeUp} className="md:pl-20 relative group">
                {/* Dot */}
                <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.07)] items-center justify-center group-hover:border-[#63d3bf]/50 transition-colors z-10 shadow-xl">
                  <Briefcase size={18} className="text-[#63d3bf]" />
                </div>

                <div className="glass rounded-3xl border border-[rgba(255,255,255,0.05)] p-6 sm:p-8 hover:border-[rgba(99,211,191,0.2)] transition-all relative">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold font-display text-[#f0f4ff] group-hover:text-[#63d3bf] transition-colors">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[#63d3bf] font-semibold tracking-wide">{exp.company}</p>
                        {exp.location && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#4b5563]" />
                            <span className="flex items-center gap-1 text-xs text-[#8892a4]"><MapPin size={12} />{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Badge variant="violet" className="py-1 px-4">{exp.period}</Badge>
                    </div>
                  </div>

                  <p className="text-[#8892a4] text-base leading-relaxed mb-6">{exp.description}</p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {exp.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-3 text-sm text-[#8892a4]">
                          <div className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#63d3bf]/40" />
                          <p>{h}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="gray" className="bg-[#080b14]">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </PageLayout>
  );
}
