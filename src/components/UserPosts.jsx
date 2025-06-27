import { db } from "@/utils/dbConnection";
import Link from "next/link";
export default async function UserPosts(props) {
  const query = await db.query(
    `SELECT week09posts.id AS post_id, week09posts.msg, week09posts.likes, week09users.username, week09users.id AS user_id FROM week09users JOIN week09posts ON week09posts.user_id = week09users.id WHERE week09users.id = $1`,
    [props.userid]
  );
  let posts = query.rows;
  return (
    <>
      <h1>posts</h1>
      {posts.map((post) => (
        <div key={post.post_id}>
          <Link href={`/users/${post.user_id}`}>
            <h1>{post.username}</h1>
          </Link>
          <p>{post.msg}</p>
          <p>{post.likes}</p>
        </div>
      ))}
    </>
  );
}
