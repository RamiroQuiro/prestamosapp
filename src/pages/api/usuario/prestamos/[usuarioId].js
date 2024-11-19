import db from "@/db";
import {
  prestamos as Prestamo,
  clientes as Cliente,
  pagos as Pago,
} from "@/db/schema";
import { and, between, eq, sql } from "drizzle-orm";

export async function GET({ params }) {
  const { usuarioId } = params;

  try {
    // Verificar si el usuario tiene préstamos
    const prestamosFind = await db
      .select({
        id: Prestamo.id,
        montoTotal: Prestamo.montoTotal,
        fechaInicio: Prestamo.fechaInicio,
      })
      .from(Prestamo)
      .where(eq(Prestamo.usuarioId, usuarioId))
      .innerJoin(Cliente, eq(Cliente.id, Prestamo.clienteId));
    if (prestamosFind.length === 0) {
      return new Response(
        JSON.stringify({
          status: 400,
          msg: "Préstamo no encontrado",
        }),
        { status: 400 }
      );
    }

    // Generar una lista de los últimos seis meses, incluyendo el mes actual
    const lastSixMonths = [];
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const mes = date.toISOString().slice(0, 7); // Formato 'YYYY-MM'
      lastSixMonths.push(mes);
    }

    const fechas = await db
      .select({
        fechaInicio: Prestamo.fechaInicio,
      })
      .from(Prestamo)
      .where(eq(Prestamo.usuarioId, usuarioId))
      .limit(5);

    // Consulta para obtener el capital prestado por mes en los últimos seis meses
    const capitalPorMes = await db.select({
        mes: Prestamo.fechaInicio,
        capitalPrestado: sql`SUM(${Prestamo.montoTotal})`.as("capitalPrestado"),
      })
      .from(Prestamo)
      .where(
        eq(Prestamo.usuarioId, usuarioId),
        sql`${Prestamo.fechaInicio} >= date('now', '-5 months', 'start of month')`
      )
      .groupBy("mes")
      .orderBy("mes", "asc");

    // const capitalPorMes = await db
    //   .select({
    //     mes: Prestamo.fechaInicio,
    //     capitalPrestado: Prestamo.capital,
    //   })
    //   .from(Prestamo)
    //   .where(and(
    //     eq(Prestamo.usuarioId, usuarioId),
    //     between(Prestamo.fechaInicio,new Date(lastSixMonths[0]), new Date(lastSixMonths[5]))
    //   ));
      
    console.log("capital por mes", capitalPorMes);
    // Consulta para obtener los cobros por mes en los últimos seis meses
    const cobrosPorMes = await db
      .select({
        mes: Pago.fechaPago,
        totalCobrado: sql`SUM(${Pago.monto})`.as("totalCobrado"),
      })
      .from(Pago)
      .where(
        eq(Pago.usuarioId, usuarioId),
        sql`${Pago.fechaPago} >= date('now', '-5 months', 'start of month')`
      )
      .groupBy("mes")
      .orderBy("mes", "asc");

        
    console.log("cobros por mes", cobrosPorMes);
    // Crear mapas para acceder rápidamente a los datos
    const capitalMap = new Map();
    capitalPorMes.forEach((item) => {
      const date = new Date(item.mes);
      const mes = date.toISOString().slice(0, 7); // Formato 'YYYY-MM'
      capitalMap.set(mes, item.capitalPrestado);
    });
    const cobrosMap = new Map();
    cobrosPorMes.forEach((item) => {
      const date = new Date(item.mes);
      const mes = date.toISOString().slice(0, 7); // Formato 'YYYY-MM'
      cobrosMap.set(mes, item.totalCobrado);
    });

    // Asegurar que todos los últimos seis meses estén presentes
    const capitalPorMesFinal = lastSixMonths.map((mes) => ({
      mes,
      capitalPrestado: capitalMap.get(mes) || 0,
    }));

    const cobrosPorMesFinal = lastSixMonths.map((mes) => ({
      mes,
      totalCobrado: cobrosMap.get(mes) || 0,
    }));

    return new Response(
      JSON.stringify({
        status: 200,
        data: {
          capitalPorMes: capitalPorMesFinal,
          cobrosPorMes: cobrosPorMesFinal,
        },
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
