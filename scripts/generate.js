
/*
 * grunt-replace
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

var fs = require('fs');
var filename = 'node_modules/pattern-replace/README.md';
var readme = fs.readFileSync(filename, 'utf8');
// initialize section
var sections = {};
// http://regex101.com/r/wJ2wW8
var pattern = /(\n#{3}\s)(.*)([\s\S]*?)(?=\1|$)/ig;
var match;
while ((match = pattern.exec(readme)) !== null) {
  var section = match[2];
  var contents = match[3];
  // trace
  /* var msg = "Found " + section + " → ";
  msg += "Next match starts at " + pattern.lastIndex;
  console.log(msg); */
  sections[section] = contents;
}

// write readme

var Replacer = require('pattern-replace');
var options = {
  variables: {
    'options': function () {
      var name = 'Replacer Options';
      return sections[name] || '_(Coming soon)_'; // empty
    }
  }
};
var replacer = new Replacer(options);
var contents = fs.readFileSync('docs/README.md', 'utf8');
var result = replacer.replace(contents);
fs.writeFileSync('README.md', result, 'utf8');
