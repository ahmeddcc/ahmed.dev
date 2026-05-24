const variants = {
  default: 'bg-[rgba(99,211,191,0.1)] text-[#63d3bf] border-[rgba(99,211,191,0.2)]',
  violet: 'bg-[rgba(167,139,250,0.1)] text-[#a78bfa] border-[rgba(167,139,250,0.2)]',
  amber: 'bg-[rgba(251,191,36,0.1)] text-[#fbbf24] border-[rgba(251,191,36,0.2)]',
  rose: 'bg-[rgba(251,113,133,0.1)] text-[#fb7185] border-[rgba(251,113,133,0.2)]',
  gray: 'bg-[rgba(75,85,99,0.2)] text-[#8892a4] border-[rgba(75,85,99,0.3)]',
};

export function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border font-mono ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
