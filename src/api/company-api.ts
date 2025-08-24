import { BaseApiClient } from './base-client.js';
import type {
  CompanySearch,
  CompanyProfile,
  RegisteredOfficeAddress,
  Registers,
  Insolvency,
  Exemptions,
  UKEstablishments
} from '../types/index.js';

export class CompanyApiClient extends BaseApiClient {
  async searchCompanies(params: {
    query: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<CompanySearch> {
    const response = await this.client.get('/search/companies', {
      params: {
        q: params.query,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async getCompanyProfile(params: { company_number: string }): Promise<CompanyProfile> {
    const response = await this.client.get(`/company/${params.company_number}`);
    return response.data;
  }

  async getRegisteredOfficeAddress(params: {
    company_number: string;
  }): Promise<RegisteredOfficeAddress> {
    const response = await this.client.get(
      `/company/${params.company_number}/registered-office-address`
    );
    return response.data;
  }

  async getRegisters(params: { company_number: string }): Promise<Registers> {
    const response = await this.client.get(`/company/${params.company_number}/registers`);
    return response.data;
  }

  async getInsolvency(params: { company_number: string }): Promise<Insolvency> {
    const response = await this.client.get(`/company/${params.company_number}/insolvency`);
    return response.data;
  }

  async getExemptions(params: { company_number: string }): Promise<Exemptions> {
    const response = await this.client.get(`/company/${params.company_number}/exemptions`);
    return response.data;
  }

  async getUKEstablishments(params: { company_number: string }): Promise<UKEstablishments> {
    const response = await this.client.get(
      `/company/${params.company_number}/uk-establishments`
    );
    return response.data;
  }
}