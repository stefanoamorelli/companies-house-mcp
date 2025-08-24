import { BaseApiClient } from './base-client.js';
import type {
  Officers,
  OfficerAppointment,
  CorporateOfficerDisqualification,
  NaturalOfficerDisqualification,
  OfficerAppointmentsList
} from '../types/index.js';

export class OfficersApiClient extends BaseApiClient {
  async getOfficers(params: {
    company_number: string;
    register_type?: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<Officers> {
    const response = await this.client.get(`/company/${params.company_number}/officers`, {
      params: {
        items_per_page: params.items_per_page,
        start_index: params.start_index,
        register_type: params.register_type
      }
    });
    return response.data;
  }

  async getOfficerAppointment(params: OfficerAppointment): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/appointments/${params.appointment_id}`
    );
    return response.data;
  }

  async getCorporateOfficerDisqualification(
    params: CorporateOfficerDisqualification
  ): Promise<any> {
    const response = await this.client.get(
      `/disqualified-officers/corporate/${params.officer_id}`
    );
    return response.data;
  }

  async getNaturalOfficerDisqualification(params: NaturalOfficerDisqualification): Promise<any> {
    const response = await this.client.get(
      `/disqualified-officers/natural/${params.officer_id}`
    );
    return response.data;
  }

  async getOfficerAppointmentsList(params: OfficerAppointmentsList): Promise<any> {
    const response = await this.client.get(`/officers/${params.officer_id}/appointments`, {
      params: {
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }
}