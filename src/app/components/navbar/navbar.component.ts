import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { SettingsService } from "../../services/settings.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private settingsService: SettingsService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOutUser(): void {
    this.authService.signOutUser()
      .then(() => {
        this.settingsService.openGlobalSnackbarMessage("You signed out.");
        this.router.navigate(['/homepage']);
      })
      .catch(e => this.settingsService.openGlobalSnackbarMessage("An error occurred while signing you out: " + e));
  }

}
