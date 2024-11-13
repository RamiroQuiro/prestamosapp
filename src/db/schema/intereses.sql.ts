import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";

export const intereses = sqliteTable("intereses", {
  id: text().primaryKey().unique(),
    usuarioId: text().references(() => users.id),
    value: real().notNull(),
    selectDefault: integer({mode:'boolean'}).default(false),
  });