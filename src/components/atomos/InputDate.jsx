import React from 'react'
import { filtrosBusquedaPrestamos } from '../../context/store'
import { useStore } from '@nanostores/react'

export default function InputDate({ name, id, idInput,children }) {

    const $filtros = useStore(filtrosBusquedaPrestamos)

    return (
        <label id={id} htmlFor={name}
        className={`${$filtros.filtro==id?'bg-primary-100/80 text-white':''} px-3 py-1 rounded-lg font-semibold capitalize border-primary-100 duration-300 text-xs border-dashed border bg-transparent hover:bg-primary-100/80 hover:text-white cursor-pointer hover:border-primary-resaltado`}>
        {children}
            <input type="date" className=' ml-3 bg-transparent cursor-pointer' name={name} id={name} />
        </label>
    )
}
