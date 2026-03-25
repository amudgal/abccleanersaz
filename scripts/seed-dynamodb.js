const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const fs = require("fs");

const client = new DynamoDBClient({ region: "us-east-1" });
const doc = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

async function seed() {
  const config = JSON.parse(fs.readFileSync("data/config.json", "utf-8"));
  const pricing = JSON.parse(fs.readFileSync("data/pricing.json", "utf-8"));
  const faqs = JSON.parse(fs.readFileSync("data/faqs.json", "utf-8"));

  await doc.send(new PutCommand({ TableName: "ABCCleaners", Item: { pk: "CONFIG", ...config } }));
  console.log("Seeded CONFIG:", JSON.stringify(config).slice(0, 80));

  await doc.send(new PutCommand({ TableName: "ABCCleaners", Item: { pk: "PRICING", ...pricing } }));
  console.log("Seeded PRICING: visible=" + pricing.visible + " categories=" + pricing.categories.length);

  await doc.send(new PutCommand({ TableName: "ABCCleaners", Item: { pk: "FAQS", ...faqs } }));
  console.log("Seeded FAQS: visible=" + faqs.visible + " faqs=" + faqs.faqs.length);

  console.log("Done! All data seeded to DynamoDB table ABCCleaners.");
}

seed().catch(console.error);
