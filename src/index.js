/*\
  * Returns RFC4122
  * [RFC4122链接](https://tools.ietf.org/html/rfc4122.html) 
  * 
  * UUID 格式及含义
  * 格式: 
  *   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  *   UUID                   = time-low "-" time-mid "-" time-high-and-version "-" clock-seq-and-reserved clock-seq-low "-" node
  * 含义：
      time-low               = 4hexOctet 
      time-mid               = 2hexOctet  
      time-high-and-version  = 2hexOctet 
      clock-seq-and-reserved = hexOctet
      clock-seq-low          = hexOctet
      node                   = 6hexOctet
      hexOctet               = hexDigit hexDigit
      hexDigit = "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" / "a" / "b" / "c" / "d" / "e" / "f" / "A" / "B" / "C" / "D" / "E" / "F"
  
  * 一个uuid由32个数字（4位的16进制数），因此，其大小为：32*4 = 128二进制位。uuid理论总数为：2^128。
  * 将其编码为二进制数后，由128位0和1组成。
  * 根据以下各字段含义，可一次去除相应的二进制位进行解析含义。
  * xxxxxxxx (time_low:32 = 8*4) - 
  * xxxx (time_mid:16 = 4*4) - 
  * xxxx (time_hi_and_version:16 = 4*4) -
  * xx (clock_seq_hi_and_reserved:8 = 2*4) xx(clock_seq_low:8 = 2*4) - 
  * xxxxxxxxxxxx (node: 48 = 12*4)

  * UUID各字段含义
  * Field                  Data Type     Octet  Note
                                        #

   time_low               unsigned 32   0-3    The low field of the         时间戳的低字段
                          bit integer          timestamp

   time_mid               unsigned 16   4-5    The middle field of the      时间戳的中间域
                          bit integer          timestamp

   time_hi_and_version    unsigned 16   6-7    The high field of the        时间戳的高字段与版本号多路复用
                          bit integer          timestamp multiplexed
                                               with the version number

  clock_seq_hi_and_rese  unsigned 8    8      The high field of the         时钟序列的高场与变型多路复用
   rved                   bit integer          clock sequence
                                               multiplexed with the
                                               variant

   clock_seq_low          unsigned 8    9      The low field of the         时钟序列的低场
                          bit integer          clock sequence

   node                   unsigned 48   10-15  The spatially unique         空间唯一整数节点标识符
                          bit integer          node identifier

  * UUID 生成算法：
  * 一、利用 802 MAC地址的unique值来保证其唯一性。
  * 二、使用伪随机数生成器
  * 三、使用加密散列和应用程序提供的文本字符串。
\*/


