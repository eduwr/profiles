import { Profile } from "./profile.model";

const profile: Profile = {
  id: '1',
  avatar_url: 'www.google.com',
  bio: 'random bio',
  email: 'edu@mail.com',
  firstName: 'eduardo',
  lastName: 'ricardo'
}



export class ProfileController {
    getProfiles() {
        return [
            profile, profile
        ]
    }
}