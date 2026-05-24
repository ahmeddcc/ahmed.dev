import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gradient-to-r from-[#63d3bf] to-[#a78bfa] text-[#080b14] font-semibold hover:opacity-90',
  secondary: 'border border-[rgba(99,211,191,0.4)] text-[#63d3bf] hover:bg-[rgba(99,211,191,0.08)]',
  ghost: 'text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.05)]',
  danger: 'bg-[#fb7185]/10 border border-[#fb7185]/30 text-[#fb7185] hover:bg-[#fb7185]/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

export function Button({ children, variant = 'primary', size = 'md', loading, disabled, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
}
