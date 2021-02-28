var test = require('ava');
var grunt = require('grunt');
var path = require('path');
var exec = require('child_process').exec;
var rimraf = require('rimraf');

test('should replace simple key with value', function (t) {
  var result = grunt.file.read('temp/simple.txt');
  t.is(result, 'value\n');
});

test.cb('should verbose when "silent" is false', function (t) {
  exec('grunt replace:verbose', {
    cwd: path.join(__dirname, '..')
  }, function (error, stdout) {
    t.not(stdout.indexOf('1 replacement in 1 file.'), -1);
    t.end();
  });
});

test.cb('should warn when no matches exist', function (t) {
  exec('grunt replace:warning', {
    cwd: path.join(__dirname, '..')
  }, function (error, stdout) {
    t.is(stdout.indexOf('Warning: Unable to match 1 pattern'), -1);
    t.end();
  });
});

test.cb('should fail when no matches exist and "pedantic" is true', function (t) {
  exec('grunt replace:fail', {
    cwd: path.join(__dirname, '..')
  }, function (error, stdout) {
    t.is(error.code, 6);
    t.not(stdout.indexOf('Warning: Unable to match 1 pattern'), -1);
    t.end();
  });
});

// Built-in

test('should replace using built-in replacement (__SOURCE_FILE__)', function (t) {
  var result = grunt.file.read('temp/built-in_source_file.txt');
  t.is(result, 'test/fixtures/built-in_source_file.txt\n');
});

test('should replace using built-in replacement (__SOURCE_PATH__)', function (t) {
  var result = grunt.file.read('temp/built-in_source_path.txt');
  t.is(result, 'test/fixtures\n');
});

test('should replace using built-in replacement (__SOURCE_FILENAME__)', function (t) {
  var result = grunt.file.read('temp/built-in_source_filename.txt');
  t.is(result, 'built-in_source_filename.txt\n');
});

test('should replace using built-in replacement (__TARGET_FILE__)', function (t) {
  var result = grunt.file.read('temp/built-in_target_file.txt');
  t.is(result, 'temp/built-in_target_file.txt\n');
});

test('should replace using built-in replacement (__TARGET_PATH__)', function (t) {
  var result = grunt.file.read('temp/built-in_target_path.txt');
  t.is(result, 'temp\n');
});

test('should replace using built-in replacement (__TARGET_FILENAME__)', function (t) {
  var result = grunt.file.read('temp/built-in_target_filename.txt');
  t.is(result, 'built-in_target_filename.txt\n');
});

test.after.always.cb(function (t) {
  rimraf('temp', t.end);
});
