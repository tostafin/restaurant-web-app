import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { lastValueFrom, map, Observable } from "rxjs";
import { Dish } from "../interfaces/dish";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { DishReview } from "../interfaces/dish-review";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishes: Observable<Dish[]>;
  readonly dishCollectionName: string = "dishes";

  constructor(private afs: AngularFirestore,
              private storage: AngularFireStorage
  ) {
    this.dishes = afs.collection<Dish>(this.dishCollectionName).snapshotChanges().pipe(
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

  async addDish(dish: Dish, images: File[]): Promise<void[]> {
    try {
      const addToAfs = await this.afs.collection<Dish>(this.dishCollectionName).add({...dish});
      const imagesToUpload: Promise<void>[] = [];
      for (let i = 0; i < images.length; i++) {
        const uploadImage = new Promise<void>((resolve, reject) => {
          this.storage.upload("images/dishes/" + addToAfs.id + "-" + i.toString() + ".jpg", images[i])
            .then(() => resolve())
            .catch(() => reject());
        })
        imagesToUpload.push(uploadImage);
      }
      return Promise.all(imagesToUpload);
    } catch (e) {
      return Promise.reject();
    }
  }

  updateDish(dish: Dish, dishId: string | undefined): Promise<void> {
    return this.afs.collection<Dish>(this.dishCollectionName).doc(dishId).update(dish);
  }

  async deleteDish(dish: Dish, numOfSourceSets: number): Promise<void[]> {
    try {
      await this.afs.collection<Dish>(this.dishCollectionName).doc(dish.id).delete();
      const imagesToRemove: Promise<void>[] = [];
      for (let i = 0; i < dish.numOfImages * numOfSourceSets; i++) {
        const removeImage = lastValueFrom(this.storage.ref("images/dishes/" + dish.id + "-" + i.toString() + ".jpg")
          .delete());
        imagesToRemove.push(removeImage);
      }
      return Promise.all(imagesToRemove);
    } catch (e) {
      return Promise.reject();
    }

  }

  addDishReview(dishReview: DishReview): Promise<void[]> {
    const reviewsToAdd: Promise<void>[] = [
      this.afs.doc(`users/${dishReview.userId}`).update(
      {reviews: firestore.FieldValue.arrayUnion(dishReview)}
      ),
      this.afs.doc(`dishes/${dishReview.dishId}`).update(
        {reviews: firestore.FieldValue.arrayUnion(dishReview)}
      )
    ];
    return Promise.all(reviewsToAdd);
  }

}
