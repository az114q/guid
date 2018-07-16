class Bit {
  /**
   * 将一数字转换为二进制，并从右至左截取指定长度，如果位数不够，以0补足
   * */
  static getBitStr(number, length) {
    if (typeof number !== 'number') {
      throw new Error('仅支持数字转换')
    }
    if (length >= 32) {
      throw new Error('超过32位的-1运算会出错,可尝试利用除法该方法再截取部分字段')
    }
    let bitStr = number.toString(2);
    let fillStr = '';
    if (length) {
      bitStr = (number & (Math.pow(2, length) - 1)).toString(2);
      for (let i = 0; i < (length - bitStr.length); i++) {
        fillStr = `${fillStr}0`;
      }
    }
    return fillStr + bitStr;
  }
  static cutNumber(number, lenArr) {
    if (typeof number !== 'number') {
      throw new Error('仅支持数字转换')
    }
    if(lenArr.some(len => len >= 32)){
      throw new Error('超过32位的-1运算会出错,可尝试利用除法该方法再截取部分字段')
    }
    const value = [];
    let left = number
    lenArr.forEach(len => {
      value.unshift(left & (Math.pow(2, len) - 1))
      left = (left / Math.pow(2, len));
    })
    return value
  }
  static cut4BitToHex(number,count){
    const lenArr = [];
    for (let i=0; i < (count || number.toString(2).length / 4); i++){
      lenArr.push(4);
    }
    return Bit.cutNumber(number, lenArr).map(num => {
      return num.toString(16)
    }).join('')
  }
  static getRandomByBitNumber(x){
    if(x<0 || x > 53){
      return NaN
    }
    return Math.random() * Math.pow(2, x) | 0
  }

  constructor(num) {
    this.value = num;
    this.length = this.value.toString(2).length;
  }
  // removeLength: 二进制串右移的长度
  // length: 截取到的二进制串长度
  subBit(removeLength, length) {
    if (length >= 32) {
      throw new Error('超过32位的-1运算会出错,可尝试利用除法该方法再截取部分字段')
    }
    return (this.value / Math.pow(2, removeLength)) & (Math.pow(2, length) - 1);
  }
}

export default Bit;