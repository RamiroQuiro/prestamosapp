import React, { useEffect, useState } from 'react'
import Table from '../tablaComponentes/Table'

export default function ContenedorFormularioPagar({ userId, clientes }) {

    const [loading, setLoading] = useState(false)
    const [encontrado, setEncontrado] = useState([])
    const [arrayBody, setArrayBody] = useState([])
    // console.log($clienteSelect)
    const startDate = new Date();
    const endDate = new Date(); // Crear una nueva fecha basada en la actual

    endDate.setDate(startDate.getDate() + 7); // Sumar 7 días a la fecha actual

    useEffect(() => {

        const fetchinv = async () => {
            setLoading(true)
            try {
                const consultaFetch = await fetch(`/api/cuotas/${userId}`,
                    {
                        method: 'GET',
                        headers: {
                            'startDate': startDate,
                            'endDate': endDate
                        }
                    })
                const data = await consultaFetch.json()
                let arrayBody = data.data?.map((element) => {

                    const date = new Date(element.cuota.fechaVencimiento)
                    return {
                        href: `/dashboard/prestamos/${element.cuota.prestamoId}/cuota/${element?.cuota?.id}`,
                        nameCliente: `${element?.cliente?.nombre} ${element?.cliente?.apellido}`,
                        id: element?.cuota?.id,
                        //   cliente: element?.Cliente.nombre + ' '+ element?.Cliente.apellido,
                        montoCuota: `$ ${element?.cuota?.monto}`,
                        nCuotas: element?.cuota?.numeroCuota,
                        fechaVencimiento: date.toLocaleDateString(),
                    };
                });
                setArrayBody(arrayBody)
                setEncontrado(arrayBody)
                setLoading(true)
                // console.log(data)
            } catch (error) {
                console.log(error)
                setLoading(true)
            }

        }
        fetchinv()
    }, [])



    const columnas = [
        {
            label: "Cliente",
            id: 1,
        },
        {
            label: "importe de cuota",
            id: 4,
        },
        {
            label: "N Cuota",
            id: 2,
        },

        {
            label: "F. Vencimiento",
            id: 3,
        },



    ];

    const [search, setSearch] = useState('')

    const busquedaFiltros = (arr, search) => {
        // Filtramos el array basándonos en la búsqueda
        const encontrado = arr?.filter((leg) => {
            // Comprobamos si cada campo coincide con la búsqueda
            let busquedaNombre = leg.cliente?.toUpperCase().includes(search?.toUpperCase());

            let dni = leg.dni?.includes(search);

            // Si alguno de los campos coincide y el elemento está activo, lo retornamos
            if (busquedaNombre || dni) {
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
       setEncontrado(busquedaFiltros(arrayBody, e.target.value))
        // Actualizamos el estado de 'encontrado' con los resultados de la búsqueda
    }

    return (
        <div className='w-full flex flex-col items-start justify-normal '>
            <input
                onChange={handleSearch}
                placeholder='Filtrar por nombre de cliente...'
                value={search}
                type="search" name="busquedaCliente" id="busquedaCliente" className=' w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 my-3 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2' />

            {loading ? <div className='text-gray-500 w-full rounded-lg my-2 border border-primary-100/50 p-1 overflow-x-scroll'>
                <Table
                    columnas={columnas}
                    arrayBody={encontrado}
                    client:load
                />
            </div>
                :
                <div>
                    <span>Esperando...</span>
                </div>
            }

        </div>
    )
}
