import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users/count", async () => {
    const count = await prisma.user.count();
    return { count };
  });

  fastify.get("/hello", async (req, reply) => {
    return reply.status(200).send({
      message: "hello world",
    });
  });
}
