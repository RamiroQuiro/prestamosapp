
import { users } from "./users.sql";
import timestamps from "./date.helpers";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registroActividades = sqliteTable("registroActividades", {
    id: text('id').primaryKey().unique(),
    usuarioId: text('usuarioId').references(() => users.id),
    actividad: text('actividad').notNull(),
    ... timestamps,
  });