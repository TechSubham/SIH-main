export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://qubit-root:f2NqL1WzplvqLbE3@qubit-arvrs.lfzfu.mongodb.net/?retryWrites=true&w=majority&appName=qubit-arvrs";
const db = "arvrs";
const client = new MongoClient(uri);

export async function GET(NextRequest) {
  try {
    await client.connect();
    const database = client.db(db);
    const vulnerabilities = database.collection("vulnerability");

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [
      totalVulnerabilities,
      severityAnalytics,
      monthlyNotifications,
      sourceWiseVulnerability,
    ] = await Promise.all([
      getTotalVulnerabilities(vulnerabilities),
      getSeverityAnalytics(vulnerabilities, sixMonthsAgo),
      getMonthlyNotifications(vulnerabilities, sixMonthsAgo),
      getSourceWiseVulnerability(vulnerabilities),
    ]);

    return NextResponse.json({
      totalVulnerabilities,
      severityAnalytics,
      monthlyNotifications,
      sourceWiseVulnerability,
    });
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

async function getTotalVulnerabilities(collection) {
  const pipeline = [
    {
      $group: {
        _id: "$severity",
        count: { $sum: 1 },
      },
    },
  ];
  return collection.aggregate(pipeline).toArray();
}

async function getSeverityAnalytics(collection, startDate) {
  const pipeline = [
    {
      $addFields: {
        published_date_parsed: {
          $dateFromString: {
            dateString: "$published_date",
            format: "%d/%m/%Y",
          },
        },
      },
    },
    {
      $match: {
        published_date_parsed: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$published_date_parsed" },
          year: { $year: "$published_date_parsed" },
          severity: "$severity",
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ];
  return collection.aggregate(pipeline).toArray();
}

async function getMonthlyNotifications(collection, startDate) {
  const pipeline = [
    {
      $addFields: {
        published_date_parsed: {
          $dateFromString: {
            dateString: "$published_date",
            format: "%d/%m/%Y",
          },
        },
      },
    },
    {
      $match: {
        published_date_parsed: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$published_date_parsed" },
          year: { $year: "$published_date_parsed" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ];
  return collection.aggregate(pipeline).toArray();
}

async function getSourceWiseVulnerability(collection) {
  const pipeline = [
    {
      $group: {
        _id: "$description",
        vulnerabilitiesFound: { $sum: 1 },
        reportedVulnerabilities: {
          $sum: {
            $cond: [{ $ne: ["$severity", "Medium"] }, 1, 0],
          },
        },
      },
    },
    {
      $project: {
        source: "$_id",
        vulnerabilitiesFound: 1,
        reportedVulnerabilities: 1,
        _id: 0,
      },
    },
  ];
  return collection.aggregate(pipeline).toArray();
}
