// Simple hash for session tokens - frontend only, not security-critical
export function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function generateSessionToken(username) {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  const hash = simpleHash(username + timestamp);
  return `${hash}.${timestamp}.${random}`;
}

export function isTokenExpired(token, maxAgeMs = 8 * 60 * 60 * 1000) {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length < 2) return true;
    const timestamp = parseInt(parts[1], 36);
    return Date.now() - timestamp > maxAgeMs;
  } catch {
    return true;
  }
}
