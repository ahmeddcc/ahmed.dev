import { sanitizeObject } from '@/utils/escapeHtml';

// Rate limiting state
let lastSubmitTime = 0;
const RATE_LIMIT_MS = 30000; // 30 seconds

export const contactService = {
  async send(formData) {
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const remaining = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      throw new Error(`Please wait ${remaining} seconds before sending another message.`);
    }

    const safe = sanitizeObject(formData);

    // Simulate API call (replace with real endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    lastSubmitTime = Date.now();
    return { success: true, message: 'Message sent successfully!' };
  },
};
