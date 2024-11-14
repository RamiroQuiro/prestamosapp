import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";

export const nCuotas = sqliteTable("nCuotas", {
  id: text('id').primaryKey().unique(),
    usuarioId: text('usuarioId').references(() => users.id),
    value: integer('value',{mode:'number'}).notNull(),
    selectDefault: integer('selectDefault',{mode:'boolean'}).default(false),
  });