# Companies House MCP Server

Access UK company data through the [Companies House API](https://developer.company-information.service.gov.uk/api/docs/) directly in [MCP clients](https://modelcontextprotocol.io/clients).

## What it does

This [MCP](https://modelcontextprotocol.io) server lets you search and retrieve information about UK companies, including:
- [Company profile](https://developer.company-information.service.gov.uk/api/docs/company/company_number/readCompanyProfile.html) - registration info, status, and key dates
- [Directors and officers](https://developer.company-information.service.gov.uk/api/docs/company/company_number/officers/officerList.html) - current and past company officials
- [Filing history](https://developer.company-information.service.gov.uk/api/docs/company/company_number/filing-history/getFilingHistoryList.html) - accounts, annual returns, and other documents
- [Persons with significant control (PSC)](https://developer.company-information.service.gov.uk/api/docs/company/company_number/persons-with-significant-control/listPersonsWithSignificantControl.html) - beneficial ownership information
- [Registered charges](https://developer.company-information.service.gov.uk/api/docs/company/company_number/charges/getChargeList.html) - mortgages and debentures

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

### search_companies
**Tool:** `search_companies`  
**API Endpoint:** `GET /search/companies`  
**Documentation:** [Company Search API](https://developer.company-information.service.gov.uk/api/docs/search/companies/companysearch.html)

Example queries:
- "Find companies named Tesla"
- "Search for company number 12345678"
- "Look up British Airways companies"

```json
{
  "query": "OpenAI",
  "items_per_page": 20,
  "start_index": 0
}
```

### get_company_profile
**Tool:** `get_company_profile`  
**API Endpoint:** `GET /company/{company_number}`  
**Documentation:** [Company Profile API](https://developer.company-information.service.gov.uk/api/docs/company/company_number/readCompanyProfile.html)

Example queries:
- "Get details for company 13448796"
- "Show me the profile of OpenAI UK Limited"
- "What's the status of company number 00000001?"

```json
{
  "company_number": "13448796"
}
```

### get_officers
**Tool:** `get_officers`  
**API Endpoint:** `GET /company/{company_number}/officers`  
**Documentation:** [Officers API](https://developer.company-information.service.gov.uk/api/docs/company/company_number/officers/officerList.html)

Example queries:
- "Who are the directors of company 13448796?"
- "List all officers for Tesla UK"
- "Show me the company secretaries"

```json
{
  "company_number": "13448796",
  "register_type": "directors"
}
```

### get_filing_history
**Tool:** `get_filing_history`  
**API Endpoint:** `GET /company/{company_number}/filing-history`  
**Documentation:** [Filing History API](https://developer.company-information.service.gov.uk/api/docs/company/company_number/filing-history/getFilingHistoryList.html)

Example queries:
- "Show recent filings for company 13448796"
- "What accounts has this company filed?"
- "Get the annual returns history"

```json
{
  "company_number": "13448796",
  "category": "accounts"
}
```

### get_persons_with_significant_control
**Tool:** `get_persons_with_significant_control`  
**API Endpoint:** `GET /company/{company_number}/persons-with-significant-control`  
**Documentation:** [PSC API](https://developer.company-information.service.gov.uk/api/docs/company/company_number/persons-with-significant-control/listPersonsWithSignificantControl.html)

Example queries:
- "Who owns more than 25% of company 13448796?"
- "Show beneficial owners"
- "List persons with significant control"

```json
{
  "company_number": "13448796"
}
```

### get_charges
**Tool:** `get_charges`  
**API Endpoint:** `GET /company/{company_number}/charges`  
**Documentation:** [Charges API](https://developer.company-information.service.gov.uk/api/docs/company/company_number/charges/getChargeList.html)

Example queries:
- "Does company 13448796 have any mortgages?"
- "Show registered charges"
- "List all debentures for this company"

```json
{
  "company_number": "13448796"
}
```

## Development

```bash
# Run tests
npm test

# Type checking
npm run typecheck

# Build
npm run build
```

## License

GNU Affero General Public License v3.0 - see [LICENSE](LICENSE) file for details.

For commercial licensing options, contact: stefano@amorelli.tech

© 2025 Stefano Amorelli (https://amorelli.tech)