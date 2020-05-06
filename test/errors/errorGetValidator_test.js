
'use strict';

module.exports = (it, expect, { validator }) => {
	const Validation = validator({ name: 'example' }, { name: 'required' });

	it('should be able to access its validator', () =>
	{
		expect(Validation.validate().errors().getValidator()).to.eql(Validation);
	});
};
