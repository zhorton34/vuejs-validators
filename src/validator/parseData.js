'use strict';

module.exports = function parseData(data = {}) {
	let newData = {};

	Object.entries(data).forEach(([key, value]) => {
		if (typeof value === 'object') {
			value = this.parseData(value);
		}

		key = key.replace(/\*/g, '__asterisk__');

		newData[key] = value;
	});

	return newData;
};
