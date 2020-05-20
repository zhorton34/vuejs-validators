
'use strict';

module.exports =  (it, expect, { rules }) => {
	const { before_or_equal } = rules;

	it('should not fail before_or_equal (date) rule', () => {
		expect(before_or_equal({ value: '4-22-1997', parameters: ['4-22-1997'] })).to.eql(true);
		expect(before_or_equal({ value: '4-22-1997', parameters: ['4-23-1997'] })).to.eql(true);
		expect(before_or_equal({ value: '4/22/1997', parameters: ['4/23/1997'] })).to.eql(true);
		expect(before_or_equal({ value: 'April 22 1997', parameters: ['April 23 1997'] })).to.eql(true);
		expect(before_or_equal({ value: '4.22.1997', parameters: ['4.23.1997'] })).to.eql(true);
		expect(before_or_equal({ value: 'Tuesday April 22 1997', parameters: ['Tuesday April 23 1997'] })).to.eql(true);
	});

	it('should fail before_or_equal (date) rule', () => {
		expect(before_or_equal({ parameters: ['4-22-1997'], value: '4-23-1997' })).to.eql(false);
		expect(before_or_equal({ parameters: ['4/22/1997'], value: '4/23/1997' })).to.eql(false);
		expect(before_or_equal({ parameters: ['April 22 1997'], value: 'April 23 1997' })).to.eql(false);
		expect(before_or_equal({ parameters: ['4.22.1997'], value: '4.23.1997' })).to.eql(false);
		expect(before_or_equal({ parameters: ['Tuesday April 22 1997'], value: 'Tuesday April 23 1997' })).to.eql(false);
	})
};
