/**
 * Determine if a value is Falsy
 *
 * @param value
 * @returns boolean
 */
module.exports = function (value) {
	const falsy = [
		0, '0',
		'no', 'No', 'NO',
		'off', 'Off', 'OFF',
		false, 'false', 'False', 'FALSE',
	];

	return falsy.includes(value);
};
