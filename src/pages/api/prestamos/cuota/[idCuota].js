import { Cuota, Prestamo, db, eq } from "astro:db";

export async function PUT({ params }) {
    const { idCuota } = params;
    try {
        const cuotaFind = await db.update(Cuota)
            .set({ pagada: true }).where(eq(Cuota.id, idCuota))
        if (cuotaFind.length == 0) {
            return new Response(JSON.stringify({
                status: 400,
                msg: "cuota no encontrado"
            }), { status: 400 });
        }


        // queriendo cerrar el prestamo
//         // Obtén el id del préstamo asociado a la cuota
//         const cuotaFindex = await db.select().from(Cuota).where(eq(Cuota.id,idCuota))
//         const idPrestamo=cuotaFindex[0].prestamoId
//         console.log(idPrestamo)
//         // Cuenta cuántas cuotas no están pagadas para este préstamo
//         const cuotasNoPagadas = await db.select().from(Prestamo).where(eq(Prestamo.id, idPrestamo), eq(Cuota.pagada, false)).count();
// console.log('cuotas no pagadas',cuotasNoPagadas)
//         // Si no hay cuotas no pagadas, actualiza el estado del préstamo a 'cerrado'
//         if (cuotasNoPagadas == 0) {
//             await db.update(Prestamo).set({ estado: 'cerrado' }).where(eq(Prestamo.id, idPrestamo));
//         }
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
