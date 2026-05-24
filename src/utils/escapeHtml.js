const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

export function escapeHtml(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str.replace(/[&<>"'/]/g, (char) => ESCAPE_MAP[char]);
}

export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === 'string' ? sanitizeInput(v) : sanitizeObject(v),
    ])
  );
}

// Protect against Excel formula injection
export function sanitizeCsvValue(value) {
  const dangerous = ['=', '+', '-', '@', '\t', '\r'];
  const str = String(value ?? '');
  if (dangerous.some((c) => str.startsWith(c))) return `'${str}`;
  return str;
}
