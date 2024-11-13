import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { users } from "./users.sql";

export const clientes = sqliteTable("clientes", {
  id: text().primaryKey().unique(),
    usuarioId: text().references(() => users.id),
    dni: integer(),
    srcPhoto: text(),
    nombre: text().notNull(),
    apellido: text(),
    email: text().notNull(),
    celular: text(),
    direccion: text(),
    localidad: text(),
    provincia: text(),
    ciudad: text(),
    pais: text(),
    prestamosCount: integer({mode:'number'}).default(0),
    srcDniFrente: text(),
    srcDniReverso: text(),
    ...timestamps
  });