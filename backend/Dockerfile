FROM node:18-alpine

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production --silent

COPY . .

RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:4000/api/health || exit 1

CMD ["node", "index.js"]
