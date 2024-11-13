import db from "@/db";
import { prestamos } from "@/db/schema/prestamos.sql";
import { eq } from "drizzle-orm";


export async function GET({ params }) {
    const { idCliente } = await params
    // console.log(idCliente)

    try {
const prestamosDb=await db.select().from(prestamos).where(eq(prestamos.clienteId,idCliente))
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
