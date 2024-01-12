import {
  Migrator,
  Kysely,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";
import path from "path";
import { Pool } from "pg";

import { promises as fs } from "fs";

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: "localhost",
      database: "nero",
      user: "user",
      password: "pass",
      port: 5432,
    }),
  }),
});

const migrationPath = path.join(
  import.meta.dir,
  "..",
  "database",
  "migrations"
);
const migrator = new Migrator({
  db: db,

  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: migrationPath,
  }),
});

await migrator.migrateToLatest();
