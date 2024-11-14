import { text, integer, real, sqliteTable } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { clientes } from "./clientes.sql";
import { users } from "./users.sql";

export const prestamos = sqliteTable("prestamos", {
    id: text('id').primaryKey().unique(),
    clienteId: text('clienteId').references(() => clientes.id),
    usuarioId: text('usuarioId').references(() => users.id),
    montoTotal: real().notNull(),
    montoCuota: real().notNull(),
    capital: real().notNull(),
    tasaInteres: real().notNull(),
    modalidad: text('modalidad').default("mensual"),
    nCuotas: integer('nCuotas',{mode:'number'}).notNull(),
    fechaInicio: integer('fechaInicio',{mode:'timestamp'}),
    fechaFin: integer('fechaFin',{mode:'timestamp'}),
    montoRestante: real(),
    estado: text('estado').default("activo"),
    terminado: integer('terminado',{mode:'boolean'}).default(false),
    ...timestamps
  });