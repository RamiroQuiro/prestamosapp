import { and, db, eq, Intereses, User } from "astro:db";
import { evaluate } from "mathjs";

export async function POST({ request }) {
    const { usuarioId, importe, tasaInteres, nCuotas } = await request.json();
    try {
        // Obtén la fórmula personalizada y la tasa de interés del usuario
        const result = (await db
            .select({
                formulaPersonalizada: User.formulaPersonalizada,
                tasaInteress: Intereses.value,
            })
            .from(User)
            .innerJoin(
                Intereses,
                and(eq(Intereses.usuarioId, usuarioId), eq(Intereses.selectDefault, true))
            )
            .where(eq(User.id, usuarioId))
        ).at(0);

        // Configura la fórmula y la tasa de interés predeterminadas si no se encuentran en la base de datos
        const formula = result?.formulaPersonalizada || "(capital * ((tasaInteres / 100 / 12) * (1 + tasaInteres / 100 / 12) ^ cuotas)) / ((1 + tasaInteres / 100 / 12) ^ cuotas - 1)";
        const tasaInteresDecimal = tasaInteres || result?.tasaInteress || 0.05; // Tasa predeterminada de ejemplo (5%)

        let montoTotal = 0;
        let cuotasArray = [];
        let saldoPendiente = importe; // Inicializar saldo pendiente con el capital inicial

        // Calcular cada cuota de forma individual y acumular el monto total
        for (let i = 1; i <= nCuotas; i++) {
            const variables = {
                capital: importe,
                tasaInteres: tasaInteresDecimal,
                cuotas: nCuotas,
                n: i, // Número de la cuota actual
                saldoPendiente, // Usado en fórmulas que requieren el saldo pendiente
            };

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
            saldoPendiente -= saldoPendiente / nCuotas; // Reducir saldo según cuota amortizada

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
