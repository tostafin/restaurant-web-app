import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSidenavModule } from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    DishesComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
