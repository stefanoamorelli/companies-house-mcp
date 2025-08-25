import type { ApiConfig } from './base-client.js';
import { CompanyApiClient } from './company-api.js';
import { SearchApiClient } from './search-api.js';
import { OfficersApiClient } from './officers-api.js';
import { FilingApiClient } from './filing-api.js';
import { ChargesApiClient } from './charges-api.js';
import { PSCApiClient } from './psc-api.js';
import { DocumentApiClient } from './document-api.js';

export class CompaniesHouseApiClient {
  public company: CompanyApiClient;
  public search: SearchApiClient;
  public officers: OfficersApiClient;
  public filing: FilingApiClient;
  public charges: ChargesApiClient;
  public psc: PSCApiClient;
  public document: DocumentApiClient;

  constructor(config: ApiConfig) {
    this.company = new CompanyApiClient(config);
    this.search = new SearchApiClient(config);
    this.officers = new OfficersApiClient(config);
    this.filing = new FilingApiClient(config);
    this.charges = new ChargesApiClient(config);
    this.psc = new PSCApiClient(config);
    this.document = new DocumentApiClient(config.apiKey);
  }

  async testConnection(): Promise<boolean> {
    return this.company.testConnection();
  }
}

export type { ApiConfig } from './base-client.js';
