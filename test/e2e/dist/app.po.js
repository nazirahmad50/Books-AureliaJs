"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageObjectApp = undefined;

var _index = require("../../../node_modules/protractor/built/index");

var PageObjectApp = /*#__PURE__*/exports.PageObjectApp = function () {
  function PageObjectApp() {}

  var _proto = PageObjectApp.prototype;

  _proto.getCurrentPageTitle = function getCurrentPageTitle() {
    return _index.browser.getTitle();
  };

  return PageObjectApp;
}();
//# sourceMappingURL=app.po.js.map
