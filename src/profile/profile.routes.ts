import Elysia, { Static, t } from "elysia";
import { ProfileService } from "./profile.service";
import { ProfileController } from "./profile.controller";

const controller = new ProfileController(new ProfileService());

const createProfileBody = t.Object({
  bio: t.Optional(t.String()),
  email: t.String(),
  firstName: t.String(),
  lastName: t.String(),
});

export type CreateProfileBody = Static<typeof createProfileBody>;

// TODO: those are the routes, not the controller, refactor part of the code to the controller to add more validations
export const profileRoutes = new Elysia({ prefix: "/profiles" })
  .get("", controller.index)
  .post(
    "",
    ({ body }) =>
      controller.create({
        email: body.email,
        bio: body.bio,
        firstName: body.firstName,
        lastName: body.lastName,
      }),
    {
      body: t.Object({
        bio: t.Optional(t.String()),
        email: t.String(),
        firstName: t.String(),
        lastName: t.String(),
      }),
    }
  )
  .delete("/:id", ({ params: { id } }) => controller.delete(id), {
    params: t.Object({
      id: t.String(),
    }),
  });
