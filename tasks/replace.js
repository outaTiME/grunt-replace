
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

  grunt.registerMultiTask('replace', 'Replace text patterns with a given string.', function () {

    var _ = grunt.util._;
    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      mode: false,
      patterns: [],
      prefix: '@@',
      force: false
    });
    var patterns = options.patterns;
    var locals = [];

    // backward compatible support

    var variables = options.variables;
    if (typeof variables !== 'undefined') {
      patterns.push({
        json: variables
      });
    }

    // intercept and transform json objects

    // grunt.log.debug('Patterns: ' + chalk.yellow(JSON.stringify(patterns)));

    for (var i = patterns.length - 1; i >= 0; i -= 1) {
      var json = patterns[i].json;
      if (typeof json !== "undefined") {
        if (_.isPlainObject(json)) {
          var items = flatten(json);
          // replace json with flatten data
          Array.prototype.splice.apply(patterns, [i, 1].concat(items));
        } else {
          grunt.fail.fatal('Unsupported type for json (plain object expected).');
          return;
        }
      }
    }

    // only sort non regex patterns (prevents replace issues like head, header)

    patterns.sort(function (a, b) {
      var aMatch = a.match;
      var bMatch = b.match;
      if (_.isString(aMatch) && _.isString(bMatch)) {
        return bMatch.length - aMatch.length;
      } else if (_.isString(aMatch)) {
        return -1;
      }
      return 1;
    });

    grunt.log.debug('Patterns: ' + JSON.stringify(patterns));

    // register patterns

    patterns.forEach(function (pattern) {
      registerPattern(pattern, locals, options);
    });

    if (locals.length === 0 && options.force === false) {
      grunt.fail.warn('Not found valid patterns to be replaced.');
    }

    // grunt.log.debug('Locals: ' + chalk.yellow(JSON.stringify(locals)));

    // took code from copy task

    var dest;
    var isExpandedPair;

    this.files.forEach(function(filePair) {
      isExpandedPair = filePair.orig.expand || false;
      filePair.src.forEach(function(src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }
        if (grunt.file.isDir(src)) {
          grunt.file.mkdir(dest);
        } else {
          replace(src, dest, locals, options);
          if (options.mode !== false) {
            fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
          }
        }
      });
    });

  });

  var detectDestType = function (dest) {
    var _ = grunt.util._;
    if (_.endsWith(dest, '/')) {
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

  var registerPattern = function (pattern, locals, options) {
    var _ = grunt.util._;
    var match = pattern.match;
    var replacement = pattern.replacement;
    var expression = pattern.expression === true;
    // check matching type
    if (_.isRegExp(match)) {
      if (expression === false) {
        expression = true;
      }
    } else if (_.isString(match)) {
      if (match.length > 0) {
        if (expression === true) {
          var index = match.lastIndexOf('/');
          if (match[0] === '/' && index > 0) {
            try {
              match = new RegExp(match.slice(1, index), match.slice(index + 1));
            } catch (error) {
              grunt.fail.fatal(error);
              return;
            }
          } else {
            grunt.fail.fatal('Invalid expression found for match: ' + match);
            return;
          }
        } else {
          // old school
          try {
            match = new RegExp(options.prefix + match, "g");
          } catch (error) {
            grunt.fail.fatal(error);
            return;
          }
        }
      } else {
        // invalid match, ignore rule
        return;
      }
    } else {
      grunt.fail.fatal('Unsupported type for match (RegExp or String expected).');
      return;
    }
    // replacement check
    if (!_.isFunction(replacement)) {
      if (!_.isString(replacement)) {
        // transform object to string
        replacement = JSON.stringify(replacement);
      } else {
        // easy way
      }
    } else {
      // replace using function return value
    }
    locals.push({
      match: match,
      replacement: replacement,
      expression: expression
    });
  };

  var replace = function (srcFile, destFile, locals, options) {
    grunt.file.copy(srcFile, destFile, {
      encoding: options.encoding,
      process: function (contents) {
        var updated = false;
        locals.forEach(function (pattern) {
          var re = pattern.match;
          var replacement = pattern.replacement;
          updated = updated || contents.match(re);
          contents = contents.replace(re, replacement);
        });
        if (!updated && options.force === false) {
          return false;
        }
        grunt.log.writeln('Replace ' + chalk.cyan(srcFile) + ' -> ' +
          chalk.cyan(destFile));
        return contents;
      }
    });
  };

  var flatten = function (data) {
    var result = [];
    function recurse (cur, prop) {
      for (var key in cur) {
        if (cur.hasOwnProperty(key)) {
          var item = cur[key];
          result.push({
            match: prop ? prop + "." + key : key,
            replacement: item,
            expression: false
          });
          // deep scan
          if (typeof item === 'object') {
            recurse(item, prop ? prop + "." + key : key);
          }
        }
      }
    }
    recurse(data);
    return result;
  };

};
