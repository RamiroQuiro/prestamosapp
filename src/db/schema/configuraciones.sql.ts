import { text, integer, real, sqliteTable } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { users } from "./users.sql";

export const configuraciones = sqliteTable("configuraciones", {
    id: text('id').primaryKey().unique(),
    usuarioId: text('usuarioId').references(() => users.id),
    tasaInteres: real().notNull(),
    periodos: integer('periodos',{mode:'number'}).notNull(),
    numeroCuotas: integer('numeroCuotas',{mode:'number'}).notNull(),
    ...timestamps
  });
  