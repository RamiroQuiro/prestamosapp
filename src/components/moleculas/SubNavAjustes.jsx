import React from 'react'
import LinkSubMenu from '../atomos/LinkSubMenu'

export default function SubNavAjustes({ idClients, pathname, dataCliente }) {

    const links = [
      {
        href: `/dashboard/ajustes`,
        children: 'datos personales'
      },
      {
        href: `/dashboard/ajustes/configuracionFinanciero`,
        children: `configuracion financiera`,
      },
      
    ]
  
    return (
      <div className='flex items-center justify-start gap-4  w-full px-5'>
        <LinkSubMenu
          href={links[0].href}
          isActive={links[0].href.toLowerCase().includes(pathname.toLowerCase())}
        >
          {links[0].children}
        </LinkSubMenu>
        {
          links?.slice(1)?.map((elemtne, i) => {
  
            return (
              <LinkSubMenu
              key={i}
                href={elemtne.href}
                isActive={elemtne.href.toLowerCase()==pathname.toLowerCase()}
              >
                {elemtne.children}
              </LinkSubMenu>
            )
          }
          )
  
        }
  
  
      </div>
    )
  }