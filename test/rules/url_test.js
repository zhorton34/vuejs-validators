'use strict';

module.exports = (it, expect, { rules }) => {
	const { url } = rules;

	it('should pass "url" rule', () => {
		expect(url({ value: 'https://google.com' })).to.eql(true);
		expect(url({ value: 'http://cleancode.studio' })).to.eql(true);
	});

	it('should fail "url" rule', () => {
		expect(url({ value: 'ttps://google.com' })).to.eql(false);
		expect(url({ value: 'http//cleancode.studio' })).to.eql(false);
	});
};

