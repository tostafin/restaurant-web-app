import { Injectable } from '@angular/core';
import { DishOrder } from "../interfaces/dish-order";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthService } from "./auth.service";
import { Users } from "../interfaces/users";
import { MatSnackBar } from "@angular/material/snack-bar";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class DishOrderService {
  currOrder: { [key: string]: DishOrder } = {};

  constructor(private afs: AngularFirestore,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
  }

  orderMessage(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  getCurrOrder(): void {
    this.authService.userObs$.subscribe(user => {
      if (user?.currOrder !== undefined) this.currOrder = user?.currOrder;
    });
  }

  addDishOrder(dishId: string, dishPrice: number, dishName: string): void {
    if (!this.currOrder.hasOwnProperty(dishId)) {
      this.currOrder[dishId] = {
        quantity: 1,
        unitPrice: dishPrice,
        dishName: dishName
      };
    } else this.currOrder[dishId].quantity++;
    this.afs.doc<Users>(`users/${this.authService.user?.uid}`).update(
      {currOrder: this.currOrder}
    )
      .then(() => this.orderMessage("You added one portion of " + dishName + " to your cart."))
      .catch(e => this.orderMessage("The dish cannot be added: " + e));
  }

  removeDishOrder(dishId: string, dishPrice: number, dishName: string): void {
    if (this.currOrder[dishId].quantity === 1) delete this.currOrder[dishId];
    else this.currOrder[dishId].quantity--;
    this.afs.doc<Users>(`users/${this.authService.user?.uid}`).update(
      {currOrder: this.currOrder}
    )
      .then(() => this.orderMessage("You removed one portion of " + dishName + " from your cart."))
      .catch(e => this.orderMessage("An dish cannot be removed: " + e));
  }

  async orderDishes(): Promise<void> {
    const orderNum: number = this.authService.userDataDB.numOfOrders;
    const currOrder: { [key: number]: { [key: string]: DishOrder } } = {};
    currOrder[orderNum] = this.currOrder;

    await this.afs.doc(`users/${this.authService.user?.uid}`).update(
      {prevOrders: firestore.FieldValue.arrayUnion(currOrder)}
    )

    await this.afs.doc(`users/${this.authService.user?.uid}`).update(
      {numOfOrders: firestore.FieldValue.increment(1)}
    )

    return this.afs.doc(`users/${this.authService.user?.uid}`).update(
      {currOrder: {}}
    )
  }
}
