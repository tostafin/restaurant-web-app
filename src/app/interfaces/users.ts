import { DishOrder } from "./dish-order";
import { DishReview } from "./dish-review";

export interface Users {
  username: string;
  numOfOrders: number;
  currOrder: { [key: string]: DishOrder };
  prevOrders: { [key: number]: { [key: string]: DishOrder } };
  reviews: DishReview[];
}
