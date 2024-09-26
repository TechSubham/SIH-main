export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// MongoDB connection string - replace with your actual connection string
const uri =
  "mongodb+srv://qubit-root:f2NqL1WzplvqLbE3@qubit-arvrs.lfzfu.mongodb.net/?retryWrites=true&w=majority&appName=qubit-arvrs";
const db = "arvrs";
const client = new MongoClient(uri);

export async function GET(NextRequest) {
  try {
    await client.connect();
    const database = client.db(db);
    const vulnerabilities = database.collection("vulnerability");

    const pipeline = [
      {
        $unwind: "$affected_products",
      },
      {
        $group: {
          _id: "$description",
          products: { $addToSet: "$affected_products" },
        },
      },
      {
        $project: {
          source: "$_id",
          products: 1,
          _id: 0,
        },
      },
    ];

    const result = await vulnerabilities.aggregate(pipeline).toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
