import { Cuota, db, eq } from "astro:db";

export async function GET({ params }) {
  const { userId } = await params;
  console.log("endoppoint de la cuotas", userId);
  try {
    const cuotasBD = await db
      .select()
      .from(Cuota)
      .where(eq(Cuota.usuarioId, userId));
    console.log(cuotasBD);
  } catch (error) {}

  return new Response(
    JSON.stringify({
      data: "hello andando men",
    })
  );
}
