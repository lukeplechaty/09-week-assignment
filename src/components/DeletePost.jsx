import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";

export default async function DeletePost(props) {
  async function handel(values) {
    "use server";
    await db.query(`DELETE FROM week09comments WHERE post_id=$1`, [
      props.postid,
    ]);
    await db.query(`DELETE FROM week09posts WHERE id=$1`, [props.postid]);
    revalidatePath(`/users/${props.userid}`);
    revalidatePath(`/users/profile`);
  }
  return (
    <form action={handel}>
      <Button type="submit">DELETE</Button>
    </form>
  );
}
