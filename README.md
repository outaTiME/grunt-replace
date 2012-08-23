[![build status](https://secure.travis-ci.org/outaTiME/grunt-replace.png)](http://travis-ci.org/outaTiME/grunt-replace)
# grunt-replace

[Grunt][grunt] task to replace inline patterns with defined variables to make the world a better place.

## Getting Started

Install this grunt plugin next to your project's with: `npm install grunt-replace`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-replace');
```

## Documentation

### Full example usage

#### Put variable pattern in source

In our source file we define the place where variable will be injected (default `prefix` used by replacer is `@@`):

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

#### Define variables per file in gruntfile

```javascript
//...
replace: {
  dist: {
    src: ['build/manifest.appcache'],
    dest: 'public',
    variables: {
      timestamp: '<%= grunt.template.today() %>'
    }
  }
}
//...
```

#### Explain please !!

In details, we have one source `build/manifest.appcache` and want to inject `timestamp` variable value and then put them in `dest` destination.

### Usage variations

#### Replace over src file list (one target)

```javascript
replace: {
  dist: {
    src: ['build/manifest.appcache', 'build/humans.txt'],
    dest: 'public',
    variables: {
      version: '<%= pkg.version %>',
      timestamp: '<%= grunt.template.today() %>'
    }
  }
}
```

#### Replace over both src with variables at replacer space (multiple target)

```javascript
replace: {
  foo: {
    src: ['build/foo.txt'],
    dest: 'public'
  },
  dist: {
    src: ['build/manifest.appcache', 'build/humans.txt'],
    dest: 'public'
  }
},
// ...
replacer: {
  variables: {
    version: '<%= pkg.version %>',
    timestamp: '<%= grunt.template.today() %>'
  }
}
```

#### Define prefix for pattern lookup (in target)

```javascript
replace: {
  dist: {
    src: ['build/manifest.appcache', 'build/humans.txt'],
    dest: 'public',
    variables: {
      version: '<%= pkg.version %>',
      timestamp: '<%= grunt.template.today() %>'
    },
    perfix: '@@'
  }
}
```

#### Define prefix for pattern lookup (in replacer space)

```javascript
replace: {
  dist: {
    src: ['build/manifest.appcache', 'build/humans.txt'],
    dest: 'public'
}
// ...
replacer: {
  variables: {
    version: '<%= pkg.version %>',
    timestamp: '<%= grunt.template.today() %>'
  },
  perfix: '@@'
}
```

### Options

```javascript
// default
variables: {},
prefix: '@@'
```

## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Authors

**Ariel Falduto**

+ <http://github.com/outaTiME>

## License

Copyright 2012 outaTiME.

Licensed under the Apache License, Version 2.0: <http://www.apache.org/licenses/LICENSE-2.0>

[grunt]: https://github.com/cowboy/grunt
