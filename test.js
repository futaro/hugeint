const test = (expect, actual) => {
  const msg = `expect: ${expect}  actual : ${actual}`
  console.log(expect === actual
    ? `\u001b[32m[OK]   ${msg}\u001b[0m`
    : `\u001b[31m[NG]   ${msg}\u001b[0m`
  )
}

const HugeInt = require('./index')

const hugeInt = new HugeInt('100000')
hugeInt.add('-1')
test('99999', hugeInt.value)


// const hugeInt = new HugeInt()
//
//
// test('0', hugeInt.value)
//
// hugeInt.add('1')
// test('1', hugeInt.value)
//
// hugeInt.add('5')
// test('6', hugeInt.value)
//
// hugeInt.add('7')
// test('13', hugeInt.value)
//
// hugeInt.add('123123')
// test('123136', hugeInt.value)
//
// hugeInt.sub('23136')
// test('100000', hugeInt.value)
//
// hugeInt.sub('1')
// test('99999', hugeInt.value)
//
// hugeInt.sub('99989')
// test('10', hugeInt.value)
//
// hugeInt.mul('10')
// test('100', hugeInt.value)
//
// hugeInt.sub('101')
// test('-1', hugeInt.value)