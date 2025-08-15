# Companies House MCP Server

Access UK company data through the Companies House API directly in MCP clients.

## What it does

This [MCP](https://modelcontextprotocol.io) server lets you search and retrieve information about UK companies, including:
- Company details and registration info
- Directors and officers
- Filing history
- Persons with significant control (PSC)
- Registered charges

## Setup

### Get an API key

1. Register at [Companies House Developer Hub](https://developer.company-information.service.gov.uk/)
2. Create an application to get your API key

### Install

```bash
npm install
npm run build
```

### Configure

Create a `.env` file:
```env
COMPANIES_HOUSE_API_KEY=your_api_key_here
```

### Add to Claude Desktop

Add to your [Claude Desktop](https://claude.ai/download) config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac):

```json
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
Search for companies by name or number.

```json
{
  "query": "OpenAI",
  "items_per_page": 20,
  "start_index": 0
}
```

### get_company_profile
Get detailed company information.

```json
{
  "company_number": "13448796"
}
```

### get_officers
List company directors and officers.

```json
{
  "company_number": "13448796",
  "register_type": "directors"
}
```

### get_filing_history
View company filing history.

```json
{
  "company_number": "13448796",
  "category": "accounts"
}
```

### get_persons_with_significant_control
Get PSC information.

```json
{
  "company_number": "13448796"
}
```

### get_charges
View registered charges.

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

## Security

See [SECURITY.md](SECURITY.md) for our security policy.

## Copyright

Copyright 2025 Stefano Amorelli (https://amorelli.tech)