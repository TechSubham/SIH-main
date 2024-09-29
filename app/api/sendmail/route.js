import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const mailerSend = new MailerSend({
  apiKey:
    "mlsn.2f9fc72d0f8b54fdc4c8af6f27914d84a53f0e08a31331a22da4f145023d973e",
});

const uri =
  "mongodb+srv://qubit-root:f2NqL1WzplvqLbE3@qubit-arvrs.lfzfu.mongodb.net/?retryWrites=true&w=majority&appName=qubit-arvrs";
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const data = await request.json();
    
    await client.connect();
    const database = client.db("arvrs");
    const sourcesCollection = database.collection("sources");
    
    const sourceDoc = await sourcesCollection.findOne({
      name: data.description
    });
    
    if (!sourceDoc) {
      return NextResponse.json(
        { message: `No source found for description: ${data.description}` },
        { status: 404 }
      );
    }
    
    const affectedEmails = sourceDoc.emails.filter(emailObj => 
      data.products.some(product => emailObj.products.includes(product))
    );
    
    const sentFrom = new Sender("support@teamqubit.in", "Support");
    
    for (const emailObj of affectedEmails) {
      const toE = [new Recipient(emailObj.email)];
      console.log(toE);
      
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(toE)
        .setTemplateId("o65qngk6pxw4wr12")
        .setPersonalization([
          {
            email: emailObj.email,
            data: {
              source: data.description,
              vulnerability: [
                {
                  id: data["cve_id"],
                  source: data.description,
                  severity: data.severity,
                  affectedProducts: emailObj.products.filter(product => 
                    data.products.includes(product)
                  )
                },
              ],
            },
          },
        ]);
      
      await mailerSend.email.send(emailParams);
    }
    
    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
