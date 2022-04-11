import { UserApi } from "../../src/services/user-api";
import { TestHelper } from "./test-helper";
import TestData from "./test-data";

describe("The UserApi service", () => {
  let httpClient, sut;
  let countries = TestData.Countries;
  let users = TestData.Users;

  let testUsers = beforeEach(() => {
    httpClient = jasmine.createSpyObj("HttpClient", ["fetch"]);
    sut = new UserApi(httpClient);
  });

  it("loads a user's country", (done) => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync(countries));

    sut
      .loadCountry("au")
      .then((res) => expect(res).toEqual(countries[0]))
      .then(() =>
        expect(httpClient.fetch).toHaveBeenCalledWith("countries?code=au")
      )
      .then(done);
  });

  it("loads an empty country as fallback", (done) => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync([]));

    sut
      .loadCountry()
      .then((res) => expect(res).toEqual({ code: "", name: "" }))
      .then(() =>
        expect(httpClient.fetch).toHaveBeenCalledWith(
          "countries?code=undefined"
        )
      )
      .then(done);
  });

  it("return all users", (done) => {
    httpClient.fetch.and.returnValue(TestHelper.mockResponseAsync(users));

    sut
      .getUsers()
      .then((res) => expect(res).toEqual(users))
      .then(() => expect(httpClient.fetch).toHaveBeenCalledWith("users"))
      .then(done);
  });
});
