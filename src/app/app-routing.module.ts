import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import { DishesComponent } from "./components/dishes/dishes.component";
import { DishDetailComponent } from "./components/dish-detail/dish-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'dishes/:name', component: DishDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
