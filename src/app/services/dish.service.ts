import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { finalize, map, Observable } from "rxjs";
import { Dish } from "../interfaces/dish";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;
import { rejects } from "assert";

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes: Observable<Dish[]>;
  collectionName: string = "dishes";

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage
  ) {
    this.dishes = afs.collection<Dish>(this.collectionName).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Dish;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getDishes(): Observable<Dish[]> {
    return this.dishes;
  }

  async addDish(dish: Dish, images: File[]) {
    const addToAfs = await this.afs.collection<Dish>(this.collectionName).add({...dish});
    const imagesToUpload: Promise<void>[] = [];
    for (let i = 0; i < images.length; i++) {
      const uploadImage = new Promise<void>((resolve, reject) => {
        this.storage.upload("images/dishes/" + addToAfs.id + "-" + i.toString() + "." +
          images[i].name.slice((images[i].name.lastIndexOf(".") - 1 >>> 0) + 2), images[i])
          .then(() => resolve())
          .catch(() => reject());
      })
      imagesToUpload.push(uploadImage);
    }
    return Promise.all(imagesToUpload);
  }

  deleteDish(dish: Dish) {
    return this.storage.ref("images/dishes/example1").delete();
  }

}
