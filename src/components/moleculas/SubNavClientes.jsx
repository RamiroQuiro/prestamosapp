import React from 'react'
import LinkSubMenu from '../atomos/LinkSubMenu'

export default function SubNavClientes({idClients}) {
  return (
    <div className='flex items-center justify-start gap-4  w-full px-5'>

      <LinkSubMenu
        href={`/dashboard/clientes/${idClients}`}
      >
        Datos Cliente
      </LinkSubMenu>
      <LinkSubMenu
        href={`/dashboard/clientes/${idClients}/creditos`}
      >
        Creditos
      </LinkSubMenu>
     
      
    </div>
  )
}
