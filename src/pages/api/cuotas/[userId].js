import db from "@/db";
import { clientes ,cuotas} from "@/db/schema";
import { and, eq, gt, lte } from "drizzle-orm";

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
          id: cuotas.id,
          prestamoId: cuotas.prestamoId,
          clienteId: cuotas.clienteId,
          fechaVencimiento: cuotas.fechaVencimiento,
          monto: cuotas.monto,
          numeroCuota: cuotas.numeroCuota,
          pagada: cuotas.pagada,
        },
        cliente: {
          nombre: clientes.nombre,
          apellido: clientes.apellido,
        },
      })
      .from(cuotas)
      .innerJoin(clientes, eq(cuotas.clienteId, clientes.id))
      .where(
        and(
          eq(cuotas.usuarioId,userId),
          eq(cuotas.pagada, false),
          gt(cuotas.fechaVencimiento, start),
          lte(cuotas.fechaVencimiento, end)
        )
      )
      .orderBy(cuotas.fechaVencimiento, "asc");

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
