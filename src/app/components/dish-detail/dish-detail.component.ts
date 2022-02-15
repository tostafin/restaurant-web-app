import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Dish } from "../../interfaces/dish";
import { DishService } from "../../services/dish.service";
import { DishesInfoService } from "../../services/dishes-info.service";
import { Location } from "@angular/common";


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish!: Dish;
  dishImageIdx: number = 0;
  readonly numOfImages: number = 2;
  readonly numOfSourceSets: number = 2;

  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              public dishesInfo: DishesInfoService,
              private location: Location
  ) { }

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

  changeImage(arrow: string) {
    if (arrow === "left") this.dishImageIdx =
      Math.abs(this.dishImageIdx - this.numOfSourceSets) % (this.numOfImages * this.numOfSourceSets);
    else if (arrow === "right") this.dishImageIdx =
      Math.abs(this.dishImageIdx + this.numOfSourceSets) % (this.numOfImages * this.numOfSourceSets);
  }

}
