[![Build Status](https://travis-ci.org/tandrewnichols/grunt-require-all.png)](https://travis-ci.org/tandrewnichols/grunt-require-all) [![downloads](http://img.shields.io/npm/dm/grunt-require-all.svg)](https://npmjs.org/package/grunt-require-all) [![npm](http://img.shields.io/npm/v/grunt-require-all.svg)](https://npmjs.org/package/grunt-require-all) [![Code Climate](https://codeclimate.com/github/tandrewnichols/grunt-require-all/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/grunt-require-all) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/grunt-require-all/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/grunt-require-all) [![dependencies](https://david-dm.org/tandrewnichols/grunt-require-all.png)](https://david-dm.org/tandrewnichols/grunt-require-all)

# grunt-require-all

Grunt plugin to require code in order to generate accurate code coverage reports

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```bash
npm install grunt-require-all --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-require-all');
```

Alternatively, install [task-master](http://github.com/tandrewnichols/task-master) and let it manage this for you.

## The "require" task

Some code coverage libraries don't account for modules that have no test at all (and are therefore not required). This task requires any file passed via the various grunt file formats allowing you to generate accurate code coverage metrics even when some of your modules have no test at all. Often, this is a single entry-point (because of the way the node require tree works), but you can also pass multiple file patterns if necessary.

### Overview

In your project's Gruntfile, add a section named `require` to the data object passed into `grunt.initConfig()`, along with one of the grunt file mechanisms. Note that `dest` has no meaning for this library, so you probably want to use the simpler `src` format.

```js
grunt.initConfig({
  require: {
    app: {
      src: ['lib/app.js']
    },
    mutlipleFiles: {
      src: ['lib/**/*.js', '!lib/app.js']
    }
  }
});
```

### Options

 The only option currently supported is `clearCache`, which removes any entries added to the cache by the `require` task.

```js
grunt.initConfig({
  require: {
    app: {
      options: {
        clearCache: true
      }
      src: ['lib/app.js']
    }
  }
});
```

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
