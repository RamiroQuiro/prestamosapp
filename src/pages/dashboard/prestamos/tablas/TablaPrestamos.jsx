import React, { useState } from 'react'
import Table from '../../../../components/tablaComponentes/Table'
import { pdfPrint } from '../../../../context/store';
export default function TablaPrestamos({
  arrayBody, enlaceFila,usuario
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
      label: "F. vencimiento",
      id: 6,
      selector: 'fechaVencimiento',
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
  pdfPrint.set({...pdfPrint.get(),
    lorem:`Usuario : ${usuario.userName} | ${usuario.nombre} ${usuario.apellido} \n Email : ${usuario.email} \n ID usuario : ${usuario.id}`,
    subtitle:'Tus Prestamos',
    headers:columnas.map(element=>element.label),
    rows:arrayBody? arrayBody.map(obj => {
      let { id,  ...rest } = obj; // Excluye el campo 'id'
      return Object.values({ ...rest});  // Devuelve solo los valores del objeto
    }):[],
    fontSizeTable:8
  })


console.log('props prestramos',usuario)

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
