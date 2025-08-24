import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import { DocumentApiClient } from '../src/api/document-api';

vi.mock('axios');

describe('DocumentApiClient', () => {
  let apiClient: DocumentApiClient;
  let mockAxiosInstance: Partial<AxiosInstance>;

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
      interceptors: {
        response: {
          use: vi.fn()
        }
      }
    };

    (axios.create as ReturnType<typeof vi.fn>).mockReturnValue(mockAxiosInstance as AxiosInstance);

    apiClient = new DocumentApiClient({
      apiKey: 'test-api-key'
    });
  });

  describe('getDocumentMetadata', () => {
    it('should fetch document metadata', async () => {
      const mockResponse = {
        data: {
          company_number: '12345678',
          barcode: 'ABC123',
          category: 'accounts',
          pages: 10,
          filename: 'document.pdf',
          links: {
            self: '/document/doc123',
            document: '/document/doc123/content'
          }
        }
      };

      (mockAxiosInstance.get as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const result = await apiClient.getDocumentMetadata({ document_id: 'doc123' });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/document/doc123');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors when fetching metadata', async () => {
      const error = new Error('API Error');
      (mockAxiosInstance.get as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      await expect(apiClient.getDocumentMetadata({ document_id: 'doc123' })).rejects.toThrow(
        'API Error'
      );
    });
  });

  describe('getDocumentContent', () => {
    it('should fetch document content as buffer', async () => {
      const mockPdfData = new ArrayBuffer(1024);
      const mockResponse = {
        data: mockPdfData
      };

      (mockAxiosInstance.get as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

      const result = await apiClient.getDocumentContent({ document_id: 'doc123' });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/document/doc123/content', {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf'
        }
      });
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBe(1024);
    });

    it('should handle errors when fetching content', async () => {
      const error = new Error('Failed to fetch document');
      (mockAxiosInstance.get as ReturnType<typeof vi.fn>).mockRejectedValue(error);

      await expect(apiClient.getDocumentContent({ document_id: 'doc123' })).rejects.toThrow(
        'Failed to fetch document'
      );
    });
  });
});
