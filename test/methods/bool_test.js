'use strict';
module.exports = (it, expect, { rules }) => {
	const { boolean } = rules;

	it('should return true if boolean(ish) value', () =>
	{
		expect(boolean({ value: true })).to.eql(true);
		expect(boolean({ value: false })).to.eql(true);
		expect(boolean({ value: 1 })).to.eql(true);
		expect(boolean({ value: 0 })).to.eql(true);
		expect(boolean({ value: 'yes' })).to.eql(true);
		expect(boolean({ value: 'no' })).to.eql(true);
		expect(boolean({ value: 'No' })).to.eql(true);
		expect(boolean({ value: 'Yes' })).to.eql(true);
		expect(boolean({ value: 'On' })).to.eql(true);
		expect(boolean({ value: 'Off' })).to.eql(true);
		expect(boolean({ value: '1' })).to.eql(true);
		expect(boolean({ value: '0' })).to.eql(true);
	});
	it('should return false if not a boolean(ish) value', () =>
	{
		expect(boolean({ value: 'something' })).to.eql(false);
		expect(boolean({ value: 'four' })).to.eql(false);
		expect(boolean({ value: {} })).to.eql(false);
		expect(boolean({ value: [] })).to.eql(false);
		expect(boolean({ value: '' })).to.eql(false);
		expect(boolean({ value: undefined })).to.eql(false);
		expect(boolean({ value: null })).to.eql(false);
	});
};
