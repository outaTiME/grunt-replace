
/*
 * grunt-replace
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

'use strict';

// plugin

module.exports = function (grunt) {

  var path = require('path');
  var fs = require('fs');
  var chalk = require('chalk');
  var Applause = require('applause');

  grunt.registerMultiTask('replace', 'Replace text patterns with applause.', function () {

    // took options

    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      mode: false,
      processContentExclude: [],
      patterns: [],
      excludeBuiltins: false,
      force: true,
      verbose: true
    });

    // attach builtins

    var patterns = options.patterns;

    if (options.excludeBuiltins !== true) {
      patterns.push({
        match: '__SOURCE_FILE__',
        replacement: function (match, offset, string, source, target) {
          return source;
        }
      }, {
        match: '__SOURCE_PATH__',
        replacement: function (match, offset, string, source, target) {
          return path.dirname(source);
        }
      }, {
        match: '__SOURCE_FILENAME__',
        replacement: function (match, offset, string, source, target) {
          return path.basename(source);
        }
      }, {
        match: '__TARGET_FILE__',
        replacement: function (match, offset, string, source, target) {
          return target;
        }
      }, {
        match: '__TARGET_PATH__',
        replacement: function (match, offset, string, source, target) {
          return path.dirname(target);
        }
      }, {
        match: '__TARGET_FILENAME__',
        replacement: function (match, offset, string, source, target) {
          return path.basename(target);
        }
      });
    }

    // create applause instance

    var applause = Applause.create(options);

    // took code from copy task

    var dest;
    var isExpandedPair;

    this.files.forEach(function (filePair) {
      isExpandedPair = filePair.orig.expand || false;
      filePair.src.forEach(function (src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }
        if (grunt.file.isDir(src)) {
          grunt.file.mkdir(dest);
        } else {
          replace(src, dest, options, applause);
          if (options.mode !== false) {
            fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
          }
        }
      });
    });

  });

  var detectDestType = function (dest) {
    var lastChar = dest.slice(-1);
    if (lastChar === '/') {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function (filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  var replace = function (source, target, options, applause) {
    grunt.file.copy(source, target, {
      encoding: options.encoding,
      process: function (contents) {
        var result = applause.replace(contents, [source, target]);
        // force contents
        if (result === false && options.force === true) {
          result = contents;
        }
        if (result !== false && options.verbose === true) {
          grunt.log.writeln('Replace ' + chalk.cyan(source) + ' → ' +
            chalk.green(target));
        }
        return result;
      },
      noProcess: options.noProcess || options.processContentExclude
    });
  };

};
