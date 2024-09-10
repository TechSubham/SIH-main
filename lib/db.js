// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your Mongo URI to .env.local');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;

// export async function checkConnection() {
//   try {
//     const client = await clientPromise;
//     await client.db().command({ ping: 1 });
//     console.log("Connected successfully to MongoDB");
//     return true;
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     return false;
//   }
// }


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