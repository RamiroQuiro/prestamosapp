import { int, integer, real, sqliteTable ,text} from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";
import { prestamos } from "./prestamos.sql";
import { clientes } from "./clientes.sql";
import { cuotas } from "./cuota.sql";

export const pagos = sqliteTable("pagos", {
  id: text().primaryKey().unique(),
    prestamoId: text().references(() => prestamos.id),
    clienteId: text().references(() => clientes.id),
    usuarioId: text().references(() => users.id),
    cuotaId: text().references(() => cuotas.id),
    monto: real().notNull(),
    estado: text().notNull(),
    fechaPago: integer({mode:'timestamp'}),
    metodoPago: text(),
    lugarPago: text(),
  });