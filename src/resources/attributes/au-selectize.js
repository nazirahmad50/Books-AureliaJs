import selectize from "selectize";
import { dynamicOptions, inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

@dynamicOptions
@inject(Element, HttpClient)
export class AuSelectizeCustomAttribute {
  constructor(element, httpClient) {
    this.element = element;
    this.http = httpClient;
    this.selected = [];
  }

  attached() {
    if (this.url) this.intializeRemoteSelectize();
    else {
      this.intializeClientSelectize();
    }
  }

  intializeClientSelectize() {
    this.selectizeElement = $(this.element).selectize()[0];
  }
  intializeRemoteSelectize() {
    this.selectizeElement = $(this.element).selectize({
      valueField: this.valueField,
      labelField: this.labelField,
      searchField: this.searchField,
      preload: true,
      options: [],
      load: (query, callback) => {
        this.http
          .fetch(this.url)
          .then((res) => res.json())
          .then((data) => {
            callback(data);
          })
          .catch((error) => {
            callback();
          });
      },
    })[0];

    this.selectizeElement.selectize.on("change", () => {
      let notice = new Event("change", { bubbles: true });
      $(this.element)[0].dispatchEvent(notice);
    });
  }
}
