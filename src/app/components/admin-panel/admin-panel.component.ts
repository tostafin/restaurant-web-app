import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { RoleService } from "../../services/role.service";
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
              public roleService: RoleService,
              private snackBar: MatSnackBar,
              public settingsService: SettingsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.roleService.getUsersRoles();
  }

  changeUserRole(uid: string, role: string) {
    this.roleService.setRole(uid, role)
      .then(() => this.settingsService.openGlobalSnackbarMessage("The role was changed!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage(
        "An error occurred while changing a role: " + e));
  }

  async setPersistence(persistence: string) {
    await this.settingsService.setGlobalPersistence(persistence)
      .then(() => this.settingsService.openGlobalSnackbarMessage(
        "Global session persistence changed successfully!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage(
        "An error occurred while changing global session persistence: " + e));

    this.authService.setPersistence();
  }

  openBanDialog(uid: string, isBanned: boolean) {
    const dialogRef = this.dialog.open(BanUserDialogComponent);
    dialogRef.afterClosed().subscribe(res => {
      if (res) this.roleService.changeBanStatus(uid, isBanned)
        .then(() => this.settingsService.openGlobalSnackbarMessage("The user was banned!"))
        .catch(e => this.settingsService.openGlobalSnackbarMessage(
          "An error occurred while banning this user: " + e))
    });
  }

  unbanUser(uid: string, isBanned: boolean): void {
    this.roleService.changeBanStatus(uid, isBanned)
      .then(() => this.settingsService.openGlobalSnackbarMessage("The user was unbanned!"))
      .catch(e => this.settingsService.openGlobalSnackbarMessage(
        "An error occurred while banning this user: " + e))
  }
}
