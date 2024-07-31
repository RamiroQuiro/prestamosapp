import { NOW, column, count, defineDb, defineTable } from "astro:db";

 const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text({ unique: true }),
    userName: column.text({ }),
    nombre: column.text({optional:true}),
    apellido: column.text({optional:true}),
    password:column.text({optional:true}),
    dni: column.number({optional:true}),
    srcPhoto: column.text({optional:true}),
    celular: column.text({optional:true}),
    direccion: column.text({optional:true}),
    localidad: column.text({optional:true}),
    departamento: column.text({optional:true}),
    ciudad: column.text({optional:true}),
    pais: column.text({optional:true}),
     fechaCreacion: column.date({default:NOW}),
     fechaActualizacion: column.date({optional:true}),
  },
});

 const Cliente = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => User.columns.id }),
    dni: column.number({optional:true}),
    srcPhoto: column.text({optional:true}),
    nombre: column.text(),
    apellido: column.text({optional:true}),
    email: column.text(),
    celular: column.text({optional:true}),
    direccion: column.text({optional:true}),
    localidad: column.text({optional:true}),
    departamento: column.text({optional:true}),
    ciudad: column.text({optional:true}),
    pais: column.text({optional:true}),
    fechaCreacion: column.date({default:NOW}),
    fechaActualizacion: column.date({optional:true}),
    prestamosCount: column.number({ default: 0 }),
    srcDniFrente:column.text({optional:true}),
    srcDniReverso:column.text({optional:true})
  },
});

 const Prestamo = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    clienteId: column.text({ references: () => Cliente.columns.id }),
    usuarioId: column.text({ references: () => User.columns.id }),
    montoTotal: column.number(),
    montoCuota:column.number(),
    capital:column.number(),
    tasaInteres: column.number(),
    modalidad:column.text({default:'mensual'}),
    nCuotas: column.number(), // en días
    fechaInicio: column.date(),
    fechaFin: column.date({optional:true}),
    fechaCreacion:column.date({default:NOW}),
    montoRestante:column.number({optional:true}),
    estado: column.text({default:'activo'}), // 'activo', 'cancelado', 'finalizado'
    terminado: column.boolean({default:false}),
  },
});

 const Cuota = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    prestamoId: column.text({ references: () => Prestamo.columns.id }),
    clienteId: column.text({ references: () => Cliente.columns.id }),
    usuarioId: column.text({ references: () => User.columns.id }),
    numeroCuota: column.number(),
    fechaVencimiento: column.date(),
    mora: column.boolean({default:false}),
    montoMora: column.number({ default: 0 }), 
    monto: column.number(),
    montoPagado: column.number({ default: 0 }),
    pagada: column.boolean({default:false}),
    fechaPago: column.date({optional:true}),
  },
});

const PagoParcial = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    cuotaId: column.text({ references: () => Cuota.columns.id }),
    prestamoId: column.text({ references: () => Prestamo.columns.id }),
    clienteId: column.text({ references: () => Cliente.columns.id }),
    usuarioId: column.text({ references: () => User.columns.id }),
    monto: column.number(),
    fechaPago: column.date(),
    metodoPago: column.text({ optional: true }),
    lugarPago: column.text({ optional: true }),
  },
});


 const Pago = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    prestamoId: column.text({ references: () => Prestamo.columns.id }),
    clienteId: column.text({ references: () => Cliente.columns.id }),
    usuarioId: column.text({ references: () => User.columns.id }),
    cuotaId:column.text({references:()=>Cuota.columns.id}),
    monto: column.number(),
    estado:column.text(),
    fechaPago: column.date(),
    metodoPago: column.text({optional:true}),
    lugarPago: column.text({optional:true}),
  },
});

 const Configuracion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => User.columns.id }),
    tasaInteres: column.number(),
    periodos: column.number(),
    numeroCuotas:column.number(),
    fechaCreacion: column.date(),
  },
});

//  Historial de Configuraciones
 const HistorialConfiguracion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => User.columns.id }),
    tasaInteres: column.number(),
    periodos: column.number(),
    fechaCreacion: column.date(),
    fechaActualizacion: column.date(),
  },
});

// Registro de Actividades
 const RegistroActividades = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => User.columns.id }),
    actividad: column.text(), // Descripción de la actividad
    fecha: column.date(),
  },
});

 const Session = defineTable({
  columns:{
    id:column.text({optional:false,unique:true}),
    userId:column.text({optional:false,references:()=>User.columns.id}),
    expiresAt:column.number({optional:false})
  }
})
// https://astro.build/db/config
export default defineDb({
  tables: {User,Prestamo,Cliente,Pago,Configuracion,PagoParcial,HistorialConfiguracion,Cuota,RegistroActividades,Session},
});
