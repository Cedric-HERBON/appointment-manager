# Build
FROM node:22-alpine3.22 AS appointment-manager-backend-build
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Run
FROM node:22-alpine3.22
WORKDIR /backend
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=appointment-manager-backend-build /backend/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.js"]
