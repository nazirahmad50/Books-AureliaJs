import { Router } from "aurelia-router";
import { inject } from "aurelia-framework";
import { AuthService } from "../../../services/auth-service";

@inject(Router, AuthService)
export class Login {
  constructor(Router, AuthService) {
    this.authService = AuthService;
    this.router = Router;
  }

  logIn() {
    this.authService.logIn(this.userName, this.password).then((tokenRes) => {
      if (tokenRes.success) {
        this.errorMessage = "";
        this.router.navigateToRoute("home");
      } else {
        this.errorMessage = tokenRes.message;
      }
    });
  }
}
