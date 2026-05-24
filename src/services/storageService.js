import { STORAGE_KEY } from '@/constants';
import { safeJsonParse, safeJsonStringify } from '@/utils/safeJsonParse';
import { defaultPortfolioData } from '@/data/portfolioData';

export const storageService = {
  getData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultPortfolioData };
      const parsed = safeJsonParse(raw, null);
      if (!parsed) return { ...defaultPortfolioData };
      return { ...defaultPortfolioData, ...parsed };
    } catch {
      return { ...defaultPortfolioData };
    }
  },

  setData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, safeJsonStringify(data));
      return true;
    } catch {
      return false;
    }
  },

  updateSection(section, value) {
    const current = this.getData();
    return this.setData({ ...current, [section]: value });
  },

  clearData() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  },
};
