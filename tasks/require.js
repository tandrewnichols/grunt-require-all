var cache = require('cache-walk');

module.exports = function(grunt) {
  grunt.registerMultiTask('require', require('../package').description, function() {
    var options = this.options({ clearCache: false });
    var _setTimeout = setTimeout;
    var _setInterval = setInterval;
    setTimeout = function(){};
    setInterval = function(){};
    this.files.forEach(function(files) {
      files.src.forEach(function(file) {
        var filename = process.cwd() + '/' + file;
        require(filename);
        if (options.clearCache) {
          cache['delete'](filename);
        }
      });
    });
    setTimeout = _setTimeout;
    setInterval = _setInterval;
  });
};
