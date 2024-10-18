// /pages/api/username/check.js

import { db, eq, User } from "astro:db";

export async function GET({ params }) {
    const { username } = await params;

    // Aquí debes conectar a la base de datos y verificar si el usuario ya existe
    // console.log("userName->", username)
    try {
        const disponibleUser = (await db.select().from(User).where(eq(username, User.userName))).at(0)

        if (disponibleUser) {

            return new Response(JSON.stringify({
                data: 'Nombre no disponible',
                isAvailable:false
            }))

        } else {
            return new Response(JSON.stringify({
                data: 'Nombre disponible',
                isAvailable:true
            }))
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            data: 'error al consultar en base de datos'
        }))
    }
}
