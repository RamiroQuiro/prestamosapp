import {
  Cliente,
  Cuota,
  db,
  eq,
  Intereses,
  moraCuota,
  nCuotas,
  Pago,
  PagoParcial,
  Prestamo,
  User,
} from "astro:db";
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

export async function PUT({ params, request }) {
  const data = await request.json();
  const { usuarioId } = params;

  console.log(data);
  try {
    if (data.mora) {
      const id = generateId(15);
      const updateUser = await db.update(moraCuota).set({
        value: data.mora,
      });
    }
    if (data.interes) {
      // Primero, actualizar todos los registros del usuario a false
      await db
        .update(Intereses)
        .set({
          selectDefault: false,
        })
        .where(eq(Intereses.usuarioId, data.data.usuarioId)); // Asumiendo que tienes un campo usuarioId en Intereses

      // Luego, actualizar el registro específico a true
      const updateUser = await db
        .update(Intereses)
        .set({
          selectDefault: true,
        })
        .where(eq(Intereses.id, data.data.id));
    }

    return new Response(
      JSON.stringify({
        msg: "cambios efectuados",
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        {
          data: "error",
        },
        {
          code: 404,
        }
      )
    );
  }
}
export async function POST({ params, request }) {
  const data = await request.json();
  const { usuarioId } = params;

  try {
    if (data.interes) {
      const id = generateId(15);
      const updateUser = await db.insert(Intereses).values({
        id,
        value: data.interes,
        usuarioId,
      });
    }
    if (data.mora) {
      const id = generateId(15);
      const updateUser = await db.insert(moraCuota).values({
        id,
        value: data.mora,
        usuarioId,
      });
    }
    if (data.nCuotas) {
      const id = generateId(15);
      const updateUser = await db.insert(nCuotas).values({
        id,
        value: data.nCuotas,
        usuarioId,
      });
    }

    return new Response(
      JSON.stringify({
        msg: "cambios efectuados",
      })
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        {
          data: "error",
        },
        {
          code: 404,
        }
      )
    );
  }
}

export async function DELETE({ request, params }) {
  const { data } = await request.json();
  const { usuarioId } = params;

  console.log(data);

  try {
    if (data.interes) {
      const id = generateId(15);
      const updateUser = await db
        .delete(Intereses)
        .where(eq(Intereses.id, data.id));
    }
    if (data.mora) {
      const id = generateId(15);
      const updateUser = await db
        .delete(moraCuota)
        .where(eq(moraCuota.id, data.id));
    }
    if (data.nCuota) {
      const id = generateId(15);
      const updateUser = await db
        .delete(nCuotas)
        .where(eq(nCuotas.id, data.id));
    }

    return new Response(
      JSON.stringify({
        msg: "cambios efectuados",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        msg: "cambios efectuados",
      })
    );
  }
}
