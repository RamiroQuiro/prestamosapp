import { text, real, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";

export const moraCuotas = sqliteTable("moraCuotas", {
  id: text('id').primaryKey().unique(),
  usuarioId: text('usuarioId').references(() => users.id),
  value: real().default(0),
});
