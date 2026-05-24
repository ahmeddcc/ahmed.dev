import { Link } from 'react-router-dom';
import { Code2, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/shared/SocialIcons";
import { usePortfolio } from '@/context/PortfolioContext';

export function Footer() {
  const { data } = usePortfolio();
  const social = data?.social || {};

  return (
    <footer className="border-t border-[rgba(255,255,255,0.05)] py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#63d3bf] to-[#a78bfa] flex items-center justify-center">
              <Code2 size={14} className="text-[#080b14]" />
            </div>
            <span className="font-display font-bold text-[#f0f4ff]">Ahmed.</span>
          </div>

          <p className="text-sm text-[#4b5563] flex items-center gap-1.5">
            Built with <Heart size={12} className="text-[#fb7185]" /> using React & Tailwind
          </p>

          <div className="flex items-center gap-3">
            {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer" className="p-2 text-[#4b5563] hover:text-[#f0f4ff] transition-colors"><GithubIcon size={18} /></a>}
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-[#4b5563] hover:text-[#f0f4ff] transition-colors"><LinkedinIcon size={18} /></a>}
            {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 text-[#4b5563] hover:text-[#f0f4ff] transition-colors"><TwitterIcon size={18} /></a>}
          </div>
        </div>
      </div>
    </footer>
  );
}
