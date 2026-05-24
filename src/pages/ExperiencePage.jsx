import { motion } from 'framer-motion';
import { Briefcase, MapPin, ChevronRight } from 'lucide-react';
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { MotionSection } from '@/components/shared/MotionSection';
import { Badge } from '@/components/ui/Badge';
import { usePortfolio } from '@/context/PortfolioContext';
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

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div key={exp.id} variants={fadeUp} className="md:pl-16 relative">
                {/* Dot */}
                <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-[#111827] border-2 border-[#63d3bf]/40 items-center justify-center">
                  <Briefcase size={16} className="text-[#63d3bf]" />
                </div>

                <div className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 hover:border-[rgba(99,211,191,0.15)] transition-all group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold font-display text-[#f0f4ff] group-hover:text-[#63d3bf] transition-colors">{exp.role}</h3>
                      <p className="text-[#63d3bf] font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                      <Badge variant="default">{exp.period}</Badge>
                      <span className="flex items-center gap-1 text-xs text-[#4b5563]"><MapPin size={11} />{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-[#8892a4] text-sm leading-relaxed mb-4">{exp.description}</p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-[#8892a4]">
                          <ChevronRight size={14} className="text-[#63d3bf] mt-0.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="gray">{tech}</Badge>
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
