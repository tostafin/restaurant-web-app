import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

export interface DishReview {
  userId: string;
  username: string;
  dishId: string;
  dishName: string;
  dateOfPurchase: Timestamp;
  title: string;
  rating: number;
  review: string;
}
