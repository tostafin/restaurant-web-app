import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, of, switchMap } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Users } from "../interfaces/users";
import firebase from "firebase/compat";
import User = firebase.User;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObs: Observable<Users | null | undefined>;
  user: User | null | undefined;
  userDataDB!: Users;

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore
  ) {
    this.userObs = auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return afs.doc<Users>(`users/${user?.uid}`).valueChanges();
        }
        return of(null);

      })
    );

    auth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.getUserDataFromDB();
      } else {
        this.user = null;
      }
    });
  }

  async registerUser(registerForm: { username: string, email: string, password: string, confirmedPassword: string }):
    Promise<void> {
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(registerForm.email, registerForm.password);
      const newUserData: Users = {
        username: registerForm.username,
        numOfOrders: 0,
        currOrder: {},
        prevOrders: [],
        reviews: []
      }
      await this.afs.doc<Users>(`users/${newUser.user?.uid}`).set(newUserData);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  loginUser(loginForm: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(loginForm.email, loginForm.password);
  }

  signOutUser(): Promise<void> {
    return this.auth.signOut();
  }

  getUserDataFromDB(): void {
    this.afs.doc<Users>(`users/${this.user?.uid}`).valueChanges().subscribe(user => {
      if (user !== undefined) this.userDataDB = user;
    })
  }
}
