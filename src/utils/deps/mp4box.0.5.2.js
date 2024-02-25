'use client'

/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/mp4box@0.5.2/dist/mp4box.all.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
// prettier-ignore
var t={};
!(function (t) {
  var e,
    i,
    s =
      ((e = new Date()),
      (i = 4),
      {
        setLogLevel: function (t) {
          i =
            t == this.debug
              ? 1
              : t == this.info
                ? 2
                : t == this.warn
                  ? 3
                  : (this.error, 4)
        },
        debug: function (t, r) {
          void 0 === console.debug && (console.debug = console.log),
            1 >= i &&
              console.debug(
                '[' + s.getDurationString(new Date() - e, 1e3) + ']',
                '[' + t + ']',
                r
              )
        },
        log: function (t, e) {
          this.debug(t.msg)
        },
        info: function (t, r) {
          2 >= i &&
            console.info(
              '[' + s.getDurationString(new Date() - e, 1e3) + ']',
              '[' + t + ']',
              r
            )
        },
        warn: function (t, r) {
          3 >= i &&
            console.warn(
              '[' + s.getDurationString(new Date() - e, 1e3) + ']',
              '[' + t + ']',
              r
            )
        },
        error: function (t, r) {
          4 >= i &&
            console.error(
              '[' + s.getDurationString(new Date() - e, 1e3) + ']',
              '[' + t + ']',
              r
            )
        }
      })
  ;(s.getDurationString = function (t, e) {
    var i
    function s(t, e) {
      for (var i = ('' + t).split('.'); i[0].length < e; ) i[0] = '0' + i[0]
      return i.join('.')
    }
    t < 0 ? ((i = !0), (t = -t)) : (i = !1)
    var r = t / (e || 1),
      n = Math.floor(r / 3600)
    r -= 3600 * n
    var a = Math.floor(r / 60),
      o = 1e3 * (r -= 60 * a)
    return (
      (o -= 1e3 * (r = Math.floor(r))),
      (o = Math.floor(o)),
      (i ? '-' : '') + n + ':' + s(a, 2) + ':' + s(r, 2) + '.' + s(o, 3)
    )
  }),
    (s.printRanges = function (t) {
      var e = t.length
      if (e > 0) {
        for (var i = '', r = 0; r < e; r++)
          r > 0 && (i += ','),
            (i +=
              '[' +
              s.getDurationString(t.start(r)) +
              ',' +
              s.getDurationString(t.end(r)) +
              ']')
        return i
      }
      return '(empty)'
    }),
    (t.Log = s)
  var r = function (t) {
    if (!(t instanceof ArrayBuffer)) throw 'Needs an array buffer'
    ;(this.buffer = t), (this.dataview = new DataView(t)), (this.position = 0)
  }
  ;(r.prototype.getPosition = function () {
    return this.position
  }),
    (r.prototype.getEndPosition = function () {
      return this.buffer.byteLength
    }),
    (r.prototype.getLength = function () {
      return this.buffer.byteLength
    }),
    (r.prototype.seek = function (t) {
      var e = Math.max(0, Math.min(this.buffer.byteLength, t))
      return (this.position = isNaN(e) || !isFinite(e) ? 0 : e), !0
    }),
    (r.prototype.isEos = function () {
      return this.getPosition() >= this.getEndPosition()
    }),
    (r.prototype.readAnyInt = function (t, e) {
      var i = 0
      if (this.position + t <= this.buffer.byteLength) {
        switch (t) {
          case 1:
            i = e
              ? this.dataview.getInt8(this.position)
              : this.dataview.getUint8(this.position)
            break
          case 2:
            i = e
              ? this.dataview.getInt16(this.position)
              : this.dataview.getUint16(this.position)
            break
          case 3:
            if (e) throw 'No method for reading signed 24 bits values'
            ;(i = this.dataview.getUint8(this.position) << 16),
              (i |= this.dataview.getUint8(this.position + 1) << 8),
              (i |= this.dataview.getUint8(this.position + 2))
            break
          case 4:
            i = e
              ? this.dataview.getInt32(this.position)
              : this.dataview.getUint32(this.position)
            break
          case 8:
            if (e) throw 'No method for reading signed 64 bits values'
            ;(i = this.dataview.getUint32(this.position) << 32),
              (i |= this.dataview.getUint32(this.position + 4))
            break
          default:
            throw 'readInt method not implemented for size: ' + t
        }
        return (this.position += t), i
      }
      throw 'Not enough bytes in buffer'
    }),
    (r.prototype.readUint8 = function () {
      return this.readAnyInt(1, !1)
    }),
    (r.prototype.readUint16 = function () {
      return this.readAnyInt(2, !1)
    }),
    (r.prototype.readUint24 = function () {
      return this.readAnyInt(3, !1)
    }),
    (r.prototype.readUint32 = function () {
      return this.readAnyInt(4, !1)
    }),
    (r.prototype.readUint64 = function () {
      return this.readAnyInt(8, !1)
    }),
    (r.prototype.readString = function (t) {
      if (this.position + t <= this.buffer.byteLength) {
        for (var e = '', i = 0; i < t; i++)
          e += String.fromCharCode(this.readUint8())
        return e
      }
      throw 'Not enough bytes in buffer'
    }),
    (r.prototype.readCString = function () {
      for (var t = []; ; ) {
        var e = this.readUint8()
        if (0 === e) break
        t.push(e)
      }
      return String.fromCharCode.apply(null, t)
    }),
    (r.prototype.readInt8 = function () {
      return this.readAnyInt(1, !0)
    }),
    (r.prototype.readInt16 = function () {
      return this.readAnyInt(2, !0)
    }),
    (r.prototype.readInt32 = function () {
      return this.readAnyInt(4, !0)
    }),
    (r.prototype.readInt64 = function () {
      return this.readAnyInt(8, !1)
    }),
    (r.prototype.readUint8Array = function (t) {
      for (var e = new Uint8Array(t), i = 0; i < t; i++) e[i] = this.readUint8()
      return e
    }),
    (r.prototype.readInt16Array = function (t) {
      for (var e = new Int16Array(t), i = 0; i < t; i++) e[i] = this.readInt16()
      return e
    }),
    (r.prototype.readUint16Array = function (t) {
      for (var e = new Int16Array(t), i = 0; i < t; i++)
        e[i] = this.readUint16()
      return e
    }),
    (r.prototype.readUint32Array = function (t) {
      for (var e = new Uint32Array(t), i = 0; i < t; i++)
        e[i] = this.readUint32()
      return e
    }),
    (r.prototype.readInt32Array = function (t) {
      for (var e = new Int32Array(t), i = 0; i < t; i++) e[i] = this.readInt32()
      return e
    }),
    (t.MP4BoxStream = r)
  var n = function (t, e, i) {
    ;(this._byteOffset = e || 0),
      t instanceof ArrayBuffer
        ? (this.buffer = t)
        : 'object' == typeof t
          ? ((this.dataView = t), e && (this._byteOffset += e))
          : (this.buffer = new ArrayBuffer(t || 0)),
      (this.position = 0),
      (this.endianness = null == i ? n.LITTLE_ENDIAN : i)
  }
  ;(n.prototype = {}),
    (n.prototype.getPosition = function () {
      return this.position
    }),
    (n.prototype._realloc = function (t) {
      if (this._dynamicSize) {
        var e = this._byteOffset + this.position + t,
          i = this._buffer.byteLength
        if (e <= i) e > this._byteLength && (this._byteLength = e)
        else {
          for (i < 1 && (i = 1); e > i; ) i *= 2
          var s = new ArrayBuffer(i),
            r = new Uint8Array(this._buffer)
          new Uint8Array(s, 0, r.length).set(r),
            (this.buffer = s),
            (this._byteLength = e)
        }
      }
    }),
    (n.prototype._trimAlloc = function () {
      if (this._byteLength != this._buffer.byteLength) {
        var t = new ArrayBuffer(this._byteLength),
          e = new Uint8Array(t),
          i = new Uint8Array(this._buffer, 0, e.length)
        e.set(i), (this.buffer = t)
      }
    }),
    (n.BIG_ENDIAN = !1),
    (n.LITTLE_ENDIAN = !0),
    (n.prototype._byteLength = 0),
    Object.defineProperty(n.prototype, 'byteLength', {
      get: function () {
        return this._byteLength - this._byteOffset
      }
    }),
    Object.defineProperty(n.prototype, 'buffer', {
      get: function () {
        return this._trimAlloc(), this._buffer
      },
      set: function (t) {
        ;(this._buffer = t),
          (this._dataView = new DataView(this._buffer, this._byteOffset)),
          (this._byteLength = this._buffer.byteLength)
      }
    }),
    Object.defineProperty(n.prototype, 'byteOffset', {
      get: function () {
        return this._byteOffset
      },
      set: function (t) {
        ;(this._byteOffset = t),
          (this._dataView = new DataView(this._buffer, this._byteOffset)),
          (this._byteLength = this._buffer.byteLength)
      }
    }),
    Object.defineProperty(n.prototype, 'dataView', {
      get: function () {
        return this._dataView
      },
      set: function (t) {
        ;(this._byteOffset = t.byteOffset),
          (this._buffer = t.buffer),
          (this._dataView = new DataView(this._buffer, this._byteOffset)),
          (this._byteLength = this._byteOffset + t.byteLength)
      }
    }),
    (n.prototype.seek = function (t) {
      var e = Math.max(0, Math.min(this.byteLength, t))
      this.position = isNaN(e) || !isFinite(e) ? 0 : e
    }),
    (n.prototype.isEof = function () {
      return this.position >= this._byteLength
    }),
    (n.prototype.mapUint8Array = function (t) {
      this._realloc(1 * t)
      var e = new Uint8Array(this._buffer, this.byteOffset + this.position, t)
      return (this.position += 1 * t), e
    }),
    (n.prototype.readInt32Array = function (t, e) {
      t = null == t ? this.byteLength - this.position / 4 : t
      var i = new Int32Array(t)
      return (
        n.memcpy(
          i.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * i.BYTES_PER_ELEMENT
        ),
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += i.byteLength),
        i
      )
    }),
    (n.prototype.readInt16Array = function (t, e) {
      t = null == t ? this.byteLength - this.position / 2 : t
      var i = new Int16Array(t)
      return (
        n.memcpy(
          i.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * i.BYTES_PER_ELEMENT
        ),
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += i.byteLength),
        i
      )
    }),
    (n.prototype.readInt8Array = function (t) {
      t = null == t ? this.byteLength - this.position : t
      var e = new Int8Array(t)
      return (
        n.memcpy(
          e.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * e.BYTES_PER_ELEMENT
        ),
        (this.position += e.byteLength),
        e
      )
    }),
    (n.prototype.readUint32Array = function (t, e) {
      t = null == t ? this.byteLength - this.position / 4 : t
      var i = new Uint32Array(t)
      return (
        n.memcpy(
          i.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * i.BYTES_PER_ELEMENT
        ),
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += i.byteLength),
        i
      )
    }),
    (n.prototype.readUint16Array = function (t, e) {
      t = null == t ? this.byteLength - this.position / 2 : t
      var i = new Uint16Array(t)
      return (
        n.memcpy(
          i.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * i.BYTES_PER_ELEMENT
        ),
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += i.byteLength),
        i
      )
    }),
    (n.prototype.readUint8Array = function (t) {
      t = null == t ? this.byteLength - this.position : t
      var e = new Uint8Array(t)
      return (
        n.memcpy(
          e.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * e.BYTES_PER_ELEMENT
        ),
        (this.position += e.byteLength),
        e
      )
    }),
    (n.prototype.readFloat64Array = function (t, e) {
      t = null == t ? this.byteLength - this.position / 8 : t
      var i = new Float64Array(t)
      return (
        n.memcpy(
          i.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * i.BYTES_PER_ELEMENT
        ),
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += i.byteLength),
        i
      )
    }),
    (n.prototype.readFloat32Array = function (t, e) {
      t = null == t ? this.byteLength - this.position / 4 : t
      var i = new Float32Array(t)
      return (
        n.memcpy(
          i.buffer,
          0,
          this.buffer,
          this.byteOffset + this.position,
          t * i.BYTES_PER_ELEMENT
        ),
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += i.byteLength),
        i
      )
    }),
    (n.prototype.readInt32 = function (t) {
      var e = this._dataView.getInt32(
        this.position,
        null == t ? this.endianness : t
      )
      return (this.position += 4), e
    }),
    (n.prototype.readInt16 = function (t) {
      var e = this._dataView.getInt16(
        this.position,
        null == t ? this.endianness : t
      )
      return (this.position += 2), e
    }),
    (n.prototype.readInt8 = function () {
      var t = this._dataView.getInt8(this.position)
      return (this.position += 1), t
    }),
    (n.prototype.readUint32 = function (t) {
      var e = this._dataView.getUint32(
        this.position,
        null == t ? this.endianness : t
      )
      return (this.position += 4), e
    }),
    (n.prototype.readUint16 = function (t) {
      var e = this._dataView.getUint16(
        this.position,
        null == t ? this.endianness : t
      )
      return (this.position += 2), e
    }),
    (n.prototype.readUint8 = function () {
      var t = this._dataView.getUint8(this.position)
      return (this.position += 1), t
    }),
    (n.prototype.readFloat32 = function (t) {
      var e = this._dataView.getFloat32(
        this.position,
        null == t ? this.endianness : t
      )
      return (this.position += 4), e
    }),
    (n.prototype.readFloat64 = function (t) {
      var e = this._dataView.getFloat64(
        this.position,
        null == t ? this.endianness : t
      )
      return (this.position += 8), e
    }),
    (n.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0),
    (n.memcpy = function (t, e, i, s, r) {
      var n = new Uint8Array(t, e, r),
        a = new Uint8Array(i, s, r)
      n.set(a)
    }),
    (n.arrayToNative = function (t, e) {
      return e == this.endianness ? t : this.flipArrayEndianness(t)
    }),
    (n.nativeToEndian = function (t, e) {
      return this.endianness == e ? t : this.flipArrayEndianness(t)
    }),
    (n.flipArrayEndianness = function (t) {
      for (
        var e = new Uint8Array(t.buffer, t.byteOffset, t.byteLength), i = 0;
        i < t.byteLength;
        i += t.BYTES_PER_ELEMENT
      )
        for (var s = i + t.BYTES_PER_ELEMENT - 1, r = i; s > r; s--, r++) {
          var n = e[r]
          ;(e[r] = e[s]), (e[s] = n)
        }
      return t
    }),
    (n.prototype.failurePosition = 0),
    (String.fromCharCodeUint8 = function (t) {
      for (var e = [], i = 0; i < t.length; i++) e[i] = t[i]
      return String.fromCharCode.apply(null, e)
    }),
    (n.prototype.readString = function (t, e) {
      return null == e || 'ASCII' == e
        ? String.fromCharCodeUint8.apply(null, [
            this.mapUint8Array(null == t ? this.byteLength - this.position : t)
          ])
        : new TextDecoder(e).decode(this.mapUint8Array(t))
    }),
    (n.prototype.readCString = function (t) {
      var e = this.byteLength - this.position,
        i = new Uint8Array(this._buffer, this._byteOffset + this.position),
        s = e
      null != t && (s = Math.min(t, e))
      for (var r = 0; r < s && 0 !== i[r]; r++);
      var n = String.fromCharCodeUint8.apply(null, [this.mapUint8Array(r)])
      return (
        null != t ? (this.position += s - r) : r != e && (this.position += 1), n
      )
    })
  var a = Math.pow(2, 32)
  ;(n.prototype.readInt64 = function () {
    return this.readInt32() * a + this.readUint32()
  }),
    (n.prototype.readUint64 = function () {
      return this.readUint32() * a + this.readUint32()
    }),
    (n.prototype.readInt64 = function () {
      return this.readUint32() * a + this.readUint32()
    }),
    (n.prototype.readUint24 = function () {
      return (
        (this.readUint8() << 16) + (this.readUint8() << 8) + this.readUint8()
      )
    }),
    (t.DataStream = n),
    (n.prototype.save = function (t) {
      var e = new Blob([this.buffer])
      if (!window.URL || !URL.createObjectURL)
        throw "DataStream.save: Can't create object URL."
      var i = window.URL.createObjectURL(e),
        s = document.createElement('a')
      document.body.appendChild(s),
        s.setAttribute('href', i),
        s.setAttribute('download', t),
        s.setAttribute('target', '_self'),
        s.click(),
        window.URL.revokeObjectURL(i)
    }),
    (n.prototype._dynamicSize = !0),
    Object.defineProperty(n.prototype, 'dynamicSize', {
      get: function () {
        return this._dynamicSize
      },
      set: function (t) {
        t || this._trimAlloc(), (this._dynamicSize = t)
      }
    }),
    (n.prototype.shift = function (t) {
      var e = new ArrayBuffer(this._byteLength - t),
        i = new Uint8Array(e),
        s = new Uint8Array(this._buffer, t, i.length)
      i.set(s), (this.buffer = e), (this.position -= t)
    }),
    (n.prototype.writeInt32Array = function (t, e) {
      if (
        (this._realloc(4 * t.length),
        t instanceof Int32Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapInt32Array(t.length, e)
      else for (var i = 0; i < t.length; i++) this.writeInt32(t[i], e)
    }),
    (n.prototype.writeInt16Array = function (t, e) {
      if (
        (this._realloc(2 * t.length),
        t instanceof Int16Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapInt16Array(t.length, e)
      else for (var i = 0; i < t.length; i++) this.writeInt16(t[i], e)
    }),
    (n.prototype.writeInt8Array = function (t) {
      if (
        (this._realloc(1 * t.length),
        t instanceof Int8Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapInt8Array(t.length)
      else for (var e = 0; e < t.length; e++) this.writeInt8(t[e])
    }),
    (n.prototype.writeUint32Array = function (t, e) {
      if (
        (this._realloc(4 * t.length),
        t instanceof Uint32Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapUint32Array(t.length, e)
      else for (var i = 0; i < t.length; i++) this.writeUint32(t[i], e)
    }),
    (n.prototype.writeUint16Array = function (t, e) {
      if (
        (this._realloc(2 * t.length),
        t instanceof Uint16Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapUint16Array(t.length, e)
      else for (var i = 0; i < t.length; i++) this.writeUint16(t[i], e)
    }),
    (n.prototype.writeUint8Array = function (t) {
      if (
        (this._realloc(1 * t.length),
        t instanceof Uint8Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapUint8Array(t.length)
      else for (var e = 0; e < t.length; e++) this.writeUint8(t[e])
    }),
    (n.prototype.writeFloat64Array = function (t, e) {
      if (
        (this._realloc(8 * t.length),
        t instanceof Float64Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapFloat64Array(t.length, e)
      else for (var i = 0; i < t.length; i++) this.writeFloat64(t[i], e)
    }),
    (n.prototype.writeFloat32Array = function (t, e) {
      if (
        (this._realloc(4 * t.length),
        t instanceof Float32Array &&
          this.byteOffset + (this.position % t.BYTES_PER_ELEMENT) === 0)
      )
        n.memcpy(
          this._buffer,
          this.byteOffset + this.position,
          t.buffer,
          0,
          t.byteLength
        ),
          this.mapFloat32Array(t.length, e)
      else for (var i = 0; i < t.length; i++) this.writeFloat32(t[i], e)
    }),
    (n.prototype.writeInt32 = function (t, e) {
      this._realloc(4),
        this._dataView.setInt32(
          this.position,
          t,
          null == e ? this.endianness : e
        ),
        (this.position += 4)
    }),
    (n.prototype.writeInt16 = function (t, e) {
      this._realloc(2),
        this._dataView.setInt16(
          this.position,
          t,
          null == e ? this.endianness : e
        ),
        (this.position += 2)
    }),
    (n.prototype.writeInt8 = function (t) {
      this._realloc(1),
        this._dataView.setInt8(this.position, t),
        (this.position += 1)
    }),
    (n.prototype.writeUint32 = function (t, e) {
      this._realloc(4),
        this._dataView.setUint32(
          this.position,
          t,
          null == e ? this.endianness : e
        ),
        (this.position += 4)
    }),
    (n.prototype.writeUint16 = function (t, e) {
      this._realloc(2),
        this._dataView.setUint16(
          this.position,
          t,
          null == e ? this.endianness : e
        ),
        (this.position += 2)
    }),
    (n.prototype.writeUint8 = function (t) {
      this._realloc(1),
        this._dataView.setUint8(this.position, t),
        (this.position += 1)
    }),
    (n.prototype.writeFloat32 = function (t, e) {
      this._realloc(4),
        this._dataView.setFloat32(
          this.position,
          t,
          null == e ? this.endianness : e
        ),
        (this.position += 4)
    }),
    (n.prototype.writeFloat64 = function (t, e) {
      this._realloc(8),
        this._dataView.setFloat64(
          this.position,
          t,
          null == e ? this.endianness : e
        ),
        (this.position += 8)
    }),
    (n.prototype.writeUCS2String = function (t, e, i) {
      null == i && (i = t.length)
      for (var s = 0; s < t.length && s < i; s++)
        this.writeUint16(t.charCodeAt(s), e)
      for (; s < i; s++) this.writeUint16(0)
    }),
    (n.prototype.writeString = function (t, e, i) {
      var s = 0
      if (null == e || 'ASCII' == e)
        if (null != i) {
          var r = Math.min(t.length, i)
          for (s = 0; s < r; s++) this.writeUint8(t.charCodeAt(s))
          for (; s < i; s++) this.writeUint8(0)
        } else for (s = 0; s < t.length; s++) this.writeUint8(t.charCodeAt(s))
      else this.writeUint8Array(new TextEncoder(e).encode(t.substring(0, i)))
    }),
    (n.prototype.writeCString = function (t, e) {
      var i = 0
      if (null != e) {
        var s = Math.min(t.length, e)
        for (i = 0; i < s; i++) this.writeUint8(t.charCodeAt(i))
        for (; i < e; i++) this.writeUint8(0)
      } else {
        for (i = 0; i < t.length; i++) this.writeUint8(t.charCodeAt(i))
        this.writeUint8(0)
      }
    }),
    (n.prototype.writeStruct = function (t, e) {
      for (var i = 0; i < t.length; i += 2) {
        var s = t[i + 1]
        this.writeType(s, e[t[i]], e)
      }
    }),
    (n.prototype.writeType = function (t, e, i) {
      var s
      if ('function' == typeof t) return t(this, e)
      if ('object' == typeof t && !(t instanceof Array))
        return t.set(this, e, i)
      var r = null,
        a = 'ASCII',
        o = this.position
      switch (
        ('string' == typeof t &&
          /:/.test(t) &&
          ((s = t.split(':')), (t = s[0]), (r = parseInt(s[1]))),
        'string' == typeof t &&
          /,/.test(t) &&
          ((s = t.split(',')), (t = s[0]), (a = parseInt(s[1]))),
        t)
      ) {
        case 'uint8':
          this.writeUint8(e)
          break
        case 'int8':
          this.writeInt8(e)
          break
        case 'uint16':
          this.writeUint16(e, this.endianness)
          break
        case 'int16':
          this.writeInt16(e, this.endianness)
          break
        case 'uint32':
          this.writeUint32(e, this.endianness)
          break
        case 'int32':
          this.writeInt32(e, this.endianness)
          break
        case 'float32':
          this.writeFloat32(e, this.endianness)
          break
        case 'float64':
          this.writeFloat64(e, this.endianness)
          break
        case 'uint16be':
          this.writeUint16(e, n.BIG_ENDIAN)
          break
        case 'int16be':
          this.writeInt16(e, n.BIG_ENDIAN)
          break
        case 'uint32be':
          this.writeUint32(e, n.BIG_ENDIAN)
          break
        case 'int32be':
          this.writeInt32(e, n.BIG_ENDIAN)
          break
        case 'float32be':
          this.writeFloat32(e, n.BIG_ENDIAN)
          break
        case 'float64be':
          this.writeFloat64(e, n.BIG_ENDIAN)
          break
        case 'uint16le':
          this.writeUint16(e, n.LITTLE_ENDIAN)
          break
        case 'int16le':
          this.writeInt16(e, n.LITTLE_ENDIAN)
          break
        case 'uint32le':
          this.writeUint32(e, n.LITTLE_ENDIAN)
          break
        case 'int32le':
          this.writeInt32(e, n.LITTLE_ENDIAN)
          break
        case 'float32le':
          this.writeFloat32(e, n.LITTLE_ENDIAN)
          break
        case 'float64le':
          this.writeFloat64(e, n.LITTLE_ENDIAN)
          break
        case 'cstring':
          this.writeCString(e, r)
          break
        case 'string':
          this.writeString(e, a, r)
          break
        case 'u16string':
          this.writeUCS2String(e, this.endianness, r)
          break
        case 'u16stringle':
          this.writeUCS2String(e, n.LITTLE_ENDIAN, r)
          break
        case 'u16stringbe':
          this.writeUCS2String(e, n.BIG_ENDIAN, r)
          break
        default:
          if (3 == t.length) {
            for (var h = t[1], d = 0; d < e.length; d++) this.writeType(h, e[d])
            break
          }
          this.writeStruct(t, e)
      }
      null != r &&
        ((this.position = o), this._realloc(r), (this.position = o + r))
    }),
    (n.prototype.writeUint64 = function (t) {
      var e = Math.floor(t / a)
      this.writeUint32(e), this.writeUint32(4294967295 & t)
    }),
    (n.prototype.writeUint24 = function (t) {
      this.writeUint8((16711680 & t) >> 16),
        this.writeUint8((65280 & t) >> 8),
        this.writeUint8(255 & t)
    }),
    (n.prototype.adjustUint32 = function (t, e) {
      var i = this.position
      this.seek(t), this.writeUint32(e), this.seek(i)
    }),
    (n.prototype.mapInt32Array = function (t, e) {
      this._realloc(4 * t)
      var i = new Int32Array(this._buffer, this.byteOffset + this.position, t)
      return (
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += 4 * t),
        i
      )
    }),
    (n.prototype.mapInt16Array = function (t, e) {
      this._realloc(2 * t)
      var i = new Int16Array(this._buffer, this.byteOffset + this.position, t)
      return (
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += 2 * t),
        i
      )
    }),
    (n.prototype.mapInt8Array = function (t) {
      this._realloc(1 * t)
      var e = new Int8Array(this._buffer, this.byteOffset + this.position, t)
      return (this.position += 1 * t), e
    }),
    (n.prototype.mapUint32Array = function (t, e) {
      this._realloc(4 * t)
      var i = new Uint32Array(this._buffer, this.byteOffset + this.position, t)
      return (
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += 4 * t),
        i
      )
    }),
    (n.prototype.mapUint16Array = function (t, e) {
      this._realloc(2 * t)
      var i = new Uint16Array(this._buffer, this.byteOffset + this.position, t)
      return (
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += 2 * t),
        i
      )
    }),
    (n.prototype.mapFloat64Array = function (t, e) {
      this._realloc(8 * t)
      var i = new Float64Array(this._buffer, this.byteOffset + this.position, t)
      return (
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += 8 * t),
        i
      )
    }),
    (n.prototype.mapFloat32Array = function (t, e) {
      this._realloc(4 * t)
      var i = new Float32Array(this._buffer, this.byteOffset + this.position, t)
      return (
        n.arrayToNative(i, null == e ? this.endianness : e),
        (this.position += 4 * t),
        i
      )
    })
  var o = function (t) {
    ;(this.buffers = []),
      (this.bufferIndex = -1),
      t && (this.insertBuffer(t), (this.bufferIndex = 0))
  }
  ;((o.prototype = new n(new ArrayBuffer(), 0, n.BIG_ENDIAN)).initialized =
    function () {
      var t
      return (
        this.bufferIndex > -1 ||
        (this.buffers.length > 0
          ? 0 === (t = this.buffers[0]).fileStart
            ? ((this.buffer = t),
              (this.bufferIndex = 0),
              s.debug('MultiBufferStream', 'Stream ready for parsing'),
              !0)
            : (s.warn(
                'MultiBufferStream',
                'The first buffer should have a fileStart of 0'
              ),
              this.logBufferLevel(),
              !1)
          : (s.warn('MultiBufferStream', 'No buffer to start parsing from'),
            this.logBufferLevel(),
            !1))
      )
    }),
    (ArrayBuffer.concat = function (t, e) {
      s.debug(
        'ArrayBuffer',
        'Trying to create a new buffer of size: ' +
          (t.byteLength + e.byteLength)
      )
      var i = new Uint8Array(t.byteLength + e.byteLength)
      return (
        i.set(new Uint8Array(t), 0),
        i.set(new Uint8Array(e), t.byteLength),
        i.buffer
      )
    }),
    (o.prototype.reduceBuffer = function (t, e, i) {
      var s
      return (
        (s = new Uint8Array(i)).set(new Uint8Array(t, e, i)),
        (s.buffer.fileStart = t.fileStart + e),
        (s.buffer.usedBytes = 0),
        s.buffer
      )
    }),
    (o.prototype.insertBuffer = function (t) {
      for (var e = !0, i = 0; i < this.buffers.length; i++) {
        var r = this.buffers[i]
        if (t.fileStart <= r.fileStart) {
          if (t.fileStart === r.fileStart) {
            if (t.byteLength > r.byteLength) {
              this.buffers.splice(i, 1), i--
              continue
            }
            s.warn(
              'MultiBufferStream',
              'Buffer (fileStart: ' +
                t.fileStart +
                ' - Length: ' +
                t.byteLength +
                ') already appended, ignoring'
            )
          } else
            t.fileStart + t.byteLength <= r.fileStart ||
              (t = this.reduceBuffer(t, 0, r.fileStart - t.fileStart)),
              s.debug(
                'MultiBufferStream',
                'Appending new buffer (fileStart: ' +
                  t.fileStart +
                  ' - Length: ' +
                  t.byteLength +
                  ')'
              ),
              this.buffers.splice(i, 0, t),
              0 === i && (this.buffer = t)
          e = !1
          break
        }
        if (t.fileStart < r.fileStart + r.byteLength) {
          var n = r.fileStart + r.byteLength - t.fileStart,
            a = t.byteLength - n
          if (!(a > 0)) {
            e = !1
            break
          }
          t = this.reduceBuffer(t, n, a)
        }
      }
      e &&
        (s.debug(
          'MultiBufferStream',
          'Appending new buffer (fileStart: ' +
            t.fileStart +
            ' - Length: ' +
            t.byteLength +
            ')'
        ),
        this.buffers.push(t),
        0 === i && (this.buffer = t))
    }),
    (o.prototype.logBufferLevel = function (t) {
      var e,
        i,
        r,
        n,
        a,
        o = [],
        h = ''
      for (r = 0, n = 0, e = 0; e < this.buffers.length; e++)
        (i = this.buffers[e]),
          0 === e
            ? ((a = {}),
              o.push(a),
              (a.start = i.fileStart),
              (a.end = i.fileStart + i.byteLength),
              (h += '[' + a.start + '-'))
            : a.end === i.fileStart
              ? (a.end = i.fileStart + i.byteLength)
              : (((a = {}).start = i.fileStart),
                (h += o[o.length - 1].end - 1 + '], [' + a.start + '-'),
                (a.end = i.fileStart + i.byteLength),
                o.push(a)),
          (r += i.usedBytes),
          (n += i.byteLength)
      o.length > 0 && (h += a.end - 1 + ']')
      var d = t ? s.info : s.debug
      0 === this.buffers.length
        ? d('MultiBufferStream', 'No more buffer in memory')
        : d(
            'MultiBufferStream',
            this.buffers.length +
              ' stored buffer(s) (' +
              r +
              '/' +
              n +
              ' bytes), continuous ranges: ' +
              h
          )
    }),
    (o.prototype.cleanBuffers = function () {
      var t, e
      for (t = 0; t < this.buffers.length; t++)
        (e = this.buffers[t]).usedBytes === e.byteLength &&
          (s.debug('MultiBufferStream', 'Removing buffer #' + t),
          this.buffers.splice(t, 1),
          t--)
    }),
    (o.prototype.mergeNextBuffer = function () {
      var t
      if (this.bufferIndex + 1 < this.buffers.length) {
        if (
          (t = this.buffers[this.bufferIndex + 1]).fileStart ===
          this.buffer.fileStart + this.buffer.byteLength
        ) {
          var e = this.buffer.byteLength,
            i = this.buffer.usedBytes,
            r = this.buffer.fileStart
          return (
            (this.buffers[this.bufferIndex] = ArrayBuffer.concat(
              this.buffer,
              t
            )),
            (this.buffer = this.buffers[this.bufferIndex]),
            this.buffers.splice(this.bufferIndex + 1, 1),
            (this.buffer.usedBytes = i),
            (this.buffer.fileStart = r),
            s.debug(
              'ISOFile',
              'Concatenating buffer for box parsing (length: ' +
                e +
                '->' +
                this.buffer.byteLength +
                ')'
            ),
            !0
          )
        }
        return !1
      }
      return !1
    }),
    (o.prototype.findPosition = function (t, e, i) {
      var r,
        n = null,
        a = -1
      for (
        r = !0 === t ? 0 : this.bufferIndex;
        r < this.buffers.length && (n = this.buffers[r]).fileStart <= e;

      )
        (a = r),
          i &&
            (n.fileStart + n.byteLength <= e
              ? (n.usedBytes = n.byteLength)
              : (n.usedBytes = e - n.fileStart),
            this.logBufferLevel()),
          r++
      return -1 !== a && (n = this.buffers[a]).fileStart + n.byteLength >= e
        ? (s.debug(
            'MultiBufferStream',
            'Found position in existing buffer #' + a
          ),
          a)
        : -1
    }),
    (o.prototype.findEndContiguousBuf = function (t) {
      var e,
        i,
        s,
        r = void 0 !== t ? t : this.bufferIndex
      if (((i = this.buffers[r]), this.buffers.length > r + 1))
        for (
          e = r + 1;
          e < this.buffers.length &&
          (s = this.buffers[e]).fileStart === i.fileStart + i.byteLength;
          e++
        )
          i = s
      return i.fileStart + i.byteLength
    }),
    (o.prototype.getEndFilePositionAfter = function (t) {
      var e = this.findPosition(!0, t, !1)
      return -1 !== e ? this.findEndContiguousBuf(e) : t
    }),
    (o.prototype.addUsedBytes = function (t) {
      ;(this.buffer.usedBytes += t), this.logBufferLevel()
    }),
    (o.prototype.setAllUsedBytes = function () {
      ;(this.buffer.usedBytes = this.buffer.byteLength), this.logBufferLevel()
    }),
    (o.prototype.seek = function (t, e, i) {
      var r
      return -1 !== (r = this.findPosition(e, t, i))
        ? ((this.buffer = this.buffers[r]),
          (this.bufferIndex = r),
          (this.position = t - this.buffer.fileStart),
          s.debug(
            'MultiBufferStream',
            'Repositioning parser at buffer position: ' + this.position
          ),
          !0)
        : (s.debug(
            'MultiBufferStream',
            'Position ' + t + ' not found in buffered data'
          ),
          !1)
    }),
    (o.prototype.getPosition = function () {
      if (-1 === this.bufferIndex || null === this.buffers[this.bufferIndex])
        throw 'Error accessing position in the MultiBufferStream'
      return this.buffers[this.bufferIndex].fileStart + this.position
    }),
    (o.prototype.getLength = function () {
      return this.byteLength
    }),
    (o.prototype.getEndPosition = function () {
      if (-1 === this.bufferIndex || null === this.buffers[this.bufferIndex])
        throw 'Error accessing position in the MultiBufferStream'
      return this.buffers[this.bufferIndex].fileStart + this.byteLength
    }),
    (t.MultiBufferStream = o)
  var h = function () {
    var t = []
    ;(t[3] = 'ES_Descriptor'),
      (t[4] = 'DecoderConfigDescriptor'),
      (t[5] = 'DecoderSpecificInfo'),
      (t[6] = 'SLConfigDescriptor'),
      (this.getDescriptorName = function (e) {
        return t[e]
      })
    var e = this,
      i = {}
    return (
      (this.parseOneDescriptor = function (e) {
        var r,
          n,
          a,
          o = 0
        for (r = e.readUint8(), a = e.readUint8(); 128 & a; )
          (o = (127 & a) << 7), (a = e.readUint8())
        return (
          (o += 127 & a),
          s.debug(
            'MPEG4DescriptorParser',
            'Found ' +
              (t[r] || 'Descriptor ' + r) +
              ', size ' +
              o +
              ' at position ' +
              e.getPosition()
          ),
          (n = t[r] ? new i[t[r]](o) : new i.Descriptor(o)).parse(e),
          n
        )
      }),
      (i.Descriptor = function (t, e) {
        ;(this.tag = t), (this.size = e), (this.descs = [])
      }),
      (i.Descriptor.prototype.parse = function (t) {
        this.data = t.readUint8Array(this.size)
      }),
      (i.Descriptor.prototype.findDescriptor = function (t) {
        for (var e = 0; e < this.descs.length; e++)
          if (this.descs[e].tag == t) return this.descs[e]
        return null
      }),
      (i.Descriptor.prototype.parseRemainingDescriptors = function (t) {
        for (var i = t.position; t.position < i + this.size; ) {
          var s = e.parseOneDescriptor(t)
          this.descs.push(s)
        }
      }),
      (i.ES_Descriptor = function (t) {
        i.Descriptor.call(this, 3, t)
      }),
      (i.ES_Descriptor.prototype = new i.Descriptor()),
      (i.ES_Descriptor.prototype.parse = function (t) {
        if (
          ((this.ES_ID = t.readUint16()),
          (this.flags = t.readUint8()),
          (this.size -= 3),
          128 & this.flags
            ? ((this.dependsOn_ES_ID = t.readUint16()), (this.size -= 2))
            : (this.dependsOn_ES_ID = 0),
          64 & this.flags)
        ) {
          var e = t.readUint8()
          ;(this.URL = t.readString(e)), (this.size -= e + 1)
        } else this.URL = ''
        32 & this.flags
          ? ((this.OCR_ES_ID = t.readUint16()), (this.size -= 2))
          : (this.OCR_ES_ID = 0),
          this.parseRemainingDescriptors(t)
      }),
      (i.ES_Descriptor.prototype.getOTI = function (t) {
        var e = this.findDescriptor(4)
        return e ? e.oti : 0
      }),
      (i.ES_Descriptor.prototype.getAudioConfig = function (t) {
        var e = this.findDescriptor(4)
        if (!e) return null
        var i = e.findDescriptor(5)
        if (i && i.data) {
          var s = (248 & i.data[0]) >> 3
          return (
            31 === s &&
              i.data.length >= 2 &&
              (s = 32 + ((7 & i.data[0]) << 3) + ((224 & i.data[1]) >> 5)),
            s
          )
        }
        return null
      }),
      (i.DecoderConfigDescriptor = function (t) {
        i.Descriptor.call(this, 4, t)
      }),
      (i.DecoderConfigDescriptor.prototype = new i.Descriptor()),
      (i.DecoderConfigDescriptor.prototype.parse = function (t) {
        ;(this.oti = t.readUint8()),
          (this.streamType = t.readUint8()),
          (this.bufferSize = t.readUint24()),
          (this.maxBitrate = t.readUint32()),
          (this.avgBitrate = t.readUint32()),
          (this.size -= 13),
          this.parseRemainingDescriptors(t)
      }),
      (i.DecoderSpecificInfo = function (t) {
        i.Descriptor.call(this, 5, t)
      }),
      (i.DecoderSpecificInfo.prototype = new i.Descriptor()),
      (i.SLConfigDescriptor = function (t) {
        i.Descriptor.call(this, 6, t)
      }),
      (i.SLConfigDescriptor.prototype = new i.Descriptor()),
      this
    )
  }
  t.MPEG4DescriptorParser = h
  var d = {
    ERR_INVALID_DATA: -1,
    ERR_NOT_ENOUGH_DATA: 0,
    OK: 1,
    BASIC_BOXES: ['mdat', 'idat', 'free', 'skip', 'meco', 'strk'],
    FULL_BOXES: ['hmhd', 'nmhd', 'iods', 'xml ', 'bxml', 'ipro', 'mere'],
    CONTAINER_BOXES: [
      ['moov', ['trak', 'pssh']],
      ['trak'],
      ['edts'],
      ['mdia'],
      ['minf'],
      ['dinf'],
      ['stbl', ['sgpd', 'sbgp']],
      ['mvex', ['trex']],
      ['moof', ['traf']],
      ['traf', ['trun', 'sgpd', 'sbgp']],
      ['vttc'],
      ['tref'],
      ['iref'],
      ['mfra', ['tfra']],
      ['meco'],
      ['hnti'],
      ['hinf'],
      ['strk'],
      ['strd'],
      ['sinf'],
      ['rinf'],
      ['schi'],
      ['trgr'],
      ['udta', ['kind']],
      ['iprp', ['ipma']],
      ['ipco']
    ],
    boxCodes: [],
    fullBoxCodes: [],
    containerBoxCodes: [],
    sampleEntryCodes: {},
    sampleGroupEntryCodes: [],
    trackGroupTypes: [],
    UUIDBoxes: {},
    UUIDs: [],
    initialize: function () {
      ;(d.FullBox.prototype = new d.Box()),
        (d.ContainerBox.prototype = new d.Box()),
        (d.SampleEntry.prototype = new d.Box()),
        (d.TrackGroupTypeBox.prototype = new d.FullBox()),
        d.BASIC_BOXES.forEach(function (t) {
          d.createBoxCtor(t)
        }),
        d.FULL_BOXES.forEach(function (t) {
          d.createFullBoxCtor(t)
        }),
        d.CONTAINER_BOXES.forEach(function (t) {
          d.createContainerBoxCtor(t[0], null, t[1])
        })
    },
    Box: function (t, e, i) {
      ;(this.type = t), (this.size = e), (this.uuid = i)
    },
    FullBox: function (t, e, i) {
      d.Box.call(this, t, e, i), (this.flags = 0), (this.version = 0)
    },
    ContainerBox: function (t, e, i) {
      d.Box.call(this, t, e, i), (this.boxes = [])
    },
    SampleEntry: function (t, e, i, s) {
      d.ContainerBox.call(this, t, e), (this.hdr_size = i), (this.start = s)
    },
    SampleGroupEntry: function (t) {
      this.grouping_type = t
    },
    TrackGroupTypeBox: function (t, e) {
      d.FullBox.call(this, t, e)
    },
    createBoxCtor: function (t, e) {
      d.boxCodes.push(t),
        (d[t + 'Box'] = function (e) {
          d.Box.call(this, t, e)
        }),
        (d[t + 'Box'].prototype = new d.Box()),
        e && (d[t + 'Box'].prototype.parse = e)
    },
    createFullBoxCtor: function (t, e) {
      ;(d[t + 'Box'] = function (e) {
        d.FullBox.call(this, t, e)
      }),
        (d[t + 'Box'].prototype = new d.FullBox()),
        (d[t + 'Box'].prototype.parse = function (t) {
          this.parseFullHeader(t), e && e.call(this, t)
        })
    },
    addSubBoxArrays: function (t) {
      if (t) {
        this.subBoxNames = t
        for (var e = t.length, i = 0; i < e; i++) this[t[i] + 's'] = []
      }
    },
    createContainerBoxCtor: function (t, e, i) {
      ;(d[t + 'Box'] = function (e) {
        d.ContainerBox.call(this, t, e), d.addSubBoxArrays.call(this, i)
      }),
        (d[t + 'Box'].prototype = new d.ContainerBox()),
        e && (d[t + 'Box'].prototype.parse = e)
    },
    createMediaSampleEntryCtor: function (t, e, i) {
      ;(d.sampleEntryCodes[t] = []),
        (d[t + 'SampleEntry'] = function (t, e) {
          d.SampleEntry.call(this, t, e), d.addSubBoxArrays.call(this, i)
        }),
        (d[t + 'SampleEntry'].prototype = new d.SampleEntry()),
        e && (d[t + 'SampleEntry'].prototype.parse = e)
    },
    createSampleEntryCtor: function (t, e, i, s) {
      d.sampleEntryCodes[t].push(e),
        (d[e + 'SampleEntry'] = function (i) {
          d[t + 'SampleEntry'].call(this, e, i), d.addSubBoxArrays.call(this, s)
        }),
        (d[e + 'SampleEntry'].prototype = new d[t + 'SampleEntry']()),
        i && (d[e + 'SampleEntry'].prototype.parse = i)
    },
    createEncryptedSampleEntryCtor: function (t, e, i) {
      d.createSampleEntryCtor.call(this, t, e, i, ['sinf'])
    },
    createSampleGroupCtor: function (t, e) {
      ;(d[t + 'SampleGroupEntry'] = function (e) {
        d.SampleGroupEntry.call(this, t, e)
      }),
        (d[t + 'SampleGroupEntry'].prototype = new d.SampleGroupEntry()),
        e && (d[t + 'SampleGroupEntry'].prototype.parse = e)
    },
    createTrackGroupCtor: function (t, e) {
      ;(d[t + 'TrackGroupTypeBox'] = function (e) {
        d.TrackGroupTypeBox.call(this, t, e)
      }),
        (d[t + 'TrackGroupTypeBox'].prototype = new d.TrackGroupTypeBox()),
        e && (d[t + 'TrackGroupTypeBox'].prototype.parse = e)
    },
    createUUIDBox: function (t, e, i, s) {
      d.UUIDs.push(t),
        (d.UUIDBoxes[t] = function (s) {
          e
            ? d.FullBox.call(this, 'uuid', s, t)
            : i
              ? d.ContainerBox.call(this, 'uuid', s, t)
              : d.Box.call(this, 'uuid', s, t)
        }),
        (d.UUIDBoxes[t].prototype = e
          ? new d.FullBox()
          : i
            ? new d.ContainerBox()
            : new d.Box()),
        s &&
          (d.UUIDBoxes[t].prototype.parse = e
            ? function (t) {
                this.parseFullHeader(t), s && s.call(this, t)
              }
            : s)
    }
  }
  d.initialize(),
    (d.TKHD_FLAG_ENABLED = 1),
    (d.TKHD_FLAG_IN_MOVIE = 2),
    (d.TKHD_FLAG_IN_PREVIEW = 4),
    (d.TFHD_FLAG_BASE_DATA_OFFSET = 1),
    (d.TFHD_FLAG_SAMPLE_DESC = 2),
    (d.TFHD_FLAG_SAMPLE_DUR = 8),
    (d.TFHD_FLAG_SAMPLE_SIZE = 16),
    (d.TFHD_FLAG_SAMPLE_FLAGS = 32),
    (d.TFHD_FLAG_DUR_EMPTY = 65536),
    (d.TFHD_FLAG_DEFAULT_BASE_IS_MOOF = 131072),
    (d.TRUN_FLAGS_DATA_OFFSET = 1),
    (d.TRUN_FLAGS_FIRST_FLAG = 4),
    (d.TRUN_FLAGS_DURATION = 256),
    (d.TRUN_FLAGS_SIZE = 512),
    (d.TRUN_FLAGS_FLAGS = 1024),
    (d.TRUN_FLAGS_CTS_OFFSET = 2048),
    (d.Box.prototype.add = function (t) {
      return this.addBox(new d[t + 'Box']())
    }),
    (d.Box.prototype.addBox = function (t) {
      return (
        this.boxes.push(t),
        this[t.type + 's'] ? this[t.type + 's'].push(t) : (this[t.type] = t),
        t
      )
    }),
    (d.Box.prototype.set = function (t, e) {
      return (this[t] = e), this
    }),
    (d.Box.prototype.addEntry = function (t, e) {
      var i = e || 'entries'
      return this[i] || (this[i] = []), this[i].push(t), this
    }),
    (t.BoxParser = d),
    (d.parseUUID = function (t) {
      return d.parseHex16(t)
    }),
    (d.parseHex16 = function (t) {
      for (var e = '', i = 0; i < 16; i++) {
        var s = t.readUint8().toString(16)
        e += 1 === s.length ? '0' + s : s
      }
      return e
    }),
    (d.parseOneBox = function (t, e, i) {
      var r,
        n,
        a,
        o = t.getPosition(),
        h = 0
      if (t.getEndPosition() - o < 8)
        return (
          s.debug(
            'BoxParser',
            'Not enough data in stream to parse the type and size of the box'
          ),
          { code: d.ERR_NOT_ENOUGH_DATA }
        )
      if (i && i < 8)
        return (
          s.debug(
            'BoxParser',
            'Not enough bytes left in the parent box to parse a new box'
          ),
          { code: d.ERR_NOT_ENOUGH_DATA }
        )
      var p = t.readUint32(),
        l = t.readString(4),
        f = l
      if (
        (s.debug(
          'BoxParser',
          "Found box of type '" + l + "' and size " + p + ' at position ' + o
        ),
        (h = 8),
        'uuid' == l)
      ) {
        if (t.getEndPosition() - t.getPosition() < 16 || i - h < 16)
          return (
            t.seek(o),
            s.debug(
              'BoxParser',
              'Not enough bytes left in the parent box to parse a UUID box'
            ),
            { code: d.ERR_NOT_ENOUGH_DATA }
          )
        ;(h += 16), (f = a = d.parseUUID(t))
      }
      if (1 == p) {
        if (t.getEndPosition() - t.getPosition() < 8 || (i && i - h < 8))
          return (
            t.seek(o),
            s.warn(
              'BoxParser',
              'Not enough data in stream to parse the extended size of the "' +
                l +
                '" box'
            ),
            { code: d.ERR_NOT_ENOUGH_DATA }
          )
        ;(p = t.readUint64()), (h += 8)
      } else if (0 === p)
        if (i) p = i
        else if ('mdat' !== l)
          return (
            s.error(
              'BoxParser',
              "Unlimited box size not supported for type: '" + l + "'"
            ),
            (r = new d.Box(l, p)),
            { code: d.OK, box: r, size: r.size }
          )
      return 0 !== p && p < h
        ? (s.error(
            'BoxParser',
            'Box of type ' +
              l +
              ' has an invalid size ' +
              p +
              ' (too small to be a box)'
          ),
          {
            code: d.ERR_NOT_ENOUGH_DATA,
            type: l,
            size: p,
            hdr_size: h,
            start: o
          })
        : 0 !== p && i && p > i
          ? (s.error(
              'BoxParser',
              "Box of type '" +
                l +
                "' has a size " +
                p +
                ' greater than its container size ' +
                i
            ),
            {
              code: d.ERR_NOT_ENOUGH_DATA,
              type: l,
              size: p,
              hdr_size: h,
              start: o
            })
          : 0 !== p && o + p > t.getEndPosition()
            ? (t.seek(o),
              s.info(
                'BoxParser',
                "Not enough data in stream to parse the entire '" + l + "' box"
              ),
              {
                code: d.ERR_NOT_ENOUGH_DATA,
                type: l,
                size: p,
                hdr_size: h,
                start: o
              })
            : e
              ? { code: d.OK, type: l, size: p, hdr_size: h, start: o }
              : (d[l + 'Box']
                  ? (r = new d[l + 'Box'](p))
                  : 'uuid' !== l
                    ? (s.warn('BoxParser', "Unknown box type: '" + l + "'"),
                      ((r = new d.Box(l, p)).has_unparsed_data = !0))
                    : d.UUIDBoxes[a]
                      ? (r = new d.UUIDBoxes[a](p))
                      : (s.warn('BoxParser', "Unknown uuid type: '" + a + "'"),
                        ((r = new d.Box(l, p)).uuid = a),
                        (r.has_unparsed_data = !0)),
                (r.hdr_size = h),
                (r.start = o),
                r.write === d.Box.prototype.write &&
                  'mdat' !== r.type &&
                  (s.info(
                    'BoxParser',
                    "'" +
                      f +
                      "' box writing not yet implemented, keeping unparsed data in memory for later write"
                  ),
                  r.parseDataAndRewind(t)),
                r.parse(t),
                (n = t.getPosition() - (r.start + r.size)) < 0
                  ? (s.warn(
                      'BoxParser',
                      "Parsing of box '" +
                        f +
                        "' did not read the entire indicated box data size (missing " +
                        -n +
                        ' bytes), seeking forward'
                    ),
                    t.seek(r.start + r.size))
                  : n > 0 &&
                    (s.error(
                      'BoxParser',
                      "Parsing of box '" +
                        f +
                        "' read " +
                        n +
                        ' more bytes than the indicated box data size, seeking backwards'
                    ),
                    0 !== r.size && t.seek(r.start + r.size)),
                { code: d.OK, box: r, size: r.size })
    }),
    (d.Box.prototype.parse = function (t) {
      'mdat' != this.type
        ? (this.data = t.readUint8Array(this.size - this.hdr_size))
        : 0 === this.size
          ? t.seek(t.getEndPosition())
          : t.seek(this.start + this.size)
    }),
    (d.Box.prototype.parseDataAndRewind = function (t) {
      ;(this.data = t.readUint8Array(this.size - this.hdr_size)),
        (t.position -= this.size - this.hdr_size)
    }),
    (d.FullBox.prototype.parseDataAndRewind = function (t) {
      this.parseFullHeader(t),
        (this.data = t.readUint8Array(this.size - this.hdr_size)),
        (this.hdr_size -= 4),
        (t.position -= this.size - this.hdr_size)
    }),
    (d.FullBox.prototype.parseFullHeader = function (t) {
      ;(this.version = t.readUint8()),
        (this.flags = t.readUint24()),
        (this.hdr_size += 4)
    }),
    (d.FullBox.prototype.parse = function (t) {
      this.parseFullHeader(t),
        (this.data = t.readUint8Array(this.size - this.hdr_size))
    }),
    (d.ContainerBox.prototype.parse = function (t) {
      for (var e, i; t.getPosition() < this.start + this.size; ) {
        if (
          (e = d.parseOneBox(t, !1, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        if (
          ((i = e.box),
          this.boxes.push(i),
          this.subBoxNames && -1 != this.subBoxNames.indexOf(i.type))
        )
          this[this.subBoxNames[this.subBoxNames.indexOf(i.type)] + 's'].push(i)
        else {
          var r = 'uuid' !== i.type ? i.type : i.uuid
          this[r]
            ? s.warn(
                'Box of type ' + r + ' already stored in field of this type'
              )
            : (this[r] = i)
        }
      }
    }),
    (d.Box.prototype.parseLanguage = function (t) {
      this.language = t.readUint16()
      var e = []
      ;(e[0] = (this.language >> 10) & 31),
        (e[1] = (this.language >> 5) & 31),
        (e[2] = 31 & this.language),
        (this.languageString = String.fromCharCode(
          e[0] + 96,
          e[1] + 96,
          e[2] + 96
        ))
    }),
    (d.SAMPLE_ENTRY_TYPE_VISUAL = 'Visual'),
    (d.SAMPLE_ENTRY_TYPE_AUDIO = 'Audio'),
    (d.SAMPLE_ENTRY_TYPE_HINT = 'Hint'),
    (d.SAMPLE_ENTRY_TYPE_METADATA = 'Metadata'),
    (d.SAMPLE_ENTRY_TYPE_SUBTITLE = 'Subtitle'),
    (d.SAMPLE_ENTRY_TYPE_SYSTEM = 'System'),
    (d.SAMPLE_ENTRY_TYPE_TEXT = 'Text'),
    (d.SampleEntry.prototype.parseHeader = function (t) {
      t.readUint8Array(6),
        (this.data_reference_index = t.readUint16()),
        (this.hdr_size += 8)
    }),
    (d.SampleEntry.prototype.parse = function (t) {
      this.parseHeader(t),
        (this.data = t.readUint8Array(this.size - this.hdr_size))
    }),
    (d.SampleEntry.prototype.parseDataAndRewind = function (t) {
      this.parseHeader(t),
        (this.data = t.readUint8Array(this.size - this.hdr_size)),
        (this.hdr_size -= 8),
        (t.position -= this.size - this.hdr_size)
    }),
    (d.SampleEntry.prototype.parseFooter = function (t) {
      d.ContainerBox.prototype.parse.call(this, t)
    }),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_HINT),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SYSTEM),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_TEXT),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, function (t) {
      var e
      this.parseHeader(t),
        t.readUint16(),
        t.readUint16(),
        t.readUint32Array(3),
        (this.width = t.readUint16()),
        (this.height = t.readUint16()),
        (this.horizresolution = t.readUint32()),
        (this.vertresolution = t.readUint32()),
        t.readUint32(),
        (this.frame_count = t.readUint16()),
        (e = Math.min(31, t.readUint8())),
        (this.compressorname = t.readString(e)),
        e < 31 && t.readString(31 - e),
        (this.depth = t.readUint16()),
        t.readUint16(),
        this.parseFooter(t)
    }),
    d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, function (t) {
      this.parseHeader(t),
        t.readUint32Array(2),
        (this.channel_count = t.readUint16()),
        (this.samplesize = t.readUint16()),
        t.readUint16(),
        t.readUint16(),
        (this.samplerate = t.readUint32() / 65536),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'avc1'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'avc2'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'avc3'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'avc4'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'av01'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'hvc1'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'hev1'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'vvc1'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'vvi1'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'vvs1'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'vvcN'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'vp08'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'vp09'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, 'mp4a'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, 'ac-3'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, 'ec-3'),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, 'Opus'),
    d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, 'encv'),
    d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, 'enca'),
    d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, 'encu'),
    d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SYSTEM, 'encs'),
    d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_TEXT, 'enct'),
    d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, 'encm'),
    d.createBoxCtor('a1lx', function (t) {
      var e = 16 * (1 + (1 & (1 & t.readUint8())))
      this.layer_size = []
      for (var i = 0; i < 3; i++)
        this.layer_size[i] = 16 == e ? t.readUint16() : t.readUint32()
    }),
    d.createBoxCtor('a1op', function (t) {
      this.op_index = t.readUint8()
    }),
    d.createFullBoxCtor('auxC', function (t) {
      this.aux_type = t.readCString()
      var e = this.size - this.hdr_size - (this.aux_type.length + 1)
      this.aux_subtype = t.readUint8Array(e)
    }),
    d.createBoxCtor('av1C', function (t) {
      var e = t.readUint8()
      if ((e >> 7) & !1) s.error('av1C marker problem')
      else if (((this.version = 127 & e), 1 === this.version))
        if (
          ((e = t.readUint8()),
          (this.seq_profile = (e >> 5) & 7),
          (this.seq_level_idx_0 = 31 & e),
          (e = t.readUint8()),
          (this.seq_tier_0 = (e >> 7) & 1),
          (this.high_bitdepth = (e >> 6) & 1),
          (this.twelve_bit = (e >> 5) & 1),
          (this.monochrome = (e >> 4) & 1),
          (this.chroma_subsampling_x = (e >> 3) & 1),
          (this.chroma_subsampling_y = (e >> 2) & 1),
          (this.chroma_sample_position = 3 & e),
          (e = t.readUint8()),
          (this.reserved_1 = (e >> 5) & 7),
          0 === this.reserved_1)
        ) {
          if (
            ((this.initial_presentation_delay_present = (e >> 4) & 1),
            1 === this.initial_presentation_delay_present)
          )
            this.initial_presentation_delay_minus_one = 15 & e
          else if (((this.reserved_2 = 15 & e), 0 !== this.reserved_2))
            return void s.error('av1C reserved_2 parsing problem')
          var i = this.size - this.hdr_size - 4
          this.configOBUs = t.readUint8Array(i)
        } else s.error('av1C reserved_1 parsing problem')
      else s.error('av1C version ' + this.version + ' not supported')
    }),
    d.createBoxCtor('avcC', function (t) {
      var e, i
      for (
        this.configurationVersion = t.readUint8(),
          this.AVCProfileIndication = t.readUint8(),
          this.profile_compatibility = t.readUint8(),
          this.AVCLevelIndication = t.readUint8(),
          this.lengthSizeMinusOne = 3 & t.readUint8(),
          this.nb_SPS_nalus = 31 & t.readUint8(),
          i = this.size - this.hdr_size - 6,
          this.SPS = [],
          e = 0;
        e < this.nb_SPS_nalus;
        e++
      )
        (this.SPS[e] = {}),
          (this.SPS[e].length = t.readUint16()),
          (this.SPS[e].nalu = t.readUint8Array(this.SPS[e].length)),
          (i -= 2 + this.SPS[e].length)
      for (
        this.nb_PPS_nalus = t.readUint8(), i--, this.PPS = [], e = 0;
        e < this.nb_PPS_nalus;
        e++
      )
        (this.PPS[e] = {}),
          (this.PPS[e].length = t.readUint16()),
          (this.PPS[e].nalu = t.readUint8Array(this.PPS[e].length)),
          (i -= 2 + this.PPS[e].length)
      i > 0 && (this.ext = t.readUint8Array(i))
    }),
    d.createBoxCtor('btrt', function (t) {
      ;(this.bufferSizeDB = t.readUint32()),
        (this.maxBitrate = t.readUint32()),
        (this.avgBitrate = t.readUint32())
    }),
    d.createBoxCtor('clap', function (t) {
      ;(this.cleanApertureWidthN = t.readUint32()),
        (this.cleanApertureWidthD = t.readUint32()),
        (this.cleanApertureHeightN = t.readUint32()),
        (this.cleanApertureHeightD = t.readUint32()),
        (this.horizOffN = t.readUint32()),
        (this.horizOffD = t.readUint32()),
        (this.vertOffN = t.readUint32()),
        (this.vertOffD = t.readUint32())
    }),
    d.createBoxCtor('clli', function (t) {
      ;(this.max_content_light_level = t.readUint16()),
        (this.max_pic_average_light_level = t.readUint16())
    }),
    d.createFullBoxCtor('co64', function (t) {
      var e, i
      if (((e = t.readUint32()), (this.chunk_offsets = []), 0 === this.version))
        for (i = 0; i < e; i++) this.chunk_offsets.push(t.readUint64())
    }),
    d.createFullBoxCtor('CoLL', function (t) {
      ;(this.maxCLL = t.readUint16()), (this.maxFALL = t.readUint16())
    }),
    d.createBoxCtor('colr', function (t) {
      if (((this.colour_type = t.readString(4)), 'nclx' === this.colour_type)) {
        ;(this.colour_primaries = t.readUint16()),
          (this.transfer_characteristics = t.readUint16()),
          (this.matrix_coefficients = t.readUint16())
        var e = t.readUint8()
        this.full_range_flag = e >> 7
      } else
        ('rICC' === this.colour_type || 'prof' === this.colour_type) &&
          (this.ICC_profile = t.readUint8Array(this.size - 4))
    }),
    d.createFullBoxCtor('cprt', function (t) {
      this.parseLanguage(t), (this.notice = t.readCString())
    }),
    d.createFullBoxCtor('cslg', function (t) {
      0 === this.version &&
        ((this.compositionToDTSShift = t.readInt32()),
        (this.leastDecodeToDisplayDelta = t.readInt32()),
        (this.greatestDecodeToDisplayDelta = t.readInt32()),
        (this.compositionStartTime = t.readInt32()),
        (this.compositionEndTime = t.readInt32()))
    }),
    d.createFullBoxCtor('ctts', function (t) {
      var e, i
      if (
        ((e = t.readUint32()),
        (this.sample_counts = []),
        (this.sample_offsets = []),
        0 === this.version)
      )
        for (i = 0; i < e; i++) {
          this.sample_counts.push(t.readUint32())
          var r = t.readInt32()
          r < 0 &&
            s.warn(
              'BoxParser',
              'ctts box uses negative values without using version 1'
            ),
            this.sample_offsets.push(r)
        }
      else if (1 == this.version)
        for (i = 0; i < e; i++)
          this.sample_counts.push(t.readUint32()),
            this.sample_offsets.push(t.readInt32())
    }),
    d.createBoxCtor('dac3', function (t) {
      var e = t.readUint8(),
        i = t.readUint8(),
        s = t.readUint8()
      ;(this.fscod = e >> 6),
        (this.bsid = (e >> 1) & 31),
        (this.bsmod = ((1 & e) << 2) | ((i >> 6) & 3)),
        (this.acmod = (i >> 3) & 7),
        (this.lfeon = (i >> 2) & 1),
        (this.bit_rate_code = (3 & i) | ((s >> 5) & 7))
    }),
    d.createBoxCtor('dec3', function (t) {
      var e = t.readUint16()
      ;(this.data_rate = e >> 3),
        (this.num_ind_sub = 7 & e),
        (this.ind_subs = [])
      for (var i = 0; i < this.num_ind_sub + 1; i++) {
        var s = {}
        this.ind_subs.push(s)
        var r = t.readUint8(),
          n = t.readUint8(),
          a = t.readUint8()
        ;(s.fscod = r >> 6),
          (s.bsid = (r >> 1) & 31),
          (s.bsmod = ((1 & r) << 4) | ((n >> 4) & 15)),
          (s.acmod = (n >> 1) & 7),
          (s.lfeon = 1 & n),
          (s.num_dep_sub = (a >> 1) & 15),
          s.num_dep_sub > 0 && (s.chan_loc = ((1 & a) << 8) | t.readUint8())
      }
    }),
    d.createFullBoxCtor('dfLa', function (t) {
      var e = [],
        i = [
          'STREAMINFO',
          'PADDING',
          'APPLICATION',
          'SEEKTABLE',
          'VORBIS_COMMENT',
          'CUESHEET',
          'PICTURE',
          'RESERVED'
        ]
      for (this.parseFullHeader(t); ; ) {
        var s = t.readUint8(),
          r = Math.min(127 & s, i.length - 1)
        if (
          (r
            ? t.readUint8Array(t.readUint24())
            : (t.readUint8Array(13),
              (this.samplerate = t.readUint32() >> 12),
              t.readUint8Array(20)),
          e.push(i[r]),
          128 & s)
        )
          break
      }
      this.numMetadataBlocks = e.length + ' (' + e.join(', ') + ')'
    }),
    d.createBoxCtor('dimm', function (t) {
      this.bytessent = t.readUint64()
    }),
    d.createBoxCtor('dmax', function (t) {
      this.time = t.readUint32()
    }),
    d.createBoxCtor('dmed', function (t) {
      this.bytessent = t.readUint64()
    }),
    d.createBoxCtor('dOps', function (t) {
      if (
        ((this.Version = t.readUint8()),
        (this.OutputChannelCount = t.readUint8()),
        (this.PreSkip = t.readUint16()),
        (this.InputSampleRate = t.readUint32()),
        (this.OutputGain = t.readInt16()),
        (this.ChannelMappingFamily = t.readUint8()),
        0 !== this.ChannelMappingFamily)
      ) {
        ;(this.StreamCount = t.readUint8()),
          (this.CoupledCount = t.readUint8()),
          (this.ChannelMapping = [])
        for (var e = 0; e < this.OutputChannelCount; e++)
          this.ChannelMapping[e] = t.readUint8()
      }
    }),
    d.createFullBoxCtor('dref', function (t) {
      var e, i
      this.entries = []
      for (var s = t.readUint32(), r = 0; r < s; r++) {
        if (
          (e = d.parseOneBox(t, !1, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        ;(i = e.box), this.entries.push(i)
      }
    }),
    d.createBoxCtor('drep', function (t) {
      this.bytessent = t.readUint64()
    }),
    d.createFullBoxCtor('elng', function (t) {
      this.extended_language = t.readString(this.size - this.hdr_size)
    }),
    d.createFullBoxCtor('elst', function (t) {
      this.entries = []
      for (var e = t.readUint32(), i = 0; i < e; i++) {
        var s = {}
        this.entries.push(s),
          1 === this.version
            ? ((s.segment_duration = t.readUint64()),
              (s.media_time = t.readInt64()))
            : ((s.segment_duration = t.readUint32()),
              (s.media_time = t.readInt32())),
          (s.media_rate_integer = t.readInt16()),
          (s.media_rate_fraction = t.readInt16())
      }
    }),
    d.createFullBoxCtor('emsg', function (t) {
      1 == this.version
        ? ((this.timescale = t.readUint32()),
          (this.presentation_time = t.readUint64()),
          (this.event_duration = t.readUint32()),
          (this.id = t.readUint32()),
          (this.scheme_id_uri = t.readCString()),
          (this.value = t.readCString()))
        : ((this.scheme_id_uri = t.readCString()),
          (this.value = t.readCString()),
          (this.timescale = t.readUint32()),
          (this.presentation_time_delta = t.readUint32()),
          (this.event_duration = t.readUint32()),
          (this.id = t.readUint32()))
      var e =
        this.size -
        this.hdr_size -
        (16 + (this.scheme_id_uri.length + 1) + (this.value.length + 1))
      1 == this.version && (e -= 4), (this.message_data = t.readUint8Array(e))
    }),
    d.createFullBoxCtor('esds', function (t) {
      var e = t.readUint8Array(this.size - this.hdr_size)
      if (void 0 !== h) {
        var i = new h()
        this.esd = i.parseOneDescriptor(new n(e.buffer, 0, n.BIG_ENDIAN))
      }
    }),
    d.createBoxCtor('fiel', function (t) {
      ;(this.fieldCount = t.readUint8()), (this.fieldOrdering = t.readUint8())
    }),
    d.createBoxCtor('frma', function (t) {
      this.data_format = t.readString(4)
    }),
    d.createBoxCtor('ftyp', function (t) {
      var e = this.size - this.hdr_size
      ;(this.major_brand = t.readString(4)),
        (this.minor_version = t.readUint32()),
        (e -= 8),
        (this.compatible_brands = [])
      for (var i = 0; e >= 4; )
        (this.compatible_brands[i] = t.readString(4)), (e -= 4), i++
    }),
    d.createFullBoxCtor('hdlr', function (t) {
      0 === this.version &&
        (t.readUint32(),
        (this.handler = t.readString(4)),
        t.readUint32Array(3),
        (this.name = t.readString(this.size - this.hdr_size - 20)),
        '\0' === this.name[this.name.length - 1] &&
          (this.name = this.name.slice(0, -1)))
    }),
    d.createBoxCtor('hvcC', function (t) {
      var e, i, s, r
      ;(this.configurationVersion = t.readUint8()),
        (r = t.readUint8()),
        (this.general_profile_space = r >> 6),
        (this.general_tier_flag = (32 & r) >> 5),
        (this.general_profile_idc = 31 & r),
        (this.general_profile_compatibility = t.readUint32()),
        (this.general_constraint_indicator = t.readUint8Array(6)),
        (this.general_level_idc = t.readUint8()),
        (this.min_spatial_segmentation_idc = 4095 & t.readUint16()),
        (this.parallelismType = 3 & t.readUint8()),
        (this.chroma_format_idc = 3 & t.readUint8()),
        (this.bit_depth_luma_minus8 = 7 & t.readUint8()),
        (this.bit_depth_chroma_minus8 = 7 & t.readUint8()),
        (this.avgFrameRate = t.readUint16()),
        (r = t.readUint8()),
        (this.constantFrameRate = r >> 6),
        (this.numTemporalLayers = (13 & r) >> 3),
        (this.temporalIdNested = (4 & r) >> 2),
        (this.lengthSizeMinusOne = 3 & r),
        (this.nalu_arrays = [])
      var n = t.readUint8()
      for (e = 0; e < n; e++) {
        var a = []
        this.nalu_arrays.push(a),
          (r = t.readUint8()),
          (a.completeness = (128 & r) >> 7),
          (a.nalu_type = 63 & r)
        var o = t.readUint16()
        for (i = 0; i < o; i++) {
          var h = {}
          a.push(h), (s = t.readUint16()), (h.data = t.readUint8Array(s))
        }
      }
    }),
    d.createFullBoxCtor('iinf', function (t) {
      var e
      0 === this.version
        ? (this.entry_count = t.readUint16())
        : (this.entry_count = t.readUint32()),
        (this.item_infos = [])
      for (var i = 0; i < this.entry_count; i++) {
        if (
          (e = d.parseOneBox(t, !1, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        'infe' !== e.box.type &&
          s.error('BoxParser', "Expected 'infe' box, got " + e.box.type),
          (this.item_infos[i] = e.box)
      }
    }),
    d.createFullBoxCtor('iloc', function (t) {
      var e
      ;(e = t.readUint8()),
        (this.offset_size = (e >> 4) & 15),
        (this.length_size = 15 & e),
        (e = t.readUint8()),
        (this.base_offset_size = (e >> 4) & 15),
        1 === this.version || 2 === this.version
          ? (this.index_size = 15 & e)
          : (this.index_size = 0),
        (this.items = [])
      var i = 0
      if (this.version < 2) i = t.readUint16()
      else {
        if (2 !== this.version) throw 'version of iloc box not supported'
        i = t.readUint32()
      }
      for (var s = 0; s < i; s++) {
        var r = {}
        if ((this.items.push(r), this.version < 2)) r.item_ID = t.readUint16()
        else {
          if (2 !== this.version) throw 'version of iloc box not supported'
          r.item_ID = t.readUint16()
        }
        switch (
          (1 === this.version || 2 === this.version
            ? (r.construction_method = 15 & t.readUint16())
            : (r.construction_method = 0),
          (r.data_reference_index = t.readUint16()),
          this.base_offset_size)
        ) {
          case 0:
            r.base_offset = 0
            break
          case 4:
            r.base_offset = t.readUint32()
            break
          case 8:
            r.base_offset = t.readUint64()
            break
          default:
            throw 'Error reading base offset size'
        }
        var n = t.readUint16()
        r.extents = []
        for (var a = 0; a < n; a++) {
          var o = {}
          if ((r.extents.push(o), 1 === this.version || 2 === this.version))
            switch (this.index_size) {
              case 0:
                o.extent_index = 0
                break
              case 4:
                o.extent_index = t.readUint32()
                break
              case 8:
                o.extent_index = t.readUint64()
                break
              default:
                throw 'Error reading extent index'
            }
          switch (this.offset_size) {
            case 0:
              o.extent_offset = 0
              break
            case 4:
              o.extent_offset = t.readUint32()
              break
            case 8:
              o.extent_offset = t.readUint64()
              break
            default:
              throw 'Error reading extent index'
          }
          switch (this.length_size) {
            case 0:
              o.extent_length = 0
              break
            case 4:
              o.extent_length = t.readUint32()
              break
            case 8:
              o.extent_length = t.readUint64()
              break
            default:
              throw 'Error reading extent index'
          }
        }
      }
    }),
    d.createBoxCtor('imir', function (t) {
      var e = t.readUint8()
      ;(this.reserved = e >> 7), (this.axis = 1 & e)
    }),
    d.createFullBoxCtor('infe', function (t) {
      if (
        ((0 !== this.version && 1 !== this.version) ||
          ((this.item_ID = t.readUint16()),
          (this.item_protection_index = t.readUint16()),
          (this.item_name = t.readCString()),
          (this.content_type = t.readCString()),
          (this.content_encoding = t.readCString())),
        1 === this.version)
      )
        return (
          (this.extension_type = t.readString(4)),
          s.warn('BoxParser', 'Cannot parse extension type'),
          void t.seek(this.start + this.size)
        )
      this.version >= 2 &&
        (2 === this.version
          ? (this.item_ID = t.readUint16())
          : 3 === this.version && (this.item_ID = t.readUint32()),
        (this.item_protection_index = t.readUint16()),
        (this.item_type = t.readString(4)),
        (this.item_name = t.readCString()),
        'mime' === this.item_type
          ? ((this.content_type = t.readCString()),
            (this.content_encoding = t.readCString()))
          : 'uri ' === this.item_type && (this.item_uri_type = t.readCString()))
    }),
    d.createFullBoxCtor('ipma', function (t) {
      var e, i
      for (
        entry_count = t.readUint32(), this.associations = [], e = 0;
        e < entry_count;
        e++
      ) {
        var s = {}
        this.associations.push(s),
          this.version < 1 ? (s.id = t.readUint16()) : (s.id = t.readUint32())
        var r = t.readUint8()
        for (s.props = [], i = 0; i < r; i++) {
          var n = t.readUint8(),
            a = {}
          s.props.push(a),
            (a.essential = (128 & n) >> 7 == 1),
            1 & this.flags
              ? (a.property_index = ((127 & n) << 8) | t.readUint8())
              : (a.property_index = 127 & n)
        }
      }
    }),
    d.createFullBoxCtor('iref', function (t) {
      var e, i
      for (this.references = []; t.getPosition() < this.start + this.size; ) {
        if (
          (e = d.parseOneBox(t, !0, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        ;(i =
          0 === this.version
            ? new d.SingleItemTypeReferenceBox(
                e.type,
                e.size,
                e.hdr_size,
                e.start
              )
            : new d.SingleItemTypeReferenceBoxLarge(
                e.type,
                e.size,
                e.hdr_size,
                e.start
              )).write === d.Box.prototype.write &&
          'mdat' !== i.type &&
          (s.warn(
            'BoxParser',
            i.type +
              ' box writing not yet implemented, keeping unparsed data in memory for later write'
          ),
          i.parseDataAndRewind(t)),
          i.parse(t),
          this.references.push(i)
      }
    }),
    d.createBoxCtor('irot', function (t) {
      this.angle = 3 & t.readUint8()
    }),
    d.createFullBoxCtor('ispe', function (t) {
      ;(this.image_width = t.readUint32()), (this.image_height = t.readUint32())
    }),
    d.createFullBoxCtor('kind', function (t) {
      ;(this.schemeURI = t.readCString()), (this.value = t.readCString())
    }),
    d.createFullBoxCtor('leva', function (t) {
      var e = t.readUint8()
      this.levels = []
      for (var i = 0; i < e; i++) {
        var r = {}
        ;(this.levels[i] = r), (r.track_ID = t.readUint32())
        var n = t.readUint8()
        switch (
          ((r.padding_flag = n >> 7),
          (r.assignment_type = 127 & n),
          r.assignment_type)
        ) {
          case 0:
            r.grouping_type = t.readString(4)
            break
          case 1:
            ;(r.grouping_type = t.readString(4)),
              (r.grouping_type_parameter = t.readUint32())
            break
          case 2:
          case 3:
            break
          case 4:
            r.sub_track_id = t.readUint32()
            break
          default:
            s.warn('BoxParser', 'Unknown leva assignement type')
        }
      }
    }),
    d.createBoxCtor('lsel', function (t) {
      this.layer_id = t.readUint16()
    }),
    d.createBoxCtor('maxr', function (t) {
      ;(this.period = t.readUint32()), (this.bytes = t.readUint32())
    }),
    d.createBoxCtor('mdcv', function (t) {
      ;(this.display_primaries = []),
        (this.display_primaries[0] = {}),
        (this.display_primaries[0].x = t.readUint16()),
        (this.display_primaries[0].y = t.readUint16()),
        (this.display_primaries[1] = {}),
        (this.display_primaries[1].x = t.readUint16()),
        (this.display_primaries[1].y = t.readUint16()),
        (this.display_primaries[2] = {}),
        (this.display_primaries[2].x = t.readUint16()),
        (this.display_primaries[2].y = t.readUint16()),
        (this.white_point = {}),
        (this.white_point.x = t.readUint16()),
        (this.white_point.y = t.readUint16()),
        (this.max_display_mastering_luminance = t.readUint32()),
        (this.min_display_mastering_luminance = t.readUint32())
    }),
    d.createFullBoxCtor('mdhd', function (t) {
      1 == this.version
        ? ((this.creation_time = t.readUint64()),
          (this.modification_time = t.readUint64()),
          (this.timescale = t.readUint32()),
          (this.duration = t.readUint64()))
        : ((this.creation_time = t.readUint32()),
          (this.modification_time = t.readUint32()),
          (this.timescale = t.readUint32()),
          (this.duration = t.readUint32())),
        this.parseLanguage(t),
        t.readUint16()
    }),
    d.createFullBoxCtor('mehd', function (t) {
      1 & this.flags &&
        (s.warn(
          'BoxParser',
          'mehd box incorrectly uses flags set to 1, converting version to 1'
        ),
        (this.version = 1)),
        1 == this.version
          ? (this.fragment_duration = t.readUint64())
          : (this.fragment_duration = t.readUint32())
    }),
    d.createFullBoxCtor('meta', function (t) {
      ;(this.boxes = []), d.ContainerBox.prototype.parse.call(this, t)
    }),
    d.createFullBoxCtor('mfhd', function (t) {
      this.sequence_number = t.readUint32()
    }),
    d.createFullBoxCtor('mfro', function (t) {
      this._size = t.readUint32()
    }),
    d.createFullBoxCtor('mvhd', function (t) {
      1 == this.version
        ? ((this.creation_time = t.readUint64()),
          (this.modification_time = t.readUint64()),
          (this.timescale = t.readUint32()),
          (this.duration = t.readUint64()))
        : ((this.creation_time = t.readUint32()),
          (this.modification_time = t.readUint32()),
          (this.timescale = t.readUint32()),
          (this.duration = t.readUint32())),
        (this.rate = t.readUint32()),
        (this.volume = t.readUint16() >> 8),
        t.readUint16(),
        t.readUint32Array(2),
        (this.matrix = t.readUint32Array(9)),
        t.readUint32Array(6),
        (this.next_track_id = t.readUint32())
    }),
    d.createBoxCtor('npck', function (t) {
      this.packetssent = t.readUint32()
    }),
    d.createBoxCtor('nump', function (t) {
      this.packetssent = t.readUint64()
    }),
    d.createFullBoxCtor('padb', function (t) {
      var e = t.readUint32()
      this.padbits = []
      for (var i = 0; i < Math.floor((e + 1) / 2); i++)
        this.padbits = t.readUint8()
    }),
    d.createBoxCtor('pasp', function (t) {
      ;(this.hSpacing = t.readUint32()), (this.vSpacing = t.readUint32())
    }),
    d.createBoxCtor('payl', function (t) {
      this.text = t.readString(this.size - this.hdr_size)
    }),
    d.createBoxCtor('payt', function (t) {
      this.payloadID = t.readUint32()
      var e = t.readUint8()
      this.rtpmap_string = t.readString(e)
    }),
    d.createFullBoxCtor('pdin', function (t) {
      var e = (this.size - this.hdr_size) / 8
      ;(this.rate = []), (this.initial_delay = [])
      for (var i = 0; i < e; i++)
        (this.rate[i] = t.readUint32()),
          (this.initial_delay[i] = t.readUint32())
    }),
    d.createFullBoxCtor('pitm', function (t) {
      0 === this.version
        ? (this.item_id = t.readUint16())
        : (this.item_id = t.readUint32())
    }),
    d.createFullBoxCtor('pixi', function (t) {
      var e
      for (
        this.num_channels = t.readUint8(), this.bits_per_channels = [], e = 0;
        e < this.num_channels;
        e++
      )
        this.bits_per_channels[e] = t.readUint8()
    }),
    d.createBoxCtor('pmax', function (t) {
      this.bytes = t.readUint32()
    }),
    d.createFullBoxCtor('prft', function (t) {
      ;(this.ref_track_id = t.readUint32()),
        (this.ntp_timestamp = t.readUint64()),
        0 === this.version
          ? (this.media_time = t.readUint32())
          : (this.media_time = t.readUint64())
    }),
    d.createFullBoxCtor('pssh', function (t) {
      if (((this.system_id = d.parseHex16(t)), this.version > 0)) {
        var e = t.readUint32()
        this.kid = []
        for (var i = 0; i < e; i++) this.kid[i] = d.parseHex16(t)
      }
      var s = t.readUint32()
      s > 0 && (this.data = t.readUint8Array(s))
    }),
    d.createFullBoxCtor('clef', function (t) {
      ;(this.width = t.readUint32()), (this.height = t.readUint32())
    }),
    d.createFullBoxCtor('enof', function (t) {
      ;(this.width = t.readUint32()), (this.height = t.readUint32())
    }),
    d.createFullBoxCtor('prof', function (t) {
      ;(this.width = t.readUint32()), (this.height = t.readUint32())
    }),
    d.createContainerBoxCtor('tapt', null, ['clef', 'prof', 'enof']),
    d.createBoxCtor('rtp ', function (t) {
      ;(this.descriptionformat = t.readString(4)),
        (this.sdptext = t.readString(this.size - this.hdr_size - 4))
    }),
    d.createFullBoxCtor('saio', function (t) {
      1 & this.flags &&
        ((this.aux_info_type = t.readUint32()),
        (this.aux_info_type_parameter = t.readUint32()))
      var e = t.readUint32()
      this.offset = []
      for (var i = 0; i < e; i++)
        0 === this.version
          ? (this.offset[i] = t.readUint32())
          : (this.offset[i] = t.readUint64())
    }),
    d.createFullBoxCtor('saiz', function (t) {
      1 & this.flags &&
        ((this.aux_info_type = t.readUint32()),
        (this.aux_info_type_parameter = t.readUint32())),
        (this.default_sample_info_size = t.readUint8())
      var e = t.readUint32()
      if (((this.sample_info_size = []), 0 === this.default_sample_info_size))
        for (var i = 0; i < e; i++) this.sample_info_size[i] = t.readUint8()
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, 'mett', function (t) {
      this.parseHeader(t),
        (this.content_encoding = t.readCString()),
        (this.mime_format = t.readCString()),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, 'metx', function (t) {
      this.parseHeader(t),
        (this.content_encoding = t.readCString()),
        (this.namespace = t.readCString()),
        (this.schema_location = t.readCString()),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, 'sbtt', function (t) {
      this.parseHeader(t),
        (this.content_encoding = t.readCString()),
        (this.mime_format = t.readCString()),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, 'stpp', function (t) {
      this.parseHeader(t),
        (this.namespace = t.readCString()),
        (this.schema_location = t.readCString()),
        (this.auxiliary_mime_types = t.readCString()),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, 'stxt', function (t) {
      this.parseHeader(t),
        (this.content_encoding = t.readCString()),
        (this.mime_format = t.readCString()),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, 'tx3g', function (t) {
      this.parseHeader(t),
        (this.displayFlags = t.readUint32()),
        (this.horizontal_justification = t.readInt8()),
        (this.vertical_justification = t.readInt8()),
        (this.bg_color_rgba = t.readUint8Array(4)),
        (this.box_record = t.readInt16Array(4)),
        (this.style_record = t.readUint8Array(12)),
        this.parseFooter(t)
    }),
    d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, 'wvtt', function (t) {
      this.parseHeader(t), this.parseFooter(t)
    }),
    d.createSampleGroupCtor('alst', function (t) {
      var e,
        i = t.readUint16()
      for (
        this.first_output_sample = t.readUint16(),
          this.sample_offset = [],
          e = 0;
        e < i;
        e++
      )
        this.sample_offset[e] = t.readUint32()
      var s = this.description_length - 4 - 4 * i
      for (
        this.num_output_samples = [], this.num_total_samples = [], e = 0;
        e < s / 4;
        e++
      )
        (this.num_output_samples[e] = t.readUint16()),
          (this.num_total_samples[e] = t.readUint16())
    }),
    d.createSampleGroupCtor('avll', function (t) {
      ;(this.layerNumber = t.readUint8()),
        (this.accurateStatisticsFlag = t.readUint8()),
        (this.avgBitRate = t.readUint16()),
        (this.avgFrameRate = t.readUint16())
    }),
    d.createSampleGroupCtor('avss', function (t) {
      ;(this.subSequenceIdentifier = t.readUint16()),
        (this.layerNumber = t.readUint8())
      var e = t.readUint8()
      ;(this.durationFlag = e >> 7),
        (this.avgRateFlag = (e >> 6) & 1),
        this.durationFlag && (this.duration = t.readUint32()),
        this.avgRateFlag &&
          ((this.accurateStatisticsFlag = t.readUint8()),
          (this.avgBitRate = t.readUint16()),
          (this.avgFrameRate = t.readUint16())),
        (this.dependency = [])
      for (var i = t.readUint8(), s = 0; s < i; s++) {
        var r = {}
        this.dependency.push(r),
          (r.subSeqDirectionFlag = t.readUint8()),
          (r.layerNumber = t.readUint8()),
          (r.subSequenceIdentifier = t.readUint16())
      }
    }),
    d.createSampleGroupCtor('dtrt', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('mvif', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('prol', function (t) {
      this.roll_distance = t.readInt16()
    }),
    d.createSampleGroupCtor('rap ', function (t) {
      var e = t.readUint8()
      ;(this.num_leading_samples_known = e >> 7),
        (this.num_leading_samples = 127 & e)
    }),
    d.createSampleGroupCtor('rash', function (t) {
      if (
        ((this.operation_point_count = t.readUint16()),
        this.description_length !==
          2 +
            (1 === this.operation_point_count
              ? 2
              : 6 * this.operation_point_count) +
            9)
      )
        s.warn(
          'BoxParser',
          'Mismatch in ' + this.grouping_type + ' sample group length'
        ),
          (this.data = t.readUint8Array(this.description_length - 2))
      else {
        if (1 === this.operation_point_count)
          this.target_rate_share = t.readUint16()
        else {
          ;(this.target_rate_share = []), (this.available_bitrate = [])
          for (var e = 0; e < this.operation_point_count; e++)
            (this.available_bitrate[e] = t.readUint32()),
              (this.target_rate_share[e] = t.readUint16())
        }
        ;(this.maximum_bitrate = t.readUint32()),
          (this.minimum_bitrate = t.readUint32()),
          (this.discard_priority = t.readUint8())
      }
    }),
    d.createSampleGroupCtor('roll', function (t) {
      this.roll_distance = t.readInt16()
    }),
    (d.SampleGroupEntry.prototype.parse = function (t) {
      s.warn('BoxParser', 'Unknown Sample Group type: ' + this.grouping_type),
        (this.data = t.readUint8Array(this.description_length))
    }),
    d.createSampleGroupCtor('scif', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('scnm', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('seig', function (t) {
      this.reserved = t.readUint8()
      var e = t.readUint8()
      ;(this.crypt_byte_block = e >> 4),
        (this.skip_byte_block = 15 & e),
        (this.isProtected = t.readUint8()),
        (this.Per_Sample_IV_Size = t.readUint8()),
        (this.KID = d.parseHex16(t)),
        (this.constant_IV_size = 0),
        (this.constant_IV = 0),
        1 === this.isProtected &&
          0 === this.Per_Sample_IV_Size &&
          ((this.constant_IV_size = t.readUint8()),
          (this.constant_IV = t.readUint8Array(this.constant_IV_size)))
    }),
    d.createSampleGroupCtor('stsa', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('sync', function (t) {
      var e = t.readUint8()
      this.NAL_unit_type = 63 & e
    }),
    d.createSampleGroupCtor('tele', function (t) {
      var e = t.readUint8()
      this.level_independently_decodable = e >> 7
    }),
    d.createSampleGroupCtor('tsas', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('tscl', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createSampleGroupCtor('vipr', function (t) {
      s.warn(
        'BoxParser',
        'Sample Group type: ' + this.grouping_type + ' not fully parsed'
      )
    }),
    d.createFullBoxCtor('sbgp', function (t) {
      ;(this.grouping_type = t.readString(4)),
        1 === this.version
          ? (this.grouping_type_parameter = t.readUint32())
          : (this.grouping_type_parameter = 0),
        (this.entries = [])
      for (var e = t.readUint32(), i = 0; i < e; i++) {
        var s = {}
        this.entries.push(s),
          (s.sample_count = t.readInt32()),
          (s.group_description_index = t.readInt32())
      }
    }),
    d.createFullBoxCtor('schm', function (t) {
      ;(this.scheme_type = t.readString(4)),
        (this.scheme_version = t.readUint32()),
        1 & this.flags &&
          (this.scheme_uri = t.readString(this.size - this.hdr_size - 8))
    }),
    d.createBoxCtor('sdp ', function (t) {
      this.sdptext = t.readString(this.size - this.hdr_size)
    }),
    d.createFullBoxCtor('sdtp', function (t) {
      var e,
        i = this.size - this.hdr_size
      ;(this.is_leading = []),
        (this.sample_depends_on = []),
        (this.sample_is_depended_on = []),
        (this.sample_has_redundancy = [])
      for (var s = 0; s < i; s++)
        (e = t.readUint8()),
          (this.is_leading[s] = e >> 6),
          (this.sample_depends_on[s] = (e >> 4) & 3),
          (this.sample_is_depended_on[s] = (e >> 2) & 3),
          (this.sample_has_redundancy[s] = 3 & e)
    }),
    d.createFullBoxCtor('senc'),
    d.createFullBoxCtor('sgpd', function (t) {
      ;(this.grouping_type = t.readString(4)),
        s.debug(
          'BoxParser',
          'Found Sample Groups of type ' + this.grouping_type
        ),
        1 === this.version
          ? (this.default_length = t.readUint32())
          : (this.default_length = 0),
        this.version >= 2 &&
          (this.default_group_description_index = t.readUint32()),
        (this.entries = [])
      for (var e = t.readUint32(), i = 0; i < e; i++) {
        var r
        ;(r = d[this.grouping_type + 'SampleGroupEntry']
          ? new d[this.grouping_type + 'SampleGroupEntry'](this.grouping_type)
          : new d.SampleGroupEntry(this.grouping_type)),
          this.entries.push(r),
          1 === this.version && 0 === this.default_length
            ? (r.description_length = t.readUint32())
            : (r.description_length = this.default_length),
          r.write === d.SampleGroupEntry.prototype.write &&
            (s.info(
              'BoxParser',
              'SampleGroup for type ' +
                this.grouping_type +
                ' writing not yet implemented, keeping unparsed data in memory for later write'
            ),
            (r.data = t.readUint8Array(r.description_length)),
            (t.position -= r.description_length)),
          r.parse(t)
      }
    }),
    d.createFullBoxCtor('sidx', function (t) {
      ;(this.reference_ID = t.readUint32()),
        (this.timescale = t.readUint32()),
        0 === this.version
          ? ((this.earliest_presentation_time = t.readUint32()),
            (this.first_offset = t.readUint32()))
          : ((this.earliest_presentation_time = t.readUint64()),
            (this.first_offset = t.readUint64())),
        t.readUint16(),
        (this.references = [])
      for (var e = t.readUint16(), i = 0; i < e; i++) {
        var s = {}
        this.references.push(s)
        var r = t.readUint32()
        ;(s.reference_type = (r >> 31) & 1),
          (s.referenced_size = 2147483647 & r),
          (s.subsegment_duration = t.readUint32()),
          (r = t.readUint32()),
          (s.starts_with_SAP = (r >> 31) & 1),
          (s.SAP_type = (r >> 28) & 7),
          (s.SAP_delta_time = 268435455 & r)
      }
    }),
    (d.SingleItemTypeReferenceBox = function (t, e, i, s) {
      d.Box.call(this, t, e), (this.hdr_size = i), (this.start = s)
    }),
    (d.SingleItemTypeReferenceBox.prototype = new d.Box()),
    (d.SingleItemTypeReferenceBox.prototype.parse = function (t) {
      this.from_item_ID = t.readUint16()
      var e = t.readUint16()
      this.references = []
      for (var i = 0; i < e; i++) this.references[i] = t.readUint16()
    }),
    (d.SingleItemTypeReferenceBoxLarge = function (t, e, i, s) {
      d.Box.call(this, t, e), (this.hdr_size = i), (this.start = s)
    }),
    (d.SingleItemTypeReferenceBoxLarge.prototype = new d.Box()),
    (d.SingleItemTypeReferenceBoxLarge.prototype.parse = function (t) {
      this.from_item_ID = t.readUint32()
      var e = t.readUint16()
      this.references = []
      for (var i = 0; i < e; i++) this.references[i] = t.readUint32()
    }),
    d.createFullBoxCtor('SmDm', function (t) {
      ;(this.primaryRChromaticity_x = t.readUint16()),
        (this.primaryRChromaticity_y = t.readUint16()),
        (this.primaryGChromaticity_x = t.readUint16()),
        (this.primaryGChromaticity_y = t.readUint16()),
        (this.primaryBChromaticity_x = t.readUint16()),
        (this.primaryBChromaticity_y = t.readUint16()),
        (this.whitePointChromaticity_x = t.readUint16()),
        (this.whitePointChromaticity_y = t.readUint16()),
        (this.luminanceMax = t.readUint32()),
        (this.luminanceMin = t.readUint32())
    }),
    d.createFullBoxCtor('smhd', function (t) {
      ;(this.balance = t.readUint16()), t.readUint16()
    }),
    d.createFullBoxCtor('ssix', function (t) {
      this.subsegments = []
      for (var e = t.readUint32(), i = 0; i < e; i++) {
        var s = {}
        this.subsegments.push(s), (s.ranges = [])
        for (var r = t.readUint32(), n = 0; n < r; n++) {
          var a = {}
          s.ranges.push(a),
            (a.level = t.readUint8()),
            (a.range_size = t.readUint24())
        }
      }
    }),
    d.createFullBoxCtor('stco', function (t) {
      var e
      if (((e = t.readUint32()), (this.chunk_offsets = []), 0 === this.version))
        for (var i = 0; i < e; i++) this.chunk_offsets.push(t.readUint32())
    }),
    d.createFullBoxCtor('stdp', function (t) {
      var e = (this.size - this.hdr_size) / 2
      this.priority = []
      for (var i = 0; i < e; i++) this.priority[i] = t.readUint16()
    }),
    d.createFullBoxCtor('sthd'),
    d.createFullBoxCtor('stri', function (t) {
      ;(this.switch_group = t.readUint16()),
        (this.alternate_group = t.readUint16()),
        (this.sub_track_id = t.readUint32())
      var e = (this.size - this.hdr_size - 8) / 4
      this.attribute_list = []
      for (var i = 0; i < e; i++) this.attribute_list[i] = t.readUint32()
    }),
    d.createFullBoxCtor('stsc', function (t) {
      var e, i
      if (
        ((e = t.readUint32()),
        (this.first_chunk = []),
        (this.samples_per_chunk = []),
        (this.sample_description_index = []),
        0 === this.version)
      )
        for (i = 0; i < e; i++)
          this.first_chunk.push(t.readUint32()),
            this.samples_per_chunk.push(t.readUint32()),
            this.sample_description_index.push(t.readUint32())
    }),
    d.createFullBoxCtor('stsd', function (t) {
      var e, i, r, n
      for (this.entries = [], r = t.readUint32(), e = 1; e <= r; e++) {
        if (
          (i = d.parseOneBox(t, !0, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        d[i.type + 'SampleEntry']
          ? (((n = new d[i.type + 'SampleEntry'](i.size)).hdr_size =
              i.hdr_size),
            (n.start = i.start))
          : (s.warn('BoxParser', 'Unknown sample entry type: ' + i.type),
            (n = new d.SampleEntry(i.type, i.size, i.hdr_size, i.start))),
          n.write === d.SampleEntry.prototype.write &&
            (s.info(
              'BoxParser',
              'SampleEntry ' +
                n.type +
                ' box writing not yet implemented, keeping unparsed data in memory for later write'
            ),
            n.parseDataAndRewind(t)),
          n.parse(t),
          this.entries.push(n)
      }
    }),
    d.createFullBoxCtor('stsg', function (t) {
      this.grouping_type = t.readUint32()
      var e = t.readUint16()
      this.group_description_index = []
      for (var i = 0; i < e; i++)
        this.group_description_index[i] = t.readUint32()
    }),
    d.createFullBoxCtor('stsh', function (t) {
      var e, i
      if (
        ((e = t.readUint32()),
        (this.shadowed_sample_numbers = []),
        (this.sync_sample_numbers = []),
        0 === this.version)
      )
        for (i = 0; i < e; i++)
          this.shadowed_sample_numbers.push(t.readUint32()),
            this.sync_sample_numbers.push(t.readUint32())
    }),
    d.createFullBoxCtor('stss', function (t) {
      var e, i
      if (((i = t.readUint32()), 0 === this.version))
        for (this.sample_numbers = [], e = 0; e < i; e++)
          this.sample_numbers.push(t.readUint32())
    }),
    d.createFullBoxCtor('stsz', function (t) {
      var e
      if (((this.sample_sizes = []), 0 === this.version))
        for (
          this.sample_size = t.readUint32(),
            this.sample_count = t.readUint32(),
            e = 0;
          e < this.sample_count;
          e++
        )
          0 === this.sample_size
            ? this.sample_sizes.push(t.readUint32())
            : (this.sample_sizes[e] = this.sample_size)
    }),
    d.createFullBoxCtor('stts', function (t) {
      var e, i, r
      if (
        ((e = t.readUint32()),
        (this.sample_counts = []),
        (this.sample_deltas = []),
        0 === this.version)
      )
        for (i = 0; i < e; i++)
          this.sample_counts.push(t.readUint32()),
            (r = t.readInt32()) < 0 &&
              (s.warn(
                'BoxParser',
                'File uses negative stts sample delta, using value 1 instead, sync may be lost!'
              ),
              (r = 1)),
            this.sample_deltas.push(r)
    }),
    d.createFullBoxCtor('stvi', function (t) {
      var e = t.readUint32()
      ;(this.single_view_allowed = 3 & e), (this.stereo_scheme = t.readUint32())
      var i,
        s,
        r = t.readUint32()
      for (
        this.stereo_indication_type = t.readString(r), this.boxes = [];
        t.getPosition() < this.start + this.size;

      ) {
        if (
          (i = d.parseOneBox(t, !1, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        ;(s = i.box), this.boxes.push(s), (this[s.type] = s)
      }
    }),
    d.createBoxCtor('styp', function (t) {
      d.ftypBox.prototype.parse.call(this, t)
    }),
    d.createFullBoxCtor('stz2', function (t) {
      var e, i
      if (((this.sample_sizes = []), 0 === this.version))
        if (
          ((this.reserved = t.readUint24()),
          (this.field_size = t.readUint8()),
          (i = t.readUint32()),
          4 === this.field_size)
        )
          for (e = 0; e < i; e += 2) {
            var r = t.readUint8()
            ;(this.sample_sizes[e] = (r >> 4) & 15),
              (this.sample_sizes[e + 1] = 15 & r)
          }
        else if (8 === this.field_size)
          for (e = 0; e < i; e++) this.sample_sizes[e] = t.readUint8()
        else if (16 === this.field_size)
          for (e = 0; e < i; e++) this.sample_sizes[e] = t.readUint16()
        else s.error('BoxParser', 'Error in length field in stz2 box')
    }),
    d.createFullBoxCtor('subs', function (t) {
      var e, i, s, r
      for (s = t.readUint32(), this.entries = [], e = 0; e < s; e++) {
        var n = {}
        if (
          ((this.entries[e] = n),
          (n.sample_delta = t.readUint32()),
          (n.subsamples = []),
          (r = t.readUint16()) > 0)
        )
          for (i = 0; i < r; i++) {
            var a = {}
            n.subsamples.push(a),
              1 == this.version
                ? (a.size = t.readUint32())
                : (a.size = t.readUint16()),
              (a.priority = t.readUint8()),
              (a.discardable = t.readUint8()),
              (a.codec_specific_parameters = t.readUint32())
          }
      }
    }),
    d.createFullBoxCtor('tenc', function (t) {
      if ((t.readUint8(), 0 === this.version)) t.readUint8()
      else {
        var e = t.readUint8()
        ;(this.default_crypt_byte_block = (e >> 4) & 15),
          (this.default_skip_byte_block = 15 & e)
      }
      ;(this.default_isProtected = t.readUint8()),
        (this.default_Per_Sample_IV_Size = t.readUint8()),
        (this.default_KID = d.parseHex16(t)),
        1 === this.default_isProtected &&
          0 === this.default_Per_Sample_IV_Size &&
          ((this.default_constant_IV_size = t.readUint8()),
          (this.default_constant_IV = t.readUint8Array(
            this.default_constant_IV_size
          )))
    }),
    d.createFullBoxCtor('tfdt', function (t) {
      1 == this.version
        ? (this.baseMediaDecodeTime = t.readUint64())
        : (this.baseMediaDecodeTime = t.readUint32())
    }),
    d.createFullBoxCtor('tfhd', function (t) {
      var e = 0
      ;(this.track_id = t.readUint32()),
        this.size - this.hdr_size > e &&
        this.flags & d.TFHD_FLAG_BASE_DATA_OFFSET
          ? ((this.base_data_offset = t.readUint64()), (e += 8))
          : (this.base_data_offset = 0),
        this.size - this.hdr_size > e && this.flags & d.TFHD_FLAG_SAMPLE_DESC
          ? ((this.default_sample_description_index = t.readUint32()), (e += 4))
          : (this.default_sample_description_index = 0),
        this.size - this.hdr_size > e && this.flags & d.TFHD_FLAG_SAMPLE_DUR
          ? ((this.default_sample_duration = t.readUint32()), (e += 4))
          : (this.default_sample_duration = 0),
        this.size - this.hdr_size > e && this.flags & d.TFHD_FLAG_SAMPLE_SIZE
          ? ((this.default_sample_size = t.readUint32()), (e += 4))
          : (this.default_sample_size = 0),
        this.size - this.hdr_size > e && this.flags & d.TFHD_FLAG_SAMPLE_FLAGS
          ? ((this.default_sample_flags = t.readUint32()), (e += 4))
          : (this.default_sample_flags = 0)
    }),
    d.createFullBoxCtor('tfra', function (t) {
      ;(this.track_ID = t.readUint32()), t.readUint24()
      var e = t.readUint8()
      ;(this.length_size_of_traf_num = (e >> 4) & 3),
        (this.length_size_of_trun_num = (e >> 2) & 3),
        (this.length_size_of_sample_num = 3 & e),
        (this.entries = [])
      for (var i = t.readUint32(), s = 0; s < i; s++)
        1 === this.version
          ? ((this.time = t.readUint64()), (this.moof_offset = t.readUint64()))
          : ((this.time = t.readUint32()), (this.moof_offset = t.readUint32())),
          (this.traf_number =
            t['readUint' + 8 * (this.length_size_of_traf_num + 1)]()),
          (this.trun_number =
            t['readUint' + 8 * (this.length_size_of_trun_num + 1)]()),
          (this.sample_number =
            t['readUint' + 8 * (this.length_size_of_sample_num + 1)]())
    }),
    d.createFullBoxCtor('tkhd', function (t) {
      1 == this.version
        ? ((this.creation_time = t.readUint64()),
          (this.modification_time = t.readUint64()),
          (this.track_id = t.readUint32()),
          t.readUint32(),
          (this.duration = t.readUint64()))
        : ((this.creation_time = t.readUint32()),
          (this.modification_time = t.readUint32()),
          (this.track_id = t.readUint32()),
          t.readUint32(),
          (this.duration = t.readUint32())),
        t.readUint32Array(2),
        (this.layer = t.readInt16()),
        (this.alternate_group = t.readInt16()),
        (this.volume = t.readInt16() >> 8),
        t.readUint16(),
        (this.matrix = t.readInt32Array(9)),
        (this.width = t.readUint32()),
        (this.height = t.readUint32())
    }),
    d.createBoxCtor('tmax', function (t) {
      this.time = t.readUint32()
    }),
    d.createBoxCtor('tmin', function (t) {
      this.time = t.readUint32()
    }),
    d.createBoxCtor('totl', function (t) {
      this.bytessent = t.readUint32()
    }),
    d.createBoxCtor('tpay', function (t) {
      this.bytessent = t.readUint32()
    }),
    d.createBoxCtor('tpyl', function (t) {
      this.bytessent = t.readUint64()
    }),
    (d.TrackGroupTypeBox.prototype.parse = function (t) {
      this.parseFullHeader(t), (this.track_group_id = t.readUint32())
    }),
    d.createTrackGroupCtor('msrc'),
    (d.TrackReferenceTypeBox = function (t, e, i, s) {
      d.Box.call(this, t, e), (this.hdr_size = i), (this.start = s)
    }),
    (d.TrackReferenceTypeBox.prototype = new d.Box()),
    (d.TrackReferenceTypeBox.prototype.parse = function (t) {
      this.track_ids = t.readUint32Array((this.size - this.hdr_size) / 4)
    }),
    (d.trefBox.prototype.parse = function (t) {
      for (var e, i; t.getPosition() < this.start + this.size; ) {
        if (
          (e = d.parseOneBox(t, !0, this.size - (t.getPosition() - this.start)))
            .code !== d.OK
        )
          return
        ;(i = new d.TrackReferenceTypeBox(e.type, e.size, e.hdr_size, e.start))
          .write === d.Box.prototype.write &&
          'mdat' !== i.type &&
          (s.info(
            'BoxParser',
            'TrackReference ' +
              i.type +
              ' box writing not yet implemented, keeping unparsed data in memory for later write'
          ),
          i.parseDataAndRewind(t)),
          i.parse(t),
          this.boxes.push(i)
      }
    }),
    d.createFullBoxCtor('trep', function (t) {
      for (
        this.track_ID = t.readUint32(), this.boxes = [];
        t.getPosition() < this.start + this.size;

      ) {
        if (
          ((ret = d.parseOneBox(
            t,
            !1,
            this.size - (t.getPosition() - this.start)
          )),
          ret.code !== d.OK)
        )
          return
        ;(box = ret.box), this.boxes.push(box)
      }
    }),
    d.createFullBoxCtor('trex', function (t) {
      ;(this.track_id = t.readUint32()),
        (this.default_sample_description_index = t.readUint32()),
        (this.default_sample_duration = t.readUint32()),
        (this.default_sample_size = t.readUint32()),
        (this.default_sample_flags = t.readUint32())
    }),
    d.createBoxCtor('trpy', function (t) {
      this.bytessent = t.readUint64()
    }),
    d.createFullBoxCtor('trun', function (t) {
      var e = 0
      if (
        ((this.sample_count = t.readUint32()),
        (e += 4),
        this.size - this.hdr_size > e && this.flags & d.TRUN_FLAGS_DATA_OFFSET
          ? ((this.data_offset = t.readInt32()), (e += 4))
          : (this.data_offset = 0),
        this.size - this.hdr_size > e && this.flags & d.TRUN_FLAGS_FIRST_FLAG
          ? ((this.first_sample_flags = t.readUint32()), (e += 4))
          : (this.first_sample_flags = 0),
        (this.sample_duration = []),
        (this.sample_size = []),
        (this.sample_flags = []),
        (this.sample_composition_time_offset = []),
        this.size - this.hdr_size > e)
      )
        for (var i = 0; i < this.sample_count; i++)
          this.flags & d.TRUN_FLAGS_DURATION &&
            (this.sample_duration[i] = t.readUint32()),
            this.flags & d.TRUN_FLAGS_SIZE &&
              (this.sample_size[i] = t.readUint32()),
            this.flags & d.TRUN_FLAGS_FLAGS &&
              (this.sample_flags[i] = t.readUint32()),
            this.flags & d.TRUN_FLAGS_CTS_OFFSET &&
              (0 === this.version
                ? (this.sample_composition_time_offset[i] = t.readUint32())
                : (this.sample_composition_time_offset[i] = t.readInt32()))
    }),
    d.createFullBoxCtor('tsel', function (t) {
      this.switch_group = t.readUint32()
      var e = (this.size - this.hdr_size - 4) / 4
      this.attribute_list = []
      for (var i = 0; i < e; i++) this.attribute_list[i] = t.readUint32()
    }),
    d.createFullBoxCtor('txtC', function (t) {
      this.config = t.readCString()
    }),
    d.createFullBoxCtor('url ', function (t) {
      1 !== this.flags && (this.location = t.readCString())
    }),
    d.createFullBoxCtor('urn ', function (t) {
      ;(this.name = t.readCString()),
        this.size - this.hdr_size - this.name.length - 1 > 0 &&
          (this.location = t.readCString())
    }),
    d.createUUIDBox('a5d40b30e81411ddba2f0800200c9a66', !0, !1, function (t) {
      this.LiveServerManifest = t
        .readString(this.size - this.hdr_size)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }),
    d.createUUIDBox('d08a4f1810f34a82b6c832d8aba183d3', !0, !1, function (t) {
      this.system_id = d.parseHex16(t)
      var e = t.readUint32()
      e > 0 && (this.data = t.readUint8Array(e))
    }),
    d.createUUIDBox('a2394f525a9b4f14a2446c427c648df4', !0, !1),
    d.createUUIDBox('8974dbce7be74c5184f97148f9882554', !0, !1, function (t) {
      ;(this.default_AlgorithmID = t.readUint24()),
        (this.default_IV_size = t.readUint8()),
        (this.default_KID = d.parseHex16(t))
    }),
    d.createUUIDBox('d4807ef2ca3946958e5426cb9e46a79f', !0, !1, function (t) {
      ;(this.fragment_count = t.readUint8()), (this.entries = [])
      for (var e = 0; e < this.fragment_count; e++) {
        var i = {},
          s = 0,
          r = 0
        1 === this.version
          ? ((s = t.readUint64()), (r = t.readUint64()))
          : ((s = t.readUint32()), (r = t.readUint32())),
          (i.absolute_time = s),
          (i.absolute_duration = r),
          this.entries.push(i)
      }
    }),
    d.createUUIDBox('6d1d9b0542d544e680e2141daff757b2', !0, !1, function (t) {
      1 === this.version
        ? ((this.absolute_time = t.readUint64()),
          (this.duration = t.readUint64()))
        : ((this.absolute_time = t.readUint32()),
          (this.duration = t.readUint32()))
    }),
    d.createFullBoxCtor('vmhd', function (t) {
      ;(this.graphicsmode = t.readUint16()),
        (this.opcolor = t.readUint16Array(3))
    }),
    d.createFullBoxCtor('vpcC', function (t) {
      var e
      1 === this.version
        ? ((this.profile = t.readUint8()),
          (this.level = t.readUint8()),
          (e = t.readUint8()),
          (this.bitDepth = e >> 4),
          (this.chromaSubsampling = (e >> 1) & 7),
          (this.videoFullRangeFlag = 1 & e),
          (this.colourPrimaries = t.readUint8()),
          (this.transferCharacteristics = t.readUint8()),
          (this.matrixCoefficients = t.readUint8()),
          (this.codecIntializationDataSize = t.readUint16()),
          (this.codecIntializationData = t.readUint8Array(
            this.codecIntializationDataSize
          )))
        : ((this.profile = t.readUint8()),
          (this.level = t.readUint8()),
          (e = t.readUint8()),
          (this.bitDepth = (e >> 4) & 15),
          (this.colorSpace = 15 & e),
          (e = t.readUint8()),
          (this.chromaSubsampling = (e >> 4) & 15),
          (this.transferFunction = (e >> 1) & 7),
          (this.videoFullRangeFlag = 1 & e),
          (this.codecIntializationDataSize = t.readUint16()),
          (this.codecIntializationData = t.readUint8Array(
            this.codecIntializationDataSize
          )))
    }),
    d.createBoxCtor('vttC', function (t) {
      this.text = t.readString(this.size - this.hdr_size)
    }),
    d.createFullBoxCtor('vvcC', function (t) {
      var e,
        i,
        s = {
          held_bits: void 0,
          num_held_bits: 0,
          stream_read_1_bytes: function (t) {
            ;(this.held_bits = t.readUint8()), (this.num_held_bits = 8)
          },
          stream_read_2_bytes: function (t) {
            ;(this.held_bits = t.readUint16()), (this.num_held_bits = 16)
          },
          extract_bits: function (t) {
            var e =
              (this.held_bits >> (this.num_held_bits - t)) & ((1 << t) - 1)
            return (this.num_held_bits -= t), e
          }
        }
      if (
        (s.stream_read_1_bytes(t),
        s.extract_bits(5),
        (this.lengthSizeMinusOne = s.extract_bits(2)),
        (this.ptl_present_flag = s.extract_bits(1)),
        this.ptl_present_flag)
      ) {
        if (
          (s.stream_read_2_bytes(t),
          (this.ols_idx = s.extract_bits(9)),
          (this.num_sublayers = s.extract_bits(3)),
          (this.constant_frame_rate = s.extract_bits(2)),
          (this.chroma_format_idc = s.extract_bits(2)),
          s.stream_read_1_bytes(t),
          (this.bit_depth_minus8 = s.extract_bits(3)),
          s.extract_bits(5),
          s.stream_read_2_bytes(t),
          s.extract_bits(2),
          (this.num_bytes_constraint_info = s.extract_bits(6)),
          (this.general_profile_idc = s.extract_bits(7)),
          (this.general_tier_flag = s.extract_bits(1)),
          (this.general_level_idc = t.readUint8()),
          s.stream_read_1_bytes(t),
          (this.ptl_frame_only_constraint_flag = s.extract_bits(1)),
          (this.ptl_multilayer_enabled_flag = s.extract_bits(1)),
          (this.general_constraint_info = new Uint8Array(
            this.num_bytes_constraint_info
          )),
          this.num_bytes_constraint_info)
        ) {
          for (e = 0; e < this.num_bytes_constraint_info - 1; e++) {
            var r = s.extract_bits(6)
            s.stream_read_1_bytes(t)
            var n = s.extract_bits(2)
            this.general_constraint_info[e] = (r << 2) | n
          }
          this.general_constraint_info[this.num_bytes_constraint_info - 1] =
            s.extract_bits(6)
        } else s.extract_bits(6)
        for (
          s.stream_read_1_bytes(t),
            this.ptl_sublayer_present_mask = 0,
            i = this.num_sublayers - 2;
          i >= 0;
          --i
        ) {
          var a = s.extract_bits(1)
          this.ptl_sublayer_present_mask |= a << i
        }
        for (i = this.num_sublayers; i <= 8 && this.num_sublayers > 1; ++i)
          s.extract_bits(1)
        for (i = this.num_sublayers - 2; i >= 0; --i)
          this.ptl_sublayer_present_mask & (1 << i) &&
            (this.sublayer_level_idc[i] = t.readUint8())
        if (
          ((this.ptl_num_sub_profiles = t.readUint8()),
          (this.general_sub_profile_idc = []),
          this.ptl_num_sub_profiles)
        )
          for (e = 0; e < this.ptl_num_sub_profiles; e++)
            this.general_sub_profile_idc.push(t.readUint32())
        ;(this.max_picture_width = t.readUint16()),
          (this.max_picture_height = t.readUint16()),
          (this.avg_frame_rate = t.readUint16())
      }
      this.nalu_arrays = []
      var o = t.readUint8()
      for (e = 0; e < o; e++) {
        var h = []
        this.nalu_arrays.push(h),
          s.stream_read_1_bytes(t),
          (h.completeness = s.extract_bits(1)),
          s.extract_bits(2),
          (h.nalu_type = s.extract_bits(5))
        var d = 1
        for (
          13 != h.nalu_type && 12 != h.nalu_type && (d = t.readUint16()), i = 0;
          i < d;
          i++
        ) {
          var p = t.readUint16()
          h.push({ data: t.readUint8Array(p), length: p })
        }
      }
    }),
    d.createFullBoxCtor('vvnC', function (t) {
      var e = strm.readUint8()
      this.lengthSizeMinusOne = 3 & e
    }),
    (d.SampleEntry.prototype.isVideo = function () {
      return !1
    }),
    (d.SampleEntry.prototype.isAudio = function () {
      return !1
    }),
    (d.SampleEntry.prototype.isSubtitle = function () {
      return !1
    }),
    (d.SampleEntry.prototype.isMetadata = function () {
      return !1
    }),
    (d.SampleEntry.prototype.isHint = function () {
      return !1
    }),
    (d.SampleEntry.prototype.getCodec = function () {
      return this.type.replace('.', '')
    }),
    (d.SampleEntry.prototype.getWidth = function () {
      return ''
    }),
    (d.SampleEntry.prototype.getHeight = function () {
      return ''
    }),
    (d.SampleEntry.prototype.getChannelCount = function () {
      return ''
    }),
    (d.SampleEntry.prototype.getSampleRate = function () {
      return ''
    }),
    (d.SampleEntry.prototype.getSampleSize = function () {
      return ''
    }),
    (d.VisualSampleEntry.prototype.isVideo = function () {
      return !0
    }),
    (d.VisualSampleEntry.prototype.getWidth = function () {
      return this.width
    }),
    (d.VisualSampleEntry.prototype.getHeight = function () {
      return this.height
    }),
    (d.AudioSampleEntry.prototype.isAudio = function () {
      return !0
    }),
    (d.AudioSampleEntry.prototype.getChannelCount = function () {
      return this.channel_count
    }),
    (d.AudioSampleEntry.prototype.getSampleRate = function () {
      return this.samplerate
    }),
    (d.AudioSampleEntry.prototype.getSampleSize = function () {
      return this.samplesize
    }),
    (d.SubtitleSampleEntry.prototype.isSubtitle = function () {
      return !0
    }),
    (d.MetadataSampleEntry.prototype.isMetadata = function () {
      return !0
    }),
    (d.decimalToHex = function (t, e) {
      var i = Number(t).toString(16)
      for (e = null == e ? (e = 2) : e; i.length < e; ) i = '0' + i
      return i
    }),
    (d.avc1SampleEntry.prototype.getCodec =
      d.avc2SampleEntry.prototype.getCodec =
      d.avc3SampleEntry.prototype.getCodec =
      d.avc4SampleEntry.prototype.getCodec =
        function () {
          var t = d.SampleEntry.prototype.getCodec.call(this)
          return this.avcC
            ? t +
                '.' +
                d.decimalToHex(this.avcC.AVCProfileIndication) +
                d.decimalToHex(this.avcC.profile_compatibility) +
                d.decimalToHex(this.avcC.AVCLevelIndication)
            : t
        }),
    (d.hev1SampleEntry.prototype.getCodec =
      d.hvc1SampleEntry.prototype.getCodec =
        function () {
          var t,
            e = d.SampleEntry.prototype.getCodec.call(this)
          if (this.hvcC) {
            switch (((e += '.'), this.hvcC.general_profile_space)) {
              case 0:
                e += ''
                break
              case 1:
                e += 'A'
                break
              case 2:
                e += 'B'
                break
              case 3:
                e += 'C'
            }
            ;(e += this.hvcC.general_profile_idc), (e += '.')
            var i = this.hvcC.general_profile_compatibility,
              s = 0
            for (t = 0; t < 32 && ((s |= 1 & i), 31 != t); t++)
              (s <<= 1), (i >>= 1)
            ;(e += d.decimalToHex(s, 0)),
              (e += '.'),
              0 === this.hvcC.general_tier_flag ? (e += 'L') : (e += 'H'),
              (e += this.hvcC.general_level_idc)
            var r = !1,
              n = ''
            for (t = 5; t >= 0; t--)
              (this.hvcC.general_constraint_indicator[t] || r) &&
                ((n =
                  '.' +
                  d.decimalToHex(this.hvcC.general_constraint_indicator[t], 0) +
                  n),
                (r = !0))
            e += n
          }
          return e
        }),
    (d.vvc1SampleEntry.prototype.getCodec =
      d.vvi1SampleEntry.prototype.getCodec =
        function () {
          var t,
            e = d.SampleEntry.prototype.getCodec.call(this)
          if (this.vvcC) {
            ;(e += '.' + this.vvcC.general_profile_idc),
              this.vvcC.general_tier_flag ? (e += '.H') : (e += '.L'),
              (e += this.vvcC.general_level_idc)
            var i = ''
            if (this.vvcC.general_constraint_info) {
              var s,
                r = [],
                n = 0
              for (
                n |= this.vvcC.ptl_frame_only_constraint << 7,
                  n |= this.vvcC.ptl_multilayer_enabled << 6,
                  t = 0;
                t < this.vvcC.general_constraint_info.length;
                ++t
              )
                (n |= (this.vvcC.general_constraint_info[t] >> 2) & 63),
                  r.push(n),
                  n && (s = t),
                  (n = (this.vvcC.general_constraint_info[t] >> 2) & 3)
              if (void 0 === s) i = '.CA'
              else {
                i = '.C'
                var a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
                  o = 0,
                  h = 0
                for (t = 0; t <= s; ++t)
                  for (o = (o << 8) | r[t], h += 8; h >= 5; ) {
                    ;(i += a[(o >> (h - 5)) & 31]), (o &= (1 << (h -= 5)) - 1)
                  }
                h && (i += a[31 & (o <<= 5 - h)])
              }
            }
            e += i
          }
          return e
        }),
    (d.mp4aSampleEntry.prototype.getCodec = function () {
      var t = d.SampleEntry.prototype.getCodec.call(this)
      if (this.esds && this.esds.esd) {
        var e = this.esds.esd.getOTI(),
          i = this.esds.esd.getAudioConfig()
        return t + '.' + d.decimalToHex(e) + (i ? '.' + i : '')
      }
      return t
    }),
    (d.stxtSampleEntry.prototype.getCodec = function () {
      var t = d.SampleEntry.prototype.getCodec.call(this)
      return this.mime_format ? t + '.' + this.mime_format : t
    }),
    (d.vp08SampleEntry.prototype.getCodec =
      d.vp09SampleEntry.prototype.getCodec =
        function () {
          var t = d.SampleEntry.prototype.getCodec.call(this),
            e = this.vpcC.level
          0 == e && (e = '00')
          var i = this.vpcC.bitDepth
          return (
            8 == i && (i = '08'),
            t + '.0' + this.vpcC.profile + '.' + e + '.' + i
          )
        }),
    (d.av01SampleEntry.prototype.getCodec = function () {
      var t,
        e = d.SampleEntry.prototype.getCodec.call(this),
        i = this.av1C.seq_level_idx_0
      return (
        i < 10 && (i = '0' + i),
        2 === this.av1C.seq_profile && 1 === this.av1C.high_bitdepth
          ? (t = 1 === this.av1C.twelve_bit ? '12' : '10')
          : this.av1C.seq_profile <= 2 &&
            (t = 1 === this.av1C.high_bitdepth ? '10' : '08'),
        e +
          '.' +
          this.av1C.seq_profile +
          '.' +
          i +
          (this.av1C.seq_tier_0 ? 'H' : 'M') +
          '.' +
          t
      )
    }),
    (d.Box.prototype.writeHeader = function (t, e) {
      ;(this.size += 8),
        this.size > a && (this.size += 8),
        'uuid' === this.type && (this.size += 16),
        s.debug(
          'BoxWriter',
          'Writing box ' +
            this.type +
            ' of size: ' +
            this.size +
            ' at position ' +
            t.getPosition() +
            (e || '')
        ),
        this.size > a
          ? t.writeUint32(1)
          : ((this.sizePosition = t.getPosition()), t.writeUint32(this.size)),
        t.writeString(this.type, null, 4),
        'uuid' === this.type && t.writeUint8Array(this.uuid),
        this.size > a && t.writeUint64(this.size)
    }),
    (d.FullBox.prototype.writeHeader = function (t) {
      ;(this.size += 4),
        d.Box.prototype.writeHeader.call(
          this,
          t,
          ' v=' + this.version + ' f=' + this.flags
        ),
        t.writeUint8(this.version),
        t.writeUint24(this.flags)
    }),
    (d.Box.prototype.write = function (t) {
      'mdat' === this.type
        ? this.data &&
          ((this.size = this.data.length),
          this.writeHeader(t),
          t.writeUint8Array(this.data))
        : ((this.size = this.data ? this.data.length : 0),
          this.writeHeader(t),
          this.data && t.writeUint8Array(this.data))
    }),
    (d.ContainerBox.prototype.write = function (t) {
      ;(this.size = 0), this.writeHeader(t)
      for (var e = 0; e < this.boxes.length; e++)
        this.boxes[e] &&
          (this.boxes[e].write(t), (this.size += this.boxes[e].size))
      s.debug(
        'BoxWriter',
        'Adjusting box ' + this.type + ' with new size ' + this.size
      ),
        t.adjustUint32(this.sizePosition, this.size)
    }),
    (d.TrackReferenceTypeBox.prototype.write = function (t) {
      ;(this.size = 4 * this.track_ids.length),
        this.writeHeader(t),
        t.writeUint32Array(this.track_ids)
    }),
    (d.avcCBox.prototype.write = function (t) {
      var e
      for (this.size = 7, e = 0; e < this.SPS.length; e++)
        this.size += 2 + this.SPS[e].length
      for (e = 0; e < this.PPS.length; e++) this.size += 2 + this.PPS[e].length
      for (
        this.ext && (this.size += this.ext.length),
          this.writeHeader(t),
          t.writeUint8(this.configurationVersion),
          t.writeUint8(this.AVCProfileIndication),
          t.writeUint8(this.profile_compatibility),
          t.writeUint8(this.AVCLevelIndication),
          t.writeUint8(this.lengthSizeMinusOne + 252),
          t.writeUint8(this.SPS.length + 224),
          e = 0;
        e < this.SPS.length;
        e++
      )
        t.writeUint16(this.SPS[e].length), t.writeUint8Array(this.SPS[e].nalu)
      for (t.writeUint8(this.PPS.length), e = 0; e < this.PPS.length; e++)
        t.writeUint16(this.PPS[e].length), t.writeUint8Array(this.PPS[e].nalu)
      this.ext && t.writeUint8Array(this.ext)
    }),
    (d.co64Box.prototype.write = function (t) {
      var e
      for (
        this.version = 0,
          this.flags = 0,
          this.size = 4 + 8 * this.chunk_offsets.length,
          this.writeHeader(t),
          t.writeUint32(this.chunk_offsets.length),
          e = 0;
        e < this.chunk_offsets.length;
        e++
      )
        t.writeUint64(this.chunk_offsets[e])
    }),
    (d.cslgBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 20),
        this.writeHeader(t),
        t.writeInt32(this.compositionToDTSShift),
        t.writeInt32(this.leastDecodeToDisplayDelta),
        t.writeInt32(this.greatestDecodeToDisplayDelta),
        t.writeInt32(this.compositionStartTime),
        t.writeInt32(this.compositionEndTime)
    }),
    (d.cttsBox.prototype.write = function (t) {
      var e
      for (
        this.version = 0,
          this.flags = 0,
          this.size = 4 + 8 * this.sample_counts.length,
          this.writeHeader(t),
          t.writeUint32(this.sample_counts.length),
          e = 0;
        e < this.sample_counts.length;
        e++
      )
        t.writeUint32(this.sample_counts[e]),
          1 === this.version
            ? t.writeInt32(this.sample_offsets[e])
            : t.writeUint32(this.sample_offsets[e])
    }),
    (d.drefBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 4),
        this.writeHeader(t),
        t.writeUint32(this.entries.length)
      for (var e = 0; e < this.entries.length; e++)
        this.entries[e].write(t), (this.size += this.entries[e].size)
      s.debug(
        'BoxWriter',
        'Adjusting box ' + this.type + ' with new size ' + this.size
      ),
        t.adjustUint32(this.sizePosition, this.size)
    }),
    (d.elngBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = this.extended_language.length),
        this.writeHeader(t),
        t.writeString(this.extended_language)
    }),
    (d.elstBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 4 + 12 * this.entries.length),
        this.writeHeader(t),
        t.writeUint32(this.entries.length)
      for (var e = 0; e < this.entries.length; e++) {
        var i = this.entries[e]
        t.writeUint32(i.segment_duration),
          t.writeInt32(i.media_time),
          t.writeInt16(i.media_rate_integer),
          t.writeInt16(i.media_rate_fraction)
      }
    }),
    (d.emsgBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size =
          16 +
          this.message_data.length +
          (this.scheme_id_uri.length + 1) +
          (this.value.length + 1)),
        this.writeHeader(t),
        t.writeCString(this.scheme_id_uri),
        t.writeCString(this.value),
        t.writeUint32(this.timescale),
        t.writeUint32(this.presentation_time_delta),
        t.writeUint32(this.event_duration),
        t.writeUint32(this.id),
        t.writeUint8Array(this.message_data)
    }),
    (d.ftypBox.prototype.write = function (t) {
      ;(this.size = 8 + 4 * this.compatible_brands.length),
        this.writeHeader(t),
        t.writeString(this.major_brand, null, 4),
        t.writeUint32(this.minor_version)
      for (var e = 0; e < this.compatible_brands.length; e++)
        t.writeString(this.compatible_brands[e], null, 4)
    }),
    (d.hdlrBox.prototype.write = function (t) {
      ;(this.size = 20 + this.name.length + 1),
        (this.version = 0),
        (this.flags = 0),
        this.writeHeader(t),
        t.writeUint32(0),
        t.writeString(this.handler, null, 4),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeCString(this.name)
    }),
    (d.kindBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = this.schemeURI.length + 1 + (this.value.length + 1)),
        this.writeHeader(t),
        t.writeCString(this.schemeURI),
        t.writeCString(this.value)
    }),
    (d.mdhdBox.prototype.write = function (t) {
      ;(this.size = 20),
        (this.flags = 0),
        (this.version = 0),
        this.writeHeader(t),
        t.writeUint32(this.creation_time),
        t.writeUint32(this.modification_time),
        t.writeUint32(this.timescale),
        t.writeUint32(this.duration),
        t.writeUint16(this.language),
        t.writeUint16(0)
    }),
    (d.mehdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 4),
        this.writeHeader(t),
        t.writeUint32(this.fragment_duration)
    }),
    (d.mfhdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 4),
        this.writeHeader(t),
        t.writeUint32(this.sequence_number)
    }),
    (d.mvhdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 96),
        this.writeHeader(t),
        t.writeUint32(this.creation_time),
        t.writeUint32(this.modification_time),
        t.writeUint32(this.timescale),
        t.writeUint32(this.duration),
        t.writeUint32(this.rate),
        t.writeUint16(this.volume << 8),
        t.writeUint16(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32Array(this.matrix),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(this.next_track_id)
    }),
    (d.SampleEntry.prototype.writeHeader = function (t) {
      ;(this.size = 8),
        d.Box.prototype.writeHeader.call(this, t),
        t.writeUint8(0),
        t.writeUint8(0),
        t.writeUint8(0),
        t.writeUint8(0),
        t.writeUint8(0),
        t.writeUint8(0),
        t.writeUint16(this.data_reference_index)
    }),
    (d.SampleEntry.prototype.writeFooter = function (t) {
      for (var e = 0; e < this.boxes.length; e++)
        this.boxes[e].write(t), (this.size += this.boxes[e].size)
      s.debug(
        'BoxWriter',
        'Adjusting box ' + this.type + ' with new size ' + this.size
      ),
        t.adjustUint32(this.sizePosition, this.size)
    }),
    (d.SampleEntry.prototype.write = function (t) {
      this.writeHeader(t),
        t.writeUint8Array(this.data),
        (this.size += this.data.length),
        s.debug(
          'BoxWriter',
          'Adjusting box ' + this.type + ' with new size ' + this.size
        ),
        t.adjustUint32(this.sizePosition, this.size)
    }),
    (d.VisualSampleEntry.prototype.write = function (t) {
      this.writeHeader(t),
        (this.size += 70),
        t.writeUint16(0),
        t.writeUint16(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint16(this.width),
        t.writeUint16(this.height),
        t.writeUint32(this.horizresolution),
        t.writeUint32(this.vertresolution),
        t.writeUint32(0),
        t.writeUint16(this.frame_count),
        t.writeUint8(Math.min(31, this.compressorname.length)),
        t.writeString(this.compressorname, null, 31),
        t.writeUint16(this.depth),
        t.writeInt16(-1),
        this.writeFooter(t)
    }),
    (d.AudioSampleEntry.prototype.write = function (t) {
      this.writeHeader(t),
        (this.size += 20),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeUint16(this.channel_count),
        t.writeUint16(this.samplesize),
        t.writeUint16(0),
        t.writeUint16(0),
        t.writeUint32(this.samplerate << 16),
        this.writeFooter(t)
    }),
    (d.stppSampleEntry.prototype.write = function (t) {
      this.writeHeader(t),
        (this.size +=
          this.namespace.length +
          1 +
          this.schema_location.length +
          1 +
          this.auxiliary_mime_types.length +
          1),
        t.writeCString(this.namespace),
        t.writeCString(this.schema_location),
        t.writeCString(this.auxiliary_mime_types),
        this.writeFooter(t)
    }),
    (d.SampleGroupEntry.prototype.write = function (t) {
      t.writeUint8Array(this.data)
    }),
    (d.sbgpBox.prototype.write = function (t) {
      ;(this.version = 1),
        (this.flags = 0),
        (this.size = 12 + 8 * this.entries.length),
        this.writeHeader(t),
        t.writeString(this.grouping_type, null, 4),
        t.writeUint32(this.grouping_type_parameter),
        t.writeUint32(this.entries.length)
      for (var e = 0; e < this.entries.length; e++) {
        var i = this.entries[e]
        t.writeInt32(i.sample_count), t.writeInt32(i.group_description_index)
      }
    }),
    (d.sgpdBox.prototype.write = function (t) {
      var e, i
      for (this.flags = 0, this.size = 12, e = 0; e < this.entries.length; e++)
        (i = this.entries[e]),
          1 === this.version &&
            (0 === this.default_length && (this.size += 4),
            (this.size += i.data.length))
      for (
        this.writeHeader(t),
          t.writeString(this.grouping_type, null, 4),
          1 === this.version && t.writeUint32(this.default_length),
          this.version >= 2 &&
            t.writeUint32(this.default_sample_description_index),
          t.writeUint32(this.entries.length),
          e = 0;
        e < this.entries.length;
        e++
      )
        (i = this.entries[e]),
          1 === this.version &&
            0 === this.default_length &&
            t.writeUint32(i.description_length),
          i.write(t)
    }),
    (d.sidxBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 20 + 12 * this.references.length),
        this.writeHeader(t),
        t.writeUint32(this.reference_ID),
        t.writeUint32(this.timescale),
        t.writeUint32(this.earliest_presentation_time),
        t.writeUint32(this.first_offset),
        t.writeUint16(0),
        t.writeUint16(this.references.length)
      for (var e = 0; e < this.references.length; e++) {
        var i = this.references[e]
        t.writeUint32((i.reference_type << 31) | i.referenced_size),
          t.writeUint32(i.subsegment_duration),
          t.writeUint32(
            (i.starts_with_SAP << 31) | (i.SAP_type << 28) | i.SAP_delta_time
          )
      }
    }),
    (d.smhdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 1),
        (this.size = 4),
        this.writeHeader(t),
        t.writeUint16(this.balance),
        t.writeUint16(0)
    }),
    (d.stcoBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 4 + 4 * this.chunk_offsets.length),
        this.writeHeader(t),
        t.writeUint32(this.chunk_offsets.length),
        t.writeUint32Array(this.chunk_offsets)
    }),
    (d.stscBox.prototype.write = function (t) {
      var e
      for (
        this.version = 0,
          this.flags = 0,
          this.size = 4 + 12 * this.first_chunk.length,
          this.writeHeader(t),
          t.writeUint32(this.first_chunk.length),
          e = 0;
        e < this.first_chunk.length;
        e++
      )
        t.writeUint32(this.first_chunk[e]),
          t.writeUint32(this.samples_per_chunk[e]),
          t.writeUint32(this.sample_description_index[e])
    }),
    (d.stsdBox.prototype.write = function (t) {
      var e
      for (
        this.version = 0,
          this.flags = 0,
          this.size = 0,
          this.writeHeader(t),
          t.writeUint32(this.entries.length),
          this.size += 4,
          e = 0;
        e < this.entries.length;
        e++
      )
        this.entries[e].write(t), (this.size += this.entries[e].size)
      s.debug(
        'BoxWriter',
        'Adjusting box ' + this.type + ' with new size ' + this.size
      ),
        t.adjustUint32(this.sizePosition, this.size)
    }),
    (d.stshBox.prototype.write = function (t) {
      var e
      for (
        this.version = 0,
          this.flags = 0,
          this.size = 4 + 8 * this.shadowed_sample_numbers.length,
          this.writeHeader(t),
          t.writeUint32(this.shadowed_sample_numbers.length),
          e = 0;
        e < this.shadowed_sample_numbers.length;
        e++
      )
        t.writeUint32(this.shadowed_sample_numbers[e]),
          t.writeUint32(this.sync_sample_numbers[e])
    }),
    (d.stssBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 4 + 4 * this.sample_numbers.length),
        this.writeHeader(t),
        t.writeUint32(this.sample_numbers.length),
        t.writeUint32Array(this.sample_numbers)
    }),
    (d.stszBox.prototype.write = function (t) {
      var e,
        i = !0
      if (((this.version = 0), (this.flags = 0), this.sample_sizes.length > 0))
        for (e = 0; e + 1 < this.sample_sizes.length; ) {
          if (this.sample_sizes[e + 1] !== this.sample_sizes[0]) {
            i = !1
            break
          }
          e++
        }
      else i = !1
      ;(this.size = 8),
        i || (this.size += 4 * this.sample_sizes.length),
        this.writeHeader(t),
        i ? t.writeUint32(this.sample_sizes[0]) : t.writeUint32(0),
        t.writeUint32(this.sample_sizes.length),
        i || t.writeUint32Array(this.sample_sizes)
    }),
    (d.sttsBox.prototype.write = function (t) {
      var e
      for (
        this.version = 0,
          this.flags = 0,
          this.size = 4 + 8 * this.sample_counts.length,
          this.writeHeader(t),
          t.writeUint32(this.sample_counts.length),
          e = 0;
        e < this.sample_counts.length;
        e++
      )
        t.writeUint32(this.sample_counts[e]),
          t.writeUint32(this.sample_deltas[e])
    }),
    (d.tfdtBox.prototype.write = function (t) {
      var e = Math.pow(2, 32) - 1
      ;(this.version = this.baseMediaDecodeTime > e ? 1 : 0),
        (this.flags = 0),
        (this.size = 4),
        1 === this.version && (this.size += 4),
        this.writeHeader(t),
        1 === this.version
          ? t.writeUint64(this.baseMediaDecodeTime)
          : t.writeUint32(this.baseMediaDecodeTime)
    }),
    (d.tfhdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.size = 4),
        this.flags & d.TFHD_FLAG_BASE_DATA_OFFSET && (this.size += 8),
        this.flags & d.TFHD_FLAG_SAMPLE_DESC && (this.size += 4),
        this.flags & d.TFHD_FLAG_SAMPLE_DUR && (this.size += 4),
        this.flags & d.TFHD_FLAG_SAMPLE_SIZE && (this.size += 4),
        this.flags & d.TFHD_FLAG_SAMPLE_FLAGS && (this.size += 4),
        this.writeHeader(t),
        t.writeUint32(this.track_id),
        this.flags & d.TFHD_FLAG_BASE_DATA_OFFSET &&
          t.writeUint64(this.base_data_offset),
        this.flags & d.TFHD_FLAG_SAMPLE_DESC &&
          t.writeUint32(this.default_sample_description_index),
        this.flags & d.TFHD_FLAG_SAMPLE_DUR &&
          t.writeUint32(this.default_sample_duration),
        this.flags & d.TFHD_FLAG_SAMPLE_SIZE &&
          t.writeUint32(this.default_sample_size),
        this.flags & d.TFHD_FLAG_SAMPLE_FLAGS &&
          t.writeUint32(this.default_sample_flags)
    }),
    (d.tkhdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.size = 80),
        this.writeHeader(t),
        t.writeUint32(this.creation_time),
        t.writeUint32(this.modification_time),
        t.writeUint32(this.track_id),
        t.writeUint32(0),
        t.writeUint32(this.duration),
        t.writeUint32(0),
        t.writeUint32(0),
        t.writeInt16(this.layer),
        t.writeInt16(this.alternate_group),
        t.writeInt16(this.volume << 8),
        t.writeUint16(0),
        t.writeInt32Array(this.matrix),
        t.writeUint32(this.width),
        t.writeUint32(this.height)
    }),
    (d.trexBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size = 20),
        this.writeHeader(t),
        t.writeUint32(this.track_id),
        t.writeUint32(this.default_sample_description_index),
        t.writeUint32(this.default_sample_duration),
        t.writeUint32(this.default_sample_size),
        t.writeUint32(this.default_sample_flags)
    }),
    (d.trunBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.size = 4),
        this.flags & d.TRUN_FLAGS_DATA_OFFSET && (this.size += 4),
        this.flags & d.TRUN_FLAGS_FIRST_FLAG && (this.size += 4),
        this.flags & d.TRUN_FLAGS_DURATION &&
          (this.size += 4 * this.sample_duration.length),
        this.flags & d.TRUN_FLAGS_SIZE &&
          (this.size += 4 * this.sample_size.length),
        this.flags & d.TRUN_FLAGS_FLAGS &&
          (this.size += 4 * this.sample_flags.length),
        this.flags & d.TRUN_FLAGS_CTS_OFFSET &&
          (this.size += 4 * this.sample_composition_time_offset.length),
        this.writeHeader(t),
        t.writeUint32(this.sample_count),
        this.flags & d.TRUN_FLAGS_DATA_OFFSET &&
          ((this.data_offset_position = t.getPosition()),
          t.writeInt32(this.data_offset)),
        this.flags & d.TRUN_FLAGS_FIRST_FLAG &&
          t.writeUint32(this.first_sample_flags)
      for (var e = 0; e < this.sample_count; e++)
        this.flags & d.TRUN_FLAGS_DURATION &&
          t.writeUint32(this.sample_duration[e]),
          this.flags & d.TRUN_FLAGS_SIZE && t.writeUint32(this.sample_size[e]),
          this.flags & d.TRUN_FLAGS_FLAGS &&
            t.writeUint32(this.sample_flags[e]),
          this.flags & d.TRUN_FLAGS_CTS_OFFSET &&
            (0 === this.version
              ? t.writeUint32(this.sample_composition_time_offset[e])
              : t.writeInt32(this.sample_composition_time_offset[e]))
    }),
    (d['url Box'].prototype.write = function (t) {
      ;(this.version = 0),
        this.location
          ? ((this.flags = 0), (this.size = this.location.length + 1))
          : ((this.flags = 1), (this.size = 0)),
        this.writeHeader(t),
        this.location && t.writeCString(this.location)
    }),
    (d['urn Box'].prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 0),
        (this.size =
          this.name.length +
          1 +
          (this.location ? this.location.length + 1 : 0)),
        this.writeHeader(t),
        t.writeCString(this.name),
        this.location && t.writeCString(this.location)
    }),
    (d.vmhdBox.prototype.write = function (t) {
      ;(this.version = 0),
        (this.flags = 1),
        (this.size = 8),
        this.writeHeader(t),
        t.writeUint16(this.graphicsmode),
        t.writeUint16Array(this.opcolor)
    }),
    (d.cttsBox.prototype.unpack = function (t) {
      var e, i, s
      for (s = 0, e = 0; e < this.sample_counts.length; e++)
        for (i = 0; i < this.sample_counts[e]; i++)
          (t[s].pts = t[s].dts + this.sample_offsets[e]), s++
    }),
    (d.sttsBox.prototype.unpack = function (t) {
      var e, i, s
      for (s = 0, e = 0; e < this.sample_counts.length; e++)
        for (i = 0; i < this.sample_counts[e]; i++)
          (t[s].dts = 0 === s ? 0 : t[s - 1].dts + this.sample_deltas[e]), s++
    }),
    (d.stcoBox.prototype.unpack = function (t) {
      var e
      for (e = 0; e < this.chunk_offsets.length; e++)
        t[e].offset = this.chunk_offsets[e]
    }),
    (d.stscBox.prototype.unpack = function (t) {
      var e, i, s, r, n
      for (r = 0, n = 0, e = 0; e < this.first_chunk.length; e++)
        for (
          i = 0;
          i <
          (e + 1 < this.first_chunk.length ? this.first_chunk[e + 1] : 1 / 0);
          i++
        )
          for (n++, s = 0; s < this.samples_per_chunk[e]; s++) {
            if (!t[r]) return
            ;(t[r].description_index = this.sample_description_index[e]),
              (t[r].chunk_index = n),
              r++
          }
    }),
    (d.stszBox.prototype.unpack = function (t) {
      var e
      for (e = 0; e < this.sample_sizes.length; e++)
        t[e].size = this.sample_sizes[e]
    }),
    (d.DIFF_BOXES_PROP_NAMES = [
      'boxes',
      'entries',
      'references',
      'subsamples',
      'items',
      'item_infos',
      'extents',
      'associations',
      'subsegments',
      'ranges',
      'seekLists',
      'seekPoints',
      'esd',
      'levels'
    ]),
    (d.DIFF_PRIMITIVE_ARRAY_PROP_NAMES = [
      'compatible_brands',
      'matrix',
      'opcolor',
      'sample_counts',
      'sample_counts',
      'sample_deltas',
      'first_chunk',
      'samples_per_chunk',
      'sample_sizes',
      'chunk_offsets',
      'sample_offsets',
      'sample_description_index',
      'sample_duration'
    ]),
    (d.boxEqualFields = function (t, e) {
      if (t && !e) return !1
      var i
      for (i in t)
        if (
          !(
            d.DIFF_BOXES_PROP_NAMES.indexOf(i) > -1 ||
            t[i] instanceof d.Box ||
            e[i] instanceof d.Box ||
            void 0 === t[i] ||
            void 0 === e[i] ||
            'function' == typeof t[i] ||
            'function' == typeof e[i] ||
            (t.subBoxNames && t.subBoxNames.indexOf(i.slice(0, 4)) > -1) ||
            (e.subBoxNames && e.subBoxNames.indexOf(i.slice(0, 4)) > -1) ||
            'data' === i ||
            'start' === i ||
            'size' === i ||
            'creation_time' === i ||
            'modification_time' === i ||
            d.DIFF_PRIMITIVE_ARRAY_PROP_NAMES.indexOf(i) > -1 ||
            t[i] === e[i]
          )
        )
          return !1
      return !0
    }),
    (d.boxEqual = function (t, e) {
      if (!d.boxEqualFields(t, e)) return !1
      for (var i = 0; i < d.DIFF_BOXES_PROP_NAMES.length; i++) {
        var s = d.DIFF_BOXES_PROP_NAMES[i]
        if (t[s] && e[s] && !d.boxEqual(t[s], e[s])) return !1
      }
      return !0
    })
  var p = function () {}
  p.prototype.parseSample = function (t) {
    var e,
      i = {}
    i.resources = []
    var s = new r(t.data.buffer)
    if (t.subsamples && 0 !== t.subsamples.length) {
      if (
        ((i.documentString = s.readString(t.subsamples[0].size)),
        t.subsamples.length > 1)
      )
        for (e = 1; e < t.subsamples.length; e++)
          i.resources[e] = s.readUint8Array(t.subsamples[e].size)
    } else i.documentString = s.readString(t.data.length)
    return (
      'undefined' != typeof DOMParser &&
        (i.document = new DOMParser().parseFromString(
          i.documentString,
          'application/xml'
        )),
      i
    )
  }
  var l = function () {}
  ;(l.prototype.parseSample = function (t) {
    return new r(t.data.buffer).readString(t.data.length)
  }),
    (l.prototype.parseConfig = function (t) {
      var e = new r(t.buffer)
      return e.readUint32(), e.readCString()
    }),
    (t.XMLSubtitlein4Parser = p),
    (t.Textin4Parser = l)
  var f = function (t) {
    ;(this.stream = t || new o()),
      (this.boxes = []),
      (this.mdats = []),
      (this.moofs = []),
      (this.isProgressive = !1),
      (this.moovStartFound = !1),
      (this.onMoovStart = null),
      (this.moovStartSent = !1),
      (this.onReady = null),
      (this.readySent = !1),
      (this.onSegment = null),
      (this.onSamples = null),
      (this.onError = null),
      (this.sampleListBuilt = !1),
      (this.fragmentedTracks = []),
      (this.extractedTracks = []),
      (this.isFragmentationInitialized = !1),
      (this.sampleProcessingStarted = !1),
      (this.nextMoofNumber = 0),
      (this.itemListBuilt = !1),
      (this.onSidx = null),
      (this.sidxSent = !1)
  }
  ;(f.prototype.setSegmentOptions = function (t, e, i) {
    var s = this.getTrackById(t)
    if (s) {
      var r = {}
      this.fragmentedTracks.push(r),
        (r.id = t),
        (r.user = e),
        (r.trak = s),
        (s.nextSample = 0),
        (r.segmentStream = null),
        (r.nb_samples = 1e3),
        (r.rapAlignement = !0),
        i &&
          (i.nbSamples && (r.nb_samples = i.nbSamples),
          i.rapAlignement && (r.rapAlignement = i.rapAlignement))
    }
  }),
    (f.prototype.unsetSegmentOptions = function (t) {
      for (var e = -1, i = 0; i < this.fragmentedTracks.length; i++) {
        this.fragmentedTracks[i].id == t && (e = i)
      }
      e > -1 && this.fragmentedTracks.splice(e, 1)
    }),
    (f.prototype.setExtractionOptions = function (t, e, i) {
      var s = this.getTrackById(t)
      if (s) {
        var r = {}
        this.extractedTracks.push(r),
          (r.id = t),
          (r.user = e),
          (r.trak = s),
          (s.nextSample = 0),
          (r.nb_samples = 1e3),
          (r.samples = []),
          i && i.nbSamples && (r.nb_samples = i.nbSamples)
      }
    }),
    (f.prototype.unsetExtractionOptions = function (t) {
      for (var e = -1, i = 0; i < this.extractedTracks.length; i++) {
        this.extractedTracks[i].id == t && (e = i)
      }
      e > -1 && this.extractedTracks.splice(e, 1)
    }),
    (f.prototype.parse = function () {
      var t, e
      if (!this.restoreParsePosition || this.restoreParsePosition())
        for (;;) {
          if (this.hasIncompleteMdat && this.hasIncompleteMdat()) {
            if (this.processIncompleteMdat()) continue
            return
          }
          if (
            (this.saveParsePosition && this.saveParsePosition(),
            (t = d.parseOneBox(this.stream, false)).code ===
              d.ERR_NOT_ENOUGH_DATA)
          ) {
            if (this.processIncompleteBox) {
              if (this.processIncompleteBox(t)) continue
              return
            }
            return
          }
          var i
          switch (
            ((i = 'uuid' !== (e = t.box).type ? e.type : e.uuid),
            this.boxes.push(e),
            i)
          ) {
            case 'mdat':
              this.mdats.push(e)
              break
            case 'moof':
              this.moofs.push(e)
              break
            case 'moov':
              ;(this.moovStartFound = !0),
                0 === this.mdats.length && (this.isProgressive = !0)
            default:
              void 0 !== this[i] &&
                s.warn(
                  'ISOFile',
                  'Duplicate Box of type: ' +
                    i +
                    ', overriding previous occurrence'
                ),
                (this[i] = e)
          }
          this.updateUsedBytes && this.updateUsedBytes(e, t)
        }
    }),
    (f.prototype.checkBuffer = function (t) {
      if (null == t) throw 'Buffer must be defined and non empty'
      if (void 0 === t.fileStart) throw 'Buffer must have a fileStart property'
      return 0 === t.byteLength
        ? (s.warn(
            'ISOFile',
            'Ignoring empty buffer (fileStart: ' + t.fileStart + ')'
          ),
          this.stream.logBufferLevel(),
          !1)
        : (s.info(
            'ISOFile',
            'Processing buffer (fileStart: ' + t.fileStart + ')'
          ),
          (t.usedBytes = 0),
          this.stream.insertBuffer(t),
          this.stream.logBufferLevel(),
          !!this.stream.initialized() ||
            (s.warn('ISOFile', 'Not ready to start parsing'), !1))
    }),
    (f.prototype.appendBuffer = function (t, e) {
      var i
      if (this.checkBuffer(t))
        return (
          this.parse(),
          this.moovStartFound &&
            !this.moovStartSent &&
            ((this.moovStartSent = !0), this.onMoovStart && this.onMoovStart()),
          this.moov
            ? (this.sampleListBuilt ||
                (this.buildSampleLists(), (this.sampleListBuilt = !0)),
              this.updateSampleLists(),
              this.onReady &&
                !this.readySent &&
                ((this.readySent = !0), this.onReady(this.getInfo())),
              this.processSamples(e),
              this.nextSeekPosition
                ? ((i = this.nextSeekPosition),
                  (this.nextSeekPosition = void 0))
                : (i = this.nextParsePosition),
              this.stream.getEndFilePositionAfter &&
                (i = this.stream.getEndFilePositionAfter(i)))
            : (i = this.nextParsePosition ? this.nextParsePosition : 0),
          this.sidx &&
            this.onSidx &&
            !this.sidxSent &&
            (this.onSidx(this.sidx), (this.sidxSent = !0)),
          this.meta &&
            (this.flattenItemInfo &&
              !this.itemListBuilt &&
              (this.flattenItemInfo(), (this.itemListBuilt = !0)),
            this.processItems && this.processItems(this.onItem)),
          this.stream.cleanBuffers &&
            (s.info(
              'ISOFile',
              'Done processing buffer (fileStart: ' +
                t.fileStart +
                ') - next buffer to fetch should have a fileStart position of ' +
                i
            ),
            this.stream.logBufferLevel(),
            this.stream.cleanBuffers(),
            this.stream.logBufferLevel(!0),
            s.info(
              'ISOFile',
              'Sample data size in memory: ' + this.getAllocatedSampleDataSize()
            )),
          i
        )
    }),
    (f.prototype.getInfo = function () {
      var t,
        e,
        i,
        s,
        r,
        n,
        a = {},
        o = new Date('1904-01-01T00:00:00Z').getTime()
      if (this.moov)
        for (
          a.hasMoov = !0,
            a.duration = this.moov.mvhd.duration,
            a.timescale = this.moov.mvhd.timescale,
            a.isFragmented = null != this.moov.mvex,
            a.isFragmented &&
              this.moov.mvex.mehd &&
              (a.fragment_duration = this.moov.mvex.mehd.fragment_duration),
            a.isProgressive = this.isProgressive,
            a.hasIOD = null != this.moov.iods,
            a.brands = [],
            a.brands.push(this.ftyp.major_brand),
            a.brands = a.brands.concat(this.ftyp.compatible_brands),
            a.created = new Date(o + 1e3 * this.moov.mvhd.creation_time),
            a.modified = new Date(o + 1e3 * this.moov.mvhd.modification_time),
            a.tracks = [],
            a.audioTracks = [],
            a.videoTracks = [],
            a.subtitleTracks = [],
            a.metadataTracks = [],
            a.hintTracks = [],
            a.otherTracks = [],
            t = 0;
          t < this.moov.traks.length;
          t++
        ) {
          if (
            ((n = (i = this.moov.traks[t]).mdia.minf.stbl.stsd.entries[0]),
            (s = {}),
            a.tracks.push(s),
            (s.id = i.tkhd.track_id),
            (s.name = i.mdia.hdlr.name),
            (s.references = []),
            i.tref)
          )
            for (e = 0; e < i.tref.boxes.length; e++)
              (r = {}),
                s.references.push(r),
                (r.type = i.tref.boxes[e].type),
                (r.track_ids = i.tref.boxes[e].track_ids)
          i.edts && (s.edits = i.edts.elst.entries),
            (s.created = new Date(o + 1e3 * i.tkhd.creation_time)),
            (s.modified = new Date(o + 1e3 * i.tkhd.modification_time)),
            (s.movie_duration = i.tkhd.duration),
            (s.movie_timescale = a.timescale),
            (s.layer = i.tkhd.layer),
            (s.alternate_group = i.tkhd.alternate_group),
            (s.volume = i.tkhd.volume),
            (s.matrix = i.tkhd.matrix),
            (s.track_width = i.tkhd.width / 65536),
            (s.track_height = i.tkhd.height / 65536),
            (s.timescale = i.mdia.mdhd.timescale),
            (s.cts_shift = i.mdia.minf.stbl.cslg),
            (s.duration = i.mdia.mdhd.duration),
            (s.samples_duration = i.samples_duration),
            (s.codec = n.getCodec()),
            (s.kind =
              i.udta && i.udta.kinds.length
                ? i.udta.kinds[0]
                : { schemeURI: '', value: '' }),
            (s.language = i.mdia.elng
              ? i.mdia.elng.extended_language
              : i.mdia.mdhd.languageString),
            (s.nb_samples = i.samples.length),
            (s.size = i.samples_size),
            (s.bitrate = (8 * s.size * s.timescale) / s.samples_duration),
            n.isAudio()
              ? ((s.type = 'audio'),
                a.audioTracks.push(s),
                (s.audio = {}),
                (s.audio.sample_rate = n.getSampleRate()),
                (s.audio.channel_count = n.getChannelCount()),
                (s.audio.sample_size = n.getSampleSize()))
              : n.isVideo()
                ? ((s.type = 'video'),
                  a.videoTracks.push(s),
                  (s.video = {}),
                  (s.video.width = n.getWidth()),
                  (s.video.height = n.getHeight()))
                : n.isSubtitle()
                  ? ((s.type = 'subtitles'), a.subtitleTracks.push(s))
                  : n.isHint()
                    ? ((s.type = 'metadata'), a.hintTracks.push(s))
                    : n.isMetadata()
                      ? ((s.type = 'metadata'), a.metadataTracks.push(s))
                      : ((s.type = 'metadata'), a.otherTracks.push(s))
        }
      else a.hasMoov = !1
      if (((a.mime = ''), a.hasMoov && a.tracks)) {
        for (
          a.videoTracks && a.videoTracks.length > 0
            ? (a.mime += 'video/mp4; codecs="')
            : a.audioTracks && a.audioTracks.length > 0
              ? (a.mime += 'audio/mp4; codecs="')
              : (a.mime += 'application/mp4; codecs="'),
            t = 0;
          t < a.tracks.length;
          t++
        )
          0 !== t && (a.mime += ','), (a.mime += a.tracks[t].codec)
        ;(a.mime += '"; profiles="'),
          (a.mime += this.ftyp.compatible_brands.join()),
          (a.mime += '"')
      }
      return a
    }),
    (f.prototype.processSamples = function (t) {
      var e, i
      if (this.sampleProcessingStarted) {
        if (this.isFragmentationInitialized && null !== this.onSegment)
          for (e = 0; e < this.fragmentedTracks.length; e++) {
            var r = this.fragmentedTracks[e]
            for (
              i = r.trak;
              i.nextSample < i.samples.length && this.sampleProcessingStarted;

            ) {
              s.debug(
                'ISOFile',
                'Creating media fragment on track #' +
                  r.id +
                  ' for sample ' +
                  i.nextSample
              )
              var n = this.createFragment(r.id, i.nextSample, r.segmentStream)
              if (!n) break
              if (
                ((r.segmentStream = n),
                i.nextSample++,
                (i.nextSample % r.nb_samples == 0 ||
                  t ||
                  i.nextSample >= i.samples.length) &&
                  (s.info(
                    'ISOFile',
                    'Sending fragmented data on track #' +
                      r.id +
                      ' for samples [' +
                      Math.max(0, i.nextSample - r.nb_samples) +
                      ',' +
                      (i.nextSample - 1) +
                      ']'
                  ),
                  s.info(
                    'ISOFile',
                    'Sample data size in memory: ' +
                      this.getAllocatedSampleDataSize()
                  ),
                  this.onSegment &&
                    this.onSegment(
                      r.id,
                      r.user,
                      r.segmentStream.buffer,
                      i.nextSample,
                      t || i.nextSample >= i.samples.length
                    ),
                  (r.segmentStream = null),
                  r !== this.fragmentedTracks[e]))
              )
                break
            }
          }
        if (null !== this.onSamples)
          for (e = 0; e < this.extractedTracks.length; e++) {
            var a = this.extractedTracks[e]
            for (
              i = a.trak;
              i.nextSample < i.samples.length && this.sampleProcessingStarted;

            ) {
              s.debug(
                'ISOFile',
                'Exporting on track #' + a.id + ' sample #' + i.nextSample
              )
              var o = this.getSample(i, i.nextSample)
              if (!o) break
              if (
                (i.nextSample++,
                a.samples.push(o),
                (i.nextSample % a.nb_samples == 0 ||
                  i.nextSample >= i.samples.length) &&
                  (s.debug(
                    'ISOFile',
                    'Sending samples on track #' +
                      a.id +
                      ' for sample ' +
                      i.nextSample
                  ),
                  this.onSamples && this.onSamples(a.id, a.user, a.samples),
                  (a.samples = []),
                  a !== this.extractedTracks[e]))
              )
                break
            }
          }
      }
    }),
    (f.prototype.getBox = function (t) {
      var e = this.getBoxes(t, !0)
      return e.length ? e[0] : null
    }),
    (f.prototype.getBoxes = function (t, e) {
      var i = []
      return f._sweep.call(this, t, i, e), i
    }),
    (f._sweep = function (t, e, i) {
      for (var s in (this.type && this.type == t && e.push(this), this.boxes)) {
        if (e.length && i) return
        f._sweep.call(this.boxes[s], t, e, i)
      }
    }),
    (f.prototype.getTrackSamplesInfo = function (t) {
      var e = this.getTrackById(t)
      return e ? e.samples : void 0
    }),
    (f.prototype.getTrackSample = function (t, e) {
      var i = this.getTrackById(t)
      return this.getSample(i, e)
    }),
    (f.prototype.releaseUsedSamples = function (t, e) {
      var i = 0,
        r = this.getTrackById(t)
      r.lastValidSample || (r.lastValidSample = 0)
      for (var n = r.lastValidSample; n < e; n++) i += this.releaseSample(r, n)
      s.info(
        'ISOFile',
        'Track #' +
          t +
          ' released samples up to ' +
          e +
          ' (released size: ' +
          i +
          ', remaining: ' +
          this.samplesDataSize +
          ')'
      ),
        (r.lastValidSample = e)
    }),
    (f.prototype.start = function () {
      ;(this.sampleProcessingStarted = !0), this.processSamples(!1)
    }),
    (f.prototype.stop = function () {
      this.sampleProcessingStarted = !1
    }),
    (f.prototype.flush = function () {
      s.info('ISOFile', 'Flushing remaining samples'),
        this.updateSampleLists(),
        this.processSamples(!0),
        this.stream.cleanBuffers(),
        this.stream.logBufferLevel(!0)
    }),
    (f.prototype.seekTrack = function (t, e, i) {
      var r,
        n,
        a,
        o,
        h = 0,
        d = 0
      if (0 === i.samples.length)
        return (
          s.info(
            'ISOFile',
            'No sample in track, cannot seek! Using time ' +
              s.getDurationString(0, 1) +
              ' and offset: 0'
          ),
          { offset: 0, time: 0 }
        )
      for (r = 0; r < i.samples.length; r++) {
        if (((n = i.samples[r]), 0 === r)) (d = 0), (o = n.timescale)
        else if (n.cts > t * n.timescale) {
          d = r - 1
          break
        }
        e && n.is_sync && (h = r)
      }
      for (
        e && (d = h), t = i.samples[d].cts, i.nextSample = d;
        i.samples[d].alreadyRead === i.samples[d].size && i.samples[d + 1];

      )
        d++
      return (
        (a = i.samples[d].offset + i.samples[d].alreadyRead),
        s.info(
          'ISOFile',
          'Seeking to ' +
            (e ? 'RAP' : '') +
            ' sample #' +
            i.nextSample +
            ' on track ' +
            i.tkhd.track_id +
            ', time ' +
            s.getDurationString(t, o) +
            ' and offset: ' +
            a
        ),
        { offset: a, time: t / o }
      )
    }),
    (f.prototype.seek = function (t, e) {
      var i,
        r,
        n,
        a = this.moov,
        o = { offset: 1 / 0, time: 1 / 0 }
      if (this.moov) {
        for (n = 0; n < a.traks.length; n++)
          (i = a.traks[n]),
            (r = this.seekTrack(t, e, i)).offset < o.offset &&
              (o.offset = r.offset),
            r.time < o.time && (o.time = r.time)
        return (
          s.info(
            'ISOFile',
            'Seeking at time ' +
              s.getDurationString(o.time, 1) +
              ' needs a buffer with a fileStart position of ' +
              o.offset
          ),
          o.offset === 1 / 0
            ? (o = { offset: this.nextParsePosition, time: 0 })
            : (o.offset = this.stream.getEndFilePositionAfter(o.offset)),
          s.info(
            'ISOFile',
            'Adjusted seek position (after checking data already in buffer): ' +
              o.offset
          ),
          o
        )
      }
      throw 'Cannot seek: moov not received!'
    }),
    (f.prototype.equal = function (t) {
      for (var e = 0; e < this.boxes.length && e < t.boxes.length; ) {
        var i = this.boxes[e],
          s = t.boxes[e]
        if (!d.boxEqual(i, s)) return !1
        e++
      }
      return !0
    }),
    (t.ISOFile = f),
    (f.prototype.lastBoxStartPosition = 0),
    (f.prototype.parsingMdat = null),
    (f.prototype.nextParsePosition = 0),
    (f.prototype.discardMdatData = !1),
    (f.prototype.processIncompleteBox = function (t) {
      var e
      return 'mdat' === t.type
        ? ((e = new d[t.type + 'Box'](t.size)),
          (this.parsingMdat = e),
          this.boxes.push(e),
          this.mdats.push(e),
          (e.start = t.start),
          (e.hdr_size = t.hdr_size),
          this.stream.addUsedBytes(e.hdr_size),
          (this.lastBoxStartPosition = e.start + e.size),
          this.stream.seek(e.start + e.size, !1, this.discardMdatData)
            ? ((this.parsingMdat = null), !0)
            : (this.moovStartFound
                ? (this.nextParsePosition = this.stream.findEndContiguousBuf())
                : (this.nextParsePosition = e.start + e.size),
              !1))
        : ('moov' === t.type &&
            ((this.moovStartFound = !0),
            0 === this.mdats.length && (this.isProgressive = !0)),
          !!this.stream.mergeNextBuffer && this.stream.mergeNextBuffer()
            ? ((this.nextParsePosition = this.stream.getEndPosition()), !0)
            : (t.type
                ? this.moovStartFound
                  ? (this.nextParsePosition = this.stream.getEndPosition())
                  : (this.nextParsePosition =
                      this.stream.getPosition() + t.size)
                : (this.nextParsePosition = this.stream.getEndPosition()),
              !1))
    }),
    (f.prototype.hasIncompleteMdat = function () {
      return null !== this.parsingMdat
    }),
    (f.prototype.processIncompleteMdat = function () {
      var t
      return (
        (t = this.parsingMdat),
        this.stream.seek(t.start + t.size, !1, this.discardMdatData)
          ? (s.debug('ISOFile', "Found 'mdat' end in buffered data"),
            (this.parsingMdat = null),
            !0)
          : ((this.nextParsePosition = this.stream.findEndContiguousBuf()), !1)
      )
    }),
    (f.prototype.restoreParsePosition = function () {
      return this.stream.seek(
        this.lastBoxStartPosition,
        !0,
        this.discardMdatData
      )
    }),
    (f.prototype.saveParsePosition = function () {
      this.lastBoxStartPosition = this.stream.getPosition()
    }),
    (f.prototype.updateUsedBytes = function (t, e) {
      this.stream.addUsedBytes &&
        ('mdat' === t.type
          ? (this.stream.addUsedBytes(t.hdr_size),
            this.discardMdatData &&
              this.stream.addUsedBytes(t.size - t.hdr_size))
          : this.stream.addUsedBytes(t.size))
    }),
    (f.prototype.add = d.Box.prototype.add),
    (f.prototype.addBox = d.Box.prototype.addBox),
    (f.prototype.init = function (t) {
      var e = t || {}
      this.add('ftyp')
        .set('major_brand', (e.brands && e.brands[0]) || 'iso4')
        .set('minor_version', 0)
        .set('compatible_brands', e.brands || ['iso4'])
      var i = this.add('moov')
      return (
        i
          .add('mvhd')
          .set('timescale', e.timescale || 600)
          .set('rate', e.rate || 65536)
          .set('creation_time', 0)
          .set('modification_time', 0)
          .set('duration', e.duration || 0)
          .set('volume', e.width ? 0 : 256)
          .set('matrix', [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824])
          .set('next_track_id', 1),
        i.add('mvex'),
        this
      )
    }),
    (f.prototype.addTrack = function (t) {
      this.moov || this.init(t)
      var e = t || {}
      ;(e.width = e.width || 320),
        (e.height = e.height || 320),
        (e.id = e.id || this.moov.mvhd.next_track_id),
        (e.type = e.type || 'avc1')
      var i = this.moov.add('trak')
      ;(this.moov.mvhd.next_track_id = e.id + 1),
        i
          .add('tkhd')
          .set(
            'flags',
            d.TKHD_FLAG_ENABLED | d.TKHD_FLAG_IN_MOVIE | d.TKHD_FLAG_IN_PREVIEW
          )
          .set('creation_time', 0)
          .set('modification_time', 0)
          .set('track_id', e.id)
          .set('duration', e.duration || 0)
          .set('layer', e.layer || 0)
          .set('alternate_group', 0)
          .set('volume', 1)
          .set('matrix', [0, 0, 0, 0, 0, 0, 0, 0, 0])
          .set('width', e.width << 16)
          .set('height', e.height << 16)
      var s = i.add('mdia')
      s
        .add('mdhd')
        .set('creation_time', 0)
        .set('modification_time', 0)
        .set('timescale', e.timescale || 1)
        .set('duration', e.media_duration || 0)
        .set('language', e.language || 'und'),
        s
          .add('hdlr')
          .set('handler', e.hdlr || 'vide')
          .set('name', e.name || 'Track created with MP4Box.js'),
        s.add('elng').set('extended_language', e.language || 'fr-FR')
      var n = s.add('minf')
      if (void 0 !== d[e.type + 'SampleEntry']) {
        var a = new d[e.type + 'SampleEntry']()
        a.data_reference_index = 1
        var o = ''
        for (var h in d.sampleEntryCodes)
          for (var p = d.sampleEntryCodes[h], l = 0; l < p.length; l++)
            if (p.indexOf(e.type) > -1) {
              o = h
              break
            }
        switch (o) {
          case 'Visual':
            if (
              (n.add('vmhd').set('graphicsmode', 0).set('opcolor', [0, 0, 0]),
              a
                .set('width', e.width)
                .set('height', e.height)
                .set('horizresolution', 72 << 16)
                .set('vertresolution', 72 << 16)
                .set('frame_count', 1)
                .set('compressorname', e.type + ' Compressor')
                .set('depth', 24),
              e.avcDecoderConfigRecord)
            ) {
              var f = new d.avcCBox(),
                u = new r(e.avcDecoderConfigRecord)
              f.parse(u), a.addBox(f)
            }
            break
          case 'Audio':
            n.add('smhd').set('balance', e.balance || 0),
              a
                .set('channel_count', e.channel_count || 2)
                .set('samplesize', e.samplesize || 16)
                .set('samplerate', e.samplerate || 65536)
            break
          case 'Hint':
            n.add('hmhd')
            break
          case 'Subtitle':
            if ((n.add('sthd'), 'stpp' === e.type))
              a.set('namespace', e.namespace || 'nonamespace')
                .set('schema_location', e.schema_location || '')
                .set('auxiliary_mime_types', e.auxiliary_mime_types || '')
            break
          default:
            n.add('nmhd')
        }
        e.description && a.addBox(e.description),
          e.description_boxes &&
            e.description_boxes.forEach(function (t) {
              a.addBox(t)
            }),
          n.add('dinf').add('dref').addEntry(new d['url Box']().set('flags', 1))
        var _ = n.add('stbl')
        return (
          _.add('stsd').addEntry(a),
          _.add('stts').set('sample_counts', []).set('sample_deltas', []),
          _.add('stsc')
            .set('first_chunk', [])
            .set('samples_per_chunk', [])
            .set('sample_description_index', []),
          _.add('stco').set('chunk_offsets', []),
          _.add('stsz').set('sample_sizes', []),
          this.moov.mvex
            .add('trex')
            .set('track_id', e.id)
            .set(
              'default_sample_description_index',
              e.default_sample_description_index || 1
            )
            .set('default_sample_duration', e.default_sample_duration || 0)
            .set('default_sample_size', e.default_sample_size || 0)
            .set('default_sample_flags', e.default_sample_flags || 0),
          this.buildTrakSampleLists(i),
          e.id
        )
      }
    }),
    (d.Box.prototype.computeSize = function (t) {
      var e = t || new n()
      ;(e.endianness = n.BIG_ENDIAN), this.write(e)
    }),
    (f.prototype.addSample = function (t, e, i) {
      var s = i || {},
        r = {},
        n = this.getTrackById(t)
      if (null !== n) {
        ;(r.number = n.samples.length),
          (r.track_id = n.tkhd.track_id),
          (r.timescale = n.mdia.mdhd.timescale),
          (r.description_index = s.sample_description_index
            ? s.sample_description_index - 1
            : 0),
          (r.description = n.mdia.minf.stbl.stsd.entries[r.description_index]),
          (r.data = e),
          (r.size = e.byteLength),
          (r.alreadyRead = r.size),
          (r.duration = s.duration || 1),
          (r.cts = s.cts || 0),
          (r.dts = s.dts || 0),
          (r.is_sync = s.is_sync || !1),
          (r.is_leading = s.is_leading || 0),
          (r.depends_on = s.depends_on || 0),
          (r.is_depended_on = s.is_depended_on || 0),
          (r.has_redundancy = s.has_redundancy || 0),
          (r.degradation_priority = s.degradation_priority || 0),
          (r.offset = 0),
          (r.subsamples = s.subsamples),
          n.samples.push(r),
          (n.samples_size += r.size),
          (n.samples_duration += r.duration),
          n.first_dts || (n.first_dts = s.dts),
          this.processSamples()
        var a = this.createSingleSampleMoof(r)
        return (
          this.addBox(a),
          a.computeSize(),
          (a.trafs[0].truns[0].data_offset = a.size + 8),
          (this.add('mdat').data = new Uint8Array(e)),
          r
        )
      }
    }),
    (f.prototype.createSingleSampleMoof = function (t) {
      var e = 0
      e = t.is_sync ? 1 << 25 : 65536
      var i = new d.moofBox()
      i.add('mfhd').set('sequence_number', this.nextMoofNumber),
        this.nextMoofNumber++
      var s = i.add('traf'),
        r = this.getTrackById(t.track_id)
      return (
        s
          .add('tfhd')
          .set('track_id', t.track_id)
          .set('flags', d.TFHD_FLAG_DEFAULT_BASE_IS_MOOF),
        s.add('tfdt').set('baseMediaDecodeTime', t.dts - (r.first_dts || 0)),
        s
          .add('trun')
          .set(
            'flags',
            d.TRUN_FLAGS_DATA_OFFSET |
              d.TRUN_FLAGS_DURATION |
              d.TRUN_FLAGS_SIZE |
              d.TRUN_FLAGS_FLAGS |
              d.TRUN_FLAGS_CTS_OFFSET
          )
          .set('data_offset', 0)
          .set('first_sample_flags', 0)
          .set('sample_count', 1)
          .set('sample_duration', [t.duration])
          .set('sample_size', [t.size])
          .set('sample_flags', [e])
          .set('sample_composition_time_offset', [t.cts - t.dts]),
        i
      )
    }),
    (f.prototype.lastMoofIndex = 0),
    (f.prototype.samplesDataSize = 0),
    (f.prototype.resetTables = function () {
      var t, e, i, s, r, n
      for (
        this.initial_duration = this.moov.mvhd.duration,
          this.moov.mvhd.duration = 0,
          t = 0;
        t < this.moov.traks.length;
        t++
      ) {
        ;((e = this.moov.traks[t]).tkhd.duration = 0),
          (e.mdia.mdhd.duration = 0),
          ((e.mdia.minf.stbl.stco || e.mdia.minf.stbl.co64).chunk_offsets = []),
          ((i = e.mdia.minf.stbl.stsc).first_chunk = []),
          (i.samples_per_chunk = []),
          (i.sample_description_index = []),
          ((e.mdia.minf.stbl.stsz || e.mdia.minf.stbl.stz2).sample_sizes = []),
          ((s = e.mdia.minf.stbl.stts).sample_counts = []),
          (s.sample_deltas = []),
          (r = e.mdia.minf.stbl.ctts) &&
            ((r.sample_counts = []), (r.sample_offsets = [])),
          (n = e.mdia.minf.stbl.stss)
        var a = e.mdia.minf.stbl.boxes.indexOf(n)
        ;-1 != a && (e.mdia.minf.stbl.boxes[a] = null)
      }
    }),
    (f.initSampleGroups = function (t, e, i, s, r) {
      var n, a, o, h
      function d(t, e, i) {
        ;(this.grouping_type = t),
          (this.grouping_type_parameter = e),
          (this.sbgp = i),
          (this.last_sample_in_run = -1),
          (this.entry_index = -1)
      }
      for (
        e && (e.sample_groups_info = []),
          t.sample_groups_info || (t.sample_groups_info = []),
          a = 0;
        a < i.length;
        a++
      ) {
        for (
          h = i[a].grouping_type + '/' + i[a].grouping_type_parameter,
            o = new d(i[a].grouping_type, i[a].grouping_type_parameter, i[a]),
            e && (e.sample_groups_info[h] = o),
            t.sample_groups_info[h] || (t.sample_groups_info[h] = o),
            n = 0;
          n < s.length;
          n++
        )
          s[n].grouping_type === i[a].grouping_type &&
            ((o.description = s[n]), (o.description.used = !0))
        if (r)
          for (n = 0; n < r.length; n++)
            r[n].grouping_type === i[a].grouping_type &&
              ((o.fragment_description = r[n]),
              (o.fragment_description.used = !0),
              (o.is_fragment = !0))
      }
      if (e) {
        if (r)
          for (a = 0; a < r.length; a++)
            !r[a].used &&
              r[a].version >= 2 &&
              ((h = r[a].grouping_type + '/0'),
              ((o = new d(r[a].grouping_type, 0)).is_fragment = !0),
              e.sample_groups_info[h] || (e.sample_groups_info[h] = o))
      } else
        for (a = 0; a < s.length; a++)
          !s[a].used &&
            s[a].version >= 2 &&
            ((h = s[a].grouping_type + '/0'),
            (o = new d(s[a].grouping_type, 0)),
            t.sample_groups_info[h] || (t.sample_groups_info[h] = o))
    }),
    (f.setSampleGroupProperties = function (t, e, i, s) {
      var r, n
      for (r in ((e.sample_groups = []), s)) {
        var a
        if (
          ((e.sample_groups[r] = {}),
          (e.sample_groups[r].grouping_type = s[r].grouping_type),
          (e.sample_groups[r].grouping_type_parameter =
            s[r].grouping_type_parameter),
          i >= s[r].last_sample_in_run &&
            (s[r].last_sample_in_run < 0 && (s[r].last_sample_in_run = 0),
            s[r].entry_index++,
            s[r].entry_index <= s[r].sbgp.entries.length - 1 &&
              (s[r].last_sample_in_run +=
                s[r].sbgp.entries[s[r].entry_index].sample_count)),
          s[r].entry_index <= s[r].sbgp.entries.length - 1
            ? (e.sample_groups[r].group_description_index =
                s[r].sbgp.entries[s[r].entry_index].group_description_index)
            : (e.sample_groups[r].group_description_index = -1),
          0 !== e.sample_groups[r].group_description_index)
        )
          (a = s[r].fragment_description
            ? s[r].fragment_description
            : s[r].description),
            e.sample_groups[r].group_description_index > 0
              ? ((n =
                  e.sample_groups[r].group_description_index > 65535
                    ? (e.sample_groups[r].group_description_index >> 16) - 1
                    : e.sample_groups[r].group_description_index - 1),
                a && n >= 0 && (e.sample_groups[r].description = a.entries[n]))
              : a &&
                a.version >= 2 &&
                a.default_group_description_index > 0 &&
                (e.sample_groups[r].description =
                  a.entries[a.default_group_description_index - 1])
      }
    }),
    (f.process_sdtp = function (t, e, i) {
      e &&
        (t
          ? ((e.is_leading = t.is_leading[i]),
            (e.depends_on = t.sample_depends_on[i]),
            (e.is_depended_on = t.sample_is_depended_on[i]),
            (e.has_redundancy = t.sample_has_redundancy[i]))
          : ((e.is_leading = 0),
            (e.depends_on = 0),
            (e.is_depended_on = 0),
            (e.has_redundancy = 0)))
    }),
    (f.prototype.buildSampleLists = function () {
      var t, e
      for (t = 0; t < this.moov.traks.length; t++)
        (e = this.moov.traks[t]), this.buildTrakSampleLists(e)
    }),
    (f.prototype.buildTrakSampleLists = function (t) {
      var e, i, s, r, n, a, o, h, d, p, l, u, _, c, m, g, y, U, b, S, v, x, w, E
      if (
        ((t.samples = []),
        (t.samples_duration = 0),
        (t.samples_size = 0),
        (i = t.mdia.minf.stbl.stco || t.mdia.minf.stbl.co64),
        (s = t.mdia.minf.stbl.stsc),
        (r = t.mdia.minf.stbl.stsz || t.mdia.minf.stbl.stz2),
        (n = t.mdia.minf.stbl.stts),
        (a = t.mdia.minf.stbl.ctts),
        (o = t.mdia.minf.stbl.stss),
        (h = t.mdia.minf.stbl.stsd),
        (d = t.mdia.minf.stbl.subs),
        (u = t.mdia.minf.stbl.stdp),
        (p = t.mdia.minf.stbl.sbgps),
        (l = t.mdia.minf.stbl.sgpds),
        (U = -1),
        (b = -1),
        (S = -1),
        (v = -1),
        (x = 0),
        (w = 0),
        (E = 0),
        f.initSampleGroups(t, null, p, l),
        void 0 !== r)
      ) {
        for (e = 0; e < r.sample_sizes.length; e++) {
          var B = {}
          ;(B.number = e),
            (B.track_id = t.tkhd.track_id),
            (B.timescale = t.mdia.mdhd.timescale),
            (B.alreadyRead = 0),
            (t.samples[e] = B),
            (B.size = r.sample_sizes[e]),
            (t.samples_size += B.size),
            0 === e
              ? ((c = 1),
                (_ = 0),
                (B.chunk_index = c),
                (B.chunk_run_index = _),
                (y = s.samples_per_chunk[_]),
                (g = 0),
                (m =
                  _ + 1 < s.first_chunk.length
                    ? s.first_chunk[_ + 1] - 1
                    : 1 / 0))
              : e < y
                ? ((B.chunk_index = c), (B.chunk_run_index = _))
                : (c++,
                  (B.chunk_index = c),
                  (g = 0),
                  c <= m ||
                    (m =
                      ++_ + 1 < s.first_chunk.length
                        ? s.first_chunk[_ + 1] - 1
                        : 1 / 0),
                  (B.chunk_run_index = _),
                  (y += s.samples_per_chunk[_])),
            (B.description_index =
              s.sample_description_index[B.chunk_run_index] - 1),
            (B.description = h.entries[B.description_index]),
            (B.offset = i.chunk_offsets[B.chunk_index - 1] + g),
            (g += B.size),
            e > U && (b++, U < 0 && (U = 0), (U += n.sample_counts[b])),
            e > 0
              ? ((t.samples[e - 1].duration = n.sample_deltas[b]),
                (t.samples_duration += t.samples[e - 1].duration),
                (B.dts = t.samples[e - 1].dts + t.samples[e - 1].duration))
              : (B.dts = 0),
            a
              ? (e >= S && (v++, S < 0 && (S = 0), (S += a.sample_counts[v])),
                (B.cts = t.samples[e].dts + a.sample_offsets[v]))
              : (B.cts = B.dts),
            o
              ? (e == o.sample_numbers[x] - 1
                  ? ((B.is_sync = !0), x++)
                  : ((B.is_sync = !1), (B.degradation_priority = 0)),
                d &&
                  d.entries[w].sample_delta + E == e + 1 &&
                  ((B.subsamples = d.entries[w].subsamples),
                  (E += d.entries[w].sample_delta),
                  w++))
              : (B.is_sync = !0),
            f.process_sdtp(t.mdia.minf.stbl.sdtp, B, B.number),
            (B.degradation_priority = u ? u.priority[e] : 0),
            d &&
              d.entries[w].sample_delta + E == e &&
              ((B.subsamples = d.entries[w].subsamples),
              (E += d.entries[w].sample_delta)),
            (p.length > 0 || l.length > 0) &&
              f.setSampleGroupProperties(t, B, e, t.sample_groups_info)
        }
        e > 0 &&
          ((t.samples[e - 1].duration = Math.max(
            t.mdia.mdhd.duration - t.samples[e - 1].dts,
            0
          )),
          (t.samples_duration += t.samples[e - 1].duration))
      }
    }),
    (f.prototype.updateSampleLists = function () {
      var t, e, i, s, r, n, a, o, h, p, l, u, _, c, m
      if (void 0 !== this.moov)
        for (; this.lastMoofIndex < this.moofs.length; )
          if (
            ((h = this.moofs[this.lastMoofIndex]),
            this.lastMoofIndex++,
            'moof' == h.type)
          )
            for (p = h, t = 0; t < p.trafs.length; t++) {
              for (
                l = p.trafs[t],
                  u = this.getTrackById(l.tfhd.track_id),
                  _ = this.getTrexById(l.tfhd.track_id),
                  s =
                    l.tfhd.flags & d.TFHD_FLAG_SAMPLE_DESC
                      ? l.tfhd.default_sample_description_index
                      : _
                        ? _.default_sample_description_index
                        : 1,
                  r =
                    l.tfhd.flags & d.TFHD_FLAG_SAMPLE_DUR
                      ? l.tfhd.default_sample_duration
                      : _
                        ? _.default_sample_duration
                        : 0,
                  n =
                    l.tfhd.flags & d.TFHD_FLAG_SAMPLE_SIZE
                      ? l.tfhd.default_sample_size
                      : _
                        ? _.default_sample_size
                        : 0,
                  a =
                    l.tfhd.flags & d.TFHD_FLAG_SAMPLE_FLAGS
                      ? l.tfhd.default_sample_flags
                      : _
                        ? _.default_sample_flags
                        : 0,
                  l.sample_number = 0,
                  l.sbgps.length > 0 &&
                    f.initSampleGroups(
                      u,
                      l,
                      l.sbgps,
                      u.mdia.minf.stbl.sgpds,
                      l.sgpds
                    ),
                  e = 0;
                e < l.truns.length;
                e++
              ) {
                var g = l.truns[e]
                for (i = 0; i < g.sample_count; i++) {
                  ;((c = {}).moof_number = this.lastMoofIndex),
                    (c.number_in_traf = l.sample_number),
                    l.sample_number++,
                    (c.number = u.samples.length),
                    (l.first_sample_index = u.samples.length),
                    u.samples.push(c),
                    (c.track_id = u.tkhd.track_id),
                    (c.timescale = u.mdia.mdhd.timescale),
                    (c.description_index = s - 1),
                    (c.description =
                      u.mdia.minf.stbl.stsd.entries[c.description_index]),
                    (c.size = n),
                    g.flags & d.TRUN_FLAGS_SIZE && (c.size = g.sample_size[i]),
                    (u.samples_size += c.size),
                    (c.duration = r),
                    g.flags & d.TRUN_FLAGS_DURATION &&
                      (c.duration = g.sample_duration[i]),
                    (u.samples_duration += c.duration),
                    u.first_traf_merged || i > 0
                      ? (c.dts =
                          u.samples[u.samples.length - 2].dts +
                          u.samples[u.samples.length - 2].duration)
                      : (l.tfdt
                          ? (c.dts = l.tfdt.baseMediaDecodeTime)
                          : (c.dts = 0),
                        (u.first_traf_merged = !0)),
                    (c.cts = c.dts),
                    g.flags & d.TRUN_FLAGS_CTS_OFFSET &&
                      (c.cts = c.dts + g.sample_composition_time_offset[i]),
                    (m = a),
                    g.flags & d.TRUN_FLAGS_FLAGS
                      ? (m = g.sample_flags[i])
                      : 0 === i &&
                        g.flags & d.TRUN_FLAGS_FIRST_FLAG &&
                        (m = g.first_sample_flags),
                    (c.is_sync = !((m >> 16) & 1)),
                    (c.is_leading = (m >> 26) & 3),
                    (c.depends_on = (m >> 24) & 3),
                    (c.is_depended_on = (m >> 22) & 3),
                    (c.has_redundancy = (m >> 20) & 3),
                    (c.degradation_priority = 65535 & m)
                  var y = !!(l.tfhd.flags & d.TFHD_FLAG_BASE_DATA_OFFSET),
                    U = !!(l.tfhd.flags & d.TFHD_FLAG_DEFAULT_BASE_IS_MOOF),
                    b = !!(g.flags & d.TRUN_FLAGS_DATA_OFFSET),
                    S = 0
                  ;(S = y
                    ? l.tfhd.base_data_offset
                    : U || 0 === e
                      ? p.start
                      : o),
                    (c.offset =
                      0 === e && 0 === i ? (b ? S + g.data_offset : S) : o),
                    (o = c.offset + c.size),
                    (l.sbgps.length > 0 ||
                      l.sgpds.length > 0 ||
                      u.mdia.minf.stbl.sbgps.length > 0 ||
                      u.mdia.minf.stbl.sgpds.length > 0) &&
                      f.setSampleGroupProperties(
                        u,
                        c,
                        c.number_in_traf,
                        l.sample_groups_info
                      )
                }
              }
              if (l.subs) {
                u.has_fragment_subsamples = !0
                var v = l.first_sample_index
                for (e = 0; e < l.subs.entries.length; e++)
                  (v += l.subs.entries[e].sample_delta),
                    ((c = u.samples[v - 1]).subsamples =
                      l.subs.entries[e].subsamples)
              }
            }
    }),
    (f.prototype.getSample = function (t, e) {
      var i,
        r = t.samples[e]
      if (!this.moov) return null
      if (r.data) {
        if (r.alreadyRead == r.size) return r
      } else
        (r.data = new Uint8Array(r.size)),
          (r.alreadyRead = 0),
          (this.samplesDataSize += r.size),
          s.debug(
            'ISOFile',
            'Allocating sample #' +
              e +
              ' on track #' +
              t.tkhd.track_id +
              ' of size ' +
              r.size +
              ' (total: ' +
              this.samplesDataSize +
              ')'
          )
      for (;;) {
        var a = this.stream.findPosition(!0, r.offset + r.alreadyRead, !1)
        if (!(a > -1)) return null
        var o =
          (i = this.stream.buffers[a]).byteLength -
          (r.offset + r.alreadyRead - i.fileStart)
        if (r.size - r.alreadyRead <= o)
          return (
            s.debug(
              'ISOFile',
              'Getting sample #' +
                e +
                ' data (alreadyRead: ' +
                r.alreadyRead +
                ' offset: ' +
                (r.offset + r.alreadyRead - i.fileStart) +
                ' read size: ' +
                (r.size - r.alreadyRead) +
                ' full size: ' +
                r.size +
                ')'
            ),
            n.memcpy(
              r.data.buffer,
              r.alreadyRead,
              i,
              r.offset + r.alreadyRead - i.fileStart,
              r.size - r.alreadyRead
            ),
            (i.usedBytes += r.size - r.alreadyRead),
            this.stream.logBufferLevel(),
            (r.alreadyRead = r.size),
            r
          )
        if (0 === o) return null
        s.debug(
          'ISOFile',
          'Getting sample #' +
            e +
            ' partial data (alreadyRead: ' +
            r.alreadyRead +
            ' offset: ' +
            (r.offset + r.alreadyRead - i.fileStart) +
            ' read size: ' +
            o +
            ' full size: ' +
            r.size +
            ')'
        ),
          n.memcpy(
            r.data.buffer,
            r.alreadyRead,
            i,
            r.offset + r.alreadyRead - i.fileStart,
            o
          ),
          (r.alreadyRead += o),
          (i.usedBytes += o),
          this.stream.logBufferLevel()
      }
    }),
    (f.prototype.releaseSample = function (t, e) {
      var i = t.samples[e]
      return i.data
        ? ((this.samplesDataSize -= i.size),
          (i.data = null),
          (i.alreadyRead = 0),
          i.size)
        : 0
    }),
    (f.prototype.getAllocatedSampleDataSize = function () {
      return this.samplesDataSize
    }),
    (f.prototype.getCodecs = function () {
      var t,
        e = ''
      for (t = 0; t < this.moov.traks.length; t++) {
        t > 0 && (e += ','),
          (e += this.moov.traks[t].mdia.minf.stbl.stsd.entries[0].getCodec())
      }
      return e
    }),
    (f.prototype.getTrexById = function (t) {
      var e
      if (!this.moov || !this.moov.mvex) return null
      for (e = 0; e < this.moov.mvex.trexs.length; e++) {
        var i = this.moov.mvex.trexs[e]
        if (i.track_id == t) return i
      }
      return null
    }),
    (f.prototype.getTrackById = function (t) {
      if (void 0 === this.moov) return null
      for (var e = 0; e < this.moov.traks.length; e++) {
        var i = this.moov.traks[e]
        if (i.tkhd.track_id == t) return i
      }
      return null
    }),
    (f.prototype.items = []),
    (f.prototype.itemsDataSize = 0),
    (f.prototype.flattenItemInfo = function () {
      var t,
        e,
        i,
        r = this.items,
        n = this.meta
      if (null != n && void 0 !== n.hdlr && void 0 !== n.iinf) {
        for (t = 0; t < n.iinf.item_infos.length; t++)
          ((i = {}).id = n.iinf.item_infos[t].item_ID),
            (r[i.id] = i),
            (i.ref_to = []),
            (i.name = n.iinf.item_infos[t].item_name),
            n.iinf.item_infos[t].protection_index > 0 &&
              (i.protection =
                n.ipro.protections[n.iinf.item_infos[t].protection_index - 1]),
            n.iinf.item_infos[t].item_type
              ? (i.type = n.iinf.item_infos[t].item_type)
              : (i.type = 'mime'),
            (i.content_type = n.iinf.item_infos[t].content_type),
            (i.content_encoding = n.iinf.item_infos[t].content_encoding)
        if (n.iloc)
          for (t = 0; t < n.iloc.items.length; t++) {
            var a = n.iloc.items[t]
            switch (
              ((i = r[a.item_ID]),
              0 !== a.data_reference_index &&
                (s.warn(
                  'Item storage with reference to other files: not supported'
                ),
                (i.source = n.dinf.boxes[a.data_reference_index - 1])),
              a.construction_method)
            ) {
              case 0:
                break
              case 1:
              case 2:
                s.warn('Item storage with construction_method : not supported')
            }
            for (i.extents = [], i.size = 0, e = 0; e < a.extents.length; e++)
              (i.extents[e] = {}),
                (i.extents[e].offset =
                  a.extents[e].extent_offset + a.base_offset),
                (i.extents[e].length = a.extents[e].extent_length),
                (i.extents[e].alreadyRead = 0),
                (i.size += i.extents[e].length)
          }
        if ((n.pitm && (r[n.pitm.item_id].primary = !0), n.iref))
          for (t = 0; t < n.iref.references.length; t++) {
            var o = n.iref.references[t]
            for (e = 0; e < o.references.length; e++)
              r[o.from_item_ID].ref_to.push({
                type: o.type,
                id: o.references[e]
              })
          }
        if (n.iprp)
          for (var h = 0; h < n.iprp.ipmas.length; h++) {
            var d = n.iprp.ipmas[h]
            for (t = 0; t < d.associations.length; t++) {
              var p = d.associations[t]
              for (
                void 0 === (i = r[p.id]).properties &&
                  ((i.properties = {}), (i.properties.boxes = [])),
                  e = 0;
                e < p.props.length;
                e++
              ) {
                var l = p.props[e]
                if (
                  l.property_index > 0 &&
                  l.property_index - 1 < n.iprp.ipco.boxes.length
                ) {
                  var f = n.iprp.ipco.boxes[l.property_index - 1]
                  ;(i.properties[f.type] = f), i.properties.boxes.push(f)
                }
              }
            }
          }
      }
    }),
    (f.prototype.getItem = function (t) {
      var e, i
      if (!this.meta) return null
      if (!(i = this.items[t]).data && i.size)
        (i.data = new Uint8Array(i.size)),
          (i.alreadyRead = 0),
          (this.itemsDataSize += i.size),
          s.debug(
            'ISOFile',
            'Allocating item #' +
              t +
              ' of size ' +
              i.size +
              ' (total: ' +
              this.itemsDataSize +
              ')'
          )
      else if (i.alreadyRead === i.size) return i
      for (var r = 0; r < i.extents.length; r++) {
        var a = i.extents[r]
        if (a.alreadyRead !== a.length) {
          var o = this.stream.findPosition(!0, a.offset + a.alreadyRead, !1)
          if (!(o > -1)) return null
          var h =
            (e = this.stream.buffers[o]).byteLength -
            (a.offset + a.alreadyRead - e.fileStart)
          if (!(a.length - a.alreadyRead <= h))
            return (
              s.debug(
                'ISOFile',
                'Getting item #' +
                  t +
                  ' extent #' +
                  r +
                  ' partial data (alreadyRead: ' +
                  a.alreadyRead +
                  ' offset: ' +
                  (a.offset + a.alreadyRead - e.fileStart) +
                  ' read size: ' +
                  h +
                  ' full extent size: ' +
                  a.length +
                  ' full item size: ' +
                  i.size +
                  ')'
              ),
              n.memcpy(
                i.data.buffer,
                i.alreadyRead,
                e,
                a.offset + a.alreadyRead - e.fileStart,
                h
              ),
              (a.alreadyRead += h),
              (i.alreadyRead += h),
              (e.usedBytes += h),
              this.stream.logBufferLevel(),
              null
            )
          s.debug(
            'ISOFile',
            'Getting item #' +
              t +
              ' extent #' +
              r +
              ' data (alreadyRead: ' +
              a.alreadyRead +
              ' offset: ' +
              (a.offset + a.alreadyRead - e.fileStart) +
              ' read size: ' +
              (a.length - a.alreadyRead) +
              ' full extent size: ' +
              a.length +
              ' full item size: ' +
              i.size +
              ')'
          ),
            n.memcpy(
              i.data.buffer,
              i.alreadyRead,
              e,
              a.offset + a.alreadyRead - e.fileStart,
              a.length - a.alreadyRead
            ),
            (e.usedBytes += a.length - a.alreadyRead),
            this.stream.logBufferLevel(),
            (i.alreadyRead += a.length - a.alreadyRead),
            (a.alreadyRead = a.length)
        }
      }
      return i.alreadyRead === i.size ? i : null
    }),
    (f.prototype.releaseItem = function (t) {
      var e = this.items[t]
      if (e.data) {
        ;(this.itemsDataSize -= e.size), (e.data = null), (e.alreadyRead = 0)
        for (var i = 0; i < e.extents.length; i++) {
          e.extents[i].alreadyRead = 0
        }
        return e.size
      }
      return 0
    }),
    (f.prototype.processItems = function (t) {
      for (var e in this.items) {
        var i = this.items[e]
        this.getItem(i.id),
          t && !i.sent && (t(i), (i.sent = !0), (i.data = null))
      }
    }),
    (f.prototype.hasItem = function (t) {
      for (var e in this.items) {
        var i = this.items[e]
        if (i.name === t) return i.id
      }
      return -1
    }),
    (f.prototype.getMetaHandler = function () {
      return this.meta ? this.meta.hdlr.handler : null
    }),
    (f.prototype.getPrimaryItem = function () {
      return this.meta && this.meta.pitm
        ? this.getItem(this.meta.pitm.item_id)
        : null
    }),
    (f.prototype.itemToFragmentedTrackFile = function (t) {
      var e = t || {},
        i = null
      if (
        null == (i = e.itemId ? this.getItem(e.itemId) : this.getPrimaryItem())
      )
        return null
      var s = new f()
      s.discardMdatData = !1
      var r = { type: i.type, description_boxes: i.properties.boxes }
      i.properties.ispe &&
        ((r.width = i.properties.ispe.image_width),
        (r.height = i.properties.ispe.image_height))
      var n = s.addTrack(r)
      return n ? (s.addSample(n, i.data), s) : null
    }),
    (f.prototype.write = function (t) {
      for (var e = 0; e < this.boxes.length; e++) this.boxes[e].write(t)
    }),
    (f.prototype.createFragment = function (t, e, i) {
      var r = this.getTrackById(t),
        a = this.getSample(r, e)
      if (null == a)
        return (
          (a = r.samples[e]),
          this.nextSeekPosition
            ? (this.nextSeekPosition = Math.min(
                a.offset + a.alreadyRead,
                this.nextSeekPosition
              ))
            : (this.nextSeekPosition = r.samples[e].offset + a.alreadyRead),
          null
        )
      var o = i || new n()
      o.endianness = n.BIG_ENDIAN
      var h = this.createSingleSampleMoof(a)
      h.write(o),
        (h.trafs[0].truns[0].data_offset = h.size + 8),
        s.debug(
          'MP4Box',
          'Adjusting data_offset with new value ' +
            h.trafs[0].truns[0].data_offset
        ),
        o.adjustUint32(
          h.trafs[0].truns[0].data_offset_position,
          h.trafs[0].truns[0].data_offset
        )
      var p = new d.mdatBox()
      return (p.data = a.data), p.write(o), o
    }),
    (f.writeInitializationSegment = function (t, e, i, r) {
      var a
      s.debug('ISOFile', 'Generating initialization segment')
      var o = new n()
      ;(o.endianness = n.BIG_ENDIAN), t.write(o)
      var h = e.add('mvex')
      for (
        i && h.add('mehd').set('fragment_duration', i), a = 0;
        a < e.traks.length;
        a++
      )
        h.add('trex')
          .set('track_id', e.traks[a].tkhd.track_id)
          .set('default_sample_description_index', 1)
          .set('default_sample_duration', r)
          .set('default_sample_size', 0)
          .set('default_sample_flags', 65536)
      return e.write(o), o.buffer
    }),
    (f.prototype.save = function (t) {
      var e = new n()
      ;(e.endianness = n.BIG_ENDIAN), this.write(e), e.save(t)
    }),
    (f.prototype.getBuffer = function () {
      var t = new n()
      return (t.endianness = n.BIG_ENDIAN), this.write(t), t.buffer
    }),
    (f.prototype.initializeSegmentation = function () {
      var t, e, i, r
      for (
        null === this.onSegment &&
          s.warn('MP4Box', 'No segmentation callback set!'),
          this.isFragmentationInitialized ||
            ((this.isFragmentationInitialized = !0),
            (this.nextMoofNumber = 0),
            this.resetTables()),
          e = [],
          t = 0;
        t < this.fragmentedTracks.length;
        t++
      ) {
        var n = new d.moovBox()
        ;(n.mvhd = this.moov.mvhd),
          n.boxes.push(n.mvhd),
          (i = this.getTrackById(this.fragmentedTracks[t].id)),
          n.boxes.push(i),
          n.traks.push(i),
          ((r = {}).id = i.tkhd.track_id),
          (r.user = this.fragmentedTracks[t].user),
          (r.buffer = f.writeInitializationSegment(
            this.ftyp,
            n,
            this.moov.mvex && this.moov.mvex.mehd
              ? this.moov.mvex.mehd.fragment_duration
              : void 0,
            this.moov.traks[t].samples.length > 0
              ? this.moov.traks[t].samples[0].duration
              : 0
          )),
          e.push(r)
      }
      return e
    }),
    (d.Box.prototype.printHeader = function (t) {
      ;(this.size += 8),
        this.size > a && (this.size += 8),
        'uuid' === this.type && (this.size += 16),
        t.log(t.indent + 'size:' + this.size),
        t.log(t.indent + 'type:' + this.type)
    }),
    (d.FullBox.prototype.printHeader = function (t) {
      ;(this.size += 4),
        d.Box.prototype.printHeader.call(this, t),
        t.log(t.indent + 'version:' + this.version),
        t.log(t.indent + 'flags:' + this.flags)
    }),
    (d.Box.prototype.print = function (t) {
      this.printHeader(t)
    }),
    (d.ContainerBox.prototype.print = function (t) {
      this.printHeader(t)
      for (var e = 0; e < this.boxes.length; e++)
        if (this.boxes[e]) {
          var i = t.indent
          ;(t.indent += ' '), this.boxes[e].print(t), (t.indent = i)
        }
    }),
    (f.prototype.print = function (t) {
      t.indent = ''
      for (var e = 0; e < this.boxes.length; e++)
        this.boxes[e] && this.boxes[e].print(t)
    }),
    (d.mvhdBox.prototype.print = function (t) {
      d.FullBox.prototype.printHeader.call(this, t),
        t.log(t.indent + 'creation_time: ' + this.creation_time),
        t.log(t.indent + 'modification_time: ' + this.modification_time),
        t.log(t.indent + 'timescale: ' + this.timescale),
        t.log(t.indent + 'duration: ' + this.duration),
        t.log(t.indent + 'rate: ' + this.rate),
        t.log(t.indent + 'volume: ' + (this.volume >> 8)),
        t.log(t.indent + 'matrix: ' + this.matrix.join(', ')),
        t.log(t.indent + 'next_track_id: ' + this.next_track_id)
    }),
    (d.tkhdBox.prototype.print = function (t) {
      d.FullBox.prototype.printHeader.call(this, t),
        t.log(t.indent + 'creation_time: ' + this.creation_time),
        t.log(t.indent + 'modification_time: ' + this.modification_time),
        t.log(t.indent + 'track_id: ' + this.track_id),
        t.log(t.indent + 'duration: ' + this.duration),
        t.log(t.indent + 'volume: ' + (this.volume >> 8)),
        t.log(t.indent + 'matrix: ' + this.matrix.join(', ')),
        t.log(t.indent + 'layer: ' + this.layer),
        t.log(t.indent + 'alternate_group: ' + this.alternate_group),
        t.log(t.indent + 'width: ' + this.width),
        t.log(t.indent + 'height: ' + this.height)
    })
  var u = {
    createFile: function (t, e) {
      var i = void 0 === t || t,
        s = new f(e)
      return (s.discardMdatData = !i), s
    }
  }
  t.createFile = u.createFile
})(t)
var e = t.BoxParser,
  i = t.DataStream,
  s = t.ISOFile,
  r = t.Log,
  n = t.MP4BoxStream,
  a = t.MPEG4DescriptorParser,
  o = t.MultiBufferStream,
  h = t.Textin4Parser,
  d = t.XMLSubtitlein4Parser,
  p = t.createFile
export {
  e as BoxParser,
  i as DataStream,
  s as ISOFile,
  r as Log,
  n as MP4BoxStream,
  a as MPEG4DescriptorParser,
  o as MultiBufferStream,
  h as Textin4Parser,
  d as XMLSubtitlein4Parser,
  p as createFile,
  t as default
}
//# sourceMappingURL=/sm/c5c81aad27789fd1a23a1eb8f0ec9b4b0669962051cad9a902b1b11a370df751.map