import { Greeter } from "./greeter";

describe("The Greeter", () => {
  it("returns a greeting", function () {
    let greeter = new Greeter();

    expect(greeter.message).toBe("Hello brave world");
  });
});
