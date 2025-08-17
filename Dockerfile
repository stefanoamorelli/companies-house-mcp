FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build the TypeScript code
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# The server requires COMPANIES_HOUSE_API_KEY to be set at runtime
# Example mcpServers config for your client:
# 
# "mcpServers": {
#   "companies-house-mcp": {
#     "command": "docker",
#     "args": [
#       "run",
#       "--rm",
#       "-i",
#       "-e", "COMPANIES_HOUSE_API_KEY=your_api_key_here",
#       "stefanoamorelli/companies-house-mcp:latest"
#     ]
#   }
# }

CMD ["node", "dist/index.js"]