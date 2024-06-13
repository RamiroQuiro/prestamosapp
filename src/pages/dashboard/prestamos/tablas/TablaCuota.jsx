import React from 'react'
import Table from '../../../../components/tablaComponentes/Table'

export default function TablaCuota({arrayBody,enlaceFila}) {

    const columnas = [
        {
          label: "cuota",
          id: 1,
          selector: (row) =>console.log('hola men'),
        },
      
        {
          label: "F. Vencimiento",
          id: 3,
          selector: (row) =>{console.log(row.fechaVencimiento)},
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
