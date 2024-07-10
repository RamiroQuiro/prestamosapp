import { Cliente, Cuota, db, eq, Pago, PagoParcial, Prestamo } from "astro:db";

export async function GET({ params }) {
    const { idCliente } = await params
    console.log(idCliente)

    try {

        const clienteFind = await db.select().from(Cliente).where(eq(Cliente.id, idCliente))
        const prestamosCliente = await db.select().from(Prestamo).where(eq(Prestamo.clienteId, idCliente))
        const pagosDelCliente = await db.select().from(Pago).where(eq(Pago.clienteId, idCliente))
        const pagosParciales = await db.select().from(PagoParcial).where(eq(PagoParcial.clienteId, idCliente))
        const cuotasCliente=await db.select().from(Cuota).where(eq(Cuota.clienteId,idCliente))
        const dataTotal = { cliente: clienteFind[0], prestamos: prestamosCliente, pagos: pagosDelCliente,cuotas:cuotasCliente, pagosParciales: pagosParciales }
        // console.log('este es el cliente encontrado',dataTotal)


        return new Response(
            JSON.stringify({
                data: dataTotal,
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