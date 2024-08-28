import type { APIContext } from "astro";
import { User, db, eq, moraCuota } from "astro:db";
import { generateId } from "lucia";
import bcrypt from "bcryptjs";
import { lucia } from "../../../lib/auth";

export async function POST({
  request,
  redirect,
  cookies,
}: APIContext): Promise<Response> {
  const formData = await request.json();

  const { email, password, userName } = await formData;
  // console.log(email, password);
  if (!email || !password || !userName) {
    return new Response(
      JSON.stringify({
        data: "faltan campos requeridos",
        status: 400,
      })
    );
  }
  if (password.length < 6) {
    return new Response(
      JSON.stringify({
        data: "contraseña mayor a 6 caracteres",
        status: 400,
      })
    );
  }

  //   verificar si el usuario existe
  const existingUser = await db
    .select()
    .from(User)
    .where(eq(User.email, email));
  // console.log(existingUser);

  if (existingUser.length > 0) {
    return new Response(
      JSON.stringify({
        data: "email ya registrado",
        status: 400,
      })
    );
  }

  // crear usuario en DB

  const userId = generateId(15);
  // Hacemos hash de la contraseña
  const hashPassword = await bcrypt.hash(password, 12);

  await db.insert(User).values([
    {
      userName: userName,
      id: userId,
      email: email,
      password: hashPassword,
    },
  ]);

  await db.insert(moraCuota).values({
    id:generateId(15),
    value:0,
    usuarioId:userId
  })
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return new Response(
    JSON.stringify({
      data: "usuario creado con exito",
      status: 200,
    })
  );
}
