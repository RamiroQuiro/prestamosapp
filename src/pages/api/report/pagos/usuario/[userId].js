import { and, db, eq, gte, lte, Pago } from "astro:db";

export async function GET({ params, props, request }) {
    const { userId } = await params;
    const startDate = request.headers.get("startDate");
    const endDate = request.headers.get("endDate");
      // Convertir las fechas a UTC
      const start = new Date(startDate);
      const end = new Date(endDate);
    
    // console.log("Endpoint de las cuotas", userId, end, start);
    try {
      const pagosFind = await db
        .select()
        .from(Pago)
        .where(
          and(
            eq(Pago.usuarioId, userId),
            gte(Pago.fechaPago, start),
            lte(Pago.fechaPago, end)
          )
        )
  
      // console.log('cuotas encontradas ->',pagosFind);
      return new Response(
        JSON.stringify({
          data: pagosFind,
        }),
        { status: 200 }
      );
    } catch (error) {
     console.log(error)
      return new Response(
        JSON.stringify({
          data: "hello andando men",
        })
      );
    }
  }
  