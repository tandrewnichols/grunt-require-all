module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-travis-matrix');
  grunt.loadTasks('tasks');

  grunt.initConfig({
    clean: {
      coverage: 'coverage'
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        eqeqeq: true,
        es3: true,
        indent: 2,
        newcap: true,
        quotmark: 'single',
        boss: true
      },
      all: ['tasks/**/*.js']
    },
    matrix: {
      'v4.2': 'codeclimate-test-reporter < coverage/lcov.info'
    },
    travis: {
      options: {
        targets: {
          test: '{{ version }}',
          when: 'v4.2',
          tasks: ['istanbul:unit', 'matrix:v4']
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        ui: 'mocha-given',
        require: 'coffee-script/register'
      },
      test: {
        src: ['test/helpers/**/*.coffee', 'test/**/*.coffee', '!test/int*']
      },
      intSingle: {
        src: ['test/int-single.coffee']
      },
      intMulti: {
        src: ['test/int-multi.coffee']
      },
      intClear: {
        src: ['test/int-clear.coffee']
      }
    },
    mochacov: {
      lcov: {
        options: {
          reporter: 'mocha-lcov-reporter',
          ui: 'mocha-given',
          instrument: true,
          require: 'coffee-script/register',
          output: 'coverage/coverage.lcov'
        },
        src: ['test/**/*.coffee'],
      },
      html: {
        options: {
          reporter: 'html-cov',
          ui: 'mocha-given',
          require: 'coffee-script/register',
          output: 'coverage/coverage.html'
        },
        src: ['test/**/*.coffee']
      }
    },
    open: {
      coverage: {
        path: 'coverage/coverage.html'
      }
    },
    watch: {
      tests: {
        files: ['tasks/**/*.js', 'test/**/*.coffee'],
        tasks: ['mocha'],
        options: {
          atBegin: true
        }
      }
    },
    require: {
      single: {
        src: ['test/fixtures/foo.js']
      },
      multi: {
        src: ['test/fixtures/**/*.js', '!test/fixtures/foo.js']
      },
      clear: {
        options: {
          clearCache: true
        },
        src: ['test/fixtures/foo.js']
      }
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint:all', 'mochaTest:test', 'int:single', 'int:multi', 'int:clear']);
  grunt.registerTask('coverage', ['mochacov:html']);
  grunt.registerTask('ci', ['default', 'travis']);
  grunt.registerTask('int:single', ['require:single', 'mochaTest:intSingle']);
  grunt.registerTask('int:multi', ['require:multi', 'mochaTest:intMulti']);
  grunt.registerTask('int:clear', ['require:clear', 'mochaTest:intClear']);
};
