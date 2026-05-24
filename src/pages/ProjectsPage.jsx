import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, Star } from "lucide-react";
import { GithubIcon } from "@/components/shared/SocialIcons";
import { PageLayout, Section, SectionHeader } from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/Badge';
import { usePortfolio } from '@/context/PortfolioContext';
import { useDebounce } from '@/hooks/useDebounce';
import { PROJECT_CATEGORIES } from '@/constants';
import { scaleIn, staggerContainer } from '@/animations/variants';

function ProjectCard({ project }) {
  return (
    <motion.div variants={scaleIn} layout className="glass rounded-2xl border border-[rgba(255,255,255,0.05)] overflow-hidden hover:border-[rgba(99,211,191,0.2)] transition-all group">
      <div className="h-40 bg-gradient-to-br from-[#0d1220] to-[#111827] flex items-center justify-center relative overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-[#63d3bf]/30 to-[#a78bfa]/30 select-none">
            {project.title.charAt(0)}
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-[rgba(251,191,36,0.15)] border border-[rgba(251,191,36,0.3)] text-[#fbbf24] text-xs font-mono">
            <Star size={10} /> Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <Badge variant={project.status === 'Live' ? 'default' : project.status === 'In Progress' ? 'amber' : 'gray'}>
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold font-display text-[#f0f4ff] group-hover:text-[#63d3bf] transition-colors">{project.title}</h3>
          <div className="flex gap-2 shrink-0">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#4b5563] hover:text-[#f0f4ff] transition-colors">
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-[#4b5563] hover:text-[#63d3bf] transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-[#8892a4] mb-4 leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="gray">{tech}</Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="gray">+{project.technologies.length - 4}</Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const { data } = usePortfolio();
  const projects = data?.projects || [];
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !debouncedSearch ||
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, activeCategory, debouncedSearch]);

  return (
    <PageLayout>
      <Section>
        <SectionHeader eyebrow="Portfolio" title="Projects" description="A selection of things I've built and shipped." />

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b5563]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg bg-[#0d1220] border border-[rgba(255,255,255,0.07)] text-[#f0f4ff] placeholder-[#4b5563] outline-none focus:border-[#63d3bf]/40 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${activeCategory === cat ? 'bg-[rgba(99,211,191,0.12)] text-[#63d3bf] border border-[rgba(99,211,191,0.25)]' : 'text-[#4b5563] hover:text-[#8892a4] border border-transparent'}`}
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#4b5563]">No projects found matching your criteria.</div>
        )}
      </Section>
    </PageLayout>
  );
}
