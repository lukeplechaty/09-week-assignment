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
  const userquery = await db.query(`SELECT id FROM week09users WHERE uuid=$1`, [
    userId,
  ]);
  const id = userquery.rows[0].id;
  const msgquery = await db.query(
    `SELECT week09comments.id, week09comments.msg, week09users.username FROM week09comments JOIN week09users ON week09comments.user_id = week09users.id WHERE week09comments.post_id=$1 ORDER BY week09comments.id DESC`,
    [props.postid]
  );
  const msgs = msgquery.rows;
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
          <Button variant="outline">Comment</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{props.username} post</DialogTitle>
          </DialogHeader>
          <p>{props.msg}</p>
          <div className="overflow-y-scroll max-h-70 flex flex-col gap-2">
            {msgs.map((val) => (
              <div
                key={val.id}
                className="border-solid border-2 border-gray-500 p-1"
              >
                <h2 className=" text-[22px]">{val.username}</h2>
                <p>{val.msg}</p>
              </div>
            ))}
          </div>
          <form action={handel}>
            <DialogFooter>
              <Textarea name="msg" />
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
