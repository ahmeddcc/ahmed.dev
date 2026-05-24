import { useAuth } from '@/context/AuthContext';
export function useAdminAuth() {
  return useAuth();
}
