import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { server } from "../../app";
import { verifyPassword } from "../utils/hash";
import { CreateUserInput, loginInput } from "./user.schema";
import { createUser, findUserByEmail, findUsers } from "./user.service";

export async function registerUserHandler(request: FastifyRequest<{ Body: CreateUserInput; }>, reply: FastifyReply) {
  const body = request.body

  try {
    const user = await createUser(body)

    return reply.code(201).send(user)
  } catch (error) {
    console.error(error)
    return reply.code(500).send(error)
  }
}

export async function loginHandler(request: FastifyRequest<{ Body: loginInput; }>, reply: FastifyReply) {
  const body = request.body

  const user = await findUserByEmail(body.email)

  if (!user) return reply.code(404).send("Incorrect email")

  const correctPassword = verifyPassword(
    body.password,
    user.salt,
    user.password
  )

  if (!correctPassword) return reply.code(404).send("Incorrect password")

  const { password, salt, ...rest } = user

  return { accessToken: server.jwt.sign(rest)} 
}

export async function getUsersHandler() {
  return await findUsers()
}