const DIGIT_LENGTH = 64

class HugeInt {

  constructor (initial_value = '0') {
    this._v = this._parse(initial_value)
  }

  add (_value) {
    const value = this._parse(_value)
    this._v = this._addr(this._v, value)
    return this
  }

  sub (_value) {
    const value = this._parse(_value).map(v => v * -1)
    this._v = this._addr(this._v, value)
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
      new_v = this._addr(new_v, sum)
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
    return this._v.slice().reverse().join('').replace(/^0+/, '') || '0'
  }

  _addr (a, b) {
    a.reduce((carry, v, idx) => {
      const sum = v + b[idx] + carry
      a[idx] = (10 + sum) % 10
      return Math.floor(sum / 10)
    }, 0)
    return a
  }

  _parse (value) {
    if (value.length > DIGIT_LENGTH) {
      throw 'overflow'
    }
    let return_value = Array(DIGIT_LENGTH).fill(0)
    value.split('').reverse().map((v, i) => {
      return_value[i] = parseInt(v)
    })
    return return_value
  }
}

module.exports = HugeInt