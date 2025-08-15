import { z } from 'zod';

export const CompanySearchSchema = z.object({
  query: z.string().min(1).describe('Company name or number to search for'),
  items_per_page: z.number().min(1).max(100).default(20).optional().describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination')
});

export const CompanyProfileSchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export const OfficersSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z.number().min(1).max(100).default(35).optional().describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination'),
  register_type: z.enum(['directors', 'secretaries', 'llp-members']).optional().describe('Type of register')
});

export const FilingHistorySchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z.number().min(1).max(100).default(25).optional().describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination'),
  category: z.string().optional().describe('Category of filing history')
});

export const PersonsWithSignificantControlSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z.number().min(1).max(100).default(25).optional().describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination')
});

export const ChargesSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z.number().min(1).max(100).default(25).optional().describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination')
});

export type CompanySearch = z.infer<typeof CompanySearchSchema>;
export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
export type Officers = z.infer<typeof OfficersSchema>;
export type FilingHistory = z.infer<typeof FilingHistorySchema>;
export type PersonsWithSignificantControl = z.infer<typeof PersonsWithSignificantControlSchema>;
export type Charges = z.infer<typeof ChargesSchema>;