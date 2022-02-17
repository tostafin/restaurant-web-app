export interface Dish {
  id?: string;
  name: string;
  cuisine: string;
  categories: string[];
  price: number;
  ingredients: string[];
  quantity: number;
  description: string;
  numOfImages: number;
}
