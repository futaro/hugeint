const DIGIT_LENGTH = 7 // 64

class HugeInt {

  constructor (initial_value = '0') {
    this._v = this._parse(initial_value)
  }

  add (_value) {
    const value = this._parse(_value)
    this._v = this._adder(this._v, value)
    return this
  }

  sub (_value) {
    const value = this._parse(_value)
    value[0] = !value[0]
    this._v = this._adder(this._v, value)
    return this
  }

  mul (_value) {
    const value = this._parse(_value)
    let sums = []
    value.map(v2 => {
      let sum = []
      this._v.reduce((carry, v, idx) => {
        const prod = v * v2 + carry
        sum[idx] = (10 + prod) % 10
        return Math.floor(prod / 10)
      }, 0)
      sums.push(sum)
    })

    let new_v = Array(DIGIT_LENGTH).fill(0)
    sums.map((sum, idx) => {
      Array.prototype.splice.apply(sum, [0, 0].concat(Array(idx).fill(0)))
      new_v = this._adder(new_v, sum)
    })
    this._v = new_v

    return this
  }

  div () {
    // ...
  }

  get value () {
    return this.toString()
  }

  toString () {
    const copy = this._v.slice()
    const sign = copy.shift()
    return (sign ? '' : '-') + copy.reverse().join('').replace(/^0+/, '') || '0'
  }

  _adder (a, b) {
    const sign_a = a.shift(), sign_b = b.shift()
    let new_sign = sign_a

    a.reduce((carry, current, idx) => {
      let a_val = sign_a ? current : current * -1,
        b_val = sign_b ? b[idx] : b[idx] * -1
      let sum = a_val + b_val + carry

      a[idx] = parseInt(sum.toString().charAt(sum.toString().length - 1))

      if (a_val !== 0 && b_val !== 0 && sum !== 0) {
        new_sign = sum >= 0
      }

      console.log(
        `a_val : ${a_val}`,
        `b_val : ${b_val}`,
        `sum : ${sum}`,
        `a[idx] : ${a[idx]}`,
        `carry : ${carry}`
      )

      return Math.floor(Math.abs(sum) / 10)
    }, 0)
    a.unshift(new_sign)
    return a
  }

  _parse (value) {
    if (value.length > DIGIT_LENGTH) {
      throw 'overflow'
    }
    const sign = !!!value.match(/^\-/)
    if (!sign) value = value.replace(/^\-/, '')
    let return_value = Array(DIGIT_LENGTH - 1).fill(0)
    value.split('').reverse().map((v, i) => {
      return_value[i] = parseInt(v)
    })
    return_value.unshift(sign)
    return return_value
  }
}

module.exports = HugeInt