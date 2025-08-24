import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/index.js';

export class ChargesHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleGetCharges(args: unknown) {
    const params = schemas.ChargesSchema.parse(args);
    const result = await this.apiClient.charges.getCharges(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetChargeDetails(args: unknown) {
    const params = schemas.ChargeDetailsSchema.parse(args);
    const result = await this.apiClient.charges.getChargeDetails(params);
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
