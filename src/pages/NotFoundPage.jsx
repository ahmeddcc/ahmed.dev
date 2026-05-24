import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#080b14]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-8xl font-bold font-display gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold font-display text-[#f0f4ff] mb-3">Page Not Found</h1>
        <p className="text-[#8892a4] mb-8 max-w-sm">The page you are looking for does not exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#63d3bf] to-[#a78bfa] text-[#080b14] font-semibold text-sm">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[rgba(255,255,255,0.07)] text-[#8892a4] text-sm hover:text-[#f0f4ff] transition-colors">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
