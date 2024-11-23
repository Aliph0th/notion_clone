FROM node:20-alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

RUN npm run db:init && \
    npm run db:generate

EXPOSE 3000

RUN npm run build
USER node

CMD ["npm", "start"]
