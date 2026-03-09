"use server";

import { db } from "@/db";
import { contactSubmissions, posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  if (!title || !body) return;
  await db.insert(posts).values({ title, body });
  revalidatePath("/posts");
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
  revalidatePath("/posts");
}

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
  newsletter?: boolean;
}) {
  await db.insert(contactSubmissions).values(data);
  revalidatePath("/");
}