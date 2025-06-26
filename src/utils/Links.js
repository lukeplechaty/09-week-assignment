// "use server";
// import { auth } from "@clerk/nextjs/server";
// import { db } from "@/utils/dbConnection";
// const { userId } = await auth();
// const data = await db.query(`SELECT id FROM week09users WHERE uuid = $1`, [
//   userId,
// ]);
// let id = 0;
// if (data.rows.length > 0) id = data.rows[0].id;
export const links = [
  { id: 1, name: "Home", href: "/" },
  //   { id: 2, name: "My Profile", href: `/user/${id}` },
];
