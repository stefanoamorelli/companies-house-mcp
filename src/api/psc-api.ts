import { BaseApiClient } from './base-client.js';
import type {
  PersonsWithSignificantControl,
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
  PSCSuperSecure
} from '../types/index.js';

export class PSCApiClient extends BaseApiClient {
  async getPersonsWithSignificantControl(params: {
    company_number: string;
    items_per_page?: number;
    start_index?: number;
  }): Promise<PersonsWithSignificantControl> {
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
  ): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/corporate-entity-beneficial-owner/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCCorporateEntity(params: PSCCorporateEntity): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/corporate-entity/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCIndividualBeneficialOwner(params: PSCIndividualBeneficialOwner): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual-beneficial-owner/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCIndividual(params: PSCIndividual): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCIndividualVerification(params: PSCIndividualVerification): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual/${params.psc_id}/verification-state`
    );
    return response.data;
  }

  async getPSCIndividualFullRecord(params: PSCIndividualFullRecord): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/individual/${params.psc_id}/full_record`
    );
    return response.data;
  }

  async getPSCLegalPersonBeneficialOwner(params: PSCLegalPersonBeneficialOwner): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/legal-person-beneficial-owner/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCLegalPerson(params: PSCLegalPerson): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/legal-person/${params.psc_id}`
    );
    return response.data;
  }

  async getPSCStatement(params: PSCStatement): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control-statements/${params.statement_id}`
    );
    return response.data;
  }

  async getPSCStatementsList(params: PSCStatementsList): Promise<any> {
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

  async getPSCSuperSecureBeneficialOwner(params: PSCSuperSecureBeneficialOwner): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/super-secure-beneficial-owner/${params.super_secure_id}`
    );
    return response.data;
  }

  async getPSCSuperSecure(params: PSCSuperSecure): Promise<any> {
    const response = await this.client.get(
      `/company/${params.company_number}/persons-with-significant-control/super-secure/${params.super_secure_id}`
    );
    return response.data;
  }
}
