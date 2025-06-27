import Comments from "@/components/Comments";
import { db } from "@/utils/dbConnection";
import Link from "next/link";
export default async function Home() {
  const query = await db.query(
    `SELECT week09posts.id AS post_id, week09posts.msg, week09users.username, week09users.id AS user_id FROM week09users JOIN week09posts ON week09posts.user_id = week09users.id ORDER BY week09posts.id DESC LIMIT 5`
  );
  let posts = query.rows;
  return (
    <>
      <h1>home page</h1>
      {posts.map((post) => (
        <div key={post.post_id}>
          <Link href={`/users/${post.user_id}`}>
            <h1>{post.username}</h1>
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
    </>
  );
}
