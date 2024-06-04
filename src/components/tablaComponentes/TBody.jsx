import React, { useState } from 'react'
import Tr from './Tr';
import { useStore } from '@nanostores/react';
import { columnSelectTable, filtrosBusquedaPrestamos } from '../../context/store';
export default function TBody({ arrayBody, onClickFila }) {

    const $columnSelectTable = useStore(columnSelectTable)
    const $filtros = useStore(filtrosBusquedaPrestamos)
    const [sortSelect, setSortSelect] = useState($columnSelectTable.seleccion)
    // console.log(sortSelect)
    const onClick = (e) => {

        onClickFila(e)
    }
    return (
        <tbody>
            {
                arrayBody
                    ?.sort((a, b) => a - b)
                    .filter((element) => {
                        // console.log(element)
                        if ($filtros.filtro == 'todos') {

                            return element
                        }
                        if (element.estado == $filtros.filtro) {
                            return element
                        }
                        if ($filtros.filtro == 'vencimientos') {
                            let f1 = new Date(element.fechaInicio); //31 de diciembre de 2015
                            let f2 = new Date($filtros.fecha);
                            // colcoar las horas en cero
                            f1.setHours(0, 0, 0, 0);
                            f2.setHours(0, 0, 0, 0);
                            if (f1.getTime() ==f2.getTime()) {
                                return element
                            }
                        }
                    })
                    .map((client, i) => {
                        // console.log(client)
                        return (
                            <Tr data={client} onClick={() => onClick(client)} id={client.id} key={i} styleTr="hover:bg-primary-200/20 duration-300 cursor-pointer border-b odd:bg-primary-200/10 " />
                        );
                    })
            }
        </tbody>

    )
}
