import React, { useState, useRef } from 'react';
import { loader } from '@/components/loader/showLoader';

export default function UsernameInput({ value, name, onChange, setEsValido, isThisName }) {
    const [username, setUsername] = useState(value);
    const [isAvailable, setIsAvailable] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState(null);
    const timeoutId = useRef(null); // Usamos useRef para almacenar el timeoutId

    const handleUsernameChange = (e) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        onChange(e);

        // Limpiamos cualquier timeout previo
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        // Si hay más de 3 caracteres, activamos 'checking' y esperamos 2 segundos antes de hacer la verificación
        if (newUsername.length >= 3) {
            setChecking(true);  // Activamos 'checking' inmediatamente
            timeoutId.current = setTimeout(() => {
                checkUsernameAvailability(newUsername);
            }, 2000);  // 2 segundos de espera
        } else {
            setChecking(false);  // Si el username tiene menos de 3 caracteres, desactivamos 'checking'
            setIsAvailable(false); // Y también reseteamos la disponibilidad
        }
    };

    const checkUsernameAvailability = async (newUsername) => {
        try {
            const res = await fetch(`/api/username/check/${newUsername}`);
            const data = await res.json();
            setIsAvailable(data.isAvailable);
            setEsValido(data.isAvailable)
            setChecking(false);  // Desactivamos 'checking' al terminar la verificación
            loader(false);
        } catch (error) {
            setChecking(false);
            setError('Error checking username availability');
            loader(false);
            console.log('Error checking username availability:', error);
        }
    };



    return (
        <div className="w-full">
            <div className='w-full flex items-center gap-2 justify-start'>
                <div className='w-full flex items-center gap-2 justify-start'>
                    <label className="block mb-1">Username:</label>
                    <input
                        name={name}
                        type="text"
                        className={`border-b px-2 w-full rounded-md valid:ring-0 py-0.5  outline-none   focus:outline-none ${checking ? 'border-yellow-500 ' : isThisName ? 'border-primary-100' : isAvailable ? 'border-green-500 bg-green-400/20' : 'border-red-500 bg-red-500/30 '}`}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <a
                    href={`/publicSites/${value}`}
                    target='_blank'
                    className='text-xs md:w-1/12 w-2/12 text-center border rounded-md py-1 cursor-pointer hover:bg-primary-100/50 duration-150'>
                    ir 🚀
                </a>
            </div>
            {isThisName && (
                <span className="text-primary-100 text-sm">Este nombre de usuario ya lo estás usando</span>
            )}
            {checking && (
                <span className="text-yellow-500 text-sm">Verificando...</span>
            )}

            {!checking && isAvailable && username?.length >= 3 && (
                <span className="text-green-500 text-sm">✓ Nombre de usuario disponible</span>
            )}

            {!checking && !isAvailable && username?.length >= 3 && !isThisName && (
                <span className="text-red-500 text-sm">✗ Este nombre de usuario ya está en uso</span>
            )}
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
