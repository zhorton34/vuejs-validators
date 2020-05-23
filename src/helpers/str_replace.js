/**
 * String Replace To Match Php Syntax (For Laravel Validation That's Already Set Up)
 *
 * @param search
 * @param replace
 * @param subject
 * @param countObj
 * @returns {any}
 */
module.exports = function str_replace(search, replace, subject, countObj) {
	let i = 0;
	let j = 0;
	let temp = '';
	let repl = '';
	let sl = 0;
	let fl = 0;
	let f = [].concat(search);
	let r = [].concat(replace);
	let s = subject;
	let ra = Object.prototype.toString.call(r) === '[object Array]';
	let sa = Object.prototype.toString.call(s) === '[object Array]';
	s = [].concat(s);

	let $global = (typeof window !== 'undefined' ? window : global);
	$global.$locutus = $global.$locutus || {};
	let $locutus = $global.$locutus;
	$locutus.php = $locutus.php || {};

	if (typeof (search) === 'object' && typeof (replace) === 'string') {
		temp = replace;
		replace = [];
		for (i = 0; i < search.length; i += 1) {
			replace[i] = temp;
		}
		temp = '';
		r = [].concat(replace);
		ra = Object.prototype.toString.call(r) === '[object Array]';
	}

	if (typeof countObj !== 'undefined') {
		countObj.value = 0;
	}

	for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') {
			continue
		}
		for (j = 0, fl = f.length; j < fl; j++) {
			temp = s[i] + '';
			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			s[i] = (temp).split(f[j]).join(repl);
			if (typeof countObj !== 'undefined') {
				countObj.value += ((temp.split(f[j])).length - 1)
			}
		}
	}
	return sa ? s : s[0]
};
