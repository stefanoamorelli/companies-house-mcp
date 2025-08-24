import { z } from 'zod';

const CompanySearchItemSchema = z.object({
  address: z
    .object({
      address_line_1: z.string().optional(),
      address_line_2: z.string().optional(),
      care_of: z.string().optional(),
      country: z.string().optional(),
      locality: z.string().optional(),
      po_box: z.string().optional(),
      postal_code: z.string().optional(),
      premises: z.string().optional(),
      region: z.string().optional()
    })
    .optional(),
  address_snippet: z.string().optional(),
  company_name: z.string().optional(),
  company_number: z.string().optional(),
  company_status: z.string().optional(),
  company_type: z.string().optional(),
  company_subtype: z.string().optional(),
  date_of_cessation: z.string().optional(),
  date_of_creation: z.string().optional(),
  description: z.string().optional(),
  description_identifier: z.array(z.string()).optional(),
  external_registration_number: z.string().optional(),
  kind: z.string().optional(),
  links: z
    .object({
      self: z.string()
    })
    .optional(),
  matched_previous_company_name: z
    .object({
      ceased_on: z.string().optional(),
      effective_from: z.string().optional(),
      name: z.string().optional()
    })
    .optional(),
  matches: z
    .object({
      snippet: z.array(z.number()).optional(),
      title: z.array(z.number()).optional()
    })
    .optional(),
  snippet: z.string().optional(),
  title: z.string().optional()
});

const OfficerSearchItemSchema = z.object({
  address: z
    .object({
      address_line_1: z.string().optional(),
      address_line_2: z.string().optional(),
      care_of: z.string().optional(),
      country: z.string().optional(),
      locality: z.string().optional(),
      po_box: z.string().optional(),
      postal_code: z.string().optional(),
      premises: z.string().optional(),
      region: z.string().optional()
    })
    .optional(),
  address_snippet: z.string().optional(),
  appointment_count: z.number().optional(),
  date_of_birth: z
    .object({
      month: z.number().optional(),
      year: z.number().optional()
    })
    .optional(),
  description: z.string().optional(),
  description_identifiers: z.array(z.string()).optional(),
  kind: z.string().optional(),
  links: z
    .object({
      self: z.string()
    })
    .optional(),
  matches: z
    .object({
      snippet: z.array(z.number()).optional(),
      title: z.array(z.number()).optional()
    })
    .optional(),
  snippet: z.string().optional(),
  title: z.string().optional()
});

const DisqualifiedOfficerSearchItemSchema = z.object({
  address: z
    .object({
      address_line_1: z.string().optional(),
      address_line_2: z.string().optional(),
      country: z.string().optional(),
      locality: z.string().optional(),
      postal_code: z.string().optional(),
      premises: z.string().optional(),
      region: z.string().optional()
    })
    .optional(),
  address_snippet: z.string().optional(),
  date_of_birth: z.string().optional(),
  description: z.string().optional(),
  description_identifiers: z.array(z.string()).optional(),
  kind: z.string().optional(),
  links: z
    .object({
      self: z.string()
    })
    .optional(),
  matches: z
    .object({
      snippet: z.array(z.number()).optional(),
      title: z.array(z.number()).optional()
    })
    .optional(),
  snippet: z.string().optional(),
  title: z.string().optional()
});

export const SearchResponseSchema = z.object({
  items: z
    .array(
      z.union([
        CompanySearchItemSchema,
        OfficerSearchItemSchema,
        DisqualifiedOfficerSearchItemSchema
      ])
    )
    .optional(),
  items_per_page: z.number().optional(),
  kind: z.string().optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export const CompanySearchResponseSchema = z.object({
  items: z.array(CompanySearchItemSchema).optional(),
  items_per_page: z.number().optional(),
  kind: z.string().optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export const OfficerSearchResponseSchema = z.object({
  items: z.array(OfficerSearchItemSchema).optional(),
  items_per_page: z.number().optional(),
  kind: z.string().optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export const DisqualifiedOfficerSearchResponseSchema = z.object({
  items: z.array(DisqualifiedOfficerSearchItemSchema).optional(),
  items_per_page: z.number().optional(),
  kind: z.string().optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type CompanySearchResponse = z.infer<typeof CompanySearchResponseSchema>;
export type OfficerSearchResponse = z.infer<typeof OfficerSearchResponseSchema>;
export type DisqualifiedOfficerSearchResponse = z.infer<
  typeof DisqualifiedOfficerSearchResponseSchema
>;
