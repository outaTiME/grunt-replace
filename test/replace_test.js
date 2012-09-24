var grunt = require('grunt');

exports['replace'] = {
  main: function(test) {
    'use strict';

    var expect, result;

    test.expect(5);

    expect = 'value\n';
    result = grunt.file.read('tmp/simple.txt');
    test.equal(expect, result, 'should replace simple key with value');

    expect = 'value\n';
    result = grunt.file.read('tmp/prefix.txt');
    test.equal(expect, result, 'should replace simple key with value using custom prefix');

    expect = 'value\n';
    result = grunt.file.read('tmp/dynamic_key.txt');
    test.equal(expect, result, 'should replace templated key with defined value');

    expect = grunt.template.today('yyyy') + "\n";
    result = grunt.file.read('tmp/dynamic_value.txt');
    test.equal(expect, result, 'should replace simple key with templated value');
    
    expect = 'value\n';
    result = grunt.file.read('tmp/dynamic_prefix.txt');
    test.equal(expect, result, 'should replace simple key with value using templated prefix');

    test.done();
  }
};
