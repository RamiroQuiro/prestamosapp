import db from "@/db";
import {
cuotas as  Cuota,
pagos as  Pago,
} from "@/db/schema";
import { and, eq, gt, lte } from "drizzle-orm";

export async function GET({ params }) {
  const { idCliente } = await params;
  console.log(idCliente);

  try {
    // Obtener las cuotas no pagadas y con vencimiento más cercano o ya vencidas
    // Definir el rango de fechas
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7); // Ajusta los días según lo que necesites

    // Obtener las cuotas no pagadas con vencimiento en el futuro cercano
    const cuotasDB = await db
      .select()
      .from(Cuota)
      .where(
        and(
          eq(Cuota.clienteId, idCliente),
          eq(Cuota.pagada, false), // Filtrar por cuotas no pagadas
          gt(Cuota.fechaVencimiento, today), // Cuotas con vencimiento en el futuro
          lte(Cuota.fechaVencimiento, futureDate) // Cuotas con vencimiento dentro del rango de 7 días
        )
      )
      .orderBy(Cuota.fechaVencimiento, "asc"); // Ordenar por fecha de vencimiento más cercana
    console.log(cuotasDB);
    return new Response(
      JSON.stringify({
        data: cuotasDB,
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        {
          data: "error",
        },
        {
          code: 404,
        }
      )
    );
  }
}
