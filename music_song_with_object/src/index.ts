import { Elysia, t } from "elysia";
import { PrismaClient } from '@prisma/client';
import { swagger } from "@elysiajs/swagger";

const prisma = new PrismaClient();

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Bun Elysia API Documentation",
          version: "1.0.0",
        },
      },
    })
  )
  .post(
    "/users",
    async ({ body, set }) => {
      const { name, email, firstName, lastName, password } = body;
      const user = await prisma.user.create({
        data: { name, email, firstName, lastName, password },
      });
      return user;
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        firstName: t.String(),
        lastName: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/users", async () => {
    const users = await prisma.user.findMany();
    return users;
  })
  .get("/users/:id", async ({ params: { id }, set }) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return user || (set.status = 404, "Not found");
  })
  .put(
    "/users/:id",
    async ({ params: { id }, body, set }) => {
      const { name, email, firstName, lastName, password } = body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email, firstName, lastName, password },
      });
      return updatedUser;
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        firstName: t.String(),
        lastName: t.String(),
        password: t.String(),
      }),
    }
  )
  .delete("/users/:id", async ({ params: { id }, set }) => {
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return deletedUser || (set.status = 404, "Not found");
  })
  .post(
    "/songs",
    async ({ body, set }) => {
      const { name, artistId, duration, url } = body;
      const song = await prisma.song.create({
        data: { name, artistId, duration, url },
      });
      return song;
    },
    {
      body: t.Object({
        name: t.String(),
        artistId: t.Number(),
        duration: t.Number(),
        url: t.String(),
      }),
    }
  )
  .get("/songs", async () => {
    const songs = await prisma.song.findMany();
    return songs;
  })
  .get("/songs/:id", async ({ params: { id }, set }) => {
    const song = await prisma.song.findUnique({
      where: { id: Number(id) },
    });
    return song || (set.status = 404, "Not found");
  })
  .put(
    "/songs/:id",
    async ({ params: { id }, body, set }) => {
      const { name, artistId, duration, url } = body;
      const updatedSong = await prisma.song.update({
        where: { id: Number(id) },
        data: { name, artistId, duration, url },
      });
      return updatedSong;
    },
    {
      body: t.Object({
        name: t.String(),
        artistId: t.Number(),
        duration: t.Number(),
        url: t.String(),
      }),
    }
  )
  .delete("/songs/:id", async ({ params: { id }, set }) => {
    const deletedSong = await prisma.song.delete({
      where: { id: Number(id) },
    });
    return deletedSong || (set.status = 404, "Not found");
  })
  .post(
    "/artists",
    async ({ body, set }) => {
      const { name } = body;
      const artist = await prisma.artist.create({
        data: { name },
      });
      return artist;
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    }
  )
  .get("/artists", async () => {
    const artists = await prisma.artist.findMany();
    return artists;
  })
  .get("/artists/:id", async ({ params: { id }, set }) => {
    const artist = await prisma.artist.findUnique({
      where: { id: Number(id) },
    });
    return artist || (set.status = 404, "Not found");
  })
  .put(
    "/artists/:id",
    async ({ params: { id }, body, set }) => {
      const { name } = body;
      const updatedArtist = await prisma.artist.update({
        where: { id: Number(id) },
        data: { name },
      });
      return updatedArtist;
    },
    {
      body: t.Object({
        name: t.String(),
      }),
    }
  )
  .delete("/artists/:id", async ({ params: { id }, set }) => {
    const deletedArtist = await prisma.artist.delete({
      where: { id: Number(id) },
    });
    return deletedArtist || (set.status = 404, "Not found");
  })
  .post(
    "/playlists",
    async ({ body, set }) => {
      const { name, userId, songIds } = body;
      const playlist = await prisma.playlist.create({
        data: {
          name,
          userId,
          songs: {
            connect: songIds.map((id) => ({ id: Number(id) })),
          },
        },
      });
      return playlist;
    },
    {
      body: t.Object({
        name: t.String(),
        userId: t.Number(),
        songIds: t.Array(t.Number()),
      }),
    }
  )
  .get("/playlists", async () => {
    const playlists = await prisma.playlist.findMany();
    return playlists;
  })
  .get("/playlists/:id", async ({ params: { id }, set }) => {
    const playlist = await prisma.playlist.findUnique({
      where: { id: Number(id) },
    });
    return playlist || (set.status = 404, "Not found");
  })
  .put(
    "/playlists/:id",
    async ({ params: { id }, body, set }) => {
      const { name, userId, songIds } = body;
      const updatedPlaylist = await prisma.playlist.update({
        where: { id: Number(id) },
        data: {
          name,
          userId,
          songs: {
            connect: songIds.map((id) => ({ id: Number(id) })),
          },
        },
      });
      return updatedPlaylist;
    },
    {
      body: t.Object({
        name: t.String(),
        userId: t.Number(),
        songIds: t.Array(t.Number()),
      }),
    }
  )
  .delete("/playlists/:id", async ({ params: { id }, set }) => {
    const deletedPlaylist = await prisma.playlist.delete({
      where: { id: Number(id) },
    });
    return deletedPlaylist || (set.status = 404, "Not found");
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
