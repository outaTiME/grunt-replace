
/*
 * grunt-replace
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {

  'use strict';

  var path = require('path');
  var fs = require('fs');
  var util = require('util');
  var chalk = require('chalk');
  var _ = require('lodash');
  var Replacer = require('pattern-replace');

  grunt.registerMultiTask('replace', 'Replace text patterns with a given replacement.', function () {

    // took options

    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      mode: false,
      processContentExclude: []
    });

    // create replacer instance

    var replacer = new Replacer(options);

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
          replace(src, dest, options, replacer);
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

  var replace = function (source, target, options, replacer) {
    grunt.file.copy(source, target, {
      encoding: options.encoding,
      process: function (contents) {
        var result = replacer.replace(contents, {
          source: source,
          target: target
        });
        if (result !== false) {
          grunt.log.writeln('Replace ' + chalk.cyan(source) + ' → ' +
            chalk.cyan(target));
        } else {
          // not replace required
        }
        return result;
      },
      noProcess: options.noProcess || options.processContentExclude
    });
  };

};
