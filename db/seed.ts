import { Cliente, db, User, Intereses, nCuotas, moraCuota} from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      id: "1",
      email: "a@a.com",
      userName: "usuario prueba",
    },
  ]);

}
