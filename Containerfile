# Build stage
FROM node:24.12-alpine AS builder
# LTS first released 6-may-2025 last update 10-dic-2025
# vue requiresInstall Node.js version ^20.19.0 || >=22.12.0
WORKDIR /app
COPY package*.json ./
COPY packages/vue-ui-kit-1.0.13.tgz ./packages/.
RUN npm install
COPY . .
RUN npm run build

# Final stage
FROM nginx:alpine AS final
WORKDIR /app
COPY --from=builder /app/dist /app
COPY nginx/conf.d/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
