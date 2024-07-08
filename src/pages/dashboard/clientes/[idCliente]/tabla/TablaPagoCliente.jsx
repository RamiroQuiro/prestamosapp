import React, { useState } from 'react'
import Table from '../../../../../components/tablaComponentes/Table'
import { clienteSelect, pdfPrint } from '../../../../../context/store';
import { useStore } from '@nanostores/react';

export default function TablaPagoCliente({
    arrayBody, enlaceFila,usuario
  }) {

const $cliente=useStore(clienteSelect)
// console.log('tabla prestam client -->',$cliente)
    const columnas = [
        {
          label: "N°",
          id: 0,
          selector: 'numero',
        },
        {
          label: "ID Prestamo",
          id: 1,
          selector: 'idPrestamo',
        },
        {
          label: "f. Pago",
          id: 1,
          selector: 'fechaPago',
        },
        {
          label: "monto cuota",
          id: 2,
          selector: 'montoCuota',
        },
        {
          label: "monto Abonado",
          id: 5,
          selector: 'monto Abonado',
        },
        {
          label: "acciones",
          id: 8,
          selector: 'acciones'
        },
      ];
      pdfPrint.set({
        ...pdfPrint.get(),
        lorem: `  Cliente : ${$cliente?.nombre?.toUpperCase()} ${$cliente?.apellido?.toUpperCase()} - DNI: ${$cliente?.dni} \n  Fecha de Inicio : ${arrayBody?.fechaInicio} - Fecha Vencimiento : ${arrayBody?.fechaFin} \n N° de Cuotas : ${arrayBody?.nCuotas} - Modalidad : ${arrayBody?.modalidad} \n Capital : $${arrayBody?.capital} , Monto Total : $${arrayBody?.montoTotal}, \n ID del prestamos : ${arrayBody?.idPrestamo}`,
        headers: columnas.map(element => element.label),
        rows: arrayBody? arrayBody.map(obj => {
            let { id,  ...rest } = obj; // Excluye el campo 'id'
            return Object.values({ ...rest});  // Devuelve solo los valores del objeto
          }):[],
      })

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
    
