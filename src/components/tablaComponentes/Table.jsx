import React from 'react'
import THead from './THead'
import TBody from './TBody'

export default function Table({ columnas,arrayBody, styleTable,enlaceFila,enlacePost }) {

    const onClick=(e)=>{
        if (enlaceFila) {
            document.location.href=`${enlaceFila}${e.id}${enlacePost?enlacePost:''}`
        }
    }

    
    return (
        <table
            className={`${styleTable} items-center bg-transparent w-full border-collapse rounded-md overflow-hidden`}
        >
           <THead columnas={columnas} arrayBody={arrayBody}/>
           <TBody onClickFila={onClick} arrayBody={arrayBody}/>
        </table>
    )
}
