/* jshint node: true */
/*!
 * Visyond's Gruntfile
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
              ' * IntroJS v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
              ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
              ' */\n',
    bannerDocs: '/*!\n' +
              ' * IntroJS Docs (<%= pkg.homepage %>)\n' +
              ' * Copyright 2012-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * <%= _.pluck(pkg.licenses, "type") %> (<%= _.pluck(pkg.licenses, "url") %>)\n' +
              ' */\n',

    // Task configuration.
    clean: {
      dist: 'dist'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['intro.js', 'introJQHelper.js']
      },
      custom_build: {
        src: ['BUILD/BUILD.js']
      }
    },

    jscs: {
      options: {
        config: '.jscs.json',
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['intro.js', 'introJQHelper.js']
      },
      custom_build: {
        src: ['BUILD/BUILD.js']
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: [
        'introjs.css',
        'introjs-rtl.css',
        'example/assets/css/bootstrap.css',
        'example/assets/css/demo.css'
      ]
    },

    uglify: {
      main: {
        options: {
          banner: '<%= banner %>',
          report: 'min'
        },
        src: 'intro.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    cssmin: {
      compress: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        src: [
          'introjs.css'
        ],
        dest: 'dist/css/introjs.min.css'
      },
      compress_rtl: {
        options: {
          keepSpecialComments: '*',
          noAdvanced: true, // turn advanced optimizations off until the issue is fixed in clean-css
          report: 'min',
          selectorsMergeMode: 'ie8'
        },
        src: [
          'introjs-rtl.css'
        ],
        dest: 'dist/css/introjs-rtl.min.css'
      }
    },

    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            'dist/css/introjs.css',
            'dist/css/introjs.min.css',
            'dist/css/introjs-rtl.css',
            'dist/css/introjs-rtl.min.css',
          ]
        }
      }
    },

    csscomb: {
      sort: {
        options: {
          config: '.csscomb.json'
        },
        files: {
          'introjs.css': 'introjs.css',
          'introjs-rtl.css': 'introjs-rtl.css'
        }
      }
    },

    copy: {
      js: {
        expand: true,
        src: 'intro.js',
        dest: 'dist/js/'
      },
      css: {
        expand: true,
        src: 'introjs*.css',
        dest: 'dist/css/'
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Element img is missing required attribute src.'
        ]
      },
      files: {
        src: 'example/**/*.html'
      }
    },

    exec: {
      custom: {
        command: 'node BUILD.js'
      }
    }
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  //grunt.loadNpmTasks('grunt-exec');

  // Docs HTML validation task
  grunt.registerTask('custom_build', ['exec:custom']);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Test task.
  grunt.registerTask('test', 'validate-html');

  // JS distribution task.
  grunt.registerTask('dist-js', ['copy:js', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['copy:css', 'cssmin', 'csscomb', 'usebanner']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css', 'dist-js']);

  // Lint task.
  grunt.registerTask('lint', ['csslint', 'jshint', 'jscs']);

  // Default task.
  grunt.registerTask('default', ['test', 'lint', 'dist']);
};
