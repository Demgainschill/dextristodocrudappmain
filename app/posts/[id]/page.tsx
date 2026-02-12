import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page(
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;   

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)))
    .limit(1)
    .then(res => res[0]);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="text-center pt-12">
      <h1 className="text-3xl capitalize font-bold">{post.title}</h1>
      <p className="whitespace-pre-wrap mt-4">{post.body}</p>
    </div>
  );
}
