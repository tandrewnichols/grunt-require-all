require('should')

describe 'require', ->
  Given -> @foo = __dirname + '/fixtures/foo.js'
  Given -> @bar = __dirname + '/fixtures/bar.js'
  Given -> @quux = __dirname + '/fixtures/baz/quux.js'
  Given -> delete require.cache[@foo]
  Given -> delete require.cache[@bar]
  Given -> delete require.cache[@quux]
  Given -> process._cwd = process.cwd
  Given -> process.cwd = -> return __dirname
  afterEach -> process.cwd = process._cwd
  Given -> @subject = require '../tasks/require'
  Given -> @createFile = (file) ->
    obj = {}
    Object.defineProperty obj, 'src',
      get: -> return [file]
    return obj
  Given -> @grunt =
    registerMultiTask: (name, desc, @task) =>
  Given -> @subject @grunt

  context 'single require tree', ->
    Given -> @context =
      files: [@createFile('fixtures/foo.js')]
      options: (obj) -> obj
    When -> @task.call @context
    Then ->
      require.cache[@foo].should.exist
      require.cache[@bar].should.exist
      require.cache[@quux].should.exist
      global.barIntervalRan.should.be.false()
      global.quuxTimeoutRan.should.be.false()

  context 'multiple require trees', ->
    Given -> @context =
      files: [
        @createFile('fixtures/bar.js'),
        @createFile('fixtures/baz/quux.js')
      ]
      options: (obj) -> obj
    When -> @task.call @context
    When -> @task.call @context
    Then ->
      (@foo of require.cache).should.be.false()
      require.cache[@bar].should.exist
      require.cache[@quux].should.exist
      global.barIntervalRan.should.be.false()
      global.quuxTimeoutRan.should.be.false()

  context 'with clearCache', ->
    Given -> @context =
      files: [@createFile('fixtures/foo.js')]
      options: (obj) -> clearCache: true
    When -> @task.call @context
    Then ->
      (@foo of require.cache).should.be.false()
      (@bar of require.cache).should.be.false()
      (@quux of require.cache).should.be.false()
      global.barIntervalRan.should.be.false()
      global.quuxTimeoutRan.should.be.false()
