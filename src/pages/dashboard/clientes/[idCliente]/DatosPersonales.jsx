import React from 'react'
import InputsDatos from '../../../../components/organismos/InputsDatos'
import Button3 from '../../../../components/atomos/Button3'
import Button1 from '../../../../components/atomos/Button1.astro'
import Button2 from '../../../../components/atomos/Button2.astro'

export default function DatosPersonales({data}) {
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
                        label={'Nombre y Apellido :'} valueInput={'Ramiro Quiroga'}
                    />
                    <InputsDatos
                        label={'DNI :'} valueInput={'33882244'}
                    />
                    <InputsDatos
                        label={'email :'} valueInput={'rama.exe.13@gmail.com'}
                    />
                    <InputsDatos
                        label={'Dirección :'} valueInput={'Barrio el Rincon'}
                    />
                    <InputsDatos
                        label={'Localidad :'} valueInput={'Banda'}
                    />
                    <InputsDatos
                        label={'Departamento:'} valueInput={'Ramiro Quiroga'}
                    />
                    <InputsDatos
                        label={'Ciudad:'} valueInput={'Ramiro Quiroga'}
                    />
                    <InputsDatos
                        label={'Pais:'} valueInput={'Ramiro Quiroga'}
                    />
                    <InputsDatos
                        label={'Fecha Creación:'} valueInput={'Ramiro Quiroga'}
                    />
                
               
                <div className='w-full items-center flex justify-end'>
                    <Button3>editar</Button3>
                </div> </div>
            </form>
        </div>
    )
}
