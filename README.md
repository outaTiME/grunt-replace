# grunt-replace [![Build Status](https://secure.travis-ci.org/outaTiME/grunt-replace.png?branch=master)](http://travis-ci.org/outaTiME/grunt-replace)

> Replace text patterns with a given string.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-replace');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/outaTiME/grunt-replace/tree/grunt-0.3-stable).*



## Replace task
_Run this task with the `grunt replace` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

##### patterns
Type: `Array`

Define patterns that will be used to replace the contents of source files.

```javascript
options: {
  patterns: [
    {
      match: 'foo',
      replacement: 'bar',
      expression: false
    }
  ]
}
```

// FIXME: add details for match, replacement and expression ...

##### prefix
Type: `String`
Default: `@@`

This prefix is used to create the real replacement pattern for lookup only when expression is `false`.

##### force
Type: `Boolean`
Default: `false`

Force the copy of files even when those files don't have any replace token.

##### mode
Type: `Number`
Default: `0666`

Sets the file mode (permission and sticky bits).

### Usage Examples

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'key',
          replacement: 'value'
        }
      ],
      prefix: '@@'
    },
    files: [
      {expand: true, flatten: true, src: ['test/fixtures/prefix.txt'], dest: 'tmp/'}
    ]
  }
}
```

#### Short

Define the pattern place:

```
// build/manifest.appcache

CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

##### Gruntfile

Define pattern (for timestamp) and the source files for lookup:

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'timestamp',
          replacement: '<%= grunt.template.today() %>'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['build/manifest.appcache'], dest: 'public/'}
    ]
  }
}
```

#### Multiple

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'version',
          replacement: '<%= pkg.version %>'
        },
        {
          match: 'timestamp',
          replacement: '<%= grunt.template.today() %>'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['build/manifest.appcache', 'build/humans.txt'], dest: 'public/'}
    ]
  }
}
```

#### Cache busting

In app/assets/index.html:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

##### Gruntfile

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'timestamp',
          replacement: '<%= new Date().getTime() %>'
        }
      ]
    },
    files: [
      {src: ['app/assets/index.html'], dest: 'build/index.html'}
    ]
  }
}
```

#### Include file

In build/index.html:

```html
<body>
  @@include
</body>
```

##### Gruntfile

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: 'include',
          replacement: '<%= grunt.file.read("includes/content.html") %>'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['build/index.html'], dest: 'public/'}
    ]
  }
}
```

#### Regular expression

In build/.username:

```
John Smith
```

##### Gruntfile

```js
replace: {
  dist: {
    options: {
      patterns: [
        {
          match: /(\w+)\s(\w+)/,
          replacement: '$2, $1', // saves "Smith, John"
          expression: true
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['build/.username'], dest: 'public/'}
    ]
  }
}
```


## Release History

 * 2013-09-17   v0.5.0   Regular expression matching now supported, the notation has been updated but is backward compatible.
 * 2013-05-03   v0.4.4   Fix escape $ before performing regexp replace (thanks @warpech).
 * 2013-04-14   v0.4.3   Detect path destinations correctly on Windows.
 * 2013-04-02   v0.4.2   Add peerDependencies and update description.
 * 2013-04-02   v0.4.1   Add trace when force flag.
 * 2013-02-28   v0.4.0   First official release for Grunt 0.4.0.
 * 2012-11-20   v0.3.2   New examples added.
 * 2012-09-25   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib, add force flag.
 * 2012-09-25   v0.3.0   General cleanup and consolidation. Global options depreciated.

---

Task submitted by [Ariel Falduto](http://outa.im/)
