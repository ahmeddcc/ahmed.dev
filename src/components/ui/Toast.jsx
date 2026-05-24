import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast } from '@/hooks/useContexts';

const icons = {
  success: <CheckCircle size={16} className="text-[#63d3bf]" />,
  error: <XCircle size={16} className="text-[#fb7185]" />,
  info: <Info size={16} className="text-[#a78bfa]" />,
  warning: <AlertTriangle size={16} className="text-[#fbbf24]" />,
};

const borders = {
  success: 'border-[#63d3bf]/30',
  error: 'border-[#fb7185]/30',
  info: 'border-[#a78bfa]/30',
  warning: 'border-[#fbbf24]/30',
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3 bg-[#111827] border ${borders[t.type]} rounded-xl shadow-xl max-w-sm`}
          >
            <span className="mt-0.5 shrink-0">{icons[t.type]}</span>
            <p className="text-sm text-[#f0f4ff] flex-1">{t.message}</p>
            <button onClick={() => removeToast(t.id)} className="text-[#4b5563] hover:text-[#f0f4ff] transition-colors shrink-0">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
