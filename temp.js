      ,
      base_simple: {
        options: {
          variables: {
            'key': 'value'
          }
        },
        files: {
          'tmp/base_simple/': ['test/fixtures/base_simple/**/*.txt']
        }
      },
      flatten: {
        options: {
          variables: {
            'key': 'value'
          },
          flatten: true
        },
        files: {
          'tmp/flatten/': ['test/fixtures/flatten/**/*.txt']
        }
      },
      force: {
        options: {
          force: true
        },
        files: {
          'tmp/': ['test/fixtures/force.txt']
        }
      }
