import { and, between, Cuota, db, eq, gte, lte } from "astro:db";

export async function GET({ params, props, request }) {
  const { userId } = await params;
  const startDate = request.headers.get("startDate");
  const endDate = request.headers.get("endDate");

    // Convertir las fechas a UTC
    const start = new Date(startDate);
    const end = new Date(endDate);
  
  console.log("Endpoint de las cuotas", userId, end, start);
  try {
    const cuotasBD = await db
      .select()
      .from(Cuota)
      .where(
        and(
          eq(Cuota.usuarioId, userId),
          gte(Cuota.fechaVencimiento, start),
          lte(Cuota.fechaVencimiento, end)
        )
      )

    console.log('cuotas encontradas ->',cuotasBD);

    return new Response(
      JSON.stringify({
        data: cuotasBD,
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
