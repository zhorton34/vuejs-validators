'use strict';
module.exports = (it, expect, { rules }) => {
	const { accepted } = rules;

	it('should return true if "on", 1, "1", "yes", "true", or true,', () =>
	{

		expect(accepted({ value: 'yes' })).to.eql(true);
		expect(accepted({ value: 'on' })).to.eql(true);
		expect(accepted({ value: 1 })).to.eql(true);
		expect(accepted({ value: '1' })).to.eql(true);
		expect(accepted({ value: true })).to.eql(true);
		expect(accepted({ value: 'true' })).to.eql(true);
	});

	it('should return false if not "on", 1, "1", "yes", "true", or true,', () => {
		expect(accepted({ value: 0 })).to.eql(false);
		expect(accepted({ value: '2' })).to.eql(false);
		expect(accepted({ value: 'off' })).to.eql(false);
		expect(accepted({ value: false })).to.eql(false);
		expect(accepted({ value: 'asdf' })).to.eql(false);
		expect(accepted({ value: 'false' })).to.eql(false);
	});
};
