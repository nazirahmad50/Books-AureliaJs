import { HttpClient } from "aurelia-http-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class BooksApiJsonp {
  constructor(httpClient) {
    this.http = httpClient;

    const baseUrl = "http://localhost:8333/api/";

    this.http.configure((config) => {
      config.withBaseUrl(baseUrl);
    });
  }

  getBooksJsonp() {
    return this.http
      .jsonp("booksjsonp", "callback")
      .then((res) => {
        return res.response;
      })
      .then((books) => {
        return books;
      })
      .catch((error) => {
        console.log("Error retreiving books jsonp", error);
        return [];
      });
  }
}
