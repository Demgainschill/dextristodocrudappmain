import { db } from "@/db";
import { posts } from "@/db/schema";
import { createPost, deletePost } from "app/actions/actions";
  import Link from "next/link";

export default async function PostsPage() {
  const allPosts = await db.select().from(posts);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">All Posts</h1>

      {allPosts.map(post => (
        <div key={post.id} className="text-center flex items-center justify-center gap-2">
          <Link href={`/posts/${post.id}`} className="border text-xl text-bold">
            {post.title}
          </Link>
          <form action={deletePost.bind(null, post.id)}>
            <button
              type="submit"
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </form>
        </div>
      ))}

      <form
        action={createPost}
        className="max-w-[400px] mx-auto mt-24"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="border p-2 mb-2 w-full"
        />

        <textarea
          name="body"
          placeholder="Content"
          className="border p-2 mb-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
