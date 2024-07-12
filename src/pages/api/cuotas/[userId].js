import { between, Cuota, db, eq } from "astro:db";

export async function GET({ params, props, request }) {
  const { userId } = await params;
  const startDate = request.headers.get("startDate");
  const endDate = request.headers.get("endDate");

  console.log("Endpoint de las cuotas", userId, startDate, endDate);
  try {
    const cuotasBD = await db
      .select()
      .from(Cuota)
      .where(
        eq(Cuota.usuarioId, userId),
        between(Cuota.fecha, new Date(startDate), new Date(endDate))
      );

    console.log(cuotasBD);

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
