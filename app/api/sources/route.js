import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://qubit-root:f2NqL1WzplvqLbE3@qubit-arvrs.lfzfu.mongodb.net/?retryWrites=true&w=majority&appName=qubit-arvrs";
const db = "arvrs";

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

async function getConnectedClient() {
  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function POST(request) {
  try {
    const { email, source } = await request.json();
    const client = await getConnectedClient();
    const database = client.db(db);
    const sources = database.collection("sources");

    const result = await sources.updateOne(
      { name: source },
      { $addToSet: { emails: email } }
    );

    return new Response(JSON.stringify({ success: true, modified: result.modifiedCount > 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in POST function:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { email, source } = await request.json();
    const client = await getConnectedClient();
    const database = client.db(db);
    const sources = database.collection("sources");

    const result = await sources.updateOne(
      { name: source },
      { $pull: { emails: email } }
    );

    return new Response(JSON.stringify({ success: true, modified: result.modifiedCount > 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in DELETE function:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(request) {
    try {
      const client = await getConnectedClient();
      const database = client.db(db);
      const sources = database.collection("sources");
  
      // Fetch all documents in the collection
      const result = await sources.find({}, { projection: { name: 1, emails: 1 } }).toArray();
  
      // Map through each document and its emails safely
      const emailsList = result.flatMap(doc => 
        (doc.emails || []).map(email => ({
          source: doc.name,
          email: email
        }))
      );
  
      return new Response(JSON.stringify({ success: true, emails: emailsList }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error in GET function:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }