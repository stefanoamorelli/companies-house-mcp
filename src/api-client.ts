import axios, { AxiosInstance } from 'axios';
import {
  CompanySearch,
  CompanyProfile,
  Officers,
  FilingHistory,
  PersonsWithSignificantControl,
  Charges
} from './types.js';

export interface ApiConfig {
  apiKey: string;
  baseUrl?: string;
}

export class CompaniesHouseApiClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: ApiConfig) {
    this.apiKey = config.apiKey;
    const baseURL = config.baseUrl || 'https://api.company-information.service.gov.uk';

    this.client = axios.create({
      baseURL,
      auth: {
        username: this.apiKey,
        password: ''
      },
      headers: {
        Accept: 'application/json'
      },
      timeout: 30000
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.transformError(error))
    );
  }

  private transformError(error: unknown): Error {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const message = (error.response.data as Record<string, unknown>)?.error || error.message;

      switch (status) {
        case 401:
          return new Error(`Authentication failed: ${message}. Please check your API key.`);
        case 404:
          return new Error(`Resource not found: ${message}`);
        case 429:
          return new Error(`Rate limit exceeded: ${message}. Please try again later.`);
        case 500:
        case 502:
        case 503:
        case 504:
          return new Error(`Server error: ${message}. Please try again later.`);
        default:
          return new Error(`API error (${status}): ${message}`);
      }
    } else if (axios.isAxiosError(error) && error.request) {
      return new Error('No response from Companies House API. Please check your connection.');
    } else if (error instanceof Error) {
      return new Error(`Request error: ${error.message}`);
    } else {
      return new Error('An unexpected error occurred');
    }
  }

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

  async getFilingHistory(params: {
    company_number: string;
    category?: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<FilingHistory> {
    const response = await this.client.get(`/company/${params.company_number}/filing-history`, {
      params: {
        items_per_page: params.items_per_page,
        start_index: params.start_index,
        category: params.category
      }
    });
    return response.data;
  }

  async getPersonsWithSignificantControl(params: {
    company_number: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<PersonsWithSignificantControl> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control`,
      {
        params: {
          items_per_page: params.items_per_page,
          start_index: params.start_index
        }
      }
    );
    return response.data;
  }

  async getCharges(params: {
    company_number: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<Charges> {
    const response = await this.client.get(`/company/${params.company_number}/charges`, {
      params: {
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/search/companies', {
        params: { q: 'test', items_per_page: 1 }
      });
      return true;
    } catch {
      return false;
    }
  }
}
