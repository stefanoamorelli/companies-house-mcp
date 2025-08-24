import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/index.js';

export class FilingHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleGetFilingHistory(args: unknown) {
    const params = schemas.FilingHistorySchema.parse(args);
    const result = await this.apiClient.filing.getFilingHistory(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetFilingHistoryItem(args: unknown) {
    const params = schemas.FilingHistoryItemSchema.parse(args);
    const result = await this.apiClient.filing.getFilingHistoryItem(params);
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