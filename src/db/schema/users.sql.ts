import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import timestamps from "./date.helpers";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: text('id').primaryKey().unique(),
    email: text('email').notNull().unique(),
    userName: text('userName'),
    nombre: text('nombre'),
    apellido: text('apellido'),
    password: text('password'),
    dni: integer({mode:'number'}),
    srcPhoto: text('srcPhoto'),
    celular: text('celular'),
    direccion: text('direccion'),
    localidad: text('localidad'),
    provincia: text('provincia'),
    ciudad: text('ciudad'),
    pais: text('pais'),
    formulaPersonalizada: text('formulaPersonalizada').default("(capital * ((tasaInteres / 100 / 12) * (1 + tasaInteres / 100 / 12) ^ cuotas)) / ((1 + tasaInteres / 100 / 12) ^ cuotas - 1)"),
    created_at: text('created_at').notNull().default(sql`(current_timestamp)`),
});