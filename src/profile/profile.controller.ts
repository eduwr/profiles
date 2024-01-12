import Elysia, { t } from "elysia";
import { ProfileService } from "./profile.service";

const service = new ProfileService();

// TODO: those are the routes, not the controller, refactor part of the code to the controller to add more validations
export const profileRoutes = new Elysia({ prefix: "/profiles" })
  .get("", service.getProfiles)
  .post(
    "",
    ({ body }) => service.createProfile(body),
    {
      body: t.Object({
        bio: t.String(),
        email: t.String(),
        firstName: t.String(),
        lastName: t.String(),
      }),
    }
  )
  .delete("/:id", ({ params: { id } }) => service.deleteProfile({ id }), {
    params: t.Object({
      id: t.String(),
    }),
  });
