import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { lastValueFrom, map, Observable } from "rxjs";
import { Dish } from "../interfaces/dish";
import { AngularFireStorage } from "@angular/fire/compat/storage";

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
    try {
      const addToAfs = await this.afs.collection<Dish>(this.collectionName).add({...dish});
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

  updateDish(dish: Dish, dishId: string | undefined) {
    return this.afs.collection<Dish>(this.collectionName).doc(dishId).update(dish);
  }

  async deleteDish(dish: Dish, numOfSourceSets: number) {
    try {
      await this.afs.collection<Dish>(this.collectionName).doc(dish.id).delete();
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

}
