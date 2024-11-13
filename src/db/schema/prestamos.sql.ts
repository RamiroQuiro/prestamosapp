import { text, integer, real, sqliteTable } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { clientes } from "./clientes.sql";
import { users } from "./users.sql";

export const prestamos = sqliteTable("prestamos", {
    id: text().primaryKey().unique(),
    clienteId: text().references(() => clientes.id),
    usuarioId: text().references(() => users.id),
    montoTotal: real().notNull(),
    montoCuota: real().notNull(),
    capital: real().notNull(),
    tasaInteres: real().notNull(),
    modalidad: text().default("mensual"),
    nCuotas: integer({mode:'number'}).notNull(),
    fechaInicio: integer({mode:'timestamp'}),
    fechaFin: integer({mode:'timestamp'}),
    montoRestante: real(),
    estado: text().default("activo"),
    terminado: integer({mode:'boolean'}).default(false),
    ...timestamps
  });