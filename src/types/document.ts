import { z } from 'zod';

export const DocumentMetadataSchema = z.object({
  document_id: z.string().min(1).describe('The document ID')
});

export const DocumentContentSchema = z.object({
  document_id: z.string().min(1).describe('The document ID')
});

export const DocumentMetadataResponseSchema = z.object({
  company_number: z.string().optional(),
  barcode: z.string().optional(),
  significant_date: z.string().optional(),
  significant_date_type: z.string().optional(),
  category: z.string().optional(),
  pages: z.number().optional(),
  filename: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  etag: z.string().optional(),
  links: z
    .object({
      self: z.string().optional(),
      document: z.string().optional()
    })
    .optional(),
  resources: z
    .record(
      z.object({
        content_length: z.number().optional(),
        content_type: z.string().optional(),
        created_at: z.string().optional(),
        updated_at: z.string().optional()
      })
    )
    .optional()
});

export type DocumentMetadata = z.infer<typeof DocumentMetadataSchema>;
export type DocumentContent = z.infer<typeof DocumentContentSchema>;
export type DocumentMetadataResponse = z.infer<typeof DocumentMetadataResponseSchema>;
