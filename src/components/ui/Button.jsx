import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const variants = {
  primary: 'bg-gradient-to-r from-[#63d3bf] to-[#a78bfa] text-[#080b14] font-semibold hover:shadow-[0_0_20px_rgba(99,211,191,0.3)]',
  secondary: 'border border-[rgba(99,211,191,0.4)] text-[#63d3bf] hover:bg-[rgba(99,211,191,0.08)]',
  ghost: 'text-[#8892a4] hover:text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.05)]',
  danger: 'bg-[#fb7185]/10 border border-[#fb7185]/30 text-[#fb7185] hover:bg-[#fb7185]/20',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

// Create motion-wrapped components outside of render to avoid linter errors and performance issues
const MotionButton = motion.button;
const MotionAnchor = motion.a;

export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className = '',
  as = 'button',
  ...props
}, ref) => {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  // Simple conditional rendering for motion components
  const commonProps = {
    ref,
    whileHover: disabled || loading ? {} : { scale: 1.02 },
    whileTap: disabled || loading ? {} : { scale: 0.98 },
    className: baseClasses,
    disabled: disabled || loading,
    ...props
  };

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </>
  );

  if (as === 'a' || props.href) {
    return <MotionAnchor {...commonProps}>{content}</MotionAnchor>;
  }

  // Default to button (or Link can be handled by motion.create(Link) but that needs to be outside render too)
  // For simplicity and to avoid importing Link here, we can use motion.create(as) only if 'as' is a string
  // and we do it outside or with a memoized component.

  return <MotionButton {...commonProps}>{content}</MotionButton>;
});

Button.displayName = 'Button';
