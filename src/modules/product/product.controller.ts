import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { CreateProductInput } from "./product.schema";
import { createProduct, getProducts } from "./product.service";

export async function createProductHandler(request: FastifyRequest<{ Body: CreateProductInput }>, reply: FastifyReply) {
  return await createProduct({
    ...request.body,
    ownerId: request.user.id,
  })
}

export async function getProductsHandler() {
  return await getProducts()
}
