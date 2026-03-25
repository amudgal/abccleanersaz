import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export async function readJsonFile<T>(filename: string): Promise<T> {
  const candidates = [
    path.join(DATA_DIR, filename),
    path.join(process.cwd(), ".next", "standalone", "data", filename),
    path.join(__dirname, "..", "..", "data", filename),
    path.join(__dirname, "..", "data", filename),
    path.join("/tmp", "data", filename),
  ];

  for (const filePath of candidates) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      return JSON.parse(raw) as T;
    } catch {
      continue;
    }
  }
  throw new Error(`Could not read ${filename} from any of: ${candidates.join(", ")}`);
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
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
