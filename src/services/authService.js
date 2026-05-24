import { SESSION_KEY, ADMIN_USERNAME, ADMIN_PASSWORD } from '@/constants';
import { generateSessionToken, isTokenExpired } from '@/utils/cryptoUtils';
import { safeJsonParse, safeJsonStringify } from '@/utils/safeJsonParse';

export const authService = {
  login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = generateSessionToken(username);
      const session = { token, username, loginTime: Date.now() };
      localStorage.setItem(SESSION_KEY, safeJsonStringify(session));
      return { success: true, session };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session = safeJsonParse(raw, null);
      if (!session?.token) return null;
      if (isTokenExpired(session.token)) {
        this.logout();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return this.getSession() !== null;
  },

  refreshSession() {
    const session = this.getSession();
    if (!session) return false;
    const newToken = generateSessionToken(session.username);
    const updated = { ...session, token: newToken };
    localStorage.setItem(SESSION_KEY, safeJsonStringify(updated));
    return true;
  },
};
