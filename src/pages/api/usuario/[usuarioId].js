import { Cliente, Cuota, db, eq, Pago, PagoParcial, Prestamo, User } from "astro:db";

export async function GET({ params }) {
    const { usuarioId } = await params
    console.log(usua)

    try {

       const usuarioDB=(await db.select().from(User).where(eq(User.id,usuarioId))).at(0)
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
    console.log(data)
    delete data.fechaCreacion

    data.fechaActualizacion=new Date()
    
    try {

        const updateUser=await db.update(User).set(data)
        .where(eq(User.id, usuarioId));

        
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