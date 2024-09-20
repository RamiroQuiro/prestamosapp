
import Button3 from '@/components/atomos/Button3'
import ButtonPdf from '@/components/atomos/ButtonPdf'
import Table from '@/components/tablaComponentes/Table'
import { busqueda, prestamoSimulado } from '@/context/store'
import simularCuotas from '@/lib/simularCuotas'
import { useStore } from '@nanostores/react'
import React, { useEffect, useState } from 'react'

export default function PrevisualizacionPrestamo() {


    const prestamosEnContexto = useStore(prestamoSimulado)
    const clienteSelect = useStore(busqueda)
    const [cuotasSimuladas, setCuotasSimuladas] = useState([])
    useEffect(() => {
        if (!prestamosEnContexto) return
        const simulandoCuotas = simularCuotas(prestamosEnContexto, clienteSelect)
        setCuotasSimuladas(simulandoCuotas)
    }, [prestamosEnContexto])
const usuarioId=prestamoSimulado?.value?.usuarioId
console.log(usuarioId)
    const columnas = [
        {
            label: "cliente",
            id: 1,
            selector: 'cliente',
        },
        {
            label: "N° cuotas",
            id: 4,
            selector: 'nCuotas',
        },
        {
            label: "monto cuota",
            id: 3,
            selector: 'montoCuota',
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

    ];
    let cabecera = {usuario:{id:usuarioId}};

    //   console.log(cuotasSimuladas)
    //   console.log(prestamosEnContexto)
    return (
        <div className='p-2 flex relative flex-col items-start justify-normal'>
            <div className='flex items-start w-full mt-6 my-3 justify-between'>

                <h2 className='uppercase font-semibold text-sm '>Previsualizacion del prestamo generado</h2>
                <ButtonPdf infoCabecera={cabecera}>pdf</ButtonPdf>
            </div>
            <div className='text-gray-500 w-full rounded-lg my-2 border border-primary-100/50 p-1 overflow-x-auto'>

                <Table columnas={columnas} arrayBody={cuotasSimuladas} client:load />
            </div>
        </div>
    )
}
