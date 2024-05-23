import { Cliente, User, db } from "astro:db";
import { createHash } from "crypto";

const generateUid = (email) => {
  return createHash("sha256").update(email).digest("hex");
};
export async function GET({ params }) {
  console.log("andando");
  return new Response(
    JSON.stringify({
      data: "hello andando men",
    })
  );
}

export async function POST({ request }) {
  const { email, nombre, apellido, dni, direccion, cel ,userId} = await request.json();
console.log('email:',email, ' nombre',nombre, ' apellido',apellido,' dni',dni, ' direccion',direccion,' cel',cel,' userId',userId )
  try {
    const id = generateUid(email);

    const createUser = await db.insert(Cliente).values({
      id: id,
      usuarioId:userId,
      email,
      nombre,
      apellido,
      direccion,
      celular: cel,
      DNI: dni,
      fechaCreacion:Date.now(),
      fechaActualizacion:Date.now(),
      
    });

    console.log("nuevo usuario creado en base de datos ->", createUser);
    return new Response(
        JSON.stringify({
          data: "andando",
          status: 200,
        }))
  } catch (error) {
    return new Response(
        JSON.stringify({
          data: "error, no andando",
          status: 400,
        }))

  }
  
  
}
