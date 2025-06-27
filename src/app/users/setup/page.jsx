import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default async function setup() {
  const user = await currentUser();
  const data = await db.query(`SELECT * FROM week09users WHERE uuid = $1`, [
    user.id,
  ]);
  if (data.rows.length > 0) redirect(`/users/profile`);
  async function handle(values) {
    "use server";
    const formdata = {
      firstName: values.get(`first_name`),
      lastName: values.get(`last_name`),
      userName: values.get(`username`),
      bio: values.get(`bio`),
    };
    const newUser = await db.query(
      `INSERT INTO week09users (uuid, first_name, last_name, username, bio) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        user.id,
        formdata.firstName,
        formdata.lastName,
        formdata.userName,
        formdata.bio,
      ]
    );
    revalidatePath(`/users/${newUser.rows[0].id}`);
    revalidatePath(`/users/profile`);
    redirect(`/users/profile`);
  }
  return (
    <div className="max-w-md absolute left-[50%] w-full translate-x-[-50%]">
      <h1>Profile setup</h1>
      <form action={handle}>
        <Label htmlFor="first_name">First name: </Label>
        <Input
          type="text"
          name="first_name"
          defaultValue={user.firstName}
          required
        />
        <Label htmlFor="last_name">Last name: </Label>
        <Input
          type="text"
          name="last_name"
          defaultValue={user.lastName}
          required
        />
        <Label htmlFor="username">Username: </Label>
        <Input
          type="text"
          name="username"
          defaultValue={user.username}
          required
        />
        <Label htmlFor="bio">Bio: </Label>
        <Textarea name="bio" required />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
