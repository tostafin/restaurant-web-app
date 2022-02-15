import { Component, OnInit } from '@angular/core';
import { Dish } from "../../interfaces/dish";
import { DishService } from "../../services/dish.service";
import { DishesInfoService } from "../../services/dishes-info.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];

  constructor(private dishService: DishService,
              public dishesInfo: DishesInfoService) {
  }

  ngOnInit(): void {
    this.getDishes();
    this.dishesInfo.getDishesInfo();
  }

  getDishes(): void {
    this.dishService.getDishes().subscribe(dishes => {
      this.dishes = dishes;
      this.filteredDishes = dishes;
    });
  }

  getFilteredDishes(filteredDishes: Dish[]) {
    this.filteredDishes = filteredDishes;
  }

  // Dish cards
  getImageUrl(dishId: string | undefined, idx: string): string {
    return "https://firebasestorage.googleapis.com/v0/b/restaurant-it.appspot.com/o/images%2Fdishes%2F" + dishId + "-" +
      idx + ".jpg?alt=media";
  }

}
