import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { AppRoutes } from '@/routes/AppRoutes';
import { ToastContainer } from '@/components/ui/Toast';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <PortfolioProvider>
            <ToastProvider>
              <div className="noise-bg">
                <AppRoutes />
                <ToastContainer />
              </div>
            </ToastProvider>
          </PortfolioProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
