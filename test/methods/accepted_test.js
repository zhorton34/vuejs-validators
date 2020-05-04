'use strict';
module.exports = (it, expect, { rules }) => {
	const { accepted } = rules;

	it('should return true if "on", 1, "1", "yes", "true", or true,', () =>
	{

		expect(accepted('yes')).to.eql(true);
		expect(accepted('on')).to.eql(true);
		expect(accepted(1)).to.eql(true);
		expect(accepted('1')).to.eql(true);
		expect(accepted(true)).to.eql(true);
		expect(accepted('true')).to.eql(true);
	});

	it('should return false if not "on", 1, "1", "yes", "true", or true,', () => {
		expect(accepted(0)).to.eql(false);
		expect(accepted('2')).to.eql(false);
		expect(accepted('off')).to.eql(false);
		expect(accepted(false)).to.eql(false);
		expect(accepted('asdf')).to.eql(false);
		expect(accepted('false')).to.eql(false);
	});
};
