import { db, User } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(User).values([
    {
      id: "123456",
      email: "rama.exe.13@gmail.com",
      userName: "ramiroChango",
    },
  
    {
      id: "11223344",
      email: "rama@gmail.com",
      userName: "ramiroChangoQuiroga",
    },
  
  ]);
}
