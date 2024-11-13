import { text, real, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";
import { prestamos } from "./prestamos.sql";
import { clientes } from "./clientes.sql";
import { cuotas } from "./cuota.sql";


export const pagoParciales = sqliteTable("pagoParciales", {
    id: text().primaryKey().unique(),
    cuotaId: text().references(() => cuotas.id),
    prestamoId: text().references(() => prestamos.id),
    clienteId: text().references(() => clientes.id),
    usuarioId: text().references(() => users.id),
    monto: real().notNull(),
    fechaPago: integer({mode:'timestamp'}),
    metodoPago: text(),
    lugarPago: text(),
  });