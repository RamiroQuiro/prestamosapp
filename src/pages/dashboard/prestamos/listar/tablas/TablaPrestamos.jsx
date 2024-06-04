import React, { useState } from 'react'
import Table from '../../../../../components/tablaComponentes/Table'
import FormularioDeBusqueda from '../../../../../components/organismos/FormularioDeBusqueda';
import useBusquedaFiltros from '../../../../../hook/useBusquedaFiltro';

export default function TablaPrestamos({
  arrayBody, enlaceFila
}) {
  const columnas = [
    {
      label: "cliente",
      id: 1,
      selector: 'cliente',
    },

    {
      label: "monto cuota",
      id: 3,
      selector: 'montoCuota',
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
      label: "fecha inicio",
      id: 6,
      selector: 'fechaInicio',
    },
    {
      label: "tasa interes",
      id: 7,
      selector: 'tasaInteres',
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

    // Actualizamos el estado de 'encontrado' con los resultados de la búsqueda
    setEncontrado(busquedaFiltros(arrayBody, e.target.value));
  }
  return (
    <div className="w-full overflow-x-auto">
   {/* filtros */}
   
      <input
        onChange={handleSearch}
        placeholder='Filtrar por nombre, activo o fecha...'
        value={search}
        type="search" name="busquedaCliente" id="busquedaCliente" className=' w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 my-3 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2' />

        {/* tabla */}
      <Table columnas={columnas} arrayBody={encontrado} enlaceFila={enlaceFila} client:load />
    </div>

  )
}
