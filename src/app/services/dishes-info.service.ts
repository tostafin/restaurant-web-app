import { Injectable } from '@angular/core';
import { DishService } from "./dish.service";
import { Dish } from "../interfaces/dish";

@Injectable({
  providedIn: 'root'
})
export class DishesInfoService {
  dishes: Dish[] = [];
  dollarToEuro: number = 0.88;
  currCurrency: string = "USD";
  exchangeRate: number = 1;

  minPrice: number = Number.MAX_SAFE_INTEGER;
  maxPrice: number = -1;
  filterMaxPrice: number = -1;
  filterMinPrice: number = Number.MAX_SAFE_INTEGER;

  dishesRating: { [key: string]: number } = {};

  readonly numOfSourceSets: number = 2;

  constructor(private dishService: DishService) {
  }

  getDishesInfo(): void {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      this.getMinAndMaxPrice();
      this.getDishesRatings();
    });
  }

  changeCurrCurrency(): void {
    if (this.currCurrency === "USD") {
      this.currCurrency = "EUR";
      this.exchangeRate = this.dollarToEuro;
      this.filterMinPrice = Math.ceil(this.filterMinPrice * this.exchangeRate);
      this.filterMaxPrice = Math.ceil(this.filterMaxPrice * this.exchangeRate);
    } else {
      this.currCurrency = "USD";
      this.exchangeRate = 1;
      this.filterMinPrice = this.minPrice;
      this.filterMaxPrice = this.maxPrice;
    }
  }

  getDishPrice(price: number): number {
    return Math.ceil(price * this.exchangeRate);
  }

  getImageUrl(dishId: string | undefined, idx: number): string {
    return "https://firebasestorage.googleapis.com/v0/b/restaurant-it.appspot.com/o/images%2Fdishes%2F" + dishId + "-" +
      idx.toString() + ".jpg?alt=media";
  }

  getMinAndMaxPrice(): void {
    const numOfDishes: number = this.dishes.length;
    let startIdx: number;
    if (numOfDishes % 2 === 0) {
      if (this.dishes[0].price < this.dishes[1].price) {
        this.minPrice = this.dishes[0].price;
        this.maxPrice = this.dishes[1].price;
      } else {
        this.minPrice = this.dishes[1].price;
        this.maxPrice = this.dishes[0].price;
      }
      startIdx = 2;
    } else {
      this.minPrice = this.maxPrice = this.dishes[0].price;
      startIdx = 1;
    }
    for (let i = startIdx; i < this.dishes.length - 1; i += 2) {
      if (this.dishes[i].price < this.dishes[i + 1].price) {
        if (this.dishes[i].price < this.minPrice) this.minPrice = this.dishes[i].price;

        if (this.dishes[i + 1].price > this.maxPrice) this.maxPrice = this.dishes[i + 1].price;
      } else {
        if (this.dishes[i].price > this.maxPrice) this.maxPrice = this.dishes[i].price;

        if (this.dishes[i + 1].price < this.minPrice) this.minPrice = this.dishes[i + 1].price;
      }
    }
    this.filterMinPrice = this.minPrice;
    this.filterMaxPrice = this.maxPrice;
  }

  getDishesRatings(): void {
    for (let dish of this.dishes) {
      let avgRating: number = 0;
      if (dish.reviews.length > 0) {
        avgRating = dish.reviews.reduce((a, b) => a + b.rating, 0) / dish.reviews.length;
      }

      if (dish.id !== undefined) {
        this.dishesRating[dish.id] = Number((Math.round(avgRating * 100) / 100).toFixed(1));
      }
    }
  }
}
