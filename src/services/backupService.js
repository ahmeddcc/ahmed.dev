import { storageService } from './storageService';
import { exportAsJson } from '@/utils/exportUtils';
import { safeJsonParse } from '@/utils/safeJsonParse';
import { sanitizeObject } from '@/utils/escapeHtml';

export const backupService = {
  createBackup() {
    const data = storageService.getData();
    const backup = {
      version: '1.0',
      createdAt: new Date().toISOString(),
      data,
    };
    exportAsJson(backup, 'portfolio-backup');
    return true;
  },

  async restoreBackup(file) {
    return new Promise((resolve, reject) => {
      if (!file || file.type !== 'application/json') {
        reject(new Error('Invalid file type. Please upload a JSON backup file.'));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        reject(new Error('Backup file too large (max 10MB).'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = safeJsonParse(e.target.result, null);
          if (!parsed?.data) {
            reject(new Error('Invalid backup format.'));
            return;
          }
          const safe = sanitizeObject(parsed.data);
          storageService.setData(safe);
          resolve({ success: true, data: safe });
        } catch {
          reject(new Error('Failed to parse backup file.'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsText(file);
    });
  },
};
