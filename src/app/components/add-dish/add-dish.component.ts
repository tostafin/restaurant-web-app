import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from "@angular/forms";
import { DishesInfoService } from "../../services/dishes-info.service";
import { Location } from "@angular/common";
import { DishService } from "../../services/dish.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  addDishForm = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^([A-ZÀ-Ž ][a-zà-ž ]+)$/)
    ]),
    cuisine: this.fb.control('', Validators.required),
    categories: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    ingredients: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    quantity: this.fb.control('1', [Validators.min(1), Validators.required]),
    price: this.fb.control('1', [Validators.min(1), Validators.required]),
    description: this.fb.control('', [
      Validators.required,
      Validators.pattern(/^(([A-ZÀ-Ž0-9])|([A-ZÀ-Ž0-9][a-zà-ž0-9]+))+((?:\s[A-ZÀ-Ža-zà-ž0-9]+)+)[.!]$/)
    ]),
    images: this.fb.array([]),
    numOfImages: ['']
  })

  imagesNumArr: number[] = [];
  sourceSets: number[] = Array(this.dishesInfoService.numOfSourceSets).fill(0).map((x, i) => i);
  numOfAddedImages: number = 0;

  constructor(private fb: FormBuilder,
              public dishesInfoService: DishesInfoService,
              private dishService: DishService,
              private location: Location,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.addImage();
  }

  goBack(): void {
    this.location.back();
  }

  get name() {
    return this.addDishForm.get('name');
  }

  get cuisine() {
    return this.addDishForm.get('cuisine');
  }

  get categories() {
    return this.addDishForm.get('categories') as FormArray;
  }

  get ingredients() {
    return this.addDishForm.get('ingredients') as FormArray;
  }

  get quantity() {
    return this.addDishForm.get('quantity');
  }

  get price() {
    return this.addDishForm.get('price');
  }

  get description() {
    return this.addDishForm.get('description');
  }

  get images() {
    return this.addDishForm.get('images') as FormArray;
  }

  addCategory(): void {
    this.categories.push(this.fb.control('', Validators.required));
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  addImage(): void {
    for (let i = 0; i < this.dishesInfoService.numOfSourceSets; i++) {
      this.images.push(this.fb.control('', Validators.required));
    }
    this.imagesNumArr.push(this.numOfAddedImages++);
  }

  addUploadedFile(event: Event, imageNum: number, srcset: number): void {
    if (!(event.target instanceof HTMLInputElement) || !(event.target.files)) return;
    this.images.at(imageNum * this.dishesInfoService.numOfSourceSets + srcset).setValue(event.target.files[0]);
  }

  addDishMessage(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 5000
    });
  }

  onSubmit(): void {
    let {images, ...newDish} = this.addDishForm.value;
    newDish["numOfImages"] = this.images.controls.length / this.dishesInfoService.numOfSourceSets;
    this.dishService.addDish(newDish, images)
      .then(() => this.addDishMessage("The dish was added successfully."))
      .catch(e => this.addDishMessage("An error occurred while adding a new dish: " + e));
  }

}
