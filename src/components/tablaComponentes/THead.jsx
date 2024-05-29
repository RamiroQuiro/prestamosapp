import React from 'react'
import Tr from './Tr';
import Th from './Th';

export default function THead({ columnas }) {
    return (
        <thead className="bg-primary-100/70 rounded-md text-white w-auto">
            <tr id='cabeceraTable' className="rounded-md">
                {
                    columnas?.map((columna) => {
                        return <Th key={columna.id} onClick={() => console.log(`Columna seleccionada: ${columna.label}`)}> {columna.label} </Th>;
                    })
                }
            </tr>
        </thead>

    )
}
