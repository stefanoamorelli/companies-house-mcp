import { z } from 'zod';

export const FilingHistorySchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z
    .number()
    .min(1)
    .max(100)
    .default(25)
    .optional()
    .describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination'),
  category: z.string().optional().describe('Category of filing history')
});

export const FilingHistoryItemSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  transaction_id: z.string().min(1).describe('The transaction ID')
});

export type FilingHistory = z.infer<typeof FilingHistorySchema>;
export type FilingHistoryItem = z.infer<typeof FilingHistoryItemSchema>;
