import { bindable, inject, computedFrom, NewInstance } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { BootstrapFormRenderer } from "../../renderers/bootstrap-form-renderer";
import { ValidationRules, ValidationController } from "aurelia-validation";
import _ from "lodash";

@inject(EventAggregator, NewInstance.of(ValidationController))
export class EditBook {
  @bindable editMode;
  @bindable book;
  @bindable genres;
  @bindable selectedGenre;
  @bindable shelves;
  temporaryBook = new Book();

  constructor(eventAggregator, validationController) {
    this.eventAggregator = eventAggregator;
    this.resetTempBook();
    this.ratingChangeEventListener = (e) =>
      (this.temporaryBook.rating = e.rating);
    this.editingShelves = false;
    this.saved = false;

    this.controller = validationController;
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  toggleEditShelves() {
    this.editingShelves = !this.editingShelves;
  }

  unToggleEditShelves() {
    this.temporaryBook.shelves = this.selectedShelves.map(
      (shelf) => shelf.name
    );
    this.editingShelves = !this.editingShelves;
  }

  bind() {
    this.resetTempBook();
    this.ratingElement.addEventListener(
      "change",
      this.ratingChangeEventListener
    );

    this.selectedGenre = this.genres.find((g) => g._id === this.book.genre);
    this.selectedShelves = this.shelves.filter(
      (shelf) => this.temporaryBook.shelves.indexOf(shelf.name) !== -1
    );
  }

  editModeChanged(EditNew, EditOld) {
    if (EditNew) this.resetTempBook();
  }

  selectedGenreChanged(newVal, oldVal) {
    if (!newVal) return;
    this.temporaryBook.genre = newVal._id;
  }

  @computedFrom(
    "temporaryBook.title",
    "temporaryBook.description",
    "temporaryBook.rating",
    "temporaryBook.ownACopy",
    "temporaryBook.genre",
    "temporaryBook.shelves",
    "saved"
  )
  get canSave() {
    let clean =
      this.temporaryBook.title == this.book.title &&
      this.temporaryBook.genre == this.book.genre &&
      this.temporaryBook.ownACopy == this.book.ownACopy &&
      this.temporaryBook.description == this.book.description &&
      this.temporaryBook.shelves == this.book.shelves &&
      this.temporaryBook.rating == this.book.rating;

    return !clean;
  }

  resetTempBook() {
    Object.assign(this.temporaryBook, this.book);
  }

  cancel() {
    console.log(this.book);
    this.temporaryBook = this.book;
    this.toggleEditMode();
    this.starRatingViewModel.applyRating(this.temporaryBook.rating);
  }

  save() {
    this.controller.validate().then((res) => {
      if (res.valid) {
        this.loading = true;
        this.publishSavedEvent();
      }
    });
  }

  bookSaveComplete() {
    this.loading = false;
    this.saved = true;
    setTimeout(() => {
      this.resetTempBook();
      this.saved = true;
      this.toggleEditMode();
    }, 500);
  }
  publishSavedEvent() {
    this.eventAggregator.publish("save-book", this.temporaryBook);
  }

  attached() {
    this.bookSavedCompleteSubscription = this.eventAggregator.subscribe(
      `book-save-complete-${this.book._id}`,
      () => this.bookSaveComplete()
    );
  }

  toggleEditMode() {
    this.eventAggregator.publish("edit-mode-changed", !this.editMode);
  }

  detached() {
    this.bookSavedCompleteSubscription.dispose();
    this.ratingElement.removeEventListener(
      "change",
      this.ratingChangeEventListener
    );
  }
}

export class Book {
  title = "";
  description = "";
  timesRead = 0;
}

ValidationRules.customRule(
  "positiveInteger",
  (value, obj) =>
    value === null ||
    value === undefined ||
    Number.isInteger(value) ||
    value >= 0,
  `Books can only be read 0 or more times.`
);

ValidationRules.ensure((a) => a.title)
  .required()
  .ensure((a) => a.timesRead)
  .required()
  .satisfiesRule("positiveInteger")
  .on(Book);
