'use strict';

var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var _ = require('lodash');
var Applause = require('applause');
var fileSyncCmp = require('file-sync-cmp');
var isWindows = process.platform === 'win32';

var detectDestType = function (dest) {
  if (_.endsWith(dest, '/')) {
    return 'directory';
  }

  return 'file';
};

var unixifyPath = function (filepath) {
  if (isWindows) {
    return filepath.replace(/\\/g, '/');
  }

  return filepath;
};

var syncTimestamp = function (src, dest) {
  var stat = fs.lstatSync(src);
  if (path.basename(src) !== path.basename(dest)) {
    return;
  }

  if (stat.isFile() && !fileSyncCmp.equalFiles(src, dest)) {
    return;
  }

  var fd = fs.openSync(dest, isWindows ? 'r+' : 'r');
  fs.futimesSync(fd, stat.atime, stat.mtime);
  fs.closeSync(fd);
};

module.exports = function (grunt) {
  var replace = function (source, target, options, applause) {
    var res;
    grunt.file.copy(source, target, {
      encoding: options.encoding,
      process: function (content) {
        res = applause.replace(content, [source, target]);
        var result = res.content;
        // Force contents
        if (result === false && options.force === true) {
          result = content;
        }

        if (result !== false) {
          grunt.verbose.writeln('Replace ' + chalk.cyan(source) + ' → ' +
            chalk.green(target));
        }

        return result;
      },
      noProcess: options.noProcess || options.processContentExclude
    });
    return res;
  };

  grunt.registerMultiTask(
    'replace',
    'Replace text patterns with applause.',
    function () {
      // Took options
      var options = this.options({
        encoding: grunt.file.defaultEncoding,
        // ProcessContent/processContentExclude deprecated renamed to process/noProcess
        processContentExclude: [],
        mode: false,
        timestamp: false,
        patterns: [],
        excludeBuiltins: false,
        force: true,
        silent: false,
        pedantic: false
      });
      // Attach builtins
      var patterns = options.patterns;
      if (options.excludeBuiltins !== true) {
        patterns.push({
          match: '__SOURCE_FILE__',
          replacement: function (match, offset, string, source) {
            return source;
          },
          builtin: true
        }, {
          match: '__SOURCE_PATH__',
          replacement: function (match, offset, string, source) {
            return path.dirname(source);
          },
          builtin: true
        }, {
          match: '__SOURCE_FILENAME__',
          replacement: function (match, offset, string, source) {
            return path.basename(source);
          },
          builtin: true
        }, {
          match: '__TARGET_FILE__',
          // eslint-disable-next-line max-params
          replacement: function (match, offset, string, source, target) {
            return target;
          },
          builtin: true
        }, {
          match: '__TARGET_PATH__',
          // eslint-disable-next-line max-params
          replacement: function (match, offset, string, source, target) {
            return path.dirname(target);
          },
          builtin: true
        }, {
          match: '__TARGET_FILENAME__',
          // eslint-disable-next-line max-params
          replacement: function (match, offset, string, source, target) {
            return path.basename(target);
          },
          builtin: true
        });
      }

      // Create applause instance
      var applause = Applause.create(_.extend({}, options, {
        // Pass
      }));
      // Took code from copy task
      var isExpandedPair;
      var dirs = {};
      var tally = {
        dirs: 0,
        files: 0,
        replacements: 0,
        details: []
      };
      this.files.forEach(function (filePair) {
        isExpandedPair = filePair.orig.expand || false;
        filePair.src.forEach(function (src) {
          src = unixifyPath(src);
          var dest = unixifyPath(filePair.dest);
          if (detectDestType(dest) === 'directory') {
            dest = (isExpandedPair) ? dest : path.join(dest, src);
          }

          if (grunt.file.isDir(src)) {
            grunt.file.mkdir(dest);
            if (options.mode !== false) {
              fs.chmodSync(dest, (options.mode === true) ?
                fs.lstatSync(src).mode : options.mode);
            }

            if (options.timestamp) {
              dirs[dest] = src;
            }

            tally.dirs++;
          } else {
            var res = replace(src, dest, options, applause);
            tally.details = tally.details.concat(res.detail);
            tally.replacements += res.count;
            syncTimestamp(src, dest);
            if (options.mode !== false) {
              fs.chmodSync(dest, (options.mode === true) ?
                fs.lstatSync(src).mode : options.mode);
            }

            tally.files++;
          }

          if (options.mode !== false) {
            fs.chmodSync(dest, (options.mode === true) ?
              fs.lstatSync(src).mode : options.mode);
          }
        });
      });
      if (options.timestamp) {
        Object.keys(dirs).sort(function (a, b) {
          return b.length - a.length;
        }).forEach(function (dest) {
          syncTimestamp(dirs[dest], dest);
        });
      }

      // Warn for unmatched patterns in the file list
      if (options.silent !== true) {
        var count = 0;
        patterns.forEach(function (pattern) {
          if (pattern.builtin !== true) { // Exclude builtins
            var found = _.find(tally.details, ['source', pattern]);
            if (!found) {
              count++;
            }
          }
        });
        if (count > 0) {
          var strWarn = [
            'Unable to match ',
            count,
            count === 1 ? ' pattern' : ' patterns'
          ];
          if (applause.options.usePrefix === true) {
            strWarn.push(
              ' using ',
              applause.options.prefix,
              ' as a prefix'
            );
          }

          strWarn.push(
            '.'
          );
          if (options.pedantic === true) {
            grunt.fail.warn(strWarn.join(''));
          } else {
            grunt.log.warn(strWarn.join(''));
          }
        }

        var str = [
          tally.replacements,
          tally.replacements === 1 ? ' replacement' : ' replacements',
          ' in ',
          tally.files,
          tally.files === 1 ? ' file' : ' files',
          '.'
        ];
        grunt.log.ok(str.join(''));
      }
    }
  );
};
