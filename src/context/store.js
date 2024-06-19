import { atom } from "nanostores";

const busqueda=atom({
    clientSelect:{

    }
})

const pdfPrint=atom({
    headers:[],
    rows:[],
    title:'',
    subtitle:'',
    lorem:'',
    positionPage:'A4',
    fontSize:10,
    fontSizeTable:10
})

const columnSelectTable=atom({
    seleccion:'',
    asc:true
})

const prestamoSimulado=atom({
    usuarioId:'',
    clienteId:'',
    montoCuota:0,
    montoTotal:0,
    capital:0,
    modalidad:'',
    interesGenerado:0,
    tasaInteres:0,
    nCuotas:0,
    fechaInicio:new Date(),

})

const filtrosBusquedaPrestamos=atom({
    filtro:'todos',
    fecha:''
})

export {busqueda, pdfPrint, filtrosBusquedaPrestamos,prestamoSimulado,columnSelectTable}