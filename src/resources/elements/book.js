import { bindable, inject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { DialogService } from "aurelia-dialog";
import { ShareBook } from "../elements/share-book";

@inject(EventAggregator, DialogService)
export class Book {
  @bindable book;
  @bindable searchTerm;
  @bindable genres;
  @bindable shelves;

  constructor(eventAggregator, dialogService) {
    this.eventAggregator = eventAggregator;
    this.editMode = false;
    this.dialogService = dialogService;
  }
  share() {
    this.dialogService
      .open({
        viewModel: ShareBook,
        model: this.book,
      })
      .whenClosed((res) => {
        console.log(res);
      });
  }

  markRead() {
    this.book.readDate = new Date();
    this.book.read = true;
  }

  removeBook() {
    this.eventAggregator.publish("book-removed", this.book);
  }

  toggleEditMode(ev) {
    this.editMode = !this.editMode;
  }

  bind() {
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.editModeChangedSubscription = this.eventAggregator.subscribe(
      "edit-mode-changed",
      (mode) => {
        this.editMode = mode;
      }
    );
  }

  unbind() {
    this.editModeChangedSubscription.dispose();
  }

  detached() {
    if (this.bookSavedSubscription !== null)
      this.bookSavedSubscription.dispose();
  }
}
