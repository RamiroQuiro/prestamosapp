import React from 'react'
import Table from '../../../../components/tablaComponentes/Table'
import { pdfPrint } from '../../../../context/store';

export default function TablaCuota({ arrayBody, enlaceFila, idPrestamo }) {

  console.log('array de tabla cuta react island ->', arrayBody)
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

    title: `Cliente Rama Quiroga - Detalle de Prestamo`,
    subtitle: `ID del prestamos : ${idPrestamo}`,
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
