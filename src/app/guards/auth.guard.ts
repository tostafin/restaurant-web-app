import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { SettingsService } from "../services/settings.service";
import { Roles } from "../interfaces/roles";
import { log } from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private settingsService: SettingsService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userObs$.pipe(
      take(1),
      map(user => !user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.settingsService.openGlobalSnackbarMessage(
            "You can't access this page because you are already logged in!");
          this.router.navigate(['/homepage']);
        }
      })
    )
  }

}
