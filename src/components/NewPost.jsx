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

export default function NewPost(props) {
  async function handel(values) {
    "use server";
    const msg = values.get(`msg`);
    await db.query(
      `INSERT INTO week09posts (msg, likes, user_id) VALUES ($1, $2, $3)`,
      [msg, 0, props.id]
    );
    revalidatePath(`/users/${props.id}`);
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
