import { db } from "../src/db";
import { posts } from "../src/db/schema";

async function seed() {
  await db.insert(posts).values({
    title: "Hello Drizzle",
    body: "This is my second post",
  });

  console.log("Seed complete");
}

seed();

