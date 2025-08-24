import { BaseApiClient } from './base-client.js';
import type {
  PSCCorporateEntityBeneficialOwner,
  PSCCorporateEntity,
  PSCIndividualBeneficialOwner,
  PSCIndividual,
  PSCIndividualVerification,
  PSCIndividualFullRecord,
  PSCLegalPersonBeneficialOwner,
  PSCLegalPerson,
  PSCStatement,
  PSCStatementsList,
  PSCSuperSecureBeneficialOwner,
  PSCSuperSecure,
  PSCListResponse,
  PSCIndividualRecord,
  PSCCorporateEntityRecord,
  PSCLegalPersonRecord,
  PSCStatementRecord,
  PSCStatementsListResponse,
  PSCSuperSecureRecord,
  PSCVerificationDetails
} from '../types/index.js';

export class PSCApiClient extends BaseApiClient {
  async getPersonsWithSignificantControl(params: {
    company_number: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<PSCListResponse> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control`,
      {
        params: {
          items_per_page: params.items_per_page,
          start_index: params.start_index
        }
      }
    );
    return response.data;
  }

  async getPSCCorporateEntityBeneficialOwner(
    params: PSCCorporateEntityBeneficialOwner
  ): Promise<PSCCorporateEntityRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/corporate-entity-beneficial-owner/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCCorporateEntity(params: PSCCorporateEntity): Promise<PSCCorporateEntityRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/corporate-entity/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCIndividualBeneficialOwner(params: PSCIndividualBeneficialOwner): Promise<PSCIndividualRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual-beneficial-owner/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCIndividual(params: PSCIndividual): Promise<PSCIndividualRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCIndividualVerification(params: PSCIndividualVerification): Promise<PSCVerificationDetails> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual/${params.psc_id}/verification-state`
    );
    return response.data;
  }

  async getPSCIndividualFullRecord(params: PSCIndividualFullRecord): Promise<PSCIndividualRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual/${params.psc_id}/full_record`
    );
    return response.data;
  }

  async getPSCLegalPersonBeneficialOwner(params: PSCLegalPersonBeneficialOwner): Promise<PSCLegalPersonRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/legal-person-beneficial-owner/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCLegalPerson(params: PSCLegalPerson): Promise<PSCLegalPersonRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/legal-person/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCStatement(params: PSCStatement): Promise<PSCStatementRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control-statements/${params.statement_id}`
    );
    return response.data;
  }

  async getPSCStatementsList(params: PSCStatementsList): Promise<PSCStatementsListResponse> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control-statements`,
      {
        params: {
          items_per_page: params.items_per_page,
          start_index: params.start_index
        }
      }
    );
    return response.data;
  }

  async getPSCSuperSecureBeneficialOwner(params: PSCSuperSecureBeneficialOwner): Promise<PSCSuperSecureRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/super-secure-beneficial-owner/${params.super_secure_id}`
    );
    return response.data;
  }

  async getPSCSuperSecure(params: PSCSuperSecure): Promise<PSCSuperSecureRecord> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/super-secure/${params.super_secure_id}`
    );
    return response.data;
  }
}