# Build
FROM node:22-alpine3.22
WORKDIR /backend
COPY package*.json ./
RUN npm i
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Run
FROM node:22-alpine3.22
WORKDIR /backend
COPY package*.json ./
RUN npm i --omit=dev
COPY --from=build /backend/dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
