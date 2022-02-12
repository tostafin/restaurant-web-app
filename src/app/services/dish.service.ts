import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {Dish} from "../interfaces/dish";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes: Observable<Dish[]>
  collectionName: string = "dishes";

  constructor(private afs: AngularFirestore) {
    this.dishes = afs.collection<Dish>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Dish;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}
