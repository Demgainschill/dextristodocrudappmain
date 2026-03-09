import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { desc } from "drizzle-orm";
import  SubmissionsGrid  from "@/components/SubmissionsGrid";

export default async function HomePage() {
  const people = await db
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  return (
    <main className="p-8 bg-yellow-400 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Recent Submissions</h2>
      {people.length === 0 && (
        <p className="text-gray-600">No submissions yet.</p>
      )}
      <SubmissionsGrid people={people} />
    </main>
  );
}