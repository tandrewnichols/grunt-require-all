module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-mocha-cov');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-open');
grunt.loadNpmTasks('grunt-clean');
grunt.loadNpmTasks('grunt-travis-matrix');


  grunt.initConfig({
    clean: {
      coverage: 'coverage'
    },
    
    matrix: {
      v4: 'codeclimate-test-reporter < coverage/lcov.info'
    },
    travis: {
      options: {
        targets: {
          test: '{{ version }}',
          when: 'v4',
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
        src: ['test/helpers/**/*.coffee', 'test/**/*.coffee']
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
    }
  });

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('default', ['jshint:all', 'mocha']);
  grunt.registerTask('coverage', ['mochacov:html']);
  grunt.registerTask('ci', ['jshint:all', 'mocha', 'travis']);
};
