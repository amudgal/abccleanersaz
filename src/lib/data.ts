import { promises as fs } from "fs";
import path from "path";
import { getItem, putItem } from "./dynamodb";

const DATA_DIR = path.join(process.cwd(), "data");

// Map filename → DynamoDB pk
const FILE_TO_PK: Record<string, string> = {
  "config.json": "CONFIG",
  "pricing.json": "PRICING",
  "faqs.json": "FAQS",
};

export async function readJsonFile<T>(filename: string): Promise<T> {
  const pk = FILE_TO_PK[filename];

  // Try DynamoDB first
  if (pk) {
    try {
      const item = await getItem<T>(pk);
      if (item) return item;
    } catch (err) {
      console.warn(`DynamoDB read failed for ${pk}, falling back to file:`, err);
    }
  }

  // Fallback to local file (for dev or if DynamoDB isn't seeded yet)
  const candidates = [
    path.join(DATA_DIR, filename),
    path.join(process.cwd(), ".next", "standalone", "data", filename),
  ];

  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      return JSON.parse(raw) as T;
    } catch {
      continue;
    }
  }
  throw new Error(`Could not read ${filename}`);
}

export async function writeJsonFile(
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
): Promise<void> {
  const pk = FILE_TO_PK[filename];

  // Write to DynamoDB
  if (pk) {
    await putItem(pk, data);
    return;
  }

  // Fallback to file for unmapped files
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

// ── Types ──

export interface PriceItem {
  item: string;
  price: string;
}

export interface PriceCategory {
  id: string;
  title: string;
  highlight: boolean;
  items: PriceItem[];
}

export interface PricingData {
  visible: boolean;
  categories: PriceCategory[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
}

export interface FaqsData {
  visible: boolean;
  faqs: FaqItem[];
}

export interface SiteConfig {
  googlePlacesApiKey: string;
  adminEmail?: string;
  adminPasswordHash?: string;
}
