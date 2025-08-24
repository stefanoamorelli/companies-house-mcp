import { BaseApiClient } from './base-client.js';
import type { ChargeDetails, Charge, ChargesResponse } from '../types/index.js';

export class ChargesApiClient extends BaseApiClient {
  async getCharges(params: {
    company_number: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<ChargesResponse> {
    const response = await this.client.get(`/company/${params.company_number}/charges`, {
      params: {
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async getChargeDetails(params: ChargeDetails): Promise<Charge> {
    const response = await this.client.get(
      `/company/${params.company_number}/charges/${params.charge_id}`
    );
    return response.data;
  }
}
