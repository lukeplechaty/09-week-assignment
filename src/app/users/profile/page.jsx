import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import EditBio from "@/components/EditBio";
import UserPosts from "@/components/UserPosts";
import NewPost from "@/components/NewPost";
export default async function profile() {
  const { userId } = await auth();
  const query = await db.query(
    `SELECT id, first_name, last_name, bio FROM week09users WHERE uuid=$1`,
    [userId]
  );
  if (!query.rows.length > 0) redirect(`/users/setup`);
  const user = query.rows[0];
  return (
    <>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <p>{user.bio}</p>
      <EditBio userid={user.id} />
      <NewPost userid={user.id} />
      <UserPosts userid={user.id} />
    </>
  );
}
