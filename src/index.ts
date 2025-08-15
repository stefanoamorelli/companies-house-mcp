#!/usr/bin/env node

import { config as loadEnv } from 'dotenv';
import { CompaniesHouseMCPServer } from './mcp-server.js';

loadEnv();

async function main() {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY;

  if (!apiKey) {
    console.error('Error: COMPANIES_HOUSE_API_KEY environment variable is required');
    console.error('Please set it in your .env file or as an environment variable');
    process.exit(1);
  }

  try {
    const server = new CompaniesHouseMCPServer({
      apiKey,
      baseUrl: process.env.COMPANIES_HOUSE_API_URL
    });

    await server.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
