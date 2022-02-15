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

  constructor(private dishService: DishService) {
  }

  getDishesInfo(): void {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      this.getMinAndMaxPrice();
    });
  }

  changeCurrCurrency(): void {
    if (this.currCurrency === "USD") {
      this.currCurrency = "EUR";
      this.exchangeRate = this.dollarToEuro;
      this.filterMinPrice = Math.ceil(this.filterMinPrice * this.exchangeRate);
      this.filterMaxPrice = Math.ceil(this.filterMaxPrice * this.exchangeRate);
    }
    else {
      this.currCurrency = "USD";
      this.exchangeRate = 1;
      this.filterMinPrice = this.minPrice;
      this.filterMaxPrice = this.maxPrice;
    }
  }

  getDishPrice(price: number): number {
    return Math.ceil(price * this.exchangeRate);
  }

  getMinAndMaxPrice(): void {
    for (let i = 1; i < this.dishes.length; i += 2) {
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
}
