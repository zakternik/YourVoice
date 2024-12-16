import dotenv from 'dotenv';

import app from './app.js';
import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@yourvoice-cluster.xzqu8.mongodb.net/${process.env.DB_NAME}`,
    );
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (err) {
    console.log('DB connection error : ', err);
  }
}

main();
