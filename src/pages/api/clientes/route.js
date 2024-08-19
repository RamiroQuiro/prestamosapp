import { Cliente, User, db, eq } from "astro:db";
import { createHash, randomBytes } from "crypto";

export const generateUidEmail = (email) => {
  return createHash("sha256").update(email).digest("hex");
};

export const generateUid = () => {
  return randomBytes(16).toString("hex");
};
export async function GET({ params }) {
  try {
    return new Response(
      JSON.stringify({
        data: "hello andando men",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify(
        {
          data: "error",
        },
        {
          code: 404,
        }
      )
    );
  }
}

export async function POST({ request }) {
  const { email, nombre, apellido, dni, direccion, cel, userId } =
    await request.json();
  // console.log('email:',email, ' nombre',nombre, ' apellido',apellido,' dni',dni, ' direccion',direccion,' cel',cel,' userId',userId )
  try {
    const clientExist = await db
      .select()
      .from(Cliente)
      .where(eq(Cliente.dni,dni))

    if (clientExist[0]) {
      return new Response(
        JSON.stringify({
          status: 400,
          msg: `cliente ya registrado con el dni ${dni}.`,
        })
      );
    }


    const id = generateUidEmail(email);
    // const now = new Date()// Crea un nuevo objeto Date y conviértelo a una cadena ISO

    const createUser = await db.insert(Cliente).values({
      id: id,
      usuarioId: userId,
      email: email,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      celular: cel,
      dni: dni,
      // fechaActualizacion:now,
    });

    return new Response(
      JSON.stringify({
        data: "andando",
        status: 200,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        data: "error, no andando",
        status: 400,
      })
    );
  }
}
