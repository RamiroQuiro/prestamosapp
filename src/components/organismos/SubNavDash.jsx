import React from 'react'
import SubNavPrestamo from '../moleculas/SubNavPrestamo'
import SubNavClientes from '../moleculas/SubNavClientes'

export default function SubNavDash({ pathname,idPrestamo,idCliente }) {


    if (pathname.includes('prestamos')) {
        return (
            <SubNavPrestamo  idPrestamo={idPrestamo}/>
        )
    } else if (pathname.includes('clientes')) {
        return (
         <SubNavClientes idClients={idCliente}/>
        )
    } else if (pathname.startsWith('/dashboard')) {
        return (
            <div>inicio dashboard</div>
        )
    }

}
