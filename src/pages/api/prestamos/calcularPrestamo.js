import { db, eq, User } from "astro:db";
import { evaluate } from "mathjs";

export async function POST({ request }) {
  const { usuarioId, importe, tasaInteres, nCuotas } = await request.json();


console.log({usuarioId,importe,tasaInteres,nCuotas})

  try {
    // Obtén el usuario para verificar si tiene una fórmula personalizada
    const usuario = (await db.select(User).from(User).where(eq(User.id,usuarioId))).at(0)
    
    // Definir fórmula por defecto (si no hay fórmula personalizada)
    let formula =
      usuario?.formulaPersonalizada ||
      "(capital * tasaInteres * (1 + tasaInteres) ^ cuotas) / ((1 + tasaInteres) ^ cuotas - 1)";

    // Preparar variables para evaluación
    const variables = {
      capital: importe,
      tasaInteres: tasaInteres / 100 / 12, // Convertir tasa de interés a decimal mensual
      cuotas: nCuotas,
    };

    // Evaluar la fórmula usando mathjs
    const montoCuota = evaluate(formula, variables);
    const montoTotal = montoCuota * nCuotas;
    const ganancia = montoTotal - importe;

    return new Response(
      JSON.stringify({
        montoCuota: parseFloat(montoCuota.toFixed(2)),
        montoTotal: parseFloat(montoTotal.toFixed(2)),
        ganancia: parseFloat(ganancia.toFixed(2)),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al calcular el préstamo:", error);
    return new Response(
      JSON.stringify({ message: "Error al calcular el préstamo" }),
      { status: 500 }
    );
  }
}
