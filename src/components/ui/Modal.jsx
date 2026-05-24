import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${sizes[size]} bg-[#111827] border border-[rgba(255,255,255,0.07)] rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.07)]">
              <h2 className="text-lg font-semibold text-[#f0f4ff] font-display">{title}</h2>
              <button onClick={onClose} className="p-2 rounded-lg text-[#4b5563] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Delete', danger = true }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-[#8892a4] text-sm mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="px-4 py-2 text-sm text-[#8892a4] hover:text-[#f0f4ff] border border-[rgba(255,255,255,0.07)] rounded-lg transition-colors">Cancel</button>
        <button
          onClick={() => { onConfirm(); onClose(); }}
          className={`px-4 py-2 text-sm rounded-lg font-medium ${danger ? 'bg-[#fb7185]/10 border border-[#fb7185]/30 text-[#fb7185] hover:bg-[#fb7185]/20' : 'bg-[#63d3bf]/10 border border-[#63d3bf]/30 text-[#63d3bf]'}`}
        >{confirmLabel}</button>
      </div>
    </Modal>
  );
}
