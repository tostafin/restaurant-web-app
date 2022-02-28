import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dish } from "../../../interfaces/dish";
import { DishesInfoService } from "../../../services/dishes-info.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() dishes: Dish[] = [];
  @Output() filteredDishesEvent = new EventEmitter<Dish[]>();

  uniqueCuisines!: Set<string>;
  uniqueCategories!: Set<string>;


  filteredCuisines: Set<string> = new Set();
  filteredCategories: Set<string> = new Set();
  minimumRating: number = 0;

  constructor(public dishesInfo: DishesInfoService) {
  }

  ngOnInit(): void {
    this.getInfoForFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dishes"]) this.getInfoForFilters();
  }

  getInfoForFilters(): void {
    this.getUniqueCuisines();
    this.getUniqueCategories();
  }

  getUniqueCuisines(): void {
    this.uniqueCuisines = new Set(this.dishes.map(dish => dish.cuisine));
  }

  getUniqueCategories(): void {
    this.uniqueCategories = new Set<string>();
    for (let dish of this.dishes) {
      for (let category of dish.categories) {
        this.uniqueCategories.add(category);
      }
    }
  }

  getFilteredCuisines(cuisine: string): void {
    if (this.filteredCuisines.has(cuisine)) this.filteredCuisines.delete(cuisine);
    else this.filteredCuisines.add(cuisine);
    this.filterDishes();
  }

  getFilteredCategories(category: string): void {
    if (this.filteredCategories.has(category)) this.filteredCategories.delete(category);
    else this.filteredCategories.add(category);
    this.filterDishes();
  }

  filterDishes(): void {
    let filteredDishes: Dish[] = JSON.parse(JSON.stringify(this.dishes));
    filteredDishes = this.filterCuisines(filteredDishes);
    filteredDishes = this.filterCategories(filteredDishes);
    filteredDishes = this.filterPrice(filteredDishes);
    filteredDishes = this.filterRatings(filteredDishes);
    this.filteredDishesEvent.emit(filteredDishes);
  }

  filterCuisines(dishes: Dish[]): Dish[] {
    if (!dishes || dishes.length === 0) {
      return [];
    }
    if (!this.filteredCuisines || this.filteredCuisines.size === 0) {
      return dishes;
    }
    return dishes.filter(dish => this.filteredCuisines.has(dish.cuisine));
  }

  filterCategories(dishes: Dish[]): Dish[] {
    if (!dishes || dishes.length === 0) {
      return [];
    }
    if (!this.filteredCategories || this.filteredCategories.size === 0) {
      return dishes;
    }
    return dishes.filter(dish => {
      let found: boolean = false;
      for (let category of this.filteredCategories) {
        if (dish.categories.includes(category)) {
          found = true;
          break;
        }
      }
      return found;
    });
  }

  filterPrice(dishes: Dish[]): Dish[] {
    if (!dishes || dishes.length === 0) return [];
    if (this.dishesInfo.filterMinPrice === -1 && this.dishesInfo.filterMaxPrice === Number.MAX_SAFE_INTEGER) {
      return dishes;
    }
    return dishes.filter(dish => this.dishesInfo.filterMinPrice <=
      Math.round(dish.price * this.dishesInfo.exchangeRate) &&
      Math.round(dish.price * this.dishesInfo.exchangeRate) <= this.dishesInfo.filterMaxPrice);
  }

  filterRatings(dishes: Dish[]): Dish[] {
    if (!dishes || dishes.length === 0) return [];
    if (this.minimumRating === 0) return dishes;
    return dishes.filter(dish => this.dishesInfo.dishesRating[dish.id as string] >= this.minimumRating);
  }

}
