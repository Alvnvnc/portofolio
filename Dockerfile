# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Generate .svelte-kit/tsconfig.json inside the image before Vite reads tsconfig.json.
RUN npm run prepare && npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV PORT=4782
ENV HOST=0.0.0.0
ENV NODE_ENV=production
EXPOSE 4782

CMD ["node", "build"]
