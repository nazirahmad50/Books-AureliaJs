import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import { AuthService } from "./services/auth-service";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { AuthorizeStep } from "./router-steps/authorization-step";

@inject(AuthService, HttpClient)
export class App {
  constructor(AuthService, HttpClient) {
    this.auth = AuthService;
    this.http = HttpClient;

    const baseUrl = "http://localhost:8333/api/";

    this.http.configure((config) => {
      config.withBaseUrl(baseUrl).withInterceptor(this.auth.tokenInterceptor);
    });
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = "my-books";

    let authStep = new AuthorizeStep(this.auth);
    config.addAuthorizeStep(authStep);

    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: "./index",
        title: "home",
        nav: true,
        settings: { icon: "home", auth: true },
        layoutViewModel: "./layouts/main-layout",
      },
      {
        route: "books",
        name: "books",
        moduleId: "./resources/elements/books",
        title: "books",
        nav: true,
        settings: { icon: "book", auth: true },
        layoutViewModel: "./layouts/main-layout",
      },
      {
        route: "users",
        name: "users",
        moduleId: "./resources/elements/user/users",
        title: "users",
        nav: true,
        settings: { icon: "users", auth: true, admin: true },
        layoutViewModel: "./layouts/main-layout",
      },
      {
        route: "users/:name/details",
        name: "user-detail",
        moduleId: "./resources/elements/user/user-details",
        title: "user details",
        settings: { auth: true, admin: true },
        layoutViewModel: "./layouts/main-layout",
      },
      {
        route: "legacy-users",
        redirect: "users",
        settings: { auth: true, admin: true },
        layoutViewModel: "./layouts/main-layout",
      },
      {
        route: "login",
        name: "login",
        moduleId: "./resources/elements/login/login",
        title: "login",
        layoutView: "./layouts/login-layout.html",
      },
    ]);
    const handleUnknownRoutes = (instr) => {
      let path = instr.fragment.toLowerCase();

      if (path.includes("admin"))
        return "./resources/elements/admin-unknwon-route.html";

      return "./resources/elements/error.html";
    };

    config.mapUnknownRoutes(handleUnknownRoutes);
  }
}
