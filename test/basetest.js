var grunt = require('grunt');

module.exports = {
  create: function(dest) {
    return function(test) {
      'use strict';

      var expect, result;

      test.expect(4);

      expect = 'value\n';
      result = grunt.file.read(dest + 'simple.txt');
      test.equal(expect, result, 'should replace simple key with value');

      expect = 'value\n';
      result = grunt.file.read(dest + 'prefix.txt');
      test.equal(expect, result, 'should replace simple key with value using custom prefix');

      expect = 'value\n';
      result = grunt.file.read(dest + 'dynamic_key.txt');
      test.equal(expect, result, 'should replace templated key with defined value');

      expect = grunt.template.today('yyyy') + "\n";
      result = grunt.file.read(dest + 'dynamic_value.txt');
      test.equal(expect, result, 'should replace simple key with templated value');

      test.done();
    };
  }
};
