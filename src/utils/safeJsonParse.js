export function safeJsonParse(str, fallback = null) {
  if (!str || typeof str !== 'string') return fallback;
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch {
    return fallback;
  }
}

export function safeJsonStringify(value, fallback = '') {
  try {
    return JSON.stringify(value);
  } catch {
    return fallback;
  }
}
