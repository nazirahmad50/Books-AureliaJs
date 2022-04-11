"use strict";

var _appPo = require("./app.po.js");

var _loginPo = require("./login.po.js");

describe("my-books", function () {
  var poLogin;
  var poApp;
  beforeEach(function () {
    poApp = new _appPo.PageObjectApp();
    poLogin = new _loginPo.PageObjectLogin();
    browser.loadAndWaitForAureliaPage("http://localhost:9000");
  });
  it("should load the page and display the initial page title", function () {
    expect(poApp.getCurrentPageTitle()).toBe("login | my-books");
  });
  it("should display a header", function () {
    expect(poLogin.getHeader()).toBe("My-Books");
  });
  it("it should fail to log in with invalid password", function () {
    poLogin.setUsername("Bilbo");
    poLogin.setPassword("password3");
    poLogin.pressSubmitButton();
    browser.sleep(200);
    expect(poLogin.getLoginError()).toBe("Authentication failed. Invalid user name or password.");
  });
  it("it should login with valid username and password", function () {
    poLogin.setUsername("Bilbo");
    poLogin.setPassword("password1");
    poLogin.pressSubmitButton();
    browser.sleep(200);
    expect(poApp.getCurrentPageTitle()).toBe("home | my-books");
  });
});
//# sourceMappingURL=login.spec.js.map
