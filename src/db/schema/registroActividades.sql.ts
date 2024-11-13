
import { users } from "./users.sql";
import timestamps from "./date.helpers";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registroActividades = sqliteTable("registroActividades", {
    id: text().primaryKey().unique(),
    usuarioId: text().references(() => users.id),
    actividad: text().notNull(),
    ... timestamps,
  });