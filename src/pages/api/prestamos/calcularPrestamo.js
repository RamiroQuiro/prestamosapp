import { and, db, eq, Intereses, User } from "astro:db";
import { evaluate } from "mathjs";

export async function POST({ request }) {
    const { usuarioId, importe, tasaInteres, nCuotas, modalidad } = await request.json();
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

        const formula = result?.formulaPersonalizada || "(capital * ((tasaInteres / 100 / 12) * (1 + tasaInteres / 100 / 12) ^ cuotas)) / ((1 + tasaInteres / 100 / 12) ^ cuotas - 1)";
        const tasaInteresDecimal = tasaInteres || result?.tasaInteress || 0.05;
        
        const diasModalidad = modalidad || 30; // Define modalidad en días (ej: 7 para semanal, 15 quincenal, 30 mensual)
        const fechaInicio = new Date(); // La fecha inicial para el cálculo de vencimientos

        let montoTotal = 0;
        let cuotasArray = [];
        let saldoPendiente = importe;

        // Calcular cada cuota de forma individual, acumular el monto total y calcular fecha de vencimiento
        for (let i = 1; i <= nCuotas; i++) {
            const variables = {
                capital: importe,
                tasaInteres: tasaInteresDecimal,
                cuotas: nCuotas,
                n: i,
                saldoPendiente,
            };

            let montoCuota;
            try {
                montoCuota = evaluate(formula, variables);
            } catch (evalError) {
                console.error("Error al evaluar la fórmula:", evalError);
                return new Response(JSON.stringify({ message: "Error en la fórmula personalizada" }), { status: 500 });
            }

            // Calcular la fecha de vencimiento de la cuota actual
            const fechaVencimiento = new Date(fechaInicio);
            fechaVencimiento.setDate(fechaInicio.getDate() + diasModalidad * i);

            cuotasArray.push({
                montoCuota: parseFloat(montoCuota.toFixed(2)),
                fechaVencimiento: fechaVencimiento.toISOString().split("T")[0], // Formato de fecha simplificado
            });

            montoTotal += montoCuota;
            saldoPendiente -= saldoPendiente / nCuotas; // Amortización del saldo
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
