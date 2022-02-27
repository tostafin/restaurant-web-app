import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Users } from "../interfaces/users";
import { Roles } from "../interfaces/roles";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Users[] = [];
  usersRoles: { [key: string]: Roles } = {};
  usersRolesArr: { [key: string]: string[] } = {};

  constructor(private afs: AngularFirestore,
              private authService: AuthService) { }

  setRole(uid: string, role: string): Promise<void> {
    const userRole: Roles = this.usersRoles[uid];
    userRole[role as keyof Roles] = !userRole[role as keyof Roles];
    return this.afs.doc<Users>(`users/${uid}`).update(
      {roles: userRole}
    );
  }

  getUsersRoles(): void {
    this.afs.collection<Users>("users").valueChanges()
      .subscribe(users => {
      this.users = users;
      for (let user of this.users) {
        this.usersRoles[user.uid] = user.roles;
        this.usersRolesArr[user.uid] = [];
        for (let role of Object.keys(user.roles)) {
          if (user.roles[role as keyof Roles]) this.usersRolesArr[user.uid].push(role);
        }
      }
    });
  }

  changeBanStatus(uid: string, isBanned: boolean) {
    return this.afs.doc<Users>(`users/${uid}`).update(
      {banned: !isBanned}
    );
  }
}
