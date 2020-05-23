
'use strict';

const Middleware = function() {};

Middleware.prototype.use = function(fn) {
	let self = this;

	this.go = (function(stack) {
		return function(next) {
			stack.call(self, function() {
				fn.call(self, next.bind(self));
			});
		}.bind(this);
	})(this.go);
};

Middleware.prototype.go = function(next) {
	next();
};

const middleware = () => new Middleware();

module.exports = middleware;
module.exports.default = middleware;
module.exports.middleware = middleware;
module.exports.Middleware = Middleware;


const Pipeline = function (target, line = [], inject = []) {
	this.middleware = middleware();
	this.middleware.rule = target;
	this.middleware.options = inject;

	line.forEach(assemble => this.line.use(assemble));
};

Pipeline.prototype.go = function (callback) {
	this.middleware.go(callback);
};


const pipe = (target = {}, line = [], inject = {}) => new Pipeline(target, line, inject);

module.exports = pipe;
module.exports.pipe = pipe;
module.exports.default = pipe;
module.exports.pipeline = pipeline;
module.exports.Pipeline = Pipeline;
