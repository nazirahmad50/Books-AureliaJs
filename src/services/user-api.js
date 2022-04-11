import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class UserApi {
  constructor(httpClient) {
    this.http = httpClient;
  }

  getUser(name) {
    return this.http
      .fetch(`users/${name}`)
      .then((res) => res.json())
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log("Error retreiving user", error);
      });
  }

  getUsers() {
    return this.http
      .fetch("users")
      .then((res) => res.json())
      .then((users) => {
        return users;
      })
      .catch((error) => {
        console.log("Error retreiving users", error);
      });
  }

  addBook(book) {
    return this.http
      .fetch("books", {
        method: "post",
        body: json(book),
      })
      .then((res) => res.json())
      .then((createdBook) => {
        return createdBook;
      })
      .catch((error) => {
        console.log("Error adding book", error);
      });
  }

  addUser(user) {
    return this.http
      .fetch("users", {
        method: "post",
        body: json(user),
      })
      .then((res) => res.json())
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log("Error adding user", error);
      });
  }

  saveUser(user) {
    return this.http
      .fetch(`users/${user.name}`, {
        method: "put",
        body: json(user),
      })
      .then((res) => res.json())
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log("Error saving user", error);
      });
  }

  deleteUser(user) {
    return this.http
      .fetch(`users/${user.name}`, {
        method: "delete",
      })
      .then((res) => res.json())
      .then((resp) => {
        return resp;
      })
      .catch((error) => {
        console.log("Error deleting user", error);
      });
  }

  loadCountry(countryCode) {
    return this.http
      .fetch(`countries?code=${countryCode}`)
      .then((response) => response.json())
      .then((countries) => {
        return countries.length > 0 ? countries[0] : { code: "", name: "" };
      })
      .catch((error) => {
        console.log("Error retrieving country.");
      });
  }
}
