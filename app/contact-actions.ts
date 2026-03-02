"use server";

import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.join(process.cwd(), "contacts.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    subject TEXT,
    priority TEXT,
    message TEXT,
    company TEXT,
    website TEXT,
    jobTitle TEXT,
    newsletter INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export async function createContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  priority: string;
  message: string;
  company?: string;
  website?: string;
  jobTitle?: string;
  newsletter: boolean;
}) {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, phone, subject, priority, message, company, website, jobTitle, newsletter)
    VALUES (@name, @email, @phone, @subject, @priority, @message, @company, @website, @jobTitle, @newsletter)
  `);
  stmt.run({ ...data, newsletter: data.newsletter ? 1 : 0 });
}