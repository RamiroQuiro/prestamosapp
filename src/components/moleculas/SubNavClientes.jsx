import React from 'react'
import LinkSubMenu from '../atomos/LinkSubMenu'

export default function SubNavClientes({ idClients, pathname, dataCliente }) {

  const links = [
    {
      href: `/dashboard/clientes`,
      children: 'clientes'
    },
    {
      href: `/dashboard/clientes/${idClients}`,
      children: `  ${dataCliente?.nombre + ' ' + dataCliente?.apellido}`,
    },
    {
      href: `/dashboard/clientes/${idClients}/datosPersonales`,
      children: 'Datos personales'
    },
    {
      href: `/dashboard/clientes/${idClients}/creditos`,
      children: 'creditos'
    },
    {
      href: `/dashboard/clientes/${idClients}/pagos`,
      children: 'pagos'
    }
  ]

  return (
    <div className='flex items-center justify-start gap-4  w-full px-5'>
      <LinkSubMenu
        href={links[0].href}
        isActive={links[0].href.toLowerCase().includes(pathname.toLowerCase())}
      >
        {links[0].children}
      </LinkSubMenu>
      {idClients &&
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
