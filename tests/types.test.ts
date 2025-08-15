import { describe, it, expect } from 'vitest';
import {
  CompanySearchSchema,
  CompanyProfileSchema,
  OfficersSchema,
  FilingHistorySchema,
  PersonsWithSignificantControlSchema,
  ChargesSchema
} from '../src/types';

describe('Type Schemas', () => {
  describe('CompanySearchSchema', () => {
    it('should validate valid search parameters', () => {
      const valid = {
        query: 'test company',
        items_per_page: 50,
        start_index: 10
      };

      const result = CompanySearchSchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should validate with only required fields', () => {
      const valid = { query: 'test' };
      const result = CompanySearchSchema.parse(valid);
      expect(result.query).toBe('test');
    });

    it('should apply default values for optional fields', () => {
      const input = { query: 'test' };
      const result = CompanySearchSchema.parse(input);
      expect(result.query).toBe('test');
      expect(result.items_per_page).toBeUndefined();
      expect(result.start_index).toBeUndefined();
    });

    it('should reject empty query', () => {
      expect(() => CompanySearchSchema.parse({ query: '' }))
        .toThrow();
    });

    it('should reject invalid items_per_page', () => {
      expect(() => CompanySearchSchema.parse({ 
        query: 'test', 
        items_per_page: 0 
      })).toThrow();

      expect(() => CompanySearchSchema.parse({ 
        query: 'test', 
        items_per_page: 101 
      })).toThrow();
    });

    it('should reject negative start_index', () => {
      expect(() => CompanySearchSchema.parse({ 
        query: 'test', 
        start_index: -1 
      })).toThrow();
    });
  });

  describe('CompanyProfileSchema', () => {
    it('should validate valid company number', () => {
      const valid = { company_number: '12345678' };
      const result = CompanyProfileSchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should reject empty company number', () => {
      expect(() => CompanyProfileSchema.parse({ company_number: '' }))
        .toThrow();
    });

    it('should reject missing company number', () => {
      expect(() => CompanyProfileSchema.parse({}))
        .toThrow();
    });
  });

  describe('OfficersSchema', () => {
    it('should validate with all fields', () => {
      const valid = {
        company_number: '12345678',
        items_per_page: 50,
        start_index: 10,
        register_type: 'directors' as const
      };

      const result = OfficersSchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should validate with only required fields', () => {
      const valid = { company_number: '12345678' };
      const result = OfficersSchema.parse(valid);
      expect(result.company_number).toBe('12345678');
    });

    it('should validate register_type enum values', () => {
      const validTypes = ['directors', 'secretaries', 'llp-members'];
      
      validTypes.forEach(type => {
        const result = OfficersSchema.parse({
          company_number: '12345678',
          register_type: type
        });
        expect(result.register_type).toBe(type);
      });
    });

    it('should reject invalid register_type', () => {
      expect(() => OfficersSchema.parse({
        company_number: '12345678',
        register_type: 'invalid'
      })).toThrow();
    });
  });

  describe('FilingHistorySchema', () => {
    it('should validate with all fields', () => {
      const valid = {
        company_number: '12345678',
        items_per_page: 30,
        start_index: 5,
        category: 'accounts'
      };

      const result = FilingHistorySchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should validate with only required fields', () => {
      const valid = { company_number: '12345678' };
      const result = FilingHistorySchema.parse(valid);
      expect(result.company_number).toBe('12345678');
    });

    it('should accept any string for category', () => {
      const valid = {
        company_number: '12345678',
        category: 'custom-category'
      };

      const result = FilingHistorySchema.parse(valid);
      expect(result.category).toBe('custom-category');
    });
  });

  describe('PersonsWithSignificantControlSchema', () => {
    it('should validate with all fields', () => {
      const valid = {
        company_number: '12345678',
        items_per_page: 20,
        start_index: 5
      };

      const result = PersonsWithSignificantControlSchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should validate with only required fields', () => {
      const valid = { company_number: '12345678' };
      const result = PersonsWithSignificantControlSchema.parse(valid);
      expect(result.company_number).toBe('12345678');
    });

    it('should enforce pagination limits', () => {
      expect(() => PersonsWithSignificantControlSchema.parse({
        company_number: '12345678',
        items_per_page: 101
      })).toThrow();
    });
  });

  describe('ChargesSchema', () => {
    it('should validate with all fields', () => {
      const valid = {
        company_number: '12345678',
        items_per_page: 25,
        start_index: 10
      };

      const result = ChargesSchema.parse(valid);
      expect(result).toEqual(valid);
    });

    it('should validate with only required fields', () => {
      const valid = { company_number: '12345678' };
      const result = ChargesSchema.parse(valid);
      expect(result.company_number).toBe('12345678');
    });

    it('should enforce pagination limits', () => {
      expect(() => ChargesSchema.parse({
        company_number: '12345678',
        items_per_page: 0
      })).toThrow();

      expect(() => ChargesSchema.parse({
        company_number: '12345678',
        items_per_page: 101
      })).toThrow();
    });
  });
});