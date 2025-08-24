import { z } from 'zod';

export const PersonsWithSignificantControlSchema = z.object({
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

export const PSCCorporateEntityBeneficialOwnerSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCCorporateEntitySchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCIndividualBeneficialOwnerSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCIndividualSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCIndividualVerificationSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCIndividualFullRecordSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCLegalPersonBeneficialOwnerSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCLegalPersonSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  psc_id: z.string().min(1).describe('The PSC ID')
});

export const PSCStatementSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  statement_id: z.string().min(1).describe('The statement ID')
});

export const PSCStatementsListSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z.number().min(1).max(100).default(25).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export const PSCSuperSecureBeneficialOwnerSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  super_secure_id: z.string().min(1).describe('The super secure ID')
});

export const PSCSuperSecureSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  super_secure_id: z.string().min(1).describe('The super secure ID')
});

export type PersonsWithSignificantControl = z.infer<typeof PersonsWithSignificantControlSchema>;
export type PSCCorporateEntityBeneficialOwner = z.infer<
  typeof PSCCorporateEntityBeneficialOwnerSchema
>;
export type PSCCorporateEntity = z.infer<typeof PSCCorporateEntitySchema>;
export type PSCIndividualBeneficialOwner = z.infer<typeof PSCIndividualBeneficialOwnerSchema>;
export type PSCIndividual = z.infer<typeof PSCIndividualSchema>;
export type PSCIndividualVerification = z.infer<typeof PSCIndividualVerificationSchema>;
export type PSCIndividualFullRecord = z.infer<typeof PSCIndividualFullRecordSchema>;
export type PSCLegalPersonBeneficialOwner = z.infer<typeof PSCLegalPersonBeneficialOwnerSchema>;
export type PSCLegalPerson = z.infer<typeof PSCLegalPersonSchema>;
export type PSCStatement = z.infer<typeof PSCStatementSchema>;
export type PSCStatementsList = z.infer<typeof PSCStatementsListSchema>;
export type PSCSuperSecureBeneficialOwner = z.infer<typeof PSCSuperSecureBeneficialOwnerSchema>;
export type PSCSuperSecure = z.infer<typeof PSCSuperSecureSchema>;
