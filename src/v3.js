/*\
  * Returns RFC4122, version 3 
  * 算法：
  * https://tools.ietf.org/html/rfc4122.html#section-4.2.2
  * 
  * Version 3 
  * The algorithm for generating a UUID from a name and a name space are
   as follows:

   o  Allocate a UUID to use as a "name space ID" for all UUIDs
      generated from names in that name space; see Appendix C for some
      pre-defined values.

   o  Choose either MD5 [4] or SHA-1 [8] as the hash algorithm; If
      backward compatibility is not an issue, SHA-1 is preferred.

  o  Convert the name to a canonical sequence of octets (as defined by
      the standards or conventions of its name space); put the name
      space ID in network byte order.

   o  Compute the hash of the name space ID concatenated with the name.

   o  Set octets zero through 3 of the time_low field to octets zero
      through 3 of the hash.

   o  Set octets zero and one of the time_mid field to octets 4 and 5 of
      the hash.

   o  Set octets zero and one of the time_hi_and_version field to octets
      6 and 7 of the hash.

   o  Set the four most significant bits (bits 12 through 15) of the
      time_hi_and_version field to the appropriate 4-bit version number
      from Section 4.1.3.

   o  Set the clock_seq_hi_and_reserved field to octet 8 of the hash.

   o  Set the two most significant bits (bits 6 and 7) of the
      clock_seq_hi_and_reserved to zero and one, respectively.

   o  Set the clock_seq_low field to octet 9 of the hash.

   o  Set octets zero through five of the node field to octets 10
      through 15 of the hash.

   o  Convert the resulting UUID to local byte order.

\*/