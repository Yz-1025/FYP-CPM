import dotenv from "dotenv";

dotenv.config({ path: new URL("../../.env", import.meta.url) });

const uri = process.env.COSMOS_CONNECTION_STRING || process.env.MONGODB_URI;

if (!uri) {
  console.warn(
    "[config] COSMOS_CONNECTION_STRING is not set. Copy .env.example to .env after creating Cosmos DB."
  );
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: uri,
  dbName: process.env.MONGODB_DB_NAME || "hk_cpm",
  collectionName: process.env.MONGODB_COLLECTION || "cpm_products",
};
