# Companies House MCP Server

![Companies House MCP Server - Demo](https://github.com/user-attachments/assets/652267a6-9378-4edb-92fb-6be1b90122ec)

Access UK company data through the [Companies House API](https://developer.company-information.service.gov.uk/api/docs/) directly in [MCP clients](https://modelcontextprotocol.io/clients).

## Features

45+ tools covering the full Companies House API:

- **Company info** — profile, registered address, registers, insolvency, exemptions, UK establishments
- **Search** — companies (basic & advanced), officers, disqualified officers, dissolved companies, alphabetical
- **Officers** — directors list, appointments, disqualifications
- **Filing history** — accounts, annual returns, document details
- **PSC (ownership)** — individuals, corporate entities, legal persons, statements, verification
- **Charges** — mortgages, debentures, charge details

## Setup

### 1. Get an API key

Register at the [Companies House Developer Hub](https://developer.company-information.service.gov.uk/) and create an application.

### 2. Configure your MCP client

Add to your [Claude Desktop](https://claude.ai/download) config (`~/Library/Application Support/Claude/claude_desktop_config.json` on Mac, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

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

```bash
git clone https://github.com/stefanoamorelli/companies-house-mcp.git
cd companies-house-mcp
npm install && npm run build
```

Then point your MCP client to `node /path/to/companies-house-mcp/dist/index.js`.

## Development

```bash
npm test            # Run tests
npm run typecheck   # Type checking
npm run lint        # Linting
npm run build       # Build
npm run dev         # Run locally
```

## API Rate Limits

600 requests per 5 minutes per API key. Some endpoints may have additional restrictions.

## License

GNU Affero General Public License v3.0 — see [LICENSE](LICENSE).

For commercial licensing: stefano@amorelli.tech

© 2025 Stefano Amorelli (https://amorelli.tech)
