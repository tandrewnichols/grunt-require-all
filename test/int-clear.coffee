require('should')

describe 'clearCache option', ->
  Given -> @foo = __dirname + '/fixtures/foo.js'
  Given -> @bar = __dirname + '/fixtures/bar.js'
  Given -> @quux = __dirname + '/fixtures/baz/quux.js'
  afterEach -> delete require.cache[@foo]
  afterEach -> delete require.cache[@bar]
  afterEach -> delete require.cache[@quux]
  Then ->
    (@foo of require.cache).should.be.false()
    (@bar of require.cache).should.be.false()
    (@quux of require.cache).should.be.false()
    global.barIntervalRan.should.be.false()
    global.quuxTimeoutRan.should.be.false()
    global.fooLoaded.should.be.true()
    global.barLoaded.should.be.true()
    global.quuxLoaded.should.be.true()
