import { MongoClient } from "mongodb";
import { config } from "./config.js";

let client;
let db;

async function ensureIndexes(col) {
  const specs = [
    [{ pcmNo: 1 }, { unique: true, name: "pcmNo_unique" }],
    [{ "display.name.zh": 1 }, { name: "name_zh" }],
    [{ "display.name.en": 1 }, { name: "name_en" }],
  ];
  for (const [keys, options] of specs) {
    try {
      await col.createIndex(keys, options);
    } catch (err) {
      console.warn(`[db] Index ${options.name} skipped:`, err.message);
    }
  }
}

export async function connectDb() {
  if (!config.mongoUri) {
    throw new Error("Missing COSMOS_CONNECTION_STRING in .env");
  }

  if (!client) {
    client = new MongoClient(config.mongoUri, {
      // Cosmos DB for MongoDB requires TLS
      tls: true,
    });
    await client.connect();
    db = client.db(config.dbName);
    const col = db.collection(config.collectionName);
    await ensureIndexes(col);
  }

  return db;
}

export function getCollection() {
  if (!db) {
    throw new Error("Database not connected. Call connectDb() first.");
  }
  return db.collection(config.collectionName);
}

export async function closeDb() {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
  }
}
