'use strict';

var Middleware = function Middleware() {};

Middleware.prototype.use = function (fn) {
  var self = this;

  this.go = function (stack) {
    return function (next) {
      stack.call(self, function () {
        fn.call(self, next.bind(self));
      });
    }.bind(this);
  }(this.go);
};

Middleware.prototype.go = function (next) {
  next();
};

var middleware = function middleware() {
  return new Middleware();
};

module.exports = middleware;
module.exports["default"] = middleware;
module.exports.middleware = middleware;
module.exports.Middleware = Middleware;

var Pipeline = function Pipeline(target) {
  var _this = this;

  var line = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var inject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  this.middleware = middleware();
  this.middleware.rule = target;
  this.middleware.options = inject;
  line.forEach(function (assemble) {
    return _this.line.use(assemble);
  });
};

Pipeline.prototype.go = function (callback) {
  this.middleware.go(callback);
};

var pipe = function pipe() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var line = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var inject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return new Pipeline(target, line, inject);
};

module.exports = pipe;
module.exports.pipe = pipe;
module.exports["default"] = pipe;
module.exports.Pipeline = Pipeline;