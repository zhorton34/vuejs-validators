/**
 * Determine if a value is Truthy
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
	const truthy = [
		1, '1',
		'on', 'On', 'ON',
		'yes', 'Yes', 'YES',
		true, 'true', 'True', 'TRUE',
	];

	return truthy.includes(value);
};
