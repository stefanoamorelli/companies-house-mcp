import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { CompaniesHouseApiClient } from './api/client.js';
import { getAllTools } from './tools/tools-definition.js';
import { CompanyHandlers } from './handlers/company-handlers.js';
import { SearchHandlers } from './handlers/search-handlers.js';
import { OfficersHandlers } from './handlers/officers-handlers.js';
import { FilingHandlers } from './handlers/filing-handlers.js';
import { ChargesHandlers } from './handlers/charges-handlers.js';
import { PSCHandlers } from './handlers/psc-handlers.js';
import { DocumentHandlers } from './handlers/document-handlers.js';

export interface ServerConfig {
  apiKey: string;
  baseUrl?: string;
}

export class CompaniesHouseMCPServer {
  private server: Server;
  private apiClient: CompaniesHouseApiClient;
  private companyHandlers: CompanyHandlers;
  private searchHandlers: SearchHandlers;
  private officersHandlers: OfficersHandlers;
  private filingHandlers: FilingHandlers;
  private chargesHandlers: ChargesHandlers;
  private pscHandlers: PSCHandlers;
  private documentHandlers: DocumentHandlers;

  constructor(config: ServerConfig) {
    this.server = new Server(
      {
        name: 'companies-house-mcp',
        version: '2.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.apiClient = new CompaniesHouseApiClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl
    });

    // Initialize handlers
    this.companyHandlers = new CompanyHandlers(this.apiClient);
    this.searchHandlers = new SearchHandlers(this.apiClient);
    this.officersHandlers = new OfficersHandlers(this.apiClient);
    this.filingHandlers = new FilingHandlers(this.apiClient);
    this.chargesHandlers = new ChargesHandlers(this.apiClient);
    this.pscHandlers = new PSCHandlers(this.apiClient);
    this.documentHandlers = new DocumentHandlers(this.apiClient);

    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: getAllTools()
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          // Company endpoints
          case 'search_companies':
            return await this.companyHandlers.handleSearchCompanies(args);
          case 'get_company_profile':
            return await this.companyHandlers.handleGetCompanyProfile(args);
          case 'get_registered_office_address':
            return await this.companyHandlers.handleGetRegisteredOfficeAddress(args);
          case 'get_registers':
            return await this.companyHandlers.handleGetRegisters(args);
          case 'get_insolvency':
            return await this.companyHandlers.handleGetInsolvency(args);
          case 'get_exemptions':
            return await this.companyHandlers.handleGetExemptions(args);
          case 'get_uk_establishments':
            return await this.companyHandlers.handleGetUKEstablishments(args);

          // Search endpoints
          case 'advanced_company_search':
            return await this.searchHandlers.handleAdvancedCompanySearch(args);
          case 'search_all':
            return await this.searchHandlers.handleSearchAll(args);
          case 'search_officers':
            return await this.searchHandlers.handleSearchOfficers(args);
          case 'search_disqualified_officers':
            return await this.searchHandlers.handleSearchDisqualifiedOfficers(args);
          case 'alphabetical_search':
            return await this.searchHandlers.handleAlphabeticalSearch(args);
          case 'dissolved_search':
            return await this.searchHandlers.handleDissolvedSearch(args);

          // Officers endpoints
          case 'get_officers':
            return await this.officersHandlers.handleGetOfficers(args);
          case 'get_officer_appointment':
            return await this.officersHandlers.handleGetOfficerAppointment(args);
          case 'get_corporate_officer_disqualification':
            return await this.officersHandlers.handleGetCorporateOfficerDisqualification(args);
          case 'get_natural_officer_disqualification':
            return await this.officersHandlers.handleGetNaturalOfficerDisqualification(args);
          case 'get_officer_appointments_list':
            return await this.officersHandlers.handleGetOfficerAppointmentsList(args);

          // Filing history endpoints
          case 'get_filing_history':
            return await this.filingHandlers.handleGetFilingHistory(args);
          case 'get_filing_history_item':
            return await this.filingHandlers.handleGetFilingHistoryItem(args);

          // Charges endpoints
          case 'get_charges':
            return await this.chargesHandlers.handleGetCharges(args);
          case 'get_charge_details':
            return await this.chargesHandlers.handleGetChargeDetails(args);

          // PSC endpoints
          case 'get_persons_with_significant_control':
            return await this.pscHandlers.handleGetPersonsWithSignificantControl(args);
          case 'get_psc_corporate_entity_beneficial_owner':
            return await this.pscHandlers.handleGetPSCCorporateEntityBeneficialOwner(args);
          case 'get_psc_corporate_entity':
            return await this.pscHandlers.handleGetPSCCorporateEntity(args);
          case 'get_psc_individual_beneficial_owner':
            return await this.pscHandlers.handleGetPSCIndividualBeneficialOwner(args);
          case 'get_psc_individual':
            return await this.pscHandlers.handleGetPSCIndividual(args);
          case 'get_psc_individual_verification':
            return await this.pscHandlers.handleGetPSCIndividualVerification(args);
          case 'get_psc_individual_full_record':
            return await this.pscHandlers.handleGetPSCIndividualFullRecord(args);
          case 'get_psc_legal_person_beneficial_owner':
            return await this.pscHandlers.handleGetPSCLegalPersonBeneficialOwner(args);
          case 'get_psc_legal_person':
            return await this.pscHandlers.handleGetPSCLegalPerson(args);
          case 'get_psc_statement':
            return await this.pscHandlers.handleGetPSCStatement(args);
          case 'get_psc_statements_list':
            return await this.pscHandlers.handleGetPSCStatementsList(args);
          case 'get_psc_super_secure_beneficial_owner':
            return await this.pscHandlers.handleGetPSCSuperSecureBeneficialOwner(args);
          case 'get_psc_super_secure':
            return await this.pscHandlers.handleGetPSCSuperSecure(args);

          // Document endpoints
          case 'get_document_metadata':
            return await this.documentHandlers.handleGetDocumentMetadata(args);
          case 'get_document_content':
            return await this.documentHandlers.handleGetDocumentContent(args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`
            }
          ]
        };
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error('Companies House MCP Server v2.0.0 running on stdio');
    console.error(`Loaded ${getAllTools().length} tools`);
  }

  getServer(): Server {
    return this.server;
  }

  getApiClient(): CompaniesHouseApiClient {
    return this.apiClient;
  }
}
