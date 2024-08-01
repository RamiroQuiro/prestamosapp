import { Cliente, db, User, Intereses } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      id: "123456",
      email: "rama.exe.13@gmail.com",
      userName: "ramiroChango",
    },
  ]),
    await db.insert(Cliente).values([
      {
        id: "qwert",
        email: "rama.exe.13@gmail.com",
        nombre: "Ramiro",
        apellido: "quiroga",
        dni: 33888224,
        celular: 3855815662,
        usuarioId: "123456",
      },
    ]);
  await db.insert(Intereses).values([
    {
      interes: 5,
      id: "1",
      usuarioId: "",
    },
  ]);
}
