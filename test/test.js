const assert = require('assert')
const ScrollId = require('../dist/ScrollId.min.js')

console.time('test')

assert.throws(() => ScrollId('false'))
assert.throws(() => ScrollId([1,2,3], 'false'))

console.timeEnd('test')
