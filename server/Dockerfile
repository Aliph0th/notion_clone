FROM node:20-alpine

WORKDIR /app

RUN chown node:node /app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run db:init && \
    npm run db:generate && \
    chown node:node ./db/database.db && \
    if [-f ./db/database.db-journal]; then \
        chown node:node ./db/database.db-journal; \
    fi
EXPOSE 3000

RUN npm run build
USER node

CMD ["npm", "start"]
