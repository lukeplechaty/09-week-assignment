import { db } from "@/utils/dbConnection";
import { notFound } from "next/navigation";
import UserPosts from "@/components/UserPosts";
export default async function user({ params }) {
  const { id } = await params;
  if (isNaN(id)) throw new Error("Params (id) must be number");
  const query = await db.query(
    `SELECT first_name, last_name, bio FROM week09users WHERE id=$1`,
    [id]
  );
  if (!query.rows.length > 0) notFound();
  const user = query.rows[0];
  return (
    <>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <p>{user.bio}</p>
      <UserPosts userid={id} />
    </>
  );
}
