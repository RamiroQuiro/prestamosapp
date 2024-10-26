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
      montoCuota: cuotas[0],  // Asigna el monto de la primera cuota
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
    let fechaVencimiento = new Date(now);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + modalidadDias);

    let fechaFin;

    // Insertar cada cuota con su fecha de vencimiento y monto precalculado
    for (let i = 0; i < nCuotas; i++) {
      const cuotaId = generateId(15);

      // Guardar la fecha de vencimiento de la última cuota
      if (i === nCuotas - 1) {
        fechaFin = new Date(fechaVencimiento);
      }

      await db.insert(Cuota).values({
        id: cuotaId,
        prestamoId: id,
        usuarioId,
        clienteId,
        numeroCuota: i + 1,
        fechaVencimiento,
        monto: parseFloat(cuotas[i].toFixed(2)),  // Usar la cuota calculada recibida
        pagada: false,
      });

      // Actualizar fecha para la siguiente cuota
      fechaVencimiento.setDate(fechaVencimiento.getDate() + modalidadDias);
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
