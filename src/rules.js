module.exports = {
	min: (value, min) => value.length >= min,
	max: (value, max) => value.length <= max,
	boolean: value => typeof value === 'boolean',
	within: (value, within) => within.split(',').includes(value),
	accepted: value => ['yes', 'on', 1, '1', true, 'true'].includes(value),
	required: value => [null, undefined, '', {}, []].includes(value) === false,
	email: value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value)),
	phone: value => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value),
};
