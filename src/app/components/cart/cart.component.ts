import { Component, OnInit } from '@angular/core';
import { DishOrderService } from "../../services/dish-order.service";
import { DishOrder } from "../../interfaces/dish-order";
import { AuthService } from "../../services/auth.service";
import { DishesInfoService } from "../../services/dishes-info.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ordersArr: [string, DishOrder][] = [];
  displayedColumns: string[] = ["name", "quantity", "dish-sum"];

  constructor(public dishOrderService: DishOrderService,
              private authService: AuthService,
              public dishesInfoService: DishesInfoService
  ) { }

  ngOnInit(): void {
    this.dishOrderService.getCurrOrder();
    this.getOrdersArr();
  }

  getOrdersArr(): void {
    this.authService.userObs.subscribe(user => {
      if (user?.currOrder !== undefined) this.ordersArr = Object.entries(user.currOrder);
    });
  }

  getTotalQuantity(): number {
    return this.ordersArr.reduce((a, b) => a + b[1]["quantity"], 0);
  }

  getTotalSum(): number {
    return this.ordersArr.reduce((a, b) => a +
      (this.dishesInfoService.getDishPrice(b[1]["unitPrice"]) * b[1]["quantity"]), 0);
  }

  orderDishes(): void {
    this.dishOrderService.orderDishes()
      .then(() => this.dishOrderService.orderMessage("Your order was placed!"))
      .catch(e => this.dishOrderService.orderMessage("An error occurred while placing your order: " + e));
  }

}

