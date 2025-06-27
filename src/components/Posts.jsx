import { db } from "@/utils/dbConnection";
export default async function Posts(props) {
  const query = await db.query(
    `SELECT week09posts.id, week09posts.msg, week09posts.likes, week09users.username FROM week09users JOIN week09posts ON week09posts.user_id = week09users.id WHERE week09users.id = $1`,
    [props.id]
  );
  let posts = query.rows;
  // if (!query.rows.length > 0) posts = [];
  return (
    <>
      <h1>posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.username}</h1>
          <p>{post.msg}</p>
          <p>{post.likes}</p>
        </div>
      ))}
    </>
  );
}
