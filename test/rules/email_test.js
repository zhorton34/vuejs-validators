
module.exports = (it, expect, { rules }) => {
	const { email } = rules;

	it('should return true if value passes "email" rule', () =>
	{
		expect(email({ value: 'example@gmail.com' })).to.eql(true);
		expect(email({ value: 'example@cleancode.studio' })).to.eql(true);
		expect(email({ value: 'example@wiki.org' })).to.eql(true);
		expect(email({ value: 'example@website.io' })).to.eql(true);
		expect(email({ value: 'zak.horton@clean.code.studio' })).to.eql(true);
	});
	it('should return false if fails "email" rule', () =>
	{
		expect(email({ value: 'sarah.evans' })).to.eql(false);
		expect(email({ value: 'sarah.evans@lol' })).to.eql(false);
		expect(email({ value: 'sarah.evans@.com' })).to.eql(false);
		expect(email({ value: 'sarah@.com' })).to.eql(false);
		expect(email({ value: 'sarah@org' })).to.eql(false);
		expect(email({ value: 'sarah@org' })).to.eql(false);
		expect(email({ value: 'org.com@s' })).to.eql(false);
	});
};
