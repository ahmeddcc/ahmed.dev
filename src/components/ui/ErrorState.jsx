import { AlertTriangle } from 'lucide-react';
export function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(251,113,133,0.08)] flex items-center justify-center">
        <AlertTriangle size={28} className="text-[#fb7185]/70" />
      </div>
      <p className="text-[#8892a4] text-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="text-sm text-[#63d3bf] hover:underline">Try again</button>
      )}
    </div>
  );
}
