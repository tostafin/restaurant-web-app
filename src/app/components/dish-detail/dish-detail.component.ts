import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Dish } from "../../interfaces/dish";
import { DishService } from "../../services/dish.service";
import { DishesInfoService } from "../../services/dishes-info.service";
import { Location } from "@angular/common";
import { DishOrderService } from "../../services/dish-order.service";


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish!: Dish;
  dishImageIdx: number = 0;


  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              public dishesInfoService: DishesInfoService,
              public dishOrderService: DishOrderService,
              private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getCurrDish();
  }

  goBack(): void {
    this.location.back();
  }

  getCurrDish(): void {
    const dishId = this.route.snapshot.paramMap.get("dishId");
    this.dishService.getDishes().subscribe(dishes => {
      const currDish: Dish | undefined = dishes.find(dish => dish.id === dishId);
      if (currDish !== undefined) this.dish = currDish;
    });
  }

  changeImage(arrow: string): void {
    if (arrow === "left") {
      this.dishImageIdx = Math.abs(this.dishImageIdx - this.dishesInfoService.numOfSourceSets) %
        (this.dish.numOfImages * this.dishesInfoService.numOfSourceSets);
    } else if (arrow === "right") {
      this.dishImageIdx = Math.abs(this.dishImageIdx + this.dishesInfoService.numOfSourceSets) %
        (this.dish.numOfImages * this.dishesInfoService.numOfSourceSets);
    }
  }

}
