import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function setup() {
  const user = await currentUser();
  const data = await db.query(`SELECT * FROM week09users WHERE uuid = $1`, [
    user.id,
  ]);
  if (data.rows.length > 0) redirect(`/`);
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
    redirect(`/users/${newUser.rows[0].id}`);
  }
  return (
    <>
      <form action={handle}>
        <label htmlFor="first_name">First name: </label>
        <input type="text" name="first_name" required />
        <label htmlFor="last_name">Last name: </label>
        <input type="text" name="last_name" required />
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" required />
        <label htmlFor="bio">Bio: </label>
        <textarea name="bio" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
