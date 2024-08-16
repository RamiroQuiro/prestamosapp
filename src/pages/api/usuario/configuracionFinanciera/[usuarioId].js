import { Cliente, Cuota, db, eq, Intereses, moraCuota, nCuotas, Pago, PagoParcial, Prestamo, User } from "astro:db";
import { generateId } from "lucia";

// export async function GET({ params }) {
//     const { usuarioId } = await params
//     console.log(usua)

//     try {

//        const usuarioDB=(await db.select().from(Intereses).where(eq(User.id,usuarioId))).at(0)
//        if (!usuarioDB) {
//         return new Response(
//             JSON.stringify({
//           msg:'no se encontro el usuario'
//             },{
//                 status:400
//             })
//         );    
//        }

//         return new Response(
//             JSON.stringify({
//                 data: dataTotal,
//             })
//         );
//     } catch (error) {
//         console.log(error)
//         return new Response(
//             JSON.stringify({
//                 data: "error",
//             }, {
//                 code: 404
//             })
//         );
//     }
// }

export async function POST({params,request}){
const data=await request.json()
const {usuarioId}=params
    console.log(data)

    data.fechaActualizacion=new Date()
    
    try {
        const id = generateId(15);
        console.log(id)
        const updateUser=await db.insert(Intereses).values({
            id,
            interes:data.interes,
            usuarioId
        })
       

        
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