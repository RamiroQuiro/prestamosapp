import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";
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

  if (!email || !password || !userName) {
    return new Response("email y contraseña requerida", { status: 400 });
  }
  if (password.length < 4) {
    return new Response("contraseña requerida mayor a  caracteres", {
      status: 400,
    });
  }

  const existingUser = await db
    .select()
    .from(User)
    .where(eq(User.email, email));
    console.log(existingUser)
  if (existingUser) {
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

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
}
