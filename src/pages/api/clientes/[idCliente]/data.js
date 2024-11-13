import db from "@/db"
import { clientes } from "@/db/schema/clientes.sql"
import { cuotas } from "@/db/schema/cuota.sql"
import { pagos } from "@/db/schema/pagos.sql"
import { pagoParciales } from "@/db/schema/pagosParcial.sql"
import { eq } from "drizzle-orm"

export async function GET({ params }) {
    const { idCliente } = await params
    console.log(idCliente)

    try {

        const clienteFind = await db.select().from(clientes).where(eq(clientes.id, idCliente))
        const prestamosCliente = await db.select().from(prestamos).where(eq(prestamos.clienteId, idCliente))
        const pagosDelCliente = await db.select().from(pagos).where(eq(pagos.clienteId, idCliente))
        const pagosParciales = await db.select().from(pagoParciales).where(eq(pagoParciales.clienteId, idCliente))
        const cuotasCliente=await db.select().from(cuotas).where(eq(Cuota.clienteId,idCliente))
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

export async function PUT({params,request}){
const data=await request.json()
const {idCliente}=params
    // console.log(data)
    delete data.fechaCreacion

    data.fechaActualizacion=new Date()
    
    try {

        const updateUser=await db.update(Cliente).set(data)
        .where(eq(Cliente.id, idCliente));

        
        return new Response(
            JSON.stringify({
                msg:'cambios efectuados',
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