import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class AuthService {
  constructor(httpClient) {
    this.http = httpClient;
  }

  logIn(username, password) {
    return this.http
      .fetch("token", {
        method: "post",
        body: json({ name: username, password: password }),
      })
      .then((res) => res.json())
      .then((tokenRes) => {
        if (tokenRes.success)
          window.localStorage.setItem("token", tokenRes.token);
        return tokenRes;
      })
      .catch((error) => {
        console.log("Error recieving token", error);
      });
  }

  isLoggedIn() {
    let token = this.getToken();

    if (token) return true;

    return false;
  }

  logOut() {
    window.localStorage.removeItem("token");
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  getUser() {
    let token = this.decodeToken();
    console.log(token);
    return token._doc;
  }

  decodeToken(token) {
    token = token || this.getToken();

    if (!token) return;

    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }

  get tokenInterceptor() {
    let auth = this;

    return {
      request(request) {
        let token = auth.getToken();
        if (token) {
          request.headers.append("authorization", `bearer ${token}`);
        }
        return request;
      },
    };
  }
}
