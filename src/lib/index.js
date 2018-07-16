import BitTool from '../BitTool';

// 1秒 = 100 0000纳秒 = 10000个100纳秒
export const system100ns = 1000000 / 100;

export function transTimestamp(timestamp, nsecond, version){
  // Set the time_low field equal to the least significant 32 bits
  // (bits zero through 31) of the timestamp in the same order of
  // significance.
  // 截取0-15位
  // 0xffff = Math.pow(2, 16) - 1
  const time_low_0 = BitTool.cut4BitToHex((timestamp & 0xffff) + nsecond , 4);
  // 截取16-31位 加上0-15位
  const time_low = BitTool.cut4BitToHex((timestamp / 0x10000) & 0xffff , 4) + time_low_0;

  // Set the time_mid field equal to bits 32 through 47 from the
  // timestamp in the same order of significance.
  // 截取32-47位
  // 0x100000000 = Math.pow(2, 32)
  // 0xffff = Math.pow(2, 16) - 1
  const time_mid = BitTool.cut4BitToHex((timestamp / 0x100000000) & 0xffff , 4);

  // Set the 12 least significant bits (bits zero through 11) of the
  // time_hi_and_version field equal to bits 48 through 59 from the
  // timestamp in the same order of significance.

  // Set the four most significant bits (bits 12 through 15) of the
  // time_hi_and_version field to the 4-bit version number
  // corresponding to the UUID version being created, as shown in the
  // table above.
  // 截取48-59位 并补上版本号
  // 0x1000000000000 = Math.pow(2, 48)
  // 0xfff = Math.pow(2, 12) - 1
  const time_hi_and_version = '' + version + BitTool.cut4BitToHex((timestamp / 0x1000000000000) & 0xfff , 3);

  return {
    time_low,
    time_mid,
    time_hi_and_version
  }
}

export function transClockSequence(clockSequence){
  // Set the clock_seq_low field to the eight least significant bits
  // (bits zero through 7) of the clock sequence in the same order of
  // significance.
  // 截取0-7位
  // 0xff = Math.pow(2, 8) - 1
  const clock_seq_low = BitTool.cut4BitToHex(clockSequence & 0xff, 2);

  // Set the 6 least significant bits (bits zero through 5) of the
  // clock_seq_hi_and_reserved field to the 6 most significant bits
  // (bits 8 through 13) of the clock sequence in the same order of
  // significance.
  // 截取8-13位
  // 0x3f = Math.pow(2, 6) - 1
  // 0x100 = Math.pow(2, 8)
  const hi = (clockSequence / 0x100) & 0x3f;
  // Set the two most significant bits (bits 6 and 7) of the
  // clock_seq_hi_and_reserved to zero and one, respectively.
  // 0x100 = Math(2, 8)
  const clock_seq_hi_and_reserved = BitTool.cut4BitToHex(hi + 0x100, 2);

  return {clock_seq_low, clock_seq_hi_and_reserved}
}

export function transNode(nodeNumber){
  return { node: BitTool.cut4BitToHex(nodeNumber, 12)}
}

export function getTimestamp() {
  return {
    v1: new Date().getTime() - Date.UTC(1582, 9, 15)
  }
}

export function getClockSequence() {
  return {
    v1: BitTool.getRandomByBitNumber(14)
  }
} 

export function getNode() {
  return {
    v1: BitTool.getRandomByBitNumber(48)
  }
  
}