import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Star, Layers } from "lucide-react";
import { GithubIcon } from "@/components/shared/SocialIcons";
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/Badge';
import { usePortfolio } from '@/hooks/useContexts';
import { useDebounce } from '@/hooks/useDebounce';
import { PROJECT_CATEGORIES } from '@/constants';
import { scaleIn, staggerContainer } from '@/animations/variants';

function ProjectCard({ project }) {
  return (
    <motion.div variants={scaleIn} layout className="glass rounded-3xl border border-[rgba(255,255,255,0.05)] overflow-hidden hover:border-[rgba(99,211,191,0.2)] transition-all group flex flex-col h-full">
      <div className="h-48 sm:h-56 bg-[#0d1220] flex items-center justify-center relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#63d3bf]/5 to-[#a78bfa]/5 group-hover:scale-110 transition-transform duration-700" />
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="relative flex flex-col items-center gap-3">
             <Layers size={48} className="text-[#63d3bf]/20" />
             <div className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-[#63d3bf]/40 to-[#a78bfa]/40 select-none uppercase">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
           <Badge variant={project.status === 'Live' ? 'default' : project.status === 'In Progress' ? 'amber' : 'gray'}>
            {project.status}
          </Badge>
          {project.featured && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(251,191,36,0.15)] border border-[rgba(251,191,36,0.3)] text-[#fbbf24] text-[10px] font-bold font-mono uppercase tracking-wider">
              <Star size={10} fill="currentColor" /> Featured
            </div>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl font-bold font-display text-[#f0f4ff] group-hover:text-[#63d3bf] transition-colors line-clamp-1">{project.title}</h3>
          <div className="flex gap-1 shrink-0">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-[#4b5563] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all" title="View Source">
                <GithubIcon size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-[#4b5563] hover:text-[#63d3bf] hover:bg-[rgba(99,211,191,0.05)] rounded-lg transition-all" title="Live Preview">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-[#8892a4] mb-6 leading-relaxed line-clamp-3 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 pt-6 border-t border-[rgba(255,255,255,0.05)]">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="gray" className="bg-[#080b14]">{tech}</Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="gray" className="bg-[#080b14]">+{project.technologies.length - 3}</Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    const projects = data?.projects || [];
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !debouncedSearch ||
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [data?.projects, activeCategory, debouncedSearch]);

  return (
    <PageLayout>
      <Section>
        <SectionHeader eyebrow="Portfolio" title="Featured Projects" description="A curated selection of digital products, applications, and experiments I've built." />

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" />
            <input
              type="text"
              placeholder="Search projects by name, tech, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/40 focus:ring-4 focus:ring-[#63d3bf]/5 transition-all shadow-inner"
            />
          </div>
          <div className="flex flex-wrap gap-2 p-1 bg-[#0d1220] rounded-2xl border border-[rgba(255,255,255,0.05)] w-fit">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${activeCategory === cat ? 'bg-[#111827] text-[#63d3bf] shadow-lg border border-[rgba(99,211,191,0.2)]' : 'text-[#4b5563] hover:text-[#8892a4]'}`}
              >{cat}</button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + debouncedSearch}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0d1220] border border-[rgba(255,255,255,0.05)] flex items-center justify-center">
               <Search size={24} className="text-[#4b5563]" />
            </div>
            <div>
              <p className="text-[#f0f4ff] font-bold">No projects found</p>
              <p className="text-sm text-[#4b5563] mt-1">Try adjusting your search or category filters.</p>
            </div>
          </div>
        )}
      </Section>
    </PageLayout>
  );
}
