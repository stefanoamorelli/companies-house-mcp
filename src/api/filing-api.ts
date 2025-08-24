import { BaseApiClient } from './base-client.js';
import type { FilingHistoryItem, FilingItem, FilingHistoryResponse } from '../types/index.js';

export class FilingApiClient extends BaseApiClient {
  async getFilingHistory(params: {
    company_number: string;
    category?: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<FilingHistoryResponse> {
    const response = await this.client.get(`/company/${params.company_number}/filing-history`, {
      params: {
        items_per_page: params.items_per_page,
        start_index: params.start_index,
        category: params.category
      }
    });
    return response.data;
  }

  async getFilingHistoryItem(params: FilingHistoryItem): Promise<FilingItem> {
    const response = await this.client.get(
      `/company/${params.company_number}/filing-history/${params.transaction_id}`
    );
    return response.data;
  }
}
