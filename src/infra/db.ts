import { Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
import { Pool } from "pg";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: Bun.env.DB_HOST,
      database: Bun.env.DB_NAME,
      user: Bun.env.DB_USER,
      password: Bun.env.DB_PASSWORD,
      port: Bun.env.DB_PORT,
    }),
  }),
});
