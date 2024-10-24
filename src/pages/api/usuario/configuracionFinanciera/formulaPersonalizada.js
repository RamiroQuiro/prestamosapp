import { db, eq, User } from "astro:db";

export async function PUT({ request }) {
  const { usuarioId, formula } = await request.json();

  console.log(usuarioId, "<- usuarioId , formula ->", formula);

  try {
    // Buscar el cliente y su fórmula personalizada
    const cliente = await db
      .update(User)
      .set({
        formulaPersonalizada: formula,
      })
      .where(User.id, usuarioId);

    console.log("cliente ->", cliente);
    return new Response(
      JSON.stringify({
        msg: "cambios efectuados",
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
