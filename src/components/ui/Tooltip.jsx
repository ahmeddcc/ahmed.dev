import { useState } from 'react';
export function Tooltip({ children, content, position = 'top' }) {
  const [visible, setVisible] = useState(false);
  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  return (
    <div className="relative inline-flex" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className={`absolute ${posClasses[position]} z-50 px-2.5 py-1.5 text-xs text-[#f0f4ff] bg-[#1f2937] border border-[rgba(255,255,255,0.07)] rounded-lg whitespace-nowrap pointer-events-none`}>
          {content}
        </div>
      )}
    </div>
  );
}
