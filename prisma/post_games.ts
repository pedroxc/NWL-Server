import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main(){
 
  
  await prisma.game.create({
    data:{
      date:'2022-11-12T12:00:00.000Z',
      firstTeamCountryCode:'DE',
      secondTeamCountryCode:'BR',
    }
  })
await prisma.game.create({
  data:{
    date:"2022-11-27T13:16:00.471Z",
    firstTeamCountryCode:'BE',
    secondTeamCountryCode:'MA',

    
  }

})
}
main()