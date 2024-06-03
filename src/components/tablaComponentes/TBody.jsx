import React, { useState } from 'react'
import Tr from './Tr';
import { useStore } from '@nanostores/react';
import { columnSelectTable } from '../../context/store';
export default function TBody({ arrayBody, onClickFila }) {

    const $columnSelectTable = useStore(columnSelectTable)
    const [sortSelect, setSortSelect] = useState($columnSelectTable.seleccion)
    // console.log(sortSelect)
    const onClick = (e) => {

        onClickFila(e)
    }
    return (
        <tbody>
            {
                arrayBody?.sort((a, b) => {
                    // Para campos numéricos, elimina los signos de dólar y las comas, y convierte a un número
                    if (typeof a[sortSelect] === 'string' && a[sortSelect].includes('$')) {
                        return parseFloat(a[sortSelect].replace(/[$,]/g, '')) - parseFloat(b[sortSelect].replace(/[$,]/g, ''));
                    }

                    // Para fechas, convierte las cadenas de fecha a objetos Date
                    if (sortSelect === 'fechaInicio') {
                        return new Date(a[sortSelect]) - new Date(b[sortSelect]);
                    }

                    // Para campos de texto, usa la función de comparación de cadenas de JavaScript
                    if (typeof a[sortSelect] === 'string') {
                        return a[sortSelect].localeCompare(b[sortSelect]);
                    }

                    // Para campos numéricos, simplemente resta los valores
                    return a[sortSelect] - b[sortSelect];il
                    
                }).map((client, i) => {
                    console.log(client)
                    return (
                        <Tr data={client} onClick={() => onClick(client)} id={client.id} key={i} styleTr="hover:bg-primary-200/20 duration-300 cursor-pointer border-b odd:bg-primary-200/10 " />
                    );
                })
            }
        </tbody>

    )
}
