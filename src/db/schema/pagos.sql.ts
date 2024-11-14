import { int, integer, real, sqliteTable ,text} from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";
import { prestamos } from "./prestamos.sql";
import { clientes } from "./clientes.sql";
import { cuotas } from "./cuota.sql";

export const pagos = sqliteTable("pagos", {
  id: text('id').primaryKey().unique(),
    prestamoId: text('prestamoId').references(() => prestamos.id),
    clienteId: text('clienteId').references(() => clientes.id),
    usuarioId: text('usuarioId').references(() => users.id),
    cuotaId: text('cuotaId').references(() => cuotas.id),
    monto: real().notNull(),
    estado: text('estado').notNull(),
    fechaPago: integer('fechaPago',{mode:'timestamp'}),
    metodoPago: text('metodoPago'),
    lugarPago: text('lugarPago'),
  });