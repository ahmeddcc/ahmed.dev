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
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#080b14]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]' : 'py-6'}`}>
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={handleLinkClick}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#63d3bf] to-[#a78bfa] flex items-center justify-center shadow-[0_0_15px_rgba(99,211,191,0.2)] group-hover:scale-105 transition-transform duration-300">
            <Code2 size={18} className="text-[#080b14]" />
          </div>
          <span className="font-display font-black text-[#f0f4ff] text-xl tracking-tighter uppercase italic group-hover:text-[#63d3bf] transition-colors duration-300">Ahmed<span className="text-[#63d3bf]">.</span></span>
        </Link>

        <ul className="hidden md:flex items-center gap-2 p-1 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.05)]">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300 ${pathname === link.path ? 'text-[#63d3bf] bg-[#111827] shadow-lg' : 'text-[#8892a4] hover:text-[#f0f4ff]'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="hidden sm:flex px-5 py-2 rounded-xl bg-gradient-to-r from-[#63d3bf] to-[#a78bfa] text-[#080b14] text-xs font-bold font-mono uppercase tracking-widest hover:shadow-[0_0_20px_rgba(99,211,191,0.3)] transition-all duration-300">
            Hire Me
          </Link>
          <button
            className="md:hidden p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] text-[#8892a4] hover:text-[#f0f4ff] border border-[rgba(255,255,255,0.05)] transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-[#080b14]/80 backdrop-blur-sm z-[-1] md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden absolute top-full left-0 right-0 mx-6 mt-4 p-4 rounded-3xl glass border border-[rgba(255,255,255,0.08)] shadow-2xl z-50 overflow-hidden"
            >
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className={`block px-5 py-4 rounded-2xl text-sm font-bold font-mono uppercase tracking-widest transition-all ${pathname === link.path ? 'text-[#63d3bf] bg-[rgba(99,211,191,0.08)] border border-[rgba(99,211,191,0.1)]' : 'text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.03)]'}`}
                    >{link.label}</Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="w-full flex items-center justify-center py-4 rounded-2xl bg-gradient-to-r from-[#63d3bf] to-[#a78bfa] text-[#080b14] text-sm font-bold font-mono uppercase tracking-widest shadow-lg"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
