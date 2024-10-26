function simularCuotas({ cuotas, modalidad, nCuotas, fechaInicio ,tasaInteres},{clientSelect}) {
    const modalidadDias = Number(modalidad);
    const cuotasNew = [];
    let fechaVencimiento = new Date(fechaInicio);
  
    for (let i = 0; i < nCuotas; i++) {
      fechaVencimiento.setDate(fechaVencimiento.getDate() + modalidadDias);
      cuotasNew.push({
        nombreCliente:`${clientSelect.nombre} ${clientSelect.apellido}`,
        numeroCuota: i + 1,
        montoCuota: cuotas[i],
        fechaVencimiento: new Date(fechaVencimiento),
        tasaInteres:`${tasaInteres}%`
      });
    }
  
    return cuotasNew;
  }

  export default simularCuotas