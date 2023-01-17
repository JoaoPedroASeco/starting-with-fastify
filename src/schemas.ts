import { userSchemas } from "./modules/user/user.schema"
import { productSchemas } from "./modules/product/product.schema"

export const schemas = [
  ...userSchemas,
  ...productSchemas,
]