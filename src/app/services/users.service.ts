import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Users } from "../interfaces/users";
import { Roles } from "../interfaces/roles";
import { map, Observable, of, switchMap } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  readonly usersCollectionName: string = "users";
  usersObs$: Observable<Users[] | null | undefined>;
  users: Users[] = [];
  usersRoles: { [key: string]: Roles } = {};
  usersRolesArr: { [key: string]: string[] } = {};

  constructor(private afs: AngularFirestore,
              private auth: AngularFireAuth) {
    this.usersObs$ = auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return afs.collection<Users>(this.usersCollectionName).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as Users;
              const uid = a.payload.doc.id;
              return {uid, ...data};
            }))
          )
        } else {
          return of(null);
        }
      })
    )
  }

  setRole(uid: string, role: string): Promise<void> {
    const userRole: Roles = this.usersRoles[uid];
    userRole[role as keyof Roles] = !userRole[role as keyof Roles];
    return this.afs.doc<Users>(`users/${uid}`).update(
      {roles: userRole}
    );
  }

  getUsersRoles(): void {
    this.usersObs$.subscribe(users => {
      if (users) {
        this.users = users;
        for (let user of this.users) {
          if (user.uid !== undefined) {
            this.usersRoles[user.uid] = user.roles;
            this.usersRolesArr[user.uid] = [];
            for (let role of Object.keys(user.roles)) {
              if (user.roles[role as keyof Roles]) this.usersRolesArr[user.uid].push(role);
            }
          }
        }
      }

    });
  }

  changeBanStatus(uid: string | undefined, isBanned: boolean) {
    return this.afs.doc<Users>(`users/${uid}`).update(
      {banned: !isBanned}
    );
  }
}
