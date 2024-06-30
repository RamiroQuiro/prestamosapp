import React from 'react'
import LinkSubMenu from '../atomos/LinkSubMenu'

export default function SubNavPrestamo({ idPrestamo, pathname }) {

    const links = [
        {
            href: "/dashboard/prestamos",
            children: 'confección',
        }, {
            href: "/dashboard/prestamos/prestamos",
            children: 'prestamos'
        },
        {
            href: `/dashboard/prestamos/${idPrestamo}`,
            children: idPrestamo
        },
    ]
    return (
        <div className='flex items-center justify-start gap-4  w-full px-5'>

            {
                links.slice(0,2).map((element, i) => (

                    <LinkSubMenu
                        key={i}
                        href={element.href}
                        isActive={element.href.toLowerCase()==pathname.toLowerCase()}
                    >
                        {element.children}
                    </LinkSubMenu>
                ))
            }

            {idPrestamo && links.slice(2)?.map((element, i) => (
                <LinkSubMenu
                    key={i}
                    isActive={pathname.includes(element.href)}
                    href={element.href}
                >
                    {idPrestamo}
                </LinkSubMenu>
            ))
            }
        </div>
    )
}
