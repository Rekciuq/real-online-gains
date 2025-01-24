import { faker } from "@faker-js/faker/locale/en";
import { SexType } from "@faker-js/faker";
import { createNewUserSeed } from "@/seed/profiles/users/createNewUserSeed";
import { SeedUser } from "@/seed/types";
import ImageService from "@/services/ImageService";

export const createRandomUsersSeed = async () => {
  const randomNumber = faker.number.int({ min: 5, max: 15 });

  console.log("Seeding users...");

  for (let i = 0; i < randomNumber; i++) {
    const sex = faker.person.sex() as SexType;
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const bio = faker.person.bio();
    const gender = faker.person.gender();
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "@example.com",
    });
    const birthDate = faker.date.birthdate();
    const password = faker.internet.password();
    const profilePic = faker.image.avatar();
    const profileImage = await ImageService.convertFromURLToBytes(profilePic);
    const roleId = faker.number.int({ min: 1, max: 3 });

    const newUser: SeedUser = {
      firstName,
      bio,
      lastName,
      gender,
      email,
      birthDate,
      profileImage,
      password,
      roleId,
      isBlocked: false,
    };

    await createNewUserSeed({ user: newUser });
  }

  console.log("Seeding users was completed");
};
