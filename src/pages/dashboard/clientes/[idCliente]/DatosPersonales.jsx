import React, { useState } from 'react'
import InputsDatos from '../../../../components/organismos/InputsDatos'
import Button3 from '../../../../components/atomos/Button3'
import { clienteSelect } from '../../../../context/store'
import FormularioDni from '@/components/organismos/FormularioDni'
import { showToast } from '@/components/Toast/toastShow'
import { loader } from '../../../../components/loader/showLoader'

export default function DatosPersonales({ cliente }) {
    // console.log(cliente)

    clienteSelect.set(cliente)
    const [formulario, setFormulario] = useState(cliente)

    const onChangeForm = (e) => {
        const { value, name } = e.target
        setFormulario((state) => ({ ...state, [name]: value }))
    }


    const handleActualizarData = async () => {
    loader(true)
    try {
        const resFetch = await fetch(`/api/clientes/${cliente.id}`, {
            method: 'PUT',
            body: JSON.stringify(formulario)
        })
        
        const respuesta = await resFetch.json()
        if (resFetch.ok) {
                loader(false)
                showToast('Cambios guardados',{
                    background:'bg-green-600'
                })
            }
        } catch (error) {
            loader(false)
            console.log(error)
        }

    }



    return (
        <div className=" border-y bg-white p-5 w-full">
            <form className='flex flex-col  w-full gap-4 md:flex-row text-sm'>

              <FormularioDni cliente={cliente}/>
                <div className='flex flex-wrap w-full items-start justify-start gap-3'>

                    <InputsDatos
                        onChange={onChangeForm}
                        name={'nombre'}
                        label={'nombre'} valueInput={formulario.nombre}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'apellido'}
                        label={'apellido'} valueInput={formulario.apellido}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'dni'}
                        label={'DNI :'} valueInput={formulario.dni}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'email'}
                        label={'email :'} valueInput={formulario.email}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'direccion'}
                        label={'Dirección :'} valueInput={formulario.direccion}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'localidad'}
                        label={'Localidad :'} valueInput={formulario.localidad}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'provincia'}
                        label={'Provincia:'} valueInput={formulario.provincia}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'ciudad'}
                        label={'Ciudad:'} valueInput={formulario.ciudad}
                    />
                    <InputsDatos
                        onChange={onChangeForm}
                        name={'pais'}
                        label={'Pais:'} valueInput={formulario.pais}
                    />
                    <InputsDatos
                        label={'Fecha Creación:'} valueInput={formulario.fechaCreacion.toLocaleString()}
                    />


                    <div className='w-full items-center flex md:pb-0 justify-end'>
                        <Button3 onClick={handleActualizarData}>actualizar datos</Button3>
                    </div>

                </div>
            </form>
        </div>
    )
}
