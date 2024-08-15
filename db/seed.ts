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

  await db.insert(moraCuota).values([
    {
      id: "1",
      usuarioId: "1",
      mora:0,
    },
  ]);

  await db.insert(Intereses).values([
    {
      interes: 5,
      id: "1",
      usuarioId: "1",
    },
    {
      interes: 10,
      id: "2",
      usuarioId: "1",
    },
    {
      interes: 15,
      id: "3",
      usuarioId: "1",
    },
  ]);

  await db.insert(nCuotas).values([
    {
      nCuota: 3,
      id: "1",
      usuarioId: "1",
    },
    {
      nCuota: 6,
      id: "2",
      usuarioId: "1",
    },
    {
      nCuota: 12,
      id: "3",
      usuarioId: "1",
    },
  ]);
}
