import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/index.js';

export class CompanyHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleSearchCompanies(args: unknown) {
    const params = schemas.CompanySearchSchema.parse(args);
    const result = await this.apiClient.company.searchCompanies(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetCompanyProfile(args: unknown) {
    const params = schemas.CompanyProfileSchema.parse(args);
    const result = await this.apiClient.company.getCompanyProfile(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetRegisteredOfficeAddress(args: unknown) {
    const params = schemas.RegisteredOfficeAddressSchema.parse(args);
    const result = await this.apiClient.company.getRegisteredOfficeAddress(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetRegisters(args: unknown) {
    const params = schemas.RegistersSchema.parse(args);
    const result = await this.apiClient.company.getRegisters(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetInsolvency(args: unknown) {
    const params = schemas.InsolvencySchema.parse(args);
    const result = await this.apiClient.company.getInsolvency(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetExemptions(args: unknown) {
    const params = schemas.ExemptionsSchema.parse(args);
    const result = await this.apiClient.company.getExemptions(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetUKEstablishments(args: unknown) {
    const params = schemas.UKEstablishmentsSchema.parse(args);
    const result = await this.apiClient.company.getUKEstablishments(params);
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