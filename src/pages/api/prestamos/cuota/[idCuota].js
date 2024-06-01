import { Cuota, db, eq } from "astro:db";

export async function PUT({ params }) {
    const { idCuota } = params;
    console.log(idCuota)
    try {
        const cuotaFind = await db.update(Cuota)
            .set({ pagada: true }).where(eq(Cuota.id, idCuota))
        if (cuotaFind.length == 0) {
            return new Response(JSON.stringify({
                status: 400,
                msg: "cuota no encontrado"
            }), { status: 400 });
        }


        return new Response(JSON.stringify({
            status: 200,
            data: 'cuota cancelada'
        }), { status: 200 });
    } catch (error) {
        console.error('Error en la consulta de la base de datos:', error);
        return new Response(JSON.stringify({
            status: 500,
            msg: "Error interno del servidor"
        }), { status: 500 });
    }
}
