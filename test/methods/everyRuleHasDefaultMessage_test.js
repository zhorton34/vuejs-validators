const rules = require('../../src/rules');
const messages = require('../../src/messages');

module.exports = (it, expect, {  }) => {

	it('should have the same message keys as rules keys', () =>
	{
		expect(Object.keys(rules)).to.eql(Object.keys(messages));
	});
};
