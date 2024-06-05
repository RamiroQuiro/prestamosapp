import { Cliente, Cuota, Prestamo, db, eq } from "astro:db"

export async function GET({params}) {
    const {idPrestamo} = params;
    try {
        const prestamosFind = await db.select()
        .from(Prestamo)
        .where(eq(Prestamo.id, idPrestamo))
        .innerJoin(Cliente,eq(Cliente.id,Prestamo.clienteId))
    //    console.log('prestamo encontrado ->',prestamosFind)
        if (prestamosFind.length == 0) {
            return new Response(JSON.stringify({
                status: 400,
                msg: "Préstamo no encontrado"
            }), { status: 400 });
        }
        const cuotas = await db.select()
        .from(Cuota)
        .where(eq(Cuota.prestamoId, idPrestamo))

        return new Response(JSON.stringify({
            status: 200,
            data: {
                prestamo: prestamosFind[0],
                cuotas: cuotas
            }
        }), { status: 200 });
    } catch (error) {
        console.error('Error en la consulta de la base de datos:', error);
        return new Response(JSON.stringify({
            status: 500,
            msg: "Error interno del servidor"
        }), { status: 500 });
    }
}
