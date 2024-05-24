import { atom } from "nanostores";

const busqueda=atom({
    clientSelect:{

    }
})

const prestamoSimulado=atom({
    usuarioId:'',
    clienteId:'',
    importeCuota:0,
    montoTotal:0,
    interesGenerado:0,
    tasaInteres:0,
    nCuota:0,

})

export {busqueda , prestamoSimulado}