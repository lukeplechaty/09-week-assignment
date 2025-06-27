import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import EditDialog from "@/components/EditDialog";
export default async function profile() {
  const { userId } = await auth();
  const query = await db.query(
    `SELECT first_name, last_name, username, bio FROM week09users WHERE uuid=$1`,
    [userId]
  );
  if (!query.rows.length > 0) redirect(`/users/setup`);
  const user = query.rows[0];
  return (
    <>
      <h1>profile</h1>
      <EditDialog />
    </>
  );
}
