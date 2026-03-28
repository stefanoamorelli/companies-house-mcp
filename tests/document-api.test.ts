import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { DocumentApiClient } from '../src/api/document-api';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: 'OK',
    json: () => Promise.resolve(data),
    headers: new Headers()
  } as Response;
}

function arrayBufferResponse(buffer: ArrayBuffer, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: 'OK',
    arrayBuffer: () => Promise.resolve(buffer),
    headers: new Headers()
  } as Response;
}

describe('DocumentApiClient', () => {
  let apiClient: DocumentApiClient;

  beforeEach(() => {
    mockFetch.mockReset();
    apiClient = new DocumentApiClient('test-api-key');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getDocumentMetadata', () => {
    it('should fetch document metadata', async () => {
      const mockData = {
        company_number: '12345678',
        barcode: 'ABC123',
        category: 'accounts',
        pages: 10,
        filename: 'document.pdf',
        links: {
          self: '/document/doc123',
          document: '/document/doc123/content'
        }
      };

      mockFetch.mockResolvedValue(jsonResponse(mockData));

      const result = await apiClient.getDocumentMetadata({
        document_id: 'doc123'
      });

      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toContain('/document/doc123');
      expect(options.headers.Accept).toBe('application/json');
      expect(options.headers.Authorization).toBe(
        'Basic ' + Buffer.from('test-api-key:').toString('base64')
      );
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching metadata', async () => {
      mockFetch.mockRejectedValue(new Error('API Error'));

      await expect(apiClient.getDocumentMetadata({ document_id: 'doc123' })).rejects.toThrow(
        'API Error'
      );
    });
  });

  describe('getDocumentContent', () => {
    it('should fetch document content as buffer', async () => {
      const mockPdfData = new ArrayBuffer(1024);
      mockFetch.mockResolvedValue(arrayBufferResponse(mockPdfData));

      const result = await apiClient.getDocumentContent({
        document_id: 'doc123'
      });

      const [url, options] = mockFetch.mock.calls[0];
      expect(url).toContain('/document/doc123/content');
      expect(options.headers.Accept).toBe('application/pdf');
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBe(1024);
    });

    it('should handle errors when fetching content', async () => {
      mockFetch.mockRejectedValue(new Error('Failed to fetch document'));

      await expect(apiClient.getDocumentContent({ document_id: 'doc123' })).rejects.toThrow(
        'Failed to fetch document'
      );
    });
  });
});
