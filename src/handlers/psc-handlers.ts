import { CompaniesHouseApiClient } from '../api/client.js';
import * as schemas from '../types/index.js';

export class PSCHandlers {
  constructor(private apiClient: CompaniesHouseApiClient) {}

  async handleGetPersonsWithSignificantControl(args: unknown) {
    const params = schemas.PersonsWithSignificantControlSchema.parse(args);
    const result = await this.apiClient.psc.getPersonsWithSignificantControl(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCCorporateEntityBeneficialOwner(args: unknown) {
    const params = schemas.PSCCorporateEntityBeneficialOwnerSchema.parse(args);
    const result = await this.apiClient.psc.getPSCCorporateEntityBeneficialOwner(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCCorporateEntity(args: unknown) {
    const params = schemas.PSCCorporateEntitySchema.parse(args);
    const result = await this.apiClient.psc.getPSCCorporateEntity(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCIndividualBeneficialOwner(args: unknown) {
    const params = schemas.PSCIndividualBeneficialOwnerSchema.parse(args);
    const result = await this.apiClient.psc.getPSCIndividualBeneficialOwner(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCIndividual(args: unknown) {
    const params = schemas.PSCIndividualSchema.parse(args);
    const result = await this.apiClient.psc.getPSCIndividual(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCIndividualVerification(args: unknown) {
    const params = schemas.PSCIndividualVerificationSchema.parse(args);
    const result = await this.apiClient.psc.getPSCIndividualVerification(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCIndividualFullRecord(args: unknown) {
    const params = schemas.PSCIndividualFullRecordSchema.parse(args);
    const result = await this.apiClient.psc.getPSCIndividualFullRecord(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCLegalPersonBeneficialOwner(args: unknown) {
    const params = schemas.PSCLegalPersonBeneficialOwnerSchema.parse(args);
    const result = await this.apiClient.psc.getPSCLegalPersonBeneficialOwner(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCLegalPerson(args: unknown) {
    const params = schemas.PSCLegalPersonSchema.parse(args);
    const result = await this.apiClient.psc.getPSCLegalPerson(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCStatement(args: unknown) {
    const params = schemas.PSCStatementSchema.parse(args);
    const result = await this.apiClient.psc.getPSCStatement(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCStatementsList(args: unknown) {
    const params = schemas.PSCStatementsListSchema.parse(args);
    const result = await this.apiClient.psc.getPSCStatementsList(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCSuperSecureBeneficialOwner(args: unknown) {
    const params = schemas.PSCSuperSecureBeneficialOwnerSchema.parse(args);
    const result = await this.apiClient.psc.getPSCSuperSecureBeneficialOwner(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }

  async handleGetPSCSuperSecure(args: unknown) {
    const params = schemas.PSCSuperSecureSchema.parse(args);
    const result = await this.apiClient.psc.getPSCSuperSecure(params);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  }
}
