import { PrismaClient } from "@prisma/client";
import type { User, Song, Album, Artist } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Find a song by a given name, and return it
export async function findSongByName(title: string): Promise<Song | null> {
  const song = await prisma.song.findFirst({
    where: {
      title: title,
    },
  });
  return song;
}
findSongByName("Pony Time").then((song) => console.log(song));

// 2. Find all songs by a given artist, and return them, given the artist id
export async function findSongsByArtist(artistId: number): Promise<Song[]> {
  const songs = await prisma.song.findMany({
    where: {
      artist: {
        id: artistId,
      },
    },
  });
  return songs;
}

// 3. Find the first 10 songs in the database, and return them
export async function firstTenSongs(): Promise<Song[]> {
  const songs = await prisma.song.findMany({
    take: 10,
  });
  return songs;
}

// 4. Find all of the artists that have a song with the word "Love" in the title
export async function artistsWithLove(): Promise<Artist[]> {
  const artists = await prisma.artist.findMany({
    where: {
      songs: {
        some: {
          title: {
            contains: "love",
          },
        },
      },
    },
  });
  return artists;
}

// 5. Find all users whose name starts with one of two given letters
export async function usersWithLetters(
  letter1: string,
  letter2: string
): Promise<User[]> {
  const users = await prisma.user.findMany({
    where: {
      // Logical OR operator
      OR: [
        {
          name: {
            startsWith: letter1,
          },
        },
        {
          name: {
            startsWith: letter2,
          },
        },
      ],
    },
  });
  return users;
}
