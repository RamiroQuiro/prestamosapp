import React, { useState, useEffect } from 'react'
import Button1 from '../atomos/Button1'
import FormularioCliente from '../../pages/dashboard/clientes/FormularioCliente.astro'

export default function ContenedorBotonNewClient({}) {
  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    if (isModal) {
      modalMensaje(<FormularioCliente/>,true)
    }
  }, [isModal]);

  const functionClick = () => {
    console.log('hola men')
    setIsModal(true);
  }

  return (
    <div className="w-1/6 m-auto absolute top-2 right-0">
      <Button1 onClick={functionClick}>
        Nuevo Cliente
      </Button1>
    </div>
  )
}
