import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import { CompaniesHouseApiClient } from '../src/api-client';

vi.mock('axios');

describe('CompaniesHouseApiClient', () => {
  let apiClient: CompaniesHouseApiClient;
  let mockAxiosInstance: Partial<AxiosInstance>;
  let errorTransformer: ((error: unknown) => unknown) | undefined;

  beforeEach(() => {
    // Mock axios.isAxiosError
    (axios as unknown as { isAxiosError: typeof vi.fn }).isAxiosError = vi.fn((error: unknown) => {
      return typeof error === 'object' && error !== null && 'isAxiosError' in error;
    });

    mockAxiosInstance = {
      get: vi.fn(),
      interceptors: {
        response: {
          use: vi.fn((successHandler, errorHandler) => {
            errorTransformer = errorHandler;
          })
        }
      }
    };

    (axios.create as ReturnType<typeof vi.fn>).mockReturnValue(mockAxiosInstance as AxiosInstance);

    apiClient = new CompaniesHouseApiClient({
      apiKey: 'test-api-key',
      baseUrl: 'https://api.test.com'
    });
  });

  describe('constructor', () => {
    it('should create axios instance with correct config', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://api.test.com',
        auth: {
          username: 'test-api-key',
          password: ''
        },
        headers: {
          Accept: 'application/json'
        },
        timeout: 30000
      });
    });

    it('should use default base URL if not provided', () => {
      new CompaniesHouseApiClient({ apiKey: 'test-key' });

      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: 'https://api.company-information.service.gov.uk'
        })
      );
    });
  });

  describe('searchCompanies', () => {
    it('should search companies with correct parameters', async () => {
      const mockResponse = {
        data: {
          items: [{ company_name: 'Test Company' }],
          total_results: 1
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.company.searchCompanies({
        query: 'test',
        items_per_page: 10,
        start_index: 0
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/search/companies', {
        params: {
          q: 'test',
          items_per_page: 10,
          start_index: 0
        }
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle search with minimal parameters', async () => {
      const mockResponse = { data: { items: [] } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await apiClient.company.searchCompanies({ query: 'test' });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/search/companies', {
        params: {
          q: 'test',
          items_per_page: undefined,
          start_index: undefined
        }
      });
    });
  });

  describe('getCompanyProfile', () => {
    it('should get company profile with correct company number', async () => {
      const mockResponse = {
        data: {
          company_name: 'Test Company Ltd',
          company_number: '12345678',
          jurisdiction: 'england-wales'
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.company.getCompanyProfile({
        company_number: '12345678'
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/company/12345678');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getOfficers', () => {
    it('should get officers with all parameters', async () => {
      const mockResponse = {
        data: {
          items: [{ name: 'John Doe', officer_role: 'director' }]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.officers.getOfficers({
        company_number: '12345678',
        items_per_page: 50,
        start_index: 10,
        register_type: 'directors'
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/company/12345678/officers', {
        params: {
          items_per_page: 50,
          start_index: 10,
          register_type: 'directors'
        }
      });
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle officers request with minimal parameters', async () => {
      const mockResponse = { data: { items: [] } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await apiClient.officers.getOfficers({ company_number: '12345678' });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/company/12345678/officers', {
        params: {
          items_per_page: undefined,
          start_index: undefined,
          register_type: undefined
        }
      });
    });
  });

  describe('getFilingHistory', () => {
    it('should get filing history with all parameters', async () => {
      const mockResponse = {
        data: {
          items: [{ type: 'AA', date: '2024-01-01' }]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.filing.getFilingHistory({
        company_number: '12345678',
        items_per_page: 30,
        start_index: 5,
        category: 'accounts'
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/company/12345678/filing-history', {
        params: {
          items_per_page: 30,
          start_index: 5,
          category: 'accounts'
        }
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getPersonsWithSignificantControl', () => {
    it('should get PSC data correctly', async () => {
      const mockResponse = {
        data: {
          items: [{ name: 'Jane Smith', kind: 'individual-person-with-significant-control' }]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.psc.getPersonsWithSignificantControl({
        company_number: '12345678',
        items_per_page: 20
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/company/12345678/persons-with-significant-control',
        {
          params: {
            items_per_page: 20,
            start_index: undefined
          }
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getCharges', () => {
    it('should get charges correctly', async () => {
      const mockResponse = {
        data: {
          items: [{ charge_number: 1, status: 'outstanding' }]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await apiClient.charges.getCharges({
        company_number: '12345678'
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/company/12345678/charges', {
        params: {
          items_per_page: undefined,
          start_index: undefined
        }
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('testConnection', () => {
    it('should return true when connection is successful', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: {} });

      const result = await apiClient.testConnection();

      expect(result).toBe(true);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/search/companies', {
        params: { q: 'test', items_per_page: 1 }
      });
    });

    it('should return false when connection fails', async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error('Connection failed'));

      const result = await apiClient.testConnection();

      expect(result).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle 401 authentication error', async () => {
      const error = {
        response: {
          status: 401,
          data: { error: 'Invalid API key' }
        },
        isAxiosError: true,
        message: 'Request failed with status code 401'
      };

      // The interceptor returns a rejected promise with the transformed error
      mockAxiosInstance.get.mockImplementation(() => {
        // errorTransformer returns a Promise.reject with the transformed error
        try {
          return errorTransformer(error);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      await expect(apiClient.company.searchCompanies({ query: 'test' })).rejects.toThrow(
        'Authentication failed: Invalid API key. Please check your API key.'
      );
    });

    it('should handle 404 not found error', async () => {
      const error = {
        response: {
          status: 404,
          data: { error: 'Company not found' }
        },
        isAxiosError: true,
        message: 'Request failed with status code 404'
      };

      mockAxiosInstance.get.mockImplementation(() => {
        try {
          return errorTransformer(error);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      await expect(
        apiClient.company.getCompanyProfile({ company_number: '99999999' })
      ).rejects.toThrow('Resource not found: Company not found');
    });

    it('should handle 429 rate limit error', async () => {
      const error = {
        response: {
          status: 429,
          data: { error: 'Too many requests' }
        },
        isAxiosError: true,
        message: 'Request failed with status code 429'
      };

      mockAxiosInstance.get.mockImplementation(() => {
        try {
          return errorTransformer(error);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      await expect(apiClient.company.searchCompanies({ query: 'test' })).rejects.toThrow(
        'Rate limit exceeded: Too many requests. Please try again later.'
      );
    });

    it('should handle server errors', async () => {
      const error = {
        response: {
          status: 500,
          data: { error: 'Internal server error' }
        },
        isAxiosError: true,
        message: 'Request failed with status code 500'
      };

      mockAxiosInstance.get.mockImplementation(() => {
        try {
          return errorTransformer(error);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      await expect(apiClient.company.searchCompanies({ query: 'test' })).rejects.toThrow(
        'Server error: Internal server error. Please try again later.'
      );
    });

    it('should handle network errors', async () => {
      const error = {
        request: {},
        isAxiosError: true,
        message: 'Network error'
      };

      mockAxiosInstance.get.mockImplementation(() => {
        try {
          return errorTransformer(error);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      await expect(apiClient.company.searchCompanies({ query: 'test' })).rejects.toThrow(
        'No response from Companies House API. Please check your connection.'
      );
    });

    it('should handle unknown errors', async () => {
      const error = new Error('Unknown error');

      mockAxiosInstance.get.mockImplementation(() => {
        try {
          return errorTransformer(error);
        } catch (e) {
          return Promise.reject(e);
        }
      });

      await expect(apiClient.company.searchCompanies({ query: 'test' })).rejects.toThrow(
        'Request error: Unknown error'
      );
    });
  });
});
