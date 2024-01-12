import { Elysia } from "elysia";
import { profileRoutes } from "./profile/profile.controller";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(profileRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
