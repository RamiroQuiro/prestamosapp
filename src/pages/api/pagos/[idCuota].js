import { Cuota, Pago, PagoParcial, Prestamo, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST({ params, request }) {
  const { idCuota } = params;
  const { data } = await request.json();

  console.log(data);

  try {
    // Buscar la cuota en la base de datos
    const cuotaFind =( await db
      .select()
      .from(Cuota)
      .where(eq(Cuota.id, idCuota))).at(0)
      

    if (!cuotaFind) {
      return new Response(
        JSON.stringify({
          status: 404,
          data: "Cuota no encontrada",
        }),
        { status: 404 }
      );
    }

    // Verificar si el monto total pagado es menor que el monto de la cuota
    if (data.montoTotal < cuotaFind.monto) {
      // Pago parcial
      try {
        const newPagoParcial = await db.insert(PagoParcial).values({
          id: generateId(15),
          cuotaId: idCuota,
          clienteId: cuotaFind.clienteId,
          prestamoId: cuotaFind.prestamoId,
          usuarioId: cuotaFind.usuarioId,
          fechaPago: new Date(),
          monto: data.montoTotal,
          lugarPago: "",
          metodoPago: data.metodoPago,
        });

        const updateCuota = await db
          .update(Cuota)
          .set({
            montoPagado: cuotaFind.montoPagado + data.montoTotal,
            montoMora: data.montoMora || 0,
            mora: data.montoMora > 0,
          })
          .where(eq(Cuota.id, idCuota));
      } catch (error) {
        console.log(error);
        return new Response(
          JSON.stringify({
            status: 400,
            data: "Error al registrar pago parcial y actualizar la cuota",
          }),
          { status: 400 }
        );
      }
    } else {
      // Pago completo
      try {
        const newPago = await db.insert(Pago).values({
          id: generateId(15),
          cuotaId: idCuota,
          clienteId: cuotaFind.clienteId,
          prestamoId: cuotaFind.prestamoId,
          usuarioId: cuotaFind.usuarioId,
          fechaPago: new Date(),
          monto: data.montoTotal,
          lugarPago: "",
          estado:'Activo',
          metodoPago: data.metodoPago,
        });

        const updateCuota = await db
          .update(Cuota)
          .set({
            montoPagado: data.montoTotal,
            pagada: true,
            fechaPago: new Date(),
            montoMora: data.montoMora || 0,
            mora: data.montoMora > 0,
          })
          .where(eq(Cuota.id, idCuota));
      } catch (error) {
        console.log(error);
        return new Response(
          JSON.stringify({
            status: 400,
            data: "Error al registrar el pago completo y actualizar la cuota",
          }),
          { status: 400 }
        );
      }
    }

    return new Response(
      JSON.stringify({
        status: 200,
        data: "Cuota cancelada",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        status: 400,
        data: "Error al procesar la solicitud",
      }),
      { status: 400 }
    );
  }
}
