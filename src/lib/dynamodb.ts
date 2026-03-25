import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "us-east-1",
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE_NAME = process.env.DYNAMODB_TABLE ?? "ABCCleaners";

/**
 * Single-table design using `pk` as the partition key.
 * Records stored:
 *   pk="CONFIG"    → site config (API keys, admin credentials)
 *   pk="PRICING"   → pricing data (visible flag + categories)
 *   pk="FAQS"      → FAQ data (visible flag + faqs list)
 */

export async function getItem<T>(pk: string): Promise<T | null> {
  const result = await docClient.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { pk } })
  );
  if (!result.Item) return null;
  const { pk: _pk, ...data } = result.Item;
  return data as T;
}

export async function putItem<T extends Record<string, unknown>>(
  pk: string,
  data: T
): Promise<void> {
  await docClient.send(
    new PutCommand({ TableName: TABLE_NAME, Item: { pk, ...data } })
  );
}
