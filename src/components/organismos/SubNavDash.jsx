import React from 'react'
import SubNavPrestamo from '../moleculas/SubNavPrestamo'
import SubNavClientes from '../moleculas/SubNavClientes'
import SubNavAjustes from '../moleculas/SubNavAjustes'

export default function SubNavDash({ pathname, idPrestamo, idCliente, dataCliente }) {

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
                <div className='text-xs font-thin capitalize rounded-lg px-2 py-1 border border-primary-200/50 hover:border-primary-100 duration-200 hover:bg-primary-200/10'>Dashboard 👇🏼</div>

            </div>
        )
    }

}
