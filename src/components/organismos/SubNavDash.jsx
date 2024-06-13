import React from 'react'
import SubNavPrestamo from '../moleculas/SubNavPrestamo'

export default function SubNavDash({ pathname,idPrestamo }) {


    if (pathname.includes('prestamos')) {
        return (
            <SubNavPrestamo  idPrestamo={idPrestamo}/>
        )
    } else if (pathname.includes('clientes')) {
        return (
            <div>seccion clientes</div>
        )
    } else if (pathname.startsWith('/dashboard')) {
        return (
            <div>inicio dashboard</div>
        )
    }

}
