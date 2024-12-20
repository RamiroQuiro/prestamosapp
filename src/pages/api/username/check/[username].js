// /pages/api/username/check.js

import { db, eq, User } from "astro:db";
import { exists } from "drizzle-orm";

export async function GET({ params }) {
    const { username } = await params;
const lowerCasee=username.toLowerCase()
    // Aquí debes conectar a la base de datos y verificar si el usuario ya existe
    // console.log("userName->", username)
    try {
        const disponibleUser = (await db.select({username:User.userName}).from(User).where(eq(lowerCasee, User.userName))).at(0)


        console.log(disponibleUser)
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
