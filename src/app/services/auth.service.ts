import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable, of, switchMap } from "rxjs";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Users } from "../interfaces/users";
import firebase from "firebase/compat";
import User = firebase.User;
import { SettingsService } from "./settings.service";
import { Roles } from "../interfaces/roles";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userObs$: Observable<Users | null | undefined>;
  user: User | null | undefined;
  userDataDB!: Users;
  userRoles: Roles = {
    admin: false,
    manager: false,
    customer: false
  };
  username: string = "";

  constructor(private auth: AngularFireAuth,
              private afs: AngularFirestore,
              private settingsService: SettingsService,
              private router: Router
  ) {
    this.userObs$ = auth.authState.pipe(
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
        this.setPersistence();
      } else {
        this.user = null;
        this.userRoles = {
          admin: false,
          manager: false,
          customer: false
        };
        this.username = "";
      }
    });
  }

  async registerUser(registerForm: { username: string, email: string, password: string, confirmedPassword: string }):
    Promise<void> {
    try {
      const newUser = await this.auth.createUserWithEmailAndPassword(registerForm.email, registerForm.password);
      if (newUser.user?.uid !== undefined) {
        const newUserData: Users = {
          username: registerForm.username,
          numOfOrders: 0,
          currOrder: {},
          prevOrders: [],
          reviews: [],
          roles: {
            admin: false,
            manager: false,
            customer: true
          },
          banned: false
        }
        await this.afs.doc<Users>(`users/${newUser.user?.uid}`).set(newUserData);
        return Promise.resolve();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  loginUser(loginForm: { email: string, password: string }): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(loginForm.email, loginForm.password);
  }

  async signOutUser(): Promise<void> {
    try {
      await this.router.navigate(['/homepage']);
      return this.auth.signOut();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  getUserDataFromDB(): void {
    this.userObs$.subscribe(user => {
      if (user) {
        this.userDataDB = user;
        this.userRoles = user.roles;
        this.username = user.username;
      }
    });
  }

  setPersistence(): void {
    this.settingsService.persistence$.subscribe(persistence => {
      if (persistence !== undefined) this.auth.setPersistence(persistence.persistence)
        .catch(e => this.settingsService.openGlobalSnackbarMessage(
            "An error occurred while setting global persistence: " + e
          )
        );
    })
  }

  hasRole(allowedRoles: string[]): boolean {
    if (!this.user) return false;
    for (let role of allowedRoles) {
      if (this.userRoles[role as keyof Roles]) return true;
    }
    return false;
  }
}
