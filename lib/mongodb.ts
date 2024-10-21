/* eslint-disable no-var */
import { MongoClient } from "mongodb";
import { ApiErrors, DatabaseNames } from "@/constants/api";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase() {
  try {
    const client = await clientPromise;
    return client.db(DatabaseNames.MAIN);
  } catch (error) {
    throw new Error(ApiErrors.DATABASE_CONNECTION + error);
  }
}

export default clientPromise;
