import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { users } from "./users.sql";

export const clientes = sqliteTable("clientes", {
  id: text('id').primaryKey().unique(),
    usuarioId: text('usuarioId').references(() => users.id),
    dni: integer('dni',{mode:'number'}),
    srcPhoto: text('srcPhoto'),
    nombre: text('nombre').notNull(),
    apellido: text('apellido'),
    email: text('email').notNull(),
    celular: text('celular'),
    direccion: text('direccion'),
    localidad: text('localidad'),
    provincia: text('provincia'),
    ciudad: text('ciudad'),
    pais: text('pais'),
    prestamosCount: integer('prestamosCount',{mode:'number'}).default(0),
    srcDniFrente: text('srcDniFrente'),
    srcDniReverso: text('srcDniReverso'),
    ...timestamps
  });