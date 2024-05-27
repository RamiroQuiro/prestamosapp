import { atom } from "nanostores";

const busqueda=atom({
    clientSelect:{

    }
})

const prestamoSimulado=atom({
    usuarioId:'',
    clienteId:'',
    montoCuota:0,
    montoTotal:0,
    interesGenerado:0,
    tasaInteres:0,
    nCuotas:0,
    fechaInicio:new Date(),

})

export {busqueda , prestamoSimulado}