import type { Tool } from '@modelcontextprotocol/sdk/types.js';

export function getCompanyTools(): Tool[] {
  return [
    {
      name: 'search_companies',
      description: 'Search for companies by name or company number',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Company name or number to search for'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['query']
      }
    },
    {
      name: 'get_company_profile',
      description: 'Get detailed profile information for a specific company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_registered_office_address',
      description: 'Get the registered office address of a company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_registers',
      description: 'Get company registers information',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_insolvency',
      description: 'Get company insolvency information',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_exemptions',
      description: 'Get company exemptions information',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_uk_establishments',
      description: 'Get UK establishments of a foreign company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          }
        },
        required: ['company_number']
      }
    }
  ];
}

export function getSearchTools(): Tool[] {
  return [
    {
      name: 'advanced_company_search',
      description: 'Advanced search for companies with multiple filters',
      inputSchema: {
        type: 'object',
        properties: {
          company_name: {
            type: 'string',
            description: 'Company name to search for'
          },
          company_number: {
            type: 'string',
            description: 'Company number to search for'
          },
          company_status: {
            type: 'string',
            description: 'Company status (active, dissolved, etc.)'
          },
          company_type: {
            type: 'string',
            description: 'Company type'
          },
          company_subtype: {
            type: 'string',
            description: 'Company subtype'
          },
          dissolved_from: {
            type: 'string',
            description: 'Dissolved from date (YYYY-MM-DD)'
          },
          dissolved_to: {
            type: 'string',
            description: 'Dissolved to date (YYYY-MM-DD)'
          },
          incorporated_from: {
            type: 'string',
            description: 'Incorporated from date (YYYY-MM-DD)'
          },
          incorporated_to: {
            type: 'string',
            description: 'Incorporated to date (YYYY-MM-DD)'
          },
          sic_codes: {
            type: 'string',
            description: 'SIC codes (comma separated)'
          },
          location: {
            type: 'string',
            description: 'Location'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: []
      }
    },
    {
      name: 'search_all',
      description: 'Search across all resource types',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['query']
      }
    },
    {
      name: 'search_officers',
      description: 'Search for company officers',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Officer name to search for'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['query']
      }
    },
    {
      name: 'search_disqualified_officers',
      description: 'Search for disqualified officers',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Disqualified officer name to search for'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['query']
      }
    },
    {
      name: 'alphabetical_search',
      description: 'Search companies alphabetically by name prefix',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Company name prefix'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['query']
      }
    },
    {
      name: 'dissolved_search',
      description: 'Search for dissolved companies',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Dissolved company name to search for'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 20
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['query']
      }
    }
  ];
}

export function getOfficersTools(): Tool[] {
  return [
    {
      name: 'get_officers',
      description: 'Get list of officers for a specific company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 35
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          },
          register_type: {
            type: 'string',
            description: 'Type of register (directors, secretaries, llp-members)',
            enum: ['directors', 'secretaries', 'llp-members']
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_officer_appointment',
      description: 'Get details of a specific officer appointment',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          appointment_id: {
            type: 'string',
            description: 'The appointment ID'
          }
        },
        required: ['company_number', 'appointment_id']
      }
    },
    {
      name: 'get_corporate_officer_disqualification',
      description: 'Get disqualification details for a corporate officer',
      inputSchema: {
        type: 'object',
        properties: {
          officer_id: {
            type: 'string',
            description: 'The officer ID'
          }
        },
        required: ['officer_id']
      }
    },
    {
      name: 'get_natural_officer_disqualification',
      description: 'Get disqualification details for a natural officer',
      inputSchema: {
        type: 'object',
        properties: {
          officer_id: {
            type: 'string',
            description: 'The officer ID'
          }
        },
        required: ['officer_id']
      }
    },
    {
      name: 'get_officer_appointments_list',
      description: 'Get all appointments for a specific officer',
      inputSchema: {
        type: 'object',
        properties: {
          officer_id: {
            type: 'string',
            description: 'The officer ID'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-50)',
            default: 35
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['officer_id']
      }
    }
  ];
}

export function getFilingTools(): Tool[] {
  return [
    {
      name: 'get_filing_history',
      description: 'Get filing history for a specific company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 25
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          },
          category: {
            type: 'string',
            description: 'Category of filing history'
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_filing_history_item',
      description: 'Get details of a specific filing history item',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          transaction_id: {
            type: 'string',
            description: 'The transaction ID'
          }
        },
        required: ['company_number', 'transaction_id']
      }
    }
  ];
}

export function getChargesTools(): Tool[] {
  return [
    {
      name: 'get_charges',
      description: 'Get charges registered against a specific company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 25
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_charge_details',
      description: 'Get details of a specific charge',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          charge_id: {
            type: 'string',
            description: 'The charge ID'
          }
        },
        required: ['company_number', 'charge_id']
      }
    }
  ];
}

export function getPSCTools(): Tool[] {
  return [
    {
      name: 'get_persons_with_significant_control',
      description: 'Get persons with significant control for a specific company',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 25
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_psc_corporate_entity_beneficial_owner',
      description: 'Get corporate entity beneficial owner details',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_corporate_entity',
      description: 'Get corporate entity with significant control',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_individual_beneficial_owner',
      description: 'Get individual beneficial owner details',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_individual',
      description: 'Get individual person with significant control',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_individual_verification',
      description: 'Get individual PSC verification state',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_individual_full_record',
      description: 'Get individual PSC full record',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_legal_person_beneficial_owner',
      description: 'Get legal person beneficial owner details',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_legal_person',
      description: 'Get legal person with significant control',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          psc_id: {
            type: 'string',
            description: 'The PSC ID'
          }
        },
        required: ['company_number', 'psc_id']
      }
    },
    {
      name: 'get_psc_statement',
      description: 'Get PSC statement details',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          statement_id: {
            type: 'string',
            description: 'The statement ID'
          }
        },
        required: ['company_number', 'statement_id']
      }
    },
    {
      name: 'get_psc_statements_list',
      description: 'Get list of PSC statements',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          items_per_page: {
            type: 'number',
            description: 'Number of results per page (1-100)',
            default: 25
          },
          start_index: {
            type: 'number',
            description: 'Starting index for pagination',
            default: 0
          }
        },
        required: ['company_number']
      }
    },
    {
      name: 'get_psc_super_secure_beneficial_owner',
      description: 'Get super secure beneficial owner details',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          super_secure_id: {
            type: 'string',
            description: 'The super secure ID'
          }
        },
        required: ['company_number', 'super_secure_id']
      }
    },
    {
      name: 'get_psc_super_secure',
      description: 'Get super secure person with significant control',
      inputSchema: {
        type: 'object',
        properties: {
          company_number: {
            type: 'string',
            description: 'The company number'
          },
          super_secure_id: {
            type: 'string',
            description: 'The super secure ID'
          }
        },
        required: ['company_number', 'super_secure_id']
      }
    }
  ];
}

export function getAllTools(): Tool[] {
  return [
    ...getCompanyTools(),
    ...getSearchTools(),
    ...getOfficersTools(),
    ...getFilingTools(),
    ...getChargesTools(),
    ...getPSCTools()
  ];
}