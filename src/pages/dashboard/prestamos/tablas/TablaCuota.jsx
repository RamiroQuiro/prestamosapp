import React from 'react'
import Table from '../../../../components/tablaComponentes/Table'
import { pdfPrint } from '../../../../context/store';

export default function TablaCuota({ arrayBody, enlaceFila, idPrestamo ,cliente,prestamo}) {

  let arrayPdf = [...arrayBody]
  const columnas = [
    {
      label: "cuota",
      id: 1,
      selector: (row) => console.log('hola men'),
    },

    {
      label: "F. Vencimiento",
      id: 3,
      selector: (row) => { console.log(row.fechaVencimiento) },
    },
    {
      label: "importe de cuota",
      id: 4,
      selector: (row) => row.monto,
    },
    {
      label: "estado",
      id: 5,
      selector: (row) => row.pagada,
    },

  ];

  pdfPrint.set({
    ...pdfPrint.get(),
    lorem: `  Cliente : ${cliente?.nombre?.toUpperCase()} ${cliente?.apellido?.toUpperCase()} - DNI: ${cliente?.dni} \n  Fecha de Inicio : ${prestamo?.fechaInicio} - Fecha Vencimiento : ${prestamo?.fechaFin} \n N° de Cuotas : ${prestamo?.nCuotas} - Modalidad : ${prestamo?.modalidad} \n Capital : $${prestamo?.capital} , Monto Total : $${prestamo?.montoTotal}, \n ID del prestamos : ${idPrestamo}`,
    headers: columnas.map(element => element.label),
    rows: arrayPdf.map(obj => {

      let { id, ...rest } = obj; // Excluye el campo 'id'

      return Object.values({ ...rest });  // Devuelve solo los valores del objeto
    })
  })

  return (

    <div class="flex items-center justify-center overflow-x-auto">
      <Table
        columnas={columnas}
        arrayBody={arrayBody}
        enlaceFila={enlaceFila}
        client:load
      />
    </div>
  )
}
