import React from 'react'
import LinkSubMenu from '../atomos/LinkSubMenu'

export default function SubNavClientes({ idClients ,dataCliente}) {
  return (
    <div className='flex items-center justify-start gap-4  w-full px-5'>
      <LinkSubMenu
        href={`/dashboard/clientes`}
      >
        Clientes
      </LinkSubMenu>
      {idClients && <>
        <LinkSubMenu
          href={`/dashboard/clientes/${idClients}`}
        >
          {dataCliente.nombre+' '+dataCliente.apellido}
        </LinkSubMenu>
        <LinkSubMenu
          href={`/dashboard/clientes/${idClients}/datosPersonales`}
        >
          Datos Cliente
        </LinkSubMenu>
        <LinkSubMenu
          href={`/dashboard/clientes/${idClients}/creditos`}
        >
          Creditos
        </LinkSubMenu>
        <LinkSubMenu
          href={`/dashboard/clientes/${idClients}/pagos`}
        >
        Pagos
        </LinkSubMenu>
      </>


      }


    </div>
  )
}
