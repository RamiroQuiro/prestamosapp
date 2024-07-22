import React, { useState } from 'react';
import Button3 from '../atomos/Button3';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/client';

export default function FormularioDni({usuarioId,clienteId}) {
    const [previewUrlFrente, setPreviewUrlFrente] = useState(null);
    const [previewUrlReverso, setPreviewUrlReverso] = useState(null);
    const [fileFrente, setFileFrente] = useState(null);
    const [fileReverso, setFileReverso] = useState(null);

    const handleImageFrente = (event) => {
        const file = event.target.files[0];
        setPreviewUrlFrente(URL.createObjectURL(file));
        setFileFrente(file);
    }

    const handleImageReverso = (event) => {
        const file = event.target.files[0];
        setPreviewUrlReverso(URL.createObjectURL(file));
        setFileReverso(file);
    }

    const handleSubirDni = async () => {
        console.log('click de subida');
        if (!fileFrente) {
            console.error('No se seleccionó ninguna imagen para el frente');
            return;
        }

        const fileExtension = fileFrente.name.split('.').pop();
        const fileRef = ref(storage, `usuario/${usuarioId}/clientes/${clienteId}/dniFrente.${fileExtension}`);
        const fileRefReverso = ref(storage, `usuario/${usuarioId}/clientes/${clienteId}/dniReverso.${fileExtension}`);
        
        try {
            const uploadTask = await uploadBytes(fileRef, fileFrente);
            const uploadTaskReverso = await uploadBytes(fileRefReverso, fileReverso);
            const urlFrente = await getDownloadURL(uploadTask.ref);
            const urlReverso = await getDownloadURL(uploadTaskReverso.ref);
            console.log('URL de la imagen subida:', urlFrente,' direccion del dni reverso -',urlReverso);
        } catch (error) {
            console.error('Error al subir la imagen', error);
        }
    }

    return (
        <div className="w-1/3 flex items-center border-r flex-col gap-3">
            <div className='w-52 h-28 flex m-auto items-center justify-center overflow-hidden rounded-lg shadow '>
                {previewUrlFrente ?
                    <img src={previewUrlFrente} alt="frente" width={'200px'} height={'150px'} />
                    :
                    <label htmlFor="dniFrente" className='border-dashed border rounded-lg  border-primary-100 w-full h-full items-center justify-center flex uppercase font-semibold  m-auto cursor-pointer hover:bg-primary-100/40 duration-300 hover:text-white text-xs'>
                        Dni Frente
                        <input type="file" name='dniFrente' onChange={handleImageFrente} id='dniFrente' className='hidden' />
                    </label>}
            </div>

            <div className='w-52 h-28 flex m-auto items-center justify-center overflow-hidden rounded-lg shadow '>
                {previewUrlReverso ?
                    <img src={previewUrlReverso} alt="reverso" width={'200px'} height={'150px'} />
                    :
                    <label htmlFor="dniReverso" className='border-dashed border rounded-lg  border-primary-100 w-full h-full items-center justify-center flex uppercase font-semibold  m-auto cursor-pointer hover:bg-primary-100/40 duration-300 hover:text-white text-xs'>
                        Dni Reverso
                        <input type="file" name='dniReverso' onChange={handleImageReverso} id='dniReverso' className='hidden' />
                    </label>}
            </div>
            <Button3 onClick={handleSubirDni}>Cargar</Button3>
        </div>
    );
}