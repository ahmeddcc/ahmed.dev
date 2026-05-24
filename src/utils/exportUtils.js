import { safeJsonStringify } from './safeJsonParse';

export function exportAsJson(data, filename = 'portfolio-backup') {
  const json = safeJsonStringify(data, '{}');
  const blob = new Blob([json], { type: 'application/json' });
  downloadBlob(blob, `${filename}-${Date.now()}.json`);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
