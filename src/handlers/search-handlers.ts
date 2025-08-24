import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/index.js';

export class SearchHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleAdvancedCompanySearch(args: unknown) {
    const params = schemas.AdvancedCompanySearchSchema.parse(args);
    const result = await this.apiClient.search.advancedCompanySearch(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleSearchAll(args: unknown) {
    const params = schemas.SearchAllSchema.parse(args);
    const result = await this.apiClient.search.searchAll(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleSearchOfficers(args: unknown) {
    const params = schemas.SearchOfficersSchema.parse(args);
    const result = await this.apiClient.search.searchOfficers(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleSearchDisqualifiedOfficers(args: unknown) {
    const params = schemas.SearchDisqualifiedOfficersSchema.parse(args);
    const result = await this.apiClient.search.searchDisqualifiedOfficers(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleAlphabeticalSearch(args: unknown) {
    const params = schemas.AlphabeticalSearchSchema.parse(args);
    const result = await this.apiClient.search.alphabeticalSearch(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleDissolvedSearch(args: unknown) {
    const params = schemas.DissolvedSearchSchema.parse(args);
    const result = await this.apiClient.search.dissolvedSearch(params);
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