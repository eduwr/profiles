import {
  Migrator,
  Kysely,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";
import path from "path";
import { Pool } from "pg";
import { DB } from "kysely-codegen";
import { promises as fs } from "fs";

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: Bun.env.DATABASE_URL,
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

const migrateAll = async () => {
  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
};

const revertLastMigration = async () => {
  const { error, results } = await migrator.migrateDown();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was reverted successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to revert migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to revert migration");
    console.error(error);
    process.exit(1);
  }
};

const acceptedArguments = {
  DOWN: "--down",
} as const;

const [_, __, ...args] = Bun.argv;

const getMigrationHandler = (args: string[]) => {
  if (args.includes(acceptedArguments.DOWN)) {
    return revertLastMigration;
  }

  return migrateAll;
};

await getMigrationHandler(args)();

await db.destroy();
