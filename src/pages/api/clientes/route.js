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
// console.log('email:',email, ' nombre',nombre, ' apellido',apellido,' dni',dni, ' direccion',direccion,' cel',cel,' userId',userId )
  try {
    const id = generateUid(email);
    const now = new Date().toISOString(); // Crea un nuevo objeto Date y conviértelo a una cadena ISO


console.log(now)
    const createUser = await db.insert(Cliente).values({
      id: id,
      usuarioId:userId,
      email:email,
      nombre:nombre,
      apellido:apellido,
      direccion:direccion,
      celular: cel,
      dni: dni,
      // fechaCreacion:now,
      // fechaActualizacion:now,
      
    });

    console.log("nuevo usuario creado en base de datos ->", createUser);
    return new Response(
        JSON.stringify({
          data: "andando",
          status: 200,
        }))
  } catch (error) {
    console.log(error)
    return new Response(
        JSON.stringify({
          data: "error, no andando",
          status: 400,
        }))

  }
  
  
}
