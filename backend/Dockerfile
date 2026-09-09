FROM node:20-slim

# Install Chromium and required Linux libraries for headless Lighthouse execution
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-freefont-ttf \
    libnss3 \
    libgbm1 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Chromium discovery
ENV CHROME_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

# Copy package manifests and Prisma schema for cached layer building
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy backend application source
COPY . .

# Generate Prisma Client and build production NestJS application
RUN npx prisma generate
RUN npm run build

# Expose HTTP port (Render sets PORT dynamically at runtime)
EXPOSE 3000

# Run NestJS production start command
CMD ["npm", "run", "start:prod"]
