import axios, { AxiosInstance } from 'axios';
import type {
  DocumentMetadata,
  DocumentContent,
  DocumentMetadataResponse
} from '../types/document.js';

export class DocumentApiClient {
  private documentClient: AxiosInstance;

  constructor(apiKey: string) {
    this.documentClient = axios.create({
      baseURL: 'https://document-api.company-information.service.gov.uk',
      auth: {
        username: apiKey,
        password: ''
      },
      timeout: 30000
    });
  }

  async getDocumentMetadata(params: DocumentMetadata): Promise<DocumentMetadataResponse> {
    const documentId = this.extractDocumentId(params.document_id);
    const response = await this.documentClient.get(`/document/${documentId}`, {
      headers: {
        Accept: 'application/json'
      }
    });
    return response.data;
  }

  async getDocumentContent(params: DocumentContent): Promise<Buffer> {
    const documentId = this.extractDocumentId(params.document_id);
    const response = await this.documentClient.get(`/document/${documentId}/content`, {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf'
      }
    });
    return Buffer.from(response.data);
  }

  private extractDocumentId(input: string): string {
    if (input.startsWith('https://document-api.company-information.service.gov.uk/document/')) {
      return input.replace('https://document-api.company-information.service.gov.uk/document/', '');
    }
    return input;
  }
}
