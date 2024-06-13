import React from 'react'
import LinkSubMenu from '../atomos/LinkSubMenu'

export default function SubNavPrestamo({idPrestamo}) {
    return (
        <div className='flex items-center justify-start gap-4  w-full px-5'>

            <LinkSubMenu
                href={"/dashboard/prestamos"}
            >
                confeccion
            </LinkSubMenu>
            <LinkSubMenu
                href={"/dashboard/prestamos/listar"}
            >
                prestamos
            </LinkSubMenu>
        {idPrestamo&&    <LinkSubMenu
                href={`/dashboard/prestamos/${idPrestamo}`}
            >
                {idPrestamo}
            </LinkSubMenu>}
        </div>
    )
}
