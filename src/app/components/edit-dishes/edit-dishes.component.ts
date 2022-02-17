import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from "@angular/common";
import { DishesInfoService } from "../../services/dishes-info.service";
import { DishService } from "../../services/dish.service";
import { Dish } from "../../interfaces/dish";
import { DeleteDishDialogComponent } from "./delete-dish-dialog/delete-dish-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatMenuTrigger } from "@angular/material/menu";
import { UpdateDishDialogComponent } from "./update-dish-dialog/update-dish-dialog.component";

@Component({
  selector: 'app-edit-dishes',
  templateUrl: './edit-dishes.component.html',
  styleUrls: ['./edit-dishes.component.css']
})
export class EditDishesComponent implements OnInit {
  @ViewChild('goBackTrigger') goBackTrigger!: MatMenuTrigger;

  dishes: Dish[] = [];

  constructor(private location: Location,
              public dishesInfoService: DishesInfoService,
              private dishService: DishService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getDishes();
  }

  goBack(): void {
    this.location.back();
  }

  getDishes(): void {
    this.dishService.getDishes().subscribe(dishes => this.dishes = dishes);
  }

  snackBarMessage(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  openUpdateDialog(dish: Dish) {
    const dialogRef = this.dialog.open(UpdateDishDialogComponent, {
      data: {dish: dish},
      width: '70vw'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.dishService.updateDish(res, dish.id)
        .then(() => this.snackBarMessage("The dish was updated successfully!"))
        .catch(e => this.snackBarMessage("An error occurred while updating the dish: " + e));
    });
  }

  openDeleteDialog(dish: Dish) {
    const dialogRef = this.dialog.open(DeleteDishDialogComponent, {
      data: {name: dish.name},
      restoreFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.dishService.deleteDish(dish, this.dishesInfoService.numOfSourceSets)
        .then(() => {
          this.goBackTrigger.focus();
          this.snackBarMessage("The dish was removed successfully!");
        })
        .catch(e => this.snackBarMessage("An error occurred while removing the dish: " + e));
    });
  }

}
