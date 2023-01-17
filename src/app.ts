import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import fastify from "fastify"
import fjwt from "fastify-jwt-deprecated"
import { schemas } from "./schemas";
import { routes } from "./routes";

export const server = fastify()

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify-jwt-deprecated" {
  interface FastifyJWT {
    user: {
      email: string;
      password: string;
      id: number;
    }
  }
}

server.register(fjwt, { secret: "234k5n2j3k4n5lkj234b5kj234b5ljk2b34kj52bj345" })

server.decorate("authenticate", async (request: any, reply: any) => {
  try {
    await request.jwtVerify()
  } catch (error) {
    return reply.send(error)
  }
})


server.get("/healtcheck", async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.status(200).send("success")
})

async function main() {
  schemas.forEach(schema => server.addSchema(schema))
  routes.forEach(({ route, prefix }) => server.register(route, { prefix }))
  
  try {
    await server.listen(5000, '0.0.0.0')
    console.log("Server is on-line! http://localhost:5000")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

main()

