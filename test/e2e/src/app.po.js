import { browser } from "../../../node_modules/protractor/built/index";

export class PageObjectApp {
  constructor() {}

  getCurrentPageTitle() {
    return browser.getTitle();
  }
}
