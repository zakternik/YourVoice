import dotenv from 'dotenv';

import app from './app.js';

dotenv.config();

const port = process.env.PORT || 3000;

async function main() {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

main();
