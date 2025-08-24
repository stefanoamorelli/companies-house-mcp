import { z } from 'zod';

const AddressSchema = z.object({
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  care_of: z.string().optional(),
  country: z.string().optional(),
  locality: z.string().optional(),
  po_box: z.string().optional(),
  postal_code: z.string().optional(),
  premises: z.string().optional(),
  region: z.string().optional()
});

const DateOfBirthSchema = z.object({
  day: z.number().optional(),
  month: z.number().optional(),
  year: z.number().optional()
});

const NameElementsSchema = z.object({
  forename: z.string().optional(),
  other_forenames: z.string().optional(),
  surname: z.string().optional(),
  title: z.string().optional()
});

const IdentificationSchema = z.object({
  country_registered: z.string().optional(),
  legal_authority: z.string().optional(),
  legal_form: z.string().optional(),
  place_registered: z.string().optional(),
  registration_number: z.string().optional()
});

export const PSCIndividualRecordSchema = z.object({
  address: AddressSchema.optional(),
  ceased_on: z.string().optional(),
  country_of_residence: z.string().optional(),
  date_of_birth: DateOfBirthSchema.optional(),
  etag: z.string().optional(),
  kind: z.string().optional(),
  links: z.object({
    self: z.string(),
    statement: z.string().optional()
  }).optional(),
  name: z.string().optional(),
  name_elements: NameElementsSchema.optional(),
  nationality: z.string().optional(),
  natures_of_control: z.array(z.string()).optional(),
  notified_on: z.string().optional()
});

export const PSCCorporateEntityRecordSchema = z.object({
  address: AddressSchema.optional(),
  ceased_on: z.string().optional(),
  etag: z.string().optional(),
  identification: IdentificationSchema.optional(),
  kind: z.string().optional(),
  links: z.object({
    self: z.string(),
    statement: z.string().optional()
  }).optional(),
  name: z.string().optional(),
  natures_of_control: z.array(z.string()).optional(),
  notified_on: z.string().optional()
});

export const PSCLegalPersonRecordSchema = z.object({
  address: AddressSchema.optional(),
  ceased_on: z.string().optional(),
  etag: z.string().optional(),
  identification: IdentificationSchema.optional(),
  kind: z.string().optional(),
  links: z.object({
    self: z.string(),
    statement: z.string().optional()
  }).optional(),
  name: z.string().optional(),
  natures_of_control: z.array(z.string()).optional(),
  notified_on: z.string().optional()
});

export const PSCStatementRecordSchema = z.object({
  ceased_on: z.string().optional(),
  etag: z.string().optional(),
  kind: z.string().optional(),
  links: z.object({
    self: z.string(),
    person_with_significant_control: z.string().optional()
  }).optional(),
  notified_on: z.string().optional(),
  statement: z.string().optional()
});

export const PSCSuperSecureRecordSchema = z.object({
  ceased: z.boolean().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  kind: z.string().optional(),
  links: z.object({
    self: z.string()
  }).optional()
});

export const PSCVerificationDetailsSchema = z.object({
  name_elements: NameElementsSchema.optional(),
  verification_details: z.object({
    name_mismatch_reason: z.string().optional(),
    verification_status: z.string().optional()
  }).optional()
});

export const PSCListResponseSchema = z.object({
  active_count: z.number().optional(),
  ceased_count: z.number().optional(),
  items: z.array(z.union([
    PSCIndividualRecordSchema,
    PSCCorporateEntityRecordSchema,
    PSCLegalPersonRecordSchema,
    PSCStatementRecordSchema,
    PSCSuperSecureRecordSchema
  ])).optional(),
  items_per_page: z.number().optional(),
  links: z.object({
    self: z.string(),
    persons_with_significant_control_statements: z.string().optional()
  }).optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export const PSCStatementsListResponseSchema = z.object({
  active_count: z.number().optional(),
  ceased_count: z.number().optional(),
  items: z.array(PSCStatementRecordSchema).optional(),
  items_per_page: z.number().optional(),
  links: z.object({
    self: z.string(),
    persons_with_significant_control: z.string().optional()
  }).optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export type PSCIndividualRecord = z.infer<typeof PSCIndividualRecordSchema>;
export type PSCCorporateEntityRecord = z.infer<typeof PSCCorporateEntityRecordSchema>;
export type PSCLegalPersonRecord = z.infer<typeof PSCLegalPersonRecordSchema>;
export type PSCStatementRecord = z.infer<typeof PSCStatementRecordSchema>;
export type PSCSuperSecureRecord = z.infer<typeof PSCSuperSecureRecordSchema>;
export type PSCVerificationDetails = z.infer<typeof PSCVerificationDetailsSchema>;
export type PSCListResponse = z.infer<typeof PSCListResponseSchema>;
export type PSCStatementsListResponse = z.infer<typeof PSCStatementsListResponseSchema>;