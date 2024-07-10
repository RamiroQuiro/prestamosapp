import { Cuota, Pago, PagoParcial, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST({ params, request }) {
  const { idCuota } = params;
  const { data } = await request.json();
// console.log(data)
  try {
    // Buscar la cuota en la base de datos
    const cuotaFind = (
      await db.select().from(Cuota).where(eq(Cuota.id, idCuota))
    ).at(0);

    if (!cuotaFind) {
      return new Response(
        JSON.stringify({
          status: 404,
          data: "Cuota no encontrada",
        }),
        { status: 404 }
      );
    }

    // Verificar si la cuota ya está pagada
    if (cuotaFind.pagada) {
      return new Response(
        JSON.stringify({
          status: 405,
          data: "Cuota ya pagada",
        }),
        { status: 405 }
      );
    }

    // Sumar los montos de pagos parciales anteriores
    const pagosParcialesDeLaCuota = await db
      .select()
      .from(PagoParcial)
      .where(eq(PagoParcial.cuotaId, idCuota));
    const sumaPagosParciales = pagosParcialesDeLaCuota.reduce((acc, element) => {
      return acc + element.monto;
    }, 0);

    // Calcular el monto total pagado incluyendo el nuevo pago
    const montoTotalPagado = sumaPagosParciales + data.montoTotal;


    // console.log('esta es la cuotaFind',cuotaFind)
    // Verificar si el nuevo pago excede el monto total de la cuota
    if (montoTotalPagado >= cuotaFind.monto + (data.montoMora || 0)+1) {
      return new Response(
        JSON.stringify({
          status: 405,
          data: "El monto ingresado supera el monto restante de la cuota",
        }),
        { status: 405 }
      );
    }

    if (montoTotalPagado < cuotaFind.monto + (data.montoMora || 0)) {
      // Pago parcial
      try {
        await db.insert(PagoParcial).values({
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

        await db.update(Cuota).set({
          montoPagado: sumaPagosParciales + data.montoTotal,
          montoMora: data.montoMora || 0,
          mora: (data.montoMora || 0) > 0,
        }).where(eq(Cuota.id, idCuota));

        return new Response(
          JSON.stringify({
            status: 200,
            data: "Pago parcial registrado",
          }),
          { status: 200 }
        );
      } catch (error) {
        console.log(error);
        return new Response(
          JSON.stringify({
            status: 400,
            data: "Error al registrar el pago parcial y actualizar la cuota",
          }),
          { status: 400 }
        );
      }
    } else {
      // Pago completo
      try {
        await db.insert(Pago).values({
          id: generateId(15),
          cuotaId: idCuota,
          clienteId: cuotaFind.clienteId,
          prestamoId: cuotaFind.prestamoId,
          usuarioId: cuotaFind.usuarioId,
          fechaPago: new Date(),
          monto: data.montoTotal,
          lugarPago: "",
          estado: "Activo",
          metodoPago: data.metodoPago,
        });

        await db.update(Cuota).set({
          montoPagado: data.montoTotal,
          pagada: true,
          fechaPago: new Date(),
          montoMora: data.montoMora || 0,
          mora: (data.montoMora || 0) > 0,
        }).where(eq(Cuota.id, idCuota));

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
            data: "Error al registrar el pago completo y actualizar la cuota",
          }),
          { status: 400 }
        );
      }
    }
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
