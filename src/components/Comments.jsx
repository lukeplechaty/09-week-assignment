import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConnection";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default async function Comments(props) {
  const msgquery = await db.query(
    `SELECT week09comments.id, week09comments.msg, week09users.username FROM week09comments JOIN week09users ON week09comments.user_id = week09users.id WHERE week09comments.post_id=$1 ORDER BY week09comments.id DESC`,
    [props.postid]
  );
  const msgs = msgquery.rows;
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
