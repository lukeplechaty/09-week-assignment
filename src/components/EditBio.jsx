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

export default async function EditBio(props) {
  const query = await db.query(`SELECT bio FROM week09users WHERE id=$1`, [
    props.userid,
  ]);
  const bio = query.rows[0].bio;
  async function handel(values) {
    "use server";
    const bio = values.get(`msg`);
    await db.query(`UPDATE week09users SET bio=$1 WHERE id=$2)`, [
      bio,
      props.userid,
    ]);
    revalidatePath(`/users/${props.userid}`);
    revalidatePath(`/users/profile`);
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Bio</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={handel}>
            <DialogHeader>
              <DialogTitle>New post</DialogTitle>
            </DialogHeader>
            <Textarea name="bio" defaultValue={bio} />
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
