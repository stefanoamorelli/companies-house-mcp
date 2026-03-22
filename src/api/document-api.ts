import type {
  DocumentMetadata,
  DocumentContent,
  DocumentMetadataResponse
} from '../types/document.js';

export class DocumentApiClient {
  private baseURL: string;
  private authHeader: string;

  constructor(apiKey: string) {
    this.baseURL = 'https://document-api.company-information.service.gov.uk';
    this.authHeader =
      'Basic ' + Buffer.from(apiKey + ':').toString('base64');
  }

  async getDocumentMetadata(params: DocumentMetadata): Promise<DocumentMetadataResponse> {
    const documentId = this.extractDocumentId(params.document_id);
    const url = `${this.baseURL}/document/${documentId}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: this.authHeader,
      },
    });

    if (!response.ok) {
      throw new Error(`API error (${response.status}): ${response.statusText}`);
    }

    return (await response.json()) as DocumentMetadataResponse;
  }

  async getDocumentContent(params: DocumentContent): Promise<Buffer> {
    const documentId = this.extractDocumentId(params.document_id);
    const url = `${this.baseURL}/document/${documentId}/content`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/pdf',
        Authorization: this.authHeader,
      },
    });

    if (!response.ok) {
      throw new Error(`API error (${response.status}): ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  private extractDocumentId(input: string): string {
    if (input.startsWith('https://document-api.company-information.service.gov.uk/document/')) {
      return input.replace('https://document-api.company-information.service.gov.uk/document/', '');
    }
    return input;
  }
}
