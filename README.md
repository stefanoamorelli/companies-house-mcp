# Companies House MCP Server

![Companies House MCP Server - Demo](https://github.com/user-attachments/assets/652267a6-9378-4edb-92fb-6be1b90122ec)


Access UK company data through the [Companies House API](https://developer.company-information.service.gov.uk/api/docs/) directly in [MCP clients](https://modelcontextprotocol.io/clients).

## What it does

This [MCP](https://modelcontextprotocol.io) server provides comprehensive access to UK company information through 45+ endpoints, including:

### Company Information
- [Company profile](https://developer.company-information.service.gov.uk/api/docs/company/company_number/readCompanyProfile.html) - registration info, status, and key dates
- [Registered office address](https://developer.company-information.service.gov.uk/api/docs/company/company_number/registered-office-address/readRegisteredOfficeAddress.html) - official company address
- [Company registers](https://developer.company-information.service.gov.uk/api/docs/company/company_number/registers/readCompanyRegister.html) - available registers
- [Insolvency information](https://developer.company-information.service.gov.uk/api/docs/company/company_number/insolvency/readCompanyInsolvency.html) - insolvency status and proceedings
- [Exemptions](https://developer.company-information.service.gov.uk/api/docs/company/company_number/exemptions/readCompanyExemptions.html) - disclosure exemptions
- [UK establishments](https://developer.company-information.service.gov.uk/api/docs/company/company_number/uk-establishments/readUKEstablishments.html) - UK branches of foreign companies

### Search Capabilities
- Company search - basic and advanced search with multiple filters
- Search all - unified search across all resource types
- Officer search - find company officers by name
- Disqualified officers search - search disqualified directors
- Alphabetical search - companies by name prefix
- Dissolved companies search - find dissolved companies

### Officers & Appointments
- [Directors and officers](https://developer.company-information.service.gov.uk/api/docs/company/company_number/officers/officerList.html) - current and past company officials
- Individual officer appointments - specific appointment details
- Officer appointment history - all appointments for an officer
- Officer disqualifications - corporate and natural person disqualifications

### Filing & Documents
- [Filing history](https://developer.company-information.service.gov.uk/api/docs/company/company_number/filing-history/getFilingHistoryList.html) - accounts, annual returns, and other documents
- Individual filing items - specific document details

### Ownership & Control
- [Persons with significant control (PSC)](https://developer.company-information.service.gov.uk/api/docs/company/company_number/persons-with-significant-control/listPersonsWithSignificantControl.html) - beneficial ownership
- PSC individuals, corporate entities, and legal persons - detailed PSC information
- PSC statements - notifications and declarations
- PSC verification states and full records

### Financial
- [Registered charges](https://developer.company-information.service.gov.uk/api/docs/company/company_number/charges/getChargeList.html) - mortgages and debentures
- Individual charge details - specific charge information

## Setup

### Get an API key

1. Register at [Companies House Developer Hub](https://developer.company-information.service.gov.uk/)
2. Create an application to get your API key

### Install

The server is available on npm and can be run directly using npx:

```bash
npm install -g companies-house-mcp-server
```

Or use it directly with npx (recommended):

```bash
npx companies-house-mcp-server
```

### Configure Claude Desktop

Add to your [Claude Desktop](https://claude.ai/download) config:

**Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "companies-house": {
      "command": "npx",
      "args": ["-y", "companies-house-mcp-server"],
      "env": {
        "COMPANIES_HOUSE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Build from source (optional)

If you want to build from source:

```bash
git clone https://github.com/stefanoamorelli/companies-house-mcp.git
cd companies-house-mcp
npm install
npm run build

# Then use in Claude Desktop config:
{
  "mcpServers": {
    "companies-house": {
      "command": "node",
      "args": ["/absolute/path/to/companies-house-mcp/dist/index.js"],
      "env": {
        "COMPANIES_HOUSE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### Company Information Tools

#### search_companies
Search for companies by name or company number
```json
{
  "query": "OpenAI",
  "items_per_page": 20,
  "start_index": 0
}
```

#### get_company_profile
Get detailed company information
```json
{
  "company_number": "13448796"
}
```

#### get_registered_office_address
Get the registered office address
```json
{
  "company_number": "13448796"
}
```

#### get_registers
Get information about company registers
```json
{
  "company_number": "13448796"
}
```

#### get_insolvency
Get company insolvency information
```json
{
  "company_number": "13448796"
}
```

#### get_exemptions
Get company exemptions
```json
{
  "company_number": "13448796"
}
```

#### get_uk_establishments
Get UK establishments of a foreign company
```json
{
  "company_number": "FC123456"
}
```

### Search Tools

#### advanced_company_search
Advanced search with multiple filters
```json
{
  "company_name": "Tech",
  "company_status": "active",
  "incorporated_from": "2020-01-01",
  "incorporated_to": "2024-12-31",
  "items_per_page": 20
}
```

#### search_all
Search across all resource types
```json
{
  "query": "technology",
  "items_per_page": 20
}
```

#### search_officers
Search for company officers
```json
{
  "query": "John Smith",
  "items_per_page": 20
}
```

#### search_disqualified_officers
Search for disqualified officers
```json
{
  "query": "Smith",
  "items_per_page": 20
}
```

#### alphabetical_search
Search companies alphabetically
```json
{
  "query": "AAA",
  "items_per_page": 20
}
```

#### dissolved_search
Search dissolved companies
```json
{
  "query": "Old Company",
  "items_per_page": 20
}
```

### Officers Tools

#### get_officers
Get list of company officers
```json
{
  "company_number": "13448796",
  "register_type": "directors",
  "items_per_page": 35
}
```

#### get_officer_appointment
Get specific officer appointment details
```json
{
  "company_number": "13448796",
  "appointment_id": "AbCdEfGh"
}
```

#### get_officer_appointments_list
Get all appointments for an officer
```json
{
  "officer_id": "OFFICER123",
  "items_per_page": 35
}
```

#### get_corporate_officer_disqualification
Get corporate officer disqualification details
```json
{
  "officer_id": "CORP123"
}
```

#### get_natural_officer_disqualification
Get natural person disqualification details
```json
{
  "officer_id": "PERSON123"
}
```

### Filing History Tools

#### get_filing_history
Get company filing history
```json
{
  "company_number": "13448796",
  "category": "accounts",
  "items_per_page": 25
}
```

#### get_filing_history_item
Get specific filing details
```json
{
  "company_number": "13448796",
  "transaction_id": "MzM4NTY3"
}
```

### Charges Tools

#### get_charges
Get list of company charges
```json
{
  "company_number": "13448796",
  "items_per_page": 25
}
```

#### get_charge_details
Get specific charge details
```json
{
  "company_number": "13448796",
  "charge_id": "CHARGE123"
}
```

### Persons with Significant Control Tools

#### get_persons_with_significant_control
Get list of PSCs
```json
{
  "company_number": "13448796",
  "items_per_page": 25
}
```

#### get_psc_individual
Get individual PSC details
```json
{
  "company_number": "13448796",
  "psc_id": "PSC123"
}
```

#### get_psc_corporate_entity
Get corporate entity PSC details
```json
{
  "company_number": "13448796",
  "psc_id": "CORP-PSC123"
}
```

#### get_psc_legal_person
Get legal person PSC details
```json
{
  "company_number": "13448796",
  "psc_id": "LEGAL-PSC123"
}
```

#### get_psc_statements_list
Get PSC statements
```json
{
  "company_number": "13448796",
  "items_per_page": 25
}
```

#### get_psc_statement
Get specific PSC statement
```json
{
  "company_number": "13448796",
  "statement_id": "STMT123"
}
```

Additional PSC tools available:
- `get_psc_individual_beneficial_owner`
- `get_psc_individual_verification`
- `get_psc_individual_full_record`
- `get_psc_corporate_entity_beneficial_owner`
- `get_psc_legal_person_beneficial_owner`
- `get_psc_super_secure`
- `get_psc_super_secure_beneficial_owner`

## Architecture

The codebase follows a modular architecture for maintainability and scalability:

```
src/
├── api/                 # API client modules
│   ├── base-client.ts   # Base HTTP client with auth
│   ├── company-api.ts   # Company endpoints
│   ├── search-api.ts    # Search endpoints
│   ├── officers-api.ts  # Officers endpoints
│   ├── filing-api.ts    # Filing history endpoints
│   ├── charges-api.ts   # Charges endpoints
│   ├── psc-api.ts       # PSC endpoints
│   └── client.ts        # Main API client aggregator
├── handlers/            # MCP request handlers
│   ├── company-handlers.ts
│   ├── search-handlers.ts
│   ├── officers-handlers.ts
│   ├── filing-handlers.ts
│   ├── charges-handlers.ts
│   └── psc-handlers.ts
├── tools/               # Tool definitions
│   └── tools-definition.ts
├── types/               # TypeScript types & schemas
│   ├── company.ts
│   ├── search.ts
│   ├── officers.ts
│   ├── filing.ts
│   ├── charges.ts
│   ├── psc.ts
│   └── index.ts
└── mcp-server.ts        # Main MCP server
```

## Development

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build
npm run build

# Run locally
npm run dev
```

## API Rate Limits

The Companies House API has rate limits:
- 600 requests per 5 minutes per API key
- Some endpoints may have additional restrictions

## License

GNU Affero General Public License v3.0 - see [LICENSE](LICENSE) file for details.

For commercial licensing options, contact: stefano@amorelli.tech

© 2025 Stefano Amorelli (https://amorelli.tech)
