import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
    const { usuarioId } = await params

    try {

       const usuarioDB=(await db.select().from(users).where(eq(users.id,usuarioId))).at(0)


       if (!usuarioDB) {
        return new Response(
            JSON.stringify({
          msg:'no se encontro el usuario'
            },{
                status:400
            })
        );    
       }

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
const {usuarioId}=params
    // console.log(data)
    delete data.fechaCreacion

    data.fechaActualizacion=new Date()
    
    try {

        const updateUser=await db.update(users).set(data)
        .where(eq(users.id, usuarioId));

        
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