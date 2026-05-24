export function Skeleton({ className = '', lines = 1 }) {
  if (lines > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-[rgba(255,255,255,0.05)] animate-pulse" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
        ))}
      </div>
    );
  }
  return <div className={`rounded bg-[rgba(255,255,255,0.05)] animate-pulse ${className}`} />;
}
