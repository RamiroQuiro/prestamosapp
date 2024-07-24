import Button3 from '@/components/atomos/Button3';
import { loader } from '@/components/loader/showLoader';
import { showToast } from '@/components/Toast/toastShow';
import React, { useState } from 'react'

export default function FormularioFotoPerfil({user}) { 
    // console.log(user) 
    const [previewUrl, setPreviewUrl] = useState(user.srcPhoto);
    const [file, setFile] = useState(null);

    const handleImageFrente = (event) => {
        const file = event.target.files[0];
        setPreviewUrl(URL.createObjectURL(file));
        setFile(file);
    }



    const handleSubirImage = async () => {
        loader(true)
        if (!file) {
            showToast('No se seleccionó imagen ', {
                background: 'bg-red-600'
            });
            loader(false)
            console.error('No se seleccionó ninguna imagen');
            return;
        }

        try {
            let srcPhoto = previewUrl;

            if (file) {
                const fileExtensionFrente = file.name.split('.').pop();
                const fileRef = ref(storage, `usuario/${user.id}/srcPhoto.${fileExtensionFrente}`);
                const uploadTask = await uploadBytes(fileRef, file);
                srcPhoto = await getDownloadURL(uploadTask.ref);
            }

            const fetching = await fetch(`/api/usuario/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        srcPhoto:srcPhoto
                })
            });

            const response = await fetching.json();
            if (fetching.ok) {
                loader(false)
                showToast('Cambios guardados',{
                    background:'bg-green-600'
                });
            }
            console.log(response);
        } catch (error) {
            loader(false)
            console.error('Error al subir la imagen', error);
        }
    }
    return (
        <div className="w-1/3 flex items-center border-r flex-col gap-3">
            <div className='w-52 h-52 flex fle m-auto items-center justify-center overflow-hidden rounded-lg shadow '>
                {previewUrl ?
                    <div className='relative w-full h-full group'>
                        <label htmlFor="srcPhoto" className='border-dashed border absolute top-0 left-0 rounded-lg hidden group-hover:flex  border-primary-100 w-full h-full items-center justify-center uppercase font-semibold  m-auto cursor-pointer hover:bg-primary-100/40 duration-300 bg-transparent hover:text-white text-xs'>
                            cambiar foto
                            <input type="file" name='srcPhoto' onChange={handleImageFrente} id='srcPhoto' className='hidden' />
                        </label>
                        <img src={previewUrl} alt="frente" width={'200px'} height={'150px'} className='object-contain w-full h-full' />
                    </div>
                    :
                    <label htmlFor="srcPhoto" className='group rounded-lg  w-full h-full items-center justify-center flex uppercase font-semibold  m-auto cursor-pointer hover:bg-primary-100/40 duration-300 hover:text-white text-xs'>
                    <svg className='fill-primary-400' height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M472.412,0H39.588C17.758,0,0,17.758,0,39.588v432.825C0,494.242,17.758,512,39.588,512h432.825 C494.242,512,512,494.242,512,472.412V39.588C512,17.758,494.242,0,472.412,0z M496.165,472.412 c0,13.097-10.656,23.753-23.753,23.753H39.588c-13.097,0-23.753-10.656-23.753-23.753V39.588 c0-13.097,10.656-23.753,23.753-23.753h432.825c13.097,0,23.753,10.656,23.753,23.753V472.412z"></path> </g> </g> <g> <g> <polygon points="42.227,42.227 42.227,87.093 58.062,87.093 58.062,58.062 87.093,58.062 87.093,42.227 "></polygon> </g> </g> <g> <g> <polygon points="424.907,42.227 424.907,58.062 453.938,58.062 453.938,87.093 469.773,87.093 469.773,42.227 "></polygon> </g> </g> <g> <g> <polygon points="58.062,453.938 58.062,424.907 42.227,424.907 42.227,469.773 87.093,469.773 87.093,453.938 "></polygon> </g> </g> <g> <g> <polygon points="453.938,424.907 453.938,453.938 424.907,453.938 424.907,469.773 469.773,469.773 469.773,424.907 "></polygon> </g> </g> <g> <g> <path d="M332.961,326.73c-8.847-4.661-23.377-13.244-30.151-19.299v-16.787c24.696-14.571,41.211-40.648,45.587-72.332 l0.074-0.617v-0.058c0.681-5.58,1.011-10.757,1.011-15.811v-42.64c0.019-0.566,0.056-2.14,0-4.515v-3.546h-0.137 c-0.807-15.275-5.261-48.428-27.861-71.948C305.363,62.4,283.331,53.893,256,53.893c-27.403,0-49.474,8.523-65.601,25.334 c-22.741,23.707-27.039,57.163-27.773,72.265l-0.109,0.005v2.937c-0.06,2.484-0.021,4.139,0,4.743v42.649 c0,5.052,0.33,10.229,1.011,15.811l0.074,0.675c4.376,31.683,20.892,57.76,45.587,72.331v16.86 c-7.422,6.621-23.406,15.665-30.169,19.235c-77.057,25.069-78.699,71.35-78.731,73.313l-0.001,27.495h311.423v-27.407 C411.7,398.163,410.554,351.576,332.961,326.73z M201.893,90.123C214.911,76.591,233.115,69.73,256,69.73 c22.817,0,40.985,6.847,53.999,20.352c18.434,19.129,22.548,47.252,23.434,60.793c-43.725-2.604-76.418-25.207-76.755-25.445 l-12.383-8.748l-0.102,15.163c-0.015,2.225-6.209,9.178-34.321,14.543c-11.741,2.241-23.609,3.495-31.296,4.145 C179.488,136.875,183.645,109.089,201.893,90.123z M179.364,216.674l-0.061-0.506c-0.64-5.112-0.95-9.803-0.95-14.341v-35.38 c7.928-0.631,21.053-1.95,34.341-4.477c22.263-4.234,36.528-10.326,43.1-18.469c13.44,7.69,42.099,21.428,77.854,23.257v35.068 c0,4.538-0.31,9.23-0.95,14.341l-0.034,0.314c-3.982,28.163-19.062,50.921-41.408,62.477l-1.092,0.565l-0.04,0.04 c-10.321,5.103-21.797,7.69-34.123,7.69c-12.304,0-23.763-2.577-34.123-7.691l-1.132-0.604 C198.449,267.43,183.389,244.749,179.364,216.674z M286.975,298.009v9.632c-4.32,4.377-16.024,14.616-30.975,14.616 c-14.434,0-26.155-9.857-30.975-14.62v-9.631c9.714,3.371,20.085,5.082,30.975,5.082 C266.898,303.088,277.276,301.374,286.975,298.009z M395.877,411.711h-0.001H116.124v-11.375 c0.124-2.332,3.098-37.706,68.406-58.736l1.237-0.517c2.344-1.222,19.868-10.477,31.096-19.39 c7.758,6.894,21.633,16.4,39.137,16.4c17.789,0,31.758-9.798,39.17-16.422c11.237,8.954,28.723,18.189,31.064,19.412l1.273,0.529 c65.976,20.901,68.293,56.636,68.37,58.669V411.711z"></path> </g> </g> <g> <g> <polygon points="263.918,217.245 263.918,194.048 248.082,194.048 248.082,233.08 271.556,233.08 271.556,217.245 "></polygon> </g> </g> </g></svg>
                        <span className='absolute z-10 rounded bg-primary-texto text-white px-3 py-1.5'>Foto Perfil</span>
                        <input type="file" name='srcPhoto' onChange={handleImageFrente} id='srcPhoto' className='hidden' />
                    </label>}
            </div>

         
            <Button3 onClick={handleSubirImage}>Cargar</Button3>
        </div>
    );
}
