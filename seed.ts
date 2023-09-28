import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Create 50 users with random names and emails
async function createUsers(): Promise<void> {
  for (let i = 0; i < 50; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
      },
    });
  }
}

// 2. Get all users, and create artist profile for the first ten
async function createArtistProfiles(): Promise<void> {
  const users = await prisma.user.findMany();
  for (let i = 0; i < 10; i++) {
    const artistProfile = await prisma.artist.create({
      data: {
        displayName: users[i].name,
        userProfile: {
          connect: {
            id: users[i].id,
          },
        },
      },
    });
  }
}

// 3. Get all artists, and create 2 albums for each
async function createAlbums(): Promise<void> {
  const artists = await prisma.artist.findMany();
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 2; j++) {
      const album = await prisma.album.create({
        data: {
          name: artists[i].displayName + faker.music.genre() + j, // Create a random album name out of the artist's name and a random genre
          artist: {
            connect: {
              id: artists[i].id,
            },
          },
        },
      });
    }
  }
}

// 4. Get all albums, and create 5 songs for each
async function createSongs(): Promise<void> {
  const albums = await prisma.album.findMany();
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 5; j++) {
      const song = await prisma.song.create({
        data: {
          title: faker.music.songName(), // Create a random song name out of a random genre
          album: {
            connect: {
              id: albums[i].id,
            },
          },
          artist: {
            connect: {
              id: albums[i].artistId,
            },
          },
        },
      });
    }
  }
}

// await createUsers();
// await createArtistProfiles();
// await createAlbums();
// await createSongs();
