FROM node:13-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:12.8-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist

ENV PORT 80
CMD ["npm", "run", "server"]

EXPOSE 80
