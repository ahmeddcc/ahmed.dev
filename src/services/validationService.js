import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required').max(100),
  description: z.string().min(10, 'Description is required').max(500),
  longDescription: z.string().max(2000).optional(),
  technologies: z.array(z.string()).min(1, 'At least one technology required'),
  category: z.string().min(1, 'Category is required'),
  liveUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  featured: z.boolean().optional(),
  status: z.enum(['Live', 'In Progress', 'Archived']),
});

export const experienceSchema = z.object({
  company: z.string().min(2, 'Company name required').max(100),
  role: z.string().min(2, 'Role is required').max(100),
  period: z.string().min(4, 'Period is required'),
  location: z.string().min(2, 'Location is required').max(100),
  description: z.string().min(10, 'Description is required').max(1000),
  technologies: z.array(z.string()),
  highlights: z.array(z.string()),
});

export const certificationSchema = z.object({
  title: z.string().min(2, 'Title is required').max(200),
  issuer: z.string().min(2, 'Issuer is required').max(100),
  date: z.string().min(4, 'Date is required'),
  credentialId: z.string().optional(),
  verifyUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  expires: z.string().optional(),
});

export function validateForm(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) return { valid: true, errors: {} };
  const errors = {};
  result.error.errors.forEach((err) => {
    const key = err.path.join('.');
    if (!errors[key]) errors[key] = err.message;
  });
  return { valid: false, errors };
}
