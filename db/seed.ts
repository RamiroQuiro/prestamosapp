import { db, User } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {

	await db.insert(User).values([
    {
      id: "ñlsdkfñlks-ñlsdkfñslk-ñsldkfñsk",
      email: "rama.exe.13@gmail.com",
      userName: "ramiroChango",
    },
  
  ]);
}
