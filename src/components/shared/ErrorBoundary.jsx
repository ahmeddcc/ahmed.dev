import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center px-6">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(251,113,133,0.08)] flex items-center justify-center">
            <AlertTriangle size={28} className="text-[#fb7185]" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-[#f0f4ff] mb-2">Something went wrong</h2>
            <p className="text-sm text-[#8892a4]">An unexpected error occurred. Please refresh the page.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#63d3bf] to-[#a78bfa] text-[#080b14] font-semibold rounded-lg"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
