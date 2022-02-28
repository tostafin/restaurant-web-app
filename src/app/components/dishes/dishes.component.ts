import { Component, OnInit } from '@angular/core';
import { Dish } from "../../interfaces/dish";
import { DishService } from "../../services/dish.service";
import { DishesInfoService } from "../../services/dishes-info.service";
import { Router } from "@angular/router";
import { DishOrderService } from "../../services/dish-order.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];

  constructor(private dishService: DishService,
              public dishesInfoService: DishesInfoService,
              public dishOrderService: DishOrderService,
              public authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getDishes();
    this.dishesInfoService.getDishesInfo();
    this.dishOrderService.getCurrOrder();
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

  goToDishDetails(dishName: string, dishId: string | undefined) {
    this.router.navigate(["dishes/" + dishName.replace(/\s+/g, '-').toLowerCase(),
      { dishId: dishId }])
      .catch(e => console.error(e));
  }

}
