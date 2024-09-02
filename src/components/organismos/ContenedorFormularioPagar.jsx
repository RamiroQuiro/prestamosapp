import { busqueda, clienteSelect } from '@/context/store'
import { useStore } from '@nanostores/react'
import React, { useEffect, useState } from 'react'
import FormularioDeBusqueda from './FormularioDeBusqueda'
import Table from '../tablaComponentes/Table'

export default function ContenedorFormularioPagar({ userId, clientes }) {


    const $clienteSelect = useStore(busqueda)
    const [ultimasCuotas, setUltimasCuotas] = useState([])
    // console.log($clienteSelect)
    const startDate = new Date();
    const endDate = new Date(); // Crear una nueva fecha basada en la actual

    endDate.setDate(startDate.getDate() + 7); // Sumar 7 días a la fecha actual

    useEffect(() => {

        const fetchinv = async () => {
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
                setUltimasCuotas(data.data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }

        }
        fetchinv()
    }, [$clienteSelect])



    const columnas = [
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


    let   arrayBody = ultimasCuotas?.map((element) => {

        const date=new Date(element.fechaVencimiento)
        return {
          href:`/dashboard/prestamos/${element.id}`,
          id:element?.id,
        //   cliente: element?.Cliente.nombre + ' '+ element?.Cliente.apellido,
          montoCuota: `$ ${element?.monto}`,
          nCuotas: element?.numeroCuota,
          fechaVencimiento: date.toLocaleDateString(),
        };
      });
    return (
        <div className='w-full flex flex-col items-start justify-normal '>


            {$clienteSelect.clientSelect.id && <div className='text-gray-500 w-full rounded-lg my-2 border border-primary-100/50 p-1'>
                <span className='capitalize'>{$clienteSelect?.clientSelect?.nombre}{" "}{$clienteSelect?.clientSelect?.apellido}{" "}{$clienteSelect?.clientSelect?.dni}</span>
            </div>}
            {ultimasCuotas && <div className='text-gray-500 w-full rounded-lg my-2 border border-primary-100/50 p-1'>
                <Table
                    columnas={columnas}
                    arrayBody={arrayBody}
                    client:load
                />
            </div>}

        </div>
    )
}
