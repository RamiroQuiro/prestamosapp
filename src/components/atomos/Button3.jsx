import { useStore } from '@nanostores/react'
import React from 'react'
import { filtrosBusquedaPrestamos } from '../../context/store'

export default function Button3({ children, isActive,id }) {

    const $filtros = useStore(filtrosBusquedaPrestamos)
    const handleClick = (e) => {
        e.preventDefault()
    }

console.log($filtros)
    return (
        <button
        id={id}
            onClick={handleClick}
            className={`${$filtros.filtro==id ? 'bg-primary-100/60 text-white' : 'bg-transparent'} px-3 py-1 rounded-lg font-semibold capitalize border-primary-100 duration-300 text-xs border-dashed border bg-transparent hover:bg-primary-100/80 hover:text-white hover:border-primary-resaltado`}>
            {children}
        </button>
    )
}
