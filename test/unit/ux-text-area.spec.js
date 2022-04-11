import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";
import TestData from "./test-data";
import { TestHelper } from "./test-helper";

describe("UxTextArea", () => {
  let comp;
  let bookDescription = TestData.Books.Oliver.description;

  beforeEach(() => {
    comp = StageComponent.withResources("./resources/components/ux-text-area")
      .inView(
        `<ux-text-area text-content.bind="description">
        </ux-text-area>`
      )
      .boundTo({ description: bookDescription });
  });

  function getTextAreaElement() {
    return TestHelper.shadowRoot("ux-text-area");
  }

  function getTextBlockElement() {
    return TestHelper.shadowRoot("ux-text-area").querySelector(".text-block");
  }

  function clickOkButton() {
    let okButton =
      TestHelper.shadowRoot("ux-text-area").querySelector("button.ok");
    return TestHelper.clickAndWait(okButton);
  }

  function changeTextAreaValue(value) {
    let componentElement = getTextAreaElement();
    let textArea = componentElement.querySelector("textarea");
    textArea.value = value;
    let event = new Event("change");

    textArea.dispatchEvent(event);
  }

  function editText() {
    return TestHelper.clickAndWait(getTextBlockElement());
  }

  it("should init comp with a text box", (done) => {
    comp
      .create(bootstrap)
      .then(() => {
        let actualDescription = getTextBlockElement().innerHTML;
        expect(bookDescription).toBe("The story is of the orphan Oliver Twist");
        done();
      })
      .catch((e) => {
        console.log(e);
      });
  });

  it("transition to text area clicked", (done) => {
    comp
      .create(bootstrap)
      .then(() => {
        editText().then((_) => {
          let actualDescription =
            getTextAreaElement().querySelector("textarea").value;

          expect(bookDescription).toBe(actualDescription);
          done();
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });

  it("it saves changes when ok button is clicked", (done) => {
    comp
      .create(bootstrap)
      .then(() => {
        const updateValue = "Updated value";
        editText().then((_) => {
          changeTextAreaValue(updateValue);

          clickOkButton().then((_) => {
            let actualDescription =
              getTextAreaElement().querySelector("textarea").value;

            expect(actualDescription).toBe(updateValue);
            done();
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });

  afterEach(() => {
    comp.dispose();
  });
});
