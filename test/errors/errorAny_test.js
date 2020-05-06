'use strict';

module.exports = (it, expect, { errors }) => {
	it('should return true if there are "any" error messages', () =>
	{
		expect(errors.any()).to.eql(true);
	});

	it('should return false if there are NOT "any" error messages', () =>
	{
		errors.set({
			name: [],
			email: [],
			example: []
		});

		expect(errors.all()).to.eql({
			name: [],
			email: [],
			example: []
		});

		expect(errors.any()).to.eql(false);
	});
};
