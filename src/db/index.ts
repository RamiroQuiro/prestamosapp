import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({ 
    connection: { 
        url: import.meta.env.TURSO_DATABASE_URL!, 
        authToken: import.meta.env.TURSO_AUTH_TOKEN!
    }
  });

export default db
