
'use strict';

module.exports =  (it, expect, { rules }) => {
	const { date } = rules;

	it('should not fail the date rule', () => {
		expect(date({ value: '4-22-1997' })).to.eql(true);
		expect(date({ value: '4/22/1997' })).to.eql(true);
		expect(date({ value: 'April 22 1997' })).to.eql(true);
		expect(date({ value: '4.22.1997' })).to.eql(true);
		expect(date({ value: 'Tuesday April 22 1997' })).to.eql(true);
	});

	it('should fail date rule', () => {
		expect(date({ value: 'asdfasdf' })).to.eql(false);
		expect(date({ value: 'asdfasdf' })).to.eql(false);
		expect(date({ value: 'asdfasdf' })).to.eql(false);
		expect(date({ value: 'asdfasdf' })).to.eql(false);
	})
};
