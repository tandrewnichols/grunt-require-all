require('should')

describe 'multiple require trees', ->
  Given -> @foo = __dirname + '/fixtures/foo.js'
  Given -> @bar = __dirname + '/fixtures/bar.js'
  Given -> @quux = __dirname + '/fixtures/baz/quux.js'
  afterEach -> delete require.cache[@foo]
  afterEach -> delete require.cache[@bar]
  afterEach -> delete require.cache[@quux]
  Then ->
    (@foo of require.cache).should.be.false()
    require.cache[@bar].should.exist
    require.cache[@quux].should.exist
    global.barIntervalRan.should.be.false()
    global.quuxTimeoutRan.should.be.false()
