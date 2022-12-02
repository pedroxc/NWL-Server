import fastify, { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/pools/:id/games",
    { onRequest: [authenticate] },
    async (request) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: "asc",
        },
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                poolId: id,
              },
            },
          },
        },
      });

      return {
        games: games.map((game) => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined,
          };
        }),
      };
    }
  );
fastify.post('/game',async(req,replay)=>{


  const createGameBody = z.object({
    firstTeamCountryCode:z.string(),
    secondTeamCountryCode:z.string(),
    date: z.string()
  })

  const {date,firstTeamCountryCode,secondTeamCountryCode}= createGameBody.parse(req.body)

 const game = await prisma.game.create({
    data:{
      date:date,
      firstTeamCountryCode:firstTeamCountryCode,
    secondTeamCountryCode:secondTeamCountryCode,
    }
  })

  return game
}

)

fastify.get('/games/:gameId',{
  onRequest:[authenticate]
},async(res,rep)=>{
  const gameParams = z.object({
    gameId:z.string(),
  })

  const {gameId}=gameParams.parse(res.params)

const game =await prisma.game.findUnique({
  where:{
    id:gameId,
  }
})

return {game}
})
}





