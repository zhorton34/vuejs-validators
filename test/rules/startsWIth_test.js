
'use strict';

module.exports = (it, expect, { rules }) => {
	const { starts_with } = rules;

	it('should pass "starts_with" rule', () => {
		expect(starts_with({ value: 'pat mahomes', parameters: ['pat,cam,tom'] })).to.eql(true);
		expect(starts_with({ value: 'student one', parameters: ['teacher,student,class'] })).to.eql(true);
	});

	it('should fail "starts_with" rule', () => {
		expect(starts_with({ value: 'cami', parameters: ['jen'] })).to.eql(false);
		expect(starts_with({ value: 'http//cleancode.studio', parameters: ['//,http://'] })).to.eql(false);
		expect(starts_with({ value: [], parameters: ['fasdf'] })).to.eql(false);
		expect(starts_with({ value: {}, parameters: ['fasdf'] })).to.eql(false);
		expect(starts_with({ value: 0, parameters: ['fasdf'] })).to.eql(false);
		expect(starts_with({ value: false, parameters: ['fasdf'] })).to.eql(false);
	});
};

