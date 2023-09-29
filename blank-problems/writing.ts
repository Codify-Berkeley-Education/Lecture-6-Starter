import { PrismaClient } from "@prisma/client";
import type { User, Song, Album, Artist } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Create a new User with a given name and email, and return the user

// 2. Modify our function using the to either create a user with a given email, or update the with said email if it already exists (upsert)

// 3. Update given an album and a new song, add the song to the album
