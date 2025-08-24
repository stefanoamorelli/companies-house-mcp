import { z } from 'zod';

export const CompanySearchSchema = z.object({
  query: z.string().min(1).describe('Company name or number to search for'),
  items_per_page: z
    .number()
    .min(1)
    .max(100)
    .default(20)
    .optional()
    .describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination')
});

export const CompanyProfileSchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export const RegisteredOfficeAddressSchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export const RegistersSchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export const InsolvencySchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export const ExemptionsSchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export const UKEstablishmentsSchema = z.object({
  company_number: z.string().min(1).describe('The company number')
});

export type CompanySearch = z.infer<typeof CompanySearchSchema>;
export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
export type RegisteredOfficeAddress = z.infer<typeof RegisteredOfficeAddressSchema>;
export type Registers = z.infer<typeof RegistersSchema>;
export type Insolvency = z.infer<typeof InsolvencySchema>;
export type Exemptions = z.infer<typeof ExemptionsSchema>;
export type UKEstablishments = z.infer<typeof UKEstablishmentsSchema>;