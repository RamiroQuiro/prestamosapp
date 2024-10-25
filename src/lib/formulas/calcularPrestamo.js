function calcularCuota(importe, tasaInteres, nCuotas) {
    // Convertimos la tasa de interés a decimal y la dividimos entre 12 para obtener la tasa mensual
    let tasaMensual = tasaInteres / 100 / 12;

    // Calculamos el monto de cada cuota
    let cuota =
      importe * (tasaMensual / (1 - Math.pow(1 + tasaMensual, -nCuotas)));

    // calcular monto total a pagar
    let total = cuota * nCuotas;
    let montoTotal = parseFloat(total.toFixed(2));
    let montoCuota = parseFloat(cuota.toFixed(2));
    // console.log('monto cuota y monto total ->',montoCuota,montoTotal)
    return { montoCuota, montoTotal };
  }


  function calcularGanancia(importe, cuota, nCuotas) {
    // Calculamos el monto total del préstamo
    let totalPrestamo = cuota * nCuotas;

    // Calculamos la ganancia restando el monto original del préstamo al monto total del préstamo
    let ganancia = totalPrestamo - importe;

    // Redondeamos la ganancia a dos decimales
    ganancia = parseFloat(ganancia.toFixed(2));

    return ganancia;
  }

  export {calcularCuota,calcularGanancia}