import { describe, it, expect } from 'vitest';
import {
  DocumentMetadataSchema,
  DocumentContentSchema,
  DocumentMetadataResponseSchema
} from '../src/types/document';

describe('Document Types', () => {
  describe('DocumentMetadataSchema', () => {
    it('should validate valid document metadata request', () => {
      const validInput = { document_id: 'doc123' };
      const result = DocumentMetadataSchema.parse(validInput);
      expect(result).toEqual(validInput);
    });

    it('should reject empty document_id', () => {
      expect(() => DocumentMetadataSchema.parse({ document_id: '' })).toThrow();
    });

    it('should reject missing document_id', () => {
      expect(() => DocumentMetadataSchema.parse({})).toThrow();
    });

    it('should reject invalid types', () => {
      expect(() => DocumentMetadataSchema.parse({ document_id: 123 })).toThrow();
      expect(() => DocumentMetadataSchema.parse({ document_id: null })).toThrow();
    });
  });

  describe('DocumentContentSchema', () => {
    it('should validate valid document content request', () => {
      const validInput = { document_id: 'doc456' };
      const result = DocumentContentSchema.parse(validInput);
      expect(result).toEqual(validInput);
    });

    it('should reject empty document_id', () => {
      expect(() => DocumentContentSchema.parse({ document_id: '' })).toThrow();
    });

    it('should reject missing document_id', () => {
      expect(() => DocumentContentSchema.parse({})).toThrow();
    });
  });

  describe('DocumentMetadataResponseSchema', () => {
    it('should validate complete metadata response', () => {
      const response = {
        company_number: '12345678',
        barcode: 'ABC123',
        significant_date: '2024-01-01',
        significant_date_type: 'made-up-date',
        category: 'accounts',
        pages: 10,
        filename: 'document.pdf',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        etag: 'abc123def456',
        links: {
          self: '/document/doc123',
          document: '/document/doc123/content'
        },
        resources: {
          application_pdf: {
            content_length: 102400,
            content_type: 'application/pdf',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
          }
        }
      };

      const result = DocumentMetadataResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should validate minimal metadata response', () => {
      const response = {};
      const result = DocumentMetadataResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should validate partial metadata response', () => {
      const response = {
        company_number: '12345678',
        category: 'accounts',
        pages: 5
      };

      const result = DocumentMetadataResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should validate response with links only', () => {
      const response = {
        links: {
          self: '/document/doc123'
        }
      };

      const result = DocumentMetadataResponseSchema.parse(response);
      expect(result).toEqual(response);
    });

    it('should validate response with resources', () => {
      const response = {
        resources: {
          application_pdf: {
            content_length: 1024,
            content_type: 'application/pdf'
          },
          application_xhtml_xml: {
            content_length: 2048,
            content_type: 'application/xhtml+xml'
          }
        }
      };

      const result = DocumentMetadataResponseSchema.parse(response);
      expect(result).toEqual(response);
    });
  });
});
