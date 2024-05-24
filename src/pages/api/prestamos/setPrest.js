import { Prestamo, db } from "astro:db";
import { generateUid } from "../clientes/route";


export async function POST({ request }) {
  const { contextoPrestamo: { fechaInicio,clienteId, usuarioId, montoTotal, tasaInteres, nCuotas } } = await request.json()
  //  console.log(fechaInicio)
  // console.log('email:',email, ' nombre',nombre, ' apellido',apellido,' dni',dni, ' direccion',direccion,' cel',cel,' userId',userId )

  try {
    const id = generateUid()
    console.log(id)
    const now = new Date(fechaInicio) // Crea un nuevo objeto Date y conviértelo a una cadena ISO


    const createPrest = await db.insert(Prestamo).values({
      id,
      clienteId,
      usuarioId,
      montoTotal,
      tasaInteres,
      nCuotas,
      fechaInicio:now,
    });

    
    return new Response('prestamo creado',{status:200})
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        data: "error, no andando",
        status: 400,
      }))

  }


}
