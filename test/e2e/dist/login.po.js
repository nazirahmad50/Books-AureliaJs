"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageObjectLogin = undefined;

var _index = require("../../../node_modules/protractor/built/index");

var PageObjectLogin = /*#__PURE__*/exports.PageObjectLogin = function () {
  function PageObjectLogin() {}

  var _proto = PageObjectLogin.prototype;

  _proto.getHeader = function getHeader() {
    return (0, _index.element)(_index.by.tagName("h1.brand-heading")).getText();
  };

  _proto.setUsername = function setUsername(value) {
    return (0, _index.element)(_index.by.valueBind("userName")).clear().sendKeys(value);
  };

  _proto.setPassword = function setPassword(value) {
    return (0, _index.element)(_index.by.valueBind("password")).clear().sendKeys(value);
  };

  _proto.pressSubmitButton = function pressSubmitButton() {
    return (0, _index.element)(_index.by.css('button[type="submit"]')).click();
  };

  _proto.getLoginError = function getLoginError() {
    return (0, _index.element)(_index.by.css(".login-error")).getText();
  };

  return PageObjectLogin;
}();
//# sourceMappingURL=login.po.js.map
