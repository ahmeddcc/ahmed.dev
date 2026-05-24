import { PackageOpen } from 'lucide-react';
export function EmptyState({ title = 'Nothing here yet', description, icon: Icon = PackageOpen, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(99,211,191,0.08)] flex items-center justify-center">
        <Icon size={28} className="text-[#63d3bf]/50" />
      </div>
      <div>
        <p className="font-semibold text-[#f0f4ff] font-display">{title}</p>
        {description && <p className="text-sm text-[#4b5563] mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
