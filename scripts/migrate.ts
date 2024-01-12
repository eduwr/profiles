import { Migrator } from "kysely";
import path from "path";
const migrationPath = path.join("..", "database", "migrations")

const migrator = new Migrator({
  db: {} as any,
  path: migrationPath
} as any);



await migrator.migrateToLatest();
