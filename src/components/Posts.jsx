import Comments from "@/components/Comments";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import Link from "next/link";
export default async function Posts() {
  const query = await db.query(
    `SELECT week09posts.id AS post_id, week09posts.msg, week09users.username, week09users.id AS user_id FROM week09users JOIN week09posts ON week09posts.user_id = week09users.id ORDER BY week09posts.id DESC LIMIT 5`
  );
  setTimeout(() => {
    revalidatePath("/");
  }, 30000);
  let posts = query.rows;
  return (
    <div className="flex flex-col gap-2 border-solid border-2 border-gray-500 p-4">
      {posts.map((post) => (
        <div
          key={post.post_id}
          className="flex flex-col gap-2 border-solid border-2 border-gray-500 p-1"
        >
          <Link href={`/users/${post.user_id}`}>
            <h1 className="text-2xl text-blue-500 hover:text-blue-300">
              {post.username}
            </h1>
          </Link>
          <p>{post.msg}</p>
          <Comments
            postid={post.post_id}
            userid={post.user_id}
            username={post.username}
            msg={post.msg}
          />
        </div>
      ))}
    </div>
  );
}
