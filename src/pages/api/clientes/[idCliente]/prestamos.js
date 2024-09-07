import { Cliente, Cuota, db, eq, Pago, PagoParcial, Prestamo, User } from "astro:db";


export async function GET({ params }) {
    const { idCliente } = await params
    console.log(idCliente)

    try {
const prestamosDb=await db.select().from(Prestamo).where(eq(Prestamo.clienteId,idCliente))
// console.log(prestamosDb)
        return new Response(
            JSON.stringify({
                data: prestamosDb,
            })
        );
    } catch (error) {
        console.log(error)
        return new Response(
            JSON.stringify({
                data: "error",
            }, {
                code: 404
            })
        );
    }
}
