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

export type Charges = z.infer<typeof ChargesSchema>;
export type ChargeDetails = z.infer<typeof ChargeDetailsSchema>;