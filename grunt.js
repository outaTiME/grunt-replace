
/*
 *  Copyright 2012 outaTiME.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

module.exports = function (grunt) {

  grunt.initConfig({
    lint: {
      files: [
        'grunt.js',
        'tasks/**/*.js'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {

        // Settings
        "passfail"      : false,  // Stop on first error.
        "maxerr"        : 100,    // Maximum errors before stopping.
        "indent"        : 2,

        // Predefined globals whom JSHint will ignore.
        "browser"       : true,   // Standard browser globals e.g. `window`, `document`.

        "node"          : true,
        "rhino"         : false,
        "couch"         : false,
        "wsh"           : true,   // Windows Scripting Host.

        "jquery"        : true,
        "prototypejs"   : false,
        "mootools"      : false,
        "dojo"          : false,

        // Development.
        "debug"         : false,  // Allow debugger statements e.g. browser breakpoints.
        "devel"         : true,   // Allow development statements e.g. `console.log();`.

        // EcmaScript 5.
        "es5"           : true,   // Allow EcmaScript 5 syntax.
        "strict"        : false,  // Require `use strict` pragma in every file.
        "globalstrict"  : false,  // Allow global "use strict" (also enables 'strict').

        // The Good Parts.
        "asi"           : false,  // Tolerate Automatic Semicolon Insertion (no semicolons).
        "laxbreak"      : true,   // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
        "bitwise"       : true,   // Prohibit bitwise operators (&, |, ^, etc.).
        "boss"          : false,  // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
        "curly"         : true,   // Require {} for every new block or scope.
        "eqeqeq"        : true,   // Require triple equals i.e. `===`.
        "eqnull"        : false,  // Tolerate use of `== null`.
        "evil"          : false,  // Tolerate use of `eval`.
        "expr"          : false,  // Tolerate `ExpressionStatement` as Programs.
        "forin"         : false,  // Tolerate `for in` loops without `hasOwnPrototype`.
        "immed"         : true,   // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
        "latedef"       : true,   // Prohibit variable use before definition.
        "loopfunc"      : false,  // Allow functions to be defined within loops.
        "noarg"         : true,   // Prohibit use of `arguments.caller` and `arguments.callee`.
        "regexp"        : true,   // Prohibit `.` and `[^...]` in regular expressions.
        "regexdash"     : false,  // Tolerate unescaped last dash i.e. `[-...]`.
        "scripturl"     : true,   // Tolerate script-targeted URLs.
        "shadow"        : false,  // Allows re-define variables later in code e.g. `var x=1; x=2;`.
        "supernew"      : false,  // Tolerate `new function () { ... };` and `new Object;`.
        "undef"         : true,   // Require all non-global variables be declared before they are used.

        // Persone styling prefrences.
        "newcap"        : true,   // Require capitalization of all constructor functions e.g. `new F()`.
        "noempty"       : true,   // Prohibit use of empty blocks.
        "nonew"         : true,   // Prohibit use of constructors for side-effects.
        "nomen"         : true,   // Prohibit use of initial or trailing underbars in names.
        "onevar"        : false,  // Allow only one `var` statement per function.
        "plusplus"      : false,  // Prohibit use of `++` & `--`.
        "sub"           : false,  // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
        "trailing"      : true,   // Prohibit trailing whitespaces.
        "white"         : true    // Check against strict whitespace and indentation rules.

      },
      globals: {
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.registerTask('default', 'lint');

};
