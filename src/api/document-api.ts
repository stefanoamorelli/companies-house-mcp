import { BaseApiClient } from './base-client.js';
import type {
  DocumentMetadata,
  DocumentContent,
  DocumentMetadataResponse
} from '../types/document.js';

export class DocumentApiClient extends BaseApiClient {
  async getDocumentMetadata(params: DocumentMetadata): Promise<DocumentMetadataResponse> {
    const response = await this.client.get(`/document/${params.document_id}`);
    return response.data;
  }

  async getDocumentContent(params: DocumentContent): Promise<Buffer> {
    const response = await this.client.get(`/document/${params.document_id}/content`, {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf'
      }
    });
    return Buffer.from(response.data);
  }
}
