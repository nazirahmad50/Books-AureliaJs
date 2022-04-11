export class TestHelper {
  static mockResponseAsync(body) {
    return Promise.resolve({
      json: () => Promise.resolve(body),
    });
  }

  static shadowRoot(querySelector) {
    return document.querySelector(querySelector).shadowRoot;
  }

  static clickAndWait(elm) {
    elm.click();
    return new Promise(setTimeout);
  }

  static fireJQueryEventAndWait(selector, eventType) {
    $(selector)[eventType]();

    return new Promise(setTimeout);
  }
}
