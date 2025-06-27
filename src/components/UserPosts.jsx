import { db } from "@/utils/dbConnection";
import Link from "next/link";
import Newcomment from "./NewComment";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
export default async function UserPosts(props) {
  const query = await db.query(
    `SELECT week09posts.id AS post_id, week09posts.msg, week09users.username, week09users.id AS user_id FROM week09users JOIN week09posts ON week09posts.user_id = week09users.id WHERE week09users.id = $1 ORDER BY week09posts.id DESC`,
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
          <Newcomment
            postid={post.post_id}
            userid={post.user_id}
            username={post.username}
            msg={post.msg}
            edit={true}
          />
          {props.edit ? (
            <>
              <EditPost postid={post.post_id} userid={props.userid} />
              <DeletePost postid={post.post_id} userid={props.userid} />
            </>
          ) : null}
        </div>
      ))}
    </>
  );
}
