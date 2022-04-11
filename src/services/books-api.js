import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

@inject(HttpClient)
export class BooksApi {
  constructor(httpClient) {
    this.http = httpClient;
  }

  getBooks() {
    return this.http
      .fetch("books")
      .then((res) => res.json())
      .then((books) => {
        return books;
      })
      .catch((error) => {
        console.log("Error retreiving books", error);
        return [];
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

  saveBook(book) {
    return this.http
      .fetch(`book/${book._id}`, {
        method: "put",
        body: json(book),
      })
      .then((res) => res.json())
      .then((savedBook) => {
        return savedBook;
      })
      .catch((error) => {
        console.log("Error saving book", error);
      });
  }

  deleteBook(book) {
    return this.http
      .fetch(`book/${book._id}`, {
        method: "delete",
      })
      .then((res) => res.json())
      .then((resp) => {
        return resp;
      })
      .catch((error) => {
        console.log("Error deleting book", error);
      });
  }

  getShelves() {
    return this.http
      .fetch("shelves")
      .then((res) => res.json())
      .then((books) => {
        return books;
      })
      .catch((error) => {
        console.log("Error retreiving shelves", error);
        return [];
      });
  }

  getGenres() {
    return this.http
      .fetch("genres")
      .then((res) => res.json())
      .then((books) => {
        return books;
      })
      .catch((error) => {
        console.log("Error retreiving genres", error);
        return [];
      });
  }

  // simulateFetch(fetchResult) {
  //   return new Promise((reolve) => {
  //     setTimeout(() => {
  //       reolve(fetchResult);
  //     }, this.simulateLatency);
  //   });
  // }
}
