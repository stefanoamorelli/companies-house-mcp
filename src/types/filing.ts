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

export const FilingItemSchema = z.object({
  barcode: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  description: z.string().optional(),
  description_values: z.record(z.string()).optional(),
  links: z.object({
    self: z.string().optional(),
    document_metadata: z.string().optional()
  }).optional(),
  pages: z.number().optional(),
  paper_filed: z.boolean().optional(),
  transaction_id: z.string().optional(),
  type: z.string().optional()
});

export const FilingHistoryResponseSchema = z.object({
  items: z.array(FilingItemSchema).optional(),
  items_per_page: z.number().optional(),
  start_index: z.number().optional(),
  total_count: z.number().optional(),
  filing_history_status: z.string().optional()
});

export type FilingHistory = z.infer<typeof FilingHistorySchema>;
export type FilingHistoryItem = z.infer<typeof FilingHistoryItemSchema>;
export type FilingItem = z.infer<typeof FilingItemSchema>;
export type FilingHistoryResponse = z.infer<typeof FilingHistoryResponseSchema>;
