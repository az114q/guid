/*\
  * Returns RFC4122, version 1 
  * 代码来源：
  * https://github.com/DmitryBaranovskiy/raphael/blob/639b8cb2f5229421e7c094cb5e2b8d946cad5233/dev/raphael.core.js
  * 算法：
  * https://tools.ietf.org/html/rfc4122.html#section-4.2.2
  * Version 1 UUIDs are generated according to the following algorithm:

   o  Determine the values for the UTC-based timestamp and clock
      sequence to be used in the UUID, as described in Section 4.2.1.

      确定uuid使用了时间戳以及时钟序列的值

   o  For the purposes of this algorithm, consider the timestamp to be a
      60-bit unsigned integer and the clock sequence to be a 14-bit
      unsigned integer.  Sequentially number the bits in a field,
      starting with zero for the least significant bit.

      为实现算法的目的，要考虑将时间戳为无符号60位，时钟序列为无符号14位。
      按顺序对字段中的位进行编号，最不重要的位从0开始。

   o  Set the time_low field equal to the least significant 32 bits
      (bits zero through 31) of the timestamp in the same order of
      significance.

      time_low 区域设置为时间戳中最不重要的32位，根据之前排序即0-31位。

   o  Set the time_mid field equal to bits 32 through 47 from the
      timestamp in the same order of significance.

      time_mid 区域设置为时间戳中的32-47位（共16位），同样根据之前的排序。

   o  Set the 12 least significant bits (bits zero through 11) of the
      time_hi_and_version field equal to bits 48 through 59 from the
      timestamp in the same order of significance.

      time_hi_and_version 区域设置为时间戳中48-59（共12位）

   o  Set the four most significant bits (bits 12 through 15) of the
      time_hi_and_version field to the 4-bit version number
      corresponding to the UUID version being created, as shown in the
      table above.

      将time_hi_and_version的12-15位设置为对应的版本号二进制（0001）

   o  Set the clock_seq_low field to the eight least significant bits
      (bits zero through 7) of the clock sequence in the same order of
      significance.

      clock_seq_low 区域设置为时钟序列中0-7位（共8位）
  
   o  Set the 6 least significant bits (bits zero through 5) of the
      clock_seq_hi_and_reserved field to the 6 most significant bits
      (bits 8 through 13) of the clock sequence in the same order of
      significance.

      clock_seq_hi_and_reserved区域设置为时钟序列中的8-13位（共6位）

   o  Set the two most significant bits (bits 6 and 7) of the
      clock_seq_hi_and_reserved to zero and one, respectively.

      clock_seq_hi_and_reserved 区域共8位，另外第6位和第7位分布设置为0和1

   o  Set the node field to the 48-bit IEEE address in the same order of
      significance as the address.

      将node 区域设置为48位的IEEE地址，其意义与地址相同

\*/
import BitTool from './BitTool';
import { transTimestamp, transClockSequence, transNode, system100ns, getTimestamp, getClockSequence, getNode } from './lib'

let msecond;
let nsecond;
let clockSequence = getClockSequence().v1;

function v1({ nodeNumber }) {
  if (!nodeNumber) {
    throw new Error('RFC - 4.1.6: uuid的v1版本的node值需用户提供');
  }
  // 从1582年10月15日起的毫秒数
  // RFC4122 4.1.4
  const _lastMsecond = getTimestamp().v1;

  // 因js无法精确到100纳秒计数，所以同程序计数来实现
  // 每次生存uuid,最新得到的_lastMsecond与上次msecond的值一样，说明生成时间间隔超过了js性能，那么nsecond递增1。
  // 不相等时，更新msecond，nsecond重置为0。
  if (msecond === _lastMsecond) {
    nsecond += 1;
  } else {
    msecond = _lastMsecond;
    nsecond = 0;
  }
  // 但如果比100纳秒的频率还高咋办？
  if (nsecond >= system100ns) {
    throw new Error('uuid.v1(): 每秒最多生成10000个uuid，请调整uuid生成频率');
  }

  // RFC4122 4.1.4
  // 时间戳为60位二进制串组成，时间单位为100纳秒。由于js中只有毫秒的精度，
  // 因此，在同一毫秒内生成多次uuid则通过nsecond计数来区分，
  // 当nsecond大于10000时，则表示在已经超过时间戳定义的极限，无法极限生成。
  const timestamp = msecond * system100ns;
  const { time_low, time_mid, time_hi_and_version } = transTimestamp(timestamp, nsecond, 1)

  // RFC4122 4.1.5
  // 时钟序列必须是原始的（即，初始化为随机数，不能与节点标识符关联，以最小化系统间的相关性）并且根据生成次数自动递增。
  clockSequence += 1;
  const { clock_seq_low, clock_seq_hi_and_reserved } = transClockSequence(clockSequence)

  const { node } = transNode(nodeNumber)

  return `${time_low}-${time_mid}-${time_hi_and_version}-${clock_seq_hi_and_reserved + clock_seq_low}-${node}`.toUpperCase()
}

export default v1