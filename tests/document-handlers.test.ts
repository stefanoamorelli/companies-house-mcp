import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DocumentHandlers } from '../src/handlers/document-handlers';
import { CompaniesHouseApiClient } from '../src/api/client';

vi.mock('../src/api/client');

describe('DocumentHandlers', () => {
  let handlers: DocumentHandlers;
  let mockApiClient: Partial<CompaniesHouseApiClient>;

  beforeEach(() => {
    mockApiClient = {
      document: {
        getDocumentMetadata: vi.fn(),
        getDocumentContent: vi.fn(),
        testConnection: vi.fn()
      } as unknown as CompaniesHouseApiClient['document']
    } as Partial<CompaniesHouseApiClient>;
    handlers = new DocumentHandlers(mockApiClient as CompaniesHouseApiClient);
  });

  describe('handleGetDocumentMetadata', () => {
    it('should handle valid document metadata request', async () => {
      const mockMetadata = {
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

      (mockApiClient.document!.getDocumentMetadata as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockMetadata
      );

      const result = await handlers.handleGetDocumentMetadata({ document_id: 'doc123' });

      expect(mockApiClient.document!.getDocumentMetadata).toHaveBeenCalledWith({
        document_id: 'doc123'
      });
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(JSON.parse(result.content[0].text)).toEqual(mockMetadata);
    });

    it('should handle invalid parameters', async () => {
      await expect(handlers.handleGetDocumentMetadata({})).rejects.toThrow();
      await expect(handlers.handleGetDocumentMetadata({ document_id: '' })).rejects.toThrow();
    });

    it('should handle API errors', async () => {
      const error = new Error('Document not found');
      (mockApiClient.document!.getDocumentMetadata as ReturnType<typeof vi.fn>).mockRejectedValue(
        error
      );

      await expect(handlers.handleGetDocumentMetadata({ document_id: 'invalid' })).rejects.toThrow(
        'Document not found'
      );
    });
  });

  describe('handleGetDocumentContent', () => {
    it('should handle valid document content request', async () => {
      const mockBuffer = Buffer.from('PDF content', 'utf-8');
      (mockApiClient.document!.getDocumentContent as ReturnType<typeof vi.fn>).mockResolvedValue(
        mockBuffer
      );

      const result = await handlers.handleGetDocumentContent({ document_id: 'doc123' });

      expect(mockApiClient.document!.getDocumentContent).toHaveBeenCalledWith({
        document_id: 'doc123'
      });
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe('text');
      expect(result.content[0].text).toBe(
        'Document content retrieved (11 bytes). Content is binary PDF data.'
      );
    });

    it('should handle invalid parameters', async () => {
      await expect(handlers.handleGetDocumentContent({})).rejects.toThrow();
      await expect(handlers.handleGetDocumentContent({ document_id: '' })).rejects.toThrow();
    });

    it('should handle API errors', async () => {
      const error = new Error('Failed to retrieve document');
      (mockApiClient.document!.getDocumentContent as ReturnType<typeof vi.fn>).mockRejectedValue(
        error
      );

      await expect(handlers.handleGetDocumentContent({ document_id: 'invalid' })).rejects.toThrow(
        'Failed to retrieve document'
      );
    });

    it('should handle large documents', async () => {
      const largeBuffer = Buffer.alloc(1024 * 1024); // 1MB
      (mockApiClient.document!.getDocumentContent as ReturnType<typeof vi.fn>).mockResolvedValue(
        largeBuffer
      );

      const result = await handlers.handleGetDocumentContent({ document_id: 'large-doc' });

      expect(result.content[0].text).toBe(
        'Document content retrieved (1048576 bytes). Content is binary PDF data.'
      );
    });
  });
});
