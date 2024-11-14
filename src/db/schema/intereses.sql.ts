import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";

export const intereses = sqliteTable("intereses", {
  id: text('id').primaryKey().unique(),
    usuarioId: text('usuarioId').references(() => users.id),
    value: real().notNull(),
    selectDefault: integer('selectDefault',{mode:'boolean'}).default(false),
  });