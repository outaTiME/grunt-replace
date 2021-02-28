# grunt-replace

[![Build Status](https://img.shields.io/travis/outaTiME/grunt-replace.svg)](https://travis-ci.org/outaTiME/grunt-replace)
[![Version](https://img.shields.io/npm/v/grunt-replace.svg)](https://www.npmjs.com/package/grunt-replace)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: outa7iME](https://img.shields.io/twitter/follow/outa7iME.svg?style=social)](https://twitter.com/outa7iME)

> Replace text patterns with [applause](https://github.com/outaTiME/applause).

## Install

From NPM:

```shell
npm install grunt-replace --save-dev
```

## Usage

Assuming installation via NPM, you can use `grunt-replace` in your gruntfile like this:

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'foo',
              replacement: 'bar'
            }
          ]
        },
        files: [
          {
            expand: true, flatten: true, src: ['src/index.html'], dest: 'build/'
          }
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-replace');
  grunt.registerTask('default', ['replace']);
};
```

## Options

Supports all the applause [options](https://github.com/outaTiME/applause#options) in addition to the ones below.

### excludeBuiltins
Type: `Boolean`
Default: `false`

If set to `true`, the built-in matching rules are excluded.

### force
Type: `Boolean`
Default: `true`

Force the copy of files even when those files don't have any match found for replacement.

### noProcess
Type: `String`

This option is an advanced way to control which file contents are processed.

> `processContentExclude` has been renamed to `noProcess` and the option name will be removed in the future.

### encoding
Type: `String`
Default: `grunt.file.defaultEncoding`

The file encoding to copy files with.

### mode
Type: `Boolean` or `Number`
Default: `false`

Whether to copy or set the existing file permissions. Set to `true` to copy the existing file permissions. Or set to the mode, i.e.: `0644`, that copied files will be set to.

### timestamp
Type: `Boolean`
Default: `false`

Whether to preserve the timestamp attributes (atime and mtime) when copying files. Set to true to preserve files timestamp. But timestamp will not be preserved when the file contents or name are changed during copying.

### silent
Type: `Boolean`
Default: `false`

If set to `true`, removes the output from stdout.

### pedantic
Type: `Boolean`
Default: `false`

If set to `true`, the task will fail with a `grunt.fail.warn` when no matches are present.

## Built-in replacements

Few matching rules are provided by default and can be used anytime (these will be affected by the `options` given):

 *  `__SOURCE_FILE__`:

    Replace match with the source file.

 *  `__SOURCE_PATH__`:

    Replace match with the path of source file.

 *  `__SOURCE_FILENAME__`:

    Replace match with the filename of source file.

 *  `__TARGET_FILE__`:

    Replace match with the target file.

 *  `__TARGET_PATH__`:

    Replace match with the path of target file.

 *  `__TARGET_FILENAME__`:

    Replace match with the filename of target file.

> If you are looking how to use an `built-in` replacements, check out the [How to insert filename in target](#how-to-insert-filename-in-target) usage.

## Examples

### Basic

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

Task configuration on gruntfile:

```javascript
{
  options: {
    patterns: [
      {
        match: 'timestamp',
        replacement: '<%= Date.now() %>'
      }
    ]
  },
  files: [
    {
      expand: true, flatten: true, src: ['src/manifest.appcache'], dest: 'build/'
    }
  ]
}
```

### Multiple matching

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

File `src/humans.txt`:

```
              __     _
   _    _/__  /./|,//_`
  /_//_// /_|///  //_, outaTiME v.@@version

/* TEAM */
  Web Developer / Graphic Designer: Ariel Oscar Falduto
  Site: https://www.outa.im
  Twitter: @outa7iME
  Contact: afalduto at gmail dot com
  From: Buenos Aires, Argentina

/* SITE */
  Last update: @@timestamp
  Standards: HTML5, CSS3, robotstxt.org, humanstxt.org
  Components: H5BP, Modernizr, jQuery, Bootstrap, LESS, Jade, Grunt
  Software: Sublime Text, Photoshop, LiveReload
```

Task configuration on gruntfile:

```javascript
{
  options: {
    patterns: [
      {
        match: 'version',
        replacement: '<%= pkg.version %>'
      },
      {
        match: 'timestamp',
        replacement: '<%= Date.now() %>'
      }
    ]
  },
  files: [
    {
      expand: true, flatten: true, src: ['src/manifest.appcache', 'src/humans.txt'], dest: 'build/'
    }
  ]
}
```

### Cache busting

File `src/index.html`:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

Task configuration on gruntfile:

```javascript
{
  options: {
    patterns: [
      {
        match: 'timestamp',
        replacement: '<%= Date.now() %>'
      }
    ]
  },
  files: [
    {
      src: ['src/index.html'], dest: 'build/index.html'
    }
  ]
}
```

### Include file

File `src/index.html`:

```html
<body>
  @@include
</body>
```

Task configuration on gruntfile:

```javascript
{
  options: {
    patterns: [
      {
        match: 'include',
        replacement: '<%= grunt.file.read("includes/content.html") %>'
      }
    ]
  },
  files: [
    {
      expand: true, flatten: true, src: ['src/index.html'], dest: 'build/'
    }
  ]
}
```

### Regular expression

File `src/username.txt`:

```
John Smith
```

Task configuration on gruntfile:

```javascript
{
  options: {
    patterns: [
      {
        match: /(\w+)\s(\w+)/,
        replacement: '$2, $1' // Replaces "John Smith" with "Smith, John"
      }
    ]
  },
  files: [
    {
      expand: true, flatten: true, src: ['src/username.txt'], dest: 'build/'
    }
  ]
}
```

### Lookup for `foo` instead of `@@foo`

Task configuration on gruntfile:

```javascript
{
  'opt-1': {
    options: {
      patterns: [
        {
          match: /foo/g, // Explicitly using a regexp
          replacement: 'bar'
        }
      ]
    },
    files: [
      {
        expand: true, flatten: true, src: ['src/foo.txt'], dest: 'build/'
      }
    ]
  },
  'opt-2': {
    options: {
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      usePrefix: false // Using the option provided
    },
    files: [
      {
        expand: true, flatten: true, src: ['src/foo.txt'], dest: 'build/'
      }
    ]
  },
  'opt-3': {
    options: {
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      prefix: '' // Removing the prefix manually
    },
    files: [
      {
        expand: true, flatten: true, src: ['src/foo.txt'], dest: 'build/'
      }
    ]
  }
}
```

### How to insert filename in target

File `src/app.js`:

```javascript
// Filename: @@__SOURCE_FILENAME__

var App = App || (function () {
  return {
    // App contents
  };
})();

window.App = App;
```

Task configuration on gruntfile:

```javascript
{
  options: {
    // Pass, we use built-in replacements
  },
  files: [
    {
      expand: true, flatten: true, src: ['src/**/*.js'], dest: 'build/'
    }
  ]
}
```

## Related

- [applause](https://github.com/outaTiME/applause) - Human-friendly replacements

## License

MIT © [outaTiME](https://outa.im)
