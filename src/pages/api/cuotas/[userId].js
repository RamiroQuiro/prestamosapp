import { and, between, Cliente, Cuota, db, eq, gt, lte } from "astro:db";

export async function GET({ params, props, request }) {
  const { userId } = await params;
  const startDate = request.headers.get("startDate");
  const endDate = request.headers.get("endDate");

  // Convertir las fechas a UTC
  const start = new Date(startDate);
  const end = new Date(endDate);

  // console.log("Endpoint de las cuotas", userId, end, start);
  try {
    const cuotasDB = await db
      .select({
        cuota: {
          id: Cuota.id,
          prestamoId: Cuota.prestamoId,
          clienteId: Cuota.clienteId,
          fechaVencimiento: Cuota.fechaVencimiento,
          monto: Cuota.monto,
          numeroCuota: Cuota.numeroCuota,
          pagada: Cuota.pagada,
        },
        cliente: {
          nombre: Cliente.nombre,
          apellido: Cliente.apellido,
        },
      })
      .from(Cuota)
      .innerJoin(Cliente, eq(Cuota.clienteId, Cliente.id))
      .where(
        and(
          eq(Cuota.usuarioId,userId),
          eq(Cuota.pagada, false),
          gt(Cuota.fechaVencimiento, start),
          lte(Cuota.fechaVencimiento, end)
        )
      )
      .orderBy(Cuota.fechaVencimiento, "asc");

    const cuotasSinPagar = cuotasDB.filter((cuota) => cuota.pagada == false);
    // console.log('cuotas encontradas ->',cuotasDB);
    return new Response(
      JSON.stringify({
        data: cuotasDB,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        data: "hello andando men",
      })
    );
  }
}
