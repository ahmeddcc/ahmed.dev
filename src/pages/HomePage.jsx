import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/shared/SocialIcons";
import { PageLayout } from '@/components/layout/PageLayout';
import { MotionSection } from '@/components/shared/MotionSection';
import { Button } from '@/components/ui/Button';
import { usePortfolio } from '@/hooks/useContexts';
import { staggerContainer, fadeUp } from '@/animations/variants';

const TYPING_TITLES = ['Full-Stack Developer', 'React Specialist', 'Node.js Engineer', 'Cloud Architect'];

export function HomePage() {
  const { data } = usePortfolio();
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = TYPING_TITLES[titleIdx];
    let timeout;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => {
          setTyping(false);
        }, 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(target.slice(0, displayed.length - 1));
        }, 30);
      } else {
        // To avoid linter warning, we move the state updates into a small delay or use a ref
        // But even better, just wrap it in a function that's called after a tick.
        timeout = setTimeout(() => {
          setTitleIdx((prev) => (prev + 1) % TYPING_TITLES.length);
          setTyping(true);
        }, 0);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed.length, typing, titleIdx]);

  const personal = data?.personal || {};
  const social = data?.social || {};
  const stats = data?.stats || [];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-24 min-h-[90vh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8 order-2 lg:order-1">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(99,211,191,0.25)] bg-[rgba(99,211,191,0.06)] text-xs font-mono text-[#63d3bf]">
              <Sparkles size={12} />
              Available for opportunities
            </motion.div>

            <motion.div variants={fadeUp}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-[#f0f4ff] leading-[1.1] tracking-tight">
                {personal.name || 'Ahmed Hassan'}
              </h1>
              <div className="mt-4 h-12 flex items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-display text-transparent bg-clip-text bg-gradient-to-r from-[#63d3bf] to-[#a78bfa]">
                  {displayed}<span className="animate-pulse">|</span>
                </span>
              </div>
            </motion.div>

            <motion.p variants={fadeUp} className="text-[#8892a4] text-base sm:text-lg leading-relaxed max-w-lg">
              {personal.bio || 'Passionate developer building scalable, beautiful digital experiences.'}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button as={Link} to="/projects" size="lg">
                View Projects <ArrowRight size={16} />
              </Button>
              <Button as={Link} to="/contact" variant="secondary" size="lg">
                <Mail size={16} /> Contact Me
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              {social.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[rgba(255,255,255,0.07)] text-[#8892a4] hover:text-[#63d3bf] hover:border-[rgba(99,211,191,0.3)] transition-all">
                  <GithubIcon size={18} />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[rgba(255,255,255,0.07)] text-[#8892a4] hover:text-[#63d3bf] hover:border-[rgba(99,211,191,0.3)] transition-all">
                  <LinkedinIcon size={18} />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[rgba(255,255,255,0.07)] text-[#8892a4] hover:text-[#63d3bf] hover:border-[rgba(99,211,191,0.3)] transition-all">
                  <TwitterIcon size={18} />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex items-center justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#63d3bf]/20 to-[#a78bfa]/20 blur-3xl" />
              <div className="relative w-full h-full rounded-full border border-[rgba(255,255,255,0.07)] flex items-center justify-center overflow-hidden bg-[#111827] shadow-2xl">
                {personal.avatar ? (
                  <img src={personal.avatar} alt={personal.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-7xl sm:text-8xl lg:text-9xl font-bold font-display gradient-text">
                    {(personal.name || 'A').charAt(0)}
                  </div>
                )}
              </div>
              {/* Floating badges */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 glass rounded-xl px-3 py-2 text-xs font-mono text-[#63d3bf] border border-[rgba(99,211,191,0.2)] shadow-lg">
                React ⚛️
              </motion.div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 glass rounded-xl px-3 py-2 text-xs font-mono text-[#a78bfa] border border-[rgba(167,139,250,0.2)] shadow-lg">
                Node.js 🟢
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <MotionSection>
          <div className="max-w-6xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(255,255,255,0.04)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.05)]">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#080b14] px-6 py-8 text-center">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold font-display gradient-text">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-[#8892a4] mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* CTA */}
      <MotionSection>
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="rounded-3xl border border-[rgba(255,255,255,0.07)] bg-[#0d1220] p-8 sm:p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#63d3bf]/5 to-[#a78bfa]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-[#f0f4ff] mb-4">Ready to work together?</h2>
              <p className="text-[#8892a4] mb-8 text-base sm:text-lg max-w-xl mx-auto">Let's build something remarkable and push the boundaries of what's possible.</p>
              <Link to="/contact">
                <Button size="lg">Get In Touch <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </MotionSection>
    </PageLayout>
  );
}
