import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { auth } from "@clerk/nextjs/server";

export default async function Newcomment(props) {
  const { userId } = await auth();
  const query = await db.query(`SELECT id FROM week09users WHERE uuid=$1`, [
    userId,
  ]);
  const id = query.rows[0].id;
  async function handel(values) {
    "use server";
    const msg = values.get(`msg`);
    await db.query(
      `INSERT INTO week09comments (msg, post_id, user_id) VALUES ($1, $2, $3)`,
      [msg, props.postid, id]
    );
    revalidatePath(`/users/${props.userid}`);
    revalidatePath(`/users/profile`);
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">New Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={handel}>
            <DialogHeader>
              <DialogTitle>New post</DialogTitle>
            </DialogHeader>
            <Textarea name="msg" />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
