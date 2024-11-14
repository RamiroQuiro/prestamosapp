import { text, real, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";
import { prestamos } from "./prestamos.sql";
import { clientes } from "./clientes.sql";
import { cuotas } from "./cuota.sql";


export const pagoParciales = sqliteTable("pagoParciales", {
    id: text('id').primaryKey().unique(),
    cuotaId: text('cuotaId').references(() => cuotas.id),
    prestamoId: text('prestamoId').references(() => prestamos.id),
    clienteId: text('clienteId').references(() => clientes.id),
    usuarioId: text('usuarioId').references(() => users.id),
    monto: real().notNull(),
    fechaPago: integer('fechaPago',{mode:'timestamp'}),
    metodoPago: text('metodoPago'),
    lugarPago: text('lugarPago'),
  });