import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  loginMessage(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  onSubmit(): void {
    this.authService.loginUser(this.loginForm.value)
      .then(() => {
        this.loginMessage("You're logged in!");
        this.router.navigate(['/homepage']);
      })
      .catch((e) => this.loginMessage("An error occurred while creating your account: " + e));
  }

}
