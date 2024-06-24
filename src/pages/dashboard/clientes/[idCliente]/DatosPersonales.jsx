import React from 'react'
import InputsDatos from '../../../../components/organismos/InputsDatos'
import Button3 from '../../../../components/atomos/Button3'
import { clienteSelect } from '../../../../context/store'

export default function DatosPersonales({cliente}) {

    clienteSelect.set(cliente)


    return (
        <div className=" border-y bg-white p-5 w-full">
            <form className='flex w-full gap-4 flex-row text-sm'>

                <div className="w-1/3 flex items-center border-r flex-col gap-3">
                    <img src="/frente.png" alt="frente" width={'200px'} height={'150px'} />
                    <img src="/atras.png" alt="atras" width={'200px'} height={'150px'} />
                    <Button3>cargar</Button3>
                </div>
                <div className='flex flex-wrap w-full items-start justify-start gap-3'>

                    <InputsDatos
                        label={'Nombre y Apellido :'} valueInput={`${cliente.nombre} ${cliente.apellido}`}
                    />
                    <InputsDatos
                        label={'DNI :'} valueInput={cliente.dni}
                    />
                    <InputsDatos
                        label={'email :'} valueInput={cliente.email}
                    />
                    <InputsDatos
                        label={'Dirección :'} valueInput={cliente.direccion}
                    />
                    <InputsDatos
                        label={'Localidad :'} valueInput={cliente.localidad}
                    />
                    <InputsDatos
                        label={'Departamento:'} valueInput={cliente.departamento}
                    />
                    <InputsDatos
                        label={'Ciudad:'} valueInput={cliente.ciudad}
                    />
                    <InputsDatos
                        label={'Pais:'} valueInput={cliente.pais}
                    />
                    <InputsDatos
                        label={'Fecha Creación:'} valueInput={cliente.fechaCreacion.toLocaleString()}
                    />
                
               
                <div className='w-full items-center flex justify-end'>
                    <Button3>editar</Button3>
                </div> </div>
            </form>
        </div>
    )
}
