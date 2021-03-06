import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SettingsService } from "../../services/settings.service";
import { BanUserDialogComponent } from "./ban-user-dialog/ban-user-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  roles: string[] = ["customer", "manager", "admin"];

  constructor(public authService: AuthService,
              public usersService: UsersService,
              private snackBar: MatSnackBar,
              public settingsService: SettingsService,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.usersService.getUsersRoles();
  }

  changeUserRole(uid: string, role: string) {
    this.usersService.setRole(uid, role)
      .then(() => this.settingsService.openGlobalSnackbarMessage("The role was changed!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage("An error occurred while changing a role: " + e));
  }

  async setPersistence(persistence: string) {
    await this.settingsService.setGlobalPersistence(persistence)
      .then(() => this.settingsService.openGlobalSnackbarMessage("Global session persistence changed successfully!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage(
        "An error occurred while changing global session persistence: " + e)
      );

    this.authService.setPersistence();
  }

  openBanDialog(uid: string | undefined, isBanned: boolean) {
    const dialogRef = this.dialog.open(BanUserDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.usersService.changeBanStatus(uid, isBanned)
        .then(() => this.settingsService.openGlobalSnackbarMessage("The user was banned!"))
        .catch(e => this.settingsService.openGlobalSnackbarMessage("An error occurred while banning this user: " + e));
    });
  }

  unbanUser(uid: string | undefined, isBanned: boolean): void {
    this.usersService.changeBanStatus(uid, isBanned)
      .then(() => this.settingsService.openGlobalSnackbarMessage("The user was unbanned!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage("An error occurred while banning this user: " + e));
  }
}
