import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://qubit-root:f2NqL1WzplvqLbE3@qubit-arvrs.lfzfu.mongodb.net/?retryWrites=true&w=majority&appName=qubit-arvrs';
const dbName = 'arvrs';

export async function connectToDatabase() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  return { client, db };
}