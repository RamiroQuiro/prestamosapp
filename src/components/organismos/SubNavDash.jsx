import React from 'react'
import SubNavPrestamo from '../moleculas/SubNavPrestamo'
import SubNavClientes from '../moleculas/SubNavClientes'
import SubNavAjustes from '../moleculas/SubNavAjustes'

export default function SubNavDash({ pathname, idPrestamo, idCliente, dataCliente,userData }) {

    if (pathname.startsWith('/dashboard/prestamos')) {
        return (
            <SubNavPrestamo pathname={pathname} idPrestamo={idPrestamo} />
        )
    } else if (pathname.includes('clientes')) {
        return (
            <SubNavClientes pathname={pathname} idClients={idCliente} dataCliente={dataCliente} />
        )
    } else if (pathname.includes('ajustes')) {
        return (
            <SubNavAjustes pathname={pathname} idClients={idCliente} dataCliente={dataCliente} />
        )
    } else if (pathname.startsWith('/dashboard')) {
        return (
            <div className='flex items-center justify-start gap-4  w-full px-5'>
                <div className='text-sm font-thin capitalize rounded-lg px-2 py-1  duration-200 '> 👋 {userData?.userName}</div>

            </div>
        )
    }

}
