
var grunt = require('grunt');
var util = require('util');

exports['replace'] = {

  main: function (test) {

    'use strict';

    var expect;
    var result;
    var bool_result;
    var re;

    test.expect(30);

    expect = 'value\n';
    result = grunt.file.read('tmp/simple.txt');
    test.equal(expect, result, 'should replace simple key with value');

    expect = 'value\n';
    result = grunt.file.read('tmp/prefix.txt');
    test.equal(expect, result, 'should replace simple key with value using custom prefix');

    expect = '@@value\n';
    result = grunt.file.read('tmp/exclude_prefix.txt');
    test.equal(expect, result, 'should replace simple key with value except for prefix');

    expect = 'value\n';
    result = grunt.file.read('tmp/template_key.txt');
    test.equal(expect, result, 'should replace templated key with value');

    expect = '1996\n';
    result = grunt.file.read('tmp/template_value.txt');
    test.equal(expect, result, 'should replace simple key with templated value');

    expect = 'value\n';
    result = grunt.file.read('tmp/cwd/foo.txt');
    bool_result = expect === result;
    result = grunt.file.read('tmp/cwd/foo/bar.txt');
    bool_result = bool_result && expect === result;
    test.equal(true, bool_result, 'should replace simple key with value (in directory cwd mode)');

    expect = 'value\n';
    result = grunt.file.read('tmp/flatten/foo.txt');
    bool_result = expect === result;
    result = grunt.file.read('tmp/flatten/bar.txt');
    bool_result = bool_result && expect === result;
    test.equal(true, bool_result, 'should replace simple key with value (in directory flatten mode)');

    expect = '@@key\n';
    result = grunt.file.read('tmp/force.txt');
    test.equal(expect, result, 'should force copy of files (dont have any replace token)');

    expect = 2;
    result = grunt.file.read('tmp/cache.html');
    re = new RegExp('\\?rel=' + grunt.template.today('yyyy'), 'g');
    test.equal(expect, result.match(re).length, 'should expect two replaces in html cache file');

    expect = '$\'\n';
    result = grunt.file.read('tmp/escape.txt');
    test.equal(expect, result, 'should escape the dollar sign ($)');

    expect = 'detta är en sträng\n';
    result = grunt.file.read('tmp/special_chars.txt');
    test.equal(expect, result, 'should replace special characters');

    expect = 'foo\n\n';
    result = grunt.file.read('tmp/include.txt');
    test.equal(expect, result, 'should include the content file');

    expect = 'value\n';
    result = grunt.file.read('tmp/function.txt');
    test.equal(expect, result, 'should replace simple key with function return value');

    expect = 'value\n';
    result = grunt.file.read('tmp/new_way.txt');
    test.equal(expect, result, 'should replace simple key with value in the new way');

    expect = 'value\n';
    result = grunt.file.read('tmp/regexp.txt');
    test.equal(expect, result, 'should replace regexp key with value');

    expect = 'value\n';
    result = grunt.file.read('tmp/regexp_template.txt');
    test.equal(expect, result, 'should replace templated regexp key with value');

    expect = 'Smith, John\n';
    result = grunt.file.read('tmp/username.txt');
    test.equal(expect, result, 'should replace "John Smith" for "Smith, John"');

    expect = 'value\n';
    result = grunt.file.read('tmp/json.txt');
    test.equal(expect, result, 'should read from json and replace simple key with value');

    expect = 'value_1 value_2\n';
    result = grunt.file.read('tmp/json_external.txt');
    test.equal(expect, result, 'should read from external json file an make multiple replaces');

    expect = 'value_3 value_4\n';
    result = grunt.file.read('tmp/json_external_nested.txt');
    test.equal(expect, result, 'should read external json file and make multiple replaces in nested context');

    expect = '{"key_3":"value_3"}\n';
    result = grunt.file.read('tmp/json_external_nested_object.txt');
    test.equal(expect, result, 'should read external json file and make object replace in nested context');

    expect = grunt.template.today('yyyy') + '\n';
    result = grunt.file.read('tmp/json_external_template_value.txt');
    test.equal(expect, result, 'should read external json file and replace simple key with templated value');

    expect = '[1,2,3,4]\n';
    result = grunt.file.read('tmp/array.txt');
    test.equal(expect, result, 'should replace simple key with array object representation');

    expect = '["1996"]\n';
    result = grunt.file.read('tmp/array_template_value.txt');
    test.equal(expect, result, 'should replace simple key with templated array object representation');

    expect = '{"foo":"bar"}\n';
    result = grunt.file.read('tmp/object.txt');
    test.equal(expect, result, 'should replace simple key with plain object representation');

    expect = '{"foo":"bar"}\n';
    result = grunt.file.read('tmp/object_template_value.txt');
    test.equal(expect, result, 'should replace simple key with templated plain object representation');

    expect = '\n\'use strict\';\n\nangular.module(\'services.config\', [])\n  .constant(\'configuration\', {\n    key: {"foo":"bar"}\n  });\n';
    result = grunt.file.read('tmp/object_angular.txt');
    test.equal(expect, result, 'should replace simple key with external json file');

    // sort

    expect = '1-2-3\n';
    result = grunt.file.read('tmp/sort.txt');
    test.equal(expect, result, 'should sort the locals to prevent bad replaces');

    expect = '1-2-3\n';
    result = grunt.file.read('tmp/json_sort.txt');
    test.equal(expect, result, 'should sort the json locals to prevent bad replaces');

    expect = '1a-2a-3a\n';
    result = grunt.file.read('tmp/multiple_replacement.txt');
    test.equal(expect, result, 'should replace multiple times (for each pattern definition)');

    test.done();

  }

};
