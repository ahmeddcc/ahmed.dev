import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from '@/constants';

export function validateImageFile(file) {
  if (!file) return { valid: false, error: 'No file selected' };
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, WebP, GIF allowed.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }
  const safeName = /^[a-zA-Z0-9._-]+$/.test(file.name);
  if (!safeName) {
    return { valid: false, error: 'Invalid file name. Use only letters, numbers, dots, hyphens.' };
  }
  return { valid: true, error: null };
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
