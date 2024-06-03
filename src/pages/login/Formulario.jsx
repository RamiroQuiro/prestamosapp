import { showToast } from '../../components/Toast/toastShow.js'
import { loader } from '../../components/loader/showLoader';

import { useState } from 'react'

export default function FormularioLogin() {
    const [isRegister, setIsRegister] = useState(false)
    const [formulario, setFormulario] = useState({
        email: '',
        password: '',
        rePassword: '',
        userName: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: ''
    })

    const handleChagne = (e) => {
        setFormulario((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            loader(true)
            const fetiiching = await fetch(`/api/authe/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formulario.email,
                    password: formulario.password
                }), // Reemplazar 'nuevoEstado' con el nuevo estado deseado
            });
            console.log(fetiiching)
            const dataRes = await fetiiching.json();
            if (dataRes.status == 200) {
                window.location.href = '/dashboard'
                loader(false)
            }
            if (dataRes.status == 401) {
                showToast('email incorrecto',
                    { background: 'bg-red-600' })
                loader(false)
            }
            if (dataRes.status == 402) {
                showToast('contraseña incorrecta', {
                    background: 'bg-red-600'
                })
                loader(false)
            }

        } catch (error) {
            showToast('error al ingresar')
            console.error(error.message);
            loader(false)

        }
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        if (formulario.password !== formulario.rePassword) {
            return showToast('las contraseñas no coinciden', {
                background: 'bg-red-500'
            })
        }

        try {
            loader(true)
            const fetiiching = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formulario.email,
                    password: formulario.password,
                    userName: formulario.userName
                }), // Reemplazar 'nuevoEstado' con el nuevo estado deseado
            });
            const dataRes = await fetiiching.json();
            if (dataRes.status == 200) {
                window.location.href = '/dashboard'
                loader(false)
            }
            if (dataRes.status == 400) {
                showToast(dataRes.data,
                    { background: 'bg-red-600' })
                loader(false)
            }
         

        } catch (error) {
            showToast('error al ingresar')
            console.error(error.message);
            loader(false)

        }
    }

    const toogleRegister = () => {
        setIsRegister(!isRegister)
    }
    return (
        <form
            onSubmit={handleLogin}
            id='registerClient'
            className="bg-white md:w-96 w-full  duration-300 shadow-xl rounded-lg text-xs  flex flex-col gap-4 items-center justify-between p-5"
        >
            <div className="flex w-full items-center justify-evenly">

                <h2 className="text-xl my-3 duration-200 text-primary-200 font-semibold">
                    {!isRegister ? 'Ingresar' : 'Registrar'}
                </h2>
            </div>
            {isRegister && <div className="animate-apDeArriba w-full flex items flex-col items-start gap-3 ">
                <label htmlFor="userName" className="text-primary-100 capitalize">nombre de usuario</label>
                <input
                    onChange={handleChagne}
                    type="text"
                    name="userName"
                    id="userName"
                    className="w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2"
                />
            </div>}
            <div
                className="w-full flex items flex-col items-start gap-3"
            >
                <label htmlFor="email" className="text-primary-100">Email</label>
                <input
                    onChange={handleChagne}
                    type="email"
                    name="email"
                    id="email"
                    className="w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2"
                />
            </div>
            <div
                className="w-full flex items flex-col items-start gap-3 "
            >
                <label htmlFor="password" className="text-primary-100 capitalize">
                    contraseña
                </label>
                <input
                    onChange={handleChagne}
                    type="password"
                    name="password"
                    id="password"
                    className="w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2"
                />
            </div>

            {/* si esta isRegister en true */}
            {isRegister && <div className="animate-apDeArriba w-full flex items flex-col items-start gap-3 ">
                <label htmlFor="rePassword" className="text-primary-100 capitalize">volver a colocar contraseña</label>
                <input
                    onChange={handleChagne}
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    className="w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2"
                />
            </div>}
            <button
                onClick={!isRegister ? handleLogin : handleRegister}
                className="bg-blue-400 text-base duration-200 rounded-md text-white px-2 py-1 w-1/3 mb-5 mx-auto"
            >
                {!isRegister ? 'Inciar Sesion' : 'Registrar'}
            </button>
            <div className="text-sm w-full pb-2 capitalize my-4 flex items-center justify-evenly">
                {!isRegister ? <p className='animate-aparecer'>¿No estas registrado?</p> : <p className='animate-aparecer'>¿ya estas registrado?</p>}
                <button type='button' onClick={toogleRegister} className="font-semibold"> {!isRegister ? 'REGISTRAR' : 'INGRESAR'}</button>
            </div>
            {errors.password && <p>{errors.username}</p>}
            {/* <ResetearContrasenia email={formulario.email} /> */}
        </form>
    )
}
