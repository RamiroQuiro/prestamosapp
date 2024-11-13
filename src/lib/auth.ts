import db from "@/db";
import { sessions } from "@/db/schema/sessions.sql";
import { users } from "@/db/schema/users.sql";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db,sessions,users); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}