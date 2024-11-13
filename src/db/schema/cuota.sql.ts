import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";
import { prestamos } from "./prestamos.sql";
import { clientes } from "./clientes.sql";

export const cuotas = sqliteTable("cuotas", {
    id: text('id').primaryKey().unique(),
    prestamoId: text('prestamoId').references(() => prestamos.id),
    clienteId: text('clienteId').references(() => clientes.id),
    usuarioId: text('usuarioId').references(() => users.id),
    numeroCuota: integer({mode:'number'}).notNull(),
    fechaVencimiento: integer({mode:'timestamp'}),
    mora: integer({mode:'boolean'}).default(false),
    montoMora: real().default(0),
    monto: real().notNull(),
    montoPagado: real().default(0),
    pagada: integer({mode:'boolean'}).default(false),
    fechaPago: integer({mode:'timestamp'}),
  });