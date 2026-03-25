import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? "us-west-2",
});

export const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE_NAME = process.env.DYNAMODB_USERS_TABLE ?? "ABCCleanersUsers";

export interface UserRecord {
  email: string;
  passwordHash: string;
  role: string;
  name?: string;
  createdAt: string;
}

export async function getUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { email: email.toLowerCase() },
    })
  );
  return (result.Item as UserRecord) ?? null;
}

export async function putUser(user: UserRecord): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: { ...user, email: user.email.toLowerCase() },
    })
  );
}

export async function listUsers(): Promise<UserRecord[]> {
  const result = await docClient.send(
    new ScanCommand({ TableName: TABLE_NAME })
  );
  return (result.Items as UserRecord[]) ?? [];
}
