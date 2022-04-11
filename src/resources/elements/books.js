import { bindable, inject, computedFrom, observable } from "aurelia-framework";
import { BooksApi } from "../../services/books-api";
import { BooksApiJsonp } from "../../services/books-api-jsonp";
import { EventAggregator } from "aurelia-event-aggregator";
import _ from "lodash";

@inject(BooksApi, BooksApiJsonp, EventAggregator)
export class Books {
  constructor(booksApi, booksApiJsonp, eventAggregator) {
    this.books = [];
    this.booksApi = booksApi;
    this.booksApiJsonp = booksApiJsonp;
    this.eventAggregator = eventAggregator;
    this.bookTitle = "";
  }

  attached() {
    this.subscribeToEvents();
  }

  @computedFrom("bookTitle.length")
  get canAdd() {
    return this.bookTitle.length === 0;
  }

  addBook() {
    this.booksApi.addBook({ title: this.bookTitle }).then((createBook) => {
      this.books.push(createBook);
      this.bookTitle = "";
    });

    console.log(this.books);
  }

  removeBook(bookToRemove) {
    this.booksApi.deleteBook(bookToRemove).then(() => {
      let bookIndex = _.findIndex(this.books, (book) => {
        return book._id === bookToRemove._id;
      });
      this.books.splice(bookIndex, 1);
    });
  }

  subscribeToEvents() {
    this.bookRemovedSubscription = this.eventAggregator.subscribe(
      "book-removed",
      (book) => this.removeBook(book)
    );

    this.bookSavedSubscription = this.eventAggregator.subscribe(
      "save-book",
      (book) => this.bookSaved(book)
    );
  }

  bookSaved(updateBook) {
    this.booksApi.saveBook(updateBook).then((savedBook) => {
      let index = this.books.findIndex((book) => book._id == updateBook._id);
      Object.assign(this.books[index], updateBook);

      this.eventAggregator.publish(`book-save-complete-${savedBook._id}`);
    });
  }

  bind() {
    this.booksApi.getBooks().then((savedBooks) => (this.books = savedBooks));
    this.loadGenres();
    this.loadShelves();
    this.loadBooksJsonp();
  }

  loadBooksJsonp() {
    this.booksApiJsonp.getBooksJsonp().then((books) => {
      return console.log("jsonp", books);
    });
  }

  loadGenres() {
    this.booksApi.getGenres().then((genres) => {
      this.genres = genres;
    });
  }

  loadShelves() {
    this.booksApi.getShelves().then((shelves) => {
      this.shelves = shelves;
    });
  }

  detached() {
    this.bookRemovedSubscription.dispose();
    this.bookSavedSubscription.dispose();
  }
}
