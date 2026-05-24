import { useToastContext } from '@/context/ToastContext';
export function useToast() {
  const { toast } = useToastContext();
  return toast;
}
