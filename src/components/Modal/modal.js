
const modalMensaje = (mensaje,isFormulario) => {
    const container = document.getElementById('mensaje-modal');
    const parrafo = document.getElementById('textoModal');
    const closeButton = document.getElementById('botonCerrarModal');
    const botonAceptar = document.getElementById('botonAceptar');

    return new Promise((resolve, reject) => {

        // Crea un elemento para la notificación
        container.style.display = 'flex';
        const children = document.createElement('div');
        if (!isFormulario) {
            children.classList.add('modalMensaje');
            parrafo.innerHTML = mensaje;
        }else{
            children.appendChild(mensaje)
        }

        // Función para cerrar el modal
        const closeModal = () => {
            container.style.display = 'none';
            resolve(false);
        };
        const handleConfirm = () => {
            container.style.display = 'none';
            resolve(true);
        };

        // Evento para cerrar el modal
        closeButton.addEventListener('click', closeModal);



        botonAceptar.addEventListener('click', handleConfirm);



    });
};

export { modalMensaje };
