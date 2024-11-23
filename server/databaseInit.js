/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db', 'database.db');

if (!fs.existsSync(path.dirname(dbPath))) {
   fs.mkdirSync(path.dirname(dbPath));
   console.log('./db was created');
}

if (!fs.existsSync(dbPath)) {
   fs.writeFileSync(dbPath, '', 'utf8');
   console.log('File database.db was created');
} else {
   console.log('File database.db already exists');
}
