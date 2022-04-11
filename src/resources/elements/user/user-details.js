import { bindable, inject } from "aurelia-framework";
import { UserApi } from "../../../services/user-api";

@inject(UserApi)
export class UserDetails {
  constructor(userApi) {
    this.userApi = userApi;
  }

  activate(params, routeConfig) {
    this.loadUser(params.name);
  }

  loadUser(name) {
    this.userApi.getUser(name).then((fetchUser) => {
      this.user = fetchUser;
    });

    this.selected = { name: "United Kingdome", code: "UK" };
  }

  countryChanged(ev) {
    this.user.country = ev.target.value;
  }

  saveUser() {
    this.userApi.saveUser(this.user).then((user) => {
      alert("saved successfully");
    });
  }
}
