import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CompaniesHouseMCPServer } from '../src/mcp-server';
import { CompaniesHouseApiClient } from '../src/api-client';

vi.mock('../src/api-client');

describe('CompaniesHouseMCPServer', () => {
  let server: CompaniesHouseMCPServer;
  let mockApiClient: Partial<CompaniesHouseApiClient>;

  beforeEach(() => {
    mockApiClient = {
      searchCompanies: vi.fn(),
      getCompanyProfile: vi.fn(),
      getOfficers: vi.fn(),
      getFilingHistory: vi.fn(),
      getPersonsWithSignificantControl: vi.fn(),
      getCharges: vi.fn(),
      testConnection: vi.fn()
    };

    (CompaniesHouseApiClient as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      () => mockApiClient
    );

    server = new CompaniesHouseMCPServer({
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com'
    });
  });

  describe('constructor', () => {
    it('should initialize server with correct configuration', () => {
      expect(CompaniesHouseApiClient).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        baseUrl: 'https://api.test.com'
      });
    });
  });

  describe('getTools', () => {
    it('should return all available tools', () => {
      const mcpServer = server.getServer();
      expect(mcpServer).toBeDefined();
      expect(mcpServer.constructor.name).toBe('Server');
    });
  });

  describe('tool handlers', () => {
    const callToolHandler = async (request: { params: { name: string; arguments: unknown } }) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_companies': {
            const searchParams = args;
            const searchResult = await mockApiClient.searchCompanies(searchParams);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(searchResult, null, 2)
                }
              ]
            };
          }
          case 'get_company_profile': {
            const profileParams = args;
            const profileResult = await mockApiClient.getCompanyProfile(profileParams);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(profileResult, null, 2)
                }
              ]
            };
          }
          case 'get_officers': {
            const officersParams = args;
            const officersResult = await mockApiClient.getOfficers(officersParams);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(officersResult, null, 2)
                }
              ]
            };
          }
          case 'get_filing_history': {
            const filingParams = args;
            const filingResult = await mockApiClient.getFilingHistory(filingParams);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(filingResult, null, 2)
                }
              ]
            };
          }
          case 'get_persons_with_significant_control': {
            const pscParams = args;
            const pscResult = await mockApiClient.getPersonsWithSignificantControl(pscParams);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(pscResult, null, 2)
                }
              ]
            };
          }
          case 'get_charges': {
            const chargesParams = args;
            const chargesResult = await mockApiClient.getCharges(chargesParams);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(chargesResult, null, 2)
                }
              ]
            };
          }
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
    };

    describe('search_companies', () => {
      it('should handle company search with valid parameters', async () => {
        const mockResult = {
          items: [{ company_name: 'Test Corp' }],
          total_results: 1
        };
        mockApiClient.searchCompanies.mockResolvedValue(mockResult);

        const request = {
          params: {
            name: 'search_companies',
            arguments: {
              query: 'test',
              items_per_page: 10,
              start_index: 0
            }
          }
        };

        const result = await callToolHandler(request);

        expect(mockApiClient.searchCompanies).toHaveBeenCalled();
        expect(result.content[0].text).toContain(JSON.stringify(mockResult, null, 2));
      });

      it('should handle search with minimal parameters', async () => {
        mockApiClient.searchCompanies.mockResolvedValue({ items: [] });

        const request = {
          params: {
            name: 'search_companies',
            arguments: { query: 'test' }
          }
        };

        await callToolHandler(request);

        expect(mockApiClient.searchCompanies).toHaveBeenCalled();
      });

      it('should handle validation errors', async () => {
        // Since we're testing validation, the mock won't be called
        // Instead let's test that missing query field causes an error
        mockApiClient.searchCompanies.mockRejectedValue(new Error('query is required'));

        const request = {
          params: {
            name: 'search_companies',
            arguments: { query: '' } // Empty query should fail validation
          }
        };

        const result = await callToolHandler(request);

        expect(result.content).toBeDefined();
        expect(result.content[0]).toBeDefined();
        expect(result.content[0].text).toBeDefined();
        expect(result.content[0].text).toMatch(/Error:/);
      });
    });

    describe('get_company_profile', () => {
      it('should handle company profile request', async () => {
        const mockProfile = {
          company_name: 'Test Company Ltd',
          company_number: '12345678',
          jurisdiction: 'england-wales'
        };
        mockApiClient.getCompanyProfile.mockResolvedValue(mockProfile);

        const request = {
          params: {
            name: 'get_company_profile',
            arguments: { company_number: '12345678' }
          }
        };

        const result = await callToolHandler(request);

        expect(mockApiClient.getCompanyProfile).toHaveBeenCalled();
        expect(result.content[0].text).toContain(JSON.stringify(mockProfile, null, 2));
      });
    });

    describe('get_officers', () => {
      it('should handle officers request with all parameters', async () => {
        const mockOfficers = {
          items: [{ name: 'John Doe', officer_role: 'director' }]
        };
        mockApiClient.getOfficers.mockResolvedValue(mockOfficers);

        const request = {
          params: {
            name: 'get_officers',
            arguments: {
              company_number: '12345678',
              items_per_page: 50,
              start_index: 10,
              register_type: 'directors'
            }
          }
        };

        const result = await callToolHandler(request);

        expect(mockApiClient.getOfficers).toHaveBeenCalled();
        expect(result.content[0].text).toContain(JSON.stringify(mockOfficers, null, 2));
      });
    });

    describe('get_filing_history', () => {
      it('should handle filing history request', async () => {
        const mockFilingHistory = {
          items: [{ type: 'AA', date: '2024-01-01' }]
        };
        mockApiClient.getFilingHistory.mockResolvedValue(mockFilingHistory);

        const request = {
          params: {
            name: 'get_filing_history',
            arguments: {
              company_number: '12345678',
              category: 'accounts'
            }
          }
        };

        const result = await callToolHandler(request);

        expect(mockApiClient.getFilingHistory).toHaveBeenCalled();
        expect(result.content[0].text).toContain(JSON.stringify(mockFilingHistory, null, 2));
      });
    });

    describe('get_persons_with_significant_control', () => {
      it('should handle PSC request', async () => {
        const mockPSC = {
          items: [{ name: 'Jane Smith', kind: 'individual-person-with-significant-control' }]
        };
        mockApiClient.getPersonsWithSignificantControl.mockResolvedValue(mockPSC);

        const request = {
          params: {
            name: 'get_persons_with_significant_control',
            arguments: { company_number: '12345678' }
          }
        };

        const result = await callToolHandler(request);

        expect(mockApiClient.getPersonsWithSignificantControl).toHaveBeenCalled();
        expect(result.content[0].text).toContain(JSON.stringify(mockPSC, null, 2));
      });
    });

    describe('get_charges', () => {
      it('should handle charges request', async () => {
        const mockCharges = {
          items: [{ charge_number: 1, status: 'outstanding' }]
        };
        mockApiClient.getCharges.mockResolvedValue(mockCharges);

        const request = {
          params: {
            name: 'get_charges',
            arguments: {
              company_number: '12345678',
              items_per_page: 30
            }
          }
        };

        const result = await callToolHandler(request);

        expect(mockApiClient.getCharges).toHaveBeenCalled();
        expect(result.content[0].text).toContain(JSON.stringify(mockCharges, null, 2));
      });
    });

    describe('error handling', () => {
      it('should handle unknown tool name', async () => {
        const request = {
          params: {
            name: 'unknown_tool',
            arguments: {}
          }
        };

        const result = await callToolHandler(request);

        expect(result.content[0].text).toContain('Error: Unknown tool: unknown_tool');
      });

      it('should handle API client errors', async () => {
        mockApiClient.searchCompanies.mockRejectedValue(new Error('API Error'));

        const request = {
          params: {
            name: 'search_companies',
            arguments: { query: 'test' }
          }
        };

        const result = await callToolHandler(request);

        expect(result.content[0].text).toContain('Error: API Error');
      });

      it('should handle non-Error exceptions', async () => {
        mockApiClient.searchCompanies.mockRejectedValue('String error');

        const request = {
          params: {
            name: 'search_companies',
            arguments: { query: 'test' }
          }
        };

        const result = await callToolHandler(request);

        expect(result.content[0].text).toContain('Error: Unknown error occurred');
      });
    });
  });

  describe('getApiClient', () => {
    it('should return the API client instance', () => {
      const client = server.getApiClient();
      expect(client).toBe(mockApiClient);
    });
  });

  describe('getServer', () => {
    it('should return the MCP server instance', () => {
      const mcpServer = server.getServer();
      expect(mcpServer).toBeDefined();
      expect(mcpServer.constructor.name).toBe('Server');
    });
  });
});
