import { motion } from 'framer-motion';
import { pageTransition } from '@/animations/variants';

export function PageLayout({ children, className = '' }) {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`pt-24 min-h-screen ${className}`}
    >
      {children}
    </motion.main>
  );
}

export function Section({ children, className = '' }) {
  return (
    <section className={`max-w-6xl mx-auto px-6 py-12 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-12">
      {eyebrow && (
        <p className="text-sm font-mono text-[#63d3bf] tracking-widest uppercase mb-3">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold font-display text-[#f0f4ff] mb-4">{title}</h2>
      {description && <p className="text-[#8892a4] text-lg max-w-2xl">{description}</p>}
    </div>
  );
}
