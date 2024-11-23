FROM node:20-alpine

WORKDIR /app
RUN chown -R node:node /app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

EXPOSE 5173

RUN npm run build

USER node

CMD ["npm", "run", "preview"]
