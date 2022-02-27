import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DishesComponent } from "./components/dishes/dishes.component";
import { DishDetailComponent } from "./components/dish-detail/dish-detail.component";
import { DishesManagerComponent } from "./components/dishes-manager/dishes-manager.component";
import { AddDishComponent } from "./components/add-dish/add-dish.component";
import { EditDishesComponent } from "./components/edit-dishes/edit-dishes.component";
import { LoginUserComponent } from "./components/login-user/login-user.component";
import { RegisterUserComponent } from "./components/register-user/register-user.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { CartComponent } from "./components/cart/cart.component";
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'dishes/:name', component: DishDetailComponent },
  { path: 'dishes-manager', component: DishesManagerComponent },
  { path: 'dishes-manager/add-dish', component: AddDishComponent },
  { path: 'dishes-manager/edit-dishes', component: EditDishesComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginUserComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
