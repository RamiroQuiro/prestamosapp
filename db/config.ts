import { NOW, column, defineDb, defineTable } from "astro:db";

export const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    email: column.text({ unique: true }),
    userName: column.text({ unique: true }),
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

export const Cliente = defineTable({
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
  },
});

export const Prestamo = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    clienteId: column.text({ references: () => Cliente.columns.id }),
    usuarioId: column.text({ references: () => User.columns.id }),
    montoTotal: column.number(),
    montoCuota:column.number(),
    tasaInteres: column.number(),
    nCuotas: column.number(), // en días
    fechaInicio: column.date(),
    fechaFin: column.date({optional:true}),
    fechaCreacion:column.date({default:NOW}),
    montoRestante:column.number({optional:true}),
    estado: column.text({default:'activo'}), // 'activo', 'cancelado', 'finalizado'
    terminado: column.boolean({default:false}),
  },
});

export const Pago = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    prestamoId: column.text({ references: () => Prestamo.columns.id }),
    clienteId: column.text({ references: () => Cliente.columns.id }),
    usuarioId: column.text({ references: () => User.columns.id }),
    monto: column.number(),
    estado:column.text(),
    fechaPago: column.date(),
    metodoPago: column.text(),
    lugarPago: column.text(),
  },
});

export const Configuracion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => User.columns.id }),
    tasaInteres: column.number(),
    periodos: column.number(),
    fechaCreacion: column.date(),
  },
});

//  Historial de Configuraciones
export const HistorialConfiguracion = defineTable({
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
export const RegistroActividades = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    usuarioId: column.text({ references: () => User.columns.id }),
    actividad: column.text(), // Descripción de la actividad
    fecha: column.date(),
  },
});
// https://astro.build/db/config
export default defineDb({
  tables: {User,Prestamo,Cliente,Pago,Configuracion,HistorialConfiguracion,RegistroActividades},
});
