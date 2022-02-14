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
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

  getImageUrl(dishId: string | undefined, idx: string): string {
    return "https://firebasestorage.googleapis.com/v0/b/restaurant-it.appspot.com/o/images%2Fdishes%2F" + dishId + "-" +
    idx + ".jpg?alt=media";
  }

}
