import { text, integer, real, sqliteTable } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { users } from "./users.sql";

export const configuraciones = sqliteTable("configuraciones", {
    id: text().primaryKey().unique(),
    usuarioId: text().references(() => users.id),
    tasaInteres: real().notNull(),
    periodos: integer({mode:'number'}).notNull(),
    numeroCuotas: integer({mode:'number'}).notNull(),
    ...timestamps
  });
  