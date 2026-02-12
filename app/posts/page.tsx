import { db } from "@/db";
import { posts } from "@/db/schema";
import Link from "next/link";

export default async function PostsPage() {
  const allPosts = await db.select().from(posts);

  return (
    <div>
        <h1 className="text-center font-bold text-2xl">All Posts</h1>
      {allPosts.map(post => (
        <div key={post.id} className="text-center">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}