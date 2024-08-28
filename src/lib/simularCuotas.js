function simularCuotas({ montoCuota, modalidad, nCuotas, fechaInicio ,tasaInteres},{clientSelect}) {
    const modalidadDias = Number(modalidad);
    const cuotas = [];
    let fechaVencimiento = new Date(fechaInicio);
  
    for (let i = 0; i < nCuotas; i++) {
      fechaVencimiento.setDate(fechaVencimiento.getDate() + modalidadDias);
      cuotas.push({
        nombreCliente:`${clientSelect.nombre} ${clientSelect.apellido}`,
        numeroCuota: i + 1,
        montoCuota: montoCuota,
        fechaVencimiento: new Date(fechaVencimiento),
        tasaInteres:`${tasaInteres}%`
      });
    }
  
    return cuotas;
  }

  export default simularCuotas