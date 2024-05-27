import { Prestamo, db, eq } from "astro:db"

export async function GET({params}) {

    const id=params
    try {
        const prestamosFind=await db.select().from(Prestamo).where(eq(Prestamo.id,id))
        if(prestamosFind.length==0){
            return Response(JSON.stringify({
                status:400,
                msg:"prestamo no entonrado"
            }))
        }

        return Response(JSON.stringify({
            status:200,
            data:prestamosFind
        }))
    } catch (error) {

        console.log(error)
        return Response(JSON.stringify({
            status:400,
            msg:"error por consolsa"
        }))
    }
   
}