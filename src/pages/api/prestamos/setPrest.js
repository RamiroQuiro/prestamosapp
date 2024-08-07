import { Prestamo, db, Cuota, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST({ request }) {
  const {
    contextoPrestamo: {
      montoCuota,
      modalidad,
      capital,
      fechaInicio,
      clienteId,
      usuarioId,
      montoTotal,
      tasaInteres,
      nCuotas,
    },
  } = await request.json();
  
  try {
    const id = generateId(20);
    const now = new Date(fechaInicio);

    // Crear el préstamo primero
    const createPrest = await db.insert(Prestamo).values({
      id,
      montoCuota,
      clienteId,
      usuarioId,
      montoTotal,
      modalidad: modalidad === 30 ? 'mensual' : modalidad === 15 ? 'quincenal' : 'semanal',
      capital,
      tasaInteres,
      nCuotas,
      fechaInicio: now,
    });

    // Verificar modalidad y calcular días
    const modalidadDias = Number(modalidad);
    let fechaPrimerVencimiento = new Date(now);
    // console.log('fecha priomerVencimiento ->',fechaPrimerVencimiento)
    fechaPrimerVencimiento.setDate(fechaPrimerVencimiento.getDate() + modalidadDias);
    
    let fechaFin;
    let fechaVencimiento = new Date(fechaPrimerVencimiento);
    // console.log('fecha vencmiento ->',fechaVencimiento)
    for (let i = 0; i < nCuotas; i++) {
      const cuotaId = generateId(15);
      fechaVencimiento.setDate(fechaVencimiento.getDate() + (i * modalidadDias));
      
      // Guardar la fecha de vencimiento de la última cuota
      if (i === nCuotas - 1) {
        fechaFin = new Date(fechaVencimiento);
      }

      const createCuota = await db.insert(Cuota).values({
        id: cuotaId,
        prestamoId: id,
        usuarioId,
        clienteId,
        numeroCuota: i + 1,
        fechaVencimiento,
        monto: montoCuota,
        pagada: false,
      });
    }

    // Actualizar el préstamo con la FechaFin calculada
    const integrarFechaFin = await db.update(Prestamo).set({
      fechaFin
    }).where(eq(Prestamo.id, id));

    return new Response(JSON.stringify({ status: 200, id: id }));
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
