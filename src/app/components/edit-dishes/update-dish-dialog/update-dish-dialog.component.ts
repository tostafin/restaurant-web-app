import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { Dish } from "../../../interfaces/dish";

@Component({
  selector: 'app-update-dish-dialog',
  templateUrl: './update-dish-dialog.component.html',
  styleUrls: ['./update-dish-dialog.component.css']
})
export class UpdateDishDialogComponent implements OnInit {
  updateDishForm = this.fb.group({
    name: this.fb.control(this.data.dish.name, [
      Validators.required,
      Validators.pattern(/^([A-ZÀ-Ž ][a-zà-ž ]+)$/)
    ]),
    cuisine: this.fb.control(this.data.dish.cuisine, Validators.required),
    categories: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    ingredients: this.fb.array([
      this.fb.control('', Validators.required)
    ]),
    quantity: this.fb.control(this.data.dish.quantity, [Validators.min(1), Validators.required]),
    price: this.fb.control(this.data.dish.price, [Validators.min(1), Validators.required]),
    description: this.fb.control(this.data.dish.description, [
      Validators.required,
      Validators.pattern(/^(([A-ZÀ-Ž0-9])|([A-ZÀ-Ž0-9][a-zà-ž0-9]+))+((?:\s[A-ZÀ-Ža-zà-ž0-9]+)+)[.!]$/)
    ]),
    numOfImages: [this.data.dish.numOfImages]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: { dish: Dish },
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.addInitialCategoriesAndIngredients();
  }

  get name() {
    return this.updateDishForm.get('name');
  }

  get cuisine() {
    return this.updateDishForm.get('cuisine');
  }

  get categories() {
    return this.updateDishForm.get('categories') as FormArray;
  }

  get ingredients() {
    return this.updateDishForm.get('ingredients') as FormArray;
  }

  get quantity() {
    return this.updateDishForm.get('quantity');
  }

  get price() {
    return this.updateDishForm.get('price');
  }

  get description() {
    return this.updateDishForm.get('description');
  }

  addCategory(): void {
    this.categories.push(this.fb.control('', Validators.required));
  }

  removeCategory(idx: number): void {
    this.categories.removeAt(idx);
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredients(idx: number): void {
    this.ingredients.removeAt(idx);
  }

  addInitialCategoriesAndIngredients(): void {
    const categories: string[] = this.data.dish.categories;
    this.categories.at(0).setValue(categories[0]);
    for (let i = 1; i < categories.length; i++) {
      this.categories.push(this.fb.control(categories[i], Validators.required));
    }
    const ingredients: string[] = this.data.dish.ingredients;
    this.ingredients.at(0).setValue(ingredients[0]);
    for (let i = 1; i < ingredients.length; i++) {
      this.ingredients.push(this.fb.control(ingredients[i], Validators.required));
    }
  }

}
