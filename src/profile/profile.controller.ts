import { ProfileService } from "./profile.service";
import { CreateProfileBody } from "./profile.routes";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  async index() {
    return this.profileService.getProfiles();
  }

  async create(body: CreateProfileBody) {
    const bio = body.bio ?? null;
    return this.profileService.createProfile({ ...body, bio });
  }

  async delete(id: string) {
    return this.profileService.deleteProfile({ id });
  }
}
