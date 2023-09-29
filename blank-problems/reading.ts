import { PrismaClient } from "@prisma/client";
import type { User, Song, Album, Artist } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Find a song by a given name, and return it

// 2. Find all songs by a given artist, and return them, given the artist id

// 3. Find the first 10 songs in the database, and return them

// 4. Find all of the artists that have a song with the word "Love" in the title
