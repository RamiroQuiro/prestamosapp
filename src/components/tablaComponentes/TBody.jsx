import React from 'react'
import Tr from './Tr';

export default function TBody({ arrayBody ,onClickFila}) {


    const onClick=(e)=>{

        onClickFila(e)
    }
    return (
        <tbody>
            {
                arrayBody.map((client) => {
                   
                    return (
                        <Tr data={client} onClick={()=>onClick(client)} id={client.id} key={client.id} styleTr="hover:bg-primary-200/20 duration-300 cursor-pointer border-b odd:bg-primary-200/10 " />
                    );
                })
            }
        </tbody>

    )
}
