import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/index.js';

export class OfficersHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleGetOfficers(args: unknown) {
    const params = schemas.OfficersSchema.parse(args);
    const result = await this.apiClient.officers.getOfficers(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetOfficerAppointment(args: unknown) {
    const params = schemas.OfficerAppointmentSchema.parse(args);
    const result = await this.apiClient.officers.getOfficerAppointment(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetCorporateOfficerDisqualification(args: unknown) {
    const params = schemas.CorporateOfficerDisqualificationSchema.parse(args);
    const result = await this.apiClient.officers.getCorporateOfficerDisqualification(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetNaturalOfficerDisqualification(args: unknown) {
    const params = schemas.NaturalOfficerDisqualificationSchema.parse(args);
    const result = await this.apiClient.officers.getNaturalOfficerDisqualification(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetOfficerAppointmentsList(args: unknown) {
    const params = schemas.OfficerAppointmentsListSchema.parse(args);
    const result = await this.apiClient.officers.getOfficerAppointmentsList(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
}