import { PrismaClient } from "@prisma/client";
import type { User } from "@prisma/client";

// 1. Create a new User with a given name and email, and return the user
const prisma = new PrismaClient();
export async function createUser(name: string, email: string): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  await prisma.$disconnect();
  return user;
}

const user = await createUser("Alice", "alice2@gmail.com");
console.log(user);
