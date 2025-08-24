import { BaseApiClient } from './base-client.js';
import type {
  AdvancedCompanySearch,
  SearchAll,
  SearchOfficers,
  SearchDisqualifiedOfficers,
  AlphabeticalSearch,
  DissolvedSearch,
  CompanySearchResponse,
  SearchResponse,
  OfficerSearchResponse,
  DisqualifiedOfficerSearchResponse
} from '../types/index.js';

export class SearchApiClient extends BaseApiClient {
  async advancedCompanySearch(params: AdvancedCompanySearch): Promise<CompanySearchResponse> {
    const response = await this.client.get('/advanced-search/companies', {
      params: {
        company_name: params.company_name,
        company_number: params.company_number,
        company_status: params.company_status,
        company_type: params.company_type,
        company_subtype: params.company_subtype,
        dissolved_from: params.dissolved_from,
        dissolved_to: params.dissolved_to,
        incorporated_from: params.incorporated_from,
        incorporated_to: params.incorporated_to,
        sic_codes: params.sic_codes,
        location: params.location,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async searchAll(params: SearchAll): Promise<SearchResponse> {
    const response = await this.client.get('/search', {
      params: {
        q: params.query,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async searchOfficers(params: SearchOfficers): Promise<OfficerSearchResponse> {
    const response = await this.client.get('/search/officers', {
      params: {
        q: params.query,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async searchDisqualifiedOfficers(
    params: SearchDisqualifiedOfficers
  ): Promise<DisqualifiedOfficerSearchResponse> {
    const response = await this.client.get('/search/disqualified-officers', {
      params: {
        q: params.query,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async alphabeticalSearch(params: AlphabeticalSearch): Promise<CompanySearchResponse> {
    const response = await this.client.get('/alphabetical-search/companies', {
      params: {
        q: params.query,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }

  async dissolvedSearch(params: DissolvedSearch): Promise<CompanySearchResponse> {
    const response = await this.client.get('/dissolved-search/companies', {
      params: {
        q: params.query,
        items_per_page: params.items_per_page,
        start_index: params.start_index
      }
    });
    return response.data;
  }
}
