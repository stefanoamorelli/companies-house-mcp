import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/document.js';

export class DocumentHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleGetDocumentMetadata(args: unknown) {
    const params = schemas.DocumentMetadataSchema.parse(args);
    const result = await this.apiClient.document.getDocumentMetadata(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetDocumentContent(args: unknown) {
    const params = schemas.DocumentContentSchema.parse(args);
    const result = await this.apiClient.document.getDocumentContent(params);
    return {
      content: [
        {
          type: 'text',
          text: `Document content retrieved (${result.length} bytes). Content is binary PDF data.`
        }
      ]
    };
  }
}
