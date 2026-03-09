import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "sqlite.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true }); // creates db/ if missing
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });