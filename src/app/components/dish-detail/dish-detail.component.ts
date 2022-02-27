import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Dish } from "../../interfaces/dish";
import { DishService } from "../../services/dish.service";
import { DishesInfoService } from "../../services/dishes-info.service";
import { Location } from "@angular/common";
import { DishOrderService } from "../../services/dish-order.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;
import { SettingsService } from "../../services/settings.service";


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  dish!: Dish;
  dishImageIdx: number = 0;

  currReviewIdx: number = 0;

  addReviewForm = new FormGroup({
    userId: new FormControl(''),
    username: new FormControl(''),
    dishId: new FormControl(''),
    dishName: new FormControl(''),
    dateOfPurchase: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    review: new FormControl('', Validators.required),
    rating: new FormControl(0)
  })

  constructor(private route: ActivatedRoute,
              private dishService: DishService,
              public dishesInfoService: DishesInfoService,
              public dishOrderService: DishOrderService,
              private location: Location,
              public authService: AuthService,
              private snackBar: MatSnackBar,
              private settingsService: SettingsService
  ) {
  }

  get dateOfPurchase() {
    return this.addReviewForm.get("dateOfPurchase");
  }

  get rating() {
    return this.addReviewForm.get("rating");
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

  isAlreadyReviewed(): boolean {
    if (this.dish && this.dish.id && this.authService.userDataDB) {
      return this.authService.userDataDB.reviews.map(r => r.dishId).includes(this.dish.id);
    }
    return true;
  }

  wasOrderedByCustomer(): boolean {
    if (this.dish && this.dish.id && this.authService.userDataDB) {
      for (let order of this.authService.userDataDB.prevOrders) {
        if (Object.keys(order).includes(this.dish.id)) return true;
      }
    }
    return false;
  }

  updateRating(numOfStars: number): void {
    this.rating?.setValue(numOfStars);
  }

  addReviewSubmit(): void {
    this.addReviewForm.get("userId")?.setValue(this.authService.user?.uid);
    this.addReviewForm.get("username")?.setValue(this.authService.userDataDB.username);
    this.addReviewForm.get("dishId")?.setValue(this.dish.id);
    this.addReviewForm.get("dishName")?.setValue(this.dish.name);
    const dateOfPurchase: Date = this.dateOfPurchase?.value;
    this.dateOfPurchase?.setValue(Timestamp.fromDate(dateOfPurchase));
    this.dishService.addDishReview(this.addReviewForm.value)
      .then(() => this.settingsService.openGlobalSnackbarMessage("Your review was added!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage("An error occurred while adding your review: " + e));
  }

  changeReview(option: string): void {
    if (option === "left") {
      this.currReviewIdx = Math.abs(this.currReviewIdx + 1) % this.dish.reviews.length;
    } else if (option === "right") {
      this.currReviewIdx = Math.abs(this.currReviewIdx - 1 + this.dish.reviews.length) % this.dish.reviews.length;
    } else if (option === "random") {
      const reviewIdx = this.currReviewIdx;
      do this.currReviewIdx = this.getRandomInt(0, this.dish.reviews.length)
      while (this.currReviewIdx === reviewIdx);
    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);  // max is exclusive!
  }

}
