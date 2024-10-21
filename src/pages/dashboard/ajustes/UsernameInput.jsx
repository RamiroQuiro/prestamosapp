import React, { useState, useRef } from 'react';
import { loader } from '@/components/loader/showLoader';

export default function UsernameInput({ value, name, onChange,setEsValido }) {
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
          <div className='w-full flex items-center justify-start'>
          
          </div>
            {checking && (
                <span className="text-yellow-500 text-sm">Verificando...</span>
            )}
            {!checking && isAvailable && username?.length >= 3 && (
                <span className="text-green-500 text-sm">✓ Nombre de usuario disponible</span>
            )}
            {!checking && !isAvailable && username?.length >= 3 && (
                <span className="text-red-500 text-sm">✗ Este nombre de usuario ya está en uso</span>
            )}
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
}
