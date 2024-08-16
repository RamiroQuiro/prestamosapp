import Button3 from '@/components/atomos/Button3'
import InputsDatos from '@/components/organismos/InputsDatos'
import React, { useState } from 'react'
import FormularioFotoPerfil from '../FormularioFotoPerfil'
import { loader } from '@/components/loader/showLoader'
import { showToast } from '@/components/Toast/toastShow'
import ButtonCancelar from '@/components/atomos/ButtonCancelar'


export default function FormularioConfiguracionFinanzas({ dataUser: { intereses, moraCuota, nCuotas }, usuarioId }) {


    const [formulario, setFormulario] = useState({})


    const onChangeForm = (e) => {
        const { value, name } = e.target
        setFormulario((state) => ({ ...state, [name]: value }))
    }


    const handleActualizarData = async () => {
        loader(true)
        try {
            const resFetch = await fetch(`/api/usuario/configuracionFinanciera/${usuarioId}`, {
                method: 'POST',
                body: JSON.stringify(formulario)
            })

            const respuesta = await resFetch.json()
            if (resFetch.ok) {
                loader(false)
                showToast('Cambios guardados', {
                    background: 'bg-green-600'
                })
            }
        } catch (error) {
            loader(false)
            console.log(error)
        }

    }

    return (
        <div className='flex w-full gap-4 flex-col text-sm'>


            <div className='flex flex-wrap w-full items-start justify-start gap-y-4 500 flex-col '>

                <div className='flex items-center justify-start gap-3 my-3'>
                    <span className='font-semibold'>
                        Tasa de Interes :
                    </span>
                    <div className='flex items-center text-xs justify-start gap-2'>

                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-10 rounded p-1.5 m-auto relative '>
                            <span > 5%</span>

                        </div>
                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-10 rounded p-1.5 m-auto relative'>
                            <span > 10%</span>

                        </div>
                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-10 rounded p-1.5 m-auto relative'>
                            <span > 15%</span>
                        </div>


                        {/* verificar si hay datos */}
                        {
                            intereses &&
                            intereses.map((interes, i) => (
                                <div key={interes.id} className='border-primary-100/50 mr-3 bg-gray-100 border w-10 rounded p-1.5 m-auto relative'>
                                    <span >{interes.interes}%</span>
                                    <ButtonCancelar />
                                </div>
                            ))
                        }

                        <label htmlFor="interes" className=''>
                            <input type="number" name="interes" onChange={onChangeForm} id="interes" className=' border-primary-100 border w-10 rounded p-1.5 m-auto' />
                        </label>
                        <span className='bg-gray-100 rounded-full px-2 border text-xs border-primary-100/50 cursor-pointer py-1 rotate-45 hover:bg-primary-200 hover:text-white duration-150 '>✕</span>
                    </div>
                </div>



                <div className='flex items-center justify-start gap-3 my-3'>
                    <span className='font-semibold'>
                        Numero de Cuotas :
                    </span>
                    <div className='flex items-center text-xs justify-start gap-2'>

                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-7 flex rounded p-1.5 m-auto relative '>
                            <span className='w-full text-center'> 3</span>
                        </div>
                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-7 flex rounded p-1.5 m-auto relative'>
                            <span className='w-full text-center'> 6</span>
                        </div>
                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-7 flex rounded p-1.5 m-auto relative'>
                            <span className='w-full text-center'> 9</span>
                            <ButtonCancelar />
                        </div>
                        {/* verificar si hay datos */}
                        {
                            nCuotas &&
                            nCuotas.map((nCuota, i) => (
                                <div key={nCuota.id} className='border-primary-100/50 mr-3 bg-gray-100 border w-10 rounded p-1.5 m-auto relative'>
                                    <span >{nCuota.interes}%</span>
                                    <ButtonCancelar />
                                </div>
                            ))
                        }
                        <label htmlFor="nCuotas" className=''>
                            <input type="number" name="nCuotas" onChange={onChangeForm} id="nCuotas" className=' border-primary-100 border w-10 rounded p-1.5 m-auto' />
                        </label>
                        <span className='bg-gray-100 rounded-full px-2 border text-xs border-primary-100/50 cursor-pointer py-1 rotate-45 hover:bg-primary-200 hover:text-white duration-150 '>✕</span>
                    </div>
                </div>
                <div className='flex items-center justify-start gap-3 my-3'>
                    <span className='font-semibold'>
                        Mora en Cuotas :
                    </span>
                    <div className='flex items-center text-xs justify-start gap-2'>
                    {
                            moraCuota &&
                            moraCuota.map((mora, i) => (
                                <div key={mora.id} className='border-primary-100/50 mr-3 bg-gray-100 border w-10 rounded p-1.5 m-auto relative'>
                                    <span >{mora.mora}%</span>
                                    <ButtonCancelar />
                                </div>
                            ))
                        }

                        <div className='border-primary-100/50 mr-3 bg-gray-100 border w-7 flex rounded p-1.5 m-auto relative'>
                            <span className='w-full text-center'> 9</span>
                            <ButtonCancelar />
                        </div>
                        <label htmlFor="mora" className=''>
                            <input type="number" name="mora" id="mora" onChange={onChangeForm} className=' border-primary-100 border w-10 rounded p-1.5 m-auto' />
                        </label>
                        <span className='bg-gray-100 rounded-full px-2 border text-xs border-primary-100/50 cursor-pointer py-1 rotate-45 hover:bg-primary-200 hover:text-white duration-150 '>✕</span>
                    </div>
                </div>


            </div>
            <div className='w-full items-center flex justify-end'>
                <Button3 onClick={handleActualizarData}>actualizar datos</Button3>
            </div>
        </div>
    )
}
