import { showToast } from '../../components/Toast/toastShow.js'
import { loader } from '../../components/loader/showLoader';

import { useState } from 'react'

export default function FormularioLogin() {
    const [formulario, setFormulario] = useState({
        email: '',
        password: '',
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
    return (
        <form
            onSubmit={handleLogin}
            id='registerClient'
            className="bg-white md:w-96 w-full md:h-96  shadow-xl rounded-lg text-xs  flex flex-col gap-4 items-center justify-between p-5"
        >
            <div className="flex w-full items-center justify-evenly">

                <h2 className="text-xl my-3 text-primary-200 font-semibold">
                    Login
                </h2>
            </div>
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
                <label htmlFor="password" className="text-primary-100 capitalize"
                >contraseña</label
                >
                <input
                    onChange={handleChagne}
                    type="password"
                    name="password"
                    id="password"
                    className="w-full text-sm bg-primary-200/10  rounded-md group-hover:ring-2  border-gray-300  ring-primary-200/60 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2"
                />
            </div>
            <button
                type='submit'
                className="bg-blue-400 text-base rounded-md text-white px-2 py-1 w-1/3 mb-5 mx-auto"
            >
                Inciar Sesion
            </button>
            <div class="text-sm w-full pb-2 my-4 flex items-center justify-evenly">
                <p>No estas registrado?</p>
                <a href="/register" class="font-semibold">REGISTRAR</a>
            </div>
            {errors.password && <p>{errors.username}</p>}
            {/* <ResetearContrasenia email={formulario.email} /> */}
        </form>
    )
}
