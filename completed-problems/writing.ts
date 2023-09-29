import { PrismaClient } from "@prisma/client";
import type { User, Song, Album } from "@prisma/client";

const prisma = new PrismaClient();

// 1. Create a new User with a given name and email, and return the user
export async function createUser(name: string, email: string): Promise<User> {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return user;
}

// We specify that the emails for users must be unique, so running this command twice will fail
// const user: User = await createUser("Alice", "alice@gmail.com");
// console.log(user);

// 2. Modify our function using the createOrConnect pattern to either create a user with a given email, or update the with said email if it already exists
export async function createUserOrConnect(
  name: string,
  email: string
): Promise<User> {
  const user = await prisma.user.upsert({
    where: {
      email: email,
    },
    // Create the user if it doesn't exist
    create: {
      name,
      email,
    },
    // Update the user if it does exist
    update: {
      name,
    },
  });
  return user;
}

// We can now run this command twice without error
// let user2: User = await createUserOrConnect("Aidan", "aidansunbury@gmail.com");
// console.log(user2);

// // Run the command again the exact same way, and we will not error
// user2 = await createUserOrConnect("Aidan", "aidansunbury@gmail.com");
// console.log(user2);

// // Run the command a third time with an updated name, and we will update the user
// user2 = await createUserOrConnect("Aidan Sunbury", "aidansunbury@gmail.com");
// console.log(user2);

// 3. Update given an album and a song title, create a new song in the album
// make sure that the artistId of the song matches the artistId of the album
async function addSongToAlbum(album: Album, songTitle: string): Promise<Song> {
  const updatedSong = await prisma.song.create({
    data: {
      title: songTitle,
      artistId: album.artistId,
      albumId: album.id,
    },
  });
  // The updated song will automatically have the relation defined because we used the appropriate albumId and artistId
  return updatedSong;
}

prisma.album.findFirst().then((album) => {
  if (album) {
    addSongToAlbum(album, "New Song").then((song) => {
      console.log(song);
    });
  }
});
