import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { confirmPasswordValidator } from "../../directives/confirm-password.directive";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)]),
    confirmedPassword: new FormControl('', Validators.required)
  }, {validators: confirmPasswordValidator});

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  registerMessage(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  onSubmit(): void {
    this.authService.registerUser(this.registerForm.value)
      .then(() => {
        this.registerMessage("Your account was created successfully!");
        this.router.navigate(['/homepage']);
      })
      .catch((e) => this.registerMessage("An error occurred while creating your account: " + e));
  }

}
