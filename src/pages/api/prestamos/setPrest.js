import { Prestamo, db, Cuota, eq, User } from "astro:db";
import { generateId } from "lucia";

export async function POST({ request }) {
  const {
    contextoPrestamo: {
      cuotas,           // Array de montos de cada cuota ya calculada
      modalidad,        // Días entre cuotas (e.g., 30 para mensual, 15 para quincenal)
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
    await db.insert(Prestamo).values({
      id,
      cuotas,
      clienteId,
      montoCuota: cuotas[0].montoCuota,  // Asigna el monto de la primera cuota
      usuarioId,
      montoTotal,
      modalidad: modalidad == 30 ? 'mensual' : modalidad == 15 ? 'quincenal' : 'semanal',
      capital,
      tasaInteres,
      nCuotas,
      fechaInicio: now,
    });

    // Verificar modalidad y calcular días
    const modalidadDias = Number(modalidad);
    
    let fechaFin=new Date(cuotas[cuotas.length -1].fechaVencimiento)
    
    // Insertar cada cuota con su fecha de vencimiento y monto precalculado
    for (let i = 0; i < cuotas.length; i++) {
      let fechaVencimiento = new Date(cuotas[i].fechaVencimiento);
      const cuotaId = generateId(15);


      await db.insert(Cuota).values({
        id: cuotaId,
        prestamoId: id,
        usuarioId,
        clienteId,
        numeroCuota: i + 1,
        fechaVencimiento,
        monto: parseFloat(cuotas[i].montoCuota.toFixed(2)),  // Usar la cuota calculada recibida
        pagada: false,
      });

    }
    // Actualizar el préstamo con la FechaFin calculada
    await db.update(Prestamo).set({
      fechaFin,
    }).where(eq(Prestamo.id, id));

    return new Response(JSON.stringify({ status: 200, id: id }));
  } catch (error) {
    console.error("Error al guardar el préstamo:", error);
    return new Response(
      JSON.stringify({
        data: "Error al guardar el préstamo",
        status: 400,
      })
    );
  }
}
