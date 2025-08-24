import { z } from 'zod';

export const AdvancedCompanySearchSchema = z.object({
  company_name: z.string().optional().describe('Company name to search for'),
  company_number: z.string().optional().describe('Company number to search for'),
  company_status: z.string().optional().describe('Company status'),
  company_type: z.string().optional().describe('Company type'),
  company_subtype: z.string().optional().describe('Company subtype'),
  dissolved_from: z.string().optional().describe('Dissolved from date (YYYY-MM-DD)'),
  dissolved_to: z.string().optional().describe('Dissolved to date (YYYY-MM-DD)'),
  incorporated_from: z.string().optional().describe('Incorporated from date (YYYY-MM-DD)'),
  incorporated_to: z.string().optional().describe('Incorporated to date (YYYY-MM-DD)'),
  sic_codes: z.string().optional().describe('SIC codes (comma separated)'),
  location: z.string().optional().describe('Location'),
  items_per_page: z.number().min(1).max(100).default(20).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export const SearchAllSchema = z.object({
  query: z.string().min(1).describe('Search query'),
  items_per_page: z.number().min(1).max(100).default(20).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export const SearchOfficersSchema = z.object({
  query: z.string().min(1).describe('Officer name to search for'),
  items_per_page: z.number().min(1).max(100).default(20).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export const SearchDisqualifiedOfficersSchema = z.object({
  query: z.string().min(1).describe('Disqualified officer name to search for'),
  items_per_page: z.number().min(1).max(100).default(20).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export const AlphabeticalSearchSchema = z.object({
  query: z.string().min(1).describe('Company name prefix'),
  items_per_page: z.number().min(1).max(100).default(20).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export const DissolvedSearchSchema = z.object({
  query: z.string().min(1).describe('Dissolved company name to search for'),
  items_per_page: z.number().min(1).max(100).default(20).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export type AdvancedCompanySearch = z.infer<typeof AdvancedCompanySearchSchema>;
export type SearchAll = z.infer<typeof SearchAllSchema>;
export type SearchOfficers = z.infer<typeof SearchOfficersSchema>;
export type SearchDisqualifiedOfficers = z.infer<typeof SearchDisqualifiedOfficersSchema>;
export type AlphabeticalSearch = z.infer<typeof AlphabeticalSearchSchema>;
export type DissolvedSearch = z.infer<typeof DissolvedSearchSchema>;
