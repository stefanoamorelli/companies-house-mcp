import { z } from 'zod';

export const ChargesSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z
    .number()
    .min(1)
    .max(100)
    .default(25)
    .optional()
    .describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination')
});

export const ChargeDetailsSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  charge_id: z.string().min(1).describe('The charge ID')
});

export const ChargeSchema = z.object({
  charge_code: z.string().optional(),
  charge_number: z.number().optional(),
  classification: z.object({
    description: z.string(),
    type: z.string()
  }).optional(),
  created_on: z.string().optional(),
  delivered_on: z.string().optional(),
  status: z.string().optional(),
  etag: z.string().optional(),
  id: z.string().optional(),
  links: z.object({
    self: z.string()
  }).optional()
});

export const ChargesResponseSchema = z.object({
  items: z.array(ChargeSchema).optional(),
  total_count: z.number().optional(),
  unfiltered_count: z.number().optional(),
  part_satisfied_count: z.number().optional(),
  satisfied_count: z.number().optional()
});

export type Charges = z.infer<typeof ChargesSchema>;
export type ChargeDetails = z.infer<typeof ChargeDetailsSchema>;
export type Charge = z.infer<typeof ChargeSchema>;
export type ChargesResponse = z.infer<typeof ChargesResponseSchema>;
