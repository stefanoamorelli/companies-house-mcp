import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import type { Tool } from '@modelcontextprotocol/sdk/types.js';
import { CompaniesHouseApiClient } from './api-client.js';
import {
  CompanySearchSchema,
  CompanyProfileSchema,
  OfficersSchema,
  FilingHistorySchema,
  PersonsWithSignificantControlSchema,
  ChargesSchema
} from './types.js';

export interface ServerConfig {
  apiKey: string;
  baseUrl?: string;
}

export class CompaniesHouseMCPServer {
  private server: Server;
  private apiClient: CompaniesHouseApiClient;

  constructor(config: ServerConfig) {
    this.server = new Server(
      {
        name: 'companies-house-mcp',
        version: '1.0.0'
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

    this.setupHandlers();
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.getTools()
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_companies':
            return await this.handleSearchCompanies(args);
          case 'get_company_profile':
            return await this.handleGetCompanyProfile(args);
          case 'get_officers':
            return await this.handleGetOfficers(args);
          case 'get_filing_history':
            return await this.handleGetFilingHistory(args);
          case 'get_persons_with_significant_control':
            return await this.handleGetPersonsWithSignificantControl(args);
          case 'get_charges':
            return await this.handleGetCharges(args);
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

  private getTools(): Tool[] {
    return [
      {
        name: 'search_companies',
        description: 'Search for companies by name or company number',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Company name or number to search for'
            },
            items_per_page: {
              type: 'number',
              description: 'Number of results per page (1-100)',
              default: 20
            },
            start_index: {
              type: 'number',
              description: 'Starting index for pagination',
              default: 0
            }
          },
          required: ['query']
        }
      },
      {
        name: 'get_company_profile',
        description: 'Get detailed profile information for a specific company',
        inputSchema: {
          type: 'object',
          properties: {
            company_number: {
              type: 'string',
              description: 'The company number'
            }
          },
          required: ['company_number']
        }
      },
      {
        name: 'get_officers',
        description: 'Get list of officers for a specific company',
        inputSchema: {
          type: 'object',
          properties: {
            company_number: {
              type: 'string',
              description: 'The company number'
            },
            items_per_page: {
              type: 'number',
              description: 'Number of results per page (1-100)',
              default: 35
            },
            start_index: {
              type: 'number',
              description: 'Starting index for pagination',
              default: 0
            },
            register_type: {
              type: 'string',
              description: 'Type of register (directors, secretaries, llp-members)',
              enum: ['directors', 'secretaries', 'llp-members']
            }
          },
          required: ['company_number']
        }
      },
      {
        name: 'get_filing_history',
        description: 'Get filing history for a specific company',
        inputSchema: {
          type: 'object',
          properties: {
            company_number: {
              type: 'string',
              description: 'The company number'
            },
            items_per_page: {
              type: 'number',
              description: 'Number of results per page (1-100)',
              default: 25
            },
            start_index: {
              type: 'number',
              description: 'Starting index for pagination',
              default: 0
            },
            category: {
              type: 'string',
              description: 'Category of filing history'
            }
          },
          required: ['company_number']
        }
      },
      {
        name: 'get_persons_with_significant_control',
        description: 'Get persons with significant control for a specific company',
        inputSchema: {
          type: 'object',
          properties: {
            company_number: {
              type: 'string',
              description: 'The company number'
            },
            items_per_page: {
              type: 'number',
              description: 'Number of results per page (1-100)',
              default: 25
            },
            start_index: {
              type: 'number',
              description: 'Starting index for pagination',
              default: 0
            }
          },
          required: ['company_number']
        }
      },
      {
        name: 'get_charges',
        description: 'Get charges registered against a specific company',
        inputSchema: {
          type: 'object',
          properties: {
            company_number: {
              type: 'string',
              description: 'The company number'
            },
            items_per_page: {
              type: 'number',
              description: 'Number of results per page (1-100)',
              default: 25
            },
            start_index: {
              type: 'number',
              description: 'Starting index for pagination',
              default: 0
            }
          },
          required: ['company_number']
        }
      }
    ];
  }

  private async handleSearchCompanies(args: unknown) {
    const params = CompanySearchSchema.parse(args);
    const result = await this.apiClient.searchCompanies(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  private async handleGetCompanyProfile(args: unknown) {
    const params = CompanyProfileSchema.parse(args);
    const result = await this.apiClient.getCompanyProfile(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  private async handleGetOfficers(args: unknown) {
    const params = OfficersSchema.parse(args);
    const result = await this.apiClient.getOfficers(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  private async handleGetFilingHistory(args: unknown) {
    const params = FilingHistorySchema.parse(args);
    const result = await this.apiClient.getFilingHistory(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  private async handleGetPersonsWithSignificantControl(args: unknown) {
    const params = PersonsWithSignificantControlSchema.parse(args);
    const result = await this.apiClient.getPersonsWithSignificantControl(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  private async handleGetCharges(args: unknown) {
    const params = ChargesSchema.parse(args);
    const result = await this.apiClient.getCharges(params);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error('Companies House MCP Server running on stdio');
  }

  getServer(): Server {
    return this.server;
  }

  getApiClient(): CompaniesHouseApiClient {
    return this.apiClient;
  }
}
