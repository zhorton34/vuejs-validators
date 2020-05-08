
'use strict';

module.exports = (it, expect, { rules }) => {
	const { ends_with } = rules;

	it('should pass "ends_with" rule', () => {
		expect(ends_with({ value: 'student one', parameters: ['hey,one,oh'] })).to.eql(true);
		expect(ends_with({ value: 'pat mahomes', parameters: ['russel,brady,mahomes'] })).to.eql(true);
	});

	it('should fail "ends_with" rule', () => {
		expect(ends_with({ value: 'cami', parameters: ['jen'] })).to.eql(false);
		expect(ends_with({ value: 'http//cleancode.studio', parameters: ['//,fdsdf'] })).to.eql(false);
		expect(ends_with({ value: [], parameters: ['fasdf'] })).to.eql(false);
		expect(ends_with({ value: {}, parameters: ['fasdf'] })).to.eql(false);
		expect(ends_with({ value: 0, parameters: ['fasdf'] })).to.eql(false);
		expect(ends_with({ value: false, parameters: ['fasdf'] })).to.eql(false);
	});
};

