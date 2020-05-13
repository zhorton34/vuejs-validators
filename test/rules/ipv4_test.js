
'use strict';

module.exports = (it, expect, { rules }) => {
	const { ipv4 } = rules;

	it('should return true if value passes "ipv4" rule', () =>
	{
		expect(ipv4({ value: "115.42.150.37" })).to.eql(true);
		expect(ipv4({ value: "192.168.0.1" })).to.eql(true);
		expect(ipv4({ value: "110.234.52.124" })).to.eql(true);
	});

	it('should return false if value fails "ipv4" rule', () =>
	{
		expect(ipv4({ value: "2001:0db8:85a3:0000:0000:8a2e:0370:7334" })).to.eql(false);
		expect(ipv4({ value: '210.110', })).to.eql(false);
		expect(ipv4({ value: '255' })).to.eql(false);
		expect(ipv4({ value: 'y.y.y.y' })).to.eql(false);
		expect(ipv4({ value: '255.0.0.y' })).to.eql(false);
		expect(ipv4({ value: '666.10.10.20' })).to.eql(false);
		expect(ipv4({ value: '4444.11.11.11' })).to.eql(false);
		expect(ipv4({ value: '33.3333.33.3' })).to.eql(false);
	});
};
