import { text, real, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./users.sql";

export const moraCuotas = sqliteTable("moraCuotas", {
  id: text().primaryKey().unique(),
  usuarioId: text().references(() => users.id),
  value: real().default(0),
});
