import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";

export const nCuotas = sqliteTable("nCuotas", {
  id: text().primaryKey().unique(),
    usuarioId: text().references(() => users.id),
    value: integer({mode:'number'}).notNull(),
    selectDefault: integer({mode:'boolean'}).default(false),
  });