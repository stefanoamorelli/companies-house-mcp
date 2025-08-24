import { z } from 'zod';

export const OfficersSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  items_per_page: z
    .number()
    .min(1)
    .max(100)
    .default(35)
    .optional()
    .describe('Number of results per page'),
  start_index: z.number().min(0).default(0).optional().describe('Starting index for pagination'),
  register_type: z
    .enum(['directors', 'secretaries', 'llp-members'])
    .optional()
    .describe('Type of register')
});

export const OfficerAppointmentSchema = z.object({
  company_number: z.string().min(1).describe('The company number'),
  appointment_id: z.string().min(1).describe('The appointment ID')
});

export const CorporateOfficerDisqualificationSchema = z.object({
  officer_id: z.string().min(1).describe('The officer ID')
});

export const NaturalOfficerDisqualificationSchema = z.object({
  officer_id: z.string().min(1).describe('The officer ID')
});

export const OfficerAppointmentsListSchema = z.object({
  officer_id: z.string().min(1).describe('The officer ID'),
  items_per_page: z.number().min(1).max(50).default(35).optional(),
  start_index: z.number().min(0).default(0).optional()
});

export type Officers = z.infer<typeof OfficersSchema>;
export type OfficerAppointment = z.infer<typeof OfficerAppointmentSchema>;
export type CorporateOfficerDisqualification = z.infer<
  typeof CorporateOfficerDisqualificationSchema
>;
export type NaturalOfficerDisqualification = z.infer<typeof NaturalOfficerDisqualificationSchema>;
export type OfficerAppointmentsList = z.infer<typeof OfficerAppointmentsListSchema>;
