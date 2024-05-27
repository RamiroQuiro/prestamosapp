import React from 'react'
import SubNavPrestamo from '../moleculas/SubNavPrestamo'

export default function SubNavDash({pathname}) {

switch (pathname) {
    case pathname.includes('prestamos'):
        return(
            <SubNavPrestamo/>
        )
        break;
        case pathname.includes('clientes'):
        return(
            <div>seccion clientes</div>
        )
        break;
        case pathname.startsWith('/dashboard/'):
        return(
            <div>inicio dashboard</div>
        )
        break;

    default:
         return(
            <SubNavPrestamo/>
        )
        break;
}
}
