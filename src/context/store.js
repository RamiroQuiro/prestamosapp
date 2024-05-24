import { atom } from "nanostores";

const busqueda=atom({
    clientSelect:{

    }
})

const prestamoSimulado=atom({
    importeCuota:0,
    montoTotal:0,
    interesGenerado:0,
    interes:0,
    nCuota:0,

})

export {busqueda , prestamoSimulado}