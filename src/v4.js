import { uuidMode_v4 } from './consts';

/*\
  * Returns RFC4122, version 4 
  * 代码来源：
  * https://github.com/DmitryBaranovskiy/raphael/blob/639b8cb2f5229421e7c094cb5e2b8d946cad5233/dev/raphael.core.js
  * 算法：
  * https://tools.ietf.org/html/rfc4122.html#section-4.4
  * The version 4 UUID is meant for generating UUIDs from truly-random or pseudo-random numbers.

   The algorithm is as follows:

   o  Set the two most significant bits (bits 6 and 7) of the
      clock_seq_hi_and_reserved to zero and one, respectively.

      理解：根据clock_seq_hi_and_reserved的位置（8）与长度（8位）可知，
      第6和7位就是uuid中第17个数字的二进制码（10xx）

   o  Set the four most significant bits (bits 12 through 15) of the
      time_hi_and_version field to the 4-bit version number from
      Section 4.1.3.

      理解：根据time_hi_and_version的位置（6-7）与长度（16位）可知，
      第12到15位就是uuid中第13个数字的二进制码（版本号：0100））

   o  Set all the other bits to randomly (or pseudo-randomly) chosen
      values.

\*/

/*\
 * 总结： 
 * 规则1：a & b(2^n - 1) 值为： 0 到 b 之间 (取值包含 0 和 b)
 * 规则2：a | b(2^n) 值为：a < b ? a + b : a
 * 
 * 根据version 4规则，第13个数字为4，第17个数字取值范围位8-11
 * r & 3: 满足规则1，值域为：0-3之间。
 * r & 3 | 8: 满足规则2，且r&3的值肯定小于8，因此值域为：8+0 - 8+3之间
    
\*/
const createUUID = ((uuidRegEx, uuidReplacer) => {
  const uuidRegEx = /[xy]/g;
  const uuidReplacer = c => {
    // 利用 |0 运算取整，保证了r的值域为：0-15
    const r = Math.random() * 16 | 0;
    const v = c == "x" ? r : (r & 3 | 8);
    return v.toString(16);
  }

  return () => {
    return uuidMode_v4.replace(uuidRegEx, uuidReplacer).toUpperCase();
  };
})();

export default createUUID