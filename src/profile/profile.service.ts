import { DB } from "kysely-codegen";
import { db } from "../infra/db";

export class ProfileService {
  async getProfiles() {
    return db.selectFrom("profiles").selectAll("profiles").execute();
  }

  async createProfile({
    bio,
    email,
    firstName,
    lastName,
  }: Pick<DB["profiles"], "bio" | "email" | "firstName" | "lastName">) {
    const profile = {
      id: crypto.randomUUID(),
      avatar_url: "",
      bio,
      email,
      firstName,
      lastName,
    } as const;

    return db.insertInto("profiles").values(profile).execute();
  }

  async deleteProfile({ id }: Pick<DB["profiles"], "id">) {
    return db.deleteFrom("profiles").where("id", "=", id).executeTakeFirst();
  }
}
