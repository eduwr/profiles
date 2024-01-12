import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("profiles")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("firstName", "varchar")
    .addColumn("lastName", "varchar")
    .addColumn("avatar_url", "varchar")
    .addColumn("bio", "varchar(500)")
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamptz", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("deleted_at", "timestamptz")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("profiles").execute();
}
