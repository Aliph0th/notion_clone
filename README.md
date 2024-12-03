# Mini clone of Notion

![screen](https://i.imgur.com/JwTXnCy.png)
![screen](https://i.imgur.com/mpIyOjD.png)

## Summary

This project uses following tech stack:

-  **Backend**
   -  NodeJS
   -  Express.js
   -  Typescript
   -  Prisma + SQLite
   -  express-validator
   -  inversify
   -  Docker
-  **Frontend**:
   -  HTML
   -  TailwindCSS
   -  Vite bundler
   -  React
   -  Typescript
   -  React Router Dom
   -  Tanstack query
   -  Zod
   -  React hook form
   -  Docker

## Installation guide

1. `git clone https://github.com/Aliph0th/notion_clone.git`
2. In `client` and `server` folders create `.env` config file

   -  in `client`:
      ```
      VITE_API_URL=<your base url for backend>/api
      ```
   -  in `server`

      ```
      ACCESS_SECRET=<your secret for access token>
      REFRESH_SECRET=<your secret for refresh token>
      ORIGIN=<url to frontend>
      ```

3. Run project using npm (before that, manually install all dependencies in both folders and run `npm run db:init` in the server folder) **OR** using docker-compose: `docker compose up -d`
