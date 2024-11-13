import db from "@/db";
import { clientes as Cliente, cuotas as Cuota,prestamos as Prestamo} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET({ params }) {
  const { idPrestamo } = params;
  try {
  

    const prestamoCliente = await db
    .select({
      cliente: {
        nombre: Cliente.nombre,
        apellido: Cliente.apellido,
        dni: Cliente.dni,
        id: Cliente.id,
      },
      prestamo: {
        id: Prestamo.id,
        fechaInicio: Prestamo.fechaInicio,
        fechaFin: Prestamo.fechaFin,
        nCuotas: Prestamo.nCuotas,
        capital: Prestamo.capital,
        montoTotal: Prestamo.montoTotal,
        modalidad: Prestamo.modalidad,
        tasaInteres:Prestamo.tasaInteres,
      }
    })
    .from(Prestamo)
    .where(eq(Prestamo.id, idPrestamo))
    .innerJoin(Cliente, eq(Cliente.id, Prestamo.clienteId));
  
      //  console.log('prestamo encontrado ->',prestamoCliente)
    if (prestamoCliente.length == 0) {
      return new Response(
        JSON.stringify({
          status: 400,
          msg: "Préstamo no encontrado",
        }),
        { status: 400 }
      );
    }
    const cuotas = await db
      .select()
      .from(Cuota)
      .where(eq(Cuota.prestamoId, idPrestamo));

    return new Response(
      JSON.stringify({
        status: 200,
        data: {
          prestamo: prestamoCliente[0],
          cuotas: cuotas,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en la consulta de la base de datos:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        msg: "Error interno del servidor",
      }),
      { status: 500 }
    );
  }
}
