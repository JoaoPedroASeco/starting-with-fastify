import { productRoutes } from "./modules/product/product.route";
import { userRoutes } from "./modules/user/user.route";

export const routes = [
  {
    route: userRoutes,
    prefix: "/users"
  }, 
  {
    route: productRoutes,
    prefix: "/products"
  }
]