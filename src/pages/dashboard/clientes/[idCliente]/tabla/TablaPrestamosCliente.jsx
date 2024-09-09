import React, { useState } from 'react'
import Table from '../../../../../components/tablaComponentes/Table'
import { clienteSelect, pdfPrint } from '../../../../../context/store';
import { useStore } from '@nanostores/react';

export default function TablaPrestamosCliente({
    arrayBody, enlaceFila,usuario
  }) {

const $cliente=useStore(clienteSelect)
    const columnas = [
        {
          label: "f. Inicio",
          id: 1,
          selector: 'fechaInicio',
        },
    
        {
          label: "F. vencimiento",
          id: 6,
          selector: 'fechaVencimiento',
        },
        {
          label: "monto cuota",
          id: 3,
          selector: 'montoCuota',
        },
        {
            label: "tasa interes",
            id: 7,
            selector: 'tasaInteres',
        },
        {
          label: "N° cuotas",
          id: 4,
          selector: 'nCuotas',
        },
        {
          label: "total",
          id: 5,
          selector: 'total',
        },
        {
          label: "estado",
          id: 8,
          selector: 'estado'
        },
      ];


      const [search, setSearch] = useState('')
      const [encontrado, setEncontrado] = useState(arrayBody)
    
      const busquedaFiltros = (arr, search) => {
        // Filtramos el array basándonos en la búsqueda
        const encontrado = arr?.filter((leg) => {
          // Comprobamos si cada campo coincide con la búsqueda
          let busquedaNombre = leg.cliente?.toUpperCase().includes(search?.toUpperCase());
    
          let email = leg.email?.toUpperCase().includes(search?.toUpperCase());
          let estado = leg.estado?.toUpperCase().includes(search?.toUpperCase());
          let fechaInicio = leg.fechaInicio?.toUpperCase().includes(search?.toUpperCase());
    
          // Si alguno de los campos coincide y el elemento está activo, lo retornamos
          if (busquedaNombre || email || estado) {
            // if (leg.activo == true) {
            return leg;
            // }
          }
        });
    
        // Retornamos los elementos encontrados
        return encontrado;
      }
      const handleSearch = (e) => {
        // Actualizamos el estado de 'search'
        setSearch(e.target.value);
    // console.log(search)
        // Actualizamos el estado de 'encontrado' con los resultados de la búsqueda
        setEncontrado(busquedaFiltros(arrayBody, e.target.value));
      }
    return (
        <div className="w-full ">

     
            {/* tabla */}
          <Table columnas={columnas} arrayBody={arrayBody} enlaceFila={enlaceFila} client:load />
        </div>
    
      )
    }
    
