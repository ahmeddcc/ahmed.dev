import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import { NAV_LINKS } from '@/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3 glass border-b border-[rgba(255,255,255,0.05)]' : 'py-5'}`}>
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#63d3bf] to-[#a78bfa] flex items-center justify-center">
            <Code2 size={16} className="text-[#080b14]" />
          </div>
          <span className="font-display font-bold text-[#f0f4ff] text-lg tracking-tight">Ahmed.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === link.path ? 'text-[#63d3bf] bg-[rgba(99,211,191,0.08)]' : 'text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.04)]'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="md:hidden p-2 text-[#8892a4] hover:text-[#f0f4ff]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-[rgba(255,255,255,0.05)] overflow-hidden"
          >
            <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === link.path ? 'text-[#63d3bf] bg-[rgba(99,211,191,0.08)]' : 'text-[#8892a4]'}`}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
