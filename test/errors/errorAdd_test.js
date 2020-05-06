'use strict';

module.exports = (it, expect, { errors }) => {
	it('should return true if field message is able to "add" an error message', () => {
		const field = 'name';
		const message = 'custom name field error message';

		expect(errors.list(field).includes(message)).to.eql(false);

		errors.add(field, message);

		expect(errors.list(field).includes(message)).to.eql(true);
	});
};
