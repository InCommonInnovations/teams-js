(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("microsoftTeams", [], factory);
	else if(typeof exports === 'object')
		exports["microsoftTeams"] = factory();
	else
		root["microsoftTeams"] = factory();
})(typeof self !== 'undefined' ? self : this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 991:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 48:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(991)
var ieee754 = __webpack_require__(318)

exports.hp = Buffer
__webpack_unused_export__ = SlowBuffer
exports.IS = 50

var K_MAX_LENGTH = 0x7fffffff
__webpack_unused_export__ = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.IS
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}


/***/ }),

/***/ 124:
/***/ ((module, exports, __webpack_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	let m;

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __webpack_require__(891)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __webpack_require__(250);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 318:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 250:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ActionObjectType: () => (/* reexport */ ActionObjectType),
  AppId: () => (/* reexport */ AppId),
  ChannelType: () => (/* reexport */ ChannelType),
  ChildAppWindow: () => (/* reexport */ ChildAppWindow),
  DialogDimension: () => (/* reexport */ DialogDimension),
  EmailAddress: () => (/* reexport */ EmailAddress),
  ErrorCode: () => (/* reexport */ ErrorCode),
  FileOpenPreference: () => (/* reexport */ FileOpenPreference),
  FrameContexts: () => (/* reexport */ FrameContexts),
  HostClientType: () => (/* reexport */ HostClientType),
  HostName: () => (/* reexport */ HostName),
  LiveShareHost: () => (/* reexport */ LiveShareHost),
  NotificationTypes: () => (/* reexport */ NotificationTypes),
  ParentAppWindow: () => (/* reexport */ ParentAppWindow),
  SecondaryM365ContentIdName: () => (/* reexport */ SecondaryM365ContentIdName),
  TaskModuleDimension: () => (/* reexport */ TaskModuleDimension),
  TeamType: () => (/* reexport */ TeamType),
  UserSettingTypes: () => (/* reexport */ UserSettingTypes),
  UserTeamRole: () => (/* reexport */ UserTeamRole),
  ViewerActionTypes: () => (/* reexport */ ViewerActionTypes),
  app: () => (/* reexport */ app),
  appEntity: () => (/* reexport */ appEntity),
  appInitialization: () => (/* reexport */ appInitialization),
  appInstallDialog: () => (/* reexport */ appInstallDialog),
  authentication: () => (/* reexport */ authentication),
  barCode: () => (/* reexport */ barCode),
  calendar: () => (/* reexport */ calendar),
  call: () => (/* reexport */ call),
  chat: () => (/* reexport */ chat),
  clipboard: () => (/* reexport */ clipboard),
  conversations: () => (/* reexport */ conversations),
  copilot: () => (/* reexport */ copilot),
  dialog: () => (/* reexport */ dialog),
  enablePrintCapability: () => (/* reexport */ enablePrintCapability),
  executeDeepLink: () => (/* reexport */ executeDeepLink),
  externalAppAuthentication: () => (/* reexport */ externalAppAuthentication),
  externalAppAuthenticationForCEA: () => (/* reexport */ externalAppAuthenticationForCEA),
  externalAppCardActions: () => (/* reexport */ externalAppCardActions),
  externalAppCardActionsForCEA: () => (/* reexport */ externalAppCardActionsForCEA),
  externalAppCommands: () => (/* reexport */ externalAppCommands),
  files: () => (/* reexport */ files),
  geoLocation: () => (/* reexport */ geoLocation),
  getAdaptiveCardSchemaVersion: () => (/* reexport */ getAdaptiveCardSchemaVersion),
  getContext: () => (/* reexport */ getContext),
  getMruTabInstances: () => (/* reexport */ getMruTabInstances),
  getTabInstances: () => (/* reexport */ getTabInstances),
  hostEntity: () => (/* reexport */ hostEntity),
  initialize: () => (/* reexport */ initialize),
  initializeWithFrameContext: () => (/* reexport */ initializeWithFrameContext),
  liveShare: () => (/* reexport */ liveShare),
  location: () => (/* reexport */ location_location),
  logs: () => (/* reexport */ logs),
  mail: () => (/* reexport */ mail),
  marketplace: () => (/* reexport */ marketplace),
  media: () => (/* reexport */ media),
  meeting: () => (/* reexport */ meeting),
  meetingRoom: () => (/* reexport */ meetingRoom),
  menus: () => (/* reexport */ menus),
  messageChannels: () => (/* reexport */ messageChannels),
  monetization: () => (/* reexport */ monetization),
  navigateBack: () => (/* reexport */ navigateBack),
  navigateCrossDomain: () => (/* reexport */ navigateCrossDomain),
  navigateToTab: () => (/* reexport */ navigateToTab),
  nestedAppAuth: () => (/* reexport */ nestedAppAuth),
  notifications: () => (/* reexport */ notifications),
  openFilePreview: () => (/* reexport */ openFilePreview),
  otherAppStateChange: () => (/* reexport */ otherAppStateChange),
  pages: () => (/* reexport */ pages),
  people: () => (/* reexport */ people),
  print: () => (/* reexport */ print),
  profile: () => (/* reexport */ profile),
  registerAppButtonClickHandler: () => (/* reexport */ registerAppButtonClickHandler),
  registerAppButtonHoverEnterHandler: () => (/* reexport */ registerAppButtonHoverEnterHandler),
  registerAppButtonHoverLeaveHandler: () => (/* reexport */ registerAppButtonHoverLeaveHandler),
  registerBackButtonHandler: () => (/* reexport */ registerBackButtonHandler),
  registerBeforeUnloadHandler: () => (/* reexport */ registerBeforeUnloadHandler),
  registerChangeSettingsHandler: () => (/* reexport */ registerChangeSettingsHandler),
  registerCustomHandler: () => (/* reexport */ registerCustomHandler),
  registerFocusEnterHandler: () => (/* reexport */ registerFocusEnterHandler),
  registerFullScreenHandler: () => (/* reexport */ registerFullScreenHandler),
  registerOnLoadHandler: () => (/* reexport */ registerOnLoadHandler),
  registerOnThemeChangeHandler: () => (/* reexport */ publicAPIs_registerOnThemeChangeHandler),
  registerUserSettingsChangeHandler: () => (/* reexport */ registerUserSettingsChangeHandler),
  remoteCamera: () => (/* reexport */ remoteCamera),
  returnFocus: () => (/* reexport */ returnFocus),
  search: () => (/* reexport */ search),
  secondaryBrowser: () => (/* reexport */ secondaryBrowser),
  sendCustomEvent: () => (/* reexport */ sendCustomEvent),
  sendCustomMessage: () => (/* reexport */ sendCustomMessage),
  setFrameContext: () => (/* reexport */ setFrameContext),
  settings: () => (/* reexport */ settings),
  shareDeepLink: () => (/* reexport */ shareDeepLink),
  sharing: () => (/* reexport */ sharing),
  stageView: () => (/* reexport */ stageView),
  tasks: () => (/* reexport */ tasks),
  teams: () => (/* reexport */ teams),
  teamsCore: () => (/* reexport */ teamsCore),
  thirdPartyCloudStorage: () => (/* reexport */ thirdPartyCloudStorage),
  uploadCustomApp: () => (/* reexport */ uploadCustomApp),
  version: () => (/* reexport */ version),
  videoEffects: () => (/* reexport */ videoEffects),
  videoEffectsEx: () => (/* reexport */ videoEffectsEx),
  visualMedia: () => (/* reexport */ visualMedia),
  webStorage: () => (/* reexport */ webStorage)
});

// EXTERNAL MODULE: ../../node_modules/debug/src/browser.js
var browser = __webpack_require__(124);
// EXTERNAL MODULE: ../../node_modules/buffer/index.js
var buffer = __webpack_require__(48);
;// ./src/public/interfaces.ts
/* eslint-disable @typescript-eslint/no-explicit-any*/
/**
 * Allowed user file open preferences
 */
var FileOpenPreference;
(function (FileOpenPreference) {
    /** Indicates that the user should be prompted to open the file in inline. */
    FileOpenPreference["Inline"] = "inline";
    /** Indicates that the user should be prompted to open the file in the native desktop application associated with the file type. */
    FileOpenPreference["Desktop"] = "desktop";
    /** Indicates that the user should be prompted to open the file in a web browser. */
    FileOpenPreference["Web"] = "web";
})(FileOpenPreference || (FileOpenPreference = {}));
/**
 * Types of Action Objects
 *
 * @beta
 */
var ActionObjectType;
(function (ActionObjectType) {
    /** Represents content within a Microsoft 365 application. */
    ActionObjectType["M365Content"] = "m365content";
})(ActionObjectType || (ActionObjectType = {}));
/**
 * These correspond with field names in the MSGraph.
 * See [commonly accessed resources](https://learn.microsoft.com/graph/api/resources/onedrive?view=graph-rest-1.0#commonly-accessed-resources).
 * @beta
 */
var SecondaryM365ContentIdName;
(function (SecondaryM365ContentIdName) {
    /** OneDrive ID */
    SecondaryM365ContentIdName["DriveId"] = "driveId";
    /** Teams Group ID */
    SecondaryM365ContentIdName["GroupId"] = "groupId";
    /** SharePoint ID */
    SecondaryM365ContentIdName["SiteId"] = "siteId";
    /** User ID */
    SecondaryM365ContentIdName["UserId"] = "userId";
})(SecondaryM365ContentIdName || (SecondaryM365ContentIdName = {}));
function isSdkError(err) {
    return (err === null || err === void 0 ? void 0 : err.errorCode) !== undefined;
}
/** Error codes used to identify different types of errors that can occur while developing apps. */
var ErrorCode;
(function (ErrorCode) {
    /**
     * API not supported in the current platform.
     */
    ErrorCode[ErrorCode["NOT_SUPPORTED_ON_PLATFORM"] = 100] = "NOT_SUPPORTED_ON_PLATFORM";
    /**
     * Internal error encountered while performing the required operation.
     */
    ErrorCode[ErrorCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    /**
     * API is not supported in the current context
     */
    ErrorCode[ErrorCode["NOT_SUPPORTED_IN_CURRENT_CONTEXT"] = 501] = "NOT_SUPPORTED_IN_CURRENT_CONTEXT";
    /**
    Permissions denied by user
    */
    ErrorCode[ErrorCode["PERMISSION_DENIED"] = 1000] = "PERMISSION_DENIED";
    /**
     * Network issue
     */
    ErrorCode[ErrorCode["NETWORK_ERROR"] = 2000] = "NETWORK_ERROR";
    /**
     * Underlying hardware doesn't support the capability
     */
    ErrorCode[ErrorCode["NO_HW_SUPPORT"] = 3000] = "NO_HW_SUPPORT";
    /**
     * One or more arguments are invalid
     */
    ErrorCode[ErrorCode["INVALID_ARGUMENTS"] = 4000] = "INVALID_ARGUMENTS";
    /**
     * User is not authorized for this operation
     */
    ErrorCode[ErrorCode["UNAUTHORIZED_USER_OPERATION"] = 5000] = "UNAUTHORIZED_USER_OPERATION";
    /**
     * Could not complete the operation due to insufficient resources
     */
    ErrorCode[ErrorCode["INSUFFICIENT_RESOURCES"] = 6000] = "INSUFFICIENT_RESOURCES";
    /**
     * Platform throttled the request because of API was invoked too frequently
     */
    ErrorCode[ErrorCode["THROTTLE"] = 7000] = "THROTTLE";
    /**
     * User aborted the operation
     */
    ErrorCode[ErrorCode["USER_ABORT"] = 8000] = "USER_ABORT";
    /**
     * Could not complete the operation in the given time interval
     */
    ErrorCode[ErrorCode["OPERATION_TIMED_OUT"] = 8001] = "OPERATION_TIMED_OUT";
    /**
     * Platform code is old and doesn't implement this API
     */
    ErrorCode[ErrorCode["OLD_PLATFORM"] = 9000] = "OLD_PLATFORM";
    /**
     * The file specified was not found on the given location
     */
    ErrorCode[ErrorCode["FILE_NOT_FOUND"] = 404] = "FILE_NOT_FOUND";
    /**
     * The return value is too big and has exceeded our size boundries
     */
    ErrorCode[ErrorCode["SIZE_EXCEEDED"] = 10000] = "SIZE_EXCEEDED";
})(ErrorCode || (ErrorCode = {}));
/** @hidden */
var DevicePermission;
(function (DevicePermission) {
    DevicePermission["GeoLocation"] = "geolocation";
    DevicePermission["Media"] = "media";
})(DevicePermission || (DevicePermission = {}));
/**
 * @hidden
 *
 * @beta
 */
var Cohort;
(function (Cohort) {
    Cohort["BCAIS"] = "bcais";
    Cohort["BCWAF"] = "bcwaf";
    Cohort["BCWBF"] = "bcwbf";
})(Cohort || (Cohort = {}));
/**
 * @hidden
 *
 * @beta
 */
var Persona;
(function (Persona) {
    /**
     * User has a faculty license
     */
    Persona["Faculty"] = "faculty";
    /**
     * User has a student license
     */
    Persona["Student"] = "student";
    /**
     * When user is not a faculty or student
     */
    Persona["Other"] = "other";
})(Persona || (Persona = {}));
/**
 * @hidden
 *
 * @beta
 */
// https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0#legalagegroupclassification-values
var LegalAgeGroupClassification;
(function (LegalAgeGroupClassification) {
    /**
     * The user is considered an adult based on the age-related regulations of their country or region.
     */
    LegalAgeGroupClassification["Adult"] = "adult";
    /**
     * The user is a minor but is from a country or region that has no age-related regulations.
     */
    LegalAgeGroupClassification["MinorNoParentalConsentRequired"] = "minorNoParentalConsentRequired";
    /**
     * Reserved for future use
     */
    LegalAgeGroupClassification["MinorWithoutParentalConsent"] = "minorWithoutParentalConsent";
    /**
     * The user is considered a minor based on the age-related regulations of their country or region, and the administrator
     * of the account obtained appropriate consent from a parent or guardian.
     */
    LegalAgeGroupClassification["MinorWithParentalConsent"] = "minorWithParentalConsent";
    /**
     * The user is from a country or region that has additional age-related regulations, such as the United States,
     * United Kingdom, European Union, or South Korea, and the user's age is between a minor and an adult age
     * (as stipulated based on country or region). Generally, this means that teenagers are considered as notAdult in regulated countries.
     */
    LegalAgeGroupClassification["NonAdult"] = "nonAdult";
})(LegalAgeGroupClassification || (LegalAgeGroupClassification = {}));
/**
 * @hidden
 *
 * @beta
 */
var EduType;
(function (EduType) {
    /**
     * User is from a tenant labeled as “HigherEd”
     */
    EduType["HigherEducation"] = "higherEducation";
    /**
     * User is from a tenant labeled as “K12”
     */
    EduType["K12"] = "k12";
    /**
     * User is from a tenant labeled as “Others” (e.g. research institutions)
     */
    EduType["Other"] = "other";
})(EduType || (EduType = {}));
/**
 * Currently supported Mime type
 */
var ClipboardSupportedMimeType;
(function (ClipboardSupportedMimeType) {
    ClipboardSupportedMimeType["TextPlain"] = "text/plain";
    ClipboardSupportedMimeType["TextHtml"] = "text/html";
    ClipboardSupportedMimeType["ImagePNG"] = "image/png";
    ClipboardSupportedMimeType["ImageJPEG"] = "image/jpeg";
})(ClipboardSupportedMimeType || (ClipboardSupportedMimeType = {}));

;// ./src/public/constants.ts
/** HostClientType represents the different client platforms on which host can be run. */
var HostClientType;
(function (HostClientType) {
    /** Represents the desktop client of host, which is installed on a user's computer and runs as a standalone application. */
    HostClientType["desktop"] = "desktop";
    /** Represents the web-based client of host, which runs in a web browser. */
    HostClientType["web"] = "web";
    /** Represents the Android mobile client of host, which runs on Android devices such as smartphones and tablets. */
    HostClientType["android"] = "android";
    /** Represents the iOS mobile client of host, which runs on iOS devices such as iPhones. */
    HostClientType["ios"] = "ios";
    /** Represents the iPadOS client of host, which runs on iOS devices such as iPads. */
    HostClientType["ipados"] = "ipados";
    /** The host is running on a macOS client, which runs on devices such as MacBooks. */
    HostClientType["macos"] = "macos";
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link teamsRoomsWindows} instead.
     */
    HostClientType["rigel"] = "rigel";
    /** Represents the client of host, which runs on surface hub devices. */
    HostClientType["surfaceHub"] = "surfaceHub";
    /** Represents the client of host, which runs on Teams Rooms on Windows devices. More information on Microsoft Teams Rooms on Windows can be found [Microsoft Teams Rooms (Windows)](https://support.microsoft.com/office/microsoft-teams-rooms-windows-help-e667f40e-5aab-40c1-bd68-611fe0002ba2)*/
    HostClientType["teamsRoomsWindows"] = "teamsRoomsWindows";
    /** Represents the client of host, which runs on Teams Rooms on Android devices. More information on Microsoft Teams Rooms on Android can be found [Microsoft Teams Rooms (Android)].(https://support.microsoft.com/office/get-started-with-teams-rooms-on-android-68517298-d513-46be-8d6d-d41db5e6b4b2)*/
    HostClientType["teamsRoomsAndroid"] = "teamsRoomsAndroid";
    /** Represents the client of host, which runs on Teams phones. More information can be found [Microsoft Teams Phones](https://support.microsoft.com/office/get-started-with-teams-phones-694ca17d-3ecf-40ca-b45e-d21b2c442412) */
    HostClientType["teamsPhones"] = "teamsPhones";
    /** Represents the client of host, which runs on Teams displays devices. More information can be found [Microsoft Teams Displays](https://support.microsoft.com/office/get-started-with-teams-displays-ff299825-7f13-4528-96c2-1d3437e6d4e6) */
    HostClientType["teamsDisplays"] = "teamsDisplays";
})(HostClientType || (HostClientType = {}));
/** HostName indicates the possible hosts for your application. */
var HostName;
(function (HostName) {
    /**
     * Office.com and Office Windows App
     */
    HostName["office"] = "Office";
    /**
     * For "desktop" specifically, this refers to the new, pre-release version of Outlook for Windows.
     * Also used on other platforms that map to a single Outlook client.
     */
    HostName["outlook"] = "Outlook";
    /**
     * Outlook for Windows: the classic, native, desktop client
     */
    HostName["outlookWin32"] = "OutlookWin32";
    /**
     * Microsoft-internal test Host
     */
    HostName["orange"] = "Orange";
    /**
     * Microsoft connected workplace platform
     */
    HostName["places"] = "Places";
    /**
     * Teams
     */
    HostName["teams"] = "Teams";
    /**
     * Modern Teams
     */
    HostName["teamsModern"] = "TeamsModern";
})(HostName || (HostName = {}));
/**
 * FrameContexts provides information about the context in which the app is running within the host.
 * Developers can use FrameContexts to determine how their app should behave in different contexts,
 * and can use the information provided by the context to adapt the app to the user's needs.
 *
 * @example
 * If your app is running in the "settings" context, you should be displaying your apps configuration page.
 * If the app is running in the content context, the developer may want to display information relevant to
 * the content the user is currently viewing.
 */
var FrameContexts;
(function (FrameContexts) {
    /**
     * App's frame context from where settings page can be accessed.
     * See [how to create a configuration page.]( https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/create-tab-pages/configuration-page?tabs=teamsjs-v2)
     */
    FrameContexts["settings"] = "settings";
    /** The default context for the app where all the content of the app is displayed. */
    FrameContexts["content"] = "content";
    /** Frame context used when app is running in the authentication window launched by calling {@link authentication.authenticate} */
    FrameContexts["authentication"] = "authentication";
    /** The page shown when the user uninstalls the app. */
    FrameContexts["remove"] = "remove";
    /** A task module is a pop-up window that can be used to display a form, a dialog, or other interactive content within the host. */
    FrameContexts["task"] = "task";
    /** The side panel is a persistent panel that is displayed on the right side of the host and can be used to display content or UI that is relevant to the current page or tab. */
    FrameContexts["sidePanel"] = "sidePanel";
    /** The stage is a large area that is displayed at the center of the host and can be used to display content or UI that requires a lot of space, such as a video player or a document editor. */
    FrameContexts["stage"] = "stage";
    /** App's frame context from where meetingStage can be accessed in a meeting session, which is the primary area where video and presentation content is displayed during a meeting. */
    FrameContexts["meetingStage"] = "meetingStage";
})(FrameContexts || (FrameContexts = {}));
/**
 * Indicates the team type, currently used to distinguish between different team
 * types in Office 365 for Education (team types 1, 2, 3, and 4).
 */
var TeamType;
(function (TeamType) {
    /** Represents a standard or classic team in host that is designed for ongoing collaboration and communication among a group of people. */
    TeamType[TeamType["Standard"] = 0] = "Standard";
    /**  Represents an educational team in host that is designed for classroom collaboration and communication among students and teachers. */
    TeamType[TeamType["Edu"] = 1] = "Edu";
    /** Represents a class team in host that is designed for classroom collaboration and communication among students and teachers in a structured environment. */
    TeamType[TeamType["Class"] = 2] = "Class";
    /** Represents a professional learning community (PLC) team in host that is designed for educators to collaborate and share resources and best practices. */
    TeamType[TeamType["Plc"] = 3] = "Plc";
    /** Represents a staff team in host that is designed for staff collaboration and communication among staff members.*/
    TeamType[TeamType["Staff"] = 4] = "Staff";
})(TeamType || (TeamType = {}));
/**
 * Indicates the various types of roles of a user in a team.
 */
var UserTeamRole;
(function (UserTeamRole) {
    /** Represents that the user is an owner or administrator of the team. */
    UserTeamRole[UserTeamRole["Admin"] = 0] = "Admin";
    /** Represents that the user is a standard member of the team. */
    UserTeamRole[UserTeamRole["User"] = 1] = "User";
    /** Represents that the user does not have any role in the team. */
    UserTeamRole[UserTeamRole["Guest"] = 2] = "Guest";
})(UserTeamRole || (UserTeamRole = {}));
/**
 * Dialog module dimension enum
 */
var DialogDimension;
(function (DialogDimension) {
    /** Represents a large-sized dialog box, which is typically used for displaying large amounts of content or complex workflows that require more space. */
    DialogDimension["Large"] = "large";
    /** Represents a medium-sized dialog box, which is typically used for displaying moderate amounts of content or workflows that require less space. */
    DialogDimension["Medium"] = "medium";
    /** Represents a small-sized dialog box, which is typically used for displaying simple messages or workflows that require minimal space.*/
    DialogDimension["Small"] = "small";
})(DialogDimension || (DialogDimension = {}));

/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link DialogDimension} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var TaskModuleDimension = DialogDimension;
/**
 * The type of the channel with which the content is associated.
 */
var ChannelType;
(function (ChannelType) {
    /** The default channel type. Type of channel is used for general collaboration and communication within a team. */
    ChannelType["Regular"] = "Regular";
    /** Type of channel is used for sensitive or confidential communication within a team and is only accessible to members of the channel. */
    ChannelType["Private"] = "Private";
    /** Type of channel is used for collaboration between multiple teams or groups and is accessible to members of all the teams or groups. */
    ChannelType["Shared"] = "Shared";
})(ChannelType || (ChannelType = {}));
/** An error object indicating that the requested operation or feature is not supported on the current platform or device.
 * @typedef {Object} SdkError
 */
const errorNotSupportedOnPlatform = {
    errorCode: ErrorCode.NOT_SUPPORTED_ON_PLATFORM,
};
/**
 * @hidden
 *
 * Minimum Adaptive Card version supported by the host.
 */
const minAdaptiveCardVersion = { majorVersion: 1, minorVersion: 5 };
/**
 * @hidden
 *
 * Adaptive Card version supported by the Teams v1 client.
 */
const teamsMinAdaptiveCardVersion = {
    adaptiveCardSchemaVersion: { majorVersion: 1, minorVersion: 5 },
};
/**
 * @hidden
 * An error object indicates that the image count from visualMedia.image API is invalid.
 *
 * @beta
 */
const errorInvalidCount = new Error('Invalid input count: Must supply a valid image count (limit of 10).');
/**
 * @hidden
 * An error object indicates that the response from the visualMedia.image API is invalid.
 *
 * @beta
 */
const errorInvalidResponse = new Error('Invalid response: Received more images than the specified max limit in the response.');

;// ./src/internal/utils.ts
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */


function generateUUID() {
    const hexDigits = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-';
        }
        else if (i === 14) {
            uuid += '4'; // The version number (4 means random UUID)
        }
        else if (i === 19) {
            uuid += hexDigits.substr((Math.random() * 4) | (0 + 8), 1); // The variant part
        }
        else {
            uuid += hexDigits[Math.floor(Math.random() * 16)];
        }
    }
    return uuid;
}
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function getGenericOnCompleteHandler(errorMessage) {
    return (success, reason) => {
        if (!success) {
            throw new Error(errorMessage ? errorMessage : reason);
        }
    };
}
/**
 * @hidden
 * Compares SDK versions.
 *
 * @param v1 - first version
 * @param v2 - second version
 * @returns NaN in case inputs are not in right format
 *         -1 if v1 < v2
 *          1 if v1 > v2
 *          0 otherwise
 * @example
 *    compareSDKVersions('1.2', '1.2.0') returns 0
 *    compareSDKVersions('1.2a', '1.2b') returns NaN
 *    compareSDKVersions('1.2', '1.3') returns -1
 *    compareSDKVersions('2.0', '1.3.2') returns 1
 *    compareSDKVersions('2.0', 2.0) returns NaN
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function compareSDKVersions(v1, v2) {
    if (typeof v1 !== 'string' || typeof v2 !== 'string') {
        return NaN;
    }
    const v1parts = v1.split('.');
    const v2parts = v2.split('.');
    function isValidPart(x) {
        // input has to have one or more digits
        // For ex - returns true for '11', false for '1a1', false for 'a', false for '2b'
        return /^\d+$/.test(x);
    }
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }
    // Make length of both parts equal
    while (v1parts.length < v2parts.length) {
        v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
        v2parts.push('0');
    }
    for (let i = 0; i < v1parts.length; ++i) {
        if (Number(v1parts[i]) == Number(v2parts[i])) {
            continue;
        }
        else if (Number(v1parts[i]) > Number(v2parts[i])) {
            return 1;
        }
        else {
            return -1;
        }
    }
    return 0;
}
/**
 * @hidden
 * Generates a GUID
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function generateGUID() {
    return generateUUID();
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function utils_deepFreeze(obj) {
    Object.keys(obj).forEach((prop) => {
        if (obj[prop] === null || obj[prop] === undefined) {
            return;
        }
        if (typeof obj[prop] === 'object') {
            utils_deepFreeze(obj[prop]);
        }
    });
    return Object.freeze(obj);
}
/**
 * This utility function is used when the result of the promise is same as the result in the callback.
 * @param funcHelper
 * @param callback
 * @param args
 * @returns
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function callCallbackWithErrorOrResultFromPromiseAndReturnPromise(funcHelper, callback, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
...args) {
    const p = funcHelper(...args);
    p.then((result) => {
        if (callback) {
            callback(undefined, result);
        }
    }).catch((e) => {
        if (callback) {
            callback(e);
        }
    });
    return p;
}
/**
 * This utility function is used when the return type of the promise is usually void and
 * the result in the callback is a boolean type (true for success and false for error)
 * @param funcHelper
 * @param callback
 * @param args
 * @returns
 * @internal
 * Limited to Microsoft-internal use
 */
function callCallbackWithErrorOrBooleanFromPromiseAndReturnPromise(funcHelper, callback, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
...args) {
    const p = funcHelper(...args);
    p.then(() => {
        if (callback) {
            callback(undefined, true);
        }
    }).catch((e) => {
        if (callback) {
            callback(e, false);
        }
    });
    return p;
}
/**
 * This utility function is called when the callback has only Error/SdkError as the primary argument.
 * @param funcHelper
 * @param callback
 * @param args
 * @returns
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function callCallbackWithSdkErrorFromPromiseAndReturnPromise(funcHelper, callback, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
...args) {
    const p = funcHelper(...args);
    p.then(() => {
        if (callback) {
            callback(null);
        }
    }).catch((e) => {
        if (callback) {
            callback(e);
        }
    });
    return p;
}
/**
 * This utility function is used when the result of the promise is same as the result in the callback.
 * @param funcHelper
 * @param callback
 * @param args
 * @returns
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function callCallbackWithErrorOrResultOrNullFromPromiseAndReturnPromise(funcHelper, callback, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
...args) {
    const p = funcHelper(...args);
    p.then((result) => {
        if (callback) {
            callback(null, result);
        }
    }).catch((e) => {
        if (callback) {
            callback(e, null);
        }
    });
    return p;
}
/**
 * A helper function to add a timeout to an asynchronous operation.
 *
 * @param action Action to wrap the timeout around
 * @param timeoutInMs Timeout period in milliseconds
 * @param timeoutError Error to reject the promise with if timeout elapses before the action completed
 * @returns A promise which resolves to the result of provided action or rejects with a provided timeout error
 * if the initial action didn't complete within provided timeout.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function runWithTimeout(action, timeoutInMs, timeoutError) {
    return new Promise((resolve, reject) => {
        const timeoutHandle = setTimeout(reject, timeoutInMs, timeoutError);
        action()
            .then((result) => {
            clearTimeout(timeoutHandle);
            resolve(result);
        })
            .catch((error) => {
            clearTimeout(timeoutHandle);
            reject(error);
        });
    });
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function createTeamsAppLink(params) {
    const url = new URL('https://teams.microsoft.com/l/entity/' +
        encodeURIComponent(params.appId.toString()) +
        '/' +
        encodeURIComponent(params.pageId));
    if (params.webUrl) {
        url.searchParams.append('webUrl', params.webUrl.toString());
    }
    if (params.chatId || params.channelId || params.subPageId) {
        url.searchParams.append('context', JSON.stringify({ chatId: params.chatId, channelId: params.channelId, subEntityId: params.subPageId }));
    }
    return url.toString();
}
/**
 * @hidden
 * Checks if the Adaptive Card schema version is supported by the host.
 * @param hostAdaptiveCardSchemaVersion Host's supported Adaptive Card version in the runtime.
 *
 * @returns true if the Adaptive Card Version is not supported and false if it is supported.
 */
function isHostAdaptiveCardSchemaVersionUnsupported(hostAdaptiveCardSchemaVersion) {
    const versionCheck = compareSDKVersions(`${hostAdaptiveCardSchemaVersion.majorVersion}.${hostAdaptiveCardSchemaVersion.minorVersion}`, `${minAdaptiveCardVersion.majorVersion}.${minAdaptiveCardVersion.minorVersion}`);
    if (versionCheck >= 0) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * @hidden
 * Checks if a URL is a HTTPS protocol based URL.
 * @param url URL to be validated.
 *
 * @returns true if the URL is an https URL.
 */
function isValidHttpsURL(url) {
    return url.protocol === 'https:';
}
/**
 * Convert base64 string to blob
 * @param base64Data string respresenting the content
 * @param contentType Mimetype
 * @returns Promise
 */
function base64ToBlob(mimeType, base64String) {
    return new Promise((resolve, reject) => {
        if (!mimeType) {
            reject('MimeType cannot be null or empty.');
        }
        if (!base64String) {
            reject('Base64 string cannot be null or empty.');
        }
        /**
         * For images we need to convert binary data to image to achieve that:
         *   1. A new Uint8Array is created with a length equal to the length of byteCharacters.
         *      The byteCharacters is a string representing the base64 data decoded using atob.
         *   2. Then loop iterates over each character in the byteCharacters string and assigns the
         *      corresponding character code to the corresponding index in the byteArray. The purpose
         *      of this loop is to convert the base64 string to a binary representation, as the Blob
         *      constructor expects binary data.
         */
        if (mimeType.startsWith('image/')) {
            const byteCharacters = atob(base64String);
            const byteArray = new Uint8Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            resolve(new Blob([byteArray], { type: mimeType }));
        }
        const byteCharacters = buffer/* Buffer */.hp.from(base64String, 'base64').toString();
        resolve(new Blob([byteCharacters], { type: mimeType }));
    });
}
/**
 * Converts blob to base64 string.
 * @param blob Blob to convert to base64 string.
 */
function getBase64StringFromBlob(blob) {
    return new Promise((resolve, reject) => {
        if (blob.size === 0) {
            reject(new Error('Blob cannot be empty.'));
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result.toString().split(',')[1]);
            }
            else {
                reject(new Error('Failed to read the blob'));
            }
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsDataURL(blob);
    });
}
/**
 *  Returns an SSR safe reference to the window object
 * @returns Window object reference
 */
function ssrSafeWindow() {
    if (!inServerSideRenderingEnvironment()) {
        return window;
    }
    else {
        // This should NEVER actually be written.
        // If you EVER see this error in ANY log file, something has gone horribly wrong and a bug needs to be filed.
        throw new Error('window object undefined at SSR check');
    }
}
/**
 * Checks if running in a Server Side Environment
 * @returns True if running in a Server Side Environment
 */
function inServerSideRenderingEnvironment() {
    return typeof window === 'undefined';
}
/**
 * @param id The id to validate
 * @param errorToThrow Customized error to throw if the id is not valid
 *
 * @throws Error if id is not valid
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateId(id, errorToThrow) {
    if (hasScriptTags(id) || !isIdLengthValid(id) || !isOpaque(id)) {
        throw errorToThrow || new Error('id is not valid.');
    }
}
function validateUrl(url, errorToThrow) {
    const urlString = url.toString().toLocaleLowerCase();
    if (hasScriptTags(urlString)) {
        throw errorToThrow || new Error('Invalid Url');
    }
    if (urlString.length > 2048) {
        throw errorToThrow || new Error('Url exceeds the maximum size of 2048 characters');
    }
    if (!isValidHttpsURL(url)) {
        throw errorToThrow || new Error('Url should be a valid https url');
    }
}
/**
 * This function takes in a string that represents a full or relative path and returns a
 * fully qualified URL object.
 *
 * Currently this is accomplished by assigning the input string to an a tag and then retrieving
 * the a tag's href value. A side effect of doing this is that the string becomes a fully qualified
 * URL. This is probably not how I would choose to do this, but in order to not unintentionally
 * break something I've preseved the functionality here and just isolated the code to make it
 * easier to mock.
 *
 * @example
 *    `fullyQualifyUrlString('https://example.com')` returns `new URL('https://example.com')`
 *    `fullyQualifyUrlString('helloWorld')` returns `new URL('https://example.com/helloWorld')`
 *    `fullyQualifyUrlString('hello%20World')` returns `new URL('https://example.com/hello%20World')`
 *
 * @param fullOrRelativePath A string representing a full or relative URL.
 * @returns A fully qualified URL representing the input string.
 */
function fullyQualifyUrlString(fullOrRelativePath) {
    const link = document.createElement('a');
    link.href = fullOrRelativePath;
    return new URL(link.href);
}
/**
 * Detects if there are any script tags in a given string, even if they are Uri encoded or encoded as HTML entities.
 * @param input string to test for script tags
 * @returns true if the input string contains a script tag, false otherwise
 */
function hasScriptTags(input) {
    const openingScriptTagRegex = /<script[^>]*>|&lt;script[^&]*&gt;|%3Cscript[^%]*%3E/gi;
    const closingScriptTagRegex = /<\/script[^>]*>|&lt;\/script[^&]*&gt;|%3C\/script[^%]*%3E/gi;
    const openingOrClosingScriptTagRegex = new RegExp(`${openingScriptTagRegex.source}|${closingScriptTagRegex.source}`, 'gi');
    return openingOrClosingScriptTagRegex.test(input);
}
function isIdLengthValid(id) {
    return id.length < 256 && id.length > 4;
}
function isOpaque(id) {
    for (let i = 0; i < id.length; i++) {
        const charCode = id.charCodeAt(i);
        if (charCode < 32 || charCode > 126) {
            return false;
        }
    }
    return true;
}
/**
 * @param id The ID to validate against the UUID format
 * @throws Error if ID is not a valid UUID
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateUuid(id) {
    if (!id) {
        throw new Error('id must not be empty');
    }
    if (isValidUUID(id) === false) {
        throw new Error('id must be a valid UUID');
    }
}

;// ./src/internal/uuidObject.ts

/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * UUID object
 */
class UUID {
    constructor(uuid = generateGUID()) {
        this.uuid = uuid;
        validateUuid(uuid);
    }
    toString() {
        return this.uuid;
    }
}

;// ./src/internal/telemetry.ts


// Each teamsjs instance gets a unique identifier that will be prepended to every log statement
const teamsJsInstanceIdentifier = new UUID();
// Every log statement will get prepended with the teamsJsInstanceIdentifier and a timestamp
const originalFormatArgsFunction = browser.debug.formatArgs;
browser.debug.formatArgs = function (args) {
    args[0] = `(${new Date().toISOString()}): ${args[0]} [${teamsJsInstanceIdentifier.toString()}]`;
    originalFormatArgsFunction.call(this, args);
};
const topLevelLogger = (0,browser.debug)('teamsJs');
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * Returns a logger for a given namespace, within the pre-defined top-level teamsJs namespace
 */
function getLogger(namespace) {
    return topLevelLogger.extend(namespace);
}
/**
 * @hidden
 * Creates a string tag for labeling apiVersionTag, which is used for API function call to create message request
 * sent to host(s).
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function getApiVersionTag(apiVersionNumber, functionName) {
    return `${apiVersionNumber}_${functionName}`;
}
/**
 * @hidden
 * Check if apiVersionTag developer sends follows the pattern starting with a lowercase 'v', then
 * followed by one or more digits, then concatenated with underscore and some characters to indicate api name.
 * For example, 'v2_app.getContext'. If yes, return true. Otherwise, return false.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function isFollowingApiVersionTagFormat(apiVersionTag) {
    const pattern = /^v\d+_[\w.]+$/;
    return pattern.test(apiVersionTag);
}

;// ./src/artifactsForCDN/validDomains.json
const validDomains_namespaceObject = /*#__PURE__*/JSON.parse('{"validOrigins":["teams.microsoft.com","teams.microsoft.us","gov.teams.microsoft.us","dod.teams.microsoft.us","int.teams.microsoft.com","outlook.office.com","outlook-sdf.office.com","outlook.office365.com","outlook-sdf.office365.com","outlook.live.com","outlook-sdf.live.com","teams.live.com","local.teams.live.com","local.teams.live.com:8080","local.teams.office.com","local.teams.office.com:8080","devspaces.skype.com","*.www.office.com","www.office.com","word.office.com","excel.office.com","powerpoint.office.com","www.officeppe.com","*.www.microsoft365.com","www.microsoft365.com","bing.com","edgeservices.bing.com","work.bing.com","www.bing.com","www.staging-bing-int.com","*.cloud.microsoft","*.m365.cloud.microsoft","edgeapi.freya.svc.cloud.microsoft","copilot.microsoft.com","windows.msn.com","fa000000125.resources.office.net","fa000000129.resources.office.net","fa000000124.resources.office.net","fa000000128.resources.office.net","fa000000136.resources.office.net"]}');
var artifactsForCDN_validDomains_namespaceObject = /*#__PURE__*/__webpack_require__.t(validDomains_namespaceObject, 2);
;// ./src/internal/constants.ts

/**
 * @hidden
 * The client version when all SDK APIs started to check platform compatibility for the APIs was 1.6.0.
 * Modified to 2.0.1 which is hightest till now so that if any client doesn't pass version in initialize function, it will be set to highest.
 * Mobile clients are passing versions, hence will be applicable to web and desktop clients only.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const defaultSDKVersionForCompatCheck = '2.0.1';
/**
 * @hidden
 * This is the client version when selectMedia API - VideoAndImage is supported on mobile.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const videoAndImageMediaAPISupportVersion = '2.0.2';
/**
 * @hidden
 * This is the client version when selectMedia API - Video with non-full screen mode is supported on mobile.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const nonFullScreenVideoModeAPISupportVersion = '2.0.3';
/**
 * @hidden
 * This is the client version when selectMedia API - ImageOutputFormats is supported on mobile.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const imageOutputFormatsAPISupportVersion = '2.0.4';
/**
 * @hidden
 * Minimum required client supported version for {@link getUserJoinedTeams} to be supported on {@link HostClientType.android}
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const getUserJoinedTeamsSupportedAndroidClientVersion = '2.0.1';
/**
 * @hidden
 * This is the client version when location APIs (getLocation and showLocation) are supported.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const locationAPIsRequiredVersion = '1.9.0';
/**
 * @hidden
 * This is the client version when permisisons are supported
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const permissionsAPIsRequiredVersion = '2.0.1';
/**
 * @hidden
 * This is the client version when people picker API is supported on mobile.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const peoplePickerRequiredVersion = '2.0.0';
/**
 * @hidden
 * This is the client version when captureImage API is supported on mobile.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const captureImageMobileSupportVersion = '1.7.0';
/**
 * @hidden
 * This is the client version when media APIs are supported on all three platforms ios, android and web.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const mediaAPISupportVersion = '1.8.0';
/**
 * @hidden
 * This is the client version when getMedia API is supported via Callbacks on all three platforms ios, android and web.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const getMediaCallbackSupportVersion = '2.0.0';
/**
 * @hidden
 * This is the client version when scanBarCode API is supported on mobile.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const scanBarCodeAPIMobileSupportVersion = '1.9.0';
/**
 * @hidden
 * Fallback list of valid origins in JSON format
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const validOriginsLocal = artifactsForCDN_validDomains_namespaceObject;
/**
 * @hidden
 * Fallback list of valid origins
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const validOriginsFallback = validOriginsLocal.validOrigins;
/**
 * @hidden
 * CDN endpoint of the list of valid origins
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const validOriginsCdnEndpoint = new URL('https://res.cdn.office.net/teams-js/validDomains/json/validDomains.json');
/**
 * @hidden
 * USer specified message origins should satisfy this test
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const userOriginUrlValidationRegExp = /^https:\/\//;
/**
 * @hidden
 * The protocol used for deep links into Teams
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const teamsDeepLinkProtocol = 'https';
/**
 * @hidden
 * The host used for deep links into Teams
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const teamsDeepLinkHost = 'teams.microsoft.com';
/** @hidden */
const errorLibraryNotInitialized = 'The library has not yet been initialized';
/** @hidden */
const errorRuntimeNotInitialized = 'The runtime has not yet been initialized';
/** @hidden */
const errorRuntimeNotSupported = 'The runtime version is not supported';
/** @hidden */
const errorCallNotStarted = 'The call was not properly started';

;// ./src/internal/globalVars.ts
class GlobalVars {
}
GlobalVars.initializeCalled = false;
GlobalVars.initializeCompleted = false;
GlobalVars.additionalValidOrigins = [];
GlobalVars.initializePromise = undefined;
GlobalVars.isFramelessWindow = false;
GlobalVars.frameContext = undefined;
GlobalVars.hostClientType = undefined;
GlobalVars.printCapabilityEnabled = false;

;// ./src/public/runtime.ts
/* eslint-disable @typescript-eslint/ban-types */
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};





const runtimeLogger = getLogger('runtime');
const latestRuntimeApiVersion = 4;
function isLatestRuntimeVersion(runtime) {
    return runtime.apiVersion === latestRuntimeApiVersion;
}
// Constant used to set the runtime configuration
const _uninitializedRuntime = {
    apiVersion: -1,
    supports: {},
};
/**
 * @hidden
 * Ensures that the runtime has been initialized

 * @returns True if the runtime has been initialized
 * @throws Error if the runtime has not been initialized
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function isRuntimeInitialized(runtime) {
    if (isLatestRuntimeVersion(runtime)) {
        return true;
    }
    else if (runtime.apiVersion === -1) {
        throw new Error(errorRuntimeNotInitialized);
    }
    else {
        throw new Error(errorRuntimeNotSupported);
    }
}
let runtime = _uninitializedRuntime;
/**
 * This object is used as the default runtime for versions of Teams which don't pass a runtime object during
 * initialization. If the host DOES pass a runtime object during init, then this object is not used.
 *
 * In practice, this is used in Teams V1 and ALL versions of Teams mobile since they are the only hosts
 * that don't pass a runtime object during initialization (since they don't use the host SDK).
 *
 * If there are certain versions of Teams V1 or Teams mobile which support a capability but not ALL
 * versions, then you should modify the mapTeamsVersionToSupportedCapabilities structure for that purpose. That
 * structure allows you to specify particular versions on particular platforms that support certain capabilities.
 * This structure is version agnostic.
 *
 * In practice, if you are adding a new capability, you are likely only to need to update mapTeamsVersionToSupportedCapabilities
 * and NOT this structure, as this structure is effectively only used for capabilities that have existed "forever."
 *
 * Remember that everything here all still ONLY applies to versions of Teams that don't pass a runtime object during
 * initialization -- if they do, then neither this object nor the mapTeamsVersionToSupportedCapabilities structure is
 * used -- all runtime capabilities are dynamically discovered at runtime in the case where the runtime object is passed
 * during initialization.
 */
const versionAndPlatformAgnosticTeamsRuntimeConfig = {
    apiVersion: 4,
    isNAAChannelRecommended: false,
    hostVersionsInfo: teamsMinAdaptiveCardVersion,
    isLegacyTeams: true,
    supports: {
        appInstallDialog: {},
        appEntity: {},
        call: {},
        chat: {},
        conversations: {},
        dialog: {
            card: {
                bot: {},
            },
            url: {
                bot: {},
                parentCommunication: {},
            },
            update: {},
        },
        interactive: {},
        logs: {},
        meetingRoom: {},
        menus: {},
        monetization: {},
        notifications: {},
        pages: {
            config: {},
            backStack: {},
            fullTrust: {},
        },
        remoteCamera: {},
        teams: {
            fullTrust: {},
        },
        teamsCore: {},
        video: {
            sharedFrame: {},
        },
    },
};
const v1NonMobileHostClientTypes = [
    HostClientType.desktop,
    HostClientType.web,
    HostClientType.rigel,
    HostClientType.surfaceHub,
    HostClientType.teamsRoomsWindows,
    HostClientType.teamsRoomsAndroid,
    HostClientType.teamsPhones,
    HostClientType.teamsDisplays,
];
const v1MobileHostClientTypes = [HostClientType.android, HostClientType.ios, HostClientType.ipados];
const v1HostClientTypes = [...v1NonMobileHostClientTypes, ...v1MobileHostClientTypes];
/**
 * @hidden
 * Uses upgradeChain to transform an outdated runtime object to the latest format.
 * @param outdatedRuntime - The runtime object to be upgraded
 * @returns The upgraded runtime object
 * @throws Error if the runtime object could not be upgraded to the latest version
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function fastForwardRuntime(outdatedRuntime) {
    let runtime = outdatedRuntime;
    if (runtime.apiVersion < latestRuntimeApiVersion) {
        upgradeChain.forEach((upgrade) => {
            if (runtime.apiVersion === upgrade.versionToUpgradeFrom) {
                runtime = upgrade.upgradeToNextVersion(runtime);
            }
        });
    }
    if (isLatestRuntimeVersion(runtime)) {
        return runtime;
    }
    else {
        throw new Error('Received a runtime that could not be upgraded to the latest version');
    }
}
/**
 * @hidden
 * List of transformations required to upgrade a runtime object from a previous version to the next higher version.
 * This list must be ordered from lowest version to highest version
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const upgradeChain = [
    {
        versionToUpgradeFrom: 1,
        upgradeToNextVersion: (previousVersionRuntime) => {
            var _a;
            return {
                apiVersion: 2,
                hostVersionsInfo: undefined,
                isLegacyTeams: previousVersionRuntime.isLegacyTeams,
                supports: Object.assign(Object.assign({}, previousVersionRuntime.supports), { dialog: previousVersionRuntime.supports.dialog
                        ? {
                            card: undefined,
                            url: previousVersionRuntime.supports.dialog,
                            update: (_a = previousVersionRuntime.supports.dialog) === null || _a === void 0 ? void 0 : _a.update,
                        }
                        : undefined }),
            };
        },
    },
    {
        versionToUpgradeFrom: 2,
        upgradeToNextVersion: (previousVersionRuntime) => {
            /* eslint-disable-next-line @typescript-eslint/no-unused-vars */ /* Intentionally assigned to unused variable to delete propery when destructuring */
            const _a = previousVersionRuntime.supports, { appNotification: _ } = _a, newSupports = __rest(_a, ["appNotification"]);
            return Object.assign(Object.assign({}, previousVersionRuntime), { apiVersion: 3, supports: newSupports });
        },
    },
    {
        versionToUpgradeFrom: 3,
        upgradeToNextVersion: (previousVersionRuntime) => {
            var _a, _b, _c, _d, _e;
            return {
                apiVersion: 4,
                hostVersionsInfo: previousVersionRuntime.hostVersionsInfo,
                isNAAChannelRecommended: previousVersionRuntime.isNAAChannelRecommended,
                isLegacyTeams: previousVersionRuntime.isLegacyTeams,
                supports: Object.assign(Object.assign({}, previousVersionRuntime.supports), { dialog: previousVersionRuntime.supports.dialog
                        ? {
                            card: (_a = previousVersionRuntime.supports.dialog) === null || _a === void 0 ? void 0 : _a.card,
                            url: {
                                bot: (_c = (_b = previousVersionRuntime.supports.dialog) === null || _b === void 0 ? void 0 : _b.url) === null || _c === void 0 ? void 0 : _c.bot,
                                parentCommunication: ((_d = previousVersionRuntime.supports.dialog) === null || _d === void 0 ? void 0 : _d.url) ? {} : undefined,
                            },
                            update: (_e = previousVersionRuntime.supports.dialog) === null || _e === void 0 ? void 0 : _e.update,
                        }
                        : undefined }),
            };
        },
    },
];
/**
 * This structure is used for versions of Teams that don't pass a runtime object during initialization.
 * Please see the extensive comments in versionAndPlatformAgnosticTeamsRuntimeConfig for more information
 * on when and how to use this structure.
 */
const mapTeamsVersionToSupportedCapabilities = {
    // 1.0.0 just signifies "these capabilities have practically always been supported." For some of these
    // we don't know what the real first version that supported them was -- but it was long enough ago that
    // we can just effectively consider them always supported (on the specified platforms)
    '1.0.0': [
        {
            capability: { pages: { appButton: {}, tabs: {} }, stageView: {} },
            hostClientTypes: v1NonMobileHostClientTypes,
        },
    ],
    '1.9.0': [
        {
            capability: { location: {} },
            hostClientTypes: v1HostClientTypes,
        },
    ],
    '2.0.0': [
        {
            capability: { people: {} },
            hostClientTypes: v1HostClientTypes,
        },
        {
            capability: { sharing: {} },
            hostClientTypes: [HostClientType.desktop, HostClientType.web],
        },
    ],
    '2.0.1': [
        {
            capability: { teams: { fullTrust: { joinedTeams: {} } } },
            hostClientTypes: [
                HostClientType.android,
                HostClientType.desktop,
                HostClientType.ios,
                HostClientType.teamsRoomsAndroid,
                HostClientType.teamsPhones,
                HostClientType.teamsDisplays,
                HostClientType.web,
            ],
        },
        {
            capability: { webStorage: {} },
            hostClientTypes: [HostClientType.desktop],
        },
    ],
    '2.0.5': [
        {
            capability: { webStorage: {} },
            hostClientTypes: [HostClientType.android, HostClientType.ios],
        },
    ],
    '2.0.8': [
        {
            capability: { sharing: {} },
            hostClientTypes: [HostClientType.android, HostClientType.ios],
        },
    ],
};
const generateBackCompatRuntimeConfigLogger = runtimeLogger.extend('generateBackCompatRuntimeConfig');
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * Merges the capabilities of two runtime objects. Fully supports arbitrarily nested capabilities/subcapabilities.
 *
 * Note that this function isn't actually doing anything specific to capabilities/runtime. It's just doing a
 * generic merge of two objects.
 *
 * This function is NOT intended to handle objects that are NOT "shaped" like runtime objects. Specifically
 * this means that it doesn't know how to merge values that aren't themselves objects. For example, it cannot
 * properly handle situations where both objects contain a string or number with the same property name since the proper way to
 * merge such values would be domain-dependent. For now it just happens to keep the value in the baseline and ignore the other.
 * Since the runtime is only supposed to have objects, this limitation is fine.
 *
 * @param baselineRuntime the baseline runtime object
 * @param runtimeToMergeIntoBaseline the runtime object to merge into the baseline
 * @returns the merged runtime object which is the union of baselineRuntime and runtimeToMergeIntoBaseline
 */
function mergeRuntimeCapabilities(baselineRuntime, runtimeToMergeIntoBaseline) {
    const merged = Object.assign({}, baselineRuntime);
    for (const key in runtimeToMergeIntoBaseline) {
        if (Object.prototype.hasOwnProperty.call(runtimeToMergeIntoBaseline, key)) {
            if (typeof runtimeToMergeIntoBaseline[key] === 'object' && !Array.isArray(runtimeToMergeIntoBaseline[key])) {
                merged[key] = mergeRuntimeCapabilities(baselineRuntime[key] || {}, runtimeToMergeIntoBaseline[key]);
            }
            else {
                if (!(key in baselineRuntime)) {
                    merged[key] = runtimeToMergeIntoBaseline[key];
                }
            }
        }
    }
    return merged;
}
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * Generates and returns a runtime configuration for host clients which are not on the latest host SDK version
 * and do not provide their own runtime config (this is just older versions of Teams on some platforms).
 * Their supported capabilities are based on the highest client SDK version that they can support.
 *
 * @param highestSupportedVersion - The highest client SDK version that the host client can support.
 * @returns runtime which describes the APIs supported by the legacy host client.
 */
function generateVersionBasedTeamsRuntimeConfig(highestSupportedVersion, versionAgnosticRuntimeConfig, mapVersionToSupportedCapabilities) {
    generateBackCompatRuntimeConfigLogger('generating back compat runtime config for %s', highestSupportedVersion);
    let newSupports = Object.assign({}, versionAgnosticRuntimeConfig.supports);
    generateBackCompatRuntimeConfigLogger('Supported capabilities in config before updating based on highestSupportedVersion: %o', newSupports);
    Object.keys(mapVersionToSupportedCapabilities).forEach((versionNumber) => {
        if (compareSDKVersions(highestSupportedVersion, versionNumber) >= 0) {
            mapVersionToSupportedCapabilities[versionNumber].forEach((capabilityReqs) => {
                if (GlobalVars.hostClientType !== undefined &&
                    capabilityReqs.hostClientTypes.includes(GlobalVars.hostClientType)) {
                    newSupports = mergeRuntimeCapabilities(newSupports, capabilityReqs.capability);
                }
            });
        }
    });
    const teamsBackCompatRuntimeConfig = {
        apiVersion: latestRuntimeApiVersion,
        hostVersionsInfo: teamsMinAdaptiveCardVersion,
        isLegacyTeams: true,
        supports: newSupports,
    };
    generateBackCompatRuntimeConfigLogger('Runtime config after updating based on highestSupportedVersion: %o', teamsBackCompatRuntimeConfig);
    return teamsBackCompatRuntimeConfig;
}
const applyRuntimeConfigLogger = runtimeLogger.extend('applyRuntimeConfig');
function applyRuntimeConfig(runtimeConfig) {
    // Some hosts that have not adopted runtime versioning send a string for apiVersion, so we should handle those as v1 inputs
    if (typeof runtimeConfig.apiVersion === 'string') {
        applyRuntimeConfigLogger('Trying to apply runtime with string apiVersion, processing as v1: %o', runtimeConfig);
        runtimeConfig = Object.assign(Object.assign({}, runtimeConfig), { apiVersion: 1 });
    }
    applyRuntimeConfigLogger('Fast-forwarding runtime %o', runtimeConfig);
    const ffRuntimeConfig = fastForwardRuntime(runtimeConfig);
    applyRuntimeConfigLogger('Applying runtime %o', ffRuntimeConfig);
    runtime = utils_deepFreeze(ffRuntimeConfig);
}
function setUnitializedRuntime() {
    runtime = deepFreeze(_uninitializedRuntime);
}
/**
 * @hidden
 * Constant used to set minimum runtime configuration
 * while un-initializing an app in unit test case.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const _minRuntimeConfigToUninitialize = {
    apiVersion: latestRuntimeApiVersion,
    supports: {
        pages: {
            appButton: {},
            tabs: {},
            config: {},
            backStack: {},
            fullTrust: {},
        },
        teamsCore: {},
        logs: {},
    },
};

;// ./src/public/version.ts
/**
 * @hidden
 *  Package version.
 */
const version = "2.29.0";

;// ./src/internal/internalAPIs.ts







const internalLogger = getLogger('internal');
const ensureInitializeCalledLogger = internalLogger.extend('ensureInitializeCalled');
const ensureInitializedLogger = internalLogger.extend('ensureInitialized');
/**
 * Ensures `initialize` was called. This function does NOT verify that a response from Host was received and initialization completed.
 *
 * `ensureInitializeCalled` should only be used for APIs which:
 * - work in all FrameContexts
 * - are part of a required Capability
 * - are suspected to be used directly after calling `initialize`, potentially without awaiting the `initialize` call itself
 *
 * For most APIs {@link ensureInitialized} is the right validation function to use instead.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function ensureInitializeCalled() {
    if (!GlobalVars.initializeCalled) {
        ensureInitializeCalledLogger(errorLibraryNotInitialized);
        throw new Error(errorLibraryNotInitialized);
    }
}
/**
 * Ensures `initialize` was called and response from Host was received and processed and that `runtime` is initialized.
 * If expected FrameContexts are provided, it also validates that the current FrameContext matches one of the expected ones.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function ensureInitialized(runtime, ...expectedFrameContexts) {
    // This global var can potentially be removed in the future if we use the initialization status of the runtime object as our source of truth
    if (!GlobalVars.initializeCompleted) {
        ensureInitializedLogger('%s. initializeCalled: %s', errorLibraryNotInitialized, GlobalVars.initializeCalled.toString());
        throw new Error(errorLibraryNotInitialized);
    }
    if (expectedFrameContexts && expectedFrameContexts.length > 0) {
        let found = false;
        for (let i = 0; i < expectedFrameContexts.length; i++) {
            if (expectedFrameContexts[i] === GlobalVars.frameContext) {
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error(`This call is only allowed in following contexts: ${JSON.stringify(expectedFrameContexts)}. ` +
                `Current context: "${GlobalVars.frameContext}".`);
        }
    }
    return isRuntimeInitialized(runtime);
}
/**
 * @hidden
 * Checks whether the platform has knowledge of this API by doing a comparison
 * on API required version and platform supported version of the SDK
 *
 * @param requiredVersion - SDK version required by the API
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function isCurrentSDKVersionAtLeast(requiredVersion = defaultSDKVersionForCompatCheck) {
    const value = compareSDKVersions(GlobalVars.clientSupportedSDKVersion, requiredVersion);
    if (isNaN(value)) {
        return false;
    }
    return value >= 0;
}
/**
 * @hidden
 * Helper function to identify if host client is either android, ios, or ipados
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function isHostClientMobile() {
    return (GlobalVars.hostClientType == HostClientType.android ||
        GlobalVars.hostClientType == HostClientType.ios ||
        GlobalVars.hostClientType == HostClientType.ipados);
}
/**
 * @hidden
 * Helper function which indicates if current API is supported on mobile or not.
 * @throws SdkError if host client is not android/ios or if the requiredVersion is not
 *          supported by platform or not. Null is returned in case of success.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function throwExceptionIfMobileApiIsNotSupported(requiredVersion = defaultSDKVersionForCompatCheck) {
    if (!isHostClientMobile()) {
        const notSupportedError = { errorCode: ErrorCode.NOT_SUPPORTED_ON_PLATFORM };
        throw notSupportedError;
    }
    else if (!isCurrentSDKVersionAtLeast(requiredVersion)) {
        const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
        throw oldPlatformError;
    }
}
/**
 * @hidden
 * Processes the valid origins specifuied by the user, de-duplicates and converts them into a regexp
 * which is used later for message source/origin validation
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function processAdditionalValidOrigins(validMessageOrigins) {
    let combinedOriginUrls = GlobalVars.additionalValidOrigins.concat(validMessageOrigins.filter((_origin) => {
        return typeof _origin === 'string' && userOriginUrlValidationRegExp.test(_origin);
    }));
    const dedupUrls = {};
    combinedOriginUrls = combinedOriginUrls.filter((_originUrl) => {
        if (dedupUrls[_originUrl]) {
            return false;
        }
        dedupUrls[_originUrl] = true;
        return true;
    });
    GlobalVars.additionalValidOrigins = combinedOriginUrls;
}

;// ./src/internal/typeCheckUtilities.ts
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}

;// ./src/internal/validOrigins.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




let validOriginsCache = [];
const validateOriginLogger = getLogger('validateOrigin');
function prefetchOriginsFromCDN() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getValidOriginsListFromCDN();
    });
}
function isValidOriginsCacheEmpty() {
    return validOriginsCache.length === 0;
}
function getValidOriginsListFromCDN() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidOriginsCacheEmpty()) {
            return validOriginsCache;
        }
        if (!inServerSideRenderingEnvironment()) {
            return fetch(validOriginsCdnEndpoint)
                .then((response) => {
                if (!response.ok) {
                    throw new Error('Invalid Response from Fetch Call');
                }
                return response.json().then((validOriginsCDN) => {
                    if (isValidOriginsJSONValid(JSON.stringify(validOriginsCDN))) {
                        validOriginsCache = validOriginsCDN.validOrigins;
                        return validOriginsCache;
                    }
                    else {
                        throw new Error('Valid Origins List Is Invalid');
                    }
                });
            })
                .catch((e) => {
                validateOriginLogger('validOrigins fetch call to CDN failed with error: %s. Defaulting to fallback list', e);
                validOriginsCache = validOriginsFallback;
                return validOriginsCache;
            });
        }
        else {
            validOriginsCache = validOriginsFallback;
            return validOriginsFallback;
        }
    });
}
function isValidOriginsJSONValid(validOriginsJSON) {
    let validOriginsCDN = JSON.parse(validOriginsJSON);
    try {
        validOriginsCDN = JSON.parse(validOriginsJSON);
    }
    catch (_) {
        return false;
    }
    if (!validOriginsCDN.validOrigins) {
        return false;
    }
    for (const validOrigin of validOriginsCDN.validOrigins) {
        try {
            new URL('https://' + validOrigin);
        }
        catch (_) {
            validateOriginLogger('isValidOriginsFromCDN call failed to validate origin: %s', validOrigin);
            return false;
        }
    }
    return true;
}
/**
 * @param pattern - reference pattern
 * @param host - candidate string
 * @returns returns true if host matches pre-know valid pattern
 *
 * @example
 *    validateHostAgainstPattern('*.teams.microsoft.com', 'subdomain.teams.microsoft.com') returns true
 *    validateHostAgainstPattern('teams.microsoft.com', 'team.microsoft.com') returns false
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateHostAgainstPattern(pattern, host) {
    if (pattern.substring(0, 2) === '*.') {
        const suffix = pattern.substring(1);
        if (host.length > suffix.length &&
            host.split('.').length === suffix.split('.').length &&
            host.substring(host.length - suffix.length) === suffix) {
            return true;
        }
    }
    else if (pattern === host) {
        return true;
    }
    return false;
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function validateOrigin(messageOrigin) {
    return getValidOriginsListFromCDN().then((validOriginsList) => {
        // Check whether the url is in the pre-known allowlist or supplied by user
        if (!isValidHttpsURL(messageOrigin)) {
            validateOriginLogger('Origin %s is invalid because it is not using https protocol. Protocol being used: %s', messageOrigin, messageOrigin.protocol);
            return false;
        }
        const messageOriginHost = messageOrigin.host;
        if (validOriginsList.some((pattern) => validateHostAgainstPattern(pattern, messageOriginHost))) {
            return true;
        }
        for (const domainOrPattern of GlobalVars.additionalValidOrigins) {
            const pattern = domainOrPattern.substring(0, 8) === 'https://' ? domainOrPattern.substring(8) : domainOrPattern;
            if (validateHostAgainstPattern(pattern, messageOriginHost)) {
                return true;
            }
        }
        validateOriginLogger('Origin %s is invalid because it is not an origin approved by this library or included in the call to app.initialize.\nOrigins approved by this library: %o\nOrigins included in app.initialize: %o', messageOrigin, validOriginsList, GlobalVars.additionalValidOrigins);
        return false;
    });
}

;// ./src/internal/appIdValidation.ts

/**
 * This function can be used to validate if a string is a "valid" app id.
 * Valid is a relative term, in this case. Truly valid app ids are UUIDs as documented in the schema:
 * https://learn.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema#id
 * However, there are some older internal/hard-coded apps which violate this schema and use names like com.microsoft.teamspace.tab.youtube.
 * For compatibility with these legacy apps, we unfortunately cannot securely and completely validate app ids as UUIDs. Based
 * on this, the validation is limited to checking for script tags, length, and non-printable characters.
 *
 * @param potentialAppId A string to check if it's a "valid" app id
 * @throws Error with a message describing the exact validation violation
 */
function validateStringAsAppId(potentialAppId) {
    if (hasScriptTags(potentialAppId)) {
        throw new Error(`Potential app id (${potentialAppId}) is invalid; it contains script tags.`);
    }
    if (!isStringWithinAppIdLengthLimits(potentialAppId)) {
        throw new Error(`Potential app id (${potentialAppId}) is invalid; its length ${potentialAppId.length} is not within the length limits (${minimumValidAppIdLength}-${maximumValidAppIdLength}).`);
    }
    if (doesStringContainNonPrintableCharacters(potentialAppId)) {
        throw new Error(`Potential app id (${potentialAppId}) is invalid; it contains non-printable characters.`);
    }
}
const minimumValidAppIdLength = 4;
const maximumValidAppIdLength = 256;
function isStringWithinAppIdLengthLimits(potentialAppId) {
    return potentialAppId.length < maximumValidAppIdLength && potentialAppId.length > minimumValidAppIdLength;
}
function doesStringContainNonPrintableCharacters(str) {
    return [...str].some((char) => {
        const charCode = char.charCodeAt(0);
        return charCode < 32 || charCode > 126;
    });
}

;// ./src/public/appId.ts

/**
 * A strongly-typed class used to represent a "valid" app id.
 *
 * Valid is a relative term, in this case. Truly valid app ids are UUIDs as documented in the schema:
 * https://learn.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema#id
 * However, there are some older internal/hard-coded apps which violate this schema and use names like
 * com.microsoft.teamspace.tab.youtube. For compatibility with these legacy apps, we unfortunately cannot
 * securely and completely validate app ids as UUIDs. Based on this, the validation is limited to checking
 * for script tags, length, and non-printable characters. Validation will be updated in the future to ensure
 * the app id is a valid UUID as legacy apps update.
 */
class AppId {
    /**
     * Creates a strongly-typed AppId from a string
     *
     * @param appIdAsString An app id represented as a string
     * @throws Error with a message describing the exact validation violation
     */
    constructor(appIdAsString) {
        this.appIdAsString = appIdAsString;
        validateStringAsAppId(appIdAsString);
    }
    /**
     * Returns the app id as a string
     */
    toString() {
        return this.appIdAsString;
    }
}

;// ./src/private/messageChannels.ts
var messageChannels_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





/**
 * @hidden
 * Namespace to request message ports from the host application.
 *
 * @beta
 *
 * @internal
 * Limited to Microsoft-internal use
 */
var messageChannels;
(function (messageChannels) {
    let telemetry;
    (function (telemetry) {
        let telemetryPort;
        const messageChannelsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
        const logger = getLogger('messageChannels.telemetry');
        /**
         * @hidden
         * @beta
         *
         * Fetches a MessagePort to batch telemetry through the host's telemetry worker.
         * The port is cached once received, so subsequent calls return the same port.
         * @returns MessagePort.
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed,
         * if the host does not support the feature, or if the port request is rejected.
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function getTelemetryPort() {
            return messageChannels_awaiter(this, void 0, void 0, function* () {
                // If the port has already been initialized, return it.
                if (telemetryPort) {
                    logger('Returning telemetry port from cache');
                    return telemetryPort;
                }
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                // Send request for telemetry port, will throw if the request is rejected
                telemetryPort = yield requestPortFromParentWithVersion(getApiVersionTag(messageChannelsTelemetryVersionNumber, "messageChannels.telemetry.getTelemetryPort" /* ApiName.MessageChannels_Telemetry_GetTelemetryPort */), "messageChannels.telemetry.getTelemetryPort" /* ApiName.MessageChannels_Telemetry_GetTelemetryPort */);
                return telemetryPort;
            });
        }
        telemetry.getTelemetryPort = getTelemetryPort;
        /**
         * @hidden
         *
         * @beta
         *
         * Checks if the messageChannels.telemetry capability is supported by the host
         * @returns boolean to represent whether the messageChannels.telemetry capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function isSupported() {
            var _a;
            return ensureInitialized(runtime) && ((_a = runtime.supports.messageChannels) === null || _a === void 0 ? void 0 : _a.telemetry) ? true : false;
        }
        telemetry.isSupported = isSupported;
        /**
         * @hidden
         * Undocumented function used to clear state between unit tests
         *
         * @beta
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function _clearTelemetryPort() {
            telemetryPort = undefined;
        }
        telemetry._clearTelemetryPort = _clearTelemetryPort;
    })(telemetry = messageChannels.telemetry || (messageChannels.telemetry = {}));
    let dataLayer;
    (function (dataLayer) {
        let dataLayerPort;
        const messageChannelsDataLayerVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
        const logger = getLogger('messageChannels.dataLayer');
        /**
         * @hidden
         * @beta
         *
         * Fetches a MessagePort to allow access to the host's data layer worker.
         * The port is cached once received, so subsequent calls return the same port.
         * @returns MessagePort.
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed,
         * if the host does not support the feature, or if the port request is rejected.
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function getDataLayerPort() {
            return messageChannels_awaiter(this, void 0, void 0, function* () {
                // If the port has already been initialized, return it.
                if (dataLayerPort) {
                    logger('Returning dataLayer port from cache');
                    return dataLayerPort;
                }
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                // Send request for telemetry port, will throw if the request is rejected
                dataLayerPort = yield requestPortFromParentWithVersion(getApiVersionTag(messageChannelsDataLayerVersionNumber, "messageChannels.dataLayer.getDataLayerPort" /* ApiName.MessageChannels_DataLayer_GetDataLayerPort */), "messageChannels.dataLayer.getDataLayerPort" /* ApiName.MessageChannels_DataLayer_GetDataLayerPort */);
                return dataLayerPort;
            });
        }
        dataLayer.getDataLayerPort = getDataLayerPort;
        /**
         * @hidden
         *
         * @beta
         *
         * Checks if the messageChannels.dataLayer capability is supported by the host
         * @returns boolean to represent whether the messageChannels.dataLayer capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function isSupported() {
            var _a;
            return ensureInitialized(runtime) && ((_a = runtime.supports.messageChannels) === null || _a === void 0 ? void 0 : _a.dataLayer) ? true : false;
        }
        dataLayer.isSupported = isSupported;
        /**
         * @hidden
         * Undocumented function used to clear state between unit tests
         *
         * @beta
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function _clearDataLayerPort() {
            dataLayerPort = undefined;
        }
        dataLayer._clearDataLayerPort = _clearDataLayerPort;
    })(dataLayer = messageChannels.dataLayer || (messageChannels.dataLayer = {}));
    /**
     * @hidden
     *
     * @beta
     *
     * Checks if the messageChannels capability is supported by the host
     * @returns boolean to represent whether the messageChannels capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.messageChannels ? true : false;
    }
    messageChannels.isSupported = isSupported;
})(messageChannels || (messageChannels = {}));

;// ./src/public/authentication.ts








/**
 * Namespace to interact with the authentication-specific part of the SDK.
 *
 * This object is used for starting or completing authentication flows.
 */
/**
 * Exceptional APIs telemetry versioning file: v1 and v2 APIs are mixed together in this file
 */
const authenticationTelemetryVersionNumber_v1 = "v1" /* ApiVersionNumber.V_1 */;
const authenticationTelemetryVersionNumber_v2 = "v2" /* ApiVersionNumber.V_2 */;
var authentication;
(function (authentication) {
    let authHandlers;
    let authWindowMonitor;
    /**
     * @hidden
     * @internal
     * Limited to Microsoft-internal use; automatically called when library is initialized
     */
    function initialize() {
        registerHandler(getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.registerAuthenticateSuccessHandler" /* ApiName.Authentication_RegisterAuthenticateSuccessHandler */), 'authentication.authenticate.success', handleSuccess, false);
        registerHandler(getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.registerAuthenticateFailureHandler" /* ApiName.Authentication_RegisterAuthenticateFailureHandler */), 'authentication.authenticate.failure', handleFailure, false);
    }
    authentication.initialize = initialize;
    let authParams;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, this function has been deprecated in favor of a Promise-based pattern using {@link authentication.authenticate authentication.authenticate(authenticateParameters: AuthenticatePopUpParameters): Promise\<string\>}
     *
     * Registers handlers to be called with the result of an authentication flow triggered using {@link authentication.authenticate authentication.authenticate(authenticateParameters?: AuthenticateParameters): void}
     *
     * @param authenticateParameters - Configuration for authentication flow pop-up result communication
     */
    function registerAuthenticationHandlers(authenticateParameters) {
        authParams = authenticateParameters;
    }
    authentication.registerAuthenticationHandlers = registerAuthenticationHandlers;
    function authenticate(authenticateParameters) {
        const isDifferentParamsInCall = authenticateParameters !== undefined;
        const authenticateParams = isDifferentParamsInCall
            ? authenticateParameters
            : authParams;
        if (!authenticateParams) {
            throw new Error('No parameters are provided for authentication');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.remove, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
        const apiVersionTag = authenticateParams.successCallback || authenticateParams.failureCallback
            ? getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.authenticate" /* ApiName.Authentication_Authenticate */)
            : getApiVersionTag(authenticationTelemetryVersionNumber_v2, "authentication.authenticate" /* ApiName.Authentication_Authenticate */);
        return authenticateHelper(apiVersionTag, authenticateParams)
            .then((value) => {
            try {
                if (authenticateParams && authenticateParams.successCallback) {
                    authenticateParams.successCallback(value);
                    return '';
                }
                return value;
            }
            finally {
                if (!isDifferentParamsInCall) {
                    authParams = undefined;
                }
            }
        })
            .catch((err) => {
            try {
                if (authenticateParams && authenticateParams.failureCallback) {
                    authenticateParams.failureCallback(err.message);
                    return '';
                }
                throw err;
            }
            finally {
                if (!isDifferentParamsInCall) {
                    authParams = undefined;
                }
            }
        });
    }
    authentication.authenticate = authenticate;
    function authenticateHelper(apiVersionTag, authenticateParameters) {
        return new Promise((resolve, reject) => {
            if (GlobalVars.hostClientType !== HostClientType.web) {
                // Convert any relative URLs into absolute URLs before sending them over to the parent window.
                const fullyQualifiedURL = fullyQualifyUrlString(authenticateParameters.url);
                validateUrl(fullyQualifiedURL);
                // Ask the parent window to open an authentication window with the parameters provided by the caller.
                resolve(sendMessageToParentAsync(apiVersionTag, 'authentication.authenticate', [
                    fullyQualifiedURL.href,
                    authenticateParameters.width,
                    authenticateParameters.height,
                    authenticateParameters.isExternal,
                ]).then(([success, response]) => {
                    if (success) {
                        return response;
                    }
                    else {
                        throw new Error(response);
                    }
                }));
            }
            else {
                // Open an authentication window with the parameters provided by the caller.
                authHandlers = {
                    success: resolve,
                    fail: reject,
                };
                openAuthenticationWindow(authenticateParameters);
            }
        });
    }
    function getAuthToken(authTokenRequest) {
        ensureInitializeCalled();
        const apiVersionTag = authTokenRequest && (authTokenRequest.successCallback || authTokenRequest.failureCallback)
            ? getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.getAuthToken" /* ApiName.Authentication_GetAuthToken */)
            : getApiVersionTag(authenticationTelemetryVersionNumber_v2, "authentication.getAuthToken" /* ApiName.Authentication_GetAuthToken */);
        return getAuthTokenHelper(apiVersionTag, authTokenRequest)
            .then((value) => {
            if (authTokenRequest && authTokenRequest.successCallback) {
                authTokenRequest.successCallback(value);
                return '';
            }
            return value;
        })
            .catch((err) => {
            if (authTokenRequest && authTokenRequest.failureCallback) {
                authTokenRequest.failureCallback(err.message);
                return '';
            }
            throw err;
        });
    }
    authentication.getAuthToken = getAuthToken;
    function getAuthTokenHelper(apiVersionTag, authTokenRequest) {
        return new Promise((resolve) => {
            resolve(sendMessageToParentAsync(apiVersionTag, 'authentication.getAuthToken', [
                authTokenRequest === null || authTokenRequest === void 0 ? void 0 : authTokenRequest.resources,
                authTokenRequest === null || authTokenRequest === void 0 ? void 0 : authTokenRequest.claims,
                authTokenRequest === null || authTokenRequest === void 0 ? void 0 : authTokenRequest.silent,
                authTokenRequest === null || authTokenRequest === void 0 ? void 0 : authTokenRequest.tenantId,
            ]));
        }).then(([success, result]) => {
            if (success) {
                return result;
            }
            else {
                throw new Error(result);
            }
        });
    }
    function getUser(userRequest) {
        ensureInitializeCalled();
        const apiVersionTag = userRequest && (userRequest.successCallback || userRequest.failureCallback)
            ? getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.getUser" /* ApiName.Authentication_GetUser */)
            : getApiVersionTag(authenticationTelemetryVersionNumber_v2, "authentication.getUser" /* ApiName.Authentication_GetUser */);
        return getUserHelper(apiVersionTag)
            .then((value) => {
            if (userRequest && userRequest.successCallback) {
                userRequest.successCallback(value);
                return null;
            }
            return value;
        })
            .catch((err) => {
            const errorMessage = `Error returned, code = ${err.errorCode}, message = ${err.message}`;
            if (userRequest && userRequest.failureCallback) {
                userRequest.failureCallback(errorMessage);
                return null;
            }
            throw new Error(errorMessage);
        });
    }
    authentication.getUser = getUser;
    function getUserHelper(apiVersionTag) {
        return new Promise((resolve) => {
            resolve(sendMessageToParentAsync(apiVersionTag, 'authentication.getUser'));
        }).then(([success, result]) => {
            if (success) {
                return result;
            }
            else {
                throw result;
            }
        });
    }
    function closeAuthenticationWindow() {
        // Stop monitoring the authentication window
        stopAuthenticationWindowMonitor();
        // Try to close the authentication window and clear all properties associated with it
        try {
            if (Communication.childWindow) {
                Communication.childWindow.close();
            }
        }
        finally {
            Communication.childWindow = null;
            Communication.childOrigin = null;
        }
    }
    /**
     * Different browsers handle authentication flows in pop-up windows differently.
     * Firefox and Safari, which use Quantum and WebKit browser engines respectively, block the use of 'window.open' for pop-up windows.
     * Any chrome-based browser (Chrome, Edge, Brave, etc.) opens a new browser window without any user-prompts.
     * To ensure consistent behavior across all browsers, consider using the following function to create a new authentication window.
     *
     * @param authenticateParameters - Parameters describing the authentication window used for executing the authentication flow.
     */
    function openAuthenticationWindow(authenticateParameters) {
        // Close the previously opened window if we have one
        closeAuthenticationWindow();
        // Start with a sensible default size
        let width = authenticateParameters.width || 600;
        let height = authenticateParameters.height || 400;
        // Ensure that the new window is always smaller than our app's window so that it never fully covers up our app
        width = Math.min(width, Communication.currentWindow.outerWidth - 400);
        height = Math.min(height, Communication.currentWindow.outerHeight - 200);
        // Convert any relative URLs into absolute URLs before sending them over to the parent window
        const fullyQualifiedURL = fullyQualifyUrlString(authenticateParameters.url.replace('{oauthRedirectMethod}', 'web'));
        validateUrl(fullyQualifiedURL);
        // We are running in the browser, so we need to center the new window ourselves
        let left = typeof Communication.currentWindow.screenLeft !== 'undefined'
            ? Communication.currentWindow.screenLeft
            : Communication.currentWindow.screenX;
        let top = typeof Communication.currentWindow.screenTop !== 'undefined'
            ? Communication.currentWindow.screenTop
            : Communication.currentWindow.screenY;
        left += Communication.currentWindow.outerWidth / 2 - width / 2;
        top += Communication.currentWindow.outerHeight / 2 - height / 2;
        // Open a child window with a desired set of standard browser features
        Communication.childWindow = Communication.currentWindow.open(fullyQualifiedURL.href, '_blank', 'toolbar=no, location=yes, status=no, menubar=no, scrollbars=yes, top=' +
            top +
            ', left=' +
            left +
            ', width=' +
            width +
            ', height=' +
            height);
        if (Communication.childWindow) {
            // Start monitoring the authentication window so that we can detect if it gets closed before the flow completes
            startAuthenticationWindowMonitor();
        }
        else {
            // If we failed to open the window, fail the authentication flow
            handleFailure('FailedToOpenWindow');
        }
    }
    function stopAuthenticationWindowMonitor() {
        if (authWindowMonitor) {
            clearInterval(authWindowMonitor);
            authWindowMonitor = 0;
        }
        removeHandler('initialize');
        removeHandler('navigateCrossDomain');
    }
    function startAuthenticationWindowMonitor() {
        // Stop the previous window monitor if one is running
        stopAuthenticationWindowMonitor();
        // Create an interval loop that
        // - Notifies the caller of failure if it detects that the authentication window is closed
        // - Keeps pinging the authentication window while it is open to re-establish
        //   contact with any pages along the authentication flow that need to communicate
        //   with us
        authWindowMonitor = Communication.currentWindow.setInterval(() => {
            if (!Communication.childWindow || Communication.childWindow.closed) {
                handleFailure('CancelledByUser');
            }
            else {
                const savedChildOrigin = Communication.childOrigin;
                try {
                    Communication.childOrigin = '*';
                    sendMessageEventToChild('ping');
                }
                finally {
                    Communication.childOrigin = savedChildOrigin;
                }
            }
        }, 100);
        // Set up an initialize-message handler that gives the authentication window its frame context
        registerHandler(getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.authenticationWindow.registerInitializeHandler" /* ApiName.Authentication_AuthenticationWindow_RegisterInitializeHandler */), 'initialize', () => {
            return [FrameContexts.authentication, GlobalVars.hostClientType];
        });
        // Set up a navigateCrossDomain message handler that blocks cross-domain re-navigation attempts
        // in the authentication window. We could at some point choose to implement this method via a call to
        // authenticationWindow.location.href = url; however, we would first need to figure out how to
        // validate the URL against the tab's list of valid domains.
        registerHandler(getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.authenticationWindow.registerNavigateCrossDomainHandler" /* ApiName.Authentication_AuthenticationWindow_RegisterNavigateCrossDomainHandler */), 'navigateCrossDomain', () => {
            return false;
        });
    }
    /**
     * @deprecated
     * This function used to have an unused optional second parameter called callbackUrl. Because it was not used, it has been removed.
     * Please use the {@link authentication.notifySuccess authentication.notifySuccess(result?: string): void} instead.
     */
    function notifySuccess(result, _callbackUrl) {
        ensureInitialized(runtime, FrameContexts.authentication);
        const apiVersionTag = _callbackUrl
            ? getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.notifySuccess" /* ApiName.Authentication_NotifySuccess */)
            : getApiVersionTag(authenticationTelemetryVersionNumber_v2, "authentication.notifySuccess" /* ApiName.Authentication_NotifySuccess */);
        sendMessageToParent(apiVersionTag, 'authentication.authenticate.success', [result]);
        // Wait for the message to be sent before closing the window
        waitForMessageQueue(Communication.parentWindow, () => setTimeout(() => Communication.currentWindow.close(), 200));
    }
    authentication.notifySuccess = notifySuccess;
    /**
     * @deprecated
     * This function used to have an unused optional second parameter called callbackUrl. Because it was not used, it has been removed.
     * Please use the {@link authentication.notifyFailure authentication.notifyFailure(result?: string): void} instead.
     */
    function notifyFailure(reason, _callbackUrl) {
        ensureInitialized(runtime, FrameContexts.authentication);
        const apiVersionTag = _callbackUrl
            ? getApiVersionTag(authenticationTelemetryVersionNumber_v1, "authentication.notifyFailure" /* ApiName.Authentication_NotifyFailure */)
            : getApiVersionTag(authenticationTelemetryVersionNumber_v2, "authentication.notifyFailure" /* ApiName.Authentication_NotifyFailure */);
        sendMessageToParent(apiVersionTag, 'authentication.authenticate.failure', [reason]);
        // Wait for the message to be sent before closing the window
        waitForMessageQueue(Communication.parentWindow, () => setTimeout(() => Communication.currentWindow.close(), 200));
    }
    authentication.notifyFailure = notifyFailure;
    function handleSuccess(result) {
        try {
            if (authHandlers) {
                authHandlers.success(result);
            }
        }
        finally {
            authHandlers = undefined;
            closeAuthenticationWindow();
        }
    }
    function handleFailure(reason) {
        try {
            if (authHandlers) {
                authHandlers.fail(new Error(reason));
            }
        }
        finally {
            authHandlers = undefined;
            closeAuthenticationWindow();
        }
    }
    /**
     * @hidden
     * Limited set of data residencies information exposed to 1P application developers
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let DataResidency;
    (function (DataResidency) {
        /**
         * Public
         */
        DataResidency["Public"] = "public";
        /**
         * European Union Data Boundary
         */
        DataResidency["EUDB"] = "eudb";
        /**
         * Other, stored to cover fields that will not be exposed
         */
        DataResidency["Other"] = "other";
    })(DataResidency = authentication.DataResidency || (authentication.DataResidency = {}));
})(authentication || (authentication = {}));

;// ./src/public/dialog.ts
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */








/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const dialogTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
function updateResizeHelper(apiVersionTag, dimensions) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.task, FrameContexts.meetingStage);
    if (!dialog.update.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    sendMessageToParent(apiVersionTag, 'tasks.updateTask', [dimensions]);
}
function urlOpenHelper(apiVersionTag, urlDialogInfo, submitHandler, messageFromChildHandler) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
    if (!dialog.url.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    if (messageFromChildHandler) {
        registerHandler(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.registerMessageForParentHandler" /* ApiName.Dialog_Url_RegisterMessageForParentHandler */), 'messageForParent', messageFromChildHandler);
    }
    const dialogInfo = dialog.url.getDialogInfoFromUrlDialogInfo(urlDialogInfo);
    sendMessageToParent(apiVersionTag, 'tasks.startTask', [dialogInfo], (err, result) => {
        submitHandler === null || submitHandler === void 0 ? void 0 : submitHandler({ err, result });
        removeHandler('messageForParent');
    });
}
function botUrlOpenHelper(apiVersionTag, urlDialogInfo, submitHandler, messageFromChildHandler) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
    if (!dialog.url.bot.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    if (messageFromChildHandler) {
        registerHandler(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.bot.registerMessageForParentHandler" /* ApiName.Dialog_Url_Bot_RegisterMessageForParentHandler */), 'messageForParent', messageFromChildHandler);
    }
    const dialogInfo = dialog.url.getDialogInfoFromBotUrlDialogInfo(urlDialogInfo);
    sendMessageToParent(apiVersionTag, 'tasks.startTask', [dialogInfo], (err, result) => {
        submitHandler === null || submitHandler === void 0 ? void 0 : submitHandler({ err, result });
        removeHandler('messageForParent');
    });
}
function urlSubmitHelper(apiVersionTag, result, appIds) {
    ensureInitialized(runtime, FrameContexts.task);
    if (!dialog.url.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    // Send tasks.completeTask instead of tasks.submitTask message for backward compatibility with Mobile clients
    sendMessageToParent(apiVersionTag, 'tasks.completeTask', [
        result,
        appIds ? (Array.isArray(appIds) ? appIds : [appIds]) : [],
    ]);
}
/**
 * This group of capabilities enables apps to show modal dialogs. There are two primary types of dialogs: URL-based dialogs and [Adaptive Card](https://learn.microsoft.com/adaptive-cards/) dialogs.
 * Both types of dialogs are shown on top of your app, preventing interaction with your app while they are displayed.
 * - URL-based dialogs allow you to specify a URL from which the contents will be shown inside the dialog.
 *   - For URL dialogs, use the functions and interfaces in the {@link dialog.url} namespace.
 * - Adaptive Card-based dialogs allow you to provide JSON describing an Adaptive Card that will be shown inside the dialog.
 *   - For Adaptive Card dialogs, use the functions and interfaces in the {@link dialog.adaptiveCard} namespace.
 *
 * @remarks Note that dialogs were previously called "task modules". While they have been renamed for clarity, the functionality has been maintained.
 * For more details, see [Dialogs](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/what-are-task-modules)
 *
 * @beta
 */
var dialog;
(function (dialog) {
    const storedMessages = [];
    /**
     * @hidden
     * Hide from docs because this function is only used during initialization
     *
     * Adds register handlers for messageForChild upon initialization and only in the tasks FrameContext. {@link FrameContexts.task}
     * Function is called during app initialization
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function initialize() {
        registerHandler(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.registerMessageForChildHandler" /* ApiName.Dialog_RegisterMessageForChildHandler */), 'messageForChild', handleDialogMessage, false);
    }
    dialog.initialize = initialize;
    function handleDialogMessage(message) {
        if (!GlobalVars.frameContext) {
            // GlobalVars.frameContext is currently not set
            return;
        }
        if (GlobalVars.frameContext === FrameContexts.task) {
            storedMessages.push(message);
        }
        else {
            // Not in task FrameContext, remove 'messageForChild' handler
            removeHandler('messageForChild');
        }
    }
    let url;
    (function (url) {
        /**
         * Allows app to open a url based dialog.
         *
         * @remarks
         * This function cannot be called from inside of a dialog
         *
         * @param urlDialogInfo - An object containing the parameters of the dialog module.
         * @param submitHandler - Handler that triggers when a dialog calls the {@linkcode submit} function or when the user closes the dialog.
         * @param messageFromChildHandler - Handler that triggers if dialog sends a message to the app.
         *
         * @beta
         */
        function open(urlDialogInfo, submitHandler, messageFromChildHandler) {
            urlOpenHelper(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.open" /* ApiName.Dialog_Url_Open */), urlDialogInfo, submitHandler, messageFromChildHandler);
        }
        url.open = open;
        /**
         * Submit the dialog module and close the dialog
         *
         * @remarks
         * This function is only intended to be called from code running within the dialog. Calling it from outside the dialog will have no effect.
         *
         * @param result - The result to be sent to the bot or the app. Typically a JSON object or a serialized version of it,
         *  If this function is called from a dialog while {@link M365ContentAction} is set in the context object by the host, result will be ignored
         *
         * @param appIds - Valid application(s) that can receive the result of the submitted dialogs. Specifying this parameter helps prevent malicious apps from retrieving the dialog result. Multiple app IDs can be specified because a web app from a single underlying domain can power multiple apps across different environments and branding schemes.
         *
         * @beta
         */
        function submit(result, appIds) {
            urlSubmitHelper(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.submit" /* ApiName.Dialog_Url_Submit */), result, appIds);
        }
        url.submit = submit;
        /**
         * Subcapability that allows communication between the dialog and the parent app.
         *
         * @remarks
         * Note that dialog can be invoked from parentless scenarios e.g. Search Message Extensions. The subcapability `parentCommunication` is not supported in such scenarios.
         *
         * @beta
         */
        let parentCommunication;
        (function (parentCommunication) {
            /**
             *  Send message to the parent from dialog
             *
             * @remarks
             * This function is only intended to be called from code running within the dialog. Calling it from outside the dialog will have no effect.
             *
             * @param message - The message to send to the parent
             *
             * @beta
             */
            function sendMessageToParentFromDialog(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message) {
                ensureInitialized(runtime, FrameContexts.task);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                sendMessageToParent(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.parentCommunication.sendMessageToParentFromDialog" /* ApiName.Dialog_Url_ParentCommunication_SendMessageToParentFromDialog */), 'messageForParent', [message]);
            }
            parentCommunication.sendMessageToParentFromDialog = sendMessageToParentFromDialog;
            /**
             *  Send message to the dialog from the parent
             *
             * @param message - The message to send
             *
             * @beta
             */
            function sendMessageToDialog(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            message) {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                sendMessageToParent(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.parentCommunication.sendMessageToDialog" /* ApiName.Dialog_Url_ParentCommunication_SendMessageToDialog */), 'messageForChild', [message]);
            }
            parentCommunication.sendMessageToDialog = sendMessageToDialog;
            /**
             * Register a listener that will be triggered when a message is received from the app that opened the dialog.
             *
             * @remarks
             * This function is only intended to be called from code running within the dialog. Calling it from outside the dialog will have no effect.
             *
             * @param listener - The listener that will be triggered.
             *
             * @beta
             */
            function registerOnMessageFromParent(listener) {
                ensureInitialized(runtime, FrameContexts.task);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                // We need to remove the original 'messageForChild'
                // handler since the original does not allow for post messages.
                // It is replaced by the user specified listener that is passed in.
                removeHandler('messageForChild');
                registerHandler(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.parentCommunication.registerMessageForChildHandler" /* ApiName.Dialog_Url_ParentCommunication_RegisterMessageForChildHandler */), 'messageForChild', listener);
                storedMessages.reverse();
                while (storedMessages.length > 0) {
                    const message = storedMessages.pop();
                    listener(message);
                }
            }
            parentCommunication.registerOnMessageFromParent = registerOnMessageFromParent;
            /**
             * Checks if dialog.url.parentCommunication capability is supported by the host
             *
             * @returns boolean to represent whether dialog.url.parentCommunication capability is supported
             *
             * @throws Error if {@linkcode app.initialize} has not successfully completed
             *
             * @beta
             */
            function isSupported() {
                var _a, _b;
                return ensureInitialized(runtime) && !!((_b = (_a = runtime.supports.dialog) === null || _a === void 0 ? void 0 : _a.url) === null || _b === void 0 ? void 0 : _b.parentCommunication);
            }
            parentCommunication.isSupported = isSupported;
        })(parentCommunication = url.parentCommunication || (url.parentCommunication = {}));
        /**
         * Checks if dialog.url module is supported by the host
         *
         * @returns boolean to represent whether dialog.url module is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @beta
         */
        function isSupported() {
            return ensureInitialized(runtime) && (runtime.supports.dialog && runtime.supports.dialog.url) !== undefined;
        }
        url.isSupported = isSupported;
        /**
         * Namespace to open a dialog that sends results to the bot framework
         *
         * @beta
         */
        let bot;
        (function (bot) {
            /**
             * Allows an app to open a dialog that sends submitted data to a bot.
             *
             * @param botUrlDialogInfo - An object containing the parameters of the dialog module including completionBotId.
             * @param submitHandler - Handler that triggers when the dialog has been submitted or closed.
             * @param messageFromChildHandler - Handler that triggers if dialog sends a message to the app.
             *
             * @returns a function that can be used to send messages to the dialog.
             *
             * @beta
             */
            function open(botUrlDialogInfo, submitHandler, messageFromChildHandler) {
                botUrlOpenHelper(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.url.bot.open" /* ApiName.Dialog_Url_Bot_Open */), botUrlDialogInfo, submitHandler, messageFromChildHandler);
            }
            bot.open = open;
            /**
             * Checks if dialog.url.bot capability is supported by the host
             *
             * @returns boolean to represent whether dialog.url.bot is supported
             *
             * @throws Error if {@linkcode app.initialize} has not successfully completed
             *
             * @beta
             */
            function isSupported() {
                return (ensureInitialized(runtime) &&
                    (runtime.supports.dialog && runtime.supports.dialog.url && runtime.supports.dialog.url.bot) !== undefined);
            }
            bot.isSupported = isSupported;
        })(bot = url.bot || (url.bot = {}));
        /**
         * @hidden
         *
         * Convert UrlDialogInfo to DialogInfo to send the information to host in {@linkcode open} API.
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function getDialogInfoFromUrlDialogInfo(urlDialogInfo) {
            const dialogInfo = {
                url: urlDialogInfo.url,
                height: urlDialogInfo.size ? urlDialogInfo.size.height : DialogDimension.Small,
                width: urlDialogInfo.size ? urlDialogInfo.size.width : DialogDimension.Small,
                title: urlDialogInfo.title,
                fallbackUrl: urlDialogInfo.fallbackUrl,
            };
            return dialogInfo;
        }
        url.getDialogInfoFromUrlDialogInfo = getDialogInfoFromUrlDialogInfo;
        /**
         * @hidden
         *
         * Convert BotUrlDialogInfo to DialogInfo to send the information to host in {@linkcode bot.open} API.
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function getDialogInfoFromBotUrlDialogInfo(botUrlDialogInfo) {
            const dialogInfo = getDialogInfoFromUrlDialogInfo(botUrlDialogInfo);
            dialogInfo.completionBotId = botUrlDialogInfo.completionBotId;
            return dialogInfo;
        }
        url.getDialogInfoFromBotUrlDialogInfo = getDialogInfoFromBotUrlDialogInfo;
    })(url = dialog.url || (dialog.url = {}));
    /**
     * This function currently serves no purpose and should not be used. All functionality that used
     * to be covered by this method is now in subcapabilities and those isSupported methods should be
     * used directly.
     *
     * @hidden
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.dialog ? true : false;
    }
    dialog.isSupported = isSupported;
    /**
     * Namespace to update the dialog
     *
     * @beta
     */
    let update;
    (function (update) {
        /**
         * Update dimensions - height/width of a dialog.
         *
         * @param dimensions - An object containing width and height properties.
         *
         * @beta
         */
        function resize(dimensions) {
            updateResizeHelper(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.update.resize" /* ApiName.Dialog_Update_Resize */), dimensions);
        }
        update.resize = resize;
        /**
         * Checks if dialog.update capability is supported by the host
         * @returns boolean to represent whether dialog.update capabilty is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @beta
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.dialog
                ? runtime.supports.dialog.update
                    ? true
                    : false
                : false;
        }
        update.isSupported = isSupported;
    })(update = dialog.update || (dialog.update = {}));
    /**
     * Subcapability for interacting with adaptive card dialogs
     * @beta
     */
    let adaptiveCard;
    (function (adaptiveCard) {
        /**
         * Allows app to open an adaptive card based dialog.
         *
         * @remarks
         * This function cannot be called from inside of a dialog
         *
         * @param adaptiveCardDialogInfo - An object containing the parameters of the dialog module {@link AdaptiveCardDialogInfo}.
         * @param submitHandler - Handler that triggers when a dialog calls the {@linkcode url.submit} function or when the user closes the dialog.
         *
         * @beta
         */
        function open(adaptiveCardDialogInfo, submitHandler) {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            const dialogInfo = getDialogInfoFromAdaptiveCardDialogInfo(adaptiveCardDialogInfo);
            sendMessageToParent(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.adaptiveCard.open" /* ApiName.Dialog_AdaptiveCard_Open */), 'tasks.startTask', [dialogInfo], (err, result) => {
                submitHandler === null || submitHandler === void 0 ? void 0 : submitHandler({ err, result });
            });
        }
        adaptiveCard.open = open;
        /**
         * Checks if dialog.adaptiveCard module is supported by the host
         *
         * @returns boolean to represent whether dialog.adaptiveCard module is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @beta
         */
        function isSupported() {
            const isAdaptiveCardVersionSupported = runtime.hostVersionsInfo &&
                runtime.hostVersionsInfo.adaptiveCardSchemaVersion &&
                !isHostAdaptiveCardSchemaVersionUnsupported(runtime.hostVersionsInfo.adaptiveCardSchemaVersion);
            return (ensureInitialized(runtime) &&
                (isAdaptiveCardVersionSupported && runtime.supports.dialog && runtime.supports.dialog.card) !== undefined);
        }
        adaptiveCard.isSupported = isSupported;
        /**
         * Namespace for interaction with adaptive card dialogs that need to communicate with the bot framework
         *
         * @beta
         */
        let bot;
        (function (bot) {
            /**
             * Allows an app to open an adaptive card-based dialog module using bot.
             *
             * @param botAdaptiveCardDialogInfo - An object containing the parameters of the dialog module including completionBotId.
             * @param submitHandler - Handler that triggers when the dialog has been submitted or closed.
             *
             * @beta
             */
            function open(botAdaptiveCardDialogInfo, submitHandler) {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                const dialogInfo = getDialogInfoFromBotAdaptiveCardDialogInfo(botAdaptiveCardDialogInfo);
                sendMessageToParent(getApiVersionTag(dialogTelemetryVersionNumber, "dialog.adaptiveCard.bot.open" /* ApiName.Dialog_AdaptiveCard_Bot_Open */), 'tasks.startTask', [dialogInfo], (err, result) => {
                    submitHandler === null || submitHandler === void 0 ? void 0 : submitHandler({ err, result });
                });
            }
            bot.open = open;
            /**
             * Checks if dialog.adaptiveCard.bot capability is supported by the host
             *
             * @returns boolean to represent whether dialog.adaptiveCard.bot is supported
             *
             * @throws Error if {@linkcode app.initialize} has not successfully completed
             *
             * @beta
             */
            function isSupported() {
                const isAdaptiveCardVersionSupported = runtime.hostVersionsInfo &&
                    runtime.hostVersionsInfo.adaptiveCardSchemaVersion &&
                    !isHostAdaptiveCardSchemaVersionUnsupported(runtime.hostVersionsInfo.adaptiveCardSchemaVersion);
                return (ensureInitialized(runtime) &&
                    (isAdaptiveCardVersionSupported &&
                        runtime.supports.dialog &&
                        runtime.supports.dialog.card &&
                        runtime.supports.dialog.card.bot) !== undefined);
            }
            bot.isSupported = isSupported;
        })(bot = adaptiveCard.bot || (adaptiveCard.bot = {}));
        /**
         * @hidden
         * Hide from docs
         * --------
         * Convert AdaptiveCardDialogInfo to DialogInfo to send the information to host in {@linkcode adaptiveCard.open} API.
         *
         * @internal
         */
        function getDialogInfoFromAdaptiveCardDialogInfo(adaptiveCardDialogInfo) {
            const dialogInfo = {
                card: adaptiveCardDialogInfo.card,
                height: adaptiveCardDialogInfo.size ? adaptiveCardDialogInfo.size.height : DialogDimension.Small,
                width: adaptiveCardDialogInfo.size ? adaptiveCardDialogInfo.size.width : DialogDimension.Small,
                title: adaptiveCardDialogInfo.title,
            };
            return dialogInfo;
        }
        /**
         * @hidden
         * Hide from docs
         * --------
         * Convert BotAdaptiveCardDialogInfo to DialogInfo to send the information to host in {@linkcode adaptiveCard.open} API.
         *
         * @internal
         */
        function getDialogInfoFromBotAdaptiveCardDialogInfo(botAdaptiveCardDialogInfo) {
            const dialogInfo = getDialogInfoFromAdaptiveCardDialogInfo(botAdaptiveCardDialogInfo);
            dialogInfo.completionBotId = botAdaptiveCardDialogInfo.completionBotId;
            return dialogInfo;
        }
    })(adaptiveCard = dialog.adaptiveCard || (dialog.adaptiveCard = {}));
})(dialog || (dialog = {}));

;// ./src/public/menus.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const menuTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to interact with the menu-specific part of the SDK.
 * This object is used to show View Configuration, Action Menu and Navigation Bar Menu.
 */
var menus;
(function (menus) {
    /**
     * Defines how a menu item should appear in the NavBar.
     */
    let DisplayMode;
    (function (DisplayMode) {
        /**
         * Only place this item in the NavBar if there's room for it.
         * If there's no room, item is shown in the overflow menu.
         */
        DisplayMode[DisplayMode["ifRoom"] = 0] = "ifRoom";
        /**
         * Never place this item in the NavBar.
         * The item would always be shown in NavBar's overflow menu.
         */
        DisplayMode[DisplayMode["overflowOnly"] = 1] = "overflowOnly";
    })(DisplayMode = menus.DisplayMode || (menus.DisplayMode = {}));
    /**
     * @hidden
     * Represents information about menu item for Action Menu and Navigation Bar Menu.
     */
    class MenuItem {
        constructor() {
            /**
             * @hidden
             * State of the menu item
             */
            this.enabled = true;
            /**
             * @hidden
             * Whether the menu item is selected or not
             */
            this.selected = false;
        }
    }
    menus.MenuItem = MenuItem;
    /**
     * @hidden
     * Represents information about type of list to display in Navigation Bar Menu.
     */
    let MenuListType;
    (function (MenuListType) {
        MenuListType["dropDown"] = "dropDown";
        MenuListType["popOver"] = "popOver";
    })(MenuListType = menus.MenuListType || (menus.MenuListType = {}));
    let navBarMenuItemPressHandler;
    let actionMenuItemPressHandler;
    let viewConfigItemPressHandler;
    /**
     * @hidden
     * Register navBarMenuItemPress, actionMenuItemPress, setModuleView handlers.
     *
     * @internal
     * Limited to Microsoft-internal use.
     */
    function initialize() {
        registerHandler(getApiVersionTag(menuTelemetryVersionNumber, "menus.registerNavBarMenuItemPressHandler" /* ApiName.Menus_RegisterNavBarMenuItemPressHandler */), 'navBarMenuItemPress', handleNavBarMenuItemPress, false);
        registerHandler(getApiVersionTag(menuTelemetryVersionNumber, "menus.registerActionMenuItemPressHandler" /* ApiName.Menus_RegisterActionMenuItemPressHandler */), 'actionMenuItemPress', handleActionMenuItemPress, false);
        registerHandler(getApiVersionTag(menuTelemetryVersionNumber, "menus.registerSetModuleViewHandler" /* ApiName.Menus_RegisterSetModuleViewHandler */), 'setModuleView', handleViewConfigItemPress, false);
    }
    menus.initialize = initialize;
    /**
     * @hidden
     * Registers list of view configurations and it's handler.
     * Handler is responsible for listening selection of View Configuration.
     *
     * @param viewConfig - List of view configurations. Minimum 1 value is required.
     * @param handler - The handler to invoke when the user selects view configuration.
     */
    function setUpViews(viewConfig, handler) {
        ensureInitialized(runtime);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        viewConfigItemPressHandler = handler;
        sendMessageToParent(getApiVersionTag(menuTelemetryVersionNumber, "menus.setUpViews" /* ApiName.Menus_SetUpViews */), 'setUpViews', [
            viewConfig,
        ]);
    }
    menus.setUpViews = setUpViews;
    function handleViewConfigItemPress(id) {
        if (!viewConfigItemPressHandler || !viewConfigItemPressHandler(id)) {
            ensureInitialized(runtime);
            sendMessageToParent(getApiVersionTag(menuTelemetryVersionNumber, "menus.handleViewConfigItemPress" /* ApiName.Menus_HandleViewConfigItemPress */), 'viewConfigItemPress', [id]);
        }
    }
    /**
     * @hidden
     * Used to set menu items on the Navigation Bar. If icon is available, icon will be shown, otherwise title will be shown.
     *
     * @param items List of MenuItems for Navigation Bar Menu.
     * @param handler The handler to invoke when the user selects menu item.
     */
    function setNavBarMenu(items, handler) {
        ensureInitialized(runtime);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        navBarMenuItemPressHandler = handler;
        sendMessageToParent(getApiVersionTag(menuTelemetryVersionNumber, "menus.setNavBarMenu" /* ApiName.Menus_SetNavBarMenu */), 'setNavBarMenu', [
            items,
        ]);
    }
    menus.setNavBarMenu = setNavBarMenu;
    function handleNavBarMenuItemPress(id) {
        if (!navBarMenuItemPressHandler || !navBarMenuItemPressHandler(id)) {
            ensureInitialized(runtime);
            sendMessageToParent(getApiVersionTag(menuTelemetryVersionNumber, "menus.handleNavBarMenuItemPress" /* ApiName.Menus_HandleNavBarMenuItemPress */), 'handleNavBarMenuItemPress', [id]);
        }
    }
    /**
     * @hidden
     * Used to show Action Menu.
     *
     * @param params - Parameters for Menu Parameters
     * @param handler - The handler to invoke when the user selects menu item.
     */
    function showActionMenu(params, handler) {
        ensureInitialized(runtime);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        actionMenuItemPressHandler = handler;
        sendMessageToParent(getApiVersionTag(menuTelemetryVersionNumber, "menus.showActionMenu" /* ApiName.Menus_ShowActionMenu */), 'showActionMenu', [
            params,
        ]);
    }
    menus.showActionMenu = showActionMenu;
    function handleActionMenuItemPress(id) {
        if (!actionMenuItemPressHandler || !actionMenuItemPressHandler(id)) {
            ensureInitialized(runtime);
            sendMessageToParent(getApiVersionTag(menuTelemetryVersionNumber, "menus.handleActionMenuItemPress" /* ApiName.Menus_HandleActionMenuItemPress */), 'handleActionMenuItemPress', [id]);
        }
    }
    /**
     * Checks if the menus capability is supported by the host
     * @returns boolean to represent whether the menus capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.menus ? true : false;
    }
    menus.isSupported = isSupported;
})(menus || (menus = {}));

;// ./src/public/app.ts
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */



 // Conflict with some names














/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const appTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Number of milliseconds we'll give the initialization call to return before timing it out
 */
const initializationTimeoutInMs = 5000;
const appLogger = getLogger('app');
function appInitializeHelper(apiVersionTag, validMessageOrigins) {
    if (!inServerSideRenderingEnvironment()) {
        return runWithTimeout(() => initializeHelper(apiVersionTag, validMessageOrigins), initializationTimeoutInMs, new Error('SDK initialization timed out.'));
    }
    else {
        const initializeLogger = appLogger.extend('initialize');
        // This log statement should NEVER actually be written. This code path exists only to enable compilation in server-side rendering environments.
        // If you EVER see this statement in ANY log file, something has gone horribly wrong and a bug needs to be filed.
        initializeLogger('window object undefined at initialization');
        return Promise.resolve();
    }
}
function notifyAppLoadedHelper(apiVersionTag) {
    sendMessageToParent(apiVersionTag, app.Messages.AppLoaded, [version]);
}
function notifyExpectedFailureHelper(apiVersionTag, expectedFailureRequest) {
    sendMessageToParent(apiVersionTag, app.Messages.ExpectedFailure, [
        expectedFailureRequest.reason,
        expectedFailureRequest.message,
    ]);
}
function notifyFailureHelper(apiVersiontag, appInitializationFailedRequest) {
    sendMessageToParent(apiVersiontag, app.Messages.Failure, [
        appInitializationFailedRequest.reason,
        appInitializationFailedRequest.message,
    ]);
}
function notifySuccessHelper(apiVersionTag) {
    sendMessageToParent(apiVersionTag, app.Messages.Success, [version]);
}
const initializeHelperLogger = appLogger.extend('initializeHelper');
function initializeHelper(apiVersionTag, validMessageOrigins) {
    return new Promise((resolve) => {
        // Independent components might not know whether the SDK is initialized so might call it to be safe.
        // Just no-op if that happens to make it easier to use.
        if (!GlobalVars.initializeCalled) {
            GlobalVars.initializeCalled = true;
            initializeHandlers();
            GlobalVars.initializePromise = initializeCommunication(validMessageOrigins, apiVersionTag).then(({ context, clientType, runtimeConfig, clientSupportedSDKVersion = defaultSDKVersionForCompatCheck }) => {
                GlobalVars.frameContext = context;
                GlobalVars.hostClientType = clientType;
                GlobalVars.clientSupportedSDKVersion = clientSupportedSDKVersion;
                // Temporary workaround while the Host is updated with the new argument order.
                // For now, we might receive any of these possibilities:
                // - `runtimeConfig` in `runtimeConfig` and `clientSupportedSDKVersion` in `clientSupportedSDKVersion`.
                // - `runtimeConfig` in `clientSupportedSDKVersion` and `clientSupportedSDKVersion` in `runtimeConfig`.
                // - `clientSupportedSDKVersion` in `runtimeConfig` and no `clientSupportedSDKVersion`.
                // This code supports any of these possibilities
                // Teams AppHost won't provide this runtime config
                // so we assume that if we don't have it, we must be running in Teams.
                // After Teams updates its client code, we can remove this default code.
                try {
                    initializeHelperLogger('Parsing %s', runtimeConfig);
                    const givenRuntimeConfig = JSON.parse(runtimeConfig);
                    initializeHelperLogger('Checking if %o is a valid runtime object', givenRuntimeConfig !== null && givenRuntimeConfig !== void 0 ? givenRuntimeConfig : 'null');
                    // Check that givenRuntimeConfig is a valid instance of IBaseRuntime
                    if (!givenRuntimeConfig || !givenRuntimeConfig.apiVersion) {
                        throw new Error('Received runtime config is invalid');
                    }
                    runtimeConfig && applyRuntimeConfig(givenRuntimeConfig);
                }
                catch (e) {
                    if (e instanceof SyntaxError) {
                        try {
                            initializeHelperLogger('Attempting to parse %s as an SDK version', runtimeConfig);
                            // if the given runtime config was actually meant to be a SDK version, store it as such.
                            // TODO: This is a temporary workaround to allow Teams to store clientSupportedSDKVersion even when
                            // it doesn't provide the runtimeConfig. After Teams updates its client code, we should
                            // remove this feature.
                            if (!isNaN(compareSDKVersions(runtimeConfig, defaultSDKVersionForCompatCheck))) {
                                GlobalVars.clientSupportedSDKVersion = runtimeConfig;
                            }
                            const givenRuntimeConfig = JSON.parse(clientSupportedSDKVersion);
                            initializeHelperLogger('givenRuntimeConfig parsed to %o', givenRuntimeConfig !== null && givenRuntimeConfig !== void 0 ? givenRuntimeConfig : 'null');
                            if (!givenRuntimeConfig) {
                                throw new Error('givenRuntimeConfig string was successfully parsed. However, it parsed to value of null');
                            }
                            else {
                                applyRuntimeConfig(givenRuntimeConfig);
                            }
                        }
                        catch (e) {
                            if (e instanceof SyntaxError) {
                                applyRuntimeConfig(generateVersionBasedTeamsRuntimeConfig(GlobalVars.clientSupportedSDKVersion, versionAndPlatformAgnosticTeamsRuntimeConfig, mapTeamsVersionToSupportedCapabilities));
                            }
                            else {
                                throw e;
                            }
                        }
                    }
                    else {
                        // If it's any error that's not a JSON parsing error, we want the program to fail.
                        throw e;
                    }
                }
                GlobalVars.initializeCompleted = true;
            });
            authentication.initialize();
            menus.initialize();
            pages.config.initialize();
            dialog.initialize();
        }
        // Handle additional valid message origins if specified
        if (Array.isArray(validMessageOrigins)) {
            processAdditionalValidOrigins(validMessageOrigins);
        }
        if (GlobalVars.initializePromise !== undefined) {
            resolve(GlobalVars.initializePromise);
        }
        else {
            initializeHelperLogger('GlobalVars.initializePromise is unexpectedly undefined');
        }
    });
}
function registerOnThemeChangeHandlerHelper(apiVersionTag, handler) {
    // allow for registration cleanup even when not called initialize
    !isNullOrUndefined(handler) && ensureInitializeCalled();
    registerOnThemeChangeHandler(apiVersionTag, handler);
}
function openLinkHelper(apiVersionTag, deepLink) {
    return new Promise((resolve) => {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
        resolve(sendAndHandleStatusAndReason(apiVersionTag, 'executeDeepLink', deepLink));
    });
}
/**
 * Namespace to interact with app initialization and lifecycle.
 */
var app;
(function (app) {
    const appLogger = getLogger('app');
    // ::::::::::::::::::::::: MicrosoftTeams client SDK public API ::::::::::::::::::::
    /** App Initialization Messages */
    app.Messages = {
        /** App loaded. */
        AppLoaded: 'appInitialization.appLoaded',
        /** App initialized successfully. */
        Success: 'appInitialization.success',
        /** App initialization failed. */
        Failure: 'appInitialization.failure',
        /** App initialization expected failure. */
        ExpectedFailure: 'appInitialization.expectedFailure',
    };
    /**
     * Describes errors that caused app initialization to fail
     */
    let FailedReason;
    (function (FailedReason) {
        /**
         * Authentication failed
         */
        FailedReason["AuthFailed"] = "AuthFailed";
        /**
         * The application timed out
         */
        FailedReason["Timeout"] = "Timeout";
        /**
         * The app failed for a different reason
         */
        FailedReason["Other"] = "Other";
    })(FailedReason = app.FailedReason || (app.FailedReason = {}));
    /**
     * Describes expected errors that occurred during an otherwise successful
     * app initialization
     */
    let ExpectedFailureReason;
    (function (ExpectedFailureReason) {
        /**
         * There was a permission error
         */
        ExpectedFailureReason["PermissionError"] = "PermissionError";
        /**
         * The item was not found
         */
        ExpectedFailureReason["NotFound"] = "NotFound";
        /**
         * The network is currently throttled
         */
        ExpectedFailureReason["Throttling"] = "Throttling";
        /**
         * The application is currently offline
         */
        ExpectedFailureReason["Offline"] = "Offline";
        /**
         * The app failed for a different reason
         */
        ExpectedFailureReason["Other"] = "Other";
    })(ExpectedFailureReason = app.ExpectedFailureReason || (app.ExpectedFailureReason = {}));
    /**
     * Checks whether the Teams client SDK has been initialized.
     * @returns whether the Teams client SDK has been initialized.
     */
    function isInitialized() {
        return GlobalVars.initializeCompleted;
    }
    app.isInitialized = isInitialized;
    /**
     * Gets the Frame Context that the App is running in. See {@link FrameContexts} for the list of possible values.
     * @returns the Frame Context.
     */
    function getFrameContext() {
        return GlobalVars.frameContext;
    }
    app.getFrameContext = getFrameContext;
    function logWhereTeamsJsIsBeingUsed() {
        if (inServerSideRenderingEnvironment()) {
            return;
        }
        const scripts = document.getElementsByTagName('script');
        // This will always be the current script because browsers load and execute scripts in order.
        // Whenever a script is executing for the first time it will be the last script in this array.
        const currentScriptSrc = scripts && scripts[scripts.length - 1] && scripts[scripts.length - 1].src;
        const scriptUsageWarning = 'Today, teamsjs can only be used from a single script or you may see undefined behavior. This log line is used to help detect cases where teamsjs is loaded multiple times -- it is always written. The presence of the log itself does not indicate a multi-load situation, but multiples of these log lines will. If you would like to use teamjs from more than one script at the same time, please open an issue at https://github.com/OfficeDev/microsoft-teams-library-js/issues';
        if (!currentScriptSrc || currentScriptSrc.length === 0) {
            appLogger('teamsjs is being used from a script tag embedded directly in your html. %s', scriptUsageWarning);
        }
        else {
            appLogger('teamsjs is being used from %s. %s', currentScriptSrc, scriptUsageWarning);
        }
    }
    // This is called right away to make sure that we capture which script is being executed and important stats about the current teamsjs instance
    appLogger('teamsjs instance is version %s, starting at %s UTC (%s local)', version, new Date().toISOString(), new Date().toLocaleString());
    logWhereTeamsJsIsBeingUsed();
    /**
     * Initializes the library.
     *
     * @remarks
     * Initialize must have completed successfully (as determined by the resolved Promise) before any other library calls are made
     *
     * @param validMessageOrigins - Optionally specify a list of cross-frame message origins. This parameter is used if you know that your app
     * will be hosted on a custom domain (i.e., not a standard Microsoft 365 host like Teams, Outlook, etc.) Most apps will never need
     * to pass a value for this parameter.
     * Any domains passed in the array must have the https: protocol on the string otherwise they will be ignored. Example: https://www.example.com
     * @returns Promise that will be fulfilled when initialization has completed, or rejected if the initialization fails or times out
     */
    function initialize(validMessageOrigins) {
        prefetchOriginsFromCDN();
        return appInitializeHelper(getApiVersionTag(appTelemetryVersionNumber, "app.initialize" /* ApiName.App_Initialize */), validMessageOrigins);
    }
    app.initialize = initialize;
    /**
     * @hidden
     * Undocumented function used to set a mock window for unit tests
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function _initialize(hostWindow) {
        Communication.currentWindow = hostWindow;
    }
    app._initialize = _initialize;
    /**
     * @hidden
     * Undocumented function used to clear state between unit tests
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function _uninitialize() {
        if (!GlobalVars.initializeCalled) {
            return;
        }
        uninitializeHandlers();
        GlobalVars.initializeCalled = false;
        GlobalVars.initializeCompleted = false;
        GlobalVars.initializePromise = undefined;
        GlobalVars.additionalValidOrigins = [];
        GlobalVars.frameContext = undefined;
        GlobalVars.hostClientType = undefined;
        GlobalVars.isFramelessWindow = false;
        messageChannels.telemetry._clearTelemetryPort();
        messageChannels.dataLayer._clearDataLayerPort();
        uninitializeCommunication();
    }
    app._uninitialize = _uninitialize;
    /**
     * Retrieves the current context the frame is running in.
     *
     * @returns Promise that will resolve with the {@link app.Context} object.
     */
    function getContext() {
        return new Promise((resolve) => {
            ensureInitializeCalled();
            resolve(sendAndUnwrap(getApiVersionTag(appTelemetryVersionNumber, "app.getContext" /* ApiName.App_GetContext */), 'getContext'));
        }).then((legacyContext) => transformLegacyContextToAppContext(legacyContext)); // converts globalcontext to app.context
    }
    app.getContext = getContext;
    /**
     * Notifies the frame that app has loaded and to hide the loading indicator if one is shown.
     */
    function notifyAppLoaded() {
        ensureInitializeCalled();
        notifyAppLoadedHelper(getApiVersionTag(appTelemetryVersionNumber, "app.notifyAppLoaded" /* ApiName.App_NotifyAppLoaded */));
    }
    app.notifyAppLoaded = notifyAppLoaded;
    /**
     * Notifies the frame that app initialization is successful and is ready for user interaction.
     */
    function notifySuccess() {
        ensureInitializeCalled();
        notifySuccessHelper(getApiVersionTag(appTelemetryVersionNumber, "app.notifySuccess" /* ApiName.App_NotifySuccess */));
    }
    app.notifySuccess = notifySuccess;
    /**
     * Notifies the frame that app initialization has failed and to show an error page in its place.
     *
     * @param appInitializationFailedRequest - The failure request containing the reason for why the app failed
     * during initialization as well as an optional message.
     */
    function notifyFailure(appInitializationFailedRequest) {
        ensureInitializeCalled();
        notifyFailureHelper(getApiVersionTag(appTelemetryVersionNumber, "app.notifyFailure" /* ApiName.App_NotifyFailure */), appInitializationFailedRequest);
    }
    app.notifyFailure = notifyFailure;
    /**
     * Notifies the frame that app initialized with some expected errors.
     *
     * @param expectedFailureRequest - The expected failure request containing the reason and an optional message
     */
    function notifyExpectedFailure(expectedFailureRequest) {
        ensureInitializeCalled();
        notifyExpectedFailureHelper(getApiVersionTag(appTelemetryVersionNumber, "app.notifyExpectedFailure" /* ApiName.App_NotifyExpectedFailure */), expectedFailureRequest);
    }
    app.notifyExpectedFailure = notifyExpectedFailure;
    /**
     * Registers a handler for theme changes.
     *
     * @remarks
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler - The handler to invoke when the user changes their theme.
     */
    function registerOnThemeChangeHandler(handler) {
        registerOnThemeChangeHandlerHelper(getApiVersionTag(appTelemetryVersionNumber, "app.registerOnThemeChangeHandler" /* ApiName.App_RegisterOnThemeChangeHandler */), handler);
    }
    app.registerOnThemeChangeHandler = registerOnThemeChangeHandler;
    /**
     * This function opens deep links to other modules in the host such as chats or channels or
     * general-purpose links (to external websites). It should not be used for navigating to your
     * own or other apps.
     *
     * @remarks
     * If you need to navigate to your own or other apps, use:
     *
     * - {@link pages.currentApp.navigateToDefaultPage} for navigating to the default page of your own app
     * - {@link pages.currentApp.navigateTo} for navigating to a section of your own app
     * - {@link pages.navigateToApp} for navigating to other apps besides your own
     *
     * Many areas of functionality previously provided by deep links are now handled by strongly-typed functions in capabilities.
     * If your app is using a deep link to trigger these specific components, use the strongly-typed alternatives.
     * For example (this list is not exhaustive):
     * - To open an app installation dialog, use the {@link appInstallDialog} capability
     * - To start a call, use the {@link call} capability
     * - To open a chat, use the {@link chat} capability
     * - To open a dialog, use the {@link dialog} capability
     * - To create a new meeting, use the {@link calendar.composeMeeting} function
     * - To open a Stage View, use the {@link stageView} capability
     *
     * In each of these capabilities, you can use the `isSupported()` function to determine if the host supports that capability.
     * When using a deep link to trigger these components, there's no way to determine whether the host supports it.
     *
     * For more information on crafting deep links to the host, see [Configure deep links](https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/deep-links)
     *
     * @param deepLink The host deep link or external web URL to which to navigate
     * @returns `Promise` that will be fulfilled when the navigation has initiated. A successful `Promise` resolution
     * does not necessarily indicate whether the target loaded successfully.
     */
    function openLink(deepLink) {
        return openLinkHelper(getApiVersionTag(appTelemetryVersionNumber, "app.openLink" /* ApiName.App_OpenLink */), deepLink);
    }
    app.openLink = openLink;
    /**
     * A namespace for enabling the suspension or delayed termination of an app when the user navigates away.
     * When an app registers for the registerBeforeSuspendOrTerminateHandler, it chooses to delay termination.
     * When an app registers for both registerBeforeSuspendOrTerminateHandler and registerOnResumeHandler, it chooses the suspension of the app .
     * Please note that selecting suspension doesn't guarantee prevention of background termination.
     * The outcome is influenced by factors such as available memory and the number of suspended apps.
     *
     * @beta
     */
    let lifecycle;
    (function (lifecycle) {
        /**
         * Registers a handler to be called before the page is suspended or terminated. Once a user navigates away from an app,
         * the handler will be invoked. App developers can use this handler to save unsaved data, pause sync calls etc.
         *
         * @param handler - The handler to invoke before the page is suspended or terminated. When invoked, app can perform tasks like cleanups, logging etc.
         * Upon returning, the app will be suspended or terminated.
         *
         */
        function registerBeforeSuspendOrTerminateHandler(handler) {
            if (!handler) {
                throw new Error('[app.lifecycle.registerBeforeSuspendOrTerminateHandler] Handler cannot be null');
            }
            ensureInitialized(runtime);
            handlers_registerBeforeSuspendOrTerminateHandler(handler);
        }
        lifecycle.registerBeforeSuspendOrTerminateHandler = registerBeforeSuspendOrTerminateHandler;
        /**
         * Registers a handler to be called when the page has been requested to resume from being suspended.
         *
         * @param handler - The handler to invoke when the page is requested to be resumed. The app is supposed to navigate to
         * the appropriate page using the ResumeContext. Once done, the app should then call {@link notifySuccess}.
         *
         * @beta
         */
        function registerOnResumeHandler(handler) {
            if (!handler) {
                throw new Error('[app.lifecycle.registerOnResumeHandler] Handler cannot be null');
            }
            ensureInitialized(runtime);
            handlers_registerOnResumeHandler(handler);
        }
        lifecycle.registerOnResumeHandler = registerOnResumeHandler;
    })(lifecycle = app.lifecycle || (app.lifecycle = {}));
})(app || (app = {}));
/**
 * @hidden
 * Transforms the Legacy Context object received from Messages to the structured app.Context object
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function transformLegacyContextToAppContext(legacyContext) {
    var _a;
    const context = {
        actionInfo: legacyContext.actionInfo,
        app: {
            locale: legacyContext.locale,
            sessionId: legacyContext.appSessionId ? legacyContext.appSessionId : '',
            theme: legacyContext.theme ? legacyContext.theme : 'default',
            iconPositionVertical: legacyContext.appIconPosition,
            osLocaleInfo: legacyContext.osLocaleInfo,
            parentMessageId: legacyContext.parentMessageId,
            userClickTime: legacyContext.userClickTime,
            userFileOpenPreference: legacyContext.userFileOpenPreference,
            host: {
                name: legacyContext.hostName ? legacyContext.hostName : HostName.teams,
                clientType: legacyContext.hostClientType ? legacyContext.hostClientType : HostClientType.web,
                sessionId: legacyContext.sessionId ? legacyContext.sessionId : '',
                ringId: legacyContext.ringId,
            },
            appLaunchId: legacyContext.appLaunchId,
        },
        page: {
            id: legacyContext.entityId,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            frameContext: legacyContext.frameContext ? legacyContext.frameContext : GlobalVars.frameContext,
            subPageId: legacyContext.subEntityId,
            isFullScreen: legacyContext.isFullScreen,
            isMultiWindow: legacyContext.isMultiWindow,
            isBackgroundLoad: legacyContext.isBackgroundLoad,
            sourceOrigin: legacyContext.sourceOrigin,
        },
        user: {
            id: (_a = legacyContext.userObjectId) !== null && _a !== void 0 ? _a : '',
            displayName: legacyContext.userDisplayName,
            isCallingAllowed: legacyContext.isCallingAllowed,
            isPSTNCallingAllowed: legacyContext.isPSTNCallingAllowed,
            licenseType: legacyContext.userLicenseType,
            loginHint: legacyContext.loginHint,
            userPrincipalName: legacyContext.userPrincipalName,
            tenant: legacyContext.tid
                ? {
                    id: legacyContext.tid,
                    teamsSku: legacyContext.tenantSKU,
                }
                : undefined,
        },
        channel: legacyContext.channelId
            ? {
                id: legacyContext.channelId,
                displayName: legacyContext.channelName,
                relativeUrl: legacyContext.channelRelativeUrl,
                membershipType: legacyContext.channelType,
                defaultOneNoteSectionId: legacyContext.defaultOneNoteSectionId,
                ownerGroupId: legacyContext.hostTeamGroupId,
                ownerTenantId: legacyContext.hostTeamTenantId,
            }
            : undefined,
        chat: legacyContext.chatId
            ? {
                id: legacyContext.chatId,
            }
            : undefined,
        meeting: legacyContext.meetingId
            ? {
                id: legacyContext.meetingId,
            }
            : undefined,
        sharepoint: legacyContext.sharepoint,
        team: legacyContext.teamId
            ? {
                internalId: legacyContext.teamId,
                displayName: legacyContext.teamName,
                type: legacyContext.teamType,
                groupId: legacyContext.groupId,
                templateId: legacyContext.teamTemplateId,
                isArchived: legacyContext.isTeamArchived,
                userRole: legacyContext.userTeamRole,
            }
            : undefined,
        sharePointSite: legacyContext.teamSiteUrl ||
            legacyContext.teamSiteDomain ||
            legacyContext.teamSitePath ||
            legacyContext.mySitePath ||
            legacyContext.mySiteDomain
            ? {
                teamSiteUrl: legacyContext.teamSiteUrl,
                teamSiteDomain: legacyContext.teamSiteDomain,
                teamSitePath: legacyContext.teamSitePath,
                teamSiteId: legacyContext.teamSiteId,
                mySitePath: legacyContext.mySitePath,
                mySiteDomain: legacyContext.mySiteDomain,
            }
            : undefined,
        dialogParameters: legacyContext.dialogParameters || {},
    };
    return context;
}

;// ./src/public/pages.ts











/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const pagesTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
function navigateCrossDomainHelper(apiVersionTag, url) {
    return new Promise((resolve) => {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.remove, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
        if (!pages.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const errorMessage = 'Cross-origin navigation is only supported for URLs matching the pattern registered in the manifest.';
        resolve(sendAndHandleStatusAndReasonWithDefaultError(apiVersionTag, 'navigateCrossDomain', errorMessage, url));
    });
}
function backStackNavigateBackHelper(apiVersionTag) {
    return new Promise((resolve) => {
        ensureInitialized(runtime);
        if (!pages.backStack.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const errorMessage = 'Back navigation is not supported in the current client or context.';
        resolve(sendAndHandleStatusAndReasonWithDefaultError(apiVersionTag, 'navigateBack', errorMessage));
    });
}
function tabsNavigateToTabHelper(apiVersionTag, tabInstance) {
    return new Promise((resolve) => {
        ensureInitialized(runtime);
        if (!pages.tabs.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const errorMessage = 'Invalid internalTabInstanceId and/or channelId were/was provided';
        resolve(sendAndHandleStatusAndReasonWithDefaultError(apiVersionTag, 'navigateToTab', errorMessage, tabInstance));
    });
}
/**
 * @hidden
 */
function returnFocusHelper(apiVersionTag, navigateForward) {
    ensureInitialized(runtime);
    if (!pages.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    sendMessageToParent(apiVersionTag, 'returnFocus', [navigateForward]);
}
function getTabInstancesHelper(apiVersionTag, tabInstanceParameters) {
    return new Promise((resolve) => {
        ensureInitialized(runtime);
        if (!pages.tabs.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
        resolve(sendAndUnwrap(apiVersionTag, 'getTabInstances', tabInstanceParameters));
    });
}
function getMruTabInstancesHelper(apiVersionTag, tabInstanceParameters) {
    return new Promise((resolve) => {
        ensureInitialized(runtime);
        if (!pages.tabs.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
        resolve(sendAndUnwrap(apiVersionTag, 'getMruTabInstances', tabInstanceParameters));
    });
}
function shareDeepLinkHelper(apiVersionTag, deepLinkParameters) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
    if (!pages.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    sendMessageToParent(apiVersionTag, 'shareDeepLink', [
        deepLinkParameters.subPageId,
        deepLinkParameters.subPageLabel,
        deepLinkParameters.subPageWebUrl,
    ]);
}
function setCurrentFrameHelper(apiVersionTag, frameInfo) {
    ensureInitialized(runtime, FrameContexts.content);
    if (!pages.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    sendMessageToParent(apiVersionTag, 'setFrameContext', [frameInfo]);
}
function configSetValidityStateHelper(apiVersionTag, validityState) {
    ensureInitialized(runtime, FrameContexts.settings, FrameContexts.remove);
    if (!pages.config.isSupported()) {
        throw errorNotSupportedOnPlatform;
    }
    sendMessageToParent(apiVersionTag, 'settings.setValidityState', [validityState]);
}
function getConfigHelper(apiVersionTag) {
    return new Promise((resolve) => {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.settings, FrameContexts.remove, FrameContexts.sidePanel);
        if (!pages.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        resolve(sendAndUnwrap(apiVersionTag, 'settings.getSettings'));
    });
}
function configSetConfigHelper(apiVersionTag, instanceConfig) {
    return new Promise((resolve) => {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.settings, FrameContexts.sidePanel);
        if (!pages.config.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        resolve(sendAndHandleStatusAndReason(apiVersionTag, 'settings.setSettings', instanceConfig));
    });
}
/**
 * Navigation-specific part of the SDK.
 */
var pages;
(function (pages) {
    /**
     * @hidden
     * List of enter focus action items
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let EnterFocusType;
    (function (EnterFocusType) {
        /**
         * Determines the previous direction to focus in app when hot keys entered.
         */
        EnterFocusType[EnterFocusType["PreviousLandmark"] = 0] = "PreviousLandmark";
        /**
         * Determines the next direction to focus in app when hot keys entered.
         */
        EnterFocusType[EnterFocusType["NextLandmark"] = 1] = "NextLandmark";
        /**
         * Determines if the focus should go to the particular content of the app.
         * Read - Focus should go to the content of the app.
         */
        EnterFocusType[EnterFocusType["Read"] = 2] = "Read";
        /**
         * Determines if the focus should go to the particular content of the app.
         * Compose - Focus should go to the compose area (such as textbox) of the app.
         */
        EnterFocusType[EnterFocusType["Compose"] = 3] = "Compose";
    })(EnterFocusType = pages.EnterFocusType || (pages.EnterFocusType = {}));
    /**
     * Return focus action items
     */
    let ReturnFocusType;
    (function (ReturnFocusType) {
        /**
         * Determines the direction to focus in host for previous landmark.
         */
        ReturnFocusType[ReturnFocusType["PreviousLandmark"] = 0] = "PreviousLandmark";
        /**
         * Determines the direction to focus in host for next landmark.
         */
        ReturnFocusType[ReturnFocusType["NextLandmark"] = 1] = "NextLandmark";
        /**
         * Determines if the focus should go to the host's activity feed
         */
        ReturnFocusType[ReturnFocusType["GoToActivityFeed"] = 2] = "GoToActivityFeed";
    })(ReturnFocusType = pages.ReturnFocusType || (pages.ReturnFocusType = {}));
    /**
     * @hidden
     */
    function returnFocus(arg1) {
        const apiVersionTag = getApiVersionTag(pagesTelemetryVersionNumber, "pages.returnFocus" /* ApiName.Pages_ReturnFocus */);
        ensureInitialized(runtime);
        if (!pages.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (arg1 === undefined) {
            sendMessageToParent(apiVersionTag, 'returnFocus', [false]);
        }
        if (typeof arg1 === 'boolean') {
            sendMessageToParent(apiVersionTag, 'returnFocus', [arg1]);
        }
        else {
            switch (arg1) {
                case pages.ReturnFocusType.PreviousLandmark:
                case pages.ReturnFocusType.GoToActivityFeed:
                    sendMessageToParent(apiVersionTag, 'returnFocus', [false, arg1]);
                    break;
                case pages.ReturnFocusType.NextLandmark:
                    sendMessageToParent(apiVersionTag, 'returnFocus', [true, arg1]);
                    break;
            }
        }
    }
    pages.returnFocus = returnFocus;
    /**
     * @hidden
     *
     * Registers a handler for specifying focus when it passes from the host to the application.
     * On mobile hosts or hosts where there is no UI notion of "focus" the handler registered with
     * this function will never be called.
     *
     * @param handler - The handler for placing focus within the application.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerFocusEnterHandler(handler) {
        registerHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.registerFocusEnterHandler" /* ApiName.Pages_RegisterFocusEnterHandler */), 'focusEnter', handler, [], () => {
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
        });
    }
    pages.registerFocusEnterHandler = registerFocusEnterHandler;
    /**
     * Sets/Updates the current frame with new information
     *
     * @param frameInfo - Frame information containing the URL used in the iframe on reload and the URL for when the
     * user clicks 'Go To Website'
     */
    function setCurrentFrame(frameInfo) {
        setCurrentFrameHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.setCurrentFrame" /* ApiName.Pages_SetCurrentFrame */), frameInfo);
    }
    pages.setCurrentFrame = setCurrentFrame;
    /**
     * Initializes the library with context information for the frame
     *
     * @param frameInfo - Frame information containing the URL used in the iframe on reload and the URL for when the
     *  user clicks 'Go To Website'
     * @param callback - An optional callback that is executed once the application has finished initialization.
     * @param validMessageOrigins - An optional list of cross-frame message origins. They must have
     * https: protocol otherwise they will be ignored. Example: https:www.example.com
     */
    function initializeWithFrameContext(frameInfo, callback, validMessageOrigins) {
        prefetchOriginsFromCDN();
        appInitializeHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.initializeWithFrameContext" /* ApiName.Pages_InitializeWithFrameContext */), validMessageOrigins).then(() => callback && callback());
        setCurrentFrame(frameInfo);
    }
    pages.initializeWithFrameContext = initializeWithFrameContext;
    /**
     * Gets the config for the current instance.
     * @returns Promise that resolves with the {@link InstanceConfig} object.
     */
    function getConfig() {
        return getConfigHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.getConfig." /* ApiName.Pages_GetConfig */));
    }
    pages.getConfig = getConfig;
    /**
     * @deprecated
     * As of 2.0.0, this API is deprecated and can be replaced by the standard JavaScript
     * API, window.location.href, when navigating the app to a new cross-domain URL. Any URL
     * that is redirected to must be listed in the validDomains block of the manifest. Please
     * remove any calls to this API.
     * @param url - The URL to navigate the frame to.
     * @returns Promise that resolves when the navigation has completed.
     */
    function navigateCrossDomain(url) {
        return navigateCrossDomainHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.navigateCrossDomain" /* ApiName.Pages_NavigateCrossDomain */), url);
    }
    pages.navigateCrossDomain = navigateCrossDomain;
    /**
     * Used to navigate to apps other than your own.
     *
     * If you are looking to navigate within your own app, use {@link pages.currentApp.navigateToDefaultPage} or {@link pages.currentApp.navigateTo}
     *
     * @param params Parameters for the navigation
     * @returns a `Promise` that will resolve if the navigation was successful or reject if it was not
     * @throws `Error` if the app ID is not valid or `params.webUrl` is defined but not a valid URL
     */
    function navigateToApp(params) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            const apiVersionTag = getApiVersionTag(pagesTelemetryVersionNumber, "pages.navigateToApp" /* ApiName.Pages_NavigateToApp */);
            if (runtime.isLegacyTeams) {
                const typeSafeParameters = !isAppNavigationParametersObject(params)
                    ? convertNavigateToAppParamsToAppNavigationParameters(params)
                    : params;
                resolve(sendAndHandleStatusAndReason(apiVersionTag, 'executeDeepLink', createTeamsAppLink(typeSafeParameters)));
            }
            else {
                const serializedParameters = isAppNavigationParametersObject(params)
                    ? convertAppNavigationParametersToNavigateToAppParams(params)
                    : params;
                resolve(sendAndHandleStatusAndReason(apiVersionTag, 'pages.navigateToApp', serializedParameters));
            }
        });
    }
    pages.navigateToApp = navigateToApp;
    /**
     * Shares a deep link that a user can use to navigate back to a specific state in this page.
     * Please note that this method does not yet work on mobile hosts.
     *
     * @param deepLinkParameters - ID and label for the link and fallback URL.
     */
    function shareDeepLink(deepLinkParameters) {
        return shareDeepLinkHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.shareDeepLink" /* ApiName.Pages_ShareDeepLink */), deepLinkParameters);
    }
    pages.shareDeepLink = shareDeepLink;
    /**
     * Registers a handler for changes from or to full-screen view for a tab.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * On hosts where there is no support for making an app full screen, the handler registered
     * with this function will never be called.
     * @param handler - The handler to invoke when the user toggles full-screen view for a tab.
     */
    function registerFullScreenHandler(handler) {
        registerHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.registerFullScreenHandler" /* ApiName.Pages_RegisterFullScreenHandler */), 'fullScreenChange', handler, [], () => {
            if (!isNullOrUndefined(handler) && !isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
        });
    }
    pages.registerFullScreenHandler = registerFullScreenHandler;
    /**
     * Checks if the pages capability is supported by the host
     * @returns boolean to represent whether the appEntity capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.pages ? true : false;
    }
    pages.isSupported = isSupported;
    /**
     * Provides APIs for querying and navigating between contextual tabs of an application. Unlike personal tabs,
     * contextual tabs are pages associated with a specific context, such as channel or chat.
     */
    let tabs;
    (function (tabs) {
        /**
         * Navigates the hosted application to the specified tab instance.
         * @param tabInstance - The destination tab instance.
         * @returns Promise that resolves when the navigation has completed.
         */
        function navigateToTab(tabInstance) {
            return tabsNavigateToTabHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.tabs.navigateToTab" /* ApiName.Pages_Tabs_NavigateToTab */), tabInstance);
        }
        tabs.navigateToTab = navigateToTab;
        /**
         * Retrieves application tabs for the current user.
         * If no TabInstanceParameters are passed, the application defaults to favorite teams and favorite channels.
         * @param tabInstanceParameters - An optional set of flags that specify whether to scope call to favorite teams or channels.
         * @returns Promise that resolves with the {@link TabInformation}. Contains information for the user's tabs that are owned by this application {@link TabInstance}.
         */
        function getTabInstances(tabInstanceParameters) {
            return getTabInstancesHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.tabs.getTabInstances" /* ApiName.Pages_Tabs_GetTabInstances */), tabInstanceParameters);
        }
        tabs.getTabInstances = getTabInstances;
        /**
         * Retrieves the most recently used application tabs for the current user.
         * @param tabInstanceParameters - An optional set of flags. Note this is currently ignored and kept for future use.
         * @returns Promise that resolves with the {@link TabInformation}. Contains information for the users' most recently used tabs {@link TabInstance}.
         */
        function getMruTabInstances(tabInstanceParameters) {
            return getMruTabInstancesHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.tabs.getMruTabInstances" /* ApiName.Pages_Tabs_GetMruTabInstances */), tabInstanceParameters);
        }
        tabs.getMruTabInstances = getMruTabInstances;
        /**
         * Checks if the pages.tab capability is supported by the host
         * @returns boolean to represent whether the pages.tab capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.pages
                ? runtime.supports.pages.tabs
                    ? true
                    : false
                : false;
        }
        tabs.isSupported = isSupported;
    })(tabs = pages.tabs || (pages.tabs = {}));
    /**
     * Provides APIs to interact with the configuration-specific part of the SDK.
     * This object is usable only on the configuration frame.
     */
    let config;
    (function (config) {
        let saveHandler;
        let removeHandler;
        /**
         * @hidden
         * Hide from docs because this function is only used during initialization
         *
         * Adds register handlers for settings.save and settings.remove upon initialization. Function is called in {@link app.initializeHelper}
         * @internal
         * Limited to Microsoft-internal use
         */
        function initialize() {
            registerHandler(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.registerSettingsSaveHandler" /* ApiName.Pages_Config_RegisterSettingsSaveHandler */), 'settings.save', handleSave, false);
            registerHandler(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.registerSettingsRemoveHandler" /* ApiName.Pages_Config_RegisterSettingsRemoveHandler */), 'settings.remove', handleRemove, false);
        }
        config.initialize = initialize;
        /**
         * Sets the validity state for the configuration.
         * The initial value is false, so the user cannot save the configuration until this is called with true.
         * @param validityState - Indicates whether the save or remove button is enabled for the user.
         */
        function setValidityState(validityState) {
            return configSetValidityStateHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.setValidityState" /* ApiName.Pages_Config_SetValidityState */), validityState);
        }
        config.setValidityState = setValidityState;
        /**
         * Sets the configuration for the current instance.
         * This is an asynchronous operation; calls to getConfig are not guaranteed to reflect the changed state.
         * @param instanceConfig - The desired configuration for this instance.
         * @returns Promise that resolves when the operation has completed.
         */
        function setConfig(instanceConfig) {
            return configSetConfigHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.setConfig" /* ApiName.Pages_Config_SetConfig */), instanceConfig);
        }
        config.setConfig = setConfig;
        /**
         * Registers a handler for when the user attempts to save the configuration. This handler should be used
         * to create or update the underlying resource powering the content.
         * The object passed to the handler must be used to notify whether to proceed with the save.
         * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
         * @param handler - The handler to invoke when the user selects the Save button.
         */
        function registerOnSaveHandler(handler) {
            registerOnSaveHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.registerOnSaveHandler" /* ApiName.Pages_Config_RegisterOnSaveHandler */), handler, () => {
                if (!isNullOrUndefined(handler) && !isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        config.registerOnSaveHandler = registerOnSaveHandler;
        /**
         * @hidden
         * Undocumented helper function with shared code between deprecated version and current version of the registerOnSaveHandler API.
         *
         * @internal
         * Limited to Microsoft-internal use
         *
         * @param apiVersionTag - The API version tag, which is used for telemetry, composed by API version number and source API name.
         * @param handler - The handler to invoke when the user selects the Save button.
         * @param versionSpecificHelper - The helper function containing logic pertaining to a specific version of the API.
         */
        function registerOnSaveHandlerHelper(apiVersionTag, handler, versionSpecificHelper) {
            // allow for registration cleanup even when not finished initializing
            !isNullOrUndefined(handler) && ensureInitialized(runtime, FrameContexts.settings);
            if (versionSpecificHelper) {
                versionSpecificHelper();
            }
            saveHandler = handler;
            !isNullOrUndefined(handler) && sendMessageToParent(apiVersionTag, 'registerHandler', ['save']);
        }
        config.registerOnSaveHandlerHelper = registerOnSaveHandlerHelper;
        /**
         * Registers a handler for user attempts to remove content. This handler should be used
         * to remove the underlying resource powering the content.
         * The object passed to the handler must be used to indicate whether to proceed with the removal.
         * Only one handler may be registered at a time. Subsequent registrations will override the first.
         * @param handler - The handler to invoke when the user selects the Remove button.
         */
        function registerOnRemoveHandler(handler) {
            registerOnRemoveHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.registerOnRemoveHandler" /* ApiName.Pages_Config_RegisterOnRemoveHandler */), handler, () => {
                if (!isNullOrUndefined(handler) && !isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        config.registerOnRemoveHandler = registerOnRemoveHandler;
        /**
         * @hidden
         * Undocumented helper function with shared code between deprecated version and current version of the registerOnRemoveHandler API.
         *
         * @internal
         * Limited to Microsoft-internal use
         *
         * @param apiVersionTag - The API version tag, which is used for telemetry, composed by API version number and source API name.
         * @param handler - The handler to invoke when the user selects the Remove button.
         * @param versionSpecificHelper - The helper function containing logic pertaining to a specific version of the API.
         */
        function registerOnRemoveHandlerHelper(apiVersionTag, handler, versionSpecificHelper) {
            // allow for registration cleanup even when not finished initializing
            !isNullOrUndefined(handler) && ensureInitialized(runtime, FrameContexts.remove, FrameContexts.settings);
            if (versionSpecificHelper) {
                versionSpecificHelper();
            }
            removeHandler = handler;
            !isNullOrUndefined(handler) && sendMessageToParent(apiVersionTag, 'registerHandler', ['remove']);
        }
        config.registerOnRemoveHandlerHelper = registerOnRemoveHandlerHelper;
        function handleSave(result) {
            const saveEventType = new SaveEventImpl(result);
            if (saveHandler) {
                saveHandler(saveEventType);
            }
            else if (Communication.childWindow) {
                sendMessageEventToChild('settings.save', [result]);
            }
            else {
                // If no handler is registered, we assume success.
                saveEventType.notifySuccess();
            }
        }
        /**
         * Registers a handler for when the tab configuration is changed by the user
         * @param handler - The handler to invoke when the user clicks on Settings.
         */
        function registerChangeConfigHandler(handler) {
            registerHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.config.registerChangeConfigHandler" /* ApiName.Pages_Config_RegisterChangeConfigHandler */), 'changeSettings', handler, [FrameContexts.content], () => {
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        config.registerChangeConfigHandler = registerChangeConfigHandler;
        /**
         * @hidden
         * Hide from docs, since this class is not directly used.
         */
        class SaveEventImpl {
            constructor(result) {
                this.notified = false;
                this.result = result ? result : {};
            }
            notifySuccess() {
                this.ensureNotNotified();
                sendMessageToParent(getApiVersionTag(pagesTelemetryVersionNumber, "pages.saveEvent.notifySuccess" /* ApiName.Pages_SaveEvent_NotifySuccess */), 'settings.save.success');
                this.notified = true;
            }
            notifyFailure(reason) {
                this.ensureNotNotified();
                sendMessageToParent(getApiVersionTag(pagesTelemetryVersionNumber, "pages.saveEvent.notifyFailure" /* ApiName.Pages_SaveEvent_NotifyFailure */), 'settings.save.failure', [reason]);
                this.notified = true;
            }
            ensureNotNotified() {
                if (this.notified) {
                    throw new Error('The SaveEvent may only notify success or failure once.');
                }
            }
        }
        function handleRemove() {
            const removeEventType = new RemoveEventImpl();
            if (removeHandler) {
                removeHandler(removeEventType);
            }
            else if (Communication.childWindow) {
                sendMessageEventToChild('settings.remove', []);
            }
            else {
                // If no handler is registered, we assume success.
                removeEventType.notifySuccess();
            }
        }
        /**
         * @hidden
         * Hide from docs, since this class is not directly used.
         */
        class RemoveEventImpl {
            constructor() {
                this.notified = false;
            }
            notifySuccess() {
                this.ensureNotNotified();
                sendMessageToParent(getApiVersionTag(pagesTelemetryVersionNumber, "pages.removeEvent.notifySuccess" /* ApiName.Pages_RemoveEvent_NotifySuccess */), 'settings.remove.success');
                this.notified = true;
            }
            notifyFailure(reason) {
                this.ensureNotNotified();
                sendMessageToParent(getApiVersionTag(pagesTelemetryVersionNumber, "pages.removeEvent.notifyFailure" /* ApiName.Pages_RemoveEvent_NotifyFailure */), 'settings.remove.failure', [reason]);
                this.notified = true;
            }
            ensureNotNotified() {
                if (this.notified) {
                    throw new Error('The removeEventType may only notify success or failure once.');
                }
            }
        }
        /**
         * Checks if the pages.config capability is supported by the host
         * @returns boolean to represent whether the pages.config capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.pages
                ? runtime.supports.pages.config
                    ? true
                    : false
                : false;
        }
        config.isSupported = isSupported;
    })(config = pages.config || (pages.config = {}));
    /**
     * Provides APIs for handling the user's navigational history.
     */
    let backStack;
    (function (backStack) {
        let backButtonPressHandler;
        /**
         * @hidden
         * Register backButtonPress handler.
         *
         * @internal
         * Limited to Microsoft-internal use.
         */
        function _initialize() {
            registerHandler(getApiVersionTag(pagesTelemetryVersionNumber, "pages.backStack.registerBackButtonPressHandler" /* ApiName.Pages_BackStack_RegisterBackButtonPressHandler */), 'backButtonPress', handleBackButtonPress, false);
        }
        backStack._initialize = _initialize;
        /**
         * Navigates back in the hosted application. See {@link pages.backStack.registerBackButtonHandler} for notes on usage.
         * @returns Promise that resolves when the navigation has completed.
         */
        function navigateBack() {
            return backStackNavigateBackHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.backStack.navigateBack" /* ApiName.Pages_BackStack_NavigateBack */));
        }
        backStack.navigateBack = navigateBack;
        /**
         * Registers a handler for user presses of the host client's back button. Experiences that maintain an internal
         * navigation stack should use this handler to navigate the user back within their frame. If an application finds
         * that after running its back button handler it cannot handle the event it should call the navigateBack
         * method to ask the host client to handle it instead.
         * @param handler - The handler to invoke when the user presses the host client's back button.
         */
        function registerBackButtonHandler(handler) {
            registerBackButtonHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.backStack.registerBackButtonHandler" /* ApiName.Pages_BackStack_RegisterBackButtonHandler */), handler, () => {
                if (!isNullOrUndefined(handler) && !isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        backStack.registerBackButtonHandler = registerBackButtonHandler;
        /**
         * @hidden
         * Undocumented helper function with shared code between deprecated version and current version of the registerBackButtonHandler API.
         *
         * @internal
         * Limited to Microsoft-internal use
         * @param apiVersionTag - The tag indicating API version number with name
         * @param handler - The handler to invoke when the user presses the host client's back button.
         * @param versionSpecificHelper - The helper function containing logic pertaining to a specific version of the API.
         */
        function registerBackButtonHandlerHelper(apiVersionTag, handler, versionSpecificHelper) {
            // allow for registration cleanup even when not finished initializing
            !isNullOrUndefined(handler) && ensureInitialized(runtime);
            if (versionSpecificHelper) {
                versionSpecificHelper();
            }
            backButtonPressHandler = handler;
            !isNullOrUndefined(handler) && sendMessageToParent(apiVersionTag, 'registerHandler', ['backButton']);
        }
        backStack.registerBackButtonHandlerHelper = registerBackButtonHandlerHelper;
        function handleBackButtonPress() {
            if (!backButtonPressHandler || !backButtonPressHandler()) {
                if (Communication.childWindow) {
                    // If the current window did not handle it let the child window
                    sendMessageEventToChild('backButtonPress', []);
                }
                else {
                    navigateBack();
                }
            }
        }
        /**
         * Checks if the pages.backStack capability is supported by the host
         * @returns boolean to represent whether the pages.backStack capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.pages
                ? runtime.supports.pages.backStack
                    ? true
                    : false
                : false;
        }
        backStack.isSupported = isSupported;
    })(backStack = pages.backStack || (pages.backStack = {}));
    /**
     * @hidden
     * Hide from docs
     * ------
     * Provides APIs to interact with the full-trust part of the SDK. Limited to 1P applications
     * @internal
     * Limited to Microsoft-internal use
     */
    let fullTrust;
    (function (fullTrust) {
        /**
         * @hidden
         * Hide from docs
         * ------
         * Place the tab into full-screen mode.
         *
         */
        function enterFullscreen() {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            sendMessageToParent(getApiVersionTag(pagesTelemetryVersionNumber, "pages.fullTrust.enterFullscreen" /* ApiName.Pages_FullTrust_EnterFullscreen */), 'enterFullscreen', []);
        }
        fullTrust.enterFullscreen = enterFullscreen;
        /**
         * @hidden
         * Hide from docs
         * ------
         * Reverts the tab into normal-screen mode.
         */
        function exitFullscreen() {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            sendMessageToParent(getApiVersionTag(pagesTelemetryVersionNumber, "pages.fullTrust.exitFullscreen" /* ApiName.Pages_FullTrust_ExitFullscreen */), 'exitFullscreen', []);
        }
        fullTrust.exitFullscreen = exitFullscreen;
        /**
         * @hidden
         *
         * Checks if the pages.fullTrust capability is supported by the host
         * @returns boolean to represent whether the pages.fullTrust capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.pages
                ? runtime.supports.pages.fullTrust
                    ? true
                    : false
                : false;
        }
        fullTrust.isSupported = isSupported;
    })(fullTrust = pages.fullTrust || (pages.fullTrust = {}));
    /**
     * Provides APIs to interact with the app button part of the SDK.
     */
    let appButton;
    (function (appButton) {
        /**
         * Registers a handler for clicking the app button.
         * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
         * @param handler - The handler to invoke when the personal app button is clicked in the app bar.
         */
        function onClick(handler) {
            registerHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.appButton.onClick" /* ApiName.Pages_AppButton_OnClick */), 'appButtonClick', handler, [FrameContexts.content], () => {
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        appButton.onClick = onClick;
        /**
         * Registers a handler for entering hover of the app button.
         * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
         * @param handler - The handler to invoke when entering hover of the personal app button in the app bar.
         */
        function onHoverEnter(handler) {
            registerHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.appButton.onHoverEnter" /* ApiName.Pages_AppButton_OnHoverEnter */), 'appButtonHoverEnter', handler, [FrameContexts.content], () => {
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        appButton.onHoverEnter = onHoverEnter;
        /**
         * Registers a handler for exiting hover of the app button.
         * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
         * @param handler - The handler to invoke when exiting hover of the personal app button in the app bar.
         */
        function onHoverLeave(handler) {
            registerHandlerHelper(getApiVersionTag(pagesTelemetryVersionNumber, "pages.appButton.onHoverLeave" /* ApiName.Pages_AppButton_OnHoverLeave */), 'appButtonHoverLeave', handler, [FrameContexts.content], () => {
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
            });
        }
        appButton.onHoverLeave = onHoverLeave;
        /**
         * Checks if pages.appButton capability is supported by the host
         * @returns boolean to represent whether the pages.appButton capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.pages
                ? runtime.supports.pages.appButton
                    ? true
                    : false
                : false;
        }
        appButton.isSupported = isSupported;
    })(appButton = pages.appButton || (pages.appButton = {}));
    /**
     * Provides functions for navigating within your own app
     *
     * @remarks
     * If you are looking to navigate to a different app, use {@link pages.navigateToApp}.
     */
    let currentApp;
    (function (currentApp) {
        /**
         * Navigate within the currently running app
         *
         * @remarks
         * If you are looking to navigate to a different app, use {@link pages.navigateToApp}.
         *
         * @param params Parameters for the navigation
         * @returns `Promise` that will resolve if the navigation was successful and reject if not
         */
        function navigateTo(params) {
            return new Promise((resolve) => {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                resolve(sendAndHandleSdkError(getApiVersionTag(pagesTelemetryVersionNumber, "pages.currentApp.navigateTo" /* ApiName.Pages_CurrentApp_NavigateTo */), 'pages.currentApp.navigateTo', params));
            });
        }
        currentApp.navigateTo = navigateTo;
        /**
         * Navigate to the currently running app's first static page defined in the application
         * manifest.
         *
         * @returns `Promise` that will resolve if the navigation was successful and reject if not
         */
        function navigateToDefaultPage() {
            return new Promise((resolve) => {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                resolve(sendAndHandleSdkError(getApiVersionTag(pagesTelemetryVersionNumber, "pages.currentApp.navigateToDefaultPage" /* ApiName.Pages_CurrentApp_NavigateToDefaultPage */), 'pages.currentApp.navigateToDefaultPage'));
            });
        }
        currentApp.navigateToDefaultPage = navigateToDefaultPage;
        /**
         * Checks if pages.currentApp capability is supported by the host
         * @returns boolean to represent whether the pages.currentApp capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.pages
                ? runtime.supports.pages.currentApp
                    ? true
                    : false
                : false;
        }
        currentApp.isSupported = isSupported;
    })(currentApp = pages.currentApp || (pages.currentApp = {}));
})(pages || (pages = {}));
function isAppNavigationParametersObject(obj) {
    return obj.appId instanceof AppId;
}
function convertNavigateToAppParamsToAppNavigationParameters(params) {
    return Object.assign(Object.assign({}, params), { appId: new AppId(params.appId), webUrl: params.webUrl ? new URL(params.webUrl) : undefined });
}
function convertAppNavigationParametersToNavigateToAppParams(params) {
    return Object.assign(Object.assign({}, params), { appId: params.appId.toString(), webUrl: params.webUrl ? params.webUrl.toString() : undefined });
}

;// ./src/internal/handlers.ts
/* eslint-disable @typescript-eslint/ban-types */
var handlers_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const handlersLogger = getLogger('handlers');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
class HandlersPrivate {
    /**
     * @internal
     * Limited to Microsoft-internal use
     * Initializes the handlers.
     */
    static initializeHandlers() {
        // ::::::::::::::::::::MicrosoftTeams SDK Internal :::::::::::::::::
        HandlersPrivate.handlers['themeChange'] = handleThemeChange;
        HandlersPrivate.handlers['load'] = handleLoad;
        HandlersPrivate.handlers['beforeUnload'] = handleBeforeUnload;
        pages.backStack._initialize();
    }
    /**
     * @internal
     * Limited to Microsoft-internal use
     * Uninitializes the handlers.
     */
    static uninitializeHandlers() {
        HandlersPrivate.handlers = {};
        HandlersPrivate.themeChangeHandler = null;
        HandlersPrivate.loadHandler = null;
        HandlersPrivate.beforeUnloadHandler = null;
        HandlersPrivate.beforeSuspendOrTerminateHandler = null;
        HandlersPrivate.resumeHandler = null;
    }
}
HandlersPrivate.handlers = {};
HandlersPrivate.themeChangeHandler = null;
/**
 * @deprecated
 */
HandlersPrivate.loadHandler = null;
/**
 * @deprecated
 */
HandlersPrivate.beforeUnloadHandler = null;
HandlersPrivate.beforeSuspendOrTerminateHandler = null;
HandlersPrivate.resumeHandler = null;
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function initializeHandlers() {
    HandlersPrivate.initializeHandlers();
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function uninitializeHandlers() {
    HandlersPrivate.uninitializeHandlers();
}
const callHandlerLogger = handlersLogger.extend('callHandler');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function callHandler(name, args) {
    const handler = HandlersPrivate.handlers[name];
    if (handler) {
        callHandlerLogger('Invoking the registered handler for message %s with arguments %o', name, args);
        const result = handler.apply(this, args);
        return [true, result];
    }
    else if (Communication.childWindow) {
        sendMessageEventToChild(name, args);
        return [false, undefined];
    }
    else {
        callHandlerLogger('Handler for action message %s not found.', name);
        return [false, undefined];
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function registerHandler(apiVersionTag, name, handler, sendMessage = true, args = []) {
    if (handler) {
        HandlersPrivate.handlers[name] = handler;
        sendMessage && sendMessageToParent(apiVersionTag, 'registerHandler', [name, ...args]);
    }
    else {
        delete HandlersPrivate.handlers[name];
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function removeHandler(name) {
    delete HandlersPrivate.handlers[name];
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function doesHandlerExist(name) {
    return HandlersPrivate.handlers[name] != null;
}
/**
 * @hidden
 * Undocumented helper function with shared code between deprecated version and current version of register*Handler APIs
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * @param apiVersionTag - The tag of the api version and name
 * @param name - The name of the handler to register.
 * @param handler - The handler to invoke.
 * @param contexts - The context within which it is valid to register this handler.
 * @param registrationHelper - The helper function containing logic pertaining to a specific version of the API.
 */
function registerHandlerHelper(apiVersionTag, name, handler, contexts, registrationHelper) {
    // allow for registration cleanup even when not finished initializing
    handler && ensureInitialized(runtime, ...contexts);
    if (registrationHelper) {
        registrationHelper();
    }
    registerHandler(apiVersionTag, name, handler);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function registerOnThemeChangeHandler(apiVersionTag, handler) {
    HandlersPrivate.themeChangeHandler = handler;
    !isNullOrUndefined(handler) && sendMessageToParent(apiVersionTag, 'registerHandler', ['themeChange']);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handleThemeChange(theme) {
    if (HandlersPrivate.themeChangeHandler) {
        HandlersPrivate.themeChangeHandler(theme);
    }
    if (Communication.childWindow) {
        sendMessageEventToChild('themeChange', [theme]);
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * @deprecated
 */
function handlers_registerOnLoadHandler(apiVersionTag, handler) {
    HandlersPrivate.loadHandler = handler;
    !isNullOrUndefined(handler) && sendMessageToParent(apiVersionTag, 'registerHandler', ['load']);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handleLoad(loadContext) {
    const resumeContext = convertToResumeContext(loadContext);
    if (HandlersPrivate.resumeHandler) {
        HandlersPrivate.resumeHandler(resumeContext);
        if (Communication.childWindow) {
            sendMessageEventToChild('load', [resumeContext]);
        }
    }
    else if (HandlersPrivate.loadHandler) {
        HandlersPrivate.loadHandler(loadContext);
        if (Communication.childWindow) {
            sendMessageEventToChild('load', [loadContext]);
        }
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function convertToResumeContext(context) {
    return {
        entityId: context.entityId,
        contentUrl: new URL(context.contentUrl),
    };
}
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * @deprecated
 */
function handlers_registerBeforeUnloadHandler(apiVersionTag, handler) {
    HandlersPrivate.beforeUnloadHandler = handler;
    !isNullOrUndefined(handler) && sendMessageToParent(apiVersionTag, 'registerHandler', ['beforeUnload']);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handleBeforeUnload() {
    return handlers_awaiter(this, void 0, void 0, function* () {
        const readyToUnload = () => {
            sendMessageToParent(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "handleBeforeUnload" /* ApiName.HandleBeforeUnload */), 'readyToUnload', []);
        };
        if (HandlersPrivate.beforeSuspendOrTerminateHandler) {
            yield HandlersPrivate.beforeSuspendOrTerminateHandler();
            if (Communication.childWindow) {
                sendMessageEventToChild('beforeUnload');
            }
            else {
                readyToUnload();
            }
        }
        else if (!HandlersPrivate.beforeUnloadHandler || !HandlersPrivate.beforeUnloadHandler(readyToUnload)) {
            if (Communication.childWindow) {
                sendMessageEventToChild('beforeUnload');
            }
            else {
                readyToUnload();
            }
        }
    });
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handlers_registerBeforeSuspendOrTerminateHandler(handler) {
    HandlersPrivate.beforeSuspendOrTerminateHandler = handler;
    !isNullOrUndefined(handler) &&
        sendMessageToParent(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "registerBeforeSuspendOrTerminateHandler" /* ApiName.RegisterBeforeSuspendOrTerminateHandler */), 'registerHandler', ['beforeUnload']);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handlers_registerOnResumeHandler(handler) {
    HandlersPrivate.resumeHandler = handler;
    !isNullOrUndefined(handler) &&
        sendMessageToParent(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "registerOnResumeHandler" /* ApiName.RegisterOnResumeHandler */), 'registerHandler', [
            'load',
        ]);
}

;// ./src/internal/messageObjects.ts
var messageObjects_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};

const serializeMessageRequest = (message) => {
    const { uuid } = message, restOfMessage = messageObjects_rest(message, ["uuid"]);
    const uuidAsString = uuid === null || uuid === void 0 ? void 0 : uuid.toString();
    const request = Object.assign(Object.assign({}, restOfMessage), { uuidAsString: uuidAsString });
    return request;
};
const deserializeMessageRequest = (message) => {
    const { uuidAsString } = message, restOfMessage = messageObjects_rest(message, ["uuidAsString"]);
    const request = Object.assign(Object.assign({}, restOfMessage), { uuid: uuidAsString ? new UUID(uuidAsString) : undefined });
    return request;
};
const deserializeMessageResponse = (serializedResponse) => {
    const { uuidAsString } = serializedResponse, restOfResponse = messageObjects_rest(serializedResponse, ["uuidAsString"]);
    const messageResponse = Object.assign(Object.assign({}, restOfResponse), { uuid: uuidAsString ? new UUID(uuidAsString) : undefined });
    return messageResponse;
};
const serializeMessageResponse = (response) => {
    const { uuid } = response, restOfResponse = messageObjects_rest(response, ["uuid"]);
    const uuidAsString = uuid === null || uuid === void 0 ? void 0 : uuid.toString();
    const messageResponse = Object.assign(Object.assign({}, restOfResponse), { uuidAsString: uuidAsString });
    return messageResponse;
};

;// ./src/internal/nestedAppAuthUtils.ts


const nestedAppAuthLogger = getLogger('nestedAppAuthUtils');
const tryPolyfillWithNestedAppAuthBridgeLogger = nestedAppAuthLogger.extend('tryPolyfillWithNestedAppAuthBridge');
/**
 * @hidden
 * Attempt to polyfill the nestedAppAuthBridge object on the given window
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function tryPolyfillWithNestedAppAuthBridge(clientSupportedSDKVersion, window, handlers) {
    var _a;
    const logger = tryPolyfillWithNestedAppAuthBridgeLogger;
    if (GlobalVars.isFramelessWindow) {
        logger('Cannot polyfill nestedAppAuthBridge as current window is frameless');
        return;
    }
    if (!window) {
        logger('Cannot polyfill nestedAppAuthBridge as current window does not exist');
        return;
    }
    const parsedClientSupportedSDKVersion = (() => {
        try {
            return JSON.parse(clientSupportedSDKVersion);
        }
        catch (e) {
            return null;
        }
    })();
    if (!parsedClientSupportedSDKVersion || !((_a = parsedClientSupportedSDKVersion.supports) === null || _a === void 0 ? void 0 : _a.nestedAppAuth)) {
        logger('Cannot polyfill nestedAppAuthBridge as current hub does not support nested app auth');
        return;
    }
    const extendedWindow = window;
    if (extendedWindow.nestedAppAuthBridge) {
        logger('nestedAppAuthBridge already exists on current window, skipping polyfill');
        return;
    }
    const nestedAppAuthBridge = createNestedAppAuthBridge(extendedWindow, handlers);
    if (nestedAppAuthBridge) {
        extendedWindow.nestedAppAuthBridge = nestedAppAuthBridge;
    }
}
const createNestedAppAuthBridgeLogger = nestedAppAuthLogger.extend('createNestedAppAuthBridge');
/**
 * @hidden
 * Creates a bridge for nested app authentication.
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * @param {Window | null} window - The window object where the nested app authentication bridge will be created. If null, the function will log an error message and return null.
 * @returns {NestedAppAuthBridge | null} Returns an object with methods for adding and removing event listeners, and posting messages. If the provided window is null, returns null.
 *
 * @property {Function} addEventListener - Adds an event listener to the window. Only supports the 'message' event. If an unsupported event is passed, logs an error message.
 * @property {Function} postMessage - Posts a message to the window. The message should be a stringified JSON object with a messageType of 'NestedAppAuthRequest'. If the message does not meet these criteria, logs an error message.
 * @property {Function} removeEventListener - Removes an event listener from the window.
 */
function createNestedAppAuthBridge(window, bridgeHandlers) {
    const logger = createNestedAppAuthBridgeLogger;
    if (!window) {
        logger('nestedAppAuthBridge cannot be created as current window does not exist');
        return null;
    }
    const { onMessage, sendPostMessage } = bridgeHandlers;
    const nestedAppAuthBridgeHandler = (callback) => (evt) => onMessage(evt, callback);
    return {
        addEventListener: (eventName, callback) => {
            if (eventName === 'message') {
                window.addEventListener(eventName, nestedAppAuthBridgeHandler(callback));
            }
            else {
                logger(`Event ${eventName} is not supported by nestedAppAuthBridge`);
            }
        },
        postMessage: (message) => {
            // Validate that it is a valid auth bridge request message
            const parsedMessage = (() => {
                try {
                    return JSON.parse(message);
                }
                catch (e) {
                    return null;
                }
            })();
            if (!parsedMessage ||
                typeof parsedMessage !== 'object' ||
                parsedMessage.messageType !== "NestedAppAuthRequest" /* NestedAppAuthMessageEventNames.Request */) {
                logger('Unrecognized data format received by app, message being ignored. Message: %o', message);
                return;
            }
            // Post the message to the top window
            sendPostMessage(message);
        },
        removeEventListener: (eventName, callback) => {
            window.removeEventListener(eventName, nestedAppAuthBridgeHandler(callback));
        },
    };
}

;// ./src/internal/communication.ts
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable strict-null-checks/all */
var communication_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};











const communicationLogger = getLogger('communication');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
class Communication {
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
class CommunicationPrivate {
}
CommunicationPrivate.parentMessageQueue = [];
CommunicationPrivate.childMessageQueue = [];
CommunicationPrivate.topMessageQueue = [];
CommunicationPrivate.nextMessageId = 0;
CommunicationPrivate.callbacks = new Map();
CommunicationPrivate.promiseCallbacks = new Map();
CommunicationPrivate.portCallbacks = new Map();
CommunicationPrivate.legacyMessageIdsToUuidMap = {};
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function initializeCommunication(validMessageOrigins, apiVersionTag) {
    // Listen for messages post to our window
    CommunicationPrivate.messageListener = (evt) => processIncomingMessage(evt);
    // If we are in an iframe, our parent window is the one hosting us (i.e., window.parent); otherwise,
    // it's the window that opened us (i.e., window.opener)
    Communication.currentWindow = Communication.currentWindow || ssrSafeWindow();
    Communication.parentWindow =
        Communication.currentWindow.parent !== Communication.currentWindow.self
            ? Communication.currentWindow.parent
            : Communication.currentWindow.opener;
    Communication.topWindow = Communication.currentWindow.top;
    // Listen to messages from the parent or child frame.
    // Frameless windows will only receive this event from child frames and if validMessageOrigins is passed.
    if (Communication.parentWindow || validMessageOrigins) {
        Communication.currentWindow.addEventListener('message', CommunicationPrivate.messageListener, false);
    }
    if (!Communication.parentWindow) {
        const extendedWindow = Communication.currentWindow;
        if (extendedWindow.nativeInterface) {
            GlobalVars.isFramelessWindow = true;
            extendedWindow.onNativeMessage = handleIncomingMessageFromParent;
        }
        else {
            // at this point we weren't able to find a parent to talk to, no way initialization will succeed
            return Promise.reject(new Error('Initialization Failed. No Parent window found.'));
        }
    }
    try {
        // Send the initialized message to any origin, because at this point we most likely don't know the origin
        // of the parent window, and this message contains no data that could pose a security risk.
        Communication.parentOrigin = '*';
        return sendMessageToParentAsync(apiVersionTag, 'initialize', [
            version,
            latestRuntimeApiVersion,
            validMessageOrigins,
        ]).then(([context, clientType, runtimeConfig, clientSupportedSDKVersion]) => {
            tryPolyfillWithNestedAppAuthBridge(clientSupportedSDKVersion, Communication.currentWindow, {
                onMessage: processAuthBridgeMessage,
                sendPostMessage: sendNestedAuthRequestToTopWindow,
            });
            return { context, clientType, runtimeConfig, clientSupportedSDKVersion };
        });
    }
    finally {
        Communication.parentOrigin = null;
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function uninitializeCommunication() {
    if (Communication.currentWindow) {
        Communication.currentWindow.removeEventListener('message', CommunicationPrivate.messageListener, false);
    }
    Communication.currentWindow = null;
    Communication.parentWindow = null;
    Communication.parentOrigin = null;
    Communication.childWindow = null;
    Communication.childOrigin = null;
    CommunicationPrivate.parentMessageQueue = [];
    CommunicationPrivate.childMessageQueue = [];
    CommunicationPrivate.nextMessageId = 0;
    CommunicationPrivate.callbacks.clear();
    CommunicationPrivate.promiseCallbacks.clear();
    CommunicationPrivate.portCallbacks.clear();
    CommunicationPrivate.legacyMessageIdsToUuidMap = {};
}
/**
 * @hidden
 * Send a message to parent and then unwrap result. Uses nativeInterface on mobile to communicate with parent context
 * Additional apiVersionTag parameter is added, which provides the ability to send api version number to parent
 * for telemetry work.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendAndUnwrap(apiVersionTag, actionName, ...args) {
    return sendMessageToParentAsync(apiVersionTag, actionName, args).then(([result]) => result);
}
/**
 * @hidden
 * Send a message to parent and then handle status and reason. Uses nativeInterface on mobile to communicate with parent context
 * Additional apiVersionTag parameter is added, which provides the ability to send api version number to parent
 * for telemetry work.
 */
function sendAndHandleStatusAndReason(apiVersionTag, actionName, ...args) {
    return sendMessageToParentAsync(apiVersionTag, actionName, args).then(([wasSuccessful, reason]) => {
        if (!wasSuccessful) {
            throw new Error(reason);
        }
    });
}
/**
 * @hidden
 * Send a message to parent and then handle status and reason with default error. Uses nativeInterface on mobile to communicate with parent context
 * Additional apiVersionTag parameter is added, which provides the ability to send api version number to parent
 * for telemetry work.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendAndHandleStatusAndReasonWithDefaultError(apiVersionTag, actionName, defaultError, ...args) {
    return sendMessageToParentAsync(apiVersionTag, actionName, args).then(([wasSuccessful, reason]) => {
        if (!wasSuccessful) {
            throw new Error(reason ? reason : defaultError);
        }
    });
}
/**
 * @hidden
 * Send a message to parent and then handle SDK error. Uses nativeInterface on mobile to communicate with parent context
 * Additional apiVersionTag parameter is added, which provides the ability to send api version number to parent
 * for telemetry work.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendAndHandleSdkError(apiVersionTag, actionName, ...args) {
    return sendMessageToParentAsync(apiVersionTag, actionName, args).then(([error, result]) => {
        if (error) {
            throw error;
        }
        return result;
    });
}
/**
 * @hidden
 * Send a message to parent asynchronously. Uses nativeInterface on mobile to communicate with parent context
 * Additional apiVersionTag parameter is added, which provides the ability to send api version number to parent
 * for telemetry work.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendMessageToParentAsync(apiVersionTag, actionName, args = undefined) {
    if (!isFollowingApiVersionTagFormat(apiVersionTag)) {
        throw Error(`apiVersionTag: ${apiVersionTag} passed in doesn't follow the pattern starting with 'v' followed by digits, then underscore with words, please check.`);
    }
    return new Promise((resolve) => {
        const request = sendMessageToParentHelper(apiVersionTag, actionName, args);
        resolve(waitForResponse(request.uuid));
    });
}
/**
 * @hidden
 * Send a message to parent requesting a MessageChannel Port.
 * @internal
 * Limited to Microsoft-internal use
 */
function requestPortFromParentWithVersion(apiVersionTag, actionName, args = undefined) {
    if (!isFollowingApiVersionTagFormat(apiVersionTag)) {
        throw Error(`apiVersionTag: ${apiVersionTag} passed in doesn't follow the pattern starting with 'v' followed by digits, then underscore with words, please check.`);
    }
    const request = sendMessageToParentHelper(apiVersionTag, actionName, args);
    return waitForPort(request.uuid);
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function waitForPort(requestUuid) {
    return new Promise((resolve, reject) => {
        CommunicationPrivate.portCallbacks.set(requestUuid, (port, args) => {
            if (port instanceof MessagePort) {
                resolve(port);
            }
            else {
                // First arg is the error message, if present
                reject(args && args.length > 0 ? args[0] : new Error('Host responded without port or error details.'));
            }
        });
    });
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function waitForResponse(requestUuid) {
    return new Promise((resolve) => {
        CommunicationPrivate.promiseCallbacks.set(requestUuid, resolve);
    });
}
/**
 * @hidden
 * Send a message to parent. Uses nativeInterface on mobile to communicate with parent context
 * Additional apiVersionTag parameter is added, which provides the ability to send api version number to parent
 * for telemetry work.
 *
 */
function sendMessageToParent(apiVersionTag, actionName, argsOrCallback, callback) {
    let args;
    if (argsOrCallback instanceof Function) {
        callback = argsOrCallback;
    }
    else if (argsOrCallback instanceof Array) {
        args = argsOrCallback;
    }
    if (!isFollowingApiVersionTagFormat(apiVersionTag)) {
        throw Error(`apiVersionTag: ${apiVersionTag} passed in doesn't follow the pattern starting with 'v' followed by digits, then underscore with words, please check.`);
    }
    const request = sendMessageToParentHelper(apiVersionTag, actionName, args);
    if (callback) {
        CommunicationPrivate.callbacks.set(request.uuid, callback);
    }
}
const sendNestedAuthRequestToTopWindowLogger = communicationLogger.extend('sendNestedAuthRequestToTopWindow');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function sendNestedAuthRequestToTopWindow(message) {
    const logger = sendNestedAuthRequestToTopWindowLogger;
    const targetWindow = Communication.topWindow;
    const request = createNestedAppAuthRequest(message);
    logger('Message %s information: %o', getMessageIdsAsLogString(request), {
        actionName: request.func,
    });
    return sendRequestToTargetWindowHelper(targetWindow, request);
}
const sendRequestToTargetWindowHelperLogger = communicationLogger.extend('sendRequestToTargetWindowHelper');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function sendRequestToTargetWindowHelper(targetWindow, messageRequest) {
    const logger = sendRequestToTargetWindowHelperLogger;
    const targetWindowName = getTargetName(targetWindow);
    const request = serializeMessageRequest(messageRequest);
    if (GlobalVars.isFramelessWindow) {
        if (Communication.currentWindow && Communication.currentWindow.nativeInterface) {
            logger('Sending message %s to %s via framelessPostMessage interface', getMessageIdsAsLogString(request), targetWindowName);
            Communication.currentWindow.nativeInterface.framelessPostMessage(JSON.stringify(request));
        }
    }
    else {
        const targetOrigin = getTargetOrigin(targetWindow);
        // If the target window isn't closed and we already know its origin, send the message right away; otherwise,
        // queue the message and send it after the origin is established
        if (targetWindow && targetOrigin) {
            logger('Sending message %s to %s via postMessage', getMessageIdsAsLogString(request), targetWindowName);
            targetWindow.postMessage(request, targetOrigin);
        }
        else {
            logger('Adding message %s to %s message queue', getMessageIdsAsLogString(request), targetWindowName);
            getTargetMessageQueue(targetWindow).push(messageRequest);
        }
    }
    return messageRequest;
}
const sendMessageToParentHelperLogger = communicationLogger.extend('sendMessageToParentHelper');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function sendMessageToParentHelper(apiVersionTag, actionName, args) {
    const logger = sendMessageToParentHelperLogger;
    const targetWindow = Communication.parentWindow;
    const request = createMessageRequest(apiVersionTag, actionName, args);
    logger('Message %s information: %o', getMessageIdsAsLogString(request), { actionName, args });
    return sendRequestToTargetWindowHelper(targetWindow, request);
}
const processIncomingMessageLogger = communicationLogger.extend('processIncomingMessage');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function processIncomingMessage(evt) {
    return communication_awaiter(this, void 0, void 0, function* () {
        // Process only if we received a valid message
        if (!evt || !evt.data || typeof evt.data !== 'object') {
            processIncomingMessageLogger('Unrecognized message format received by app, message being ignored. Message: %o', evt);
            return;
        }
        // Process only if the message is coming from a different window and a valid origin
        // valid origins are either a pre-known origin or one specified by the app developer
        // in their call to app.initialize
        const messageSource = evt.source || (evt.originalEvent && evt.originalEvent.source);
        const messageOrigin = evt.origin || (evt.originalEvent && evt.originalEvent.origin);
        return shouldProcessIncomingMessage(messageSource, messageOrigin).then((result) => {
            if (!result) {
                processIncomingMessageLogger('Message being ignored by app because it is either coming from the current window or a different window with an invalid origin, message: %o, source: %o, origin: %o', evt, messageSource, messageOrigin);
                return;
            }
            // Update our parent and child relationships based on this message
            updateRelationships(messageSource, messageOrigin);
            // Handle the message
            if (messageSource === Communication.parentWindow) {
                handleIncomingMessageFromParent(evt);
            }
            else if (messageSource === Communication.childWindow) {
                handleIncomingMessageFromChild(evt);
            }
        });
    });
}
const processAuthBridgeMessageLogger = communicationLogger.extend('processAuthBridgeMessage');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function processAuthBridgeMessage(evt, onMessageReceived) {
    var _a, _b;
    const logger = processAuthBridgeMessageLogger;
    // Process only if we received a valid message
    if (!evt || !evt.data || typeof evt.data !== 'object') {
        logger('Unrecognized message format received by app, message being ignored. Message: %o', evt);
        return;
    }
    const { args } = evt.data;
    const [, message] = args !== null && args !== void 0 ? args : [];
    const parsedData = (() => {
        try {
            return JSON.parse(message);
        }
        catch (e) {
            return null;
        }
    })();
    // Validate that it is a valid auth bridge response message
    if (!parsedData ||
        typeof parsedData !== 'object' ||
        parsedData.messageType !== "NestedAppAuthResponse" /* NestedAppAuthMessageEventNames.Response */) {
        logger('Unrecognized data format received by app, message being ignored. Message: %o', evt);
        return;
    }
    // Process only if the message is coming from a different window and a valid origin
    // valid origins are either a pre-known origin or one specified by the app developer
    // in their call to app.initialize
    const messageSource = evt.source || ((_a = evt === null || evt === void 0 ? void 0 : evt.originalEvent) === null || _a === void 0 ? void 0 : _a.source);
    const messageOrigin = evt.origin || ((_b = evt === null || evt === void 0 ? void 0 : evt.originalEvent) === null || _b === void 0 ? void 0 : _b.origin);
    if (!messageSource) {
        logger('Message being ignored by app because it is coming for a target that is null');
        return;
    }
    if (!shouldProcessIncomingMessage(messageSource, messageOrigin)) {
        logger('Message being ignored by app because it is either coming from the current window or a different window with an invalid origin');
        return;
    }
    /**
     * In most cases, top level window and the parent window will be same.
     * If they're not, perform the necessary updates for the top level window.
     *
     * Top window logic to flush messages is kept independent so that we don't affect
     * any of the code for the existing communication channel.
     */
    if (!Communication.topWindow || Communication.topWindow.closed || messageSource === Communication.topWindow) {
        Communication.topWindow = messageSource;
        Communication.topOrigin = messageOrigin;
    }
    // Clean up pointers to closed parent and child windows
    if (Communication.topWindow && Communication.topWindow.closed) {
        Communication.topWindow = null;
        Communication.topOrigin = null;
    }
    flushMessageQueue(Communication.topWindow);
    // Return the response to the registered callback
    onMessageReceived(message);
}
const shouldProcessIncomingMessageLogger = communicationLogger.extend('shouldProcessIncomingMessage');
/**
 * @hidden
 * Validates the message source and origin, if it should be processed
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function shouldProcessIncomingMessage(messageSource, messageOrigin) {
    return communication_awaiter(this, void 0, void 0, function* () {
        // Process if message source is a different window and if origin is either in
        // Teams' pre-known whitelist or supplied as valid origin by user during initialization
        if (Communication.currentWindow && messageSource === Communication.currentWindow) {
            shouldProcessIncomingMessageLogger('Should not process message because it is coming from the current window');
            return false;
        }
        else if (Communication.currentWindow &&
            Communication.currentWindow.location &&
            messageOrigin &&
            messageOrigin === Communication.currentWindow.location.origin) {
            return true;
        }
        else {
            let messageOriginURL;
            try {
                messageOriginURL = new URL(messageOrigin);
            }
            catch (_) {
                shouldProcessIncomingMessageLogger('Message has an invalid origin of %s', messageOrigin);
                return false;
            }
            const isOriginValid = yield validateOrigin(messageOriginURL);
            if (!isOriginValid) {
                shouldProcessIncomingMessageLogger('Message has an invalid origin of %s', messageOrigin);
            }
            return isOriginValid;
        }
    });
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function updateRelationships(messageSource, messageOrigin) {
    // Determine whether the source of the message is our parent or child and update our
    // window and origin pointer accordingly
    // For frameless windows (i.e mobile), there is no parent frame, so the message must be from the child.
    if (!GlobalVars.isFramelessWindow &&
        (!Communication.parentWindow || Communication.parentWindow.closed || messageSource === Communication.parentWindow)) {
        Communication.parentWindow = messageSource;
        Communication.parentOrigin = messageOrigin;
    }
    else if (!Communication.childWindow ||
        Communication.childWindow.closed ||
        messageSource === Communication.childWindow) {
        Communication.childWindow = messageSource;
        Communication.childOrigin = messageOrigin;
    }
    // Clean up pointers to closed parent and child windows
    if (Communication.parentWindow && Communication.parentWindow.closed) {
        Communication.parentWindow = null;
        Communication.parentOrigin = null;
    }
    if (Communication.childWindow && Communication.childWindow.closed) {
        Communication.childWindow = null;
        Communication.childOrigin = null;
    }
    // If we have any messages in our queue, send them now
    flushMessageQueue(Communication.parentWindow);
    flushMessageQueue(Communication.childWindow);
}
const handleIncomingMessageFromParentLogger = communicationLogger.extend('handleIncomingMessageFromParent');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function retrieveMessageUUIDFromResponse(response) {
    const logger = handleIncomingMessageFromParentLogger;
    if (response.uuid) {
        const responseUUID = response.uuid;
        const callbackUUID = retrieveMessageUUIDFromCallback(CommunicationPrivate.callbacks, responseUUID);
        if (callbackUUID) {
            return callbackUUID;
        }
        const promiseCallbackUUID = retrieveMessageUUIDFromCallback(CommunicationPrivate.promiseCallbacks, responseUUID);
        if (promiseCallbackUUID) {
            return promiseCallbackUUID;
        }
        const portCallbackUUID = retrieveMessageUUIDFromCallback(CommunicationPrivate.portCallbacks, responseUUID);
        if (portCallbackUUID) {
            return portCallbackUUID;
        }
    }
    else {
        return CommunicationPrivate.legacyMessageIdsToUuidMap[response.id];
    }
    logger('Received message %s that failed to produce a callbackId', getMessageIdsAsLogString(response));
    return undefined;
}
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * This function is used to compare a new MessageUUID object value to the key values in the specified callback and retrieving that key
 * We use this because two objects with the same value are not considered equivalent therefore we can't use the new MessageUUID object
 * as a key to retrieve the value associated with it and should use this function instead.
 */
function retrieveMessageUUIDFromCallback(map, responseUUID) {
    if (responseUUID) {
        const callback = [...map].find(([key, _value]) => {
            return key.toString() === responseUUID.toString();
        });
        if (callback) {
            return callback[0];
        }
    }
    return undefined;
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function removeMessageHandlers(message, map) {
    const callbackId = retrieveMessageUUIDFromCallback(map, message.uuid);
    if (callbackId) {
        map.delete(callbackId);
    }
    if (!message.uuid) {
        delete CommunicationPrivate.legacyMessageIdsToUuidMap[message.id];
    }
    else {
        //If we are here, then the parent is capable of sending UUIDs, therefore free up memory
        CommunicationPrivate.legacyMessageIdsToUuidMap = {};
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handleIncomingMessageFromParent(evt) {
    const logger = handleIncomingMessageFromParentLogger;
    if ('id' in evt.data && typeof evt.data.id === 'number') {
        // Call any associated Communication.callbacks
        const serializedResponse = evt.data;
        const message = deserializeMessageResponse(serializedResponse);
        const callbackId = retrieveMessageUUIDFromResponse(message);
        if (callbackId) {
            const callback = CommunicationPrivate.callbacks.get(callbackId);
            logger('Received a response from parent for message %s', callbackId.toString());
            if (callback) {
                logger('Invoking the registered callback for message %s with arguments %o', callbackId.toString(), message.args);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                callback.apply(null, [...message.args, message.isPartialResponse]);
                // Remove the callback to ensure that the callback is called only once and to free up memory if response is a complete response
                if (!isPartialResponse(evt)) {
                    logger('Removing registered callback for message %s', callbackId.toString());
                    removeMessageHandlers(message, CommunicationPrivate.callbacks);
                }
            }
            const promiseCallback = CommunicationPrivate.promiseCallbacks.get(callbackId);
            if (promiseCallback) {
                logger('Invoking the registered promise callback for message %s with arguments %o', callbackId.toString(), message.args);
                promiseCallback(message.args);
                logger('Removing registered promise callback for message %s', callbackId.toString());
                removeMessageHandlers(message, CommunicationPrivate.promiseCallbacks);
            }
            const portCallback = CommunicationPrivate.portCallbacks.get(callbackId);
            if (portCallback) {
                logger('Invoking the registered port callback for message %s with arguments %o', callbackId.toString(), message.args);
                let port;
                if (evt.ports && evt.ports[0] instanceof MessagePort) {
                    port = evt.ports[0];
                }
                portCallback(port, message.args);
                logger('Removing registered port callback for message %s', callbackId.toString());
                removeMessageHandlers(message, CommunicationPrivate.portCallbacks);
            }
            if (message.uuid) {
                CommunicationPrivate.legacyMessageIdsToUuidMap = {};
            }
        }
    }
    else if ('func' in evt.data && typeof evt.data.func === 'string') {
        // Delegate the request to the proper handler
        const message = evt.data;
        logger('Received a message from parent %s, action: "%s"', getMessageIdsAsLogString(message), message.func);
        callHandler(message.func, message.args);
    }
    else {
        logger('Received an unknown message: %O', evt);
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function isPartialResponse(evt) {
    return evt.data.isPartialResponse === true;
}
const handleIncomingMessageFromChildLogger = communicationLogger.extend('handleIncomingMessageFromChild');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function handleIncomingMessageFromChild(evt) {
    if ('id' in evt.data && 'func' in evt.data) {
        // Try to delegate the request to the proper handler, if defined
        const message = deserializeMessageRequest(evt.data);
        const [called, result] = callHandler(message.func, message.args);
        if (called && typeof result !== 'undefined') {
            handleIncomingMessageFromChildLogger('Returning message %s from child back to child, action: %s.', getMessageIdsAsLogString(message), message.func);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            sendMessageResponseToChild(message.id, message.uuid, Array.isArray(result) ? result : [result]);
        }
        else {
            // No handler, proxy to parent
            handleIncomingMessageFromChildLogger('Relaying message %s from child to parent, action: %s. Relayed message will have a new id.', getMessageIdsAsLogString(message), message.func);
            sendMessageToParent(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "tasks.startTask" /* ApiName.Tasks_StartTask */), message.func, message.args, (...args) => {
                if (Communication.childWindow) {
                    const isPartialResponse = args.pop();
                    handleIncomingMessageFromChildLogger('Message from parent being relayed to child, id: %s', getMessageIdsAsLogString(message));
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    sendMessageResponseToChild(message.id, message.uuid, args, isPartialResponse);
                }
            });
        }
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * Checks if the top window and the parent window are different.
 *
 * @returns {boolean} Returns true if the top window and the parent window are different, false otherwise.
 */
function areTopAndParentWindowsDistinct() {
    return Communication.topWindow !== Communication.parentWindow;
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function getTargetMessageQueue(targetWindow) {
    if (targetWindow === Communication.topWindow && areTopAndParentWindowsDistinct()) {
        return CommunicationPrivate.topMessageQueue;
    }
    else if (targetWindow === Communication.parentWindow) {
        return CommunicationPrivate.parentMessageQueue;
    }
    else if (targetWindow === Communication.childWindow) {
        return CommunicationPrivate.childMessageQueue;
    }
    else {
        return [];
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function getTargetOrigin(targetWindow) {
    if (targetWindow === Communication.topWindow && areTopAndParentWindowsDistinct()) {
        return Communication.topOrigin;
    }
    else if (targetWindow === Communication.parentWindow) {
        return Communication.parentOrigin;
    }
    else if (targetWindow === Communication.childWindow) {
        return Communication.childOrigin;
    }
    else {
        return null;
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function getTargetName(targetWindow) {
    if (targetWindow === Communication.topWindow && areTopAndParentWindowsDistinct()) {
        return 'top';
    }
    else if (targetWindow === Communication.parentWindow) {
        return 'parent';
    }
    else if (targetWindow === Communication.childWindow) {
        return 'child';
    }
    else {
        return null;
    }
}
const flushMessageQueueLogger = communicationLogger.extend('flushMessageQueue');
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function flushMessageQueue(targetWindow) {
    const targetOrigin = getTargetOrigin(targetWindow);
    const targetMessageQueue = getTargetMessageQueue(targetWindow);
    const target = getTargetName(targetWindow);
    while (targetWindow && targetOrigin && targetMessageQueue.length > 0) {
        const messageRequest = targetMessageQueue.shift();
        if (messageRequest) {
            const request = serializeMessageRequest(messageRequest);
            /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
            flushMessageQueueLogger('Flushing message %s from %s message queue via postMessage.', getMessageIdsAsLogString(request), target);
            targetWindow.postMessage(request, targetOrigin);
        }
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function waitForMessageQueue(targetWindow, callback) {
    let messageQueueMonitor;
    /* const cannot be used to declare messageQueueMonitor here because of the JS temporal dead zone. In order for messageQueueMonitor to be referenced inside setInterval,
       it has to be defined before the setInterval call. */
    /* eslint-disable-next-line prefer-const */
    messageQueueMonitor = Communication.currentWindow.setInterval(() => {
        if (getTargetMessageQueue(targetWindow).length === 0) {
            clearInterval(messageQueueMonitor);
            callback();
        }
    }, 100);
}
/**
 * @hidden
 * Send a response to child for a message request that was from child
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendMessageResponseToChild(id, uuid, args, isPartialResponse) {
    const targetWindow = Communication.childWindow;
    const response = createMessageResponse(id, uuid, args, isPartialResponse);
    const serializedResponse = serializeMessageResponse(response);
    const targetOrigin = getTargetOrigin(targetWindow);
    if (targetWindow && targetOrigin) {
        targetWindow.postMessage(serializedResponse, targetOrigin);
    }
}
/**
 * @hidden
 * Send a custom message object that can be sent to child window,
 * instead of a response message to a child
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendMessageEventToChild(actionName, args) {
    const targetWindow = Communication.childWindow;
    /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
    const customEvent = createMessageEvent(actionName, args);
    const targetOrigin = getTargetOrigin(targetWindow);
    // If the target window isn't closed and we already know its origin, send the message right away; otherwise,
    // queue the message and send it after the origin is established
    if (targetWindow && targetOrigin) {
        targetWindow.postMessage(customEvent, targetOrigin);
    }
    else {
        getTargetMessageQueue(targetWindow).push(customEvent);
    }
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function createMessageRequest(apiVersionTag, func, args) {
    const messageId = CommunicationPrivate.nextMessageId++;
    const messageUuid = new UUID();
    CommunicationPrivate.legacyMessageIdsToUuidMap[messageId] = messageUuid;
    return {
        id: messageId,
        uuid: messageUuid,
        func: func,
        timestamp: Date.now(),
        args: args || [],
        apiVersionTag: apiVersionTag,
    };
}
/**
 * @internal
 * Limited to Microsoft-internal use
 *
 * Creates a nested app authentication request.
 *
 * @param {string} message - The message to be included in the request. This is typically a stringified JSON object containing the details of the authentication request.
 * The reason for using a string is to allow complex data structures to be sent as a message while avoiding potential issues with object serialization and deserialization.
 *
 * @returns {NestedAppAuthRequest} Returns a NestedAppAuthRequest object with a unique id, the function name set to 'nestedAppAuthRequest', the current timestamp, an empty args array, and the provided message as data.
 */
function createNestedAppAuthRequest(message) {
    const messageId = CommunicationPrivate.nextMessageId++;
    const messageUuid = new UUID();
    CommunicationPrivate.legacyMessageIdsToUuidMap[messageId] = messageUuid;
    return {
        id: messageId,
        uuid: messageUuid,
        func: 'nestedAppAuth.execute',
        timestamp: Date.now(),
        // Since this is a nested app auth request, we don't need to send any args.
        // We avoid overloading the args array with the message to avoid potential issues processing of these messages on the hubSDK.
        args: [],
        data: message,
    };
}
/**
 * @internal
 * Limited to Microsoft-internal use
 */
function createMessageResponse(id, uuid, args, isPartialResponse) {
    return {
        id: id,
        uuid: uuid,
        args: args || [],
        isPartialResponse,
    };
}
/**
 * @hidden
 * Creates a message object without any id and api version, used for custom actions being sent to child frame/window
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function createMessageEvent(func, args) {
    return {
        func: func,
        args: args || [],
    };
}
function getMessageIdsAsLogString(message) {
    if ('uuidAsString' in message) {
        return `${message.uuidAsString} (legacy id: ${message.id})`;
    }
    else if ('uuid' in message && message.uuid !== undefined) {
        return `${message.uuid.toString()} (legacy id: ${message.id})`;
    }
    else {
        return `legacy id: ${message.id} (no uuid)`;
    }
}

;// ./src/private/logs.ts







/**
 * @hidden
 * Namespace to interact with the logging part of the SDK.
 * This object is used to send the app logs on demand to the host client
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const logsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var logs;
(function (logs) {
    /**
     * @hidden
     *
     * Registers a handler for getting app log
     *
     * @param handler - The handler to invoke to get the app log
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerGetLogHandler(handler) {
        // allow for registration cleanup even when not finished initializing
        !isNullOrUndefined(handler) && ensureInitialized(runtime);
        if (!isNullOrUndefined(handler) && !isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (handler) {
            registerHandler(getApiVersionTag(logsTelemetryVersionNumber, "log.request" /* ApiName.Logs_RegisterLogRequestHandler */), 'log.request', () => {
                const log = handler();
                sendMessageToParent(getApiVersionTag(logsTelemetryVersionNumber, "log.receive" /* ApiName.Logs_Receive */), 'log.receive', [log]);
            });
        }
        else {
            removeHandler('log.request');
        }
    }
    logs.registerGetLogHandler = registerGetLogHandler;
    /**
     * @hidden
     *
     * Checks if the logs capability is supported by the host
     * @returns boolean to represent whether the logs capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.logs ? true : false;
    }
    logs.isSupported = isSupported;
})(logs || (logs = {}));

;// ./src/private/interfaces.ts
/**
 * @hidden
 *
 * @internal
 * Limited to Microsoft-internal use
 */
var NotificationTypes;
(function (NotificationTypes) {
    NotificationTypes["fileDownloadStart"] = "fileDownloadStart";
    NotificationTypes["fileDownloadComplete"] = "fileDownloadComplete";
})(NotificationTypes || (NotificationTypes = {}));
/**
 * @hidden
 *
 * @internal
 * Limited to Microsoft-internal use
 */
var ViewerActionTypes;
(function (ViewerActionTypes) {
    ViewerActionTypes["view"] = "view";
    ViewerActionTypes["edit"] = "edit";
    ViewerActionTypes["editNew"] = "editNew";
})(ViewerActionTypes || (ViewerActionTypes = {}));
/**
 * @hidden
 *
 * User setting changes that can be subscribed to
 */
var UserSettingTypes;
(function (UserSettingTypes) {
    /**
     * @hidden
     * Use this key to subscribe to changes in user's file open preference
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    UserSettingTypes["fileOpenPreference"] = "fileOpenPreference";
    /**
     * @hidden
     * Use this key to subscribe to theme changes
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    UserSettingTypes["theme"] = "theme";
})(UserSettingTypes || (UserSettingTypes = {}));

;// ./src/private/privateAPIs.ts
/* eslint-disable @typescript-eslint/no-explicit-any */







/**
 * @hidden
 * Upload a custom App manifest directly to both team and personal scopes.
 * This method works just for the first party Apps.
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const privateAPIsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
function uploadCustomApp(manifestBlob, onComplete) {
    ensureInitialized(runtime);
    sendMessageToParent(getApiVersionTag(privateAPIsTelemetryVersionNumber, "uploadCustomApp" /* ApiName.PrivateAPIs_UploadCustomApp */), 'uploadCustomApp', [manifestBlob], onComplete ? onComplete : getGenericOnCompleteHandler());
}
/**
 * @hidden
 * Sends a custom action MessageRequest to host or parent window
 *
 * @param actionName - Specifies name of the custom action to be sent
 * @param args - Specifies additional arguments passed to the action
 * @param callback - Optionally specify a callback to receive response parameters from the parent
 * @returns id of sent message
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendCustomMessage(actionName, args, callback) {
    ensureInitialized(runtime);
    sendMessageToParent(getApiVersionTag(privateAPIsTelemetryVersionNumber, "sendCustomMessage" /* ApiName.PrivateAPIs_SendCustomMessage */), actionName, args, callback);
}
/**
 * @hidden
 * Sends a custom action MessageEvent to a child iframe/window, only if you are not using auth popup.
 * Otherwise it will go to the auth popup (which becomes the child)
 *
 * @param actionName - Specifies name of the custom action to be sent
 * @param args - Specifies additional arguments passed to the action
 * @returns id of sent message
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function sendCustomEvent(actionName, args) {
    ensureInitialized(runtime);
    //validate childWindow
    if (!Communication.childWindow) {
        throw new Error('The child window has not yet been initialized or is not present');
    }
    sendMessageEventToChild(actionName, args);
}
/**
 * @hidden
 * Adds a handler for an action sent by a child window or parent window
 *
 * @param actionName - Specifies name of the action message to handle
 * @param customHandler - The callback to invoke when the action message is received. The return value is sent to the child
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function registerCustomHandler(actionName, customHandler) {
    ensureInitialized(runtime);
    registerHandler(getApiVersionTag(privateAPIsTelemetryVersionNumber, "registerCustomHandler" /* ApiName.PrivateAPIs_RegisterCustomHandler */), actionName, (...args) => {
        return customHandler.apply(this, args);
    });
}
/**
 * @hidden
 * register a handler to be called when a user setting changes. The changed setting type & value is provided in the callback.
 *
 * @param settingTypes - List of user setting changes to subscribe
 * @param handler - When a subscribed setting is updated this handler is called
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function registerUserSettingsChangeHandler(settingTypes, handler) {
    ensureInitialized(runtime);
    registerHandler(getApiVersionTag(privateAPIsTelemetryVersionNumber, "registerUserSettingsChangeHandler" /* ApiName.PrivateAPIs_RegisterUserSettingsChangeHandler */), 'userSettingsChange', handler, true, [settingTypes]);
}
/**
 * @hidden
 * Opens a client-friendly preview of the specified file.
 *
 * @param file - The file to preview.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function openFilePreview(filePreviewParameters) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
    const params = [
        filePreviewParameters.entityId,
        filePreviewParameters.title,
        filePreviewParameters.description,
        filePreviewParameters.type,
        filePreviewParameters.objectUrl,
        filePreviewParameters.downloadUrl,
        filePreviewParameters.webPreviewUrl,
        filePreviewParameters.webEditUrl,
        filePreviewParameters.baseUrl,
        filePreviewParameters.editFile,
        filePreviewParameters.subEntityId,
        filePreviewParameters.viewerAction,
        filePreviewParameters.fileOpenPreference,
        filePreviewParameters.conversationId,
        filePreviewParameters.sizeInBytes,
    ];
    sendMessageToParent(getApiVersionTag(privateAPIsTelemetryVersionNumber, "openFilePreview" /* ApiName.PrivateAPIs_OpenFilePreview */), 'openFilePreview', params);
}

;// ./src/private/conversations.ts






/**
 * @hidden
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const conversationsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @hidden
 * Namespace to interact with the conversational subEntities inside the tab
 *
 * @internal
 * Limited to Microsoft-internal use
 */
var conversations;
(function (conversations) {
    /**
     * @hidden
     * Hide from docs
     * --------------
     * Allows the user to start or continue a conversation with each subentity inside the tab
     *
     * @returns Promise resolved upon completion
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function openConversation(openConversationRequest) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            const sendPromise = sendAndHandleStatusAndReason(getApiVersionTag(conversationsTelemetryVersionNumber, "conversations.openConversation" /* ApiName.Conversations_OpenConversation */), 'conversations.openConversation', {
                title: openConversationRequest.title,
                subEntityId: openConversationRequest.subEntityId,
                conversationId: openConversationRequest.conversationId,
                channelId: openConversationRequest.channelId,
                entityId: openConversationRequest.entityId,
            });
            if (openConversationRequest.onStartConversation) {
                registerHandler(getApiVersionTag(conversationsTelemetryVersionNumber, "conversations.registerStartConversationHandler" /* ApiName.Conversations_RegisterStartConversationHandler */), 'startConversation', (subEntityId, conversationId, channelId, entityId) => {
                    var _a;
                    return (_a = openConversationRequest.onStartConversation) === null || _a === void 0 ? void 0 : _a.call(openConversationRequest, {
                        subEntityId,
                        conversationId,
                        channelId,
                        entityId,
                    });
                });
            }
            if (openConversationRequest.onCloseConversation) {
                registerHandler(getApiVersionTag(conversationsTelemetryVersionNumber, "conversations.registerCloseConversationHandler" /* ApiName.Conversations_RegisterCloseConversationHandler */), 'closeConversation', (subEntityId, conversationId, channelId, entityId) => {
                    var _a;
                    return (_a = openConversationRequest.onCloseConversation) === null || _a === void 0 ? void 0 : _a.call(openConversationRequest, {
                        subEntityId,
                        conversationId,
                        channelId,
                        entityId,
                    });
                });
            }
            resolve(sendPromise);
        });
    }
    conversations.openConversation = openConversation;
    /**
     * @hidden
     *
     * Allows the user to close the conversation in the right pane
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function closeConversation() {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(conversationsTelemetryVersionNumber, "conversations.closeConversation" /* ApiName.Conversations_CloseConversation */), 'conversations.closeConversation');
        removeHandler('startConversation');
        removeHandler('closeConversation');
    }
    conversations.closeConversation = closeConversation;
    /**
     * @hidden
     * Hide from docs
     * ------
     * Allows retrieval of information for all chat members.
     * NOTE: This value should be used only as a hint as to who the members are
     * and never as proof of membership in case your app is being hosted by a malicious party.
     *
     * @returns Promise resolved with information on all chat members
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getChatMembers() {
        return new Promise((resolve) => {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            resolve(sendAndUnwrap(getApiVersionTag(conversationsTelemetryVersionNumber, "conversations.getChatMember" /* ApiName.Conversations_GetChatMember */), 'getChatMembers'));
        });
    }
    conversations.getChatMembers = getChatMembers;
    /**
     * Checks if the conversations capability is supported by the host
     * @returns boolean to represent whether conversations capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.conversations ? true : false;
    }
    conversations.isSupported = isSupported;
})(conversations || (conversations = {}));

;// ./src/private/copilot.ts



/**
 * @beta
 * @hidden
 * Namespace to delegate copilot app specific APIs
 * @internal
 * Limited to Microsoft-internal use
 */
var copilot;
(function (copilot) {
    /**
     * @beta
     * @hidden
     * User information required by specific apps
     * @internal
     * Limited to Microsoft-internal use
     */
    let eligibility;
    (function (eligibility) {
        /**
         * @hidden
         * @internal
         * Limited to Microsoft-internal use
         * @beta
         * @returns boolean to represent whether copilot.eligibility capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            var _a;
            return ensureInitialized(runtime) && !!((_a = runtime.hostVersionsInfo) === null || _a === void 0 ? void 0 : _a.appEligibilityInformation);
        }
        eligibility.isSupported = isSupported;
        /**
         * @hidden
         * @internal
         * Limited to Microsoft-internal use
         * @beta
         * @returns the copilot eligibility information about the user
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function getEligibilityInfo() {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            return runtime.hostVersionsInfo.appEligibilityInformation;
        }
        eligibility.getEligibilityInfo = getEligibilityInfo;
    })(eligibility = copilot.eligibility || (copilot.eligibility = {}));
})(copilot || (copilot = {}));

;// ./src/private/externalAppAuthentication.ts







/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const externalAppAuthenticationTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Namespace to delegate authentication and message extension requests to the host
 * @internal
 * Limited to Microsoft-internal use
 */
var externalAppAuthentication;
(function (externalAppAuthentication) {
    /**
     * @beta
     * @hidden
     * Determines if the provided response object is an instance of IActionExecuteResponse
     * @internal
     * Limited to Microsoft-internal use
     * @param response The object to check whether it is of IActionExecuteResponse type
     */
    function isActionExecuteResponse(response) {
        const actionResponse = response;
        return (actionResponse.responseType === externalAppAuthentication.InvokeResponseType.ActionExecuteInvokeResponse &&
            actionResponse.value !== undefined &&
            actionResponse.statusCode !== undefined &&
            actionResponse.type !== undefined);
    }
    externalAppAuthentication.isActionExecuteResponse = isActionExecuteResponse;
    /**
     * @hidden
     * This is the only allowed value for IActionExecuteInvokeRequest.type. Used for validation
     * @internal
     * Limited to Microsoft-internal use
     */
    externalAppAuthentication.ActionExecuteInvokeRequestType = 'Action.Execute';
    /**
     * @hidden
     * Used to differentiate between IOriginalRequestInfo types
     * @internal
     * Limited to Microsoft-internal use
     */
    let OriginalRequestType;
    (function (OriginalRequestType) {
        OriginalRequestType["ActionExecuteInvokeRequest"] = "ActionExecuteInvokeRequest";
        OriginalRequestType["QueryMessageExtensionRequest"] = "QueryMessageExtensionRequest";
    })(OriginalRequestType = externalAppAuthentication.OriginalRequestType || (externalAppAuthentication.OriginalRequestType = {}));
    /**
     * @hidden
     * Used to differentiate between IInvokeResponse types
     * @internal
     * Limited to Microsoft-internal use
     */
    let InvokeResponseType;
    (function (InvokeResponseType) {
        InvokeResponseType["ActionExecuteInvokeResponse"] = "ActionExecuteInvokeResponse";
        InvokeResponseType["QueryMessageExtensionResponse"] = "QueryMessageExtensionResponse";
    })(InvokeResponseType = externalAppAuthentication.InvokeResponseType || (externalAppAuthentication.InvokeResponseType = {}));
    /**
     * @beta
     * @hidden
     * Determines if the provided error object is an instance of InvokeError
     * @internal
     * Limited to Microsoft-internal use
     * @param err The error object to check whether it is of InvokeError type
     */
    function isInvokeError(err) {
        if (typeof err !== 'object' || err === null) {
            return false;
        }
        const error = err;
        return (Object.values(externalAppAuthentication.InvokeErrorCode).includes(error.errorCode) &&
            (error.message === undefined || typeof error.message === 'string'));
    }
    externalAppAuthentication.isInvokeError = isInvokeError;
    /**
     * @hidden
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let InvokeErrorCode;
    (function (InvokeErrorCode) {
        InvokeErrorCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    })(InvokeErrorCode = externalAppAuthentication.InvokeErrorCode || (externalAppAuthentication.InvokeErrorCode = {}));
    /*********** END ERROR TYPE ***********/
    /**
     * @hidden
     * @internal
     * Limited to Microsoft-internal use
     */
    function validateOriginalRequestInfo(originalRequestInfo) {
        if (originalRequestInfo.requestType === OriginalRequestType.ActionExecuteInvokeRequest) {
            const actionExecuteRequest = originalRequestInfo;
            if (actionExecuteRequest.type !== externalAppAuthentication.ActionExecuteInvokeRequestType) {
                const error = {
                    errorCode: InvokeErrorCode.INTERNAL_ERROR,
                    message: `Invalid action type ${actionExecuteRequest.type}. Action type must be "${externalAppAuthentication.ActionExecuteInvokeRequestType}"`,
                };
                throw error;
            }
        }
        else if (originalRequestInfo.requestType === OriginalRequestType.QueryMessageExtensionRequest) {
            if (originalRequestInfo.commandId.length > 64) {
                throw new Error('originalRequestInfo.commandId exceeds the maximum size of 64 characters');
            }
            if (originalRequestInfo.parameters.length > 5) {
                throw new Error('originalRequestInfo.parameters exceeds the maximum size of 5');
            }
            for (const parameter of originalRequestInfo.parameters) {
                if (parameter.name.length > 64) {
                    throw new Error('originalRequestInfo.parameters.name exceeds the maximum size of 64 characters');
                }
                if (parameter.value.length > 512) {
                    throw new Error('originalRequestInfo.parameters.value exceeds the maximum size of 512 characters');
                }
            }
        }
    }
    /**
     * @beta
     * @hidden
     * Signals to the host to perform authentication using the given authentication parameters and then resend the request to the application specified by the app ID with the authentication result.
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application backend to which the request and authentication response should be sent. This must be a UUID
     * @param authenticateParameters Parameters for the authentication pop-up
     * @param originalRequestInfo Information about the original request that should be resent
     * @returns A promise that resolves to the IInvokeResponse from the application backend and rejects with InvokeError if the host encounters an error while authenticating or resending the request
     */
    function authenticateAndResendRequest(appId, authenticateParameters, originalRequestInfo) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const typeSafeAppId = new AppId(appId);
        validateOriginalRequestInfo(originalRequestInfo);
        // Ask the parent window to open an authentication window with the parameters provided by the caller.
        return sendMessageToParentAsync(getApiVersionTag(externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthentication.authenticateAndResendRequest" /* ApiName.ExternalAppAuthentication_AuthenticateAndResendRequest */), 'externalAppAuthentication.authenticateAndResendRequest', [
            typeSafeAppId.toString(),
            originalRequestInfo,
            authenticateParameters.url.href,
            authenticateParameters.width,
            authenticateParameters.height,
            authenticateParameters.isExternal,
        ]).then(([wasSuccessful, response]) => {
            if (wasSuccessful && response.responseType != null) {
                return response;
            }
            else {
                const error = response;
                throw error;
            }
        });
    }
    externalAppAuthentication.authenticateAndResendRequest = authenticateAndResendRequest;
    /**
     * @beta
     * @hidden
     * Signals to the host to perform SSO authentication for the application specified by the app ID
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application backend for which the host should attempt SSO authentication. This must be a UUID
     * @param authTokenRequest Parameters for SSO authentication
     * @returns A promise that resolves when authentication and succeeds and rejects with InvokeError on failure
     */
    function authenticateWithSSO(appId, authTokenRequest) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const typeSafeAppId = new AppId(appId);
        return sendMessageToParentAsync(getApiVersionTag(externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthentication.authenticateWithSSO" /* ApiName.ExternalAppAuthentication_AuthenticateWithSSO */), 'externalAppAuthentication.authenticateWithSSO', [typeSafeAppId.toString(), authTokenRequest.claims, authTokenRequest.silent]).then(([wasSuccessful, error]) => {
            if (!wasSuccessful) {
                throw error;
            }
        });
    }
    externalAppAuthentication.authenticateWithSSO = authenticateWithSSO;
    /**
     * @beta
     * @hidden
     * Signals to the host to perform SSO authentication for the application specified by the app ID and then resend the request to the application backend with the authentication result
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application backend for which the host should attempt SSO authentication and resend the request and authentication response. This must be a UUID.
     * @param authTokenRequest Parameters for SSO authentication
     * @param originalRequestInfo Information about the original request that should be resent
     * @returns A promise that resolves to the IInvokeResponse from the application backend and rejects with InvokeError if the host encounters an error while authenticating or resending the request
     */
    function authenticateWithSSOAndResendRequest(appId, authTokenRequest, originalRequestInfo) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const typeSafeAppId = new AppId(appId);
        validateOriginalRequestInfo(originalRequestInfo);
        return sendMessageToParentAsync(getApiVersionTag(externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthentication.authenticateWithSSOAndResendRequest" /* ApiName.ExternalAppAuthentication_AuthenticateWithSSOAndResendRequest */), 'externalAppAuthentication.authenticateWithSSOAndResendRequest', [typeSafeAppId.toString(), originalRequestInfo, authTokenRequest.claims, authTokenRequest.silent]).then(([wasSuccessful, response]) => {
            if (wasSuccessful && response.responseType != null) {
                return response;
            }
            else {
                const error = response;
                throw error;
            }
        });
    }
    externalAppAuthentication.authenticateWithSSOAndResendRequest = authenticateWithSSOAndResendRequest;
    /**
     * @beta
     * @hidden
     * Signals to the host to perform Oauth2 authentication for the application specified by the title ID
     * @internal
     * Limited to Microsoft-internal use
     * @param titleId ID of the acquisition
     * @param oauthConfigId lookup ID in token store
     * @param oauthWindowParameters parameters for the signIn window
     * @returns A promise that resolves when authentication succeeds and rejects with InvokeError on failure
     */
    function authenticateWithOauth2(titleId, oauthConfigId, oauthWindowParameters) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        validateId(titleId, new Error('titleId is Invalid.'));
        validateId(oauthConfigId, new Error('oauthConfigId is Invalid.'));
        return sendMessageToParentAsync(getApiVersionTag(externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthentication.authenticateWithOauth2" /* ApiName.ExternalAppAuthentication_AuthenticateWithOauth2 */), 'externalAppAuthentication.authenticateWithOauth2', [
            titleId,
            oauthConfigId,
            oauthWindowParameters.width,
            oauthWindowParameters.height,
            oauthWindowParameters.isExternal,
        ]).then(([wasSuccessful, error]) => {
            if (!wasSuccessful) {
                throw error;
            }
        });
    }
    externalAppAuthentication.authenticateWithOauth2 = authenticateWithOauth2;
    /**
     * @beta
     * @hidden
     * API to authenticate power platform connector plugins
     * @internal
     * Limited to Microsoft-internal use
     * @param titleId ID of the acquisition
     * @param signInUrl signInUrl for the connctor page listing the connector. This is optional
     * @param oauthWindowParameters parameters for the signIn window
     * @returns A promise that resolves when authentication succeeds and rejects with InvokeError on failure
     */
    function authenticateWithPowerPlatformConnectorPlugins(titleId, signInUrl, oauthWindowParameters) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        validateId(titleId, new Error('titleId is Invalid.'));
        if (signInUrl) {
            validateUrl(signInUrl);
        }
        return sendMessageToParentAsync(getApiVersionTag(externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthentication.authenticateWithPowerPlatformConnectorPlugins" /* ApiName.ExternalAppAuthentication_AuthenticateWithPowerPlatformConnectorPlugins */), 'externalAppAuthentication.authenticateWithPowerPlatformConnectorPlugins', [
            titleId,
            signInUrl === null || signInUrl === void 0 ? void 0 : signInUrl.toString(),
            oauthWindowParameters === null || oauthWindowParameters === void 0 ? void 0 : oauthWindowParameters.width,
            oauthWindowParameters === null || oauthWindowParameters === void 0 ? void 0 : oauthWindowParameters.height,
            oauthWindowParameters === null || oauthWindowParameters === void 0 ? void 0 : oauthWindowParameters.isExternal,
        ]).then(([wasSuccessful, error]) => {
            if (!wasSuccessful) {
                throw error;
            }
        });
    }
    externalAppAuthentication.authenticateWithPowerPlatformConnectorPlugins = authenticateWithPowerPlatformConnectorPlugins;
    /**
     * @hidden
     * Checks if the externalAppAuthentication capability is supported by the host
     * @returns boolean to represent whether externalAppAuthentication capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.externalAppAuthentication ? true : false;
    }
    externalAppAuthentication.isSupported = isSupported;
})(externalAppAuthentication || (externalAppAuthentication = {}));

;// ./src/private/externalAppAuthenticationForCEA.ts
var externalAppAuthenticationForCEA_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const externalAppAuthenticationForCEA_externalAppAuthenticationTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Namespace to delegate authentication requests to the host for custom engine agents
 * @internal
 * Limited to Microsoft-internal use
 * @beta
 */
var externalAppAuthenticationForCEA;
(function (externalAppAuthenticationForCEA) {
    /**
     * @beta
     * @hidden
     * Signals to the host to perform SSO authentication for the application specified by the app ID, and then send the authResult to the application backend.
     * @internal
     * Limited to Microsoft-internal use
     * @param appId App ID of the app upon whose behalf Copilot is requesting authentication. This must be a UUID.
     * @param conversationId ConversationId To tell the bot what conversation the calls are coming from
     * @param authTokenRequest Parameters for SSO authentication
     * @throws InvokeError if the host encounters an error while authenticating
     * @returns A promise that resolves when authentication succeeds and rejects with InvokeError on failure
     */
    function authenticateWithSSO(appId, conversationId, authTokenRequest) {
        return externalAppAuthenticationForCEA_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            validateId(conversationId, new Error('conversation id is not valid.'));
            const error = yield sendAndUnwrap(getApiVersionTag(externalAppAuthenticationForCEA_externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthenticationForCEA.authenticateWithSSO" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateWithSSO */), "externalAppAuthenticationForCEA.authenticateWithSSO" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateWithSSO */, appId.toString(), conversationId, authTokenRequest.claims, authTokenRequest.silent);
            if (error) {
                throw error;
            }
        });
    }
    externalAppAuthenticationForCEA.authenticateWithSSO = authenticateWithSSO;
    /**
     * @beta
     * @hidden
     * Signals to the host to perform authentication using the given authentication parameters and then send the auth result to the application backend.
     * @internal
     * Limited to Microsoft-internal use
     * @param appId App ID of the app upon whose behalf Copilot is requesting authentication. This must be a UUID.
     * @param conversationId ConversationId To tell the bot what conversation the calls are coming from
     * @param authenticateParameters Parameters for the authentication pop-up
     * @throws InvokeError if the host encounters an error while authenticating
     * @returns A promise that resolves from the application backend and rejects with InvokeError if the host encounters an error while authenticating
     */
    function authenticateWithOauth(appId, conversationId, authenticateParameters) {
        return externalAppAuthenticationForCEA_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            validateId(conversationId, new Error('conversation id is not valid.'));
            // Ask the parent window to open an authentication window with the parameters provided by the caller.
            const error = yield sendAndUnwrap(getApiVersionTag(externalAppAuthenticationForCEA_externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthenticationForCEA.authenticateWithOauth" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateWithOauth */), "externalAppAuthenticationForCEA.authenticateWithOauth" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateWithOauth */, appId.toString(), conversationId, authenticateParameters.url.href, authenticateParameters.width, authenticateParameters.height, authenticateParameters.isExternal);
            if (error) {
                throw error;
            }
        });
    }
    externalAppAuthenticationForCEA.authenticateWithOauth = authenticateWithOauth;
    /**
     * @beta
     * @hidden
     * Signals to the host to perform authentication using the given authentication parameters and then resend the request to the application backend with the authentication result.
     * @internal
     * Limited to Microsoft-internal use
     * @param appId App ID of the app upon whose behalf Copilot is requesting authentication. This must be a UUID.
     * @param conversationId ConversationId To tell the bot what conversation the calls are coming from
     * @param authenticateParameters Parameters for the authentication pop-up
     * @param originalRequestInfo Information about the original request that should be resent
     * @throws InvokeError if the host encounters an error while authenticating or resending the request
     * @returns A promise that resolves to the IActionExecuteResponse from the application backend and rejects with InvokeError if the host encounters an error while authenticating or resending the request
     */
    function authenticateAndResendRequest(appId, conversationId, authenticateParameters, originalRequestInfo) {
        return externalAppAuthenticationForCEA_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            validateId(conversationId, new Error('conversation id is not valid.'));
            validateOriginalRequestInfo(originalRequestInfo);
            // Ask the parent window to open an authentication window with the parameters provided by the caller.
            const response = yield sendAndUnwrap(getApiVersionTag(externalAppAuthenticationForCEA_externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthenticationForCEA.authenticateAndResendRequest" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateAndResendRequest */), "externalAppAuthenticationForCEA.authenticateAndResendRequest" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateAndResendRequest */, appId.toString(), conversationId, originalRequestInfo, authenticateParameters.url.href, authenticateParameters.width, authenticateParameters.height, authenticateParameters.isExternal);
            if (externalAppAuthentication.isActionExecuteResponse(response)) {
                return response;
            }
            else {
                throw externalAppAuthentication.isInvokeError(response) ? response : defaultExternalAppError;
            }
        });
    }
    externalAppAuthenticationForCEA.authenticateAndResendRequest = authenticateAndResendRequest;
    /**
     * @beta
     * @hidden
     * Signals to the host to perform SSO authentication for the application specified by the app ID and then resend the request to the application backend with the authentication result and originalRequestInfo
     * @internal
     * Limited to Microsoft-internal use
     * @param appId App ID of the app upon whose behalf Copilot is requesting authentication. This must be a UUID.
     * @param conversationId ConversationId To tell the bot what conversation the calls are coming from
     * @param authTokenRequest Parameters for SSO authentication
     * @param originalRequestInfo Information about the original request that should be resent
     * @throws InvokeError if the host encounters an error while authenticating or resending the request
     * @returns A promise that resolves to the IActionExecuteResponse from the application backend and rejects with InvokeError if the host encounters an error while authenticating or resending the request
     */
    function authenticateWithSSOAndResendRequest(appId, conversationId, authTokenRequest, originalRequestInfo) {
        return externalAppAuthenticationForCEA_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            validateId(conversationId, new Error('conversation id is not valid.'));
            validateOriginalRequestInfo(originalRequestInfo);
            const response = yield sendAndUnwrap(getApiVersionTag(externalAppAuthenticationForCEA_externalAppAuthenticationTelemetryVersionNumber, "externalAppAuthenticationForCEA.authenticateWithSSOAndResendRequest" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateWithSSOAndResendRequest */), "externalAppAuthenticationForCEA.authenticateWithSSOAndResendRequest" /* ApiName.ExternalAppAuthenticationForCEA_AuthenticateWithSSOAndResendRequest */, appId.toString(), conversationId, originalRequestInfo, authTokenRequest.claims, authTokenRequest.silent);
            if (externalAppAuthentication.isActionExecuteResponse(response)) {
                return response;
            }
            else {
                throw externalAppAuthentication.isInvokeError(response) ? response : defaultExternalAppError;
            }
        });
    }
    externalAppAuthenticationForCEA.authenticateWithSSOAndResendRequest = authenticateWithSSOAndResendRequest;
    /**
     * @beta
     * @hidden
     * Checks if the externalAppAuthenticationForCEA capability is supported by the host
     * @returns boolean to represent whether externalAppAuthenticationForCEA capability is supported
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.externalAppAuthenticationForCEA ? true : false;
    }
    externalAppAuthenticationForCEA.isSupported = isSupported;
    /**
     * @hidden
     * @internal
     * Limited to Microsoft-internal use
     * @beta
     */
    function validateOriginalRequestInfo(actionExecuteRequest) {
        if (actionExecuteRequest.type !== externalAppAuthentication.ActionExecuteInvokeRequestType) {
            const error = {
                errorCode: externalAppAuthentication.InvokeErrorCode.INTERNAL_ERROR,
                message: `Invalid action type ${actionExecuteRequest.type}. Action type must be "${externalAppAuthentication.ActionExecuteInvokeRequestType}"`,
            };
            throw error;
        }
    }
    /**
     * @hidden
     * @internal
     * Limited to Microsoft-internal use
     * @beta
     */
    const defaultExternalAppError = {
        errorCode: externalAppAuthentication.InvokeErrorCode.INTERNAL_ERROR,
        message: 'No valid response received',
    };
})(externalAppAuthenticationForCEA || (externalAppAuthenticationForCEA = {}));

;// ./src/private/externalAppCardActions.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const externalAppCardActionsTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Namespace to delegate adaptive card action execution to the host
 * @internal
 * Limited to Microsoft-internal use
 */
var externalAppCardActions;
(function (externalAppCardActions) {
    /**
     * @hidden
     * The type of deeplink action that was executed by the host
     * @internal
     * Limited to Microsoft-internal use
     */
    let ActionOpenUrlType;
    (function (ActionOpenUrlType) {
        ActionOpenUrlType["DeepLinkDialog"] = "DeepLinkDialog";
        ActionOpenUrlType["DeepLinkOther"] = "DeepLinkOther";
        ActionOpenUrlType["DeepLinkStageView"] = "DeepLinkStageView";
        ActionOpenUrlType["GenericUrl"] = "GenericUrl";
    })(ActionOpenUrlType = externalAppCardActions.ActionOpenUrlType || (externalAppCardActions.ActionOpenUrlType = {}));
    /**
     * @beta
     * @hidden
     * Error codes that can be thrown from IExternalAppCardActionService.handleActionOpenUrl
     * and IExternalAppCardActionForCEAService.handleActionOpenUrl
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let ActionOpenUrlErrorCode;
    (function (ActionOpenUrlErrorCode) {
        ActionOpenUrlErrorCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
        ActionOpenUrlErrorCode["INVALID_LINK"] = "INVALID_LINK";
        ActionOpenUrlErrorCode["NOT_SUPPORTED"] = "NOT_SUPPORTED";
    })(ActionOpenUrlErrorCode = externalAppCardActions.ActionOpenUrlErrorCode || (externalAppCardActions.ActionOpenUrlErrorCode = {}));
    /**
     * @beta
     * @hidden
     * Delegates an Adaptive Card Action.Submit request to the host for the application with the provided app ID
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application the request is intended for. This must be a UUID
     * @param actionSubmitPayload The Adaptive Card Action.Submit payload
     * @param cardActionsConfig The card actions configuration. This indicates which subtypes should be handled by this API
     * @returns Promise that resolves when the request is completed and rejects with ActionSubmitError if the request fails
     */
    function processActionSubmit(appId, actionSubmitPayload) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const typeSafeAppId = new AppId(appId);
        return sendMessageToParentAsync(getApiVersionTag(externalAppCardActionsTelemetryVersionNumber, "externalAppCardActions.processActionSubmit" /* ApiName.ExternalAppCardActions_ProcessActionSubmit */), 'externalAppCardActions.processActionSubmit', [typeSafeAppId.toString(), actionSubmitPayload]).then(([wasSuccessful, error]) => {
            if (!wasSuccessful) {
                throw error;
            }
        });
    }
    externalAppCardActions.processActionSubmit = processActionSubmit;
    /**
     * @beta
     * @hidden
     * Delegates an Adaptive Card Action.OpenUrl request to the host for the application with the provided app ID.
     * If `fromElement` is not provided, the information from the manifest is used to determine whether the URL can
     * be processed by the host. Deep link URLs for plugins are not supported and will result in an error.
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application the request is intended for. This must be a UUID
     * @param url The URL to open
     * @param fromElement The element on behalf of which the M365 app is making the request.
     * @returns Promise that resolves to ActionOpenUrlType indicating the type of URL that was opened on success and rejects with ActionOpenUrlError if the request fails
     */
    function processActionOpenUrl(appId, url, fromElement) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const typeSafeAppId = new AppId(appId);
        return sendMessageToParentAsync(getApiVersionTag(externalAppCardActionsTelemetryVersionNumber, "externalAppCardActions.processActionOpenUrl" /* ApiName.ExternalAppCardActions_ProcessActionOpenUrl */), 'externalAppCardActions.processActionOpenUrl', [typeSafeAppId.toString(), url.href, fromElement]).then(([error, response]) => {
            if (error) {
                throw error;
            }
            else {
                return response;
            }
        });
    }
    externalAppCardActions.processActionOpenUrl = processActionOpenUrl;
    /**
     * @hidden
     * Checks if the externalAppCardActions capability is supported by the host
     * @returns boolean to represent whether externalAppCardActions capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.externalAppCardActions ? true : false;
    }
    externalAppCardActions.isSupported = isSupported;
})(externalAppCardActions || (externalAppCardActions = {}));

;// ./src/private/externalAppCardActionsForCEA.ts
var externalAppCardActionsForCEA_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * All of APIs in this capability file should send out API version v2 ONLY
 */
const externalAppCardActionsForCEA_externalAppCardActionsTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @beta
 * @hidden
 * Namespace to delegate adaptive card action for Custom Engine Agent execution to the host
 * @internal
 * Limited to Microsoft-internal use
 */
var externalAppCardActionsForCEA;
(function (externalAppCardActionsForCEA) {
    /**
     * @beta
     * @hidden
     * Delegates an Adaptive Card Action.OpenUrl request to the host for the application with the provided app ID.
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application the request is intended for. This must be a UUID
     * @param conversationId To tell the bot what conversation the calls are coming from
     * @param url The URL to open
     * @throws Error if the response has not successfully completed
     * @returns Promise that resolves to ActionOpenUrlType indicating the type of URL that was opened on success and rejects with ActionOpenUrlError if the request fails
     */
    function processActionOpenUrl(appId, conversationId, url) {
        return externalAppCardActionsForCEA_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            validateId(conversationId, new Error('conversation id is not valid.'));
            const [error, response] = yield sendMessageToParentAsync(getApiVersionTag(externalAppCardActionsForCEA_externalAppCardActionsTelemetryVersionNumber, "externalAppCardActionsForCEA.processActionOpenUrl" /* ApiName.ExternalAppCardActionsForCEA_ProcessActionOpenUrl */), "externalAppCardActionsForCEA.processActionOpenUrl" /* ApiName.ExternalAppCardActionsForCEA_ProcessActionOpenUrl */, [appId.toString(), conversationId, url.href]);
            if (error) {
                throw error;
            }
            else {
                return response;
            }
        });
    }
    externalAppCardActionsForCEA.processActionOpenUrl = processActionOpenUrl;
    /**
     * @beta
     * @hidden
     * Delegates an Adaptive Card Action.Submit request to the host for the application with the provided app ID
     * @internal
     * Limited to Microsoft-internal use
     * @param appId ID of the application the request is intended for. This must be a UUID
     * @param conversationId To tell the bot what conversation the calls are coming from
     * @param actionSubmitPayload The Adaptive Card Action.Submit payload
     * @throws Error if host notifies of an error
     * @returns Promise that resolves when the request is completed and rejects with ActionSubmitError if the request fails
     */
    function processActionSubmit(appId, conversationId, actionSubmitPayload) {
        return externalAppCardActionsForCEA_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            validateId(conversationId, new Error('conversation id is not valid.'));
            const error = yield sendAndUnwrap(getApiVersionTag(externalAppCardActionsForCEA_externalAppCardActionsTelemetryVersionNumber, "externalAppCardActionsForCEA.processActionSubmit" /* ApiName.ExternalAppCardActionsForCEA_ProcessActionSubmit */), "externalAppCardActionsForCEA.processActionSubmit" /* ApiName.ExternalAppCardActionsForCEA_ProcessActionSubmit */, appId.toString(), conversationId, actionSubmitPayload);
            if (error) {
                throw error;
            }
        });
    }
    externalAppCardActionsForCEA.processActionSubmit = processActionSubmit;
    /**
     * @beta
     * @hidden
     * Checks if the externalAppCardActionsForCEA capability is supported by the host
     * @returns boolean to represent whether externalAppCardActions capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.externalAppCardActionsForCEA ? true : false;
    }
    externalAppCardActionsForCEA.isSupported = isSupported;
})(externalAppCardActionsForCEA || (externalAppCardActionsForCEA = {}));

;// ./src/private/externalAppCommands.ts
var externalAppCommands_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const externalAppCommandsTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Namespace to delegate the ActionCommand to the host
 * @internal
 * Limited to Microsoft-internal use
 *
 * @beta
 */
var externalAppCommands;
(function (externalAppCommands) {
    /**
     * @internal
     * Limited to Microsoft-internal use
     * @hidden
     * This API delegates an ActionCommand request to the host for the application with the provided following parameters:
     *
     * @param appId ID of the application the request is intended for. This must be a UUID
     * @param commandId extensibilityProvider use this ID to look up the command declared by ActionME
     * @param extractedParameters are the key-value pairs that the dialog will be prepopulated with
     *
     * @returns Promise that resolves with the {@link IActionCommandResponse} when the request is completed and rejects with {@link ActionCommandError} if the request fails
     *
     * @beta
     */
    function processActionCommand(appId, commandId, extractedParameters) {
        return externalAppCommands_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            const typeSafeAppId = new AppId(appId);
            const [error, response] = yield sendMessageToParentAsync(getApiVersionTag(externalAppCommandsTelemetryVersionNumber, "externalAppCommands.processActionCommand" /* ApiName.ExternalAppCommands_ProcessActionCommands */), "externalAppCommands.processActionCommand" /* ApiName.ExternalAppCommands_ProcessActionCommands */, [typeSafeAppId.toString(), commandId, extractedParameters]);
            if (error) {
                throw error;
            }
            else {
                return response;
            }
        });
    }
    externalAppCommands.processActionCommand = processActionCommand;
    /**
     * @hidden
     * Checks if the externalAppCommands capability is supported by the host
     * @returns boolean to represent whether externalAppCommands capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.externalAppCommands ? true : false;
    }
    externalAppCommands.isSupported = isSupported;
})(externalAppCommands || (externalAppCommands = {}));

;// ./src/private/files.ts







/**
 * @hidden
 *
 * Namespace to interact with the files specific part of the SDK.
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const filesTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var files;
(function (files_1) {
    /**
     * @hidden
     *
     * Cloud storage providers registered with Microsoft Teams
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let CloudStorageProvider;
    (function (CloudStorageProvider) {
        CloudStorageProvider["Dropbox"] = "DROPBOX";
        CloudStorageProvider["Box"] = "BOX";
        CloudStorageProvider["Sharefile"] = "SHAREFILE";
        CloudStorageProvider["GoogleDrive"] = "GOOGLEDRIVE";
        CloudStorageProvider["Egnyte"] = "EGNYTE";
        CloudStorageProvider["SharePoint"] = "SharePoint";
    })(CloudStorageProvider = files_1.CloudStorageProvider || (files_1.CloudStorageProvider = {}));
    /**
     * @hidden
     *
     * Cloud storage provider type enums
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let CloudStorageProviderType;
    (function (CloudStorageProviderType) {
        CloudStorageProviderType[CloudStorageProviderType["Sharepoint"] = 0] = "Sharepoint";
        CloudStorageProviderType[CloudStorageProviderType["WopiIntegration"] = 1] = "WopiIntegration";
        CloudStorageProviderType[CloudStorageProviderType["Google"] = 2] = "Google";
        CloudStorageProviderType[CloudStorageProviderType["OneDrive"] = 3] = "OneDrive";
        CloudStorageProviderType[CloudStorageProviderType["Recent"] = 4] = "Recent";
        CloudStorageProviderType[CloudStorageProviderType["Aggregate"] = 5] = "Aggregate";
        CloudStorageProviderType[CloudStorageProviderType["FileSystem"] = 6] = "FileSystem";
        CloudStorageProviderType[CloudStorageProviderType["Search"] = 7] = "Search";
        CloudStorageProviderType[CloudStorageProviderType["AllFiles"] = 8] = "AllFiles";
        CloudStorageProviderType[CloudStorageProviderType["SharedWithMe"] = 9] = "SharedWithMe";
    })(CloudStorageProviderType = files_1.CloudStorageProviderType || (files_1.CloudStorageProviderType = {}));
    /**
     * @hidden
     *
     * Special Document Library enum
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let SpecialDocumentLibraryType;
    (function (SpecialDocumentLibraryType) {
        SpecialDocumentLibraryType["ClassMaterials"] = "classMaterials";
    })(SpecialDocumentLibraryType = files_1.SpecialDocumentLibraryType || (files_1.SpecialDocumentLibraryType = {}));
    /**
     * @hidden
     *
     * Document Library Access enum
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let DocumentLibraryAccessType;
    (function (DocumentLibraryAccessType) {
        DocumentLibraryAccessType["Readonly"] = "readonly";
    })(DocumentLibraryAccessType = files_1.DocumentLibraryAccessType || (files_1.DocumentLibraryAccessType = {}));
    /**
     * @hidden
     *
     * Download status enum
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let FileDownloadStatus;
    (function (FileDownloadStatus) {
        FileDownloadStatus["Downloaded"] = "Downloaded";
        FileDownloadStatus["Downloading"] = "Downloading";
        FileDownloadStatus["Failed"] = "Failed";
    })(FileDownloadStatus = files_1.FileDownloadStatus || (files_1.FileDownloadStatus = {}));
    /**
     * @hidden
     * Hide from docs
     *
     * Actions specific to 3P cloud storage provider file and / or account
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let CloudStorageProviderFileAction;
    (function (CloudStorageProviderFileAction) {
        CloudStorageProviderFileAction["Download"] = "DOWNLOAD";
        CloudStorageProviderFileAction["Upload"] = "UPLOAD";
        CloudStorageProviderFileAction["Delete"] = "DELETE";
    })(CloudStorageProviderFileAction = files_1.CloudStorageProviderFileAction || (files_1.CloudStorageProviderFileAction = {}));
    /**
     * @hidden
     * Hide from docs
     *
     * Gets a list of cloud storage folders added to the channel. This function will not timeout;
     * the callback will only return when the host responds with a list of folders or error.
     *
     * @param channelId - ID of the channel whose cloud storage folders should be retrieved
     * @param callback - Callback that will be triggered post folders load
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getCloudStorageFolders(channelId, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!channelId || channelId.length === 0) {
            throw new Error('[files.getCloudStorageFolders] channelId name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.getCloudStorageFolders] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.getCloudStorageFolders" /* ApiName.Files_GetCloudStorageFolders */), 'files.getCloudStorageFolders', [channelId], callback);
    }
    files_1.getCloudStorageFolders = getCloudStorageFolders;
    /**
     * @hidden
     * Hide from docs
     * ------
     * Initiates the add cloud storage folder flow
     *
     * @param channelId - ID of the channel to add cloud storage folder
     * @param callback - Callback that will be triggered post add folder flow is compelete
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function addCloudStorageFolder(channelId, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!channelId || channelId.length === 0) {
            throw new Error('[files.addCloudStorageFolder] channelId name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.addCloudStorageFolder] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.addCloudStorageFolder" /* ApiName.Files_AddCloudStorageFolder */), 'files.addCloudStorageFolder', [channelId], callback);
    }
    files_1.addCloudStorageFolder = addCloudStorageFolder;
    /**
     * @hidden
     * Hide from docs
     * ------
     *
     * Deletes a cloud storage folder from channel
     *
     * @param channelId - ID of the channel where folder is to be deleted
     * @param folderToDelete - cloud storage folder to be deleted
     * @param callback - Callback that will be triggered post delete
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function deleteCloudStorageFolder(channelId, folderToDelete, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!channelId) {
            throw new Error('[files.deleteCloudStorageFolder] channelId name cannot be null or empty');
        }
        if (!folderToDelete) {
            throw new Error('[files.deleteCloudStorageFolder] folderToDelete cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.deleteCloudStorageFolder] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.deleteCloudStorageFolder" /* ApiName.Files_DeleteCloudStorageFolder */), 'files.deleteCloudStorageFolder', [channelId, folderToDelete], callback);
    }
    files_1.deleteCloudStorageFolder = deleteCloudStorageFolder;
    /**
     * @hidden
     * Hide from docs
     * ------
     *
     * Fetches the contents of a Cloud storage folder (CloudStorageFolder) / sub directory
     *
     * @param folder - Cloud storage folder (CloudStorageFolder) / sub directory (CloudStorageFolderItem)
     * @param providerCode - Code of the cloud storage folder provider
     * @param callback - Callback that will be triggered post contents are loaded
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getCloudStorageFolderContents(folder, providerCode, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!folder || !providerCode) {
            throw new Error('[files.getCloudStorageFolderContents] folder/providerCode name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.getCloudStorageFolderContents] Callback cannot be null');
        }
        if ('isSubdirectory' in folder && !folder.isSubdirectory) {
            throw new Error('[files.getCloudStorageFolderContents] provided folder is not a subDirectory');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.getCloudStorageFolderContents" /* ApiName.Files_GetCloudStorageFolderContents */), 'files.getCloudStorageFolderContents', [folder, providerCode], callback);
    }
    files_1.getCloudStorageFolderContents = getCloudStorageFolderContents;
    /**
     * @hidden
     * Hide from docs
     * ------
     *
     * Open a cloud storage file in Teams
     *
     * @param file - cloud storage file that should be opened
     * @param providerCode - Code of the cloud storage folder provider
     * @param fileOpenPreference - Whether file should be opened in web/inline
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function openCloudStorageFile(file, providerCode, fileOpenPreference) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!file || !providerCode) {
            throw new Error('[files.openCloudStorageFile] file/providerCode cannot be null or empty');
        }
        if (file.isSubdirectory) {
            throw new Error('[files.openCloudStorageFile] provided file is a subDirectory');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.openCloudStorageFile" /* ApiName.Files_OpenCloudStorageFile */), 'files.openCloudStorageFile', [file, providerCode, fileOpenPreference]);
    }
    files_1.openCloudStorageFile = openCloudStorageFile;
    /**
     * @hidden
     * Allow 1st party apps to call this function to get the external
     * third party cloud storage accounts that the tenant supports
     * @param excludeAddedProviders: return a list of support third party
     * cloud storages that hasn't been added yet.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getExternalProviders(excludeAddedProviders = false, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw new Error('[files.getExternalProviders] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.getExternalProviders" /* ApiName.Files_GetExternalProviders */), 'files.getExternalProviders', [excludeAddedProviders], callback);
    }
    files_1.getExternalProviders = getExternalProviders;
    /**
     * @hidden
     * Allow 1st party apps to call this function to move files
     * among SharePoint and third party cloud storages.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function copyMoveFiles(selectedFiles, providerCode, destinationFolder, destinationProviderCode, isMove = false, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!selectedFiles || selectedFiles.length === 0) {
            throw new Error('[files.copyMoveFiles] selectedFiles cannot be null or empty');
        }
        if (!providerCode) {
            throw new Error('[files.copyMoveFiles] providerCode cannot be null or empty');
        }
        if (!destinationFolder) {
            throw new Error('[files.copyMoveFiles] destinationFolder cannot be null or empty');
        }
        if (!destinationProviderCode) {
            throw new Error('[files.copyMoveFiles] destinationProviderCode cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[files.copyMoveFiles] callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.copyMoveFiles" /* ApiName.Files_CopyMoveFiles */), 'files.copyMoveFiles', [selectedFiles, providerCode, destinationFolder, destinationProviderCode, isMove], callback);
    }
    files_1.copyMoveFiles = copyMoveFiles;
    /**
     * @hidden
     * Hide from docs
     *  ------
     *
     * Gets list of downloads for current user
     * @param callback Callback that will be triggered post downloads load
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getFileDownloads(callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw new Error('[files.getFileDownloads] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.getFileDownloads" /* ApiName.Files_GetFileDownloads */), 'files.getFileDownloads', [], callback);
    }
    files_1.getFileDownloads = getFileDownloads;
    /**
     * @hidden
     * Hide from docs
     *
     * Open download preference folder if fileObjectId value is undefined else open folder containing the file with id fileObjectId
     * @param fileObjectId - Id of the file whose containing folder should be opened
     * @param callback Callback that will be triggered post open download folder/path
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function openDownloadFolder(fileObjectId = undefined, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw new Error('[files.openDownloadFolder] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.openDownloadFolder" /* ApiName.Files_OpenDownloadFolder */), 'files.openDownloadFolder', [fileObjectId], callback);
    }
    files_1.openDownloadFolder = openDownloadFolder;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates add 3P cloud storage provider flow, where a pop up window opens for user to select required
     * 3P provider from the configured policy supported 3P provider list, following which user authentication
     * for selected 3P provider is performed on success of which the selected 3P provider support is added for user
     * @beta
     *
     * @param callback Callback that will be triggered post add 3P cloud storage provider action.
     * If the error is encountered (and hence passed back), no provider value is sent back.
     * For success scenarios, error value will be passed as null and a valid provider value is sent.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function addCloudStorageProvider(callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.addCloudStorageProvider] callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.addCloudStorageProvider" /* ApiName.Files_AddCloudStorageProvider */), 'files.addCloudStorageProvider', [], callback);
    }
    files_1.addCloudStorageProvider = addCloudStorageProvider;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates signout of 3P cloud storage provider flow, which will remove the selected
     * 3P cloud storage provider from the list of added providers. No other user input and / or action
     * is required except the 3P cloud storage provider to signout from
     *
     * @param logoutRequest 3P cloud storage provider remove action request content
     * @param callback Callback that will be triggered post signout of 3P cloud storage provider action
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function removeCloudStorageProvider(logoutRequest, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.removeCloudStorageProvider] callback cannot be null');
        }
        if (!(logoutRequest && logoutRequest.content)) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.removeCloudStorageProvider] 3P cloud storage provider request content is missing');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.removeCloudStorageProvider" /* ApiName.Files_RemoveCloudStorageProvider */), 'files.removeCloudStorageProvider', [logoutRequest], callback);
    }
    files_1.removeCloudStorageProvider = removeCloudStorageProvider;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates the add 3P cloud storage file flow, which will add a new file for the given 3P provider
     *
     * @param addNewFileRequest 3P cloud storage provider add action request content
     * @param callback Callback that will be triggered post adding a new file flow is finished
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function addCloudStorageProviderFile(addNewFileRequest, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.addCloudStorageProviderFile] callback cannot be null');
        }
        if (!(addNewFileRequest && addNewFileRequest.content)) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.addCloudStorageProviderFile] 3P cloud storage provider request content is missing');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.addCloudStorageProviderFile" /* ApiName.Files_AddCloudStorageProviderFile */), 'files.addCloudStorageProviderFile', [addNewFileRequest], callback);
    }
    files_1.addCloudStorageProviderFile = addCloudStorageProviderFile;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates the rename 3P cloud storage file flow, which will rename an existing file in the given 3P provider
     *
     * @param renameFileRequest 3P cloud storage provider rename action request content
     * @param callback Callback that will be triggered post renaming an existing file flow is finished
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function renameCloudStorageProviderFile(renameFileRequest, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.renameCloudStorageProviderFile] callback cannot be null');
        }
        if (!(renameFileRequest && renameFileRequest.content)) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.renameCloudStorageProviderFile] 3P cloud storage provider request content is missing');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.renameCloudStorageProviderFile" /* ApiName.Files_RenameCloudStorageProviderFile */), 'files.renameCloudStorageProviderFile', [renameFileRequest], callback);
    }
    files_1.renameCloudStorageProviderFile = renameCloudStorageProviderFile;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates the delete 3P cloud storage file(s) / folder (folder has to be empty) flow,
     * which will delete existing file(s) / folder from the given 3P provider
     *
     * @param deleteFileRequest 3P cloud storage provider delete action request content
     * @param callback Callback that will be triggered post deleting existing file(s) flow is finished
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function deleteCloudStorageProviderFile(deleteFileRequest, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.deleteCloudStorageProviderFile] callback cannot be null');
        }
        if (!(deleteFileRequest &&
            deleteFileRequest.content &&
            deleteFileRequest.content.itemList &&
            deleteFileRequest.content.itemList.length > 0)) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.deleteCloudStorageProviderFile] 3P cloud storage provider request content details are missing');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.deleteCloudStorageProviderFile" /* ApiName.Files_DeleteCloudStorageProviderFile */), 'files.deleteCloudStorageProviderFile', [deleteFileRequest], callback);
    }
    files_1.deleteCloudStorageProviderFile = deleteCloudStorageProviderFile;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates the download 3P cloud storage file(s) flow,
     * which will download existing file(s) from the given 3P provider in the teams client side without sharing any file info in the callback
     *
     * @param downloadFileRequest 3P cloud storage provider download file(s) action request content
     * @param callback Callback that will be triggered post downloading existing file(s) flow is finished
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function downloadCloudStorageProviderFile(downloadFileRequest, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.downloadCloudStorageProviderFile] callback cannot be null');
        }
        if (!(downloadFileRequest &&
            downloadFileRequest.content &&
            downloadFileRequest.content.itemList &&
            downloadFileRequest.content.itemList.length > 0)) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.downloadCloudStorageProviderFile] 3P cloud storage provider request content details are missing');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.downloadCloudStorageProviderFile" /* ApiName.Files_DownloadCloudStorageProviderFile */), 'files.downloadCloudStorageProviderFile', [downloadFileRequest], callback);
    }
    files_1.downloadCloudStorageProviderFile = downloadCloudStorageProviderFile;
    /**
     * @hidden
     * Hide from docs
     *
     * Initiates the upload 3P cloud storage file(s) flow, which will upload file(s) to the given 3P provider
     * @beta
     *
     * @param uploadFileRequest 3P cloud storage provider upload file(s) action request content
     * @param callback Callback that will be triggered post uploading file(s) flow is finished
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function uploadCloudStorageProviderFile(uploadFileRequest, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!callback) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.uploadCloudStorageProviderFile] callback cannot be null');
        }
        if (!(uploadFileRequest &&
            uploadFileRequest.content &&
            uploadFileRequest.content.itemList &&
            uploadFileRequest.content.itemList.length > 0)) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.uploadCloudStorageProviderFile] 3P cloud storage provider request content details are missing');
        }
        if (!uploadFileRequest.content.destinationFolder) {
            throw getSdkError(ErrorCode.INVALID_ARGUMENTS, '[files.uploadCloudStorageProviderFile] Invalid destination folder details');
        }
        sendMessageToParent(getApiVersionTag(filesTelemetryVersionNumber, "files.uploadCloudStorageProviderFile" /* ApiName.Files_UploadCloudStorageProviderFile */), 'files.uploadCloudStorageProviderFile', [uploadFileRequest], callback);
    }
    files_1.uploadCloudStorageProviderFile = uploadCloudStorageProviderFile;
    /**
     * @hidden
     * Hide from docs
     *
     * Register a handler to be called when a user's 3P cloud storage provider list changes i.e.
     * post adding / removing a 3P provider, list is updated
     *
     * @param handler - When 3P cloud storage provider list is updated this handler is called
     *
     * @internal Limited to Microsoft-internal use
     */
    function registerCloudStorageProviderListChangeHandler(handler) {
        ensureInitialized(runtime);
        if (!handler) {
            throw new Error('[registerCloudStorageProviderListChangeHandler] Handler cannot be null');
        }
        registerHandler(getApiVersionTag(filesTelemetryVersionNumber, "files.registerCloudStorageProviderListChangeHandler" /* ApiName.Files_RegisterCloudStorageProviderListChangeHandler */), 'files.cloudStorageProviderListChange', handler);
    }
    files_1.registerCloudStorageProviderListChangeHandler = registerCloudStorageProviderListChangeHandler;
    /**
     * @hidden
     * Hide from docs
     *
     * Register a handler to be called when a user's 3P cloud storage provider content changes i.e.
     * when file(s) is/are added / renamed / deleted / uploaded, the list of files is updated
     *
     * @param handler - When 3P cloud storage provider content is updated this handler is called
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerCloudStorageProviderContentChangeHandler(handler) {
        ensureInitialized(runtime);
        if (!handler) {
            throw new Error('[registerCloudStorageProviderContentChangeHandler] Handler cannot be null');
        }
        registerHandler(getApiVersionTag(filesTelemetryVersionNumber, "files.registerCloudStorageProviderContentChangeHandler" /* ApiName.Files_RegisterCloudStorageProviderContentChangeHandler */), 'files.cloudStorageProviderContentChange', handler);
    }
    files_1.registerCloudStorageProviderContentChangeHandler = registerCloudStorageProviderContentChangeHandler;
    function getSdkError(errorCode, message) {
        const sdkError = {
            errorCode: errorCode,
            message: message,
        };
        return sdkError;
    }
})(files || (files = {}));

;// ./src/private/meetingRoom.ts






/**
 * @hidden
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const meetingRoomTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var meetingRoom;
(function (meetingRoom) {
    /**
     * @hidden
     * Fetch the meeting room info that paired with current client.
     *
     * @returns Promise resolved with meeting room info or rejected with SdkError value
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getPairedMeetingRoomInfo() {
        return new Promise((resolve) => {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            resolve(sendAndHandleSdkError(getApiVersionTag(meetingRoomTelemetryVersionNumber, "meetingRoom.getPairedMeetingRoomInfo" /* ApiName.MeetingRoom_GetPairedMeetingRoomInfo */), 'meetingRoom.getPairedMeetingRoomInfo'));
        });
    }
    meetingRoom.getPairedMeetingRoomInfo = getPairedMeetingRoomInfo;
    /**
     * @hidden
     * Send a command to paired meeting room.
     *
     * @param commandName The command name.
     * @returns Promise resolved upon completion or rejected with SdkError value
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function sendCommandToPairedMeetingRoom(commandName) {
        return new Promise((resolve) => {
            if (!commandName || commandName.length == 0) {
                throw new Error('[meetingRoom.sendCommandToPairedMeetingRoom] Command name cannot be null or empty');
            }
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            resolve(sendAndHandleSdkError(getApiVersionTag(meetingRoomTelemetryVersionNumber, "meetingRoom.sendCommandToPairedMeetingRoom" /* ApiName.MeetingRoom_SendCommandToPairedMeetingRoom */), 'meetingRoom.sendCommandToPairedMeetingRoom', commandName));
        });
    }
    meetingRoom.sendCommandToPairedMeetingRoom = sendCommandToPairedMeetingRoom;
    /**
     * @hidden
     * Registers a handler for meeting room capabilities update.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler The handler to invoke when the capabilities of meeting room update.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerMeetingRoomCapabilitiesUpdateHandler(handler) {
        if (!handler) {
            throw new Error('[meetingRoom.registerMeetingRoomCapabilitiesUpdateHandler] Handler cannot be null');
        }
        ensureInitialized(runtime);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(meetingRoomTelemetryVersionNumber, "meetingRoom.registerMeetingRoomCapabilitiesUpdateHandler" /* ApiName.MeetingRoom_RegisterMeetingRoomCapabilitiesUpdateHandler */), 'meetingRoom.meetingRoomCapabilitiesUpdate', (capabilities) => {
            ensureInitialized(runtime);
            handler(capabilities);
        });
    }
    meetingRoom.registerMeetingRoomCapabilitiesUpdateHandler = registerMeetingRoomCapabilitiesUpdateHandler;
    /**
     * @hidden
     * Hide from docs
     * Registers a handler for meeting room states update.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler The handler to invoke when the states of meeting room update.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerMeetingRoomStatesUpdateHandler(handler) {
        if (!handler) {
            throw new Error('[meetingRoom.registerMeetingRoomStatesUpdateHandler] Handler cannot be null');
        }
        ensureInitialized(runtime);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(meetingRoomTelemetryVersionNumber, "meetingRoom.registerMeetingRoomStatesUpdateHandler" /* ApiName.MeetingRoom_RegisterMeetingRoomStatesUpdateHandler */), 'meetingRoom.meetingRoomStatesUpdate', (states) => {
            ensureInitialized(runtime);
            handler(states);
        });
    }
    meetingRoom.registerMeetingRoomStatesUpdateHandler = registerMeetingRoomStatesUpdateHandler;
    /**
     * @hidden
     *
     * Checks if the meetingRoom capability is supported by the host
     * @returns boolean to represent whether the meetingRoom capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.meetingRoom ? true : false;
    }
    meetingRoom.isSupported = isSupported;
})(meetingRoom || (meetingRoom = {}));

;// ./src/private/notifications.ts





/**
 * @hidden
 * Hidden from Docs
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const notificationsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var notifications;
(function (notifications) {
    /**
     * @hidden
     * display notification API.
     *
     * @param message - Notification message.
     * @param notificationType - Notification type
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function showNotification(showNotificationParameters) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(notificationsTelemetryVersionNumber, "notifications.showNotification" /* ApiName.Notifications_ShowNotification */), 'notifications.showNotification', [showNotificationParameters]);
    }
    notifications.showNotification = showNotification;
    /**
     * @hidden
     *
     * Checks if the notifications capability is supported by the host
     * @returns boolean to represent whether the notifications capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.notifications ? true : false;
    }
    notifications.isSupported = isSupported;
})(notifications || (notifications = {}));

;// ./src/private/otherAppStateChange.ts







/**
 * @hidden
 * @internal
 * @beta
 * Limited to Microsoft-internal use
 *
 * This capability contains the APIs for handling events that happen to other applications on the host
 * *while* the developer's application is running. For example, if the developer wants to be notified
 * when another application has been installed.
 */
var otherAppStateChange;
(function (otherAppStateChange) {
    /**
     * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
     */
    const otherAppStateChangeTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
    /**
     * @hidden
     * @beta
     * @internal
     * Limited to Microsoft-internal use
     *
     * This function allows an app to register a handler that will receive whenever other applications are installed
     * on the host while the developer's application is running.
     *
     * @param appInstallHandler - This handler will be called whenever apps are installed on the host.
     *
     * @throws Error if {@link app.initialize} has not successfully completed, if the platform
     * does not support the otherAppStateChange capability, or if a valid handler is not passed to the function.
     *
     * @example
     * ``` ts
     * if (otherAppStateChange.isSupported()) {
     *  otherAppStateChange.registerAppInstallationHandler((event: otherAppStateChange.OtherAppStateChangeEvent) => {
     *    // code to handle the event goes here
     *  });
     * }
     * ```
     */
    function registerAppInstallationHandler(appInstallHandler) {
        if (!isSupported()) {
            throw new Error(ErrorCode.NOT_SUPPORTED_ON_PLATFORM.toString());
        }
        if (isNullOrUndefined(appInstallHandler)) {
            throw new Error(ErrorCode.INVALID_ARGUMENTS.toString());
        }
        registerHandler(getApiVersionTag(otherAppStateChangeTelemetryVersionNumber, "otherApp.install" /* ApiName.OtherAppStateChange_Install */), "otherApp.install" /* ApiName.OtherAppStateChange_Install */, appInstallHandler);
    }
    otherAppStateChange.registerAppInstallationHandler = registerAppInstallationHandler;
    /**
     * @hidden
     * @beta
     * @internal
     * Limited to Microsoft-internal use
     *
     * This function can be called so that the handler passed to {@link registerAppInstallationHandler}
     * will no longer receive app installation events. If this is called before registering a handler
     * it will have no effect.
     *
     * @throws Error if {@link app.initialize} has not successfully completed or if the platform
     * does not support the otherAppStateChange capability.
     */
    function unregisterAppInstallationHandler() {
        if (!isSupported()) {
            throw new Error(ErrorCode.NOT_SUPPORTED_ON_PLATFORM.toString());
        }
        sendMessageToParent(getApiVersionTag(otherAppStateChangeTelemetryVersionNumber, "otherApp.unregisterInstall" /* ApiName.OtherAppStateChange_UnregisterInstall */), "otherApp.unregisterInstall" /* ApiName.OtherAppStateChange_UnregisterInstall */);
        removeHandler("otherApp.install" /* ApiName.OtherAppStateChange_Install */);
    }
    otherAppStateChange.unregisterAppInstallationHandler = unregisterAppInstallationHandler;
    /**
     * Checks if the otherAppStateChange capability is supported by the host
     * @returns boolean to represent whether the otherAppStateChange capability is supported
     *
     * @throws Error if {@link app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.otherAppStateChange ? true : false;
    }
    otherAppStateChange.isSupported = isSupported;
})(otherAppStateChange || (otherAppStateChange = {}));

;// ./src/private/remoteCamera.ts






/**
 * @hidden
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const remoteCameraTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var remoteCamera;
(function (remoteCamera) {
    /**
     * @hidden
     * Enum used to indicate possible camera control commands.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let ControlCommand;
    (function (ControlCommand) {
        ControlCommand["Reset"] = "Reset";
        ControlCommand["ZoomIn"] = "ZoomIn";
        ControlCommand["ZoomOut"] = "ZoomOut";
        ControlCommand["PanLeft"] = "PanLeft";
        ControlCommand["PanRight"] = "PanRight";
        ControlCommand["TiltUp"] = "TiltUp";
        ControlCommand["TiltDown"] = "TiltDown";
    })(ControlCommand = remoteCamera.ControlCommand || (remoteCamera.ControlCommand = {}));
    /**
     * @hidden
     * Enum used to indicate the reason for the error.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let ErrorReason;
    (function (ErrorReason) {
        ErrorReason[ErrorReason["CommandResetError"] = 0] = "CommandResetError";
        ErrorReason[ErrorReason["CommandZoomInError"] = 1] = "CommandZoomInError";
        ErrorReason[ErrorReason["CommandZoomOutError"] = 2] = "CommandZoomOutError";
        ErrorReason[ErrorReason["CommandPanLeftError"] = 3] = "CommandPanLeftError";
        ErrorReason[ErrorReason["CommandPanRightError"] = 4] = "CommandPanRightError";
        ErrorReason[ErrorReason["CommandTiltUpError"] = 5] = "CommandTiltUpError";
        ErrorReason[ErrorReason["CommandTiltDownError"] = 6] = "CommandTiltDownError";
        ErrorReason[ErrorReason["SendDataError"] = 7] = "SendDataError";
    })(ErrorReason = remoteCamera.ErrorReason || (remoteCamera.ErrorReason = {}));
    /**
     * @hidden
     * Enum used to indicate the reason the session was terminated.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let SessionTerminatedReason;
    (function (SessionTerminatedReason) {
        SessionTerminatedReason[SessionTerminatedReason["None"] = 0] = "None";
        SessionTerminatedReason[SessionTerminatedReason["ControlDenied"] = 1] = "ControlDenied";
        SessionTerminatedReason[SessionTerminatedReason["ControlNoResponse"] = 2] = "ControlNoResponse";
        SessionTerminatedReason[SessionTerminatedReason["ControlBusy"] = 3] = "ControlBusy";
        SessionTerminatedReason[SessionTerminatedReason["AckTimeout"] = 4] = "AckTimeout";
        SessionTerminatedReason[SessionTerminatedReason["ControlTerminated"] = 5] = "ControlTerminated";
        SessionTerminatedReason[SessionTerminatedReason["ControllerTerminated"] = 6] = "ControllerTerminated";
        SessionTerminatedReason[SessionTerminatedReason["DataChannelError"] = 7] = "DataChannelError";
        SessionTerminatedReason[SessionTerminatedReason["ControllerCancelled"] = 8] = "ControllerCancelled";
        SessionTerminatedReason[SessionTerminatedReason["ControlDisabled"] = 9] = "ControlDisabled";
        SessionTerminatedReason[SessionTerminatedReason["ControlTerminatedToAllowOtherController"] = 10] = "ControlTerminatedToAllowOtherController";
    })(SessionTerminatedReason = remoteCamera.SessionTerminatedReason || (remoteCamera.SessionTerminatedReason = {}));
    /**
     * @hidden
     * Fetch a list of the participants with controllable-cameras in a meeting.
     *
     * @param callback - Callback contains 2 parameters, error and participants.
     * error can either contain an error of type SdkError, incase of an error, or null when fetch is successful
     * participants can either contain an array of Participant objects, incase of a successful fetch or null when it fails
     * participants: object that contains an array of participants with controllable-cameras
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getCapableParticipants(callback) {
        if (!callback) {
            throw new Error('[remoteCamera.getCapableParticipants] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.getCapableParticipants" /* ApiName.RemoteCamera_GetCapableParticipants */), 'remoteCamera.getCapableParticipants', callback);
    }
    remoteCamera.getCapableParticipants = getCapableParticipants;
    /**
     * @hidden
     * Request control of a participant's camera.
     *
     * @param participant - Participant specifies the participant to send the request for camera control.
     * @param callback - Callback contains 2 parameters, error and requestResponse.
     * error can either contain an error of type SdkError, incase of an error, or null when fetch is successful
     * requestResponse can either contain the true/false value, incase of a successful request or null when it fails
     * requestResponse: True means request was accepted and false means request was denied
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function requestControl(participant, callback) {
        if (!participant) {
            throw new Error('[remoteCamera.requestControl] Participant cannot be null');
        }
        if (!callback) {
            throw new Error('[remoteCamera.requestControl] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.requestControl" /* ApiName.RemoteCamera_RequestControl */), 'remoteCamera.requestControl', [participant], callback);
    }
    remoteCamera.requestControl = requestControl;
    /**
     * @hidden
     * Send control command to the participant's camera.
     *
     * @param ControlCommand - ControlCommand specifies the command for controling the camera.
     * @param callback - Callback to invoke when the command response returns.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function sendControlCommand(ControlCommand, callback) {
        if (!ControlCommand) {
            throw new Error('[remoteCamera.sendControlCommand] ControlCommand cannot be null');
        }
        if (!callback) {
            throw new Error('[remoteCamera.sendControlCommand] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.sendControlCommand" /* ApiName.RemoteCamera_SendControlCommand */), 'remoteCamera.sendControlCommand', [ControlCommand], callback);
    }
    remoteCamera.sendControlCommand = sendControlCommand;
    /**
     * @hidden
     * Terminate the remote  session
     *
     * @param callback - Callback to invoke when the command response returns.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function terminateSession(callback) {
        if (!callback) {
            throw new Error('[remoteCamera.terminateSession] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.terminateSession" /* ApiName.RemoteCamera_TerminateSession */), 'remoteCamera.terminateSession', callback);
    }
    remoteCamera.terminateSession = terminateSession;
    /**
     * @hidden
     * Registers a handler for change in participants with controllable-cameras.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler - The handler to invoke when the list of participants with controllable-cameras changes.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerOnCapableParticipantsChangeHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnCapableParticipantsChangeHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.registerOnCapableParticipantsChangeHandler" /* ApiName.RemoteCamera_RegisterOnCapableParticipantsChangeHandler */), 'remoteCamera.capableParticipantsChange', handler);
    }
    remoteCamera.registerOnCapableParticipantsChangeHandler = registerOnCapableParticipantsChangeHandler;
    /**
     * @hidden
     * Registers a handler for error.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler - The handler to invoke when there is an error from the camera handler.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerOnErrorHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnErrorHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.registerOnErrorHandler" /* ApiName.RemoteCamera_RegisterOnErrorHandler */), 'remoteCamera.handlerError', handler);
    }
    remoteCamera.registerOnErrorHandler = registerOnErrorHandler;
    /**
     * @hidden
     * Registers a handler for device state change.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler - The handler to invoke when the controlled device changes state.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerOnDeviceStateChangeHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnDeviceStateChangeHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.registerOnDeviceStateChangeHandler" /* ApiName.RemoteCamera_RegisterOnDeviceStateChangeHandler */), 'remoteCamera.deviceStateChange', handler);
    }
    remoteCamera.registerOnDeviceStateChangeHandler = registerOnDeviceStateChangeHandler;
    /**
     * @hidden
     * Registers a handler for session status change.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler - The handler to invoke when the current session status changes.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerOnSessionStatusChangeHandler(handler) {
        if (!handler) {
            throw new Error('[remoteCamera.registerOnSessionStatusChangeHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(remoteCameraTelemetryVersionNumber, "remoteCamera.registerOnSessionStatusChangeHandler" /* ApiName.RemoteCamera_RegisterOnSessionStatusChangeHandler */), 'remoteCamera.sessionStatusChange', handler);
    }
    remoteCamera.registerOnSessionStatusChangeHandler = registerOnSessionStatusChangeHandler;
    /**
     * @hidden
     *
     * Checks if the remoteCamera capability is supported by the host
     * @returns boolean to represent whether the remoteCamera capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.remoteCamera ? true : false;
    }
    remoteCamera.isSupported = isSupported;
})(remoteCamera || (remoteCamera = {}));

;// ./src/private/appEntity.ts





/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const appEntityTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @hidden
 * Namespace to interact with the application entities specific part of the SDK.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
var appEntity;
(function (appEntity_1) {
    /**
     * @hidden
     * Hide from docs
     * --------
     * Open the Tab Gallery and retrieve the app entity
     * @param threadId ID of the thread where the app entity will be created
     * @param categories A list of application categories that will be displayed in the opened tab gallery
     * @param subEntityId An object that will be made available to the application being configured
     *                      through the Context's subEntityId field.
     * @param callback Callback that will be triggered once the app entity information is available.
     *                 The callback takes two arguments: an SdkError in case something happened (i.e.
     *                 no permissions to execute the API) and the app entity configuration, if available
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function selectAppEntity(threadId, categories, subEntityId, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!threadId || threadId.length == 0) {
            throw new Error('[appEntity.selectAppEntity] threadId name cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[appEntity.selectAppEntity] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(appEntityTelemetryVersionNumber, "appEntity.selectAppEntity" /* ApiName.AppEntity_SelectAppEntity */), 'appEntity.selectAppEntity', [threadId, categories, subEntityId], callback);
    }
    appEntity_1.selectAppEntity = selectAppEntity;
    /**
     * @hidden
     *
     * Checks if the appEntity capability is supported by the host
     * @returns boolean to represent whether the appEntity capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.appEntity ? true : false;
    }
    appEntity_1.isSupported = isSupported;
})(appEntity || (appEntity = {}));

;// ./src/private/teams.ts








/**
 * @hidden
 * Namespace to interact with the `teams` specific part of the SDK.
 *
 * @internal
 * Limited to Microsoft-internal use
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const teamsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var teams;
(function (teams) {
    let ChannelType;
    (function (ChannelType) {
        ChannelType[ChannelType["Regular"] = 0] = "Regular";
        ChannelType[ChannelType["Private"] = 1] = "Private";
        ChannelType[ChannelType["Shared"] = 2] = "Shared";
    })(ChannelType = teams.ChannelType || (teams.ChannelType = {}));
    /**
     * @hidden
     * Get a list of channels belong to a Team
     *
     * @param groupId - a team's objectId
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getTeamChannels(groupId, callback) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!groupId) {
            throw new Error('[teams.getTeamChannels] groupId cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[teams.getTeamChannels] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(teamsTelemetryVersionNumber, "teams.getTeamChannels" /* ApiName.Teams_GetTeamChannels */), 'teams.getTeamChannels', [groupId], callback);
    }
    teams.getTeamChannels = getTeamChannels;
    /**
     * @hidden
     * Allow 1st party apps to call this function when they receive migrated errors to inform the Hub/Host to refresh the siteurl
     * when site admin renames siteurl.
     *
     * @param threadId - ID of the thread where the app entity will be created; if threadId is not
     * provided, the threadId from route params will be used.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function refreshSiteUrl(threadId, callback) {
        ensureInitialized(runtime);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!threadId) {
            throw new Error('[teams.refreshSiteUrl] threadId cannot be null or empty');
        }
        if (!callback) {
            throw new Error('[teams.refreshSiteUrl] Callback cannot be null');
        }
        sendMessageToParent(getApiVersionTag(teamsTelemetryVersionNumber, "teams.refreshSiteUrl" /* ApiName.Teams_RefreshSiteUrl */), 'teams.refreshSiteUrl', [threadId], callback);
    }
    teams.refreshSiteUrl = refreshSiteUrl;
    /**
     * @hidden
     *
     * Checks if teams capability is supported by the host
     * @returns boolean to represent whether the teams capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.teams ? true : false;
    }
    teams.isSupported = isSupported;
    /**
     * @hidden
     * @internal
     * Limited to Microsoft-internal use
     */
    let fullTrust;
    (function (fullTrust) {
        /**
         * @hidden
         * @internal
         * Limited to Microsoft-internal use
         */
        let joinedTeams;
        (function (joinedTeams) {
            /**
             * @hidden
             * Allows an app to retrieve information of all user joined teams
             *
             * @param teamInstanceParameters - Optional flags that specify whether to scope call to favorite teams
             * @returns Promise that resolves with information about the user joined teams or rejects with an error when the operation has completed
             *
             * @internal
             * Limited to Microsoft-internal use
             */
            function getUserJoinedTeams(teamInstanceParameters) {
                return new Promise((resolve) => {
                    ensureInitialized(runtime);
                    if (!isSupported()) {
                        throw errorNotSupportedOnPlatform;
                    }
                    if ((GlobalVars.hostClientType === HostClientType.android ||
                        GlobalVars.hostClientType === HostClientType.teamsRoomsAndroid ||
                        GlobalVars.hostClientType === HostClientType.teamsPhones ||
                        GlobalVars.hostClientType === HostClientType.teamsDisplays) &&
                        !isCurrentSDKVersionAtLeast(getUserJoinedTeamsSupportedAndroidClientVersion)) {
                        const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
                        throw new Error(JSON.stringify(oldPlatformError));
                    }
                    /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
                    resolve(sendAndUnwrap(getApiVersionTag(teamsTelemetryVersionNumber, "teams.fullTrust.joinedTeams.getUserJoinedTeams" /* ApiName.Teams_FullTrust_JoinedTeams_GetUserJoinedTeams */), 'getUserJoinedTeams', 
                    /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
                    teamInstanceParameters));
                });
            }
            joinedTeams.getUserJoinedTeams = getUserJoinedTeams;
            /**
             * @hidden
             *
             * Checks if teams.fullTrust.joinedTeams capability is supported by the host
             * @returns boolean to represent whether the teams.fullTrust.joinedTeams capability is supported
             *
             * @throws Error if {@linkcode app.initialize} has not successfully completed
             *
             * @internal
             * Limited to Microsoft-internal use
             */
            function isSupported() {
                return ensureInitialized(runtime) && runtime.supports.teams
                    ? runtime.supports.teams.fullTrust
                        ? runtime.supports.teams.fullTrust.joinedTeams
                            ? true
                            : false
                        : false
                    : false;
            }
            joinedTeams.isSupported = isSupported;
        })(joinedTeams = fullTrust.joinedTeams || (fullTrust.joinedTeams = {}));
        /**
         * @hidden
         * Allows an app to get the configuration setting value
         *
         * @param key - The key for the config setting
         * @returns Promise that resolves with the value for the provided configuration setting or rejects with an error when the operation has completed
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function getConfigSetting(key) {
            return new Promise((resolve) => {
                ensureInitialized(runtime);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                resolve(sendAndUnwrap(getApiVersionTag(teamsTelemetryVersionNumber, "teams.fullTrust.getConfigSetting" /* ApiName.Teams_FullTrust_GetConfigSetting */), 'getConfigSetting', key));
            });
        }
        fullTrust.getConfigSetting = getConfigSetting;
        /**
         * @hidden
         *
         * Checks if teams.fullTrust capability is supported by the host
         * @returns boolean to represent whether the teams.fullTrust capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        function isSupported() {
            return ensureInitialized(runtime) && runtime.supports.teams
                ? runtime.supports.teams.fullTrust
                    ? true
                    : false
                : false;
        }
        fullTrust.isSupported = isSupported;
    })(fullTrust = teams.fullTrust || (teams.fullTrust = {}));
})(teams || (teams = {}));

;// ./src/internal/videoFrameTick.ts

class VideoFrameTick {
    static setTimeout(callback, timeoutInMs) {
        const startedAtInMs = performance.now();
        const id = generateGUID();
        VideoFrameTick.setTimeoutCallbacks[id] = {
            callback,
            timeoutInMs,
            startedAtInMs,
        };
        return id;
    }
    static clearTimeout(id) {
        delete VideoFrameTick.setTimeoutCallbacks[id];
    }
    static setInterval(callback, intervalInMs) {
        VideoFrameTick.setTimeout(function next() {
            callback();
            VideoFrameTick.setTimeout(next, intervalInMs);
        }, intervalInMs);
    }
    /**
     * Call this function whenever a frame comes in, it will check if any timeout is due and call the callback
     */
    static tick() {
        const now = performance.now();
        const timeoutIds = [];
        // find all the timeouts that are due,
        // not to invoke them in the loop to avoid modifying the collection while iterating
        for (const key in VideoFrameTick.setTimeoutCallbacks) {
            const callback = VideoFrameTick.setTimeoutCallbacks[key];
            const start = callback.startedAtInMs;
            if (now - start >= callback.timeoutInMs) {
                timeoutIds.push(key);
            }
        }
        // invoke the callbacks
        for (const id of timeoutIds) {
            const callback = VideoFrameTick.setTimeoutCallbacks[id];
            callback.callback();
            delete VideoFrameTick.setTimeoutCallbacks[id];
        }
    }
}
VideoFrameTick.setTimeoutCallbacks = {};

;// ./src/internal/videoPerformanceStatistics.ts

class VideoPerformanceStatistics {
    constructor(distributionBinSize, 
    /**
     * Function to report the statistics result
     */
    reportStatisticsResult) {
        this.reportStatisticsResult = reportStatisticsResult;
        this.sampleCount = 0;
        this.distributionBins = new Uint32Array(distributionBinSize);
    }
    /**
     * Call this function before processing every frame
     */
    processStarts(effectId, frameWidth, frameHeight, effectParam) {
        VideoFrameTick.tick();
        if (!this.suitableForThisSession(effectId, frameWidth, frameHeight, effectParam)) {
            this.reportAndResetSession(this.getStatistics(), effectId, effectParam, frameWidth, frameHeight);
        }
        this.start();
    }
    processEnds() {
        // calculate duration of the process and record it
        const durationInMillisecond = performance.now() - this.frameProcessingStartedAt;
        const binIndex = Math.floor(Math.max(0, Math.min(this.distributionBins.length - 1, durationInMillisecond)));
        this.distributionBins[binIndex] += 1;
        this.sampleCount += 1;
    }
    getStatistics() {
        if (!this.currentSession) {
            return null;
        }
        return {
            effectId: this.currentSession.effectId,
            effectParam: this.currentSession.effectParam,
            frameHeight: this.currentSession.frameHeight,
            frameWidth: this.currentSession.frameWidth,
            duration: performance.now() - this.currentSession.startedAtInMs,
            sampleCount: this.sampleCount,
            distributionBins: this.distributionBins.slice(),
        };
    }
    start() {
        this.frameProcessingStartedAt = performance.now();
    }
    suitableForThisSession(effectId, frameWidth, frameHeight, effectParam) {
        return (this.currentSession &&
            this.currentSession.effectId === effectId &&
            this.currentSession.effectParam === effectParam &&
            this.currentSession.frameWidth === frameWidth &&
            this.currentSession.frameHeight === frameHeight);
    }
    reportAndResetSession(result, effectId, effectParam, frameWidth, frameHeight) {
        result && this.reportStatisticsResult(result);
        this.resetCurrentSession(this.getNextTimeout(effectId, this.currentSession), effectId, effectParam, frameWidth, frameHeight);
        if (this.timeoutId) {
            VideoFrameTick.clearTimeout(this.timeoutId);
        }
        this.timeoutId = VideoFrameTick.setTimeout((() => this.reportAndResetSession(this.getStatistics(), effectId, effectParam, frameWidth, frameHeight)).bind(this), this.currentSession.timeoutInMs);
    }
    resetCurrentSession(timeoutInMs, effectId, effectParam, frameWidth, frameHeight) {
        this.currentSession = {
            startedAtInMs: performance.now(),
            timeoutInMs,
            effectId,
            effectParam,
            frameWidth,
            frameHeight,
        };
        this.sampleCount = 0;
        this.distributionBins.fill(0);
    }
    // send the statistics result every n second, where n starts from 1, 2, 4...and finally stays at every 30 seconds.
    getNextTimeout(effectId, currentSession) {
        // only reset timeout when new session or effect changed
        if (!currentSession || currentSession.effectId !== effectId) {
            return VideoPerformanceStatistics.initialSessionTimeoutInMs;
        }
        return Math.min(VideoPerformanceStatistics.maxSessionTimeoutInMs, currentSession.timeoutInMs * 2);
    }
}
VideoPerformanceStatistics.initialSessionTimeoutInMs = 1000;
VideoPerformanceStatistics.maxSessionTimeoutInMs = 1000 * 30;

;// ./src/internal/videoPerformanceMonitor.ts



/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const videoPerformanceMonitorTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * This class is used to monitor the performance of video processing, and report performance events.
 */
class VideoPerformanceMonitor {
    constructor(reportPerformanceEvent) {
        this.reportPerformanceEvent = reportPerformanceEvent;
        this.isFirstFrameProcessed = false;
        this.frameProcessTimeLimit = 100;
        this.frameProcessingStartedAt = 0;
        this.frameProcessingTimeCost = 0;
        this.processedFrameCount = 0;
        this.performanceStatistics = new VideoPerformanceStatistics(VideoPerformanceMonitor.distributionBinSize, (result) => this.reportPerformanceEvent(getApiVersionTag(videoPerformanceMonitorTelemetryVersionNumber, "videoPerformanceMonitor.performanceDataGenerated" /* ApiName.VideoPerformanceMonitor_Constructor */), 'video.performance.performanceDataGenerated', [result]));
    }
    /**
     * Start to check frame processing time intervally
     * and report performance event if the average frame processing time is too long.
     */
    startMonitorSlowFrameProcessing() {
        VideoFrameTick.setInterval(() => {
            if (this.processedFrameCount === 0) {
                return;
            }
            const averageFrameProcessingTime = this.frameProcessingTimeCost / this.processedFrameCount;
            if (averageFrameProcessingTime > this.frameProcessTimeLimit) {
                this.reportPerformanceEvent(getApiVersionTag(videoPerformanceMonitorTelemetryVersionNumber, "videoPerformanceMonitor.startMonitorSlowFrameProcessing" /* ApiName.VideoPerformanceMonitor_StartMonitorSlowFrameProcessing */), 'video.performance.frameProcessingSlow', [averageFrameProcessingTime]);
            }
            this.frameProcessingTimeCost = 0;
            this.processedFrameCount = 0;
        }, VideoPerformanceMonitor.calculateFPSInterval);
    }
    /**
     * Define the time limit of frame processing.
     * When the average frame processing time is longer than the time limit, a "video.performance.frameProcessingSlow" event will be reported.
     * @param timeLimit
     */
    setFrameProcessTimeLimit(timeLimit) {
        this.frameProcessTimeLimit = timeLimit;
    }
    /**
     * Call this function when the app starts to switch to the new video effect
     */
    reportApplyingVideoEffect(effectId, effectParam) {
        var _a, _b;
        if (((_a = this.applyingEffect) === null || _a === void 0 ? void 0 : _a.effectId) === effectId && ((_b = this.applyingEffect) === null || _b === void 0 ? void 0 : _b.effectParam) === effectParam) {
            return;
        }
        this.applyingEffect = {
            effectId,
            effectParam,
        };
        this.appliedEffect = undefined;
    }
    /**
     * Call this function when the new video effect is ready
     */
    reportVideoEffectChanged(effectId, effectParam) {
        if (this.applyingEffect === undefined ||
            (this.applyingEffect.effectId !== effectId && this.applyingEffect.effectParam !== effectParam)) {
            // don't handle obsoleted event
            return;
        }
        this.appliedEffect = {
            effectId,
            effectParam,
        };
        this.applyingEffect = undefined;
        this.isFirstFrameProcessed = false;
    }
    /**
     * Call this function when the app starts to process a video frame
     */
    reportStartFrameProcessing(frameWidth, frameHeight) {
        VideoFrameTick.tick();
        if (!this.appliedEffect) {
            return;
        }
        this.frameProcessingStartedAt = performance.now();
        this.performanceStatistics.processStarts(this.appliedEffect.effectId, frameWidth, frameHeight, this.appliedEffect.effectParam);
    }
    /**
     * Call this function when the app finishes successfully processing a video frame
     */
    reportFrameProcessed() {
        var _a;
        if (!this.appliedEffect) {
            return;
        }
        this.processedFrameCount++;
        this.frameProcessingTimeCost += performance.now() - this.frameProcessingStartedAt;
        this.performanceStatistics.processEnds();
        if (!this.isFirstFrameProcessed) {
            this.isFirstFrameProcessed = true;
            this.reportPerformanceEvent(getApiVersionTag(videoPerformanceMonitorTelemetryVersionNumber, "videoPerformanceMonitor.reportFrameProcessed" /* ApiName.VideoPerformanceMonitor_ReportFrameProcessed */), 'video.performance.firstFrameProcessed', [Date.now(), this.appliedEffect.effectId, (_a = this.appliedEffect) === null || _a === void 0 ? void 0 : _a.effectParam]);
        }
    }
    /**
     * Call this function when the app starts to get the texture stream
     */
    reportGettingTextureStream(streamId) {
        this.gettingTextureStreamStartedAt = performance.now();
        this.currentStreamId = streamId;
    }
    /**
     * Call this function when the app finishes successfully getting the texture stream
     */
    reportTextureStreamAcquired() {
        if (this.gettingTextureStreamStartedAt !== undefined) {
            const timeTaken = performance.now() - this.gettingTextureStreamStartedAt;
            this.reportPerformanceEvent(getApiVersionTag(videoPerformanceMonitorTelemetryVersionNumber, "videoPerformanceMonitor.reportTextureStreamAcquired" /* ApiName.VideoPerformanceMonitor_ReportTextureStreamAcquired */), 'video.performance.textureStreamAcquired', [this.currentStreamId, timeTaken]);
        }
    }
}
VideoPerformanceMonitor.distributionBinSize = 1000;
VideoPerformanceMonitor.calculateFPSInterval = 1000;

;// ./src/public/videoEffects.ts
var videoEffects_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var videoEffects_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};









/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const videoEffectsTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to video extensibility of the SDK
 * @beta
 */
var videoEffects;
(function (videoEffects) {
    const videoPerformanceMonitor = inServerSideRenderingEnvironment()
        ? undefined
        : new VideoPerformanceMonitor(sendMessageToParent);
    /**
     * Video frame format enum, currently only support NV12
     * @beta
     */
    let VideoFrameFormat;
    (function (VideoFrameFormat) {
        /** Video format used for encoding and decoding YUV color data in video streaming and storage applications. */
        VideoFrameFormat["NV12"] = "NV12";
    })(VideoFrameFormat = videoEffects.VideoFrameFormat || (videoEffects.VideoFrameFormat = {}));
    /**
     * Video effect change type enum
     * @beta
     */
    let EffectChangeType;
    (function (EffectChangeType) {
        /**
         * Current video effect changed
         */
        EffectChangeType["EffectChanged"] = "EffectChanged";
        /**
         * Disable the video effect
         */
        EffectChangeType["EffectDisabled"] = "EffectDisabled";
    })(EffectChangeType = videoEffects.EffectChangeType || (videoEffects.EffectChangeType = {}));
    /**
     * Predefined failure reasons for preparing the selected video effect
     * @beta
     */
    let EffectFailureReason;
    (function (EffectFailureReason) {
        /**
         * A wrong effect id is provide.
         * Use this reason when the effect id is not found or empty, this may indicate a mismatch between the app and its manifest or a bug of the host.
         */
        EffectFailureReason["InvalidEffectId"] = "InvalidEffectId";
        /**
         * The effect can't be initialized
         */
        EffectFailureReason["InitializationFailure"] = "InitializationFailure";
    })(EffectFailureReason = videoEffects.EffectFailureReason || (videoEffects.EffectFailureReason = {}));
    /**
     * Register callbacks to process the video frames if the host supports it.
     * @beta
     * @param parameters - Callbacks and configuration to process the video frames. A host may support either {@link VideoFrameHandler} or {@link VideoBufferHandler}, but not both.
     * To ensure the video effect works on all supported hosts, the video app must provide both {@link VideoFrameHandler} and {@link VideoBufferHandler}.
     * The host will choose the appropriate callback based on the host's capability.
     *
     * @example
     * ```typescript
     * videoEffects.registerForVideoFrame({
     *   videoFrameHandler: async (videoFrameData) => {
     *     const originalFrame = videoFrameData.videoFrame as VideoFrame;
     *     try {
     *       const processedFrame = await processFrame(originalFrame);
     *       return processedFrame;
     *     } catch (e) {
     *       throw e;
     *     }
     *   },
     *   videoBufferHandler: (
     *     bufferData: VideoBufferData,
     *     notifyVideoFrameProcessed: notifyVideoFrameProcessedFunctionType,
     *     notifyError: notifyErrorFunctionType
     *     ) => {
     *       try {
     *         processFrameInplace(bufferData);
     *         notifyVideoFrameProcessed();
     *       } catch (e) {
     *         notifyError(e);
     *       }
     *     },
     *   config: {
     *     format: videoEffects.VideoPixelFormat.NV12,
     *   }
     * });
     * ```
     */
    function registerForVideoFrame(parameters) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!parameters.videoFrameHandler || !parameters.videoBufferHandler) {
            throw new Error('Both videoFrameHandler and videoBufferHandler must be provided');
        }
        registerHandler(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.setFrameProcessTimeLimitHandler" /* ApiName.VideoEffects_RegisterSetFrameProcessTimeLimitHandler */), 'video.setFrameProcessTimeLimit', (timeLimitInfo) => videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.setFrameProcessTimeLimit(timeLimitInfo.timeLimit), false);
        if (doesSupportMediaStream()) {
            registerForMediaStream(parameters.videoFrameHandler, parameters.config);
        }
        else if (doesSupportSharedFrame()) {
            registerForVideoBuffer(parameters.videoBufferHandler, parameters.config);
        }
        else {
            // should not happen if isSupported() is true
            throw errorNotSupportedOnPlatform;
        }
        videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.startMonitorSlowFrameProcessing();
    }
    videoEffects.registerForVideoFrame = registerForVideoFrame;
    /**
     * Video extension should call this to notify host that the current selected effect parameter changed.
     * If it's pre-meeting, host will call videoEffectCallback immediately then use the videoEffect.
     * If it's the in-meeting scenario, we will call videoEffectCallback when apply button clicked.
     * @beta
     * @param effectChangeType - the effect change type.
     * @param effectId - Newly selected effect id.
     */
    function notifySelectedVideoEffectChanged(effectChangeType, effectId) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.notifySelectedVideoEffectChanged" /* ApiName.VideoEffects_NotifySelectedVideoEffectChanged */), 'video.videoEffectChanged', [effectChangeType, effectId]);
    }
    videoEffects.notifySelectedVideoEffectChanged = notifySelectedVideoEffectChanged;
    /**
     * Register a callback to be notified when a new video effect is applied.
     * @beta
     * @param callback - Function to be called when new video effect is applied.
     */
    function registerForVideoEffect(callback) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.registerEffectParameterChangeHandler" /* ApiName.VideoEffects_RegisterEffectParameterChangeHandler */), 'video.effectParameterChange', createEffectParameterChangeCallback(callback, videoPerformanceMonitor), false);
        sendMessageToParent(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.registerForVideoEffect" /* ApiName.VideoEffects_RegisterForVideoEffect */), 'video.registerForVideoEffect');
    }
    videoEffects.registerForVideoEffect = registerForVideoEffect;
    /**
     * Sending notification to host finished the video frame processing, now host can render this video frame
     * or pass the video frame to next one in video pipeline
     * @beta
     */
    function notifyVideoFrameProcessed(timestamp) {
        sendMessageToParent(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.notifyVideoFrameProcessed" /* ApiName.VideoEffects_NotifyVideoFrameProcessed */), 'video.videoFrameProcessed', [timestamp]);
    }
    /**
     * Sending error notification to host
     * @beta
     * @param errorMessage - The error message that will be sent to the host
     */
    function notifyError(errorMessage) {
        sendMessageToParent(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.notifyError" /* ApiName.VideoEffects_NotifyError */), 'video.notifyError', [errorMessage]);
    }
    /**
     * Checks if video capability is supported by the host.
     * @beta
     * @returns boolean to represent whether the video capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     */
    function isSupported() {
        return (ensureInitialized(runtime) &&
            !!runtime.supports.video &&
            /** A host should support either mediaStream or sharedFrame sub-capability to support the video capability */
            (!!runtime.supports.video.mediaStream || !!runtime.supports.video.sharedFrame));
    }
    videoEffects.isSupported = isSupported;
    function registerForMediaStream(videoFrameHandler, config) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported() || !doesSupportMediaStream()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.startVideoExtensibilityVideoStreamHandler" /* ApiName.VideoEffects_RegisterStartVideoExtensibilityVideoStreamHandler */), 'video.startVideoExtensibilityVideoStream', (mediaStreamInfo) => videoEffects_awaiter(this, void 0, void 0, function* () {
            // when a new streamId is ready:
            const { streamId } = mediaStreamInfo;
            const monitoredVideoFrameHandler = createMonitoredVideoFrameHandler(videoFrameHandler, videoPerformanceMonitor);
            yield processMediaStream(streamId, monitoredVideoFrameHandler, notifyError, videoPerformanceMonitor);
        }), false);
        sendMessageToParent(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.mediaStream.registerForVideoFrame" /* ApiName.VideoEffects_MediaStream_RegisterForVideoFrame */), 'video.mediaStream.registerForVideoFrame', [config]);
    }
    function createMonitoredVideoFrameHandler(videoFrameHandler, videoPerformanceMonitor) {
        return (videoFrameData) => videoEffects_awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalFrame = videoFrameData.videoFrame;
            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportStartFrameProcessing(originalFrame.codedWidth, originalFrame.codedHeight);
            const processedFrame = yield videoFrameHandler(videoFrameData);
            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportFrameProcessed();
            return processedFrame;
        });
    }
    function registerForVideoBuffer(videoBufferHandler, config) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported() || !doesSupportSharedFrame()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.registerForVideoBufferHandler" /* ApiName.VideoEffects_RegisterForVideoBufferHandler */), 'video.newVideoFrame', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (videoBufferData) => {
            if (videoBufferData) {
                const timestamp = videoBufferData.timestamp;
                videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportStartFrameProcessing(videoBufferData.width, videoBufferData.height);
                videoBufferHandler(normalizeVideoBufferData(videoBufferData), () => {
                    videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportFrameProcessed();
                    notifyVideoFrameProcessed(timestamp);
                }, notifyError);
            }
        }, false);
        sendMessageToParent(getApiVersionTag(videoEffectsTelemetryVersionNumber, "videoEffects.registerForVideoFrame" /* ApiName.VideoEffects_RegisterForVideoFrame */), 'video.registerForVideoFrame', [config]);
    }
    function normalizeVideoBufferData(videoBufferData) {
        if ('videoFrameBuffer' in videoBufferData) {
            return videoBufferData;
        }
        else {
            // The host may pass the VideoFrame with the old definition which has `data` instead of `videoFrameBuffer`
            const { data } = videoBufferData, newVideoBufferData = videoEffects_rest(videoBufferData, ["data"]);
            return Object.assign(Object.assign({}, newVideoBufferData), { videoFrameBuffer: data });
        }
    }
    function doesSupportMediaStream() {
        var _a;
        return (ensureInitialized(runtime, FrameContexts.sidePanel) &&
            isTextureStreamAvailable() &&
            !!((_a = runtime.supports.video) === null || _a === void 0 ? void 0 : _a.mediaStream));
    }
    function isTextureStreamAvailable() {
        var _a, _b, _c, _d;
        return !!(((_b = (_a = ssrSafeWindow()['chrome']) === null || _a === void 0 ? void 0 : _a.webview) === null || _b === void 0 ? void 0 : _b.getTextureStream) && ((_d = (_c = ssrSafeWindow()['chrome']) === null || _c === void 0 ? void 0 : _c.webview) === null || _d === void 0 ? void 0 : _d.registerTextureStream));
    }
    function doesSupportSharedFrame() {
        var _a;
        return ensureInitialized(runtime, FrameContexts.sidePanel) && !!((_a = runtime.supports.video) === null || _a === void 0 ? void 0 : _a.sharedFrame);
    }
})(videoEffects || (videoEffects = {})); //end of video namespace

;// ./src/internal/videoEffectsUtils.ts
var videoEffectsUtils_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * @hidden
 * Align with the W3C spec: https://www.w3.org/TR/webcodecs/
 *
 * @internal
 * Limited to Microsoft-internal use
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const videoEffectsUtilTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Create a MediaStreamTrack from the media stream with the given streamId and processed by videoFrameHandler.
 */
function processMediaStream(streamId, videoFrameHandler, notifyError, videoPerformanceMonitor) {
    var _a, _b;
    return videoEffectsUtils_awaiter(this, void 0, void 0, function* () {
        const generator = createProcessedStreamGeneratorWithoutSource();
        !inServerSideRenderingEnvironment() && ((_b = (_a = window['chrome']) === null || _a === void 0 ? void 0 : _a.webview) === null || _b === void 0 ? void 0 : _b.registerTextureStream(streamId, generator));
        pipeVideoSourceToGenerator(yield getInputVideoTrack(streamId, notifyError, videoPerformanceMonitor), new DefaultTransformer(notifyError, videoFrameHandler), generator.writable);
    });
}
/**
 * @hidden
 * Create a MediaStreamTrack from the media stream with the given streamId and processed by videoFrameHandler.
 * The videoFrameHandler will receive metadata of the video frame.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function processMediaStreamWithMetadata(streamId, videoFrameHandler, notifyError, videoPerformanceMonitor) {
    var _a, _b;
    return videoEffectsUtils_awaiter(this, void 0, void 0, function* () {
        const generator = createProcessedStreamGeneratorWithoutSource();
        !inServerSideRenderingEnvironment() && ((_b = (_a = window['chrome']) === null || _a === void 0 ? void 0 : _a.webview) === null || _b === void 0 ? void 0 : _b.registerTextureStream(streamId, generator));
        pipeVideoSourceToGenerator(yield getInputVideoTrack(streamId, notifyError, videoPerformanceMonitor), new TransformerWithMetadata(notifyError, videoFrameHandler), generator.writable);
    });
}
/**
 * Get the video track from the media stream gotten from chrome.webview.getTextureStream(streamId).
 */
function getInputVideoTrack(streamId, notifyError, videoPerformanceMonitor) {
    return videoEffectsUtils_awaiter(this, void 0, void 0, function* () {
        if (inServerSideRenderingEnvironment()) {
            throw errorNotSupportedOnPlatform;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const chrome = ssrSafeWindow()['chrome'];
        try {
            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportGettingTextureStream(streamId);
            const mediaStream = yield chrome.webview.getTextureStream(streamId);
            const tracks = mediaStream.getVideoTracks();
            if (tracks.length === 0) {
                throw new Error(`No video track in stream ${streamId}`);
            }
            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportTextureStreamAcquired();
            return tracks[0];
        }
        catch (error) {
            const errorMsg = `Failed to get video track from stream ${streamId}, error: ${error}`;
            notifyError(errorMsg);
            throw new Error(`Internal error: can't get video track from stream ${streamId}`);
        }
    });
}
/**
 * The function to create a MediaStreamTrack generator.
 * The generator can then get the processed frames as media stream source.
 * The generator can be registered back to the media stream so that the host can get the processed frames.
 */
function createProcessedStreamGeneratorWithoutSource() {
    if (inServerSideRenderingEnvironment()) {
        throw errorNotSupportedOnPlatform;
    }
    const MediaStreamTrackGenerator = window['MediaStreamTrackGenerator'];
    if (!MediaStreamTrackGenerator) {
        throw errorNotSupportedOnPlatform;
    }
    return new MediaStreamTrackGenerator({ kind: 'video' });
}
/**
 * The function to create a processed video track from the original video track.
 * It reads frames from the video track and pipes them to the video frame callback to process the frames.
 * The processed frames are then enqueued to the generator.
 */
function pipeVideoSourceToGenerator(videoTrack, transformer, sink) {
    const MediaStreamTrackProcessor = ssrSafeWindow()['MediaStreamTrackProcessor'];
    const processor = new MediaStreamTrackProcessor({ track: videoTrack });
    const source = processor.readable;
    source.pipeThrough(new TransformStream(transformer)).pipeTo(sink);
}
class DefaultTransformer {
    constructor(notifyError, videoFrameHandler) {
        this.notifyError = notifyError;
        this.videoFrameHandler = videoFrameHandler;
        this.transform = (originalFrame, controller) => videoEffectsUtils_awaiter(this, void 0, void 0, function* () {
            const timestamp = originalFrame.timestamp;
            if (timestamp !== null) {
                try {
                    const frameProcessedByApp = yield this.videoFrameHandler({ videoFrame: originalFrame });
                    // the current typescript version(4.6.4) dosn't support webcodecs API fully, we have to do type conversion here.
                    const processedFrame = new VideoFrame(frameProcessedByApp, {
                        // we need the timestamp to be unchanged from the oirginal frame, so we explicitly set it here.
                        timestamp: timestamp,
                    });
                    controller.enqueue(processedFrame);
                    originalFrame.close();
                    frameProcessedByApp.close();
                }
                catch (error) {
                    originalFrame.close();
                    this.notifyError(error);
                }
            }
            else {
                this.notifyError("timestamp of the original video frame is null" /* VideoFrameTransformErrors.TimestampIsNull */);
            }
        });
    }
}
/**
 * @hidden
 * Utility class to parse the header of a one-texture-input texture.
 */
class OneTextureHeader {
    constructor(headerBuffer, notifyError) {
        this.headerBuffer = headerBuffer;
        this.notifyError = notifyError;
        // Identifier for the texture layout, which is the 4-byte ASCII string "oti1" hardcoded by the host
        // (oti1 stands for "one texture input version 1")
        this.ONE_TEXTURE_INPUT_ID = 0x6f746931;
        this.INVALID_HEADER_ERROR = 'Invalid video frame header';
        this.UNSUPPORTED_LAYOUT_ERROR = 'Unsupported texture layout';
        this.headerDataView = new Uint32Array(headerBuffer);
        // headerDataView will contain the following data:
        // 0: oneTextureLayoutId
        // 1: version
        // 2: frameRowOffset
        // 3: frameFormat
        // 4: frameWidth
        // 5: frameHeight
        // 6: multiStreamHeaderRowOffset
        // 7: multiStreamCount
        if (this.headerDataView.length < 8) {
            this.notifyError(this.INVALID_HEADER_ERROR);
            throw new Error(this.INVALID_HEADER_ERROR);
        }
        // ensure the texture layout is supported
        if (this.headerDataView[0] !== this.ONE_TEXTURE_INPUT_ID) {
            this.notifyError(this.UNSUPPORTED_LAYOUT_ERROR);
            throw new Error(this.UNSUPPORTED_LAYOUT_ERROR);
        }
    }
    get oneTextureLayoutId() {
        return this.headerDataView[0];
    }
    get version() {
        return this.headerDataView[1];
    }
    get frameRowOffset() {
        return this.headerDataView[2];
    }
    get frameFormat() {
        return this.headerDataView[3];
    }
    get frameWidth() {
        return this.headerDataView[4];
    }
    get frameHeight() {
        return this.headerDataView[5];
    }
    get multiStreamHeaderRowOffset() {
        return this.headerDataView[6];
    }
    get multiStreamCount() {
        return this.headerDataView[7];
    }
}
/**
 * @hidden
 * Utility class to parse the metadata of a one-texture-input texture.
 */
class OneTextureMetadata {
    constructor(metadataBuffer, streamCount) {
        this.metadataMap = new Map();
        // Stream id for audio inference metadata, which is the 4-byte ASCII string "1dia" hardcoded by the host
        // (1dia stands for "audio inference data version 1")
        this.AUDIO_INFERENCE_RESULT_STREAM_ID = 0x31646961;
        this.ATTRIBUTE_ID_MAP_STREAM_ID = 0x4d444941;
        const metadataDataView = new Uint32Array(metadataBuffer);
        for (let i = 0, index = 0; i < streamCount; i++) {
            const streamId = metadataDataView[index++];
            const streamDataOffset = metadataDataView[index++];
            const streamDataSize = metadataDataView[index++];
            const streamData = new Uint8Array(metadataBuffer, streamDataOffset, streamDataSize);
            this.metadataMap.set(streamId, streamData);
        }
    }
    get audioInferenceResult() {
        return this.metadataMap.get(this.AUDIO_INFERENCE_RESULT_STREAM_ID);
    }
    /**
     * @hidden
     * Additional attributes on the video frame are string-indexed, with their stream Id dynamically generated.
     * The mapping of attribute Ids to their stream Ids is itself stored as frame metadata with layout:
     *
     * | attribute count  | attribute stream Id  | attribute id                                              | ...   |
     * | :---:            | :---:                | :---:                                                     | :---: |
     * | 4 bytes          | 4 bytes              | variable length string (null terminated, 4 byte aligned)  | ...   |
     *
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    get attributes() {
        const data = this.metadataMap.get(this.ATTRIBUTE_ID_MAP_STREAM_ID);
        if (data === undefined) {
            return undefined;
        }
        const map = new Map();
        const textDecoder = new TextDecoder('utf-8');
        let offset = 0;
        const count = data[offset] + (data[++offset] << 8) + (data[++offset] << 16) + (data[++offset] << 24);
        for (let i = 0; i < count && offset < data.length - 1; i++) {
            const streamId = data[++offset] + (data[++offset] << 8) + (data[++offset] << 16) + (data[++offset] << 24);
            // Find start of null-terminator for the subsequent variable-length string entry
            const nullTerminatorStartIndex = data.findIndex((value, index, _) => {
                return value == 0 && index > offset;
            });
            const attributeId = textDecoder.decode(data.slice(++offset, nullTerminatorStartIndex));
            // Read attribute value from metadata map
            const metadata = this.metadataMap.get(streamId);
            if (metadata !== undefined) {
                map.set(attributeId, metadata);
            }
            // Variable length attribute Id strings are null-terminated to a 4-byte alignment
            const stringByteLength = nullTerminatorStartIndex - offset;
            const paddingSize = 4 - (stringByteLength % 4);
            // Set offset to index of last trailing zero
            offset = nullTerminatorStartIndex + (paddingSize - 1);
        }
        return map;
    }
}
class TransformerWithMetadata {
    constructor(notifyError, videoFrameHandler) {
        this.notifyError = notifyError;
        this.videoFrameHandler = videoFrameHandler;
        this.shouldDiscardAudioInferenceResult = false;
        this.transform = (originalFrame, controller) => videoEffectsUtils_awaiter(this, void 0, void 0, function* () {
            const timestamp = originalFrame.timestamp;
            if (timestamp !== null) {
                try {
                    const { videoFrame, metadata: { audioInferenceResult, attributes } = {} } = yield this.extractVideoFrameAndMetadata(originalFrame);
                    const frameProcessedByApp = yield this.videoFrameHandler({ videoFrame, audioInferenceResult, attributes });
                    // the current typescript version(4.6.4) dosn't support webcodecs API fully, we have to do type conversion here.
                    const processedFrame = new VideoFrame(frameProcessedByApp, {
                        // we need the timestamp to be unchanged from the oirginal frame, so we explicitly set it here.
                        timestamp: timestamp,
                    });
                    controller.enqueue(processedFrame);
                    videoFrame.close();
                    originalFrame.close();
                    frameProcessedByApp.close();
                }
                catch (error) {
                    originalFrame.close();
                    this.notifyError(error);
                }
            }
            else {
                this.notifyError("timestamp of the original video frame is null" /* VideoFrameTransformErrors.TimestampIsNull */);
            }
        });
        /**
         * @hidden
         * Extract video frame and metadata from the given texture.
         * The given texure should be in NV12 format and the layout of the texture should be:
         * | Texture layout        |
         * | :---                  |
         * | Header                |
         * | Real video frame data |
         * | Metadata              |
         *
         * The header data is in the first two rows with the following format:
         * | oneTextureLayoutId | version | frameRowOffset | frameFormat | frameWidth | frameHeight | multiStreamHeaderRowOffset | multiStreamCount | ...   |
         * |    :---:           | :---:   | :---:          |  :---:      |  :---:     |  :---:      |  :---:                     |  :---:           | :---: |
         * | 4 bytes            | 4 bytes | 4 bytes        | 4 bytes     | 4 bytes    | 4 bytes     | 4 bytes                    | 4 bytes          | ...   |
         *
         * After header, it comes with the real video frame data.
         * At the end of the texture, it comes with the metadata. The metadata section can contain multiple types of metadata.
         * Each type of metadata is called a stream. The section is in the following format:
         * | stream1.id | stream1.dataOffset | stream1.dataSize | stream2.id | stream2.dataOffset | stream2.dataSize | ... | stream1.data | stream2.data | ... |
         * | :---:      | :---:              | :---:            |  :---:     |  :---:             |  :---:           |:---:|  :---:       | :---:        |:---:|
         * | 4 bytes    | 4 bytes            | 4 bytes          | 4 bytes    | 4 bytes            | 4 bytes          | ... | ...          | ...          | ... |
         *
         * @internal
         * Limited to Microsoft-internal use
         */
        this.extractVideoFrameAndMetadata = (texture) => videoEffectsUtils_awaiter(this, void 0, void 0, function* () {
            if (inServerSideRenderingEnvironment()) {
                throw errorNotSupportedOnPlatform;
            }
            if (texture.format !== 'NV12') {
                this.notifyError("Unsupported video frame pixel format" /* VideoFrameTransformErrors.UnsupportedVideoFramePixelFormat */);
                throw new Error("Unsupported video frame pixel format" /* VideoFrameTransformErrors.UnsupportedVideoFramePixelFormat */);
            }
            // The rectangle of pixels to copy from the texture. The first two rows are the header.
            const headerRect = { x: 0, y: 0, width: texture.codedWidth, height: 2 };
            // allocate buffer for the header
            // The texture is in NV12 format (https://learn.microsoft.com/windows/win32/medfound/recommended-8-bit-yuv-formats-for-video-rendering#nv12).
            // NV12 has one luma "luminance" plane Y and one UV plane with U and V values interleaved.
            // In NV12, chroma planes (blue and red) are subsampled in both the horizontal and vertical dimensions by a factor of 2.
            // So for a 2×2 group of pixels, you have 4 Y samples and 1 U and 1 V sample, each sample being 1 byte.
            // for a 10×10 NV12 frame: there are 100 Y samples followed by 25 U and 25 V samples interleaved.
            // The graphical representation of the memory layout of a 2×2 NV12 frame is as follows:
            // | Y0 | Y1 | Y2 | Y3 | U0 | V0 |
            // The number of pixels of the header is (headerRect.width * headerRect.height), so the number of bytes of the header is
            // (the size of the Y plane + the size of the UV plane)
            // which is (headerRect.width * headerRect.height) + (headerRect.width * headerRect.height) / 2
            //            = (headerRect.width * headerRect.height * 3) / 2
            const headerBuffer = new ArrayBuffer((headerRect.width * headerRect.height * 3) / 2);
            yield texture.copyTo(headerBuffer, { rect: headerRect });
            const header = new OneTextureHeader(headerBuffer, this.notifyError);
            // The rectangle of pixels to copy from the texture. Metadata are at the bottom.
            const metadataRect = {
                x: 0,
                y: header.multiStreamHeaderRowOffset,
                width: texture.codedWidth,
                height: texture.codedHeight - header.multiStreamHeaderRowOffset,
            };
            // Allocate buffer for the metadata. The number of pixels of the metadata section is
            // (metadataRect.width * metadataRect.height), so the number of bytes of the metadata section is
            // (the size of the Y plane + the size of the UV plane), which is
            // (metadataRect.width * metadataRect.height) + (metadataRect.width * metadataRect.height) / 2
            //   = (metadataRect.width * metadataRect.height * 3) / 2
            const metadataBuffer = new ArrayBuffer((metadataRect.width * metadataRect.height * 3) / 2);
            yield texture.copyTo(metadataBuffer, { rect: metadataRect });
            const metadata = new OneTextureMetadata(metadataBuffer, header.multiStreamCount);
            return {
                videoFrame: new VideoFrame(texture, {
                    timestamp: texture.timestamp,
                    visibleRect: {
                        x: 0,
                        y: header.frameRowOffset,
                        width: header.frameWidth,
                        height: header.frameHeight,
                    },
                }),
                metadata: {
                    audioInferenceResult: this.shouldDiscardAudioInferenceResult ? undefined : metadata.audioInferenceResult,
                    attributes: metadata.attributes,
                },
            };
        });
        registerHandler(getApiVersionTag(videoEffectsUtilTelemetryVersionNumber, "videoEffectsUtils.transformerWithMetadata.constructor" /* ApiName.VideoEffectsUtils_TransformerWithMetadata_Constructor */), 'video.mediaStream.audioInferenceDiscardStatusChange', ({ discardAudioInferenceResult }) => {
            this.shouldDiscardAudioInferenceResult = discardAudioInferenceResult;
        });
    }
}
/**
 * @hidden
 */
function createEffectParameterChangeCallback(callback, videoPerformanceMonitor) {
    return (effectId, effectParam) => {
        videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportApplyingVideoEffect(effectId || '', effectParam);
        callback(effectId, effectParam)
            .then(() => {
            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportVideoEffectChanged(effectId || '', effectParam);
            sendMessageToParent(getApiVersionTag(videoEffectsUtilTelemetryVersionNumber, "videoEffectsUtils.reportVideoEffectChanged" /* ApiName.VideoEffectsUtils_ReportVideoEffectChanged */), 'video.videoEffectReadiness', [true, effectId, undefined, effectParam]);
        })
            .catch((reason) => {
            const validReason = reason in videoEffects.EffectFailureReason ? reason : videoEffects.EffectFailureReason.InitializationFailure;
            sendMessageToParent(getApiVersionTag(videoEffectsUtilTelemetryVersionNumber, "videoEffectsUtils.effectFailure" /* ApiName.VideoEffectsUtils_EffectFailure */), 'video.videoEffectReadiness', [false, effectId, validReason, effectParam]);
        });
    };
}

;// ./src/private/videoEffectsEx.ts
var videoEffectsEx_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};










/**
 * @hidden
 * Extended video API
 * @beta
 *
 * @internal
 * Limited to Microsoft-internal use
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const videoEffectsExTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
var videoEffectsEx;
(function (videoEffectsEx) {
    videoEffectsEx.frameProcessingTimeoutInMs = 2000;
    const videoPerformanceMonitor = inServerSideRenderingEnvironment()
        ? undefined
        : new VideoPerformanceMonitor(sendMessageToParent);
    /**
     * @hidden
     * Error level when notifying errors to the host, the host will decide what to do acording to the error level.
     * @beta
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    let ErrorLevel;
    (function (ErrorLevel) {
        ErrorLevel["Fatal"] = "fatal";
        ErrorLevel["Warn"] = "warn";
    })(ErrorLevel = videoEffectsEx.ErrorLevel || (videoEffectsEx.ErrorLevel = {}));
    /**
     * @hidden
     * Register to process video frames
     * @beta
     *
     * @param parameters - Callbacks and configuration to process the video frames. A host may support either {@link VideoFrameHandler} or {@link VideoBufferHandler}, but not both.
     * To ensure the video effect works on all supported hosts, the video app must provide both {@link VideoFrameHandler} and {@link VideoBufferHandler}.
     * The host will choose the appropriate callback based on the host's capability.
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerForVideoFrame(parameters) {
        var _a, _b;
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!parameters.videoFrameHandler || !parameters.videoBufferHandler) {
            throw new Error('Both videoFrameHandler and videoBufferHandler must be provided');
        }
        if (ensureInitialized(runtime, FrameContexts.sidePanel)) {
            registerHandler(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEX.registerSetFrameProcessTimeLimitHandler" /* ApiName.VideoEffectsEx_RegisterSetFrameProcessTimeLimitHandler */), 'video.setFrameProcessTimeLimit', (timeLimit) => videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.setFrameProcessTimeLimit(timeLimit), false);
            if ((_a = runtime.supports.video) === null || _a === void 0 ? void 0 : _a.mediaStream) {
                registerHandler(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEX.registerStartVideoExtensibilityVideoStreamHandler" /* ApiName.VideoEffectsEx_RegisterStartVideoExtensibilityVideoStreamHandler */), 'video.startVideoExtensibilityVideoStream', (mediaStreamInfo) => videoEffectsEx_awaiter(this, void 0, void 0, function* () {
                    const { streamId, metadataInTexture } = mediaStreamInfo;
                    const handler = videoPerformanceMonitor
                        ? createMonitoredVideoFrameHandler(parameters.videoFrameHandler, videoPerformanceMonitor)
                        : parameters.videoFrameHandler;
                    metadataInTexture
                        ? yield processMediaStreamWithMetadata(streamId, handler, notifyError, videoPerformanceMonitor)
                        : yield processMediaStream(streamId, handler, notifyError, videoPerformanceMonitor);
                }), false);
                sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEX.mediaStream.registerForVideoFrame" /* ApiName.VideoEffectsEx_MediaStream_RegisterForVideoFrame */), 'video.mediaStream.registerForVideoFrame', [parameters.config]);
            }
            else if ((_b = runtime.supports.video) === null || _b === void 0 ? void 0 : _b.sharedFrame) {
                registerHandler(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.registerNewVideoFrameHandler" /* ApiName.VideoEffectsEx_RegisterNewVideoFrameHandler */), 'video.newVideoFrame', (videoBufferData) => {
                    if (videoBufferData) {
                        videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportStartFrameProcessing(videoBufferData.width, videoBufferData.height);
                        const clearProcessingTimeout = createFrameProcessingTimeout();
                        const timestamp = videoBufferData.timestamp;
                        parameters.videoBufferHandler(normalizedVideoBufferData(videoBufferData), () => {
                            clearProcessingTimeout();
                            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.reportFrameProcessed();
                            notifyVideoFrameProcessed(timestamp);
                        }, notifyError);
                    }
                }, false);
                sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.registerForVideoFrame" /* ApiName.VideoEffectsEx_RegisterForVideoFrame */), 'video.registerForVideoFrame', [parameters.config]);
            }
            else {
                // should not happen if isSupported() is true
                throw errorNotSupportedOnPlatform;
            }
            videoPerformanceMonitor === null || videoPerformanceMonitor === void 0 ? void 0 : videoPerformanceMonitor.startMonitorSlowFrameProcessing();
        }
    }
    videoEffectsEx.registerForVideoFrame = registerForVideoFrame;
    function createFrameProcessingTimeout() {
        const frameProcessingTimer = setTimeout(() => {
            notifyError(`Frame not processed in ${videoEffectsEx.frameProcessingTimeoutInMs}ms`, ErrorLevel.Warn);
        }, videoEffectsEx.frameProcessingTimeoutInMs);
        return function clearTimer() {
            clearTimeout(frameProcessingTimer);
        };
    }
    function createMonitoredVideoFrameHandler(videoFrameHandler, videoPerformanceMonitor) {
        return (receivedVideoFrame) => videoEffectsEx_awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originalFrame = receivedVideoFrame.videoFrame;
            videoPerformanceMonitor.reportStartFrameProcessing(originalFrame.codedWidth, originalFrame.codedHeight);
            const clearProcessingTimeout = createFrameProcessingTimeout();
            const processedFrame = yield videoFrameHandler(receivedVideoFrame);
            clearProcessingTimeout();
            videoPerformanceMonitor.reportFrameProcessed();
            return processedFrame;
        });
    }
    function normalizedVideoBufferData(videoBufferData) {
        videoBufferData['videoFrameBuffer'] = videoBufferData['videoFrameBuffer'] || videoBufferData['data'];
        delete videoBufferData['data'];
        return videoBufferData;
    }
    /**
     * @hidden
     * Video extension should call this to notify host that the current selected effect parameter changed.
     * If it's pre-meeting, host will call videoEffectCallback immediately then use the videoEffect.
     * If it's the in-meeting scenario, we will call videoEffectCallback when apply button clicked.
     * @beta
     * @param effectChangeType - the effect change type.
     * @param effectId - Newly selected effect id. {@linkcode VideoEffectCallBack}
     * @param effectParam Variant for the newly selected effect. {@linkcode VideoEffectCallBack}
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function notifySelectedVideoEffectChanged(effectChangeType, effectId, effectParam) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.notifySelectedVideoEffectChanged" /* ApiName.VideoEffectsEx_NotifySelectedVideoEffectChanged */), 'video.videoEffectChanged', [effectChangeType, effectId, effectParam]);
    }
    videoEffectsEx.notifySelectedVideoEffectChanged = notifySelectedVideoEffectChanged;
    /**
     * @hidden
     * Register the video effect callback, host uses this to notify the video extension the new video effect will by applied
     * @beta
     * @param callback - The VideoEffectCallback to invoke when registerForVideoEffect has completed
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function registerForVideoEffect(callback) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.registerEffectParamterChangeHandler" /* ApiName.VideoEffectsEx_RegisterEffectParameterChangeHandler */), 'video.effectParameterChange', createEffectParameterChangeCallback(callback, videoPerformanceMonitor), false);
        sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.registerForVideoEffect" /* ApiName.VideoEffectsEx_RegisterForVideoEffect */), 'video.registerForVideoEffect');
    }
    videoEffectsEx.registerForVideoEffect = registerForVideoEffect;
    /**
     * @hidden
     * Send personalized effects to Teams client
     * @beta
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function updatePersonalizedEffects(effects) {
        ensureInitialized(runtime, FrameContexts.sidePanel);
        if (!videoEffects.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.updatePersonalizedEffects" /* ApiName.VideoEffectsEx_UpdatePersonalizedEffects */), 'video.personalizedEffectsChanged', [effects]);
    }
    videoEffectsEx.updatePersonalizedEffects = updatePersonalizedEffects;
    /**
     * @hidden
     *
     * Checks if video capability is supported by the host
     * @beta
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @returns boolean to represent whether the video capability is supported
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function isSupported() {
        ensureInitialized(runtime);
        return videoEffects.isSupported();
    }
    videoEffectsEx.isSupported = isSupported;
    /**
     * @hidden
     * Sending notification to host finished the video frame processing, now host can render this video frame
     * or pass the video frame to next one in video pipeline
     * @beta
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function notifyVideoFrameProcessed(timestamp) {
        sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.notifyVideoFrameProcessed" /* ApiName.VideoEffectsEx_NotifyVideoFrameProcessed */), 'video.videoFrameProcessed', [timestamp]);
    }
    /**
     * @hidden
     * Sending error notification to host
     * @beta
     * @param errorMessage - The error message that will be sent to the host
     * @param errorLevel - The error level that will be sent to the host
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function notifyError(errorMessage, errorLevel = ErrorLevel.Warn) {
        sendMessageToParent(getApiVersionTag(videoEffectsExTelemetryVersionNumber, "videoEffectsEx.notifyError" /* ApiName.VideoEffectsEx_NotifyError */), 'video.notifyError', [errorMessage, errorLevel]);
    }
    /**
     * @hidden
     * Sending fatal error notification to host. Call this function only when your app meets fatal error and can't continue.
     * The host will stop the video pipeline and terminate this session, and optionally, show an error message to the user.
     * @beta
     * @param errorMessage - The error message that will be sent to the host
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function notifyFatalError(errorMessage) {
        ensureInitialized(runtime);
        if (!videoEffects.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        notifyError(errorMessage, ErrorLevel.Fatal);
    }
    videoEffectsEx.notifyFatalError = notifyFatalError;
})(videoEffectsEx || (videoEffectsEx = {}));

;// ./src/private/hostEntity.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const hostEntityTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * @internal
 * @beta
 * Limited to Microsoft-internal use
 *
 * This capability allows an app to associate apps with a host entity, such as a Teams channel or chat, and configure them as needed.
 */
var hostEntity;
(function (hostEntity) {
    let AppTypes;
    (function (AppTypes) {
        AppTypes["edu"] = "EDU";
    })(AppTypes = hostEntity.AppTypes || (hostEntity.AppTypes = {}));
    /**
     * @hidden
     * @internal
     * @beta
     * Limited to Microsoft-internal use
     *
     * CRUD operations for tabs associated with apps
     */
    let tab;
    (function (tab_1) {
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Launches host-owned UI that lets a user select an app, installs it if required,
         * runs through app configuration if required, and then associates the app with the threadId provided
         *
         * @param hostEntityIds Ids of the host entity like channel, chat or meeting
         *
         * @param appTypes What type of applications to show the user. If EDU is passed as appType, only apps supported by EDU tenant are shown.
         * If no value is passed, all apps are shown.
         *
         * @returns The HostEntityTabInstance of the newly associated app
         *
         * @throws Error if host does not support this capability, library as not been initialized successfully, input parameters are invalid, user cancels operation or installing
         * or configuring or adding tab fails
         */
        function addAndConfigure(hostEntityIds, appTypes) {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw new Error(`Error code: ${ErrorCode.NOT_SUPPORTED_ON_PLATFORM}, message: Not supported on platform`);
            }
            validateThreadId(hostEntityIds.threadId);
            if (appTypes && appTypes.length === 0) {
                throw new Error(`Error code: ${ErrorCode.INVALID_ARGUMENTS}, message: App types cannot be an empty array`);
            }
            return sendMessageToParentAsync(getApiVersionTag(hostEntityTelemetryVersionNumber, "hostEntity.tab.addAndConfigure" /* ApiName.HostEntity_Tab_addAndConfigureApp */), 'hostEntity.tab.addAndConfigure', [hostEntityIds, appTypes]).then(([response]) => {
                var _a;
                if (isSdkError(response)) {
                    throw new Error(`Error code: ${response.errorCode}, message: ${(_a = response.message) !== null && _a !== void 0 ? _a : 'None'}`);
                }
                return response;
            });
        }
        tab_1.addAndConfigure = addAndConfigure;
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Returns all tab instances associated with a host entity
         *
         * @param hostEntityIds Ids of the host entity like channel, chat or meeting
         *
         * @returns Object with array of HostEntityTabInstance's associated with a host entity
         *
         * @throws Error if host does not support this capability, library as not been initialized successfully, input parameters are invalid or fetching tabs fails
         */
        function getAll(hostEntityIds) {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw new Error(`Error code: ${ErrorCode.NOT_SUPPORTED_ON_PLATFORM}, message: Not supported on platform`);
            }
            validateThreadId(hostEntityIds.threadId);
            return sendMessageToParentAsync(getApiVersionTag(hostEntityTelemetryVersionNumber, "hostEntity.tab.getAll" /* ApiName.HostEntity_Tab_getAll */), 'hostEntity.tab.getAll', [hostEntityIds]).then(([response]) => {
                var _a;
                if (isSdkError(response)) {
                    throw new Error(`Error code: ${response.errorCode}, message: ${(_a = response.message) !== null && _a !== void 0 ? _a : 'None'}`);
                }
                return response;
            });
        }
        tab_1.getAll = getAll;
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Launches host-owned UI that lets a user re-configure the contentUrl of the tab
         *
         * @param tab Configurable tab instance that needs to be updated
         *
         * @param hostEntityIds Ids of the host entity like channel, chat or meeting
         *
         * @returns The HostEntityTabInstance of the updated tab
         *
         * @throws Error if host does not support this capability, library as not been initialized successfully, input parameters are invalid, user cancels operation,
         * re-configuring tab fails or if tab is a static tab
         */
        function reconfigure(tab, hostEntityIds) {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw new Error(`Error code: ${ErrorCode.NOT_SUPPORTED_ON_PLATFORM}, message: Not supported on platform`);
            }
            validateTab(tab);
            validateThreadId(hostEntityIds.threadId);
            return sendMessageToParentAsync(getApiVersionTag(hostEntityTelemetryVersionNumber, "hostEntity.tab.reconfigure" /* ApiName.HostEntity_Tab_reconfigure */), 'hostEntity.tab.reconfigure', [tab, hostEntityIds]).then(([response]) => {
                var _a;
                if (isSdkError(response)) {
                    throw new Error(`Error code: ${response.errorCode}, message: ${(_a = response.message) !== null && _a !== void 0 ? _a : 'None'}`);
                }
                return response;
            });
        }
        tab_1.reconfigure = reconfigure;
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Launches host-owned UI that lets a user rename the tab
         *
         * @param tab Configurable tab instance that needs to be updated
         *
         * @param hostEntityIds Ids of the host entity like channel, chat or meeting
         *
         * @returns The HostEntityTabInstance of the updated tab
         *
         * @throws Error if host does not support this capability, library as not been initialized successfully, input parameters are invalid, user cancels operation,
         * re-naming tab fails or if tab is a static tab
         */
        function rename(tab, hostEntityIds) {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw new Error(`Error code: ${ErrorCode.NOT_SUPPORTED_ON_PLATFORM}, message: Not supported on platform`);
            }
            validateTab(tab);
            validateThreadId(hostEntityIds.threadId);
            return sendMessageToParentAsync(getApiVersionTag(hostEntityTelemetryVersionNumber, "hostEntity.tab.rename" /* ApiName.HostEntity_Tab_rename */), 'hostEntity.tab.rename', [tab, hostEntityIds]).then(([response]) => {
                var _a;
                if (isSdkError(response)) {
                    throw new Error(`Error code: ${response.errorCode}, message: ${(_a = response.message) !== null && _a !== void 0 ? _a : 'None'}`);
                }
                return response;
            });
        }
        tab_1.rename = rename;
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Launches host-owned UI that lets a user remove the tab
         *
         * @param tab tab instance that needs to be updated. Can be static tab or configurable tab.
         *
         * @param hostEntityIds Ids of the host entity like channel, chat or meeting
         *
         * @returns Boolean. Returns true if removing tab was successful
         *
         * @throws Error if host does not support this capability, library as not been initialized successfully, input parameters are invalid, user cancels operation or
         * removing tab fails
         */
        function remove(tab, hostEntityIds) {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw new Error(`Error code: ${ErrorCode.NOT_SUPPORTED_ON_PLATFORM}, message: Not supported on platform`);
            }
            validateThreadId(hostEntityIds.threadId);
            validateTab(tab);
            return sendMessageToParentAsync(getApiVersionTag(hostEntityTelemetryVersionNumber, "hostEntity.tab.remove" /* ApiName.HostEntity_Tab_remove */), 'hostEntity.tab.remove', [tab, hostEntityIds]).then(([response]) => {
                var _a;
                if (isSdkError(response)) {
                    throw new Error(`Error code: ${response.errorCode}, message: ${(_a = response.message) !== null && _a !== void 0 ? _a : 'None'}`);
                }
                return true;
            });
        }
        tab_1.remove = remove;
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Checks if the hostEntity.tab capability is supported by the host
         * @returns boolean to represent whether the histEntity and hostEntity.tab capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         */
        function isSupported() {
            var _a;
            return ensureInitialized(runtime) && hostEntity.isSupported() && ((_a = runtime.supports.hostEntity) === null || _a === void 0 ? void 0 : _a.tab) ? true : false;
        }
        tab_1.isSupported = isSupported;
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Checks if the threadId is defined
         * @throws Error if threadId is null, undefined or empty
         */
        function validateThreadId(threadId) {
            if (!threadId || threadId.length == 0) {
                throw new Error(`Error code: ${ErrorCode.INVALID_ARGUMENTS}, message: ThreadId cannot be null or empty`);
            }
        }
        /**
         * @hidden
         * @internal
         * @beta
         * Limited to Microsoft-internal use
         *
         * Checks if the tabId is defined
         * @throws Error if tabId is null, undefined or empty
         */
        function validateTab(tab) {
            if (!(tab === null || tab === void 0 ? void 0 : tab.internalTabInstanceId) || tab.internalTabInstanceId.length === 0) {
                throw new Error(`Error code: ${ErrorCode.INVALID_ARGUMENTS}, message: TabId cannot be null or empty`);
            }
        }
    })(tab = hostEntity.tab || (hostEntity.tab = {}));
    /**
     * @hidden
     * @internal
     * @beta
     * Limited to Microsoft-internal use
     *
     * Checks if the hostEntity capability is supported by the host
     * @returns boolean to represent whether the hostEntity capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.hostEntity ? true : false;
    }
    hostEntity.isSupported = isSupported;
})(hostEntity || (hostEntity = {}));

;// ./src/private/index.ts





















;// ./src/internal/emailAddressValidation.ts
function validateEmailAddress(emailString) {
    const emailIsEmptyOrUndefined = emailString ? emailString.length <= 0 : true;
    const atIndex = emailString === null || emailString === void 0 ? void 0 : emailString.indexOf('@');
    const periodIndexAfterAt = emailString === null || emailString === void 0 ? void 0 : emailString.indexOf('.', atIndex);
    if (emailIsEmptyOrUndefined || atIndex === -1 || periodIndexAfterAt === -1) {
        throw new Error('Input email address does not have the correct format.');
    }
}

;// ./src/public/emailAddress.ts

/**
 * Represents a validated email.
 */
class EmailAddress {
    constructor(val) {
        this.val = val;
        validateEmailAddress(val);
    }
    /**
     * Retrieve the validated email address as a string.
     */
    toString() {
        return this.val;
    }
}

;// ./src/internal/deepLinkConstants.ts
/**
 * App install dialog constants
 */
const teamsDeepLinkUrlPathForAppInstall = '/l/app/';
/**
 * Calendar constants
 */
const teamsDeepLinkUrlPathForCalendar = '/l/meeting/new';
const teamsDeepLinkAttendeesUrlParameterName = 'attendees';
const teamsDeepLinkStartTimeUrlParameterName = 'startTime';
const teamsDeepLinkEndTimeUrlParameterName = 'endTime';
const teamsDeepLinkSubjectUrlParameterName = 'subject';
const teamsDeepLinkContentUrlParameterName = 'content';
/**
 * Call constants
 */
const teamsDeepLinkUrlPathForCall = '/l/call/0/0';
const teamsDeepLinkSourceUrlParameterName = 'source';
const teamsDeepLinkWithVideoUrlParameterName = 'withVideo';
/**
 * Chat constants
 */
const teamsDeepLinkUrlPathForChat = '/l/chat/0/0';
const teamsDeepLinkUsersUrlParameterName = 'users';
const teamsDeepLinkTopicUrlParameterName = 'topicName';
const teamsDeepLinkMessageUrlParameterName = 'message';

;// ./src/internal/deepLinkUtilities.ts


function createTeamsDeepLinkForChat(users, topic, message) {
    if (users.length === 0) {
        throw new Error('Must have at least one user when creating a chat deep link');
    }
    const usersSearchParameter = `${teamsDeepLinkUsersUrlParameterName}=` + users.map((user) => encodeURIComponent(user)).join(',');
    const topicSearchParameter = topic === undefined ? '' : `&${teamsDeepLinkTopicUrlParameterName}=${encodeURIComponent(topic)}`;
    const messageSearchParameter = message === undefined ? '' : `&${teamsDeepLinkMessageUrlParameterName}=${encodeURIComponent(message)}`;
    return `${teamsDeepLinkProtocol}://${teamsDeepLinkHost}${teamsDeepLinkUrlPathForChat}?${usersSearchParameter}${topicSearchParameter}${messageSearchParameter}`;
}
function createTeamsDeepLinkForCall(targets, withVideo, source) {
    if (targets.length === 0) {
        throw new Error('Must have at least one target when creating a call deep link');
    }
    const usersSearchParameter = `${teamsDeepLinkUsersUrlParameterName}=` + targets.map((user) => encodeURIComponent(user)).join(',');
    const withVideoSearchParameter = withVideo === undefined ? '' : `&${teamsDeepLinkWithVideoUrlParameterName}=${encodeURIComponent(withVideo)}`;
    const sourceSearchParameter = source === undefined ? '' : `&${teamsDeepLinkSourceUrlParameterName}=${encodeURIComponent(source)}`;
    return `${teamsDeepLinkProtocol}://${teamsDeepLinkHost}${teamsDeepLinkUrlPathForCall}?${usersSearchParameter}${withVideoSearchParameter}${sourceSearchParameter}`;
}
function createTeamsDeepLinkForCalendar(attendees, startTime, endTime, subject, content) {
    const attendeeSearchParameter = attendees === undefined
        ? ''
        : `${teamsDeepLinkAttendeesUrlParameterName}=` +
            attendees.map((attendee) => encodeURIComponent(attendee)).join(',');
    const startTimeSearchParameter = startTime === undefined ? '' : `&${teamsDeepLinkStartTimeUrlParameterName}=${encodeURIComponent(startTime)}`;
    const endTimeSearchParameter = endTime === undefined ? '' : `&${teamsDeepLinkEndTimeUrlParameterName}=${encodeURIComponent(endTime)}`;
    const subjectSearchParameter = subject === undefined ? '' : `&${teamsDeepLinkSubjectUrlParameterName}=${encodeURIComponent(subject)}`;
    const contentSearchParameter = content === undefined ? '' : `&${teamsDeepLinkContentUrlParameterName}=${encodeURIComponent(content)}`;
    return `${teamsDeepLinkProtocol}://${teamsDeepLinkHost}${teamsDeepLinkUrlPathForCalendar}?${attendeeSearchParameter}${startTimeSearchParameter}${endTimeSearchParameter}${subjectSearchParameter}${contentSearchParameter}`;
}
function createTeamsDeepLinkForAppInstallDialog(appId) {
    if (!appId) {
        throw new Error('App ID must be set when creating an app install dialog deep link');
    }
    return `${teamsDeepLinkProtocol}://${teamsDeepLinkHost}${teamsDeepLinkUrlPathForAppInstall}${encodeURIComponent(appId)}`;
}

;// ./src/public/appInstallDialog.ts






/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const appInstallDialogTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var appInstallDialog;
(function (appInstallDialog) {
    /**
     * Displays a dialog box that allows users to install a specific app within the host environment.
     *
     * @param openAPPInstallDialogParams - See {@link OpenAppInstallDialogParams | OpenAppInstallDialogParams} for more information.
     */
    function openAppInstallDialog(openAPPInstallDialogParams) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
            if (!isSupported()) {
                throw new Error('Not supported');
            }
            const apiVersionTag = getApiVersionTag(appInstallDialogTelemetryVersionNumber, "appInstallDialog.openAppInstallDialog" /* ApiName.AppInstallDialog_OpenAppInstallDialog */);
            if (runtime.isLegacyTeams) {
                resolve(sendAndHandleStatusAndReason(apiVersionTag, 'executeDeepLink', createTeamsDeepLinkForAppInstallDialog(openAPPInstallDialogParams.appId)));
            }
            else {
                sendMessageToParent(apiVersionTag, 'appInstallDialog.openAppInstallDialog', [openAPPInstallDialogParams]);
                resolve();
            }
        });
    }
    appInstallDialog.openAppInstallDialog = openAppInstallDialog;
    /**
     * Checks if the appInstallDialog capability is supported by the host
     * @returns boolean to represent whether the appInstallDialog capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.appInstallDialog ? true : false;
    }
    appInstallDialog.isSupported = isSupported;
})(appInstallDialog || (appInstallDialog = {}));

;// ./src/public/media.ts
/* eslint-disable @typescript-eslint/explicit-member-accessibility */












/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const mediaTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
const mediaLogger = getLogger('media');
/**
 * Interact with media, including capturing and viewing images.
 */
var media;
(function (media) {
    /**
     * Enum for file formats supported
     */
    let FileFormat;
    (function (FileFormat) {
        /** Base64 encoding */
        FileFormat["Base64"] = "base64";
        /** File id */
        FileFormat["ID"] = "id";
    })(FileFormat = media.FileFormat || (media.FileFormat = {}));
    /**
     * File object that can be used to represent image or video or audio
     */
    class File {
    }
    media.File = File;
    /**
     * Launch camera, capture image or choose image from gallery and return the images as a File[] object to the callback.
     *
     * @params callback - Callback will be called with an @see SdkError if there are any.
     * If error is null or undefined, the callback will be called with a collection of @see File objects
     * @remarks
     * Note: Currently we support getting one File through this API, i.e. the file arrays size will be one.
     * Note: For desktop, this API is not supported. Callback will be resolved with ErrorCode.NotSupported.
     *
     */
    function captureImage(callback) {
        if (!callback) {
            throw new Error('[captureImage] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!GlobalVars.isFramelessWindow) {
            const notSupportedError = { errorCode: ErrorCode.NOT_SUPPORTED_ON_PLATFORM };
            /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
            callback(notSupportedError, []);
            return;
        }
        if (!isCurrentSDKVersionAtLeast(captureImageMobileSupportVersion)) {
            const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
            /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
            callback(oldPlatformError, []);
            return;
        }
        sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.captureImage" /* ApiName.Media_CaptureImage */), 'captureImage', callback);
    }
    media.captureImage = captureImage;
    /**
     * Checks whether or not media has user permission
     *
     * @returns Promise that will resolve with true if the user had granted the app permission to media information, or with false otherwise,
     * In case of an error, promise will reject with the error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
     *
     * @beta
     */
    function hasPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isPermissionSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.Media;
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(mediaTelemetryVersionNumber, "media.hasPermission" /* ApiName.Media_HasPermission */), 'permissions.has', permissions));
        });
    }
    media.hasPermission = hasPermission;
    /**
     * Requests user permission for media
     *
     * @returns Promise that will resolve with true if the user consented permission for media, or with false otherwise,
     * In case of an error, promise will reject with the error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
     *
     * @beta
     */
    function requestPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isPermissionSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.Media;
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(mediaTelemetryVersionNumber, "media.requestPermission" /* ApiName.Media_RequestPermission */), 'permissions.request', permissions));
        });
    }
    media.requestPermission = requestPermission;
    /**
     * Checks if permission capability is supported by the host
     * @returns boolean to represent whether permission is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isPermissionSupported() {
        return ensureInitialized(runtime) && runtime.supports.permissions ? true : false;
    }
    /**
     * Media object returned by the select Media API
     */
    class Media extends File {
        constructor(that) {
            super();
            if (that) {
                this.content = that.content;
                this.format = that.format;
                this.mimeType = that.mimeType;
                this.name = that.name;
                this.preview = that.preview;
                this.size = that.size;
            }
        }
        /**
         * Gets the media in chunks irrespective of size, these chunks are assembled and sent back to the webapp as file/blob
         * @param callback - callback is called with the @see SdkError if there is an error
         * If error is null or undefined, the callback will be called with @see Blob.
         */
        getMedia(callback) {
            if (!callback) {
                throw new Error('[get Media] Callback cannot be null');
            }
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            if (!isCurrentSDKVersionAtLeast(mediaAPISupportVersion)) {
                const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
                callback(oldPlatformError, new Blob());
                return;
            }
            if (!validateGetMediaInputs(this.mimeType, this.format, this.content)) {
                const invalidInput = { errorCode: ErrorCode.INVALID_ARGUMENTS };
                callback(invalidInput, new Blob());
                return;
            }
            // Call the new get media implementation via callbacks if the client version is greater than or equal to '2.0.0'
            if (isCurrentSDKVersionAtLeast(getMediaCallbackSupportVersion)) {
                this.getMediaViaCallback(callback);
            }
            else {
                this.getMediaViaHandler(callback);
            }
        }
        /** Function to retrieve media content, such as images or videos, via callback. */
        getMediaViaCallback(callback) {
            const helper = {
                mediaMimeType: this.mimeType,
                assembleAttachment: [],
            };
            const localUriId = [this.content];
            function handleGetMediaCallbackRequest(mediaResult) {
                if (callback) {
                    if (mediaResult && mediaResult.error) {
                        callback(mediaResult.error, new Blob());
                    }
                    else {
                        if (mediaResult && mediaResult.mediaChunk) {
                            // If the chunksequence number is less than equal to 0 implies EOF
                            // create file/blob when all chunks have arrived and we get 0/-1 as chunksequence number
                            if (mediaResult.mediaChunk.chunkSequence <= 0) {
                                const file = createFile(helper.assembleAttachment, helper.mediaMimeType);
                                callback(mediaResult.error, file !== null && file !== void 0 ? file : new Blob());
                            }
                            else {
                                // Keep pushing chunks into assemble attachment
                                const assemble = decodeAttachment(mediaResult.mediaChunk, helper.mediaMimeType);
                                if (assemble) {
                                    helper.assembleAttachment.push(assemble);
                                }
                                else {
                                    mediaLogger(`Received a null assemble attachment for when decoding chunk sequence ${mediaResult.mediaChunk.chunkSequence}; not including the chunk in the assembled file.`);
                                }
                            }
                        }
                        else {
                            callback({ errorCode: ErrorCode.INTERNAL_ERROR, message: 'data received is null' }, new Blob());
                        }
                    }
                }
            }
            sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.getMedia" /* ApiName.Media_GetMedia */), 'getMedia', localUriId, handleGetMediaCallbackRequest);
        }
        /** Function to retrieve media content, such as images or videos, via handler. */
        getMediaViaHandler(callback) {
            const actionName = generateGUID();
            const helper = {
                mediaMimeType: this.mimeType,
                assembleAttachment: [],
            };
            const params = [actionName, this.content];
            this.content &&
                !isNullOrUndefined(callback) &&
                sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.getMedia" /* ApiName.Media_GetMedia */), 'getMedia', params);
            function handleGetMediaRequest(response) {
                if (callback) {
                    /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
                    const mediaResult = JSON.parse(response);
                    if (mediaResult.error) {
                        callback(mediaResult.error, new Blob());
                        removeHandler('getMedia' + actionName);
                    }
                    else {
                        if (mediaResult.mediaChunk) {
                            // If the chunksequence number is less than equal to 0 implies EOF
                            // create file/blob when all chunks have arrived and we get 0/-1 as chunksequence number
                            if (mediaResult.mediaChunk.chunkSequence <= 0) {
                                const file = createFile(helper.assembleAttachment, helper.mediaMimeType);
                                callback(mediaResult.error, file !== null && file !== void 0 ? file : new Blob());
                                removeHandler('getMedia' + actionName);
                            }
                            else {
                                // Keep pushing chunks into assemble attachment
                                const assemble = decodeAttachment(mediaResult.mediaChunk, helper.mediaMimeType);
                                if (assemble) {
                                    helper.assembleAttachment.push(assemble);
                                }
                            }
                        }
                        else {
                            callback({ errorCode: ErrorCode.INTERNAL_ERROR, message: 'data received is null' }, new Blob());
                            removeHandler('getMedia' + actionName);
                        }
                    }
                }
            }
            registerHandler(getApiVersionTag(mediaTelemetryVersionNumber, "media.registerGetMediaRequestHandler" /* ApiName.Media_RegisterGetMediaRequestHandler */), 'getMedia' + actionName, handleGetMediaRequest);
        }
    }
    media.Media = Media;
    /**
     * @hidden
     * Hide from docs
     * --------
     * Base class which holds the callback and notifies events to the host client
     */
    class MediaController {
        constructor(controllerCallback) {
            this.controllerCallback = controllerCallback;
        }
        /**
         * @hidden
         * Hide from docs
         * --------
         * Function to notify the host client to programatically control the experience
         * @param mediaEvent indicates what the event that needs to be signaled to the host client
         * Optional; @param callback is used to send app if host client has successfully handled the notification event or not
         */
        notifyEventToHost(mediaEvent, callback) {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            try {
                throwExceptionIfMobileApiIsNotSupported(nonFullScreenVideoModeAPISupportVersion);
            }
            catch (err) {
                if (callback) {
                    callback(err);
                }
                return;
            }
            const params = { mediaType: this.getMediaType(), mediaControllerEvent: mediaEvent };
            sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.controller" /* ApiName.Media_Controller */), 'media.controller', [params], (err) => {
                if (callback) {
                    callback(err);
                }
            });
        }
        /**
         * Function to programatically stop the ongoing media event
         * Optional; @param callback is used to send app if host client has successfully stopped the event or not
         */
        stop(callback) {
            this.notifyEventToHost(MediaControllerEvent.StopRecording, callback);
        }
    }
    /**
     * VideoController class is used to communicate between the app and the host client during the video capture flow
     */
    class VideoController extends MediaController {
        /** Gets media type video. */
        getMediaType() {
            return MediaType.Video;
        }
        /** Notify or send an event related to the playback and control of video content to a registered application. */
        notifyEventToApp(mediaEvent) {
            if (!this.controllerCallback) {
                // Early return as app has not registered with the callback
                return;
            }
            switch (mediaEvent) {
                case MediaControllerEvent.StartRecording:
                    if (this.controllerCallback.onRecordingStarted) {
                        this.controllerCallback.onRecordingStarted();
                        break;
                    }
            }
        }
    }
    media.VideoController = VideoController;
    /**
     * @beta
     * Events which are used to communicate between the app and the host client during the media recording flow
     */
    let MediaControllerEvent;
    (function (MediaControllerEvent) {
        /** Start recording. */
        MediaControllerEvent[MediaControllerEvent["StartRecording"] = 1] = "StartRecording";
        /** Stop recording. */
        MediaControllerEvent[MediaControllerEvent["StopRecording"] = 2] = "StopRecording";
    })(MediaControllerEvent = media.MediaControllerEvent || (media.MediaControllerEvent = {}));
    /**
     * The modes in which camera can be launched in select Media API
     */
    let CameraStartMode;
    (function (CameraStartMode) {
        /** Photo mode. */
        CameraStartMode[CameraStartMode["Photo"] = 1] = "Photo";
        /** Document mode. */
        CameraStartMode[CameraStartMode["Document"] = 2] = "Document";
        /** Whiteboard mode. */
        CameraStartMode[CameraStartMode["Whiteboard"] = 3] = "Whiteboard";
        /** Business card mode. */
        CameraStartMode[CameraStartMode["BusinessCard"] = 4] = "BusinessCard";
    })(CameraStartMode = media.CameraStartMode || (media.CameraStartMode = {}));
    /**
     * Specifies the image source
     */
    let Source;
    (function (Source) {
        /** Image source is camera. */
        Source[Source["Camera"] = 1] = "Camera";
        /** Image source is gallery. */
        Source[Source["Gallery"] = 2] = "Gallery";
    })(Source = media.Source || (media.Source = {}));
    /**
     * Specifies the type of Media
     */
    let MediaType;
    (function (MediaType) {
        /** Media type photo or image */
        MediaType[MediaType["Image"] = 1] = "Image";
        /** Media type video. */
        MediaType[MediaType["Video"] = 2] = "Video";
        /** Media type video and image. */
        MediaType[MediaType["VideoAndImage"] = 3] = "VideoAndImage";
        /** Media type audio. */
        MediaType[MediaType["Audio"] = 4] = "Audio";
    })(MediaType = media.MediaType || (media.MediaType = {}));
    /**
     * ID contains a mapping for content uri on platform's side, URL is generic
     */
    let ImageUriType;
    (function (ImageUriType) {
        /** Image Id. */
        ImageUriType[ImageUriType["ID"] = 1] = "ID";
        /** Image URL. */
        ImageUriType[ImageUriType["URL"] = 2] = "URL";
    })(ImageUriType = media.ImageUriType || (media.ImageUriType = {}));
    /**
     * Specifies the image output formats.
     */
    let ImageOutputFormats;
    (function (ImageOutputFormats) {
        /** Outputs image.  */
        ImageOutputFormats[ImageOutputFormats["IMAGE"] = 1] = "IMAGE";
        /** Outputs pdf. */
        ImageOutputFormats[ImageOutputFormats["PDF"] = 2] = "PDF";
    })(ImageOutputFormats = media.ImageOutputFormats || (media.ImageOutputFormats = {}));
    /**
     * Select an attachment using camera/gallery
     *
     * @param mediaInputs - The input params to customize the media to be selected
     * @param callback - The callback to invoke after fetching the media
     */
    function selectMedia(mediaInputs, callback) {
        if (!callback) {
            throw new Error('[select Media] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isCurrentSDKVersionAtLeast(mediaAPISupportVersion)) {
            const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, []);
            return;
        }
        try {
            throwExceptionIfMediaCallIsNotSupportedOnMobile(mediaInputs);
        }
        catch (err) {
            callback(err, []);
            return;
        }
        if (!validateSelectMediaInputs(mediaInputs)) {
            const invalidInput = { errorCode: ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, []);
            return;
        }
        const params = [mediaInputs];
        // What comes back from native as attachments would just be objects and will be missing getMedia method on them
        sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.selectMedia" /* ApiName.Media_SelectMedia */), 'selectMedia', params, (err, localAttachments, mediaEvent) => {
            var _a, _b;
            // MediaControllerEvent response is used to notify the app about events and is a partial response to selectMedia
            if (mediaEvent) {
                if (isVideoControllerRegistered(mediaInputs)) {
                    (_b = (_a = mediaInputs === null || mediaInputs === void 0 ? void 0 : mediaInputs.videoProps) === null || _a === void 0 ? void 0 : _a.videoController) === null || _b === void 0 ? void 0 : _b.notifyEventToApp(mediaEvent);
                }
                return;
            }
            // Media Attachments are final response to selectMedia
            if (!localAttachments) {
                callback(err, []);
                return;
            }
            const mediaArray = [];
            for (const attachment of localAttachments) {
                mediaArray.push(new Media(attachment));
            }
            callback(err, mediaArray);
        });
    }
    media.selectMedia = selectMedia;
    /**
     * View images using native image viewer
     *
     * @param uriList - list of URIs for images to be viewed - can be content URI or server URL. Supports up to 10 Images in a single call
     * @param callback - returns back error if encountered, returns null in case of success
     */
    function viewImages(uriList, callback) {
        if (!callback) {
            throw new Error('[view images] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isCurrentSDKVersionAtLeast(mediaAPISupportVersion)) {
            const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError);
            return;
        }
        if (!validateViewImagesInput(uriList)) {
            const invalidInput = { errorCode: ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput);
            return;
        }
        const params = [uriList];
        sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.viewImages" /* ApiName.Media_ViewImages */), 'viewImages', params, callback);
    }
    media.viewImages = viewImages;
    /**
     * @deprecated
     * As of 2.1.0, please use {@link barCode.scanBarCode barCode.scanBarCode(config?: BarCodeConfig): Promise\<string\>} instead.
  
     * Scan Barcode/QRcode using camera
     *
     * @remarks
     * Note: For desktop and web, this API is not supported. Callback will be resolved with ErrorCode.NotSupported.
     *
     * @param callback - callback to invoke after scanning the barcode
     * @param config - optional input configuration to customize the barcode scanning experience
     */
    function scanBarCode(callback, config) {
        if (!callback) {
            throw new Error('[media.scanBarCode] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (GlobalVars.hostClientType === HostClientType.desktop ||
            GlobalVars.hostClientType === HostClientType.web ||
            GlobalVars.hostClientType === HostClientType.rigel ||
            GlobalVars.hostClientType === HostClientType.teamsRoomsWindows ||
            GlobalVars.hostClientType === HostClientType.teamsRoomsAndroid ||
            GlobalVars.hostClientType === HostClientType.teamsPhones ||
            GlobalVars.hostClientType === HostClientType.teamsDisplays) {
            const notSupportedError = { errorCode: ErrorCode.NOT_SUPPORTED_ON_PLATFORM };
            callback(notSupportedError, '');
            return;
        }
        if (!isCurrentSDKVersionAtLeast(scanBarCodeAPIMobileSupportVersion)) {
            const oldPlatformError = { errorCode: ErrorCode.OLD_PLATFORM };
            callback(oldPlatformError, '');
            return;
        }
        if (!validateScanBarCodeInput(config)) {
            const invalidInput = { errorCode: ErrorCode.INVALID_ARGUMENTS };
            callback(invalidInput, '');
            return;
        }
        sendMessageToParent(getApiVersionTag(mediaTelemetryVersionNumber, "media.scanBarCode" /* ApiName.Media_ScanBarCode */), 'media.scanBarCode', [config], callback);
    }
    media.scanBarCode = scanBarCode;
})(media || (media = {}));

;// ./src/internal/mediaUtil.ts



/**
 * @hidden
 * Helper function to create a blob from media chunks based on their sequence
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function createFile(assembleAttachment, mimeType) {
    if (assembleAttachment == null || mimeType == null || assembleAttachment.length <= 0) {
        return null;
    }
    let file = null;
    let sequence = 1;
    assembleAttachment.sort((a, b) => (a.sequence > b.sequence ? 1 : -1));
    assembleAttachment.forEach((item) => {
        if (item.sequence == sequence) {
            if (file) {
                file = new Blob([file, item.file], { type: mimeType });
            }
            else {
                file = new Blob([item.file], { type: mimeType });
            }
            sequence++;
        }
    });
    return file;
}
/**
 * @hidden
 * Helper function to convert Media chunks into another object type which can be later assemebled
 * Converts base 64 encoded string to byte array and then into an array of blobs
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function decodeAttachment(attachment, mimeType) {
    if (attachment == null || mimeType == null) {
        return null;
    }
    const decoded = atob(attachment.chunk);
    const byteNumbers = new Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
        byteNumbers[i] = decoded.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const assemble = {
        sequence: attachment.chunkSequence,
        file: blob,
    };
    return assemble;
}
/**
 * @hidden
 * Function throws an SdkError if the media call is not supported on current mobile version, else undefined.
 *
 * @throws an SdkError if the media call is not supported
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function throwExceptionIfMediaCallIsNotSupportedOnMobile(mediaInputs) {
    if (isMediaCallForVideoAndImageInputs(mediaInputs)) {
        throwExceptionIfMobileApiIsNotSupported(videoAndImageMediaAPISupportVersion);
    }
    else if (isMediaCallForNonFullScreenVideoMode(mediaInputs)) {
        throwExceptionIfMobileApiIsNotSupported(nonFullScreenVideoModeAPISupportVersion);
    }
    else if (isMediaCallForImageOutputFormats(mediaInputs)) {
        throwExceptionIfMobileApiIsNotSupported(imageOutputFormatsAPISupportVersion);
    }
}
/**
 * @hidden
 * Function returns true if the app has registered to listen to video controller events, else false.
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function isVideoControllerRegistered(mediaInputs) {
    if (mediaInputs.mediaType == media.MediaType.Video &&
        mediaInputs.videoProps &&
        mediaInputs.videoProps.videoController) {
        return true;
    }
    return false;
}
/**
 * @hidden
 * Returns true if the mediaInput params are valid and false otherwise
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateSelectMediaInputs(mediaInputs) {
    if (mediaInputs == null || mediaInputs.maxMediaCount > 10) {
        return false;
    }
    return true;
}
/**
 * @hidden
 * Returns true if the mediaInput params are called for mediatype Image and contains Image outputs formats, false otherwise
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function isMediaCallForImageOutputFormats(mediaInputs) {
    var _a;
    if ((mediaInputs === null || mediaInputs === void 0 ? void 0 : mediaInputs.mediaType) == media.MediaType.Image && ((_a = mediaInputs === null || mediaInputs === void 0 ? void 0 : mediaInputs.imageProps) === null || _a === void 0 ? void 0 : _a.imageOutputFormats)) {
        return true;
    }
    return false;
}
/**
 * @hidden
 * Returns true if the mediaInput params are called for mediatype VideoAndImage and false otherwise
 *
 * @internal
 */
function isMediaCallForVideoAndImageInputs(mediaInputs) {
    if (mediaInputs && (mediaInputs.mediaType == media.MediaType.VideoAndImage || mediaInputs.videoAndImageProps)) {
        return true;
    }
    return false;
}
/**
 * @hidden
 * Returns true if the mediaInput params are called for non-full screen video mode and false otherwise
 *
 * @internal
 */
function isMediaCallForNonFullScreenVideoMode(mediaInputs) {
    if (mediaInputs &&
        mediaInputs.mediaType == media.MediaType.Video &&
        mediaInputs.videoProps &&
        !mediaInputs.videoProps.isFullScreenMode) {
        return true;
    }
    return false;
}
/**
 * @hidden
 * Returns true if the get Media params are valid and false otherwise
 *
 * @internal
 */
function validateGetMediaInputs(mimeType, format, content) {
    if (mimeType == null || format == null || format != media.FileFormat.ID || content == null) {
        return false;
    }
    return true;
}
/**
 * @hidden
 * Returns true if the view images param is valid and false otherwise
 *
 * @internal
 */
function validateViewImagesInput(uriList) {
    if (uriList == null || uriList.length <= 0 || uriList.length > 10) {
        return false;
    }
    return true;
}
/**
 * @hidden
 * Returns true if the scan barcode param is valid and false otherwise
 *
 * @internal
 */
function validateScanBarCodeInput(barCodeConfig) {
    if (barCodeConfig) {
        if (barCodeConfig.timeOutIntervalInSec === null ||
            (barCodeConfig.timeOutIntervalInSec != undefined && barCodeConfig.timeOutIntervalInSec <= 0) ||
            (barCodeConfig.timeOutIntervalInSec != undefined && barCodeConfig.timeOutIntervalInSec > 60)) {
            return false;
        }
    }
    return true;
}
/**
 * @hidden
 * Returns true if the people picker params are valid and false otherwise
 *
 * @internal
 */
function validatePeoplePickerInput(peoplePickerInputs) {
    if (peoplePickerInputs) {
        if (peoplePickerInputs.title) {
            if (typeof peoplePickerInputs.title !== 'string') {
                return false;
            }
        }
        if (peoplePickerInputs.setSelected) {
            if (typeof peoplePickerInputs.setSelected !== 'object') {
                return false;
            }
        }
        if (peoplePickerInputs.openOrgWideSearchInChatOrChannel) {
            if (typeof peoplePickerInputs.openOrgWideSearchInChatOrChannel !== 'boolean') {
                return false;
            }
        }
        if (peoplePickerInputs.singleSelect) {
            if (typeof peoplePickerInputs.singleSelect !== 'boolean') {
                return false;
            }
        }
    }
    return true;
}

;// ./src/public/barCode.ts







/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const barCodeTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to interact with the barcode scanning-specific part of the SDK.
 *
 * @beta
 */
var barCode;
(function (barCode) {
    /**
     * Scan Barcode or QRcode using camera
     *
     * @param barCodeConfig - input configuration to customize the barcode scanning experience
     *
     * @returns a scanned code
     *
     * @beta
     */
    function scanBarCode(barCodeConfig) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (!validateScanBarCodeInput(barCodeConfig)) {
                throw { errorCode: ErrorCode.INVALID_ARGUMENTS };
            }
            resolve(sendAndHandleSdkError(getApiVersionTag(barCodeTelemetryVersionNumber, "barCode.scanBarCode" /* ApiName.BarCode_ScanBarCode */), 'media.scanBarCode', barCodeConfig));
        });
    }
    barCode.scanBarCode = scanBarCode;
    /**
     * Checks whether or not media has user permission
     *
     * @returns true if the user has granted the app permission to media information, false otherwise
     *
     * @beta
     */
    function hasPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.Media;
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(barCodeTelemetryVersionNumber, "barCode.hasPermission" /* ApiName.BarCode_HasPermission */), 'permissions.has', permissions));
        });
    }
    barCode.hasPermission = hasPermission;
    /**
     * Requests user permission for media
     *
     * @returns true if the user has granted the app permission to the media, false otherwise
     *
     * @beta
     */
    function requestPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.Media;
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(barCodeTelemetryVersionNumber, "barCode.requestPermission" /* ApiName.BarCode_RequestPermission */), 'permissions.request', permissions));
        });
    }
    barCode.requestPermission = requestPermission;
    /**
     * Checks if barCode capability is supported by the host
     * @returns boolean to represent whether the barCode capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.barCode && runtime.supports.permissions ? true : false;
    }
    barCode.isSupported = isSupported;
})(barCode || (barCode = {}));

;// ./src/public/chat.ts






/**
 * Describes information needed to start a chat
 */
/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const chatTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Contains functionality to start chat with others
 */
var chat;
(function (chat) {
    /**
     * Allows the user to open a chat with a single user and allows
     * for the user to specify the message they wish to send.
     *
     * @param openChatRequest: {@link OpenSingleChatRequest}- a request object that contains a user's email as well as an optional message parameter.
     *
     * @returns Promise resolved upon completion
     */
    function openChat(openChatRequest) {
        const apiVersionTag = getApiVersionTag(chatTelemetryVersionNumber, "chat.openChat" /* ApiName.Chat_OpenChat */);
        return openChatHelper(apiVersionTag, openChatRequest);
    }
    chat.openChat = openChat;
    function openChatHelper(apiVersionTag, openChatRequest) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (runtime.isLegacyTeams) {
                resolve(sendAndHandleStatusAndReason(apiVersionTag, 'executeDeepLink', createTeamsDeepLinkForChat([openChatRequest.user], undefined /*topic*/, openChatRequest.message)));
            }
            else {
                const sendPromise = sendAndHandleStatusAndReason(apiVersionTag, 'chat.openChat', {
                    members: [openChatRequest.user],
                    message: openChatRequest.message,
                });
                resolve(sendPromise);
            }
        });
    }
    /**
     * Allows the user to create a chat with multiple users (2+) and allows
     * for the user to specify a message and name the topic of the conversation. If
     * only 1 user is provided into users array default back to origin openChat.
     *
     * @param openChatRequest: {@link OpenGroupChatRequest} - a request object that contains a list of user emails as well as optional parameters for message and topic (display name for the group chat).
     *
     * @returns Promise resolved upon completion
     */
    function openGroupChat(openChatRequest) {
        const apiVersionTag = getApiVersionTag(chatTelemetryVersionNumber, "chat.openGroupChat" /* ApiName.Chat_OpenGroupChat */);
        return new Promise((resolve) => {
            if (openChatRequest.users.length < 1) {
                throw Error('OpenGroupChat Failed: No users specified');
            }
            if (openChatRequest.users.length === 1) {
                const chatRequest = {
                    user: openChatRequest.users[0],
                    message: openChatRequest.message,
                };
                resolve(openChatHelper(apiVersionTag, chatRequest));
            }
            else {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                if (runtime.isLegacyTeams) {
                    resolve(sendAndHandleStatusAndReason(apiVersionTag, 'executeDeepLink', createTeamsDeepLinkForChat(openChatRequest.users, openChatRequest.topic, openChatRequest.message)));
                }
                else {
                    const sendPromise = sendAndHandleStatusAndReason(apiVersionTag, 'chat.openChat', {
                        members: openChatRequest.users,
                        message: openChatRequest.message,
                        topic: openChatRequest.topic,
                    });
                    resolve(sendPromise);
                }
            }
        });
    }
    chat.openGroupChat = openGroupChat;
    /**
     * Checks if the chat capability is supported by the host
     * @returns boolean to represent whether the chat capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.chat ? true : false;
    }
    chat.isSupported = isSupported;
})(chat || (chat = {}));

;// ./src/public/clipboard.ts
var clipboard_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const clipboardTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Interact with the system clipboard
 *
 * @beta
 */
var clipboard;
(function (clipboard) {
    /**
     * Function to copy data to clipboard.
     * @remarks
     * Note: clipboard.write only supports Text, HTML, PNG, and JPEG data format.
     *       MIME type for Text -> `text/plain`, HTML -> `text/html`, PNG/JPEG -> `image/(png | jpeg)`
     *       Also, JPEG will be converted to PNG image when copying to clipboard.
     *
     * @param blob - A Blob object representing the data to be copied to clipboard.
     * @returns A string promise which resolves to success message from the clipboard or
     *          rejects with error stating the reason for failure.
     */
    function write(blob) {
        return clipboard_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.meetingStage, FrameContexts.task, FrameContexts.settings, FrameContexts.stage, FrameContexts.sidePanel);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (!(blob.type && Object.values(ClipboardSupportedMimeType).includes(blob.type))) {
                throw new Error(`Blob type ${blob.type} is not supported. Supported blob types are ${Object.values(ClipboardSupportedMimeType)}`);
            }
            const base64StringContent = yield getBase64StringFromBlob(blob);
            const writeParams = {
                mimeType: blob.type,
                content: base64StringContent,
            };
            return sendAndHandleSdkError(getApiVersionTag(clipboardTelemetryVersionNumber, "clipboard.write" /* ApiName.Clipboard_Write */), 'clipboard.writeToClipboard', writeParams);
        });
    }
    clipboard.write = write;
    /**
     * Function to read data from clipboard.
     *
     * @returns A promise blob which resolves to the data read from the clipboard or
     *          rejects stating the reason for failure.
     *          Note: Returned blob type will contain one of the MIME type `image/png`, `text/plain` or `text/html`.
     */
    function read() {
        return clipboard_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.meetingStage, FrameContexts.task, FrameContexts.settings, FrameContexts.stage, FrameContexts.sidePanel);
            const apiVersionTag = getApiVersionTag(clipboardTelemetryVersionNumber, "clipboard.read" /* ApiName.Clipboard_Read */);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            const response = yield sendAndHandleSdkError(apiVersionTag, 'clipboard.readFromClipboard');
            if (typeof response === 'string') {
                const data = JSON.parse(response);
                return base64ToBlob(data.mimeType, data.content);
            }
            else {
                return response;
            }
        });
    }
    clipboard.read = read;
    /**
     * Checks if clipboard capability is supported by the host
     * @returns boolean to represent whether the clipboard capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        if (GlobalVars.isFramelessWindow) {
            return ensureInitialized(runtime) && runtime.supports.clipboard ? true : false;
        }
        else {
            return ensureInitialized(runtime) && navigator && navigator.clipboard && runtime.supports.clipboard
                ? true
                : false;
        }
    }
    clipboard.isSupported = isSupported;
})(clipboard || (clipboard = {}));

;// ./src/public/nestedAppAuth.ts


/**
 * @beta
 * Nested app auth capabilities
 */
var nestedAppAuth;
(function (nestedAppAuth) {
    /**
     * Checks if MSAL-NAA channel recommended by the host
     * @returns true if host is recommending NAA channel and false otherwise
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isNAAChannelRecommended() {
        var _a;
        return (_a = (ensureInitialized(runtime) && runtime.isNAAChannelRecommended)) !== null && _a !== void 0 ? _a : false;
    }
    nestedAppAuth.isNAAChannelRecommended = isNAAChannelRecommended;
})(nestedAppAuth || (nestedAppAuth = {}));

;// ./src/public/geoLocation.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const geoLocationTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to interact with the geoLocation module-specific part of the SDK. This is the newer version of location module.
 *
 * @beta
 */
var geoLocation;
(function (geoLocation) {
    /**
     * Fetches current user coordinates
     * @returns Promise that will resolve with {@link geoLocation.Location} object or reject with an error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
     *
     * @beta
     */
    function getCurrentLocation() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        return sendAndHandleSdkError(getApiVersionTag(geoLocationTelemetryVersionNumber, "geoLocation.getCurrentLocation" /* ApiName.GeoLocation_GetCurrentLocation */), 'location.getLocation', {
            allowChooseLocation: false,
            showMap: false,
        });
    }
    geoLocation.getCurrentLocation = getCurrentLocation;
    /**
     * Checks whether or not location has user permission
     *
     * @returns Promise that will resolve with true if the user had granted the app permission to location information, or with false otherwise,
     * In case of an error, promise will reject with the error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
     *
     * @beta
     */
    function hasPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.GeoLocation;
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(geoLocationTelemetryVersionNumber, "geoLocation.hasPermission" /* ApiName.GeoLocation_HasPermission */), 'permissions.has', permissions));
        });
    }
    geoLocation.hasPermission = hasPermission;
    /**
     * Requests user permission for location
     *
     * @returns true if the user consented permission for location, false otherwise
     * @returns Promise that will resolve with true if the user consented permission for location, or with false otherwise,
     * In case of an error, promise will reject with the error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
     *
     * @beta
     */
    function requestPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.GeoLocation;
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(geoLocationTelemetryVersionNumber, "geoLocation.requestPermission" /* ApiName.GeoLocation_RequestPermission */), 'permissions.request', permissions));
        });
    }
    geoLocation.requestPermission = requestPermission;
    /**
     * Checks if geoLocation capability is supported by the host
     * @returns boolean to represent whether geoLocation is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.geoLocation && runtime.supports.permissions ? true : false;
    }
    geoLocation.isSupported = isSupported;
    /**
     * Namespace to interact with the location on map module-specific part of the SDK.
     *
     * @beta
     */
    let map;
    (function (map) {
        /**
         * Allows user to choose location on map
         *
         * @returns Promise that will resolve with {@link geoLocation.Location} object chosen by the user or reject with an error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
         *
         * @beta
         */
        function chooseLocation() {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            return sendAndHandleSdkError(getApiVersionTag(geoLocationTelemetryVersionNumber, "geoLocation.map.chooseLocation" /* ApiName.GeoLocation_Map_ChooseLocation */), 'location.getLocation', {
                allowChooseLocation: true,
                showMap: true,
            });
        }
        map.chooseLocation = chooseLocation;
        /**
         * Shows the location on map corresponding to the given coordinates
         *
         * @param location - Location to be shown on the map
         * @returns Promise that resolves when the location dialog has been closed or reject with an error. Function can also throw a NOT_SUPPORTED_ON_PLATFORM error
         *
         * @beta
         */
        function showLocation(location) {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (!location) {
                throw { errorCode: ErrorCode.INVALID_ARGUMENTS };
            }
            return sendAndHandleSdkError(getApiVersionTag(geoLocationTelemetryVersionNumber, "geoLocation.showLocation" /* ApiName.GeoLocation_ShowLocation */), 'location.showLocation', location);
        }
        map.showLocation = showLocation;
        /**
         * Checks if geoLocation.map capability is supported by the host
         * @returns boolean to represent whether geoLocation.map is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @beta
         */
        function isSupported() {
            return ensureInitialized(runtime) &&
                runtime.supports.geoLocation &&
                runtime.supports.geoLocation.map &&
                runtime.supports.permissions
                ? true
                : false;
        }
        map.isSupported = isSupported;
    })(map = geoLocation.map || (geoLocation.map = {}));
})(geoLocation || (geoLocation = {}));

;// ./src/public/adaptiveCards.ts

/**
 * @returns The {@linkcode AdaptiveCardVersion} representing the Adaptive Card schema
 * version supported by the host, or undefined if the host does not support Adaptive Cards
 */
function getAdaptiveCardSchemaVersion() {
    if (!runtime.hostVersionsInfo) {
        return undefined;
    }
    else {
        return runtime.hostVersionsInfo.adaptiveCardSchemaVersion;
    }
}

;// ./src/public/appWindow.ts
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */







/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const appWindowTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * An object that application can utilize to establish communication
 * with the child window it opened, which contains the corresponding task.
 */
class ChildAppWindow {
    /**
     * Send a message to the ChildAppWindow.
     *
     * @param message - The message to send
     * @param onComplete - The callback to know if the postMessage has been success/failed.
     */
    postMessage(message, onComplete) {
        ensureInitialized(runtime);
        sendMessageToParent(getApiVersionTag(appWindowTelemetryVersionNumber, "appWindow.childAppWindow.postMessage" /* ApiName.AppWindow_ChildAppWindow_PostMessage */), 'messageForChild', [message], onComplete ? onComplete : getGenericOnCompleteHandler());
    }
    /**
     * Add a listener that will be called when an event is received from the ChildAppWindow.
     *
     * @param type - The event to listen to. Currently the only supported type is 'message'.
     * @param listener - The listener that will be called
     */
    addEventListener(type, listener) {
        ensureInitialized(runtime);
        if (type === 'message') {
            registerHandler(getApiVersionTag(appWindowTelemetryVersionNumber, "appWindow.childAppWindow.addEventListener" /* ApiName.AppWindow_ChildAppWindow_AddEventListener */), 'messageForParent', listener);
        }
    }
}
/**
 * An object that is utilized to facilitate communication with a parent window
 * that initiated the opening of current window. For instance, a dialog or task
 * module would utilize it to transmit messages to the application that launched it.
 */
class ParentAppWindow {
    /** Get the parent window instance. */
    static get Instance() {
        // Do you need arguments? Make it a regular method instead.
        return this._instance || (this._instance = new this());
    }
    /**
     * Send a message to the ParentAppWindow.
     *
     * @param message - The message to send
     * @param onComplete - The callback to know if the postMessage has been success/failed.
     */
    postMessage(message, onComplete) {
        ensureInitialized(runtime, FrameContexts.task);
        sendMessageToParent(getApiVersionTag(appWindowTelemetryVersionNumber, "appWindow.parentAppWindow.postMessage" /* ApiName.AppWindow_ParentAppWindow_PostMessage */), 'messageForParent', [message], onComplete ? onComplete : getGenericOnCompleteHandler());
    }
    /**
     * Add a listener that will be called when an event is received from the ParentAppWindow.
     *
     * @param type - The event to listen to. Currently the only supported type is 'message'.
     * @param listener - The listener that will be called
     */
    addEventListener(type, listener) {
        ensureInitialized(runtime, FrameContexts.task);
        if (type === 'message') {
            registerHandler(getApiVersionTag(appWindowTelemetryVersionNumber, "appWindow.parentAppWindow.addEventListener" /* ApiName.AppWindow_ParentAppWindow_AddEventListener */), 'messageForChild', listener);
        }
    }
}

;// ./src/public/secondaryBrowser.ts







/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const secondaryBrowserTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to power up the in-app browser experiences in the host app.
 * For e.g., opening a URL in the host app inside a browser
 *
 * @beta
 */
var secondaryBrowser;
(function (secondaryBrowser) {
    /**
     * Open a URL in the secondary browser.
     *
     * On mobile, this is the in-app browser.
     *
     * On web and desktop, please use the `window.open()` method or other native external browser methods.
     *
     * @param url Url to open in the browser
     * @returns Promise that successfully resolves if the URL  opens in the secondaryBrowser
     * or throws an error {@link SdkError} incase of failure before starting navigation
     *
     * @remarks Any error that happens after navigation begins is handled by the platform browser component and not returned from this function.
     * @beta
     */
    function open(url) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!url || !isValidHttpsURL(url)) {
            throw { errorCode: ErrorCode.INVALID_ARGUMENTS, message: 'Invalid Url: Only https URL is allowed' };
        }
        return sendAndHandleSdkError(getApiVersionTag(secondaryBrowserTelemetryVersionNumber, "secondaryBrowser.openUrl" /* ApiName.SecondaryBrowser_OpenUrl */), 'secondaryBrowser.open', url.toString());
    }
    secondaryBrowser.open = open;
    /**
     * Checks if secondaryBrowser capability is supported by the host
     * @returns boolean to represent whether secondaryBrowser is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.secondaryBrowser ? true : false;
    }
    secondaryBrowser.isSupported = isSupported;
})(secondaryBrowser || (secondaryBrowser = {}));

;// ./src/public/location.ts







/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const locationTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @deprecated
 * As of 2.1.0, please use geoLocation namespace.
 *
 * Namespace to interact with the location module-specific part of the SDK.
 */
var location_location;
(function (location_1) {
    /**
     * @deprecated
     * As of 2.1.0, please use one of the following functions:
     * - {@link geoLocation.getCurrentLocation geoLocation.getCurrentLocation(): Promise\<Location\>} to get the current location.
     * - {@link geoLocation.map.chooseLocation geoLocation.map.chooseLocation(): Promise\<Location\>} to choose location on map.
     *
     * Fetches user location
     * @param props {@link LocationProps} - Specifying how the location request is handled
     * @param callback - Callback to invoke when current user location is fetched
     */
    function getLocation(props, callback) {
        if (!callback) {
            throw new Error('[location.getLocation] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isCurrentSDKVersionAtLeast(locationAPIsRequiredVersion)) {
            throw { errorCode: ErrorCode.OLD_PLATFORM };
        }
        if (!props) {
            throw { errorCode: ErrorCode.INVALID_ARGUMENTS };
        }
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(locationTelemetryVersionNumber, "location.getLocation" /* ApiName.Location_GetLocation */), 'location.getLocation', [props], callback);
    }
    location_1.getLocation = getLocation;
    /**
     * @deprecated
     * As of 2.1.0, please use {@link geoLocation.map.showLocation geoLocation.map.showLocation(location: Location): Promise\<void\>} instead.
     *
     * Shows the location on map corresponding to the given coordinates
     *
     * @param location - Location to be shown on the map
     * @param callback - Callback to invoke when the location is opened on map
     */
    function showLocation(location, callback) {
        if (!callback) {
            throw new Error('[location.showLocation] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isCurrentSDKVersionAtLeast(locationAPIsRequiredVersion)) {
            throw { errorCode: ErrorCode.OLD_PLATFORM };
        }
        if (!location) {
            throw { errorCode: ErrorCode.INVALID_ARGUMENTS };
        }
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        sendMessageToParent(getApiVersionTag(locationTelemetryVersionNumber, "location.showLocation" /* ApiName.Location_ShowLocation */), 'location.showLocation', [location], callback);
    }
    location_1.showLocation = showLocation;
    /**
     * @deprecated
     * As of 2.1.0, please use geoLocation namespace, and use {@link geoLocation.isSupported geoLocation.isSupported: boolean} to check if geoLocation is supported.
     *
     * Checks if Location capability is supported by the host
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @returns boolean to represent whether Location is supported
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.location ? true : false;
    }
    location_1.isSupported = isSupported;
})(location_location || (location_location = {}));

;// ./src/public/meeting.ts
var meeting_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const meetingTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * Interact with meetings, including retrieving meeting details, getting mic status, and sharing app content.
 * This namespace is used to handle meeting related functionality like
 * get meeting details, get/update state of mic, sharing app content and more.
 *
 * To learn more, visit https://aka.ms/teamsmeetingapps
 */
var meeting;
(function (meeting) {
    /**
     * Reasons for the app's microphone state to change
     */
    let MicStateChangeReason;
    (function (MicStateChangeReason) {
        MicStateChangeReason[MicStateChangeReason["HostInitiated"] = 0] = "HostInitiated";
        MicStateChangeReason[MicStateChangeReason["AppInitiated"] = 1] = "AppInitiated";
        MicStateChangeReason[MicStateChangeReason["AppDeclinedToChange"] = 2] = "AppDeclinedToChange";
        MicStateChangeReason[MicStateChangeReason["AppFailedToChange"] = 3] = "AppFailedToChange";
    })(MicStateChangeReason || (MicStateChangeReason = {}));
    /**
     * Different types of meeting reactions that can be sent/received
     *
     * @hidden
     * Hide from docs.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    let MeetingReactionType;
    (function (MeetingReactionType) {
        MeetingReactionType["like"] = "like";
        MeetingReactionType["heart"] = "heart";
        MeetingReactionType["laugh"] = "laugh";
        MeetingReactionType["surprised"] = "surprised";
        MeetingReactionType["applause"] = "applause";
    })(MeetingReactionType = meeting.MeetingReactionType || (meeting.MeetingReactionType = {}));
    /**
     * Represents the type of a meeting
     *
     * @hidden
     * Hide from docs.
     *
     * @remarks
     * Teams has several types of meetings to account for different user scenarios and requirements.
     */
    let MeetingType;
    (function (MeetingType) {
        /**
         * Used when the meeting type is not known.
         *
         * @remarks
         * This response is not an expected case.
         */
        MeetingType["Unknown"] = "Unknown";
        /**
         * Used for group call meeting types.
         *
         * @remarks
         * To test this meeting type in Teams, start a chat with two or more users and click the "Call" button.
         * Note that a group call may return as this or {@link CallType.GroupCall}. These two different response types should be considered as equal.
         */
        MeetingType["Adhoc"] = "Adhoc";
        /**
         * Used for single-occurrence meetings that have been scheduled in advance.
         *
         * @remarks
         * To create a meeting of this type in Teams, press the "New meeting" button from the calendar and enter a meeting title.
         * Before saving, ensure that the "Online Meeting" field is checked.
         */
        MeetingType["Scheduled"] = "Scheduled";
        /**
         * Used for meetings that occur on a recurring basis.
         *
         * @remarks
         * To create a meeting of this type in Teams, press the "New meeting" button from the calendar, enter a meeting title, and then change the field labeled "Does not repeat" to some other value.
         * Before saving, ensure that the "Online Meeting" field is checked.
         */
        MeetingType["Recurring"] = "Recurring";
        /**
         * Used for webinars.
         *
         * @remarks
         * Meeting apps are only supported for those in the "event group" of a webinar, which are those who'll be presenting and producing the webinar.
         * To learn how to create a meeting of this type, visit https://aka.ms/teams/howto/webinars.
         */
        MeetingType["Broadcast"] = "Broadcast";
        /**
         * Used for meet now meetings, which are meetings users create on the fly.
         *
         * @remarks
         * To create a meeting of this type, click the "Meet now" button from the calendar in Teams or the "Teams call" button in Outlook.
         */
        MeetingType["MeetNow"] = "MeetNow";
    })(MeetingType = meeting.MeetingType || (meeting.MeetingType = {}));
    /**
     * Represents the type of a call.
     *
     * @hidden
     * Hide from docs.
     */
    let CallType;
    (function (CallType) {
        /**
         * Represents a call between two people.
         *
         * @remarks
         * To test this feature, start a chat with one other user and click the "Call" button.
         */
        CallType["OneOnOneCall"] = "oneOnOneCall";
        /**
         * Represents a call between more than two people.
         *
         * @remarks
         * To test this meeting type in Teams, start a chat with two or more users and click the "Call" button.
         * Note that a group call may return as this or {@link MeetingType.Adhoc}. These two different response types should be considered as equal.
         */
        CallType["GroupCall"] = "groupCall";
    })(CallType = meeting.CallType || (meeting.CallType = {}));
    /**
     * Represents the protocol option for sharing app content to the meeting stage.
     */
    let SharingProtocol;
    (function (SharingProtocol) {
        /**
         * The default protocol for sharing app content to stage. To learn more, visit https://aka.ms/teamsjs/shareAppContentToStage
         */
        SharingProtocol["Collaborative"] = "Collaborative";
        /**
         * A read-only protocol for sharing app content to stage, which uses screen sharing in meetings. If provided, this protocol will open
         * the specified `contentUrl` passed to the {@link shareAppContentToStage} API in a new instance and screen share that instance.
         */
        SharingProtocol["ScreenShare"] = "ScreenShare";
    })(SharingProtocol = meeting.SharingProtocol || (meeting.SharingProtocol = {}));
    /**
     * Allows an app to get the incoming audio speaker setting for the meeting user.
     * To learn more, visit https://aka.ms/teamsjs/getIncomingClientAudioState
     *
     * @remarks
     * Use {@link toggleIncomingClientAudio} to toggle the current audio state.
     * For private scheduled meetings, meet now, or calls, include the `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` RSC permission in your app manifest.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/authorization.
     * This API can only be used in the `sidePanel` and `meetingStage` frame contexts.
     *
     * @param callback - Callback contains 2 parameters, `error` and `result`.
     * `error` can either contain an error of type `SdkError`, in case of an error, or null when fetch is successful.
     * `result` will be true when incoming audio is muted and false when incoming audio is unmuted, or null when the request fails.
     */
    function getIncomingClientAudioState(callback) {
        if (!callback) {
            throw new Error('[get incoming client audio state] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.getIncomingClientAudioState" /* ApiName.Meeting_GetIncomingClientAudioState */), 'getIncomingClientAudioState', callback);
    }
    meeting.getIncomingClientAudioState = getIncomingClientAudioState;
    /**
     * Allows an app to toggle the incoming audio speaker setting for the meeting user from mute to unmute or vice-versa.
     * To learn more, visit https://aka.ms/teamsjs/toggleIncomingClientAudio
     *
     * @remarks
     * Use {@link getIncomingClientAudioState} to get the current audio state.
     * For private scheduled meetings, meet now, or calls, include the `OnlineMeetingParticipant.ToggleIncomingAudio.Chat` RSC permission in your app manifest.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/authorization.
     * This API can only be used in the `sidePanel` and `meetingStage` frame contexts.
     *
     * @param callback - Callback contains 2 parameters, `error` and `result`.
     * `error` can either contain an error of type `SdkError`, in case of an error, or null when toggle is successful.
     * `result` will be true when incoming audio is muted and false when incoming audio is unmuted, or null when the toggling fails.
     */
    function toggleIncomingClientAudio(callback) {
        if (!callback) {
            throw new Error('[toggle incoming client audio] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.toggleIncomingClientAudio" /* ApiName.Meeting_ToggleIncomingClientAudio */), 'toggleIncomingClientAudio', callback);
    }
    meeting.toggleIncomingClientAudio = toggleIncomingClientAudio;
    /**
     * @throws error if your app manifest does not include the `OnlineMeeting.ReadBasic.Chat` RSC permission.
     * Find the app manifest reference at https://learn.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema.
     * Find the RSC reference at https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/rsc/resource-specific-consent.
     *
     * @hidden
     * Allows an app to get the meeting details for the meeting
     *
     * @param callback - Callback contains 2 parameters, `error` and `meetingDetailsResponse`.
     * `error` can either contain an error of type `SdkError`, in case of an error, or null when get is successful
     * `result` can either contain a {@link IMeetingDetailsResponse} value, in case of a successful get or null when the get fails
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getMeetingDetails(callback) {
        if (!callback) {
            throw new Error('[get meeting details] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage, FrameContexts.settings, FrameContexts.content);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.getMeetingDetails" /* ApiName.Meeting_GetMeetingDetails */), 'meeting.getMeetingDetails', callback);
    }
    meeting.getMeetingDetails = getMeetingDetails;
    /**
     * @throws error if your app manifest does not include both the `OnlineMeeting.ReadBasic.Chat` RSC permission
     * and the `OnlineMeetingParticipant.Read.Chat` RSC permission.
     * Find the app manifest reference at https://learn.microsoft.com/en-us/microsoftteams/platform/resources/schema/manifest-schema.
     * Find the RSC reference at https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/rsc/resource-specific-consent.
     *
     * @throws `not supported on platform` error if your app is run on a host that does not support returning additional meeting details.
     *
     * @hidden
     * Allows an app to get the additional meeting details for the meeting.
     * Some additional details are returned on a best-effort basis. They may not be present for every meeting.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function getMeetingDetailsVerbose() {
        var _a, _b, _c;
        return meeting_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage, FrameContexts.settings, FrameContexts.content);
            let response;
            try {
                const shouldGetVerboseDetails = true;
                response = (yield sendAndHandleSdkError(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "meeting.getMeetingDetailsVerbose" /* ApiName.Meeting_GetMeetingDetailsVerbose */), 'meeting.getMeetingDetails', shouldGetVerboseDetails));
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.errorCode) === null || _a === void 0 ? void 0 : _a.toString());
            }
            if ((((_b = response.details) === null || _b === void 0 ? void 0 : _b.type) == CallType.GroupCall || ((_c = response.details) === null || _c === void 0 ? void 0 : _c.type) == CallType.OneOnOneCall) &&
                !response.details.originalCallerInfo) {
                throw new Error(ErrorCode.NOT_SUPPORTED_ON_PLATFORM.toString());
            }
            return response;
        });
    }
    meeting.getMeetingDetailsVerbose = getMeetingDetailsVerbose;
    /**
     * @hidden
     * Allows an app to get the authentication token for the anonymous or guest user in the meeting
     *
     * @param callback - Callback contains 2 parameters, `error` and `authenticationTokenOfAnonymousUser`.
     * `error` can either contain an error of type `SdkError`, in case of an error, or null when get is successful
     * `authenticationTokenOfAnonymousUser` can either contain a string value, in case of a successful get or null when the get fails
     *
     * @internal
     * Limited to Microsoft-internal use
     */
    function getAuthenticationTokenForAnonymousUser(callback) {
        if (!callback) {
            throw new Error('[get Authentication Token For AnonymousUser] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage, FrameContexts.task);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.getAuthenticationTokenForAnonymousUser" /* ApiName.Meeting_GetAuthenticationTokenForAnonymousUser */), 'meeting.getAuthenticationTokenForAnonymousUser', callback);
    }
    meeting.getAuthenticationTokenForAnonymousUser = getAuthenticationTokenForAnonymousUser;
    /**
     * Allows an app to get the state of the outgoing live stream in the current meeting.
     *
     * @remarks
     * Use {@link requestStartLiveStreaming} or {@link requestStopLiveStreaming} to start/stop a live stream.
     * This API can only be used in the `sidePanel` frame context.
     * The `meetingExtensionDefinition.supportsStreaming` field in your app manifest must be `true` to use this API.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/meetingExtensionDefinition.
     *
     * @param callback - Callback contains 2 parameters: `error` and `liveStreamState`.
     * `error` can either contain an error of type `SdkError`, in case of an error, or null when the request is successful
     * `liveStreamState` can either contain a `LiveStreamState` value, or null when operation fails
     */
    function getLiveStreamState(callback) {
        if (!callback) {
            throw new Error('[get live stream state] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.getLiveStreamState" /* ApiName.Meeting_GetLiveStreamState */), 'meeting.getLiveStreamState', callback);
    }
    meeting.getLiveStreamState = getLiveStreamState;
    /**
     * Allows an app to ask the local user to begin live streaming the current meeting to the given Real-Time Messaging Protocol (RTMP) stream url.
     * A confirmation dialog will be shown to the local user with options to "Allow" or "Cancel" this request.
     *
     * @remarks
     * Meeting content (e.g., user video, screenshare, audio, etc.) can be externally streamed to any platform that supports the popular RTMP standard.
     * Content broadcasted through RTMP is automatically formatted and cannot be customized.
     * Use {@link getLiveStreamState} or {@link registerLiveStreamChangedHandler} to get updates on the live stream state.
     * This API can only be used in the `sidePanel` frame context.
     * The `meetingExtensionDefinition.supportsStreaming` field in your app manifest must be `true` to use this API.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/meetingExtensionDefinition.
     *
     * @param callback - completion callback that contains an `error` parameter, which can be of type `SdkError` in case of an error, or null when operation is successful
     * @param streamUrl - the url to the RTMP stream resource
     * @param streamKey - the key to the RTMP stream resource
     */
    function requestStartLiveStreaming(callback, streamUrl, streamKey) {
        if (!callback) {
            throw new Error('[request start live streaming] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.requestStartLiveStreaming" /* ApiName.Meeting_RequestStartLiveStreaming */), 'meeting.requestStartLiveStreaming', [streamUrl, streamKey], callback);
    }
    meeting.requestStartLiveStreaming = requestStartLiveStreaming;
    /**
     * Allows an app to request that live streaming be stopped.
     *
     * @remarks
     * Use {@link getLiveStreamState} or {@link registerLiveStreamChangedHandler} to get updates on the live stream state.
     * This API can only be used in the `sidePanel` frame context.
     * The `meetingExtensionDefinition.supportsStreaming` field in your app manifest must be `true` to use this API.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/meetingExtensionDefinition.
     *
     * @param callback - completion callback that contains an error parameter, which can be of type `SdkError` in case of an error, or null when operation is successful
     */
    function requestStopLiveStreaming(callback) {
        if (!callback) {
            throw new Error('[request stop live streaming] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.requestStopLiveStreaming" /* ApiName.Meeting_RequestStopLiveStreaming */), 'meeting.requestStopLiveStreaming', callback);
    }
    meeting.requestStopLiveStreaming = requestStopLiveStreaming;
    /**
     * Registers an event handler for state changes to the live stream.
     *
     * @remarks
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     * Use {@link requestStartLiveStreaming} or {@link requestStopLiveStreaming} to start/stop a live stream.
     * This API can only be used in the `sidePanel` frame context.
     * The `meetingExtensionDefinition.supportsStreaming` field in your app manifest must be `true` to use this API.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/meetingExtensionDefinition.
     *
     * @param handler - The handler to invoke when the live stream state changes
     */
    function registerLiveStreamChangedHandler(handler) {
        if (!handler) {
            throw new Error('[register live stream changed handler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel);
        registerHandler(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.registerLiveStreamChangedHandler" /* ApiName.Meeting_RegisterLiveStreamChangedHandler */), 'meeting.liveStreamChanged', handler);
    }
    meeting.registerLiveStreamChangedHandler = registerLiveStreamChangedHandler;
    /**
     * Allows an app to share a given URL to the meeting stage for all users in the meeting.
     * To learn more, visit https://aka.ms/teamsjs/shareAppContentToStage
     *
     * @remarks
     * This API can only be used in the `sidePanel` and `meetingStage` frame contexts.
     * For private scheduled meetings, meet now, or calls, include the `MeetingStage.Write.Chat` RSC permission in your app manifest.
     * For channel meetings, include the `ChannelMeetingStage.Write.Group` RSC permission in your app manifest.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/authorization.
     * Use {@link getAppContentStageSharingCapabilities} to determine if the local user is eligible to use this API.
     * Use {@link getAppContentStageSharingState} to determine whether app content is already being shared to the meeting stage.
     *
     * @param callback - Callback contains 2 parameters, `error` and `result`.
     * `error` can either contain an error of type `SdkError`, in case of an error, or null when share is successful
     * `result` can either contain a true value, in case of a successful share or null when the share fails
     * @param appContentUrl - is the input URL to be shared to the meeting stage.
     * the URL origin must be included in your app manifest's `validDomains` field.
     * @param shareOptions - is an object that contains additional sharing options. If omitted, the default
     * sharing protocol will be `Collaborative`. See {@link IShareAppContentToStageOptions} for more information.
     */
    function shareAppContentToStage(callback, appContentUrl, shareOptions = { sharingProtocol: SharingProtocol.Collaborative }) {
        if (!callback) {
            throw new Error('[share app content to stage] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.shareAppContentToStage" /* ApiName.Meeting_ShareAppContentToStage */), 'meeting.shareAppContentToStage', [appContentUrl, shareOptions], callback);
    }
    meeting.shareAppContentToStage = shareAppContentToStage;
    /**
     * Allows an app to request whether the local user's app version has the required app manifest permissions to share content to meeting stage.
     * To learn more, visit https://aka.ms/teamsjs/getAppContentStageSharingCapabilities
     *
     * @remarks
     * If you are updating your published app to include the share to stage feature, you can use this API to prompt users to update their app if they are using an older version.
     * Your app's `configurableTabs` or `staticTabs` entry's `context` array must include `meetingStage` for `doesAppHaveSharePermission` to be `true` in the `callback` response.
     *
     * @throws error if API is being used outside of `sidePanel` or `meetingStage` frame contexts.
     * @throws error if your app manifest does not include the `MeetingStage.Write.Chat` RSC permission in your app manifest in a private scheduled meeting, meet now, or call --
     * or if it does not include the `ChannelMeetingStage.Write.Group` RSC permission in your app manifest in a channel meeting.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/authorization.
     *
     * @param callback - Completion callback contains 2 parameters: `error` and `appContentStageSharingCapabilities`.
     * `error` can either contain an error of type `SdkError` (error indication), or null (non-error indication).
     * `appContentStageSharingCapabilities` will contain an {@link IAppContentStageSharingCapabilities} object if the request succeeds, or null if it failed.
     */
    function getAppContentStageSharingCapabilities(callback) {
        if (!callback) {
            throw new Error('[get app content stage sharing capabilities] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.getAppContentStageSharingCapabilities" /* ApiName.Meeting_GetAppContentStageSharingCapabilities */), 'meeting.getAppContentStageSharingCapabilities', callback);
    }
    meeting.getAppContentStageSharingCapabilities = getAppContentStageSharingCapabilities;
    /**
     * @hidden
     * Hide from docs.
     * Terminates current stage sharing session in meeting
     *
     * @param callback - Callback contains 2 parameters, error and result.
     * error can either contain an error of type SdkError (error indication), or null (non-error indication)
     * result can either contain a true boolean value (successful termination), or null (unsuccessful fetch)
     */
    function stopSharingAppContentToStage(callback) {
        if (!callback) {
            throw new Error('[stop sharing app content to stage] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.stopSharingAppContentToStage" /* ApiName.Meeting_StopSharingAppContentToStage */), 'meeting.stopSharingAppContentToStage', callback);
    }
    meeting.stopSharingAppContentToStage = stopSharingAppContentToStage;
    /**
     * Provides information related to current stage sharing state for your app.
     * To learn more, visit https://aka.ms/teamsjs/getAppContentStageSharingState
     *
     * @remarks
     * This API can only be used in the `sidePanel` and `meetingStage` frame contexts.
     * For private scheduled meetings, meet now, or calls, include the `MeetingStage.Write.Chat` RSC permission in your app manifest.
     * For channel meetings, include the `ChannelMeetingStage.Write.Group` RSC permission in your app manifest.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/authorization.
     *
     * @param callback - Callback contains 2 parameters, `error` and `appContentStageSharingState`.
     * error can either contain an error of type SdkError (error indication), or null (non-error indication)
     * `appContentStageSharingState` can either contain an `IAppContentStageSharingState` object if the request succeeds, or null if it failed
     */
    function getAppContentStageSharingState(callback) {
        if (!callback) {
            throw new Error('[get app content stage sharing state] Callback cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.getAppContentStageSharingState" /* ApiName.Meeting_GetAppContentStageSharingState */), 'meeting.getAppContentStageSharingState', callback);
    }
    meeting.getAppContentStageSharingState = getAppContentStageSharingState;
    /**
     * Registers a handler for changes to participant speaking states.
     * To learn more, visit https://aka.ms/teamsjs/registerSpeakingStateChangeHandler
     *
     * @remarks
     * This API returns {@link ISpeakingState}, which will have `isSpeakingDetected` and/or an error object.
     * If any participant is speaking, `isSpeakingDetected` will be true, or false if no participants are speaking.
     * Only one handler can be registered at a time. Subsequent registrations replace existing registrations.
     * This API can only be used in the `sidePanel` and `meetingStage` frame contexts.
     * For private scheduled meetings, meet now, or calls, include the `OnlineMeetingIncomingAudio.Detect.Chat` RSC permission in your app manifest.
     * For channel meetings, include the `OnlineMeetingIncomingAudio.Detect.Group` RSC permission in your app manifest.
     * Find the app manifest reference at https://aka.ms/teamsAppManifest/authorization.
     *
     * @param handler The handler to invoke when the speaking state of any participant changes (start/stop speaking).
     */
    function registerSpeakingStateChangeHandler(handler) {
        if (!handler) {
            throw new Error('[registerSpeakingStateChangeHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        registerHandler(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.registerSpeakingStateChangeHandler" /* ApiName.Meeting_RegisterSpeakingStateChangeHandler */), 'meeting.speakingStateChanged', handler);
    }
    meeting.registerSpeakingStateChangeHandler = registerSpeakingStateChangeHandler;
    /**
     * Registers a handler for changes to the selfParticipant's (current user's) raiseHandState. If the selfParticipant raises their hand, isHandRaised
     * will be true. By default and if the selfParticipant hand is lowered, isHandRaised will be false. This API will return {@link RaiseHandStateChangedEventData}
     * that will have the raiseHandState or an error object. Only one handler can be registered at a time. A subsequent registration
     * replaces an existing registration.
     *
     * @param handler The handler to invoke when the selfParticipant's (current user's) raiseHandState changes.
     *
     * @hidden
     * Hide from docs.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function registerRaiseHandStateChangedHandler(handler) {
        if (!handler) {
            throw new Error('[registerRaiseHandStateChangedHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        registerHandler(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.registerRaiseHandStateChangedHandler" /* ApiName.Meeting_RegisterRaiseHandStateChangedHandler */), 'meeting.raiseHandStateChanged', handler);
    }
    meeting.registerRaiseHandStateChangedHandler = registerRaiseHandStateChangedHandler;
    /**
     * Registers a handler for receiving meeting reactions. When the selfParticipant (current user) successfully sends a meeting reaction and it is being rendered on the UI, the meetingReactionType will be populated. Only one handler can be registered
     * at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler The handler to invoke when the selfParticipant (current user) successfully sends a meeting reaction
     *
     * @hidden
     * Hide from docs.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function registerMeetingReactionReceivedHandler(handler) {
        if (!handler) {
            throw new Error('[registerMeetingReactionReceivedHandler] Handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        registerHandler(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.registerMeetingReactionReceivedHandler" /* ApiName.Meeting_RegisterMeetingReactionReceivedHandler */), 'meeting.meetingReactionReceived', handler);
    }
    meeting.registerMeetingReactionReceivedHandler = registerMeetingReactionReceivedHandler;
    /**
     * This function is used to join a meeting.
     * This opens a meeting in a new window for the desktop app.
     * In case of a web app, it will close the current app and open the meeting in the same tab.
     * There is currently no support or experience for this on mobile platforms.
     * @param joinMeetingParams This takes {@link JoinMeetingParams} for joining the meeting. If source isn't passed then it is marked as 'Other' by default.
     * @throws error if the meeting join fails, the promise will reject to an object with the error message.
     */
    function joinMeeting(joinMeetingParams) {
        if ((joinMeetingParams === null || joinMeetingParams === void 0 ? void 0 : joinMeetingParams.joinWebUrl) === undefined || (joinMeetingParams === null || joinMeetingParams === void 0 ? void 0 : joinMeetingParams.joinWebUrl) === null) {
            return Promise.reject(new Error('Invalid joinMeetingParams'));
        }
        ensureInitialized(runtime);
        const serializedJoinMeetingParams = {
            joinWebUrl: joinMeetingParams.joinWebUrl.href,
            source: joinMeetingParams.source || EventActionSource.Other,
        };
        return sendAndHandleSdkError(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "meeting.joinMeeting" /* ApiName.Meeting_JoinMeeting */), 'meeting.joinMeeting', serializedJoinMeetingParams);
    }
    meeting.joinMeeting = joinMeeting;
    /** The source of the join button click. */
    let EventActionSource;
    (function (EventActionSource) {
        /**
         * Source is calendar grid context menu.
         */
        EventActionSource["M365CalendarGridContextMenu"] = "m365_calendar_grid_context_menu";
        /**
         * Source is calendar grid peek.
         */
        EventActionSource["M365CalendarGridPeek"] = "m365_calendar_grid_peek";
        /**
         * Source is calendar grid event card join button.
         */
        EventActionSource["M365CalendarGridEventCardJoinButton"] = "m365_calendar_grid_event_card_join_button";
        /**
         * Source is calendar form ribbon join button.
         */
        EventActionSource["M365CalendarFormRibbonJoinButton"] = "m365_calendar_form_ribbon_join_button";
        /**
         * Source is calendar form join teams meeting button.
         */
        EventActionSource["M365CalendarFormJoinTeamsMeetingButton"] = "m365_calendar_form_join_teams_meeting_button";
        /**
         * Other sources.
         */
        EventActionSource["Other"] = "other";
    })(EventActionSource = meeting.EventActionSource || (meeting.EventActionSource = {}));
    /**
     * Nested namespace for functions to control behavior of the app share button
     *
     * @hidden
     * Hide from docs.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    let appShareButton;
    (function (appShareButton) {
        /**
         * By default app share button will be hidden and this API will govern the visibility of it.
         *
         * This function can be used to hide/show app share button in meeting,
         * along with contentUrl (overrides contentUrl populated in app manifest)
         * @throws standard Invalid Url error
         * @param shareInformation has two elements, one isVisible boolean flag and another
         * optional string contentUrl, which will override contentUrl coming from Manifest
         *
         * @hidden
         * Hide from docs.
         *
         * @internal
         * Limited to Microsoft-internal use
         *
         * @beta
         */
        function setOptions(shareInformation) {
            ensureInitialized(runtime, FrameContexts.sidePanel);
            if (shareInformation.contentUrl) {
                new URL(shareInformation.contentUrl);
            }
            sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.appShareButton.setOptions" /* ApiName.Meeting_AppShareButton_SetOptions */), 'meeting.appShareButton.setOptions', [shareInformation]);
        }
        appShareButton.setOptions = setOptions;
    })(appShareButton = meeting.appShareButton || (meeting.appShareButton = {}));
    /**
     * Have the app handle audio (mic & speaker) and turn off host audio.
     *
     * When {@link RequestAppAudioHandlingParams.isAppHandlingAudio} is true, the host will switch to audioless mode
     *   Registers for mic mute status change events, which are events that the app can receive from the host asking the app to
     *   mute or unmute the microphone.
     *
     * When {@link RequestAppAudioHandlingParams.isAppHandlingAudio} is false, the host will switch out of audioless mode
     *   Unregisters the mic mute status change events so the app will no longer receive these events
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     * @throws Error if {@link RequestAppAudioHandlingParams.micMuteStateChangedCallback} parameter is not defined
     *
     * @param requestAppAudioHandlingParams - {@link RequestAppAudioHandlingParams} object with values for the audio switchover
     * @param callback - Callback with one parameter, the result
     * can either be true (the host is now in audioless mode) or false (the host is not in audioless mode)
     *
     * @hidden
     * Hide from docs.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function requestAppAudioHandling(requestAppAudioHandlingParams, callback) {
        if (!callback) {
            throw new Error('[requestAppAudioHandling] Callback response cannot be null');
        }
        if (!requestAppAudioHandlingParams.micMuteStateChangedCallback) {
            throw new Error('[requestAppAudioHandling] Callback Mic mute state handler cannot be null');
        }
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        if (requestAppAudioHandlingParams.isAppHandlingAudio) {
            startAppAudioHandling(requestAppAudioHandlingParams, callback);
        }
        else {
            stopAppAudioHandling(requestAppAudioHandlingParams, callback);
        }
    }
    meeting.requestAppAudioHandling = requestAppAudioHandling;
    function startAppAudioHandling(requestAppAudioHandlingParams, callback) {
        const callbackInternalRequest = (error, isHostAudioless) => {
            if (error && isHostAudioless != null) {
                throw new Error('[requestAppAudioHandling] Callback response - both parameters cannot be set');
            }
            if (error) {
                throw new Error(`[requestAppAudioHandling] Callback response - SDK error ${error.errorCode} ${error.message}`);
            }
            if (typeof isHostAudioless !== 'boolean') {
                throw new Error('[requestAppAudioHandling] Callback response - isHostAudioless must be a boolean');
            }
            const micStateChangedCallback = (micState) => meeting_awaiter(this, void 0, void 0, function* () {
                try {
                    const newMicState = yield requestAppAudioHandlingParams.micMuteStateChangedCallback(micState);
                    const micStateDidUpdate = newMicState.isMicMuted === micState.isMicMuted;
                    setMicStateWithReason(newMicState, micStateDidUpdate ? MicStateChangeReason.HostInitiated : MicStateChangeReason.AppDeclinedToChange);
                }
                catch (_a) {
                    setMicStateWithReason(micState, MicStateChangeReason.AppFailedToChange);
                }
            });
            registerHandler(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.registerMicStateChangeHandler" /* ApiName.Meeting_RegisterMicStateChangeHandler */), 'meeting.micStateChanged', micStateChangedCallback);
            const audioDeviceSelectionChangedCallback = (selectedDevicesInHost) => {
                var _a;
                (_a = requestAppAudioHandlingParams.audioDeviceSelectionChangedCallback) === null || _a === void 0 ? void 0 : _a.call(requestAppAudioHandlingParams, selectedDevicesInHost);
            };
            registerHandler(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.registerAudioDeviceSelectionChangedHandler" /* ApiName.Meeting_RegisterAudioDeviceSelectionChangedHandler */), 'meeting.audioDeviceSelectionChanged', audioDeviceSelectionChangedCallback);
            callback(isHostAudioless);
        };
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.requestAppAudioHandling" /* ApiName.Meeting_RequestAppAudioHandling */), 'meeting.requestAppAudioHandling', [requestAppAudioHandlingParams.isAppHandlingAudio], callbackInternalRequest);
    }
    function stopAppAudioHandling(requestAppAudioHandlingParams, callback) {
        const callbackInternalStop = (error, isHostAudioless) => {
            if (error && isHostAudioless != null) {
                throw new Error('[requestAppAudioHandling] Callback response - both parameters cannot be set');
            }
            if (error) {
                throw new Error(`[requestAppAudioHandling] Callback response - SDK error ${error.errorCode} ${error.message}`);
            }
            if (typeof isHostAudioless !== 'boolean') {
                throw new Error('[requestAppAudioHandling] Callback response - isHostAudioless must be a boolean');
            }
            if (doesHandlerExist('meeting.micStateChanged')) {
                removeHandler('meeting.micStateChanged');
            }
            if (doesHandlerExist('meeting.audioDeviceSelectionChanged')) {
                removeHandler('meeting.audioDeviceSelectionChanged');
            }
            callback(isHostAudioless);
        };
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.requestAppAudioHandling" /* ApiName.Meeting_RequestAppAudioHandling */), 'meeting.requestAppAudioHandling', [requestAppAudioHandlingParams.isAppHandlingAudio], callbackInternalStop);
    }
    /**
     * Notifies the host that the microphone state has changed in the app.
     * @param micState - The new state that the microphone is in
     *   isMicMuted - Boolean to indicate the current mute status of the mic.
     *
     * @hidden
     * Hide from docs.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @beta
     */
    function updateMicState(micState) {
        setMicStateWithReason(micState, MicStateChangeReason.AppInitiated);
    }
    meeting.updateMicState = updateMicState;
    function setMicStateWithReason(micState, reason) {
        ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
        sendMessageToParent(getApiVersionTag(meetingTelemetryVersionNumber, "meeting.setMicStateWithReason" /* ApiName.Meeting_SetMicStateWithReason */), 'meeting.updateMicState', [micState, reason]);
    }
})(meeting || (meeting = {}));

;// ./src/public/monetization.ts






/**
 * @hidden
 * Hidden from Docs
 *
 * @internal
 * Limited to Microsoft-internal use
 */
/**
 * Exceptional APIs telemetry versioning file: v1 and v2 APIs are mixed together in this file
 */
const monetizationTelemetryVersionNumber_v1 = "v1" /* ApiVersionNumber.V_1 */;
const monetizationTelemetryVersionNumber_v2 = "v2" /* ApiVersionNumber.V_2 */;
var monetization;
(function (monetization) {
    /**
     * @hidden
     * This function is the overloaded implementation of openPurchaseExperience.
     * Since the method signatures of the v1 callback and v2 promise differ in the type of the first parameter,
     * we need to do an extra check to know the typeof the @param1 to set the proper arguments of the utility function.
     * @param param1
     * @param param2
     * @returns Promise that will be resolved when the operation has completed or rejected with SdkError value
     */
    function openPurchaseExperience(param1, param2) {
        let callback;
        let planInfo;
        let apiVersionTag = '';
        if (typeof param1 === 'function') {
            callback = param1;
            planInfo = param2;
            apiVersionTag = getApiVersionTag(monetizationTelemetryVersionNumber_v1, "monetization.openPurchaseExperience" /* ApiName.Monetization_OpenPurchaseExperience */);
        }
        else {
            planInfo = param1;
            apiVersionTag = getApiVersionTag(monetizationTelemetryVersionNumber_v2, "monetization.openPurchaseExperience" /* ApiName.Monetization_OpenPurchaseExperience */);
        }
        const wrappedFunction = () => {
            return new Promise((resolve) => {
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
                resolve(sendAndHandleSdkError(apiVersionTag, 'monetization.openPurchaseExperience', planInfo));
            });
        };
        ensureInitialized(runtime, FrameContexts.content);
        return callCallbackWithErrorOrResultOrNullFromPromiseAndReturnPromise(wrappedFunction, callback);
    }
    monetization.openPurchaseExperience = openPurchaseExperience;
    /**
     * @hidden
     *
     * Checks if the monetization capability is supported by the host
     * @returns boolean to represent whether the monetization capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.monetization ? true : false;
    }
    monetization.isSupported = isSupported;
})(monetization || (monetization = {}));

;// ./src/public/calendar.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const calendarTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Interact with the user's calendar, including opening calendar items and composing meetings.
 */
var calendar;
(function (calendar) {
    /**
     * Opens a calendar item.
     *
     * @param openCalendarItemParams - object containing unique ID of the calendar item to be opened.
     */
    function openCalendarItem(openCalendarItemParams) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw new Error('Not supported');
            }
            if (!openCalendarItemParams.itemId || !openCalendarItemParams.itemId.trim()) {
                throw new Error('Must supply an itemId to openCalendarItem');
            }
            resolve(sendAndHandleStatusAndReason(getApiVersionTag(calendarTelemetryVersionNumber, "calendar.openCalendarItem" /* ApiName.Calendar_OpenCalendarItem */), 'calendar.openCalendarItem', openCalendarItemParams));
        });
    }
    calendar.openCalendarItem = openCalendarItem;
    /**
     * Compose a new meeting in the user's calendar.
     *
     * @param composeMeetingParams - object containing various properties to set up the meeting details.
     */
    function composeMeeting(composeMeetingParams) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw new Error('Not supported');
            }
            const apiVersionTag = getApiVersionTag(calendarTelemetryVersionNumber, "calendar.composeMeeting" /* ApiName.Calendar_ComposeMeeting */);
            if (runtime.isLegacyTeams) {
                resolve(sendAndHandleStatusAndReason(apiVersionTag, 'executeDeepLink', createTeamsDeepLinkForCalendar(composeMeetingParams.attendees, composeMeetingParams.startTime, composeMeetingParams.endTime, composeMeetingParams.subject, composeMeetingParams.content)));
            }
            else {
                resolve(sendAndHandleStatusAndReason(apiVersionTag, 'calendar.composeMeeting', composeMeetingParams));
            }
        });
    }
    calendar.composeMeeting = composeMeeting;
    /**
     * Checks if the calendar capability is supported by the host
     * @returns boolean to represent whether the calendar capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.calendar ? true : false;
    }
    calendar.isSupported = isSupported;
})(calendar || (calendar = {}));

;// ./src/public/mail.ts





/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const mailTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Used to interact with mail capability, including opening and composing mail.
 */
var mail;
(function (mail) {
    /**
     * Opens a mail message in the host.
     *
     * @param openMailItemParams - Object that specifies the ID of the mail message.
     */
    function openMailItem(openMailItemParams) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw new Error('Not supported');
            }
            if (!openMailItemParams.itemId || !openMailItemParams.itemId.trim()) {
                throw new Error('Must supply an itemId to openMailItem');
            }
            resolve(sendAndHandleStatusAndReason(getApiVersionTag(mailTelemetryVersionNumber, "mail.openMailItem" /* ApiName.Mail_OpenMailItem */), 'mail.openMailItem', openMailItemParams));
        });
    }
    mail.openMailItem = openMailItem;
    /**
     * Compose a new email in the user's mailbox.
     *
     * @param composeMailParams - Object that specifies the type of mail item to compose and the details of the mail item.
     *
     */
    function composeMail(composeMailParams) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw new Error('Not supported');
            }
            resolve(sendAndHandleStatusAndReason(getApiVersionTag(mailTelemetryVersionNumber, "mail.composeMail" /* ApiName.Mail_ComposeMail */), 'mail.composeMail', composeMailParams));
        });
    }
    mail.composeMail = composeMail;
    /**
     * Checks if the mail capability is supported by the host
     * @returns boolean to represent whether the mail capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.mail ? true : false;
    }
    mail.isSupported = isSupported;
    /** Defines compose mail types. */
    let ComposeMailType;
    (function (ComposeMailType) {
        /** Compose a new mail message. */
        ComposeMailType["New"] = "new";
        /** Compose a reply to the sender of an existing mail message. */
        ComposeMailType["Reply"] = "reply";
        /** Compose a reply to all recipients of an existing mail message. */
        ComposeMailType["ReplyAll"] = "replyAll";
        /** Compose a new mail message with the content of an existing mail message forwarded to a new recipient. */
        ComposeMailType["Forward"] = "forward";
    })(ComposeMailType = mail.ComposeMailType || (mail.ComposeMailType = {}));
})(mail || (mail = {}));

;// ./src/public/teamsAPIs.ts

 // Conflict with some names






/**
 * Namespace containing the set of APIs that support Teams-specific functionalities.
 *
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const teamsAPIsTelemetryVersionNumber_v2 = "v2" /* ApiVersionNumber.V_2 */;
var teamsCore;
(function (teamsCore) {
    /**
     * Enable print capability to support printing page using Ctrl+P and cmd+P
     */
    function enablePrintCapability() {
        if (!GlobalVars.printCapabilityEnabled) {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            GlobalVars.printCapabilityEnabled = true;
            // adding ctrl+P and cmd+P handler
            document.addEventListener('keydown', (event) => {
                if ((event.ctrlKey || event.metaKey) && event.keyCode === 80) {
                    print();
                    event.cancelBubble = true;
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
        }
    }
    teamsCore.enablePrintCapability = enablePrintCapability;
    /**
     * default print handler
     */
    function print() {
        ssrSafeWindow().print();
    }
    teamsCore.print = print;
    /**
     * Registers a handler to be called when the page has been requested to load.
     *
     * @remarks Check out [App Caching in Teams](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/app-caching)
     * for a more detailed explanation about using this API.
     *
     * @param handler - The handler to invoke when the page is loaded.
     *
     * @beta
     */
    function registerOnLoadHandler(handler) {
        registerOnLoadHandlerHelper(getApiVersionTag(teamsAPIsTelemetryVersionNumber_v2, "teamsAPIs_registerOnLoadHandler" /* ApiName.TeamsAPIs_RegisterOnLoadHandler */), handler, () => {
            if (!isNullOrUndefined(handler) && !isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
        });
    }
    teamsCore.registerOnLoadHandler = registerOnLoadHandler;
    /**
     * @hidden
     * Undocumented helper function with shared code between deprecated version and current version of the registerOnLoadHandler API.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @param apiVersionTag - The tag indicating API version number with name
     * @param handler - The handler to invoke when the page is loaded.
     * @param versionSpecificHelper - The helper function containing logic pertaining to a specific version of the API.
     *
     * @deprecated
     */
    function registerOnLoadHandlerHelper(apiVersionTag, handler, versionSpecificHelper) {
        // allow for registration cleanup even when not finished initializing
        !isNullOrUndefined(handler) && ensureInitialized(runtime);
        if (!isNullOrUndefined(handler) && versionSpecificHelper) {
            versionSpecificHelper();
        }
        handlers_registerOnLoadHandler(apiVersionTag, handler);
    }
    teamsCore.registerOnLoadHandlerHelper = registerOnLoadHandlerHelper;
    /**
     * Registers a handler to be called before the page is unloaded.
     *
     * @remarks Check out [App Caching in Teams](https://learn.microsoft.com/microsoftteams/platform/tabs/how-to/app-caching)
     * for a more detailed explanation about using this API.
     *
     * @param handler - The handler to invoke before the page is unloaded. If this handler returns true the page should
     * invoke the readyToUnload function provided to it once it's ready to be unloaded.
     *
     * @beta
     */
    function registerBeforeUnloadHandler(handler) {
        registerBeforeUnloadHandlerHelper(getApiVersionTag(teamsAPIsTelemetryVersionNumber_v2, "teamsAPIs_registerBeforeUnloadHandler" /* ApiName.TeamsAPIs_RegisterBeforeUnloadHandler */), handler, () => {
            if (!isNullOrUndefined(handler) && !isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
        });
    }
    teamsCore.registerBeforeUnloadHandler = registerBeforeUnloadHandler;
    /**
     * @hidden
     * Undocumented helper function with shared code between deprecated version and current version of the registerBeforeUnloadHandler API.
     *
     * @internal
     * Limited to Microsoft-internal use
     *
     * @param handler - - The handler to invoke before the page is unloaded. If this handler returns true the page should
     * invoke the readyToUnload function provided to it once it's ready to be unloaded.
     * @param versionSpecificHelper - The helper function containing logic pertaining to a specific version of the API.
     *
     * @deprecated
     */
    function registerBeforeUnloadHandlerHelper(apiVersionTag, handler, versionSpecificHelper) {
        // allow for registration cleanup even when not finished initializing
        !isNullOrUndefined(handler) && ensureInitialized(runtime);
        if (!isNullOrUndefined(handler) && versionSpecificHelper) {
            versionSpecificHelper();
        }
        handlers_registerBeforeUnloadHandler(apiVersionTag, handler);
    }
    teamsCore.registerBeforeUnloadHandlerHelper = registerBeforeUnloadHandlerHelper;
    /**
     * Checks if teamsCore capability is supported by the host
     *
     * @returns boolean to represent whether the teamsCore capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.teamsCore ? true : false;
    }
    teamsCore.isSupported = isSupported;
})(teamsCore || (teamsCore = {}));

;// ./src/public/people.ts









/**
 * Allows your app to add a people picker enabling users to search for and select people in their organization.
 *
 * Exceptional APIs telemetry versioning file: v1 and v2 APIs are mixed together in this file
 */
const peopleTelemetryVersionNumber_v1 = "v1" /* ApiVersionNumber.V_1 */;
const peopleTelemetryVersionNumber_v2 = "v2" /* ApiVersionNumber.V_2 */;
var people;
(function (people_1) {
    /**
     * @hidden
     * This function is the overloaded implementation of selectPeople.
     * Since the method signatures of the v1 callback and v2 promise differ in the type of the first parameter,
     * we need to do an extra check to know the typeof the @param1 to set the proper arguments of the utility function.
     * @param param1
     * @param param2
     * @returns Promise of Array of PeoplePickerResult objects.
     */
    function selectPeople(param1, param2) {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task, FrameContexts.settings);
        let callback = undefined;
        let peoplePickerInputs = undefined;
        let apiVersionTag = '';
        if (typeof param1 === 'function') {
            [callback, peoplePickerInputs] = [param1, param2];
            apiVersionTag = getApiVersionTag(peopleTelemetryVersionNumber_v1, "people.selectPeople" /* ApiName.People_SelectPeople */);
        }
        else {
            peoplePickerInputs = param1;
            apiVersionTag = getApiVersionTag(peopleTelemetryVersionNumber_v2, "people.selectPeople" /* ApiName.People_SelectPeople */);
        }
        return callCallbackWithErrorOrResultFromPromiseAndReturnPromise(selectPeopleHelper, callback /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */, apiVersionTag, peoplePickerInputs);
    }
    people_1.selectPeople = selectPeople;
    function selectPeopleHelper(apiVersionTag, peoplePickerInputs) {
        return new Promise((resolve) => {
            if (!isCurrentSDKVersionAtLeast(peoplePickerRequiredVersion)) {
                throw { errorCode: ErrorCode.OLD_PLATFORM };
            }
            if (!validatePeoplePickerInput(peoplePickerInputs)) {
                throw { errorCode: ErrorCode.INVALID_ARGUMENTS };
            }
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            /* eslint-disable-next-line strict-null-checks/all */ /* Fix tracked by 5730662 */
            resolve(sendAndHandleSdkError(apiVersionTag, 'people.selectPeople', peoplePickerInputs));
        });
    }
    /**
     * Checks if the people capability is supported by the host
     * @returns boolean to represent whether the people capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.people ? true : false;
    }
    people_1.isSupported = isSupported;
})(people || (people = {}));

;// ./src/internal/profileUtil.ts
/**
 * @hidden
 * Validates the request parameters
 * @param showProfileRequest The request parameters
 * @returns true if the parameters are valid, false otherwise
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateShowProfileRequest(showProfileRequest) {
    if (!showProfileRequest) {
        return [false, 'A request object is required'];
    }
    // Validate modality
    if (showProfileRequest.modality && typeof showProfileRequest.modality !== 'string') {
        return [false, 'modality must be a string'];
    }
    // Validate targetElementBoundingRect
    if (!showProfileRequest.targetElementBoundingRect ||
        typeof showProfileRequest.targetElementBoundingRect !== 'object') {
        return [false, 'targetElementBoundingRect must be a DOMRect'];
    }
    // Validate triggerType
    if (!showProfileRequest.triggerType || typeof showProfileRequest.triggerType !== 'string') {
        return [false, 'triggerType must be a valid string'];
    }
    return validatePersona(showProfileRequest.persona);
}
/**
 * @hidden
 * Validates the persona that is used to resolve the profile target
 * @param persona The persona object
 * @returns true if the persona is valid, false otherwise
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validatePersona(persona) {
    if (!persona) {
        return [false, 'persona object must be provided'];
    }
    if (persona.displayName && typeof persona.displayName !== 'string') {
        return [false, 'displayName must be a string'];
    }
    if (!persona.identifiers || typeof persona.identifiers !== 'object') {
        return [false, 'persona identifiers object must be provided'];
    }
    if (!persona.identifiers.AadObjectId && !persona.identifiers.Smtp && !persona.identifiers.Upn) {
        return [false, 'at least one valid identifier must be provided'];
    }
    if (persona.identifiers.AadObjectId && typeof persona.identifiers.AadObjectId !== 'string') {
        return [false, 'AadObjectId identifier must be a string'];
    }
    if (persona.identifiers.Smtp && typeof persona.identifiers.Smtp !== 'string') {
        return [false, 'Smtp identifier must be a string'];
    }
    if (persona.identifiers.Upn && typeof persona.identifiers.Upn !== 'string') {
        return [false, 'Upn identifier must be a string'];
    }
    return [true, undefined];
}

;// ./src/public/profile.ts







/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const profileTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace for profile related APIs.
 *
 * @beta
 */
var profile;
(function (profile) {
    /**
     * Opens a profile card at a specified position to show profile information about a persona.
     * @param showProfileRequest The parameters to position the card and identify the target user.
     * @returns Promise that will be fulfilled when the operation has completed
     *
     * @beta
     */
    function showProfile(showProfileRequest) {
        ensureInitialized(runtime, FrameContexts.content);
        return new Promise((resolve) => {
            const [isValid, message] = validateShowProfileRequest(showProfileRequest);
            if (!isValid) {
                throw { errorCode: ErrorCode.INVALID_ARGUMENTS, message };
            }
            // Convert the app provided parameters to the form suitable for postMessage.
            const requestInternal = {
                modality: showProfileRequest.modality,
                persona: showProfileRequest.persona,
                triggerType: showProfileRequest.triggerType,
                targetRectangle: {
                    x: showProfileRequest.targetElementBoundingRect.x,
                    y: showProfileRequest.targetElementBoundingRect.y,
                    width: showProfileRequest.targetElementBoundingRect.width,
                    height: showProfileRequest.targetElementBoundingRect.height,
                },
            };
            resolve(sendAndHandleSdkError(getApiVersionTag(profileTelemetryVersionNumber, "profile.showProfile" /* ApiName.Profile_ShowProfile */), 'profile.showProfile', requestInternal));
        });
    }
    profile.showProfile = showProfile;
    /**
     * Checks if the profile capability is supported by the host
     * @returns boolean to represent whether the profile capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.profile ? true : false;
    }
    profile.isSupported = isSupported;
})(profile || (profile = {}));

;// ./src/public/search.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const searchTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Allows your application to interact with the host M365 application's search box.
 * By integrating your application with the host's search box, users can search
 * your app using the same search box they use elsewhere in Teams, Outlook, or Office.
 *
 * This functionality is in Beta.
 * @beta
 */
var search;
(function (search) {
    const onChangeHandlerName = 'search.queryChange';
    const onClosedHandlerName = 'search.queryClose';
    const onExecutedHandlerName = 'search.queryExecute';
    /**
     * Allows the caller to register for various events fired by the host search experience.
     * Calling this function indicates that your application intends to plug into the host's search box and handle search events,
     * when the user is actively using your page/tab.
     *
     * The host may visually update its search box, e.g. with the name or icon of your application.
     *
     * Your application should *not* re-render inside of these callbacks, there may be a large number
     * of onChangeHandler calls if the user is typing rapidly in the search box.
     *
     * @param onClosedHandler - This handler will be called when the user exits or cancels their search.
     * Should be used to return your application to its most recent, non-search state. The value of {@link SearchQuery.searchTerm}
     * will be whatever the last query was before ending search.
     *
     * @param onExecuteHandler - The handler will be called when the user executes their
     * search (by pressing Enter for example). Should be used to display the full list of search results.
     * The value of {@link SearchQuery.searchTerm} is the complete query the user entered in the search box.
     *
     * @param onChangeHandler - This optional handler will be called when the user first starts using the
     * host's search box and as the user types their query. Can be used to put your application into a
     * word-wheeling state or to display suggestions as the user is typing.
     *
     * This handler will be called with an empty {@link SearchQuery.searchTerm} when search is beginning, and subsequently,
     * with the current contents of the search box.
     * @example
     * ``` ts
     * search.registerHandlers(
        query => {
          console.log('Update your application to handle the search experience being closed. Last query: ${query.searchTerm}');
        },
        query => {
          console.log(`Update your application to handle an executed search result: ${query.searchTerm}`);
        },
        query => {
          console.log(`Update your application with the changed search query: ${query.searchTerm}`);
        },
       );
     * ```
     *
     * @beta
     */
    function registerHandlers(onClosedHandler, onExecuteHandler, onChangeHandler) {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        registerHandler(getApiVersionTag(searchTelemetryVersionNumber, "search.registerOnClosedHandler" /* ApiName.Search_RegisterOnClosedHandler */), onClosedHandlerName, onClosedHandler);
        registerHandler(getApiVersionTag(searchTelemetryVersionNumber, "search.registerOnExecutedHandler" /* ApiName.Search_RegisterOnExecutedHandler */), onExecutedHandlerName, onExecuteHandler);
        if (onChangeHandler) {
            registerHandler(getApiVersionTag(searchTelemetryVersionNumber, "search.registerOnChangeHandler" /* ApiName.Search_RegisterOnChangeHandler */), onChangeHandlerName, onChangeHandler);
        }
    }
    search.registerHandlers = registerHandlers;
    /**
     * Allows the caller to unregister for all events fired by the host search experience. Calling
     * this function will cause your app to stop appearing in the set of search scopes in the hosts
     *
     * @beta
     */
    function unregisterHandlers() {
        ensureInitialized(runtime, FrameContexts.content);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        // This should let the host know to stop making the app scope show up in the search experience
        // Can also be used to clean up handlers on the host if desired
        sendMessageToParent(getApiVersionTag(searchTelemetryVersionNumber, "search.unregisterHandlers" /* ApiName.Search_UnregisterHandlers */), 'search.unregister');
        removeHandler(onChangeHandlerName);
        removeHandler(onClosedHandlerName);
        removeHandler(onExecutedHandlerName);
    }
    search.unregisterHandlers = unregisterHandlers;
    /**
     * Checks if search capability is supported by the host
     * @returns boolean to represent whether the search capability is supported
     *
     * @throws Error if {@link app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.search ? true : false;
    }
    search.isSupported = isSupported;
    /**
     * Clear the host M365 application's search box
     *
     * @beta
     */
    function closeSearch() {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw new Error('Not supported');
            }
            resolve(sendAndHandleStatusAndReason(getApiVersionTag(searchTelemetryVersionNumber, "search.closeSearch" /* ApiName.Search_CloseSearch */), 'search.closeSearch'));
        });
    }
    search.closeSearch = closeSearch;
})(search || (search = {}));

;// ./src/public/sharing.ts
var sharing_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const sharingTelemetryVersionNumber_v1 = "v1" /* ApiVersionNumber.V_1 */;
const sharingTelemetryVersionNumber_v2 = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to open a share dialog for web content.
 * For more info, see [Share to Teams from personal app or tab](https://learn.microsoft.com/microsoftteams/platform/concepts/build-and-test/share-to-teams-from-personal-app-or-tab)
 */
var sharing;
(function (sharing) {
    /** Type of message that can be sent or received by the sharing APIs */
    sharing.SharingAPIMessages = {
        /**
         * Share web content message.
         * @internal
         */
        shareWebContent: 'sharing.shareWebContent',
    };
    function shareWebContent(shareWebContentRequest, callback) {
        // validate the given input (synchronous check)
        try {
            validateNonEmptyContent(shareWebContentRequest);
            validateTypeConsistency(shareWebContentRequest);
            validateContentForSupportedTypes(shareWebContentRequest);
        }
        catch (err) {
            //return the error via callback(v1) or rejected promise(v2)
            const wrappedFunction = () => Promise.reject(err);
            return callCallbackWithSdkErrorFromPromiseAndReturnPromise(wrappedFunction, callback);
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
        const apiVersionTag = callback
            ? getApiVersionTag(sharingTelemetryVersionNumber_v1, "sharing.shareWebContent" /* ApiName.Sharing_ShareWebContent */)
            : getApiVersionTag(sharingTelemetryVersionNumber_v2, "sharing.shareWebContent" /* ApiName.Sharing_ShareWebContent */);
        return callCallbackWithSdkErrorFromPromiseAndReturnPromise(shareWebContentHelper, callback, apiVersionTag, shareWebContentRequest);
    }
    sharing.shareWebContent = shareWebContent;
    function shareWebContentHelper(apiVersionTag, shareWebContentRequest) {
        return new Promise((resolve) => {
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            resolve(sendAndHandleSdkError(apiVersionTag, sharing.SharingAPIMessages.shareWebContent, shareWebContentRequest));
        });
    }
    /**
     * Functions for validating the shareRequest input parameter
     */
    function validateNonEmptyContent(shareRequest) {
        if (!(shareRequest && shareRequest.content && shareRequest.content.length)) {
            const err = {
                errorCode: ErrorCode.INVALID_ARGUMENTS,
                message: 'Shared content is missing',
            };
            throw err;
        }
    }
    function validateTypeConsistency(shareRequest) {
        let err;
        if (shareRequest.content.some((item) => !item.type)) {
            err = {
                errorCode: ErrorCode.INVALID_ARGUMENTS,
                message: 'Shared content type cannot be undefined',
            };
            throw err;
        }
        if (shareRequest.content.some((item) => item.type !== shareRequest.content[0].type)) {
            err = {
                errorCode: ErrorCode.INVALID_ARGUMENTS,
                message: 'Shared content must be of the same type',
            };
            throw err;
        }
    }
    function validateContentForSupportedTypes(shareRequest) {
        let err;
        if (shareRequest.content[0].type === 'URL') {
            if (shareRequest.content.some((item) => !item.url)) {
                err = {
                    errorCode: ErrorCode.INVALID_ARGUMENTS,
                    message: 'URLs are required for URL content types',
                };
                throw err;
            }
        }
        else {
            err = {
                errorCode: ErrorCode.INVALID_ARGUMENTS,
                message: 'Content type is unsupported',
            };
            throw err;
        }
    }
    /**
     * Checks if the sharing capability is supported by the host
     * @returns boolean to represent whether the sharing capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.sharing ? true : false;
    }
    sharing.isSupported = isSupported;
    /**
     * Namespace to get the list of content shared in a Teams meeting
     *
     * @beta
     */
    let history;
    (function (history) {
        /**
         * Get the list of content shared in a Teams meeting
         *
         * @throws Error if call capability is not supported
         * @throws Error if returned content details are invalid
         * @returns Promise that will resolve with the {@link IContentResponse} objects array
         *
         * @beta
         */
        function getContent() {
            return sharing_awaiter(this, void 0, void 0, function* () {
                ensureInitialized(runtime, FrameContexts.sidePanel, FrameContexts.meetingStage);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                const contentDetails = yield sendAndHandleSdkError(getApiVersionTag(sharingTelemetryVersionNumber_v2, "sharing.history.getContent" /* ApiName.Sharing_History_GetContent */), 'sharing.history.getContent');
                return contentDetails;
            });
        }
        history.getContent = getContent;
        /**
         * Checks if sharing.history capability is supported by the host
         * @returns boolean to represent whether the sharing.history capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @beta
         */
        function isSupported() {
            var _a;
            return ensureInitialized(runtime) && ((_a = runtime.supports.sharing) === null || _a === void 0 ? void 0 : _a.history) !== undefined;
        }
        history.isSupported = isSupported;
    })(history = sharing.history || (sharing.history = {}));
})(sharing || (sharing = {}));

;// ./src/public/stageView.ts





/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const stageViewTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Namespace to interact with the stage view specific part of the SDK.
 *
 *  @beta
 */
var stageView;
(function (stageView) {
    /**
     * The open mode for stage content.
     */
    let StageViewOpenMode;
    (function (StageViewOpenMode) {
        /**
         * Open the content in a modal.
         */
        StageViewOpenMode["modal"] = "modal";
        /**
         * Open the content in a popped-out window.
         */
        StageViewOpenMode["popout"] = "popout";
        /**
         * Open the content in a popped-out window with chat collaboration.
         */
        StageViewOpenMode["popoutWithChat"] = "popoutWithChat";
    })(StageViewOpenMode = stageView.StageViewOpenMode || (stageView.StageViewOpenMode = {}));
    /**
     *
     * Opens a stage view to display a Teams application
     * @beta
     * @param stageViewParams - The parameters to pass into the stage view.
     * @returns Promise that resolves or rejects with an error once the stage view is closed.
     */
    function open(stageViewParams) {
        return new Promise((resolve) => {
            ensureInitialized(runtime, FrameContexts.content);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (!stageViewParams) {
                throw new Error('[stageView.open] Stage view params cannot be null');
            }
            resolve(sendAndHandleSdkError(getApiVersionTag(stageViewTelemetryVersionNumber, "stageView.open" /* ApiName.StageView_Open */), 'stageView.open', stageViewParams));
        });
    }
    stageView.open = open;
    /**
     * Checks if stageView capability is supported by the host
     * @beta
     * @returns boolean to represent whether the stageView capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.stageView ? true : false;
    }
    stageView.isSupported = isSupported;
    /**
     * Namespace for actions that can be taken by the stage view itself.
     *
     * @beta
     */
    let self;
    (function (self) {
        /**
         * Closes the current stage view. This function will be a no-op if called from outside of a stage view.
         * @returns Promise that resolves or rejects with an error once the stage view is closed.
         *
         * @beta
         * @throws Error if stageView.self.close is not supported in the current context or if `app.initialize()` has not resolved successfully.
         */
        function close() {
            return new Promise((resolve) => {
                ensureInitialized(runtime, FrameContexts.content);
                if (!isSupported()) {
                    throw errorNotSupportedOnPlatform;
                }
                resolve(sendAndHandleSdkError(getApiVersionTag(stageViewTelemetryVersionNumber, "stageView.self.close" /* ApiName.StageView_Self_Close */), 'stageView.self.close'));
            });
        }
        self.close = close;
        /**
         * Checks if stageView.self capability is supported by the host
         * @beta
         * @returns boolean to represent whether the stageView.self capability is supported
         *
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         */
        function isSupported() {
            var _a;
            return ensureInitialized(runtime) && ((_a = runtime.supports.stageView) === null || _a === void 0 ? void 0 : _a.self) !== undefined;
        }
        self.isSupported = isSupported;
    })(self = stageView.self || (stageView.self = {}));
})(stageView || (stageView = {}));

;// ./src/public/visualMedia.ts
var visualMedia_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const visualMediaTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Interact with images. Allows the app developer ask the user to get images from their camera / camera roll / file system.
 *
 * @beta
 */
var visualMedia;
(function (visualMedia) {
    const maxVisualMediaSelectionLimit = 10;
    /**
     * @hidden
     * Indicate if user is allowed to move between front and back camera or stay in front/back camera only
     * If the camera option requested by the app isn't available, the SDK will silently default to the platform's standard camera.
     *
     * @beta
     */
    let CameraRestriction;
    (function (CameraRestriction) {
        /** User can move between front and back camera */
        CameraRestriction[CameraRestriction["FrontOrRear"] = 1] = "FrontOrRear";
        /** User can only use the front camera */
        CameraRestriction[CameraRestriction["FrontOnly"] = 2] = "FrontOnly";
        /** User can only use the back camera */
        CameraRestriction[CameraRestriction["RearOnly"] = 3] = "RearOnly";
    })(CameraRestriction = visualMedia.CameraRestriction || (visualMedia.CameraRestriction = {}));
    /**
     * @hidden
     * Specifies the image source
     *
     * @beta
     */
    let Source;
    (function (Source) {
        /** The camera is the source of visual media. */
        Source[Source["Camera"] = 1] = "Camera";
        /** The source of visual media is the gallery. */
        Source[Source["Gallery"] = 2] = "Gallery";
    })(Source = visualMedia.Source || (visualMedia.Source = {}));
    /**
     * @hidden
     * Checks whether or not visualMedia has user permission
     * @returns Promise that will resolve with true if the user had granted the app permission to media information(including Camera and Gallery permission), or with false otherwise,
     * In case of an error, promise will reject with the error.
     * @throws NOT_SUPPORTED_ON_PLATFORM Error if the DevicePermission.Media permission has not successfully granted.
     *
     * @beta
     */
    function hasPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!image.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.Media;
        return sendAndHandleSdkError(getApiVersionTag(visualMediaTelemetryVersionNumber, "visualMedia.hasPermission" /* ApiName.VisualMedia_HasPermission */), 'permissions.has', permissions);
    }
    visualMedia.hasPermission = hasPermission;
    /**
     * @hidden
     * Requests user permission for visualMedia
     * @returns Promise that will resolve with true if the user consented permission for media(including Camera and Gallery permission), or with false otherwise,
     * In case of an error, promise will reject with the error.
     * @throws NOT_SUPPORTED_ON_PLATFORM Error if the DevicePermission.Media permission has not successfully granted.
     *
     * @beta
     */
    function requestPermission() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!image.isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        const permissions = DevicePermission.Media;
        return sendAndHandleSdkError(getApiVersionTag(visualMediaTelemetryVersionNumber, "visualMedia.requestPermission" /* ApiName.VisualMedia_RequestPermission */), 'permissions.request', permissions);
    }
    visualMedia.requestPermission = requestPermission;
    /**
     * @hidden
     * To enable this image capability will let the app developer ask the user to get images from camera/local storage
     *
     * @beta
     */
    let image;
    (function (image) {
        /**
         * @hidden
         * Capture one or multiple image(s) using camera.
         * @param cameraImageInputs - The input params to customize the image(s) to be captured
         * @returns Promise that will resolve with {@link VisualMediaFile[]} object or reject with an error.
         * @throws INVALID_ARGUMENTS Error if imageInputs is null or imageInputs.maxVisualMediaCount is greater than maxVisualMediaSelectionLimit or lesser than 1.
         *
         * @beta
         */
        function captureImages(cameraImageInputs) {
            return visualMedia_awaiter(this, void 0, void 0, function* () {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
                ensureSupported();
                ensureImageInputValid(cameraImageInputs);
                const files = yield sendAndHandleSdkError(getApiVersionTag(visualMediaTelemetryVersionNumber, "visualMedia.image.captureImages" /* ApiName.VisualMedia_Image_CaptureImages */), 'visualMedia.image.captureImages', cameraImageInputs);
                ensureResponseValid(cameraImageInputs.maxVisualMediaCount, files);
                return files;
            });
        }
        image.captureImages = captureImages;
        /**
         * @hidden
         * Upload the existing image(s) from the gallery.
         * @param galleryImageInputs - The input params to customize the image(s) to be captured
         * @returns Promise that will resolve with {@link VisualMediaFile[]} object or reject with an error.
         * @throws INVALID_ARGUMENTS Error if imageInputs is null or imageInputs.maxVisualMediaCount is greater than maxVisualMediaSelectionLimit or lesser than 1.
         *
         * @beta
         */
        function retrieveImages(galleryImageInputs) {
            return visualMedia_awaiter(this, void 0, void 0, function* () {
                ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
                ensureSupported();
                ensureImageInputValid(galleryImageInputs);
                const files = yield sendAndHandleSdkError(getApiVersionTag(visualMediaTelemetryVersionNumber, "visualMedia.image.retrieveImages" /* ApiName.VisualMedia_Image_RetrieveImages */), 'visualMedia.image.retrieveImages', galleryImageInputs);
                ensureResponseValid(galleryImageInputs.maxVisualMediaCount, files);
                return files;
            });
        }
        image.retrieveImages = retrieveImages;
        /**
         * @hidden
         * Checks if visualMedia.image capability is supported by the host
         * @returns boolean to represent whether visualMedia.image is supported
         * @throws Error if {@linkcode app.initialize} has not successfully completed
         *
         * @beta
         */
        function isSupported() {
            return ensureInitialized(runtime) &&
                runtime.supports.visualMedia &&
                runtime.supports.visualMedia.image &&
                runtime.supports.permissions
                ? true
                : false;
        }
        image.isSupported = isSupported;
        /**
         * @hidden
         * Ensure visualMedia.image capability is supported by the host
         * @throws errorNotSupportedOnPlatform error if isSupported() fails.
         *
         * @beta
         */
        function ensureSupported() {
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
        }
        /**
         * @hidden
         * @param imageInput the input can be either CameraImageProperties or GalleryImageProperties
         * @param source the expected Source
         * @throws error if the input check fails.
         * @beta
         */
        function ensureImageInputValid(imageInput) {
            if (!imageInput ||
                imageInput.maxVisualMediaCount > maxVisualMediaSelectionLimit ||
                imageInput.maxVisualMediaCount < 1) {
                throw errorInvalidCount;
            }
        }
        /**
         * @hidden
         * Ensure the number of images in the response is within the maximum limit.
         * @throws error if length check fails.
         * @param maxCount the maxVisualMediaCount set in the imageInpus
         * @param response the response passed from host app
         *
         * @beta
         */
        function ensureResponseValid(maxCount, response) {
            // to ensure the number of images in the response is within the maximum limit.
            if (response.length > maxCount) {
                throw errorInvalidResponse;
            }
        }
    })(image = visualMedia.image || (visualMedia.image = {}));
})(visualMedia || (visualMedia = {}));

;// ./src/public/webStorage.ts
var webStorage_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







/**
 * Contains functionality enabling apps to query properties about how the host manages web storage (`Window.LocalStorage`)
 *
 * @beta
 */
var webStorage;
(function (webStorage) {
    /**
     * Checks if web storage (`Window.LocalStorage`) gets cleared when a user logs out from host
     *
     * @returns `true` if web storage gets cleared on logout and `false` if not
     *
     * @throws `Error` if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isWebStorageClearedOnUserLogOut() {
        return webStorage_awaiter(this, void 0, void 0, function* () {
            ensureInitialized(runtime);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (runtime.isLegacyTeams &&
                (GlobalVars.hostClientType === HostClientType.android ||
                    GlobalVars.hostClientType === HostClientType.ios ||
                    GlobalVars.hostClientType === HostClientType.ipados) &&
                (yield getHostName()) === HostName.teams) {
                // On Teams Mobile, they haven't yet implemented this capability. However, for compatibility reasons, we need
                // to act as if they do. If they did implement it, they would return true, so that's what we do here.
                // Getting Teams Mobile to implement this is a work-in-progress. Once they do implement it, we can remove this
                // whole if-block. Until then, we cannot send the message to them because they will not understand it.
                // Once they do implement it, this if-block will automatically not apply because runtime.isLegacyTeams will no
                // longer be true. So, we don't need to worry about removing this if block "at the right time". We can
                // just keep it here until Teams Mobile implements this capability and uses the host SDK everywhere, at which
                // point we can remove this whole if-block at our leisure.
                return true;
            }
            return yield sendAndUnwrap(getApiVersionTag("v2" /* ApiVersionNumber.V_2 */, "webStorage.isWebStorageClearedOnUserLogOut" /* ApiName.WebStorage_IsWebStorageClearedOnUserLogOut */), "webStorage.isWebStorageClearedOnUserLogOut" /* ApiName.WebStorage_IsWebStorageClearedOnUserLogOut */);
        });
    }
    webStorage.isWebStorageClearedOnUserLogOut = isWebStorageClearedOnUserLogOut;
    function getHostName() {
        return webStorage_awaiter(this, void 0, void 0, function* () {
            if (cachedHostName === null) {
                cachedHostName = (yield app.getContext()).app.host.name;
            }
            return cachedHostName;
        });
    }
    /**
     * Checks if webStorage capability is supported by the host
     * @returns boolean to represent whether the webStorage capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     *
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.webStorage !== undefined;
    }
    webStorage.isSupported = isSupported;
})(webStorage || (webStorage = {}));
// It is safe to cache the host name because the host cannot change at runtime
let cachedHostName = null;
// ...except during unit tests, where we will change it at runtime regularly for testing purposes
function clearWebStorageCachedHostNameForTests() {
    cachedHostName = null;
}

;// ./src/public/call.ts







/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const callTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Used to interact with call functionality, including starting calls with other users.
 */
var call;
(function (call) {
    /** Modalities that can be associated with a call. */
    let CallModalities;
    (function (CallModalities) {
        /** Indicates that the modality is unknown or undefined. */
        CallModalities["Unknown"] = "unknown";
        /** Indicates that the call includes audio. */
        CallModalities["Audio"] = "audio";
        /** Indicates that the call includes video. */
        CallModalities["Video"] = "video";
        /** Indicates that the call includes video-based screen sharing. */
        CallModalities["VideoBasedScreenSharing"] = "videoBasedScreenSharing";
        /** Indicates that the call includes data sharing or messaging. */
        CallModalities["Data"] = "data";
    })(CallModalities = call.CallModalities || (call.CallModalities = {}));
    /**
     * Starts a call with other users
     *
     * @param startCallParams - Parameters for the call
     *
     * @throws Error if call capability is not supported
     * @throws Error if host notifies of a failed start call attempt in a legacy Teams environment
     * @returns always true if the host notifies of a successful call inititation
     */
    function startCall(startCallParams) {
        const apiVersionTag = getApiVersionTag(callTelemetryVersionNumber, "call.startCall" /* ApiName.Call_StartCall */);
        return new Promise((resolve) => {
            var _a;
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
            if (!isSupported()) {
                throw errorNotSupportedOnPlatform;
            }
            if (runtime.isLegacyTeams) {
                resolve(sendAndUnwrap(apiVersionTag, 'executeDeepLink', createTeamsDeepLinkForCall(startCallParams.targets, (_a = startCallParams.requestedModalities) === null || _a === void 0 ? void 0 : _a.includes(CallModalities.Video), startCallParams.source)).then((result) => {
                    if (!result) {
                        throw new Error(errorCallNotStarted);
                    }
                    return result;
                }));
            }
            else {
                return sendMessageToParent(apiVersionTag, 'call.startCall', [startCallParams], resolve);
            }
        });
    }
    call.startCall = startCall;
    /**
     * Checks if the call capability is supported by the host
     * @returns boolean to represent whether the call capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.call ? true : false;
    }
    call.isSupported = isSupported;
})(call || (call = {}));

;// ./src/public/appInitialization.ts


/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link app} namespace instead.
 *
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const appInitializationTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
var appInitialization;
(function (appInitialization) {
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.Messages} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appInitialization.Messages = app.Messages;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.FailedReason} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appInitialization.FailedReason = app.FailedReason;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.ExpectedFailureReason} instead.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appInitialization.ExpectedFailureReason = app.ExpectedFailureReason;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.notifyAppLoaded app.notifyAppLoaded(): void} instead.
     *
     * Notifies the frame that app has loaded and to hide the loading indicator if one is shown.
     */
    function notifyAppLoaded() {
        notifyAppLoadedHelper(getApiVersionTag(appInitializationTelemetryVersionNumber, "appInitialization.notifyAppLoaded" /* ApiName.AppInitialization_NotifyAppLoaded */));
    }
    appInitialization.notifyAppLoaded = notifyAppLoaded;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.notifySuccess app.notifySuccess(): void} instead.
     *
     * Notifies the frame that app initialization is successful and is ready for user interaction.
     */
    function notifySuccess() {
        notifySuccessHelper(getApiVersionTag(appInitializationTelemetryVersionNumber, "appInitialization.notifySuccess" /* ApiName.AppInitialization_NotifySuccess */));
    }
    appInitialization.notifySuccess = notifySuccess;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.notifyFailure app.notifyFailure(appInitializationFailedRequest: IFailedRequest): void} instead.
     *
     * Notifies the frame that app initialization has failed and to show an error page in its place.
     * @param appInitializationFailedRequest - The failure request containing the reason for why the app failed
     * during initialization as well as an optional message.
     */
    function notifyFailure(appInitializationFailedRequest) {
        notifyFailureHelper(getApiVersionTag(appInitializationTelemetryVersionNumber, "appInitialization.notifyFailure" /* ApiName.AppInitialization_NotifyFailure */), appInitializationFailedRequest);
    }
    appInitialization.notifyFailure = notifyFailure;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link app.notifyExpectedFailure app.notifyExpectedFailure(expectedFailureRequest: IExpectedFailureRequest): void} instead.
     *
     * Notifies the frame that app initialized with some expected errors.
     * @param expectedFailureRequest - The expected failure request containing the reason and an optional message
     */
    function notifyExpectedFailure(expectedFailureRequest) {
        notifyExpectedFailureHelper(getApiVersionTag(appInitializationTelemetryVersionNumber, "appInitialization.notifyExpectedFailure" /* ApiName.AppInitialization_NotifyExpectedFailure */), expectedFailureRequest);
    }
    appInitialization.notifyExpectedFailure = notifyExpectedFailure;
})(appInitialization || (appInitialization = {}));

;// ./src/public/thirdPartyCloudStorage.ts







const Files3PLogger = getLogger('thirdPartyCloudStorage');
/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const thirdPartyCloudStorageTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * Extended files API 3P storage providers, features like sending Blob from Teams to 3P app on user
 * actions like drag and drop to compose
 * @beta
 */
var thirdPartyCloudStorage;
(function (thirdPartyCloudStorage) {
    /**
     * Class to assemble files
     * @beta
     */
    class AttachmentListHelper {
        constructor(fileType, assembleAttachment) {
            this.fileType = fileType;
            this.assembleAttachment = assembleAttachment;
        }
    }
    let files = [];
    let helper = null;
    let lastChunkVal = true; // setting it to true so that the very first file and first chunk does not fail
    let callback = null;
    /**
     * Get drag-and-drop files using a callback.
     *
     * @param {string} dragAndDropInput - unique id which is a combination of replyToId + threadId of teams chat and channel.
     *   Both replyToId and threadId can be fetched from application context.
     * @param {DragAndDropFileCallback} dragAndDropFileCallback - callback
     *   A callback function to handle the result of the operation
     * @beta
     */
    function getDragAndDropFiles(dragAndDropInput, dragAndDropFileCallback) {
        if (!dragAndDropFileCallback) {
            throw new Error('[getDragAndDropFiles] Callback cannot be null');
        }
        if (!dragAndDropInput || dragAndDropInput === '') {
            const invalidInput = { errorCode: ErrorCode.INVALID_ARGUMENTS };
            dragAndDropFileCallback([], invalidInput);
            return;
        }
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (callback) {
            callback = null;
            throw new Error('getDragAndDropFiles cannot be called twice');
        }
        else {
            callback = dragAndDropFileCallback;
        }
        lastChunkVal = true;
        sendMessageToParent(getApiVersionTag(thirdPartyCloudStorageTelemetryVersionNumber, "thirdPartyCloudStorage.getDragAndDropFiles" /* ApiName.ThirdPartyCloudStorage_GetDragAndDropFiles */), 'thirdPartyCloudStorage.getDragAndDropFiles', [dragAndDropInput], handleGetDragAndDropFilesCallbackRequest);
    }
    thirdPartyCloudStorage.getDragAndDropFiles = getDragAndDropFiles;
    function handleGetDragAndDropFilesCallbackRequest(fileResult) {
        if (callback) {
            if (fileResult && fileResult.error) {
                callback([], fileResult.error);
                callback = null;
            }
            else {
                if (fileResult && fileResult.fileChunk) {
                    try {
                        if (!lastChunkVal && fileResult.fileChunk.chunkSequence === 0) {
                            // last chunk value was false
                            Files3PLogger("Last chunk is not received or 'endOfFile' value for previous chunk was not set to true");
                            lastChunkVal = true; // for next iteration
                            callback([], {
                                errorCode: ErrorCode.INTERNAL_ERROR,
                                message: 'error occurred while receiving data',
                            });
                            files = [];
                            callback = null;
                        }
                        const assemble = decodeAttachment(fileResult.fileChunk, fileResult.fileType);
                        if (assemble) {
                            if (!helper) {
                                // creating helper object for received file chunk
                                helper = new AttachmentListHelper(fileResult.fileType, []);
                            }
                            helper.assembleAttachment.push(assemble);
                        }
                        else {
                            Files3PLogger(`Received a null assemble attachment for when decoding chunk sequence ${fileResult.fileChunk.chunkSequence}; not including the chunk in the assembled file.`);
                            callback
                                ? callback([], { errorCode: ErrorCode.INTERNAL_ERROR, message: 'error occurred while receiving data' })
                                : (callback = null);
                            files = [];
                            callback = null;
                            lastChunkVal = true;
                        }
                        // we will store this value to determine whether we received the last chunk of the previous file
                        lastChunkVal = fileResult.fileChunk.endOfFile;
                        if (fileResult.fileChunk.endOfFile && helper) {
                            const fileBlob = createFile(helper.assembleAttachment, helper.fileType);
                            if (fileBlob) {
                                // Convert blob to File
                                const receivedFile = new File([fileBlob], fileResult.fileName, {
                                    type: fileBlob.type,
                                });
                                files.push(receivedFile);
                            }
                            if (fileResult.isLastFile && callback) {
                                callback(files, fileResult.error);
                                files = [];
                                callback = null;
                                lastChunkVal = true;
                            }
                            helper = null;
                        }
                    }
                    catch (e) {
                        if (callback) {
                            callback([], { errorCode: ErrorCode.INTERNAL_ERROR, message: e });
                            files = [];
                            callback = null;
                            lastChunkVal = true;
                        }
                    }
                }
                else {
                    callback([], { errorCode: ErrorCode.INTERNAL_ERROR, message: 'data received is null' });
                    files = [];
                    callback = null;
                    lastChunkVal = true;
                }
            }
        }
    }
    /**
     * Checks if the thirdPartyCloudStorage capability is supported by the host
     * @returns boolean to represent whether the thirdPartyCloudStorage capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.thirdPartyCloudStorage ? true : false;
    }
    thirdPartyCloudStorage.isSupported = isSupported;
})(thirdPartyCloudStorage || (thirdPartyCloudStorage = {}));

;// ./src/public/publicAPIs.ts












/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const publicAPIsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link app.initialize app.initialize(validMessageOrigins?: string[]): Promise\<void\>} instead.
 *
 * Initializes the library. This must be called before any other SDK calls
 * but after the frame is loaded successfully.
 * @param callback - Optionally specify a callback to invoke when Teams SDK has successfully initialized
 * @param validMessageOrigins - Optionally specify a list of cross-frame message origins. This parameter is used if you know that your app
 * will be hosted on a custom domain (i.e., not a standard Microsoft 365 host like Teams, Outlook, etc.) Most apps will never need
 * to pass a value for this parameter.
 * Any domains passed in the array must have the https: protocol on the string otherwise they will be ignored. Example: https://www.example.com
 */
function initialize(callback, validMessageOrigins) {
    appInitializeHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "initialize" /* ApiName.PublicAPIs_Initialize */), validMessageOrigins).then(() => {
        if (callback) {
            callback();
        }
    });
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link teamsCore.enablePrintCapability teamsCore.enablePrintCapability(): void} instead.
 *
 * Enable print capability to support printing page using Ctrl+P and cmd+P
 */
function enablePrintCapability() {
    teamsCore.enablePrintCapability();
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link teamsCore.print teamsCore.print(): void} instead.
 *
 * Default print handler
 */
function print() {
    teamsCore.print();
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link app.getContext app.getContext(): Promise\<app.Context\>} instead.
 *
 * Retrieves the current context the frame is running in.
 *
 * @param callback - The callback to invoke when the {@link Context} object is retrieved.
 */
function getContext(callback) {
    ensureInitializeCalled();
    sendMessageToParent(getApiVersionTag(publicAPIsTelemetryVersionNumber, "getContext" /* ApiName.PublicAPIs_GetContext */), 'getContext', (context) => {
        if (!context.frameContext) {
            // Fallback logic for frameContext properties
            context.frameContext = GlobalVars.frameContext;
        }
        callback(context);
    });
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link app.registerOnThemeChangeHandler app.registerOnThemeChangeHandler(handler: registerOnThemeChangeHandlerFunctionType): void} instead.
 *
 * Registers a handler for theme changes.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 *
 * @param handler - The handler to invoke when the user changes their theme.
 */
function publicAPIs_registerOnThemeChangeHandler(handler) {
    registerOnThemeChangeHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerOnThemeChangeHandlerHelper" /* ApiName.PublicAPIs_RegisterOnThemeChangeHandlerHelper */), handler);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.registerFullScreenHandler pages.registerFullScreenHandler(handler: registerFullScreenHandlerFunctionType): void} instead.
 *
 * Registers a handler for changes from or to full-screen view for a tab.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 *
 * @param handler - The handler to invoke when the user toggles full-screen view for a tab.
 */
function registerFullScreenHandler(handler) {
    registerHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerFullScreenHandler" /* ApiName.PublicAPIs_RegisterFullScreenHandler */), 'fullScreenChange', handler, []);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.appButton.onClick pages.appButton.onClick(handler: callbackFunctionType): void} instead.
 *
 * Registers a handler for clicking the app button.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 *
 * @param handler - The handler to invoke when the personal app button is clicked in the app bar.
 */
function registerAppButtonClickHandler(handler) {
    registerHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerAppButtonClickHandler" /* ApiName.PublicAPIs_RegisterAppButtonClickHandler */), 'appButtonClick', handler, [FrameContexts.content]);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.appButton.onHoverEnter pages.appButton.onHoverEnter(handler: callbackFunctionType): void} instead.
 *
 * Registers a handler for entering hover of the app button.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 *
 * @param handler - The handler to invoke when entering hover of the personal app button in the app bar.
 */
function registerAppButtonHoverEnterHandler(handler) {
    registerHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerAppButtonHoverEnterHandler" /* ApiName.PublicAPIs_RegisterAppButtonHoverEnterHandler */), 'appButtonHoverEnter', handler, [FrameContexts.content]);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.appButton.onHoverLeave pages.appButton.onHoverLeave(handler: callbackFunctionType): void} instead.
 *
 * Registers a handler for exiting hover of the app button.
 * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
 * @param handler - The handler to invoke when exiting hover of the personal app button in the app bar.
 *
 */
function registerAppButtonHoverLeaveHandler(handler) {
    registerHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerAppButtonHoverLeaveHandler" /* ApiName.PublicAPIs_RegisterAppButtonHoverLeaveHandler */), 'appButtonHoverLeave', handler, [FrameContexts.content]);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.backStack.registerBackButtonHandler pages.backStack.registerBackButtonHandler(handler: registerBackButtonHandlerFunctionType): void} instead.
 *
 * Registers a handler for user presses of the Team client's back button. Experiences that maintain an internal
 * navigation stack should use this handler to navigate the user back within their frame. If an app finds
 * that after running its back button handler it cannot handle the event it should call the navigateBack
 * method to ask the Teams client to handle it instead.
 *
 * @param handler - The handler to invoke when the user presses their Team client's back button.
 */
function registerBackButtonHandler(handler) {
    pages.backStack.registerBackButtonHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerBackButtonHandler" /* ApiName.PublicAPIs_RegisterBackButtonHandler */), handler);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link teamsCore.registerOnLoadHandler teamsCore.registerOnLoadHandler(handler: (context: LoadContext) => void): void} instead.
 *
 * @hidden
 * Registers a handler to be called when the page has been requested to load.
 *
 * @param handler - The handler to invoke when the page is loaded.
 */
function registerOnLoadHandler(handler) {
    teamsCore.registerOnLoadHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerOnLoadHandler" /* ApiName.PublicAPIs_RegisterOnLoadHandler */), handler);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link teamsCore.registerBeforeUnloadHandler teamsCore.registerBeforeUnloadHandler(handler: (readyToUnload: callbackFunctionType) => boolean): void} instead.
 *
 * @hidden
 * Registers a handler to be called before the page is unloaded.
 *
 * @param handler - The handler to invoke before the page is unloaded. If this handler returns true the page should
 * invoke the readyToUnload function provided to it once it's ready to be unloaded.
 */
function registerBeforeUnloadHandler(handler) {
    teamsCore.registerBeforeUnloadHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerBeforeUnloadHandler" /* ApiName.PublicAPIs_RegisterBeforeUnloadHandler */), handler);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.registerFocusEnterHandler pages.registerFocusEnterHandler(handler: (navigateForward: boolean) => void): void} instead.
 *
 * @hidden
 * Registers a handler when focus needs to be passed from teams to the place of choice on app.
 *
 * @param handler - The handler to invoked by the app when they want the focus to be in the place of their choice.
 */
function registerFocusEnterHandler(handler) {
    registerHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerFocusEnterHandler" /* ApiName.PublicAPIs_RegisterFocusEnterHandler */), 'focusEnter', handler, []);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.config.registerChangeConfigHandler pages.config.registerChangeConfigHandler(handler: callbackFunctionType): void} instead.
 *
 * Registers a handler for when the user reconfigurated tab.
 *
 * @param handler - The handler to invoke when the user click on Settings.
 */
function registerChangeSettingsHandler(handler) {
    registerHandlerHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "registerChangeSettingsHandler" /* ApiName.PublicAPIs_RegisterChangeSettingsHandler */), 'changeSettings', handler, [FrameContexts.content]);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.tabs.getTabInstances pages.tabs.getTabInstances(tabInstanceParameters?: TabInstanceParameters): Promise\<TabInformation\>} instead.
 *
 * Allows an app to retrieve for this user tabs that are owned by this app.
 * If no TabInstanceParameters are passed, the app defaults to favorite teams and favorite channels.
 *
 * @param callback - The callback to invoke when the {@link TabInstanceParameters} object is retrieved.
 * @param tabInstanceParameters - OPTIONAL Flags that specify whether to scope call to favorite teams or channels.
 */
function getTabInstances(callback, tabInstanceParameters) {
    ensureInitialized(runtime);
    getTabInstancesHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "getTabInstances" /* ApiName.PublicAPIs_GetTabInstances */), tabInstanceParameters).then((tabInfo) => {
        callback(tabInfo);
    });
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.tabs.getMruTabInstances pages.tabs.getMruTabInstances(tabInstanceParameters?: TabInstanceParameters): Promise\<TabInformation\>} instead.
 *
 * Allows an app to retrieve the most recently used tabs for this user.
 *
 * @param callback - The callback to invoke when the {@link TabInformation} object is retrieved.
 * @param tabInstanceParameters - OPTIONAL Ignored, kept for future use
 */
function getMruTabInstances(callback, tabInstanceParameters) {
    ensureInitialized(runtime);
    getMruTabInstancesHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "getMruTabInstances" /* ApiName.PublicAPIs_GetMruTabInstances */), tabInstanceParameters).then((tabInfo) => {
        callback(tabInfo);
    });
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.shareDeepLink pages.shareDeepLink(deepLinkParameters: DeepLinkParameters): void} instead.
 *
 * Shares a deep link that a user can use to navigate back to a specific state in this page.
 *
 * @param deepLinkParameters - ID and label for the link and fallback URL.
 */
function shareDeepLink(deepLinkParameters) {
    shareDeepLinkHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "shareDeepLink" /* ApiName.PublicAPIs_ShareDeepLink */), {
        subPageId: deepLinkParameters.subEntityId,
        subPageLabel: deepLinkParameters.subEntityLabel,
        subPageWebUrl: deepLinkParameters.subEntityWebUrl,
    });
}
/**
 * @deprecated
 * This function was previously used for opening various types of links. As of TeamsJS v2.0.0, it has been replaced with multiple different
 * functions depending on the type of link:
 *
 * - Use {@link pages.currentApp.navigateToDefaultPage} to navigate to the default page of your own app
 * - Use {@link pages.currentApp.navigateTo} to navigate to a section of your own app
 * - Use {@link pages.navigateToApp} to navigate to other apps besides your own
 * - Use {@link app.openLink} for opening deep links to other parts of the host (e.g., to chats or channels) or
 * general-purpose links (e.g., to external websites).
 *
 * @param deepLink deep link.
 */
function executeDeepLink(deepLink, onComplete) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
    const completionHandler = onComplete !== null && onComplete !== void 0 ? onComplete : getGenericOnCompleteHandler();
    openLinkHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "executeDeepLink" /* ApiName.PublicAPIs_ExecuteDeepLink */), deepLink)
        .then(() => {
        completionHandler(true);
    })
        .catch((err) => {
        completionHandler(false, err.message);
    });
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.setCurrentFrame pages.setCurrentFrame(frameInfo: FrameInfo): void} instead.
 *
 * Set the current Frame Context
 *
 * @param frameContext - FrameContext information to be set
 */
function setFrameContext(frameContext) {
    setCurrentFrameHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "setFrameContext" /* ApiName.PublicAPIs_SetFrameContext */), frameContext);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.initializeWithFrameContext pages.initializeWithFrameContext(frameInfo: FrameInfo, callback?: callbackFunctionType, validMessageOrigins?: string[],): void} instead.
 *
 * Initialize with FrameContext
 *
 * @param frameContext - FrameContext information to be set
 * @param callback - The optional callback to be invoked be invoked after initilizing the frame context
 * @param validMessageOrigins -  Optionally specify a list of cross frame message origins.
 * They must have https: protocol otherwise they will be ignored. Example: https:www.example.com
 */
function initializeWithFrameContext(frameContext, callback, validMessageOrigins) {
    appInitializeHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "initializeWithFrameContext" /* ApiName.PublicAPIs_InitializeWithFrameContext */), validMessageOrigins).then(() => callback && callback());
    setCurrentFrameHelper(getApiVersionTag(publicAPIsTelemetryVersionNumber, "setFrameContext" /* ApiName.PublicAPIs_SetFrameContext */), frameContext);
}

;// ./src/public/navigation.ts






/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const navigationTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.returnFocus pages.returnFocus(navigateForward?: boolean): void} instead.
 *
 * Return focus to the main Teams app. Will focus search bar if navigating foward and app bar if navigating back.
 *
 * @param navigateForward - Determines the direction to focus in teams app.
 */
function returnFocus(navigateForward) {
    returnFocusHelper(getApiVersionTag(navigationTelemetryVersionNumber, "navigation.returnFocus" /* ApiName.Navigation_ReturnFocus */), navigateForward);
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.tabs.navigateToTab pages.tabs.navigateToTab(tabInstance: TabInstance): Promise\<void\>} instead.
 *
 * Navigates the Microsoft Teams app to the specified tab instance.
 *
 * @param tabInstance - The tab instance to navigate to.
 * @param onComplete - The callback to invoke when the action is complete.
 */
function navigateToTab(tabInstance, onComplete) {
    ensureInitialized(runtime);
    const completionHandler = onComplete !== null && onComplete !== void 0 ? onComplete : getGenericOnCompleteHandler();
    tabsNavigateToTabHelper(getApiVersionTag(navigationTelemetryVersionNumber, "navigation.navigateToTab" /* ApiName.Navigation_NavigateToTab */), tabInstance)
        .then(() => {
        completionHandler(true);
    })
        .catch((error) => {
        completionHandler(false, error.message);
    });
}
/**
 * @deprecated
 * As of 2.0.0, this API is deprecated and can be replaced by the standard JavaScript
 * API, window.location.href, when navigating the app to a new cross-domain URL. Any URL
 * that is redirected to must be listed in the validDomains block of the manifest. Please
 * remove any calls to this API.
 * @param url - The URL to navigate the frame to.
 * @param onComplete - The callback to invoke when the action is complete.
 */
function navigateCrossDomain(url, onComplete) {
    ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.settings, FrameContexts.remove, FrameContexts.task, FrameContexts.stage, FrameContexts.meetingStage);
    const completionHandler = onComplete !== null && onComplete !== void 0 ? onComplete : getGenericOnCompleteHandler();
    navigateCrossDomainHelper(getApiVersionTag(navigationTelemetryVersionNumber, "navigation.navigateCrossDomain" /* ApiName.Navigation_NavigateCrossDomain */), url)
        .then(() => {
        completionHandler(true);
    })
        .catch((error) => {
        completionHandler(false, error.message);
    });
}
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.backStack.navigateBack pages.backStack.navigateBack(): Promise\<void\>} instead.
 *
 * Navigates back in the Teams client.
 * See registerBackButtonHandler for more information on when it's appropriate to use this method.
 *
 * @param onComplete - The callback to invoke when the action is complete.
 */
function navigateBack(onComplete) {
    ensureInitialized(runtime);
    const completionHandler = onComplete !== null && onComplete !== void 0 ? onComplete : getGenericOnCompleteHandler();
    backStackNavigateBackHelper(getApiVersionTag(navigationTelemetryVersionNumber, "navigation.navigateBack" /* ApiName.Navigation_NavigateBack */))
        .then(() => {
        completionHandler(true);
    })
        .catch((error) => {
        completionHandler(false, error.message);
    });
}

;// ./src/public/settings.ts






/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const settingsTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link pages.config} namespace instead.
 *
 * Namespace to interact with the settings-specific part of the SDK.
 * This object is usable only on the settings frame.
 */
var settings;
(function (settings) {
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link pages.config.setValidityState pages.config.setValidityState(validityState: boolean): void} instead.
     *
     * Sets the validity state for the settings.
     * The initial value is false, so the user cannot save the settings until this is called with true.
     *
     * @param validityState - Indicates whether the save or remove button is enabled for the user.
     */
    function setValidityState(validityState) {
        configSetValidityStateHelper(getApiVersionTag(settingsTelemetryVersionNumber, "settings.setValidityState" /* ApiName.Settings_SetValidityState */), validityState);
    }
    settings.setValidityState = setValidityState;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link pages.getConfig pages.getConfig(): Promise\<InstanceConfig\>} instead.
     *
     * Gets the settings for the current instance.
     *
     * @param callback - The callback to invoke when the {@link Settings} object is retrieved.
     */
    function getSettings(callback) {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.settings, FrameContexts.remove, FrameContexts.sidePanel);
        getConfigHelper(getApiVersionTag(settingsTelemetryVersionNumber, "settings.getSettings" /* ApiName.Settings_GetSettings */)).then((config) => {
            callback(config);
        });
    }
    settings.getSettings = getSettings;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link pages.config.setConfig pages.config.setConfig(instanceSettings: Config): Promise\<void\>} instead.
     *
     * Sets the settings for the current instance.
     * This is an asynchronous operation; calls to getSettings are not guaranteed to reflect the changed state.
     *
     * @param - Set the desired settings for this instance.
     */
    function setSettings(instanceSettings, onComplete) {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.settings, FrameContexts.sidePanel);
        const completionHandler = onComplete !== null && onComplete !== void 0 ? onComplete : getGenericOnCompleteHandler();
        configSetConfigHelper(getApiVersionTag(settingsTelemetryVersionNumber, "settings.setSettings" /* ApiName.Settings_SetSettings */), instanceSettings)
            .then(() => {
            completionHandler(true);
        })
            .catch((error) => {
            completionHandler(false, error.message);
        });
    }
    settings.setSettings = setSettings;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link pages.config.registerOnSaveHandler pages.config.registerOnSaveHandler(handler: registerOnSaveHandlerFunctionType): void} instead.
     *
     * Registers a handler for when the user attempts to save the settings. This handler should be used
     * to create or update the underlying resource powering the content.
     * The object passed to the handler must be used to notify whether to proceed with the save.
     * Only one handler can be registered at a time. A subsequent registration replaces an existing registration.
     *
     * @param handler - The handler to invoke when the user selects the save button.
     */
    function registerOnSaveHandler(handler) {
        pages.config.registerOnSaveHandlerHelper(getApiVersionTag(settingsTelemetryVersionNumber, "settings.registerOnSaveHandler" /* ApiName.Settings_RegisterOnSaveHandler */), handler);
    }
    settings.registerOnSaveHandler = registerOnSaveHandler;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link pages.config.registerOnRemoveHandler pages.config.registerOnRemoveHandler(handler: registerOnRemoveHandlerFunctionType): void} instead.
     *
     * Registers a handler for user attempts to remove content. This handler should be used
     * to remove the underlying resource powering the content.
     * The object passed to the handler must be used to indicate whether to proceed with the removal.
     * Only one handler may be registered at a time. Subsequent registrations will override the first.
     *
     * @param handler - The handler to invoke when the user selects the remove button.
     */
    function registerOnRemoveHandler(handler) {
        pages.config.registerOnRemoveHandlerHelper(getApiVersionTag(settingsTelemetryVersionNumber, "settings.registerOnRemoveHandler" /* ApiName.Settings_RegisterOnRemoveHandler */), handler);
    }
    settings.registerOnRemoveHandler = registerOnRemoveHandler;
})(settings || (settings = {}));

;// ./src/public/tasks.ts
/* eslint-disable @typescript-eslint/ban-types */
var tasks_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};







/**
 * v1 APIs telemetry file: All of APIs in this capability file should send out API version v1 ONLY
 */
const tasksTelemetryVersionNumber = "v1" /* ApiVersionNumber.V_1 */;
/**
 * @deprecated
 * As of TeamsJS v2.0.0, please use {@link dialog} namespace instead.
 *
 * Namespace to interact with the task module-specific part of the SDK.
 * This object is usable only on the content frame.
 * The tasks namespace will be deprecated. Please use dialog for future developments.
 */
var tasks;
(function (tasks) {
    /**
     * @deprecated
     * As of 2.8.0:
     * - For url-based dialogs, please use {@link dialog.url.open dialog.url.open(urlDialogInfo: UrlDialogInfo, submitHandler?: DialogSubmitHandler, messageFromChildHandler?: PostMessageChannel): void} .
     * - For url-based dialogs with bot interaction, please use {@link dialog.url.bot.open dialog.url.bot.open(botUrlDialogInfo: BotUrlDialogInfo, submitHandler?: DialogSubmitHandler, messageFromChildHandler?: PostMessageChannel): void}
     * - For Adaptive Card-based dialogs:
     *   - In Teams, please continue to use this function until the new functions in {@link dialog.adaptiveCard} have been fully implemented. You can tell at runtime when they are implemented in Teams by checking
     *     the return value of the {@link dialog.adaptiveCard.isSupported} function. This documentation line will also be removed once they have been fully implemented in Teams.
     *   - In all other hosts, please use {@link dialog.adaptiveCard.open dialog.adaptiveCard.open(cardDialogInfo: CardDialogInfo, submitHandler?: DialogSubmitHandler, messageFromChildHandler?: PostMessageChannel): void}
     *
     * Allows an app to open the task module.
     *
     * @param taskInfo - An object containing the parameters of the task module
     * @param submitHandler - Handler to call when the task module is completed
     */
    function startTask(taskInfo, submitHandler) {
        const apiVersionTag = getApiVersionTag(tasksTelemetryVersionNumber, "tasks.startTask" /* ApiName.Tasks_StartTask */);
        const dialogSubmitHandler = submitHandler
            ? (sdkResponse) => { var _a, _b; return submitHandler((_a = sdkResponse.err) !== null && _a !== void 0 ? _a : '', (_b = sdkResponse.result) !== null && _b !== void 0 ? _b : ''); }
            : undefined;
        if (taskInfo.card === undefined && taskInfo.url === undefined) {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
            sendMessageToParent(apiVersionTag, 'tasks.startTask', [taskInfo], submitHandler);
        }
        else if (taskInfo.card) {
            ensureInitialized(runtime, FrameContexts.content, FrameContexts.sidePanel, FrameContexts.meetingStage);
            sendMessageToParent(apiVersionTag, 'tasks.startTask', [taskInfo], submitHandler);
        }
        else if (taskInfo.completionBotId !== undefined) {
            botUrlOpenHelper(apiVersionTag, getBotUrlDialogInfoFromTaskInfo(taskInfo), dialogSubmitHandler);
        }
        else {
            urlOpenHelper(apiVersionTag, getUrlDialogInfoFromTaskInfo(taskInfo), dialogSubmitHandler);
        }
        return new ChildAppWindow();
    }
    tasks.startTask = startTask;
    /**
     * @deprecated
     * As of TeamsJS v2.0.0, please use {@link dialog.update.resize dialog.update.resize(dimensions: DialogSize): void} instead.
     *
     * Update height/width task info properties.
     *
     * @param taskInfo - An object containing width and height properties
     */
    function updateTask(taskInfo) {
        taskInfo = getDefaultSizeIfNotProvided(taskInfo);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { width, height } = taskInfo, extra = tasks_rest(taskInfo, ["width", "height"]);
        if (Object.keys(extra).length) {
            throw new Error('resize requires a TaskInfo argument containing only width and height');
        }
        updateResizeHelper(getApiVersionTag(tasksTelemetryVersionNumber, "tasks.updateTask" /* ApiName.Tasks_UpdateTask */), taskInfo);
    }
    tasks.updateTask = updateTask;
    /**
     * @deprecated
     * As of 2.8.0, please use {@link dialog.url.submit} instead.
     *
     * Submit the task module.
     *
     * @param result - Contains the result to be sent to the bot or the app. Typically a JSON object or a serialized version of it
     * @param appIds - Valid application(s) that can receive the result of the submitted dialogs. Specifying this parameter helps prevent malicious apps from retrieving the dialog result. Multiple app IDs can be specified because a web app from a single underlying domain can power multiple apps across different environments and branding schemes.
     */
    function submitTask(result, appIds) {
        urlSubmitHelper(getApiVersionTag(tasksTelemetryVersionNumber, "tasks.submitTask" /* ApiName.Tasks_SubmitTask */), result, appIds);
    }
    tasks.submitTask = submitTask;
    /**
     * Converts {@link TaskInfo} to {@link UrlDialogInfo}
     * @param taskInfo - TaskInfo object to convert
     * @returns - Converted UrlDialogInfo object
     */
    function getUrlDialogInfoFromTaskInfo(taskInfo) {
        if (taskInfo.url === undefined) {
            throw new Error("url property of taskInfo object can't be undefined");
        }
        const urldialogInfo = {
            url: taskInfo.url,
            size: {
                height: taskInfo.height ? taskInfo.height : TaskModuleDimension.Small,
                width: taskInfo.width ? taskInfo.width : TaskModuleDimension.Small,
            },
            title: taskInfo.title,
            fallbackUrl: taskInfo.fallbackUrl,
        };
        return urldialogInfo;
    }
    /**
     * Converts {@link TaskInfo} to {@link BotUrlDialogInfo}
     * @param taskInfo - TaskInfo object to convert
     * @returns - converted BotUrlDialogInfo object
     */
    function getBotUrlDialogInfoFromTaskInfo(taskInfo) {
        if (taskInfo.url === undefined || taskInfo.completionBotId === undefined) {
            throw new Error(`Both url ${taskInfo.url} and completionBotId ${taskInfo.completionBotId} are required for bot url dialog. At least one is undefined.`);
        }
        const botUrldialogInfo = {
            url: taskInfo.url,
            size: {
                height: taskInfo.height ? taskInfo.height : TaskModuleDimension.Small,
                width: taskInfo.width ? taskInfo.width : TaskModuleDimension.Small,
            },
            title: taskInfo.title,
            fallbackUrl: taskInfo.fallbackUrl,
            completionBotId: taskInfo.completionBotId,
        };
        return botUrldialogInfo;
    }
    /**
     * Sets the height and width of the {@link TaskInfo} object to the original height and width, if initially specified,
     * otherwise uses the height and width values corresponding to {@link DialogDimension | TaskModuleDimension.Small}
     * @param taskInfo TaskInfo object from which to extract size info, if specified
     * @returns TaskInfo with height and width specified
     */
    function getDefaultSizeIfNotProvided(taskInfo) {
        taskInfo.height = taskInfo.height ? taskInfo.height : TaskModuleDimension.Small;
        taskInfo.width = taskInfo.width ? taskInfo.width : TaskModuleDimension.Small;
        return taskInfo;
    }
    tasks.getDefaultSizeIfNotProvided = getDefaultSizeIfNotProvided;
})(tasks || (tasks = {}));

;// ./src/public/liveShareHost.ts





/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const interactiveTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * APIs involving Live Share, a framework for building real-time collaborative apps.
 * For more information, visit https://aka.ms/teamsliveshare
 *
 * @see LiveShareHost
 */
var liveShare;
(function (liveShare) {
    /**
     * @hidden
     * The meeting roles of a user.
     * Used in Live Share for its role verification feature.
     * For more information, visit https://learn.microsoft.com/microsoftteams/platform/apps-in-teams-meetings/teams-live-share-capabilities?tabs=javascript#role-verification-for-live-data-structures
     */
    let UserMeetingRole;
    (function (UserMeetingRole) {
        /**
         * Guest role.
         */
        UserMeetingRole["guest"] = "Guest";
        /**
         * Attendee role.
         */
        UserMeetingRole["attendee"] = "Attendee";
        /**
         * Presenter role.
         */
        UserMeetingRole["presenter"] = "Presenter";
        /**
         * Organizer role.
         */
        UserMeetingRole["organizer"] = "Organizer";
    })(UserMeetingRole = liveShare.UserMeetingRole || (liveShare.UserMeetingRole = {}));
    /**
     * @hidden
     * State of the current Live Share session's Fluid container.
     * This is used internally by the `LiveShareClient` when joining a Live Share session.
     */
    let ContainerState;
    (function (ContainerState) {
        /**
         * The call to `LiveShareHost.setContainerId()` successfully created the container mapping
         * for the current Live Share session.
         */
        ContainerState["added"] = "Added";
        /**
         * A container mapping for the current Live Share session already exists.
         * This indicates to Live Share that a new container does not need be created.
         */
        ContainerState["alreadyExists"] = "AlreadyExists";
        /**
         * The call to `LiveShareHost.setContainerId()` failed to create the container mapping.
         * This happens when another client has already set the container ID for the session.
         */
        ContainerState["conflict"] = "Conflict";
        /**
         * A container mapping for the current Live Share session does not yet exist.
         * This indicates to Live Share that a new container should be created.
         */
        ContainerState["notFound"] = "NotFound";
    })(ContainerState = liveShare.ContainerState || (liveShare.ContainerState = {}));
    /**
     * Checks if the interactive capability is supported by the host
     * @returns boolean to represent whether the interactive capability is supported
     *
     * @throws Error if {@linkcode app.initialize} has not successfully completed
     */
    function isSupported() {
        return ensureInitialized(runtime, FrameContexts.meetingStage, FrameContexts.sidePanel, FrameContexts.content) &&
            runtime.supports.interactive
            ? true
            : false;
    }
    liveShare.isSupported = isSupported;
})(liveShare || (liveShare = {}));
/**
 * Live Share host implementation for connecting to real-time collaborative sessions.
 * Designed for use with the `LiveShareClient` class in the `@microsoft/live-share` package.
 * Learn more at https://aka.ms/teamsliveshare
 *
 * @remarks
 * The `LiveShareClient` class from Live Share uses the hidden API's to join/manage the session.
 * To create a new `LiveShareHost` instance use the static `LiveShareHost.create()` function.
 */
class LiveShareHost {
    /**
     * @hidden
     * Returns the Fluid Tenant connection info for user's current context.
     */
    getFluidTenantInfo() {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.getFluidTenantInfo" /* ApiName.Interactive_GetFluidTenantInfo */), 'interactive.getFluidTenantInfo'));
        });
    }
    /**
     * @hidden
     * Returns the fluid access token for mapped container Id.
     *
     * @param containerId Fluid's container Id for the request. Undefined for new containers.
     * @returns token for connecting to Fluid's session.
     */
    getFluidToken(containerId) {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.getFluidToken" /* ApiName.Interactive_GetFluidToken */), 'interactive.getFluidToken', 
            // eslint-disable-next-line strict-null-checks/all
            containerId));
        });
    }
    /**
     * @hidden
     * Returns the ID of the fluid container associated with the user's current context.
     */
    getFluidContainerId() {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.getFluidContainerId" /* ApiName.Interactive_GetFluidContainerId */), 'interactive.getFluidContainerId'));
        });
    }
    /**
     * @hidden
     * Sets the ID of the fluid container associated with the current context.
     *
     * @remarks
     * If this returns false, the client should delete the container they created and then call
     * `getFluidContainerId()` to get the ID of the container being used.
     * @param containerId ID of the fluid container the client created.
     * @returns A data structure with a `containerState` indicating the success or failure of the request.
     */
    setFluidContainerId(containerId) {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.setFluidContainerId" /* ApiName.Interactive_SetFluidContainerId */), 'interactive.setFluidContainerId', containerId));
        });
    }
    /**
     * @hidden
     * Returns the shared clock server's current time.
     */
    getNtpTime() {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.getNtpTime" /* ApiName.Interactive_GetNtpTime */), 'interactive.getNtpTime'));
        });
    }
    /**
     * @hidden
     * Associates the fluid client ID with a set of user roles.
     *
     * @param clientId The ID for the current user's Fluid client. Changes on reconnects.
     * @returns The roles for the current user.
     */
    registerClientId(clientId) {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.registerClientId" /* ApiName.Interactive_RegisterClientId */), 'interactive.registerClientId', clientId));
        });
    }
    /**
     * @hidden
     * Returns the roles associated with a client ID.
     *
     * @param clientId The Client ID the message was received from.
     * @returns The roles for a given client. Returns `undefined` if the client ID hasn't been registered yet.
     */
    getClientRoles(clientId) {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.getClientRoles" /* ApiName.Interactive_GetClientRoles */), 'interactive.getClientRoles', clientId));
        });
    }
    /**
     * @hidden
     * Returns the `IClientInfo` associated with a client ID.
     *
     * @param clientId The Client ID the message was received from.
     * @returns The info for a given client. Returns `undefined` if the client ID hasn't been registered yet.
     */
    getClientInfo(clientId) {
        ensureSupported();
        return new Promise((resolve) => {
            resolve(sendAndHandleSdkError(getApiVersionTag(interactiveTelemetryVersionNumber, "interactive.getClientInfo" /* ApiName.Interactive_GetClientInfo */), 'interactive.getClientInfo', clientId));
        });
    }
    /**
     * Factories a new `LiveShareHost` instance for use with the `LiveShareClient` class
     * in the `@microsoft/live-share` package.
     *
     * @remarks
     * `app.initialize()` must first be called before using this API.
     * This API can only be called from `meetingStage` or `sidePanel` contexts.
     */
    static create() {
        ensureSupported();
        return new LiveShareHost();
    }
}
function ensureSupported() {
    if (!liveShare.isSupported()) {
        throw new Error('LiveShareHost Not supported');
    }
}

;// ./src/internal/marketplaceUtils.ts
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
var marketplaceUtils_rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};

function marketplaceUtils_isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
/**
 * @hidden
 * deserialize the cart data:
 * - convert url properties from string to URL
 * @param cartItems The cart items
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function deserializeCart(cartData) {
    try {
        cartData.cartItems = deserializeCartItems(cartData.cartItems);
        return cartData;
    }
    catch (e) {
        throw new Error('Error deserializing cart');
    }
}
/**
 * @hidden
 * deserialize the cart items:
 * - convert url properties from string to URL
 * @param cartItems The cart items
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function deserializeCartItems(cartItemsData) {
    return cartItemsData.map((cartItem) => {
        if (cartItem.imageURL) {
            const url = new URL(cartItem.imageURL);
            cartItem.imageURL = url;
        }
        if (cartItem.accessories) {
            cartItem.accessories = deserializeCartItems(cartItem.accessories);
        }
        return cartItem;
    });
}
/**
 * @hidden
 * serialize the cart items:
 * - make URL properties to string
 * @param cartItems The cart items
 *
 * @internal
 * Limited to Microsoft-internal use
 */
const serializeCartItems = (cartItems) => {
    try {
        return cartItems.map((cartItem) => {
            const { imageURL, accessories } = cartItem, rest = marketplaceUtils_rest(cartItem, ["imageURL", "accessories"]);
            const cartItemsData = Object.assign({}, rest);
            if (imageURL) {
                cartItemsData.imageURL = imageURL.href;
            }
            if (accessories) {
                cartItemsData.accessories = serializeCartItems(accessories);
            }
            return cartItemsData;
        });
    }
    catch (e) {
        throw new Error('Error serializing cart items');
    }
};
/**
 * @hidden
 * Validate the cart item properties are valid
 * @param cartItems The cart items
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateCartItems(cartItems) {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
        throw new Error('cartItems must be a non-empty array');
    }
    for (const cartItem of cartItems) {
        validateBasicCartItem(cartItem);
        validateAccessoryItems(cartItem.accessories);
    }
}
/**
 * @hidden
 * Validate accessories
 * @param accessoryItems The accessories to be validated
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateAccessoryItems(accessoryItems) {
    if (accessoryItems === null || accessoryItems === undefined) {
        return;
    }
    if (!Array.isArray(accessoryItems) || accessoryItems.length === 0) {
        throw new Error('CartItem.accessories must be a non-empty array');
    }
    for (const accessoryItem of accessoryItems) {
        if (accessoryItem['accessories']) {
            throw new Error('Item in CartItem.accessories cannot have accessories');
        }
        validateBasicCartItem(accessoryItem);
    }
}
/**
 * @hidden
 * Validate the basic cart item properties are valid
 * @param basicCartItem The basic cart item
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateBasicCartItem(basicCartItem) {
    if (!basicCartItem.id) {
        throw new Error('cartItem.id must not be empty');
    }
    if (!basicCartItem.name) {
        throw new Error('cartItem.name must not be empty');
    }
    validatePrice(basicCartItem.price);
    validateQuantity(basicCartItem.quantity);
}
/**
 * @hidden
 * Validate the id is valid
 * @param id A uuid string
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function marketplaceUtils_validateUuid(id) {
    if (id === undefined || id === null) {
        return;
    }
    if (!id) {
        throw new Error('id must not be empty');
    }
    if (marketplaceUtils_isValidUUID(id) === false) {
        throw new Error('id must be a valid UUID');
    }
}
/**
 * @hidden
 * Validate the cart item properties are valid
 * @param price The price to be validated
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validatePrice(price) {
    if (typeof price !== 'number' || price < 0) {
        throw new Error(`price ${price} must be a number not less than 0`);
    }
    if (parseFloat(price.toFixed(3)) !== price) {
        throw new Error(`price ${price} must have at most 3 decimal places`);
    }
}
/**
 * @hidden
 * Validate quantity
 * @param quantity The quantity to be validated
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateQuantity(quantity) {
    if (typeof quantity !== 'number' || quantity <= 0 || parseInt(quantity.toString()) !== quantity) {
        throw new Error(`quantity ${quantity} must be an integer greater than 0`);
    }
}
/**
 * @hidden
 * Validate cart status
 * @param cartStatus The cartStatus to be validated
 *
 * @internal
 * Limited to Microsoft-internal use
 */
function validateCartStatus(cartStatus) {
    if (!Object.values(marketplace.CartStatus).includes(cartStatus)) {
        throw new Error(`cartStatus ${cartStatus} is not valid`);
    }
}

;// ./src/public/marketplace.ts






/**
 * v2 APIs telemetry file: All of APIs in this capability file should send out API version v2 ONLY
 */
const marketplaceTelemetryVersionNumber = "v2" /* ApiVersionNumber.V_2 */;
/**
 * @hidden
 * Namespace for an app to support a checkout flow by interacting with the marketplace cart in the host.
 * @beta
 */
var marketplace;
(function (marketplace) {
    /**
     * @hidden
     * the version of the current cart interface
     * which is forced to send to the host in the calls.
     * @internal
     * Limited to Microsoft-internal use
     * @beta
     */
    marketplace.cartVersion = {
        /**
         * @hidden
         * Represents the major version of the current cart interface,
         * it is increased when incompatible interface update happens.
         */
        majorVersion: 1,
        /**
         * @hidden
         * The minor version of the current cart interface, which is compatible
         * with the previous minor version in the same major version.
         */
        minorVersion: 1,
    };
    /**
     * @hidden
     * Represents the persona creating the cart.
     * @beta
     */
    let Intent;
    (function (Intent) {
        /**
         * @hidden
         * The cart is created by admin of an organization in Teams Admin Center.
         */
        Intent["TACAdminUser"] = "TACAdminUser";
        /**
         * @hidden
         * The cart is created by admin of an organization in Teams.
         */
        Intent["TeamsAdminUser"] = "TeamsAdminUser";
        /**
         * @hidden
         * The cart is created by end user of an organization in Teams.
         */
        Intent["TeamsEndUser"] = "TeamsEndUser";
    })(Intent = marketplace.Intent || (marketplace.Intent = {}));
    /**
     * @hidden
     * Represents the status of the cart.
     * @beta
     */
    let CartStatus;
    (function (CartStatus) {
        /**
         * @hidden
         * Cart is created but not checked out yet.
         */
        CartStatus["Open"] = "Open";
        /**
         * @hidden
         * Cart is checked out but not completed yet.
         */
        CartStatus["Processing"] = "Processing";
        /**
         * @hidden
         * Indicate checking out is completed and the host should
         * return a new cart in the next getCart call.
         */
        CartStatus["Processed"] = "Processed";
        /**
         * @hidden
         * Indicate checking out process is manually cancelled by the user
         */
        CartStatus["Closed"] = "Closed";
        /**
         * @hidden
         * Indicate checking out is failed and the host should
         * return a new cart in the next getCart call.
         */
        CartStatus["Error"] = "Error";
    })(CartStatus = marketplace.CartStatus || (marketplace.CartStatus = {}));
    /**
     * @hidden
     * Get the cart object owned by the host to checkout.
     * @returns A promise of the cart object in the cartVersion.
     * @beta
     */
    function getCart() {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        return sendAndHandleSdkError(getApiVersionTag(marketplaceTelemetryVersionNumber, "marketplace.getCart" /* ApiName.Marketplace_GetCart */), 'marketplace.getCart', marketplace.cartVersion).then(deserializeCart);
    }
    marketplace.getCart = getCart;
    /**
     * @hidden
     * Add or update cart items in the cart owned by the host.
     * @param addOrUpdateCartItemsParams Represents the parameters to update the cart items.
     * @returns A promise of the updated cart object in the cartVersion.
     * @beta
     */
    function addOrUpdateCartItems(addOrUpdateCartItemsParams) {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!addOrUpdateCartItemsParams) {
            throw new Error('addOrUpdateCartItemsParams must be provided');
        }
        marketplaceUtils_validateUuid(addOrUpdateCartItemsParams === null || addOrUpdateCartItemsParams === void 0 ? void 0 : addOrUpdateCartItemsParams.cartId);
        validateCartItems(addOrUpdateCartItemsParams === null || addOrUpdateCartItemsParams === void 0 ? void 0 : addOrUpdateCartItemsParams.cartItems);
        return sendAndHandleSdkError(getApiVersionTag(marketplaceTelemetryVersionNumber, "marketplace.addOrUpdateCartItems" /* ApiName.Marketplace_AddOrUpdateCartItems */), 'marketplace.addOrUpdateCartItems', Object.assign(Object.assign({}, addOrUpdateCartItemsParams), { cartItems: serializeCartItems(addOrUpdateCartItemsParams.cartItems), cartVersion: marketplace.cartVersion })).then(deserializeCart);
    }
    marketplace.addOrUpdateCartItems = addOrUpdateCartItems;
    /**
     * @hidden
     * Remove cart items from the cart owned by the host.
     * @param removeCartItemsParams The parameters to remove the cart items.
     * @returns A promise of the updated cart object in the cartVersion.
     * @beta
     */
    function removeCartItems(removeCartItemsParams) {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!removeCartItemsParams) {
            throw new Error('removeCartItemsParams must be provided');
        }
        marketplaceUtils_validateUuid(removeCartItemsParams === null || removeCartItemsParams === void 0 ? void 0 : removeCartItemsParams.cartId);
        if (!Array.isArray(removeCartItemsParams === null || removeCartItemsParams === void 0 ? void 0 : removeCartItemsParams.cartItemIds) || (removeCartItemsParams === null || removeCartItemsParams === void 0 ? void 0 : removeCartItemsParams.cartItemIds.length) === 0) {
            throw new Error('cartItemIds must be a non-empty array');
        }
        return sendAndHandleSdkError(getApiVersionTag(marketplaceTelemetryVersionNumber, "marketplace.removeCartItems" /* ApiName.Marketplace_RemoveCardItems */), 'marketplace.removeCartItems', Object.assign(Object.assign({}, removeCartItemsParams), { cartVersion: marketplace.cartVersion })).then(deserializeCart);
    }
    marketplace.removeCartItems = removeCartItems;
    /**
     * @hidden
     * Update cart status in the cart owned by the host.
     * @param updateCartStatusParams The parameters to update the cart status.
     * @returns A promise of the updated cart object in the cartVersion.
     * @beta
     */
    function updateCartStatus(updateCartStatusParams) {
        ensureInitialized(runtime, FrameContexts.content, FrameContexts.task);
        if (!isSupported()) {
            throw errorNotSupportedOnPlatform;
        }
        if (!updateCartStatusParams) {
            throw new Error('updateCartStatusParams must be provided');
        }
        marketplaceUtils_validateUuid(updateCartStatusParams === null || updateCartStatusParams === void 0 ? void 0 : updateCartStatusParams.cartId);
        validateCartStatus(updateCartStatusParams === null || updateCartStatusParams === void 0 ? void 0 : updateCartStatusParams.cartStatus);
        return sendAndHandleSdkError(getApiVersionTag(marketplaceTelemetryVersionNumber, "marketplace.updateCartStatus" /* ApiName.Marketplace_UpdateCartStatus */), 'marketplace.updateCartStatus', Object.assign(Object.assign({}, updateCartStatusParams), { cartVersion: marketplace.cartVersion })).then(deserializeCart);
    }
    marketplace.updateCartStatus = updateCartStatus;
    /**
     * @hidden
     * Checks if the marketplace capability is supported by the host.
     * @returns Boolean to represent whether the marketplace capability is supported.
     * @throws Error if {@linkcode app.initialize} has not successfully completed.
     * @beta
     */
    function isSupported() {
        return ensureInitialized(runtime) && runtime.supports.marketplace ? true : false;
    }
    marketplace.isSupported = isSupported;
})(marketplace || (marketplace = {}));

;// ./src/public/index.ts












































;// ./src/index.ts



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=MicrosoftTeams.js.map