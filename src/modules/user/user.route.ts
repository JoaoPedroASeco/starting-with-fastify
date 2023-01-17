import { FastifyInstance } from "fastify"
import { registerUserHandler, loginHandler, getUsersHandler } from "./user.controller"
import { $ref } from "./user.schema"

export async function userRoutes(server: FastifyInstance ) {
  server.post("/", {
    schema: {
      body: $ref("createUserSchema"),
      response: {
        201: $ref("createuserResponse")
      }
    }
  }, registerUserHandler)

  server.post("/login", { 
    schema: {
      body: $ref("loginSchema"), 
      response: { 
        200: $ref("loginResponseSchema") 
      } 
    } 
  }, loginHandler)

  server.get("/", {
    preHandler: [server.authenticate],
  }, getUsersHandler) 
}
