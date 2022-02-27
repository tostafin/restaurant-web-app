import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { Roles } from "../interfaces/roles";
import { SettingsService } from "../services/settings.service";

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

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
      map(user => !!(user && (Object.keys(route.data["roles"])
        .filter(role => role in user.roles && user.roles[role as keyof Roles])).length)),
      tap(hasRole => {
        if (!hasRole) {
          this.settingsService.openGlobalSnackbarMessage(
            "You can't access this page due to insufficient permissions!");
          this.router.navigate(['/homepage']);
        }
      })
    )
  }

}
