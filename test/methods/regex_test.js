'use strict';

module.exports = (it, expect, { rules }) => {
	const { regex, not_regex } = rules;

	it('should pass "regex" rule', () =>
	{
		expect(regex({ value: 'https://google.com', parameters: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/] })).to.eql(true);
	});

	it('should pass "not_regex" rule', () => {
		expect(not_regex({
			value: 'asm:/google.com',
			parameters: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/]
		})).to.eql(true);
	});

	it('should fail "regex" rule', () => {
		expect(regex({
			value: 'asm:/google.com',
			parameters: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/]
		})).to.eql(false);
	});

	it('should fail "not_regex" rule', () => {
		expect(not_regex({
			value: 'https://google.com',
			parameters: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/]
		})).to.eql(false);
	});
};
