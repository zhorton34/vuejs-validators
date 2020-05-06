'use strict';

module.exports = (it, expect, { rules }) => {
	const { json } = rules;

	it('should pass "json" rule', () =>
	{
		expect(json({ value: JSON.stringify({ name: 'test' })})).to.eql(true);
		expect(json({ value: JSON.stringify(['one', 'two']) })).to.eql(true);
		expect(json({ value: JSON.stringify({ team: ['chiefs', 'ravens' ] })})).to.eql(true);
		expect(json({ value: JSON.stringify({ coach: 'andy reid' }) })).to.eql(true);
	});

	it('should fail "json" rule', () => {
		expect(json({ value: 'asdf' })).to.eql(false);
		expect(json({ value: 4 })).to.eql(false);
		expect(json({ value: 'adfa' })).to.eql(false);
	});
};
