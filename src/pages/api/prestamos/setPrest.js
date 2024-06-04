import { Prestamo, db, Cuota } from "astro:db";
import { generateUid } from "../clientes/route";
import { generateId } from "lucia";


export async function POST({ request }) {
  const { contextoPrestamo: {montoCuota,modalidad, capital,fechaInicio,clienteId, usuarioId, montoTotal, tasaInteres, nCuotas } } = await request.json()
  // console.log('email:',email, ' nombre',nombre, ' apellido',apellido,' dni',dni, ' direccion',direccion,' cel',cel,' userId',userId )

  try {
    const id = generateId(20)
    const now = new Date(fechaInicio) // Crea un nuevo objeto Date 

//crear el prestamo primero
    const createPrest = await db.insert(Prestamo).values({
      id,
      montoCuota,
      clienteId,
      usuarioId,
      montoTotal,
      modalidad,
      capital,
      tasaInteres,
      nCuotas,
      fechaInicio:now,
    });

// verificar modalidad
let modalidadDias = modalidad == 'mensual' ? 30 : modalidad == 'quincenal' ? 15 : 7;
let fechaPrimerVencimiento = new Date(now);
fechaPrimerVencimiento.setDate(now.getDate() + modalidadDias);
// Crear las cuotas
for(let i = 0; i < nCuotas; i++){
  const cuotaId = generateId(15);
  const fechaVencimiento =fechaPrimerVencimiento;
  fechaVencimiento.setDate(now.getDate() + (i * modalidadDias)); // Asume que cada cuota es mensual

  const createCuota = await db.insert(Cuota).values({
    id: cuotaId,
    prestamoId: id,
    numeroCuota: i + 1,
    fechaVencimiento,
    monto: montoCuota,
    pagada: false,
  });
}
    
    return new Response(JSON.stringify({status:200,id:id}))
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify({
        data: "error, no andando",
        status: 400,
      }))

  }


}
