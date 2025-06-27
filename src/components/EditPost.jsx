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

export default async function EditPost(props) {
  const query = await db.query(`SELECT msg FROM week09posts WHERE id=$1`, [
    props.postid,
  ]);
  const msg = query.rows[0].msg;
  async function handel(values) {
    "use server";
    const msg = values.get(`msg`);
    await db.query(`UPDATE week09posts SET msg=$1 WHERE id=$2`, [
      msg,
      props.postid,
    ]);
    revalidatePath(`/users/${props.userid}`);
    revalidatePath(`/users/profile`);
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Message</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={handel}>
            <DialogHeader>
              <DialogTitle>Edit Message</DialogTitle>
            </DialogHeader>
            <Textarea name="msg" defaultValue={msg} />
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
