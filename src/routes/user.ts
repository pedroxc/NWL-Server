import fastify, { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

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

  fastify.get('/participant/:id',
  {onRequest:[authenticate]},
  async (request)=>{
    const participantParams = z.object({
      id:z.string()
    })
const {id}= participantParams.parse(request.params)

const participant = await prisma.participant.findUnique({
  where:{
    id:id,
  }
})
const user = await prisma.user.findUnique({
  where:{
    id:participant?.userId
  }
})
return user

  })
}
