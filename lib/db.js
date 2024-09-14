import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://qubit-root:f2NqL1WzplvqLbE3@qubit-arvrs.lfzfu.mongodb.net/?retryWrites=true&w=majority&appName=qubit-arvrs';
const dbName = 'arvrs';

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  cachedClient = { client, db };
  return cachedClient;
}