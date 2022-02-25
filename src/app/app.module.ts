import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { FiltersComponent } from './components/dishes/filters/filters.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';
import { DishesManagerComponent } from './components/dishes-manager/dishes-manager.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { EditDishesComponent } from './components/edit-dishes/edit-dishes.component';
import { DeleteDishDialogComponent } from './components/edit-dishes/delete-dish-dialog/delete-dish-dialog.component';
import { UpdateDishDialogComponent } from './components/edit-dishes/update-dish-dialog/update-dish-dialog.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";

import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    DishesComponent,
    FiltersComponent,
    DishDetailComponent,
    DishesManagerComponent,
    AddDishComponent,
    EditDishesComponent,
    DeleteDishDialogComponent,
    UpdateDishDialogComponent,
    RegisterUserComponent,
    LoginUserComponent,
    ConfirmPasswordDirective,
    PageNotFoundComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
