import { Component, OnInit } from '@angular/core';
import { Dish } from "../../interfaces/dish";
import { DishService } from "../../services/dish.service";
import { DishesInfoService } from "../../services/dishes-info.service";
import { Router } from "@angular/router";
import { DishOrderService } from "../../services/dish-order.service";
import { AuthService } from "../../services/auth.service";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];
  filteredDishes: Dish[] = [];
  filteredDishesComponent: Dish[] = [];

  numOfDishes: number = 0;
  dishesNumArr: number[] = [];
  pages: number[] = [1];
  currPage: number = 1;

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
      this.filteredDishesComponent = dishes;
      this.numOfDishes = this.dishes.length;
      this.dishesNumArr = Array(this.numOfDishes).fill(1).map((x, i) => i + 1);
    });
  }

  getFilteredDishes(filteredDishes: Dish[]) {
    this.filteredDishes = filteredDishes;
  }

  goToDishDetails(dishName: string, dishId: string | undefined) {
    this.router.navigate(["dishes/" + dishName.replace(/\s+/g, '-').toLowerCase(),
      {dishId: dishId}])
      .catch(e => console.error(e));
  }

  changePageNum(dishesNum: MatSelectChange) {
    this.numOfDishes = dishesNum.value;
    this.updatePagination();
  }

  changeCurrPage(page: MatSelectChange) {
    this.currPage = page.value;
    this.filteredDishesComponent = this.paginate(this.filteredDishes);
  }

  paginate(dishes: Dish[]) {
    const idx = this.numOfDishes * (this.currPage - 1);
    return dishes.slice(idx, idx + this.numOfDishes);
  }

  updatePagination() {
    const numOfPages = Math.ceil(this.filteredDishes.length / this.numOfDishes);
    if (!isNaN(this.currPage)) this.currPage = Math.min(this.currPage, numOfPages);
    else this.currPage = numOfPages;
    this.filteredDishesComponent = this.paginate(this.filteredDishes);
    if (this.numOfDishes !== 0) this.pages = Array(numOfPages).fill(1).map((x, i) => i + 1);
    else this.pages = [];
  }

}
