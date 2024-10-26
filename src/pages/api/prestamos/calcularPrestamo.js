import { db, eq, User } from "astro:db";
import { evaluate } from "mathjs";

export async function POST({ request }) {
  const { usuarioId, importe, tasaInteres, nCuotas } = await request.json();

  try {
    // Obtén el usuario para verificar si tiene una fórmula personalizada
    const { formulaPersonalizada } = (await db.select({ formulaPersonalizada: User.formulaPersonalizada }).from(User).where(eq(User.id, usuarioId))).at(0);
    // console.log('formula personalizada del usuario ->', formulaPersonalizada)
    // Definir fórmula por defecto si no hay fórmula personalizada
    let formula = formulaPersonalizada || "(capital / nCuotas) + (capital - ((n - 1) * (capital / nCuotas))) * tasaInteres";

    // Preparar variables comunes para evaluación
    const tasaInteresDecimal = tasaInteres / 100 / 12; // Convertir tasa de interés a decimal mensual
    let montoTotal = 0;
    let cuotasArray = [];
    let saldoPendiente = importe; // Inicializar saldo pendiente con el capital inicial

    // Calcular cada cuota de forma individual y acumular el monto total
    for (let i = 1; i <= nCuotas; i++) {
      const variables = {
        capital: importe,
        tasaInteres: tasaInteresDecimal,
        cuotas:nCuotas,
        n: i, // Número de la cuota actual
        saldoPendiente, // Usado en fórmulas que requieren el saldo pendiente
      };;


      // Evaluar la fórmula para la cuota actual
      let montoCuota;
      try {
        montoCuota = evaluate(formula, variables);
      } catch (evalError) {
        console.error("Error al evaluar la fórmula:", evalError);
        return new Response(JSON.stringify({ message: "Error en la fórmula personalizada" }), { status: 500 });
      }

      // Guardar la cuota calculada y acumular el monto total
      cuotasArray.push(parseFloat(montoCuota.toFixed(2)));
      montoTotal += montoCuota;
      // Actualizar saldo pendiente si el método requiere amortización del capital
      saldoPendiente -= montoCuota - (saldoPendiente * tasaInteresDecimal); // Reducir saldo según cuota amortizada


      console.log("Resultado de la fórmula para cuota", i, ":", montoCuota);
    }

    const ganancia = montoTotal - importe;

    return new Response(
      JSON.stringify({
        cuotas: cuotasArray,
        montoTotal: parseFloat(montoTotal.toFixed(2)),
        ganancia: parseFloat(ganancia.toFixed(2)),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error general al calcular el préstamo:", error);
    return new Response(
      JSON.stringify({ message: "Error general al calcular el préstamo" }),
      { status: 500 }
    );
  }
}
