export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#8892a4]">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-lg bg-[#0d1220] border ${error ? 'border-[#fb7185]/50' : 'border-[rgba(255,255,255,0.07)]'} text-[#f0f4ff] placeholder-[#4b5563] text-sm outline-none focus:border-[#63d3bf]/50 focus:ring-1 focus:ring-[#63d3bf]/20 transition-all duration-200 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#fb7185]">{error}</p>}
    </div>
  );
}

export function Textarea({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#8892a4]">{label}</label>}
      <textarea
        className={`w-full px-4 py-3 rounded-lg bg-[#0d1220] border ${error ? 'border-[#fb7185]/50' : 'border-[rgba(255,255,255,0.07)]'} text-[#f0f4ff] placeholder-[#4b5563] text-sm outline-none focus:border-[#63d3bf]/50 focus:ring-1 focus:ring-[#63d3bf]/20 transition-all duration-200 resize-none ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[#fb7185]">{error}</p>}
    </div>
  );
}

export function Select({ label, error, options = [], className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#8892a4]">{label}</label>}
      <select
        className={`w-full px-4 py-3 rounded-lg bg-[#0d1220] border ${error ? 'border-[#fb7185]/50' : 'border-[rgba(255,255,255,0.07)]'} text-[#f0f4ff] text-sm outline-none focus:border-[#63d3bf]/50 transition-all duration-200 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-[#fb7185]">{error}</p>}
    </div>
  );
}
