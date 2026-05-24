import { useState, useCallback } from 'react';
import { authService } from '@/services/authService';
import { AuthContext } from './contexts';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession());
  const [loading] = useState(false);

  const login = useCallback((username, password) => {
    const result = authService.login(username, password);
    if (result.success) setSession(result.session);
    return result;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ session, isAuthenticated: !!session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
