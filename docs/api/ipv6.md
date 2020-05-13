## IPv6 Rule

> This validation rule confirms that value is an IPv6 address.

> `Passing IPv6 Rule`
- "2001:0db8:85a3:0000:0000:8a2e:0370:7334" (Ipv6)

> `Failing IPv6 Rule`
- "210.110" – must have 4 octets
- "255" – must have 4 octets
- "y.y.y.y" – the only digit has allowed
- "255.0.0.y" – the only digit has allowed
- "666.10.10.20" – digit must between [0-255]
- "4444.11.11.11" – digit must between [0-255]
- "33.3333.33.3" – digit must between [0-255]
- "110.234.52.124"
- "192.168.0.1"
- "115.42.150.37"


