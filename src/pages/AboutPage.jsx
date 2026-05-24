import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Zap } from 'lucide-react';
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { MotionSection } from '@/components/shared/MotionSection';
import { usePortfolio } from '@/hooks/useContexts';

const SKILL_COLORS = {
  Frontend: '#63d3bf',
  Backend: '#a78bfa',
  Database: '#fbbf24',
  DevOps: '#fb7185',
  Cloud: '#34d399',
  API: '#818cf8',
};

export function AboutPage() {
  const { data } = usePortfolio();
  const personal = data?.personal || {};
  const skills = data?.skills || [];
  const skillCategories = [...new Set(skills.map((s) => s.category))];

  return (
    <PageLayout>
      <Section>
        <SectionHeader eyebrow="About Me" title="Who I Am" description="A bit about my background, skills, and what drives me." />

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Bio */}
          <MotionSection>
            <div className="space-y-6">
              <p className="text-[#8892a4] leading-relaxed">{personal.bio}</p>
              <div className="space-y-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                {personal.location && (
                  <div className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <MapPin size={16} className="text-[#63d3bf]" />
                    {personal.location}
                  </div>
                )}
                {personal.email && (
                  <div className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <Mail size={16} className="text-[#63d3bf]" />
                    <a href={`mailto:${personal.email}`} className="hover:text-[#63d3bf] transition-colors">{personal.email}</a>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-3 text-sm text-[#8892a4]">
                    <Phone size={16} className="text-[#63d3bf]" />
                    {personal.phone}
                  </div>
                )}
              </div>
            </div>
          </MotionSection>

          {/* Stats overview */}
          <MotionSection delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {(data?.stats || []).map((stat, i) => (
                <div key={i} className="glass rounded-xl p-5 border border-[rgba(255,255,255,0.05)]">
                  <p className="text-2xl font-bold font-display gradient-text">{stat.value}</p>
                  <p className="text-sm text-[#8892a4] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </MotionSection>
        </div>

        {/* Skills */}
        <MotionSection>
          <h3 className="text-xl font-bold font-display text-[#f0f4ff] mb-8 flex items-center gap-2">
            <Zap size={20} className="text-[#fbbf24]" />
            Technical Skills
          </h3>
          {skillCategories.map((cat) => (
            <div key={cat} className="mb-8">
              <p className="text-xs font-mono text-[#4b5563] uppercase tracking-widest mb-4">{cat}</p>
              <div className="space-y-3">
                {skills.filter((s) => s.category === cat).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[#8892a4]">{skill.name}</span>
                      <span className="font-mono text-xs" style={{ color: SKILL_COLORS[cat] || '#63d3bf' }}>{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${SKILL_COLORS[cat] || '#63d3bf'}, ${SKILL_COLORS[cat] || '#63d3bf'}88)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </MotionSection>
      </Section>
    </PageLayout>
  );
}
