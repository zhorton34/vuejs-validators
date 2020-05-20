## Date Equals Rule
(Date)
The field under validation must be a valid, non-relative date according to the new Date js constructor.

> Passes Date Rule
- 4.22.1997 And 4.22.1997
- 4-22-1997 And 4-22-1997
- 4/22/1997 And 4/22/1997
- April 22 1997 And April 22 1997
- Tuesday April 22 1997 And Tuesday April 22 1997

> Fails Date Rule
- asdfweadf and 3.22.1323
- 23423423 and 1234234
- [] and []
- {} and {}
