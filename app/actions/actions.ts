  "use server";

  import { db } from "@/db";
  import { posts } from "@/db/schema";
  import { revalidatePath } from "next/cache";
  import { redirect } from "next/navigation";
  import { eq } from "drizzle-orm";


  export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if (!title || !body) return;

    await db.insert(posts).values({
      title,
      body,
    });

    revalidatePath('/posts');
  }

  export async function deletePost(id: number) {
    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/posts");
  }

