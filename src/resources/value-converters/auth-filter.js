import { inject } from "aurelia-framework";
import { AuthService } from "../../services/auth-service";

@inject(AuthService)
export class AuthFilterValueConverter {
  constructor(authService) {
    this.authService = authService;
  }
  toView(routes) {
    let isAuthenticated = this.authService.isLoggedIn();
    let isAdmin = isAuthenticated && this.authService.getUser().admin;

    return routes.filter(
      (x) =>
        x.settings.auth === undefined ||
        (x.settings.auth === isAuthenticated && (!x.settings.admin || isAdmin))
    );
  }
}
