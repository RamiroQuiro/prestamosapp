import { clienteSelect } from '@/context/store'
import { useStore } from '@nanostores/react'
import React, { useState } from 'react'

export default function ContenedorFormularioPagar({ userId }) {


    const $clienteSelect = useStore(clienteSelect)
    const [clienteSeleccionado, setClienteSeleccionado] = useState({})

    console.log('estees el usuario seleccionado ->',$clienteSelect)

    return (
        <div className='w-full flex flex-col items-start justify-normal '>
            <div className='bg-red-500'>
                sasa
                {$clienteSelect?.nombre}{" "}{$clienteSelect?.apellido}{" "}{$clienteSelect?.dni}
            </div>

        </div>
    )
}
