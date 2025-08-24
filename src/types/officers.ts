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

export const OfficerSchema = z.object({
  address: z.object({
    address_line_1: z.string().optional(),
    address_line_2: z.string().optional(),
    care_of: z.string().optional(),
    country: z.string().optional(),
    locality: z.string().optional(),
    po_box: z.string().optional(),
    postal_code: z.string().optional(),
    premises: z.string().optional(),
    region: z.string().optional()
  }).optional(),
  appointed_on: z.string().optional(),
  country_of_residence: z.string().optional(),
  date_of_birth: z.object({
    month: z.number().optional(),
    year: z.number().optional()
  }).optional(),
  former_names: z.array(z.object({
    forenames: z.string().optional(),
    surname: z.string().optional()
  })).optional(),
  identification: z.object({
    identification_type: z.string().optional(),
    legal_authority: z.string().optional(),
    legal_form: z.string().optional(),
    place_registered: z.string().optional(),
    registration_number: z.string().optional()
  }).optional(),
  links: z.object({
    officer: z.object({
      appointments: z.string()
    }).optional(),
    self: z.string().optional()
  }).optional(),
  name: z.string(),
  nationality: z.string().optional(),
  occupation: z.string().optional(),
  officer_role: z.string(),
  resigned_on: z.string().optional()
});

export const OfficersResponseSchema = z.object({
  items: z.array(OfficerSchema).optional(),
  items_per_page: z.number().optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional(),
  active_count: z.number().optional(),
  inactive_count: z.number().optional(),
  resigned_count: z.number().optional()
});

export const DisqualificationSchema = z.object({
  address: z.object({
    address_line_1: z.string().optional(),
    address_line_2: z.string().optional(),
    country: z.string().optional(),
    locality: z.string().optional(),
    postal_code: z.string().optional(),
    premises: z.string().optional(),
    region: z.string().optional()
  }).optional(),
  company_names: z.array(z.string()).optional(),
  court_name: z.string().optional(),
  disqualifications: z.array(z.object({
    address: z.object({
      address_line_1: z.string().optional(),
      address_line_2: z.string().optional(),
      country: z.string().optional(),
      locality: z.string().optional(),
      postal_code: z.string().optional(),
      premises: z.string().optional(),
      region: z.string().optional()
    }).optional(),
    case_identifier: z.string().optional(),
    company_names: z.array(z.string()).optional(),
    court_name: z.string().optional(),
    disqualification_type: z.string().optional(),
    disqualified_from: z.string().optional(),
    disqualified_until: z.string().optional(),
    heard_on: z.string().optional(),
    undertaken_on: z.string().optional()
  })).optional(),
  forename: z.string().optional(),
  honours: z.string().optional(),
  kind: z.string().optional(),
  nationality: z.string().optional(),
  other_forenames: z.string().optional(),
  surname: z.string().optional(),
  title: z.string().optional()
});

export const AppointmentSchema = z.object({
  address: z.object({
    address_line_1: z.string().optional(),
    address_line_2: z.string().optional(),
    country: z.string().optional(),
    locality: z.string().optional(),
    postal_code: z.string().optional(),
    premises: z.string().optional(),
    region: z.string().optional()
  }).optional(),
  appointed_before: z.string().optional(),
  appointed_on: z.string().optional(),
  appointed_to: z.object({
    company_name: z.string().optional(),
    company_number: z.string().optional(),
    company_status: z.string().optional()
  }).optional(),
  country_of_residence: z.string().optional(),
  former_names: z.array(z.object({
    forenames: z.string().optional(),
    surname: z.string().optional()
  })).optional(),
  is_pre_1992_appointment: z.boolean().optional(),
  links: z.object({
    company: z.string().optional()
  }).optional(),
  name: z.string().optional(),
  name_elements: z.object({
    forename: z.string().optional(),
    honours: z.string().optional(),
    other_forenames: z.string().optional(),
    surname: z.string().optional(),
    title: z.string().optional()
  }).optional(),
  nationality: z.string().optional(),
  occupation: z.string().optional(),
  officer_role: z.string().optional(),
  resigned_on: z.string().optional()
});

export const AppointmentsListSchema = z.object({
  date_of_birth: z.object({
    month: z.number().optional(),
    year: z.number().optional()
  }).optional(),
  etag: z.string().optional(),
  is_corporate_officer: z.boolean().optional(),
  items: z.array(AppointmentSchema).optional(),
  items_per_page: z.number().optional(),
  kind: z.string().optional(),
  links: z.object({
    self: z.string().optional()
  }).optional(),
  name: z.string().optional(),
  start_index: z.number().optional(),
  total_results: z.number().optional()
});

export type Officers = z.infer<typeof OfficersSchema>;
export type OfficerAppointment = z.infer<typeof OfficerAppointmentSchema>;
export type CorporateOfficerDisqualification = z.infer<
  typeof CorporateOfficerDisqualificationSchema
>;
export type NaturalOfficerDisqualification = z.infer<typeof NaturalOfficerDisqualificationSchema>;
export type OfficerAppointmentsList = z.infer<typeof OfficerAppointmentsListSchema>;
export type Officer = z.infer<typeof OfficerSchema>;
export type OfficersResponse = z.infer<typeof OfficersResponseSchema>;
export type Disqualification = z.infer<typeof DisqualificationSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
export type AppointmentsList = z.infer<typeof AppointmentsListSchema>;
