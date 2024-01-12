import { Elysia } from "elysia";
import { ProfileController } from "./profile/profile.controller";


const profileController = new ProfileController()
const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/profile", profileController.getProfiles)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
