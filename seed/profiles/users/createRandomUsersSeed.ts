import { faker } from "@faker-js/faker/locale/en";
import { SexType } from "@faker-js/faker";
import { createNewUserSeed } from "@/seed/profiles/users/createNewUserSeed";

export const createRandomUsersSeed = async () => {
  const randomNumber = faker.number.int({ min: 5, max: 15 });

  console.log("Seeding users...");

  for (let i = 0; i < randomNumber; i++) {
    const sex = faker.person.sex() as SexType;
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName(sex);
    const email = faker.internet.email({
      firstName,
      lastName,
      provider: "@example.com",
    });
    const fullName = firstName + " " + lastName;

    const newUser = { name: fullName, email };

    await createNewUserSeed({ user: newUser });
  }

  console.log("Seeding users was completed");
};
