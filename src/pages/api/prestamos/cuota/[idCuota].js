import { Cuota, Pago, Prestamo, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function PUT({ params }) {
  const { idCuota } = params;
  try {

    
    const cuotaFind = await db
      .update(Cuota)
      .set({ pagada: true, fechaPago: new Date() })
      .where(eq(Cuota.id, idCuota));



    // queriendo cerrar el prestamo
    // Obtén el id del préstamo asociado a la cuota
    const cuotaFindex = (
      await db.select().from(Cuota).where(eq(Cuota.id, idCuota)).innerJoin(Prestamo, eq(Prestamo.id, Cuota.prestamoId))
    ).at(0);

    const pagoId=generateId(20)
    // crear dato en tabla de PAGO

    await db.insert(Pago).values({
      id: pagoId,
      clienteId: cuotaFindex.Prestamo.clienteId,
      prestamoId: cuotaFindex.Prestamo.id,
      usuarioId: cuotaFindex.Prestamo.usuarioId,
      cuotaId:cuotaFindex.Cuota.id,
      monto: cuotaFindex.Cuota.monto,
      estado: cuotaFindex.Prestamo.estado,
      fechaPago: new Date(),
      lugarPago:'fisico',
      metodoPago:'efectivo'
    })



    // Cuenta cuántas cuotas no están pagadas para este préstamo
    const cuotasPrestamo = await db
      .select()
      .from(Cuota)
      .where(eq(Cuota.prestamoId, cuotaFindex.Prestamo.id));
    //         // Si no hay cuotas no pagadas, actualiza el estado del préstamo a 'cerrado'
    const isPrestamoTerminado = cuotasPrestamo.some(
      (element) => element.pagada == false
    );
    if (!isPrestamoTerminado) {
      await db
        .update(Prestamo)
        .set({ estado: "cerrado" })
        .where(eq(Prestamo.id, cuotaFindex.Prestamo.id));
    }
    return new Response(
      JSON.stringify({
        status: 200,
        data: "cuota cancelada",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la consulta de la base de datos:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        msg: "Error interno del servidor",
      }),
      { status: 500 }
    );
  }
}
