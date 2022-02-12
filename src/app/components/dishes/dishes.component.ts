import { Component, OnInit } from '@angular/core';
import {Dish} from "../../interfaces/dish";
import {DishService} from "../../services/dish.service";

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.dishes.subscribe(dishes => this.dishes = dishes);
  }

}
