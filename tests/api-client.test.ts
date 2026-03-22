import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CompaniesHouseApiClient } from '../src/api-client';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: 'OK',
    json: () => Promise.resolve(data),
    headers: new Headers(),
  } as Response;
}

function errorResponse(
  status: number,
  body: Record<string, unknown>,
  statusText = 'Error'
): Response {
  return {
    ok: false,
    status,
    statusText,
    json: () => Promise.resolve(body),
    headers: new Headers(),
  } as Response;
}

describe('CompaniesHouseApiClient', () => {
  let apiClient: CompaniesHouseApiClient;

  beforeEach(() => {
    mockFetch.mockReset();
    apiClient = new CompaniesHouseApiClient({
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create client with correct auth header', async () => {
      mockFetch.mockResolvedValue(jsonResponse({ items: [] }));

      await apiClient.company.searchCompanies({ query: 'test' });

      const [url, options] = mockFetch.mock.calls[0];
      expect(options.headers.Authorization).toBe(
        'Basic ' + Buffer.from('test-api-key:').toString('base64')
      );
    });

    it('should use default base URL if not provided', async () => {
      const defaultClient = new CompaniesHouseApiClient({ apiKey: 'test-key' });
      mockFetch.mockResolvedValue(jsonResponse({ items: [] }));

      await defaultClient.company.searchCompanies({ query: 'test' });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('https://api.company-information.service.gov.uk');
    });
  });

  describe('searchCompanies', () => {
    it('should search companies with correct parameters', async () => {
      const mockData = {
        items: [{ company_name: 'Test Company' }],
        total_results: 1,
      };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.company.searchCompanies({
        query: 'test',
        items_per_page: 10,
        start_index: 0,
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/search/companies');
      expect(url).toContain('q=test');
      expect(url).toContain('items_per_page=10');
      expect(url).toContain('start_index=0');
      expect(result).toEqual(mockData);
    });

    it('should handle search with minimal parameters', async () => {
      const mockData = { items: [] };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      await apiClient.company.searchCompanies({ query: 'test' });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('q=test');
      expect(url).not.toContain('items_per_page');
      expect(url).not.toContain('start_index');
    });
  });

  describe('getCompanyProfile', () => {
    it('should get company profile with correct company number', async () => {
      const mockData = {
        company_name: 'Test Company Ltd',
        company_number: '12345678',
        jurisdiction: 'england-wales',
      };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.company.getCompanyProfile({
        company_number: '12345678',
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/company/12345678');
      expect(result).toEqual(mockData);
    });
  });

  describe('getOfficers', () => {
    it('should get officers with all parameters', async () => {
      const mockData = {
        items: [{ name: 'John Doe', officer_role: 'director' }],
      };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.officers.getOfficers({
        company_number: '12345678',
        items_per_page: 50,
        start_index: 10,
        register_type: 'directors',
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/company/12345678/officers');
      expect(url).toContain('items_per_page=50');
      expect(url).toContain('start_index=10');
      expect(url).toContain('register_type=directors');
      expect(result).toEqual(mockData);
    });

    it('should handle officers request with minimal parameters', async () => {
      const mockData = { items: [] };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      await apiClient.officers.getOfficers({ company_number: '12345678' });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/company/12345678/officers');
      expect(url).not.toContain('items_per_page');
      expect(url).not.toContain('start_index');
      expect(url).not.toContain('register_type');
    });
  });

  describe('getFilingHistory', () => {
    it('should get filing history with all parameters', async () => {
      const mockData = {
        items: [{ type: 'AA', date: '2024-01-01' }],
      };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.filing.getFilingHistory({
        company_number: '12345678',
        items_per_page: 30,
        start_index: 5,
        category: 'accounts',
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/company/12345678/filing-history');
      expect(url).toContain('items_per_page=30');
      expect(url).toContain('start_index=5');
      expect(url).toContain('category=accounts');
      expect(result).toEqual(mockData);
    });
  });

  describe('getPersonsWithSignificantControl', () => {
    it('should get PSC data correctly', async () => {
      const mockData = {
        items: [
          {
            name: 'Jane Smith',
            kind: 'individual-person-with-significant-control',
          },
        ],
      };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.psc.getPersonsWithSignificantControl({
        company_number: '12345678',
        items_per_page: 20,
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain(
        '/company/12345678/persons-with-significant-control'
      );
      expect(url).toContain('items_per_page=20');
      expect(result).toEqual(mockData);
    });
  });

  describe('getCharges', () => {
    it('should get charges correctly', async () => {
      const mockData = {
        items: [{ charge_number: 1, status: 'outstanding' }],
      };
      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.charges.getCharges({
        company_number: '12345678',
      });

      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/company/12345678/charges');
      expect(result).toEqual(mockData);
    });
  });

  describe('testConnection', () => {
    it('should return true when connection is successful', async () => {
      mockFetch.mockResolvedValue(jsonResponse({}));

      const result = await apiClient.testConnection();

      expect(result).toBe(true);
      const [url] = mockFetch.mock.calls[0];
      expect(url).toContain('/search/companies');
      expect(url).toContain('q=test');
      expect(url).toContain('items_per_page=1');
    });

    it('should return false when connection fails', async () => {
      mockFetch.mockRejectedValue(new Error('Connection failed'));

      const result = await apiClient.testConnection();

      expect(result).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle 401 authentication error', async () => {
      mockFetch.mockResolvedValue(
        errorResponse(401, { error: 'Invalid API key' })
      );

      await expect(
        apiClient.company.searchCompanies({ query: 'test' })
      ).rejects.toThrow(
        'Authentication failed: Invalid API key. Please check your API key.'
      );
    });

    it('should handle 404 not found error', async () => {
      mockFetch.mockResolvedValue(
        errorResponse(404, { error: 'Company not found' })
      );

      await expect(
        apiClient.company.getCompanyProfile({ company_number: '99999999' })
      ).rejects.toThrow('Resource not found: Company not found');
    });

    it('should handle 429 rate limit error', async () => {
      mockFetch.mockResolvedValue(
        errorResponse(429, { error: 'Too many requests' })
      );

      await expect(
        apiClient.company.searchCompanies({ query: 'test' })
      ).rejects.toThrow(
        'Rate limit exceeded: Too many requests. Please try again later.'
      );
    });

    it('should handle server errors', async () => {
      mockFetch.mockResolvedValue(
        errorResponse(500, { error: 'Internal server error' })
      );

      await expect(
        apiClient.company.searchCompanies({ query: 'test' })
      ).rejects.toThrow(
        'Server error: Internal server error. Please try again later.'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValue(
        new TypeError('fetch failed')
      );

      await expect(
        apiClient.company.searchCompanies({ query: 'test' })
      ).rejects.toThrow(
        'No response from Companies House API. Please check your connection.'
      );
    });

    it('should handle unknown errors', async () => {
      mockFetch.mockRejectedValue(new Error('Unknown error'));

      await expect(
        apiClient.company.searchCompanies({ query: 'test' })
      ).rejects.toThrow('Unknown error');
    });
  });
});
