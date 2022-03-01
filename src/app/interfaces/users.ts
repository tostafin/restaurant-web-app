import { DishOrder } from "./dish-order";
import { DishReview } from "./dish-review";
import { Roles } from "./roles";

export interface Users {
  uid?: string;
  username: string;
  numOfOrders: number;
  currOrder: { [key: string]: DishOrder };
  prevOrders: { [key: string]: DishOrder }[];
  reviews: DishReview[];
  roles: Roles;
  banned: boolean;
}
