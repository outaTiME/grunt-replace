#!/bin/sh

# bail immediately on error
set -e

# execute test files
npm test

# documentation build
node scripts/generate.js

CHANGES=$(git diff --numstat | wc -l)
CHANGES_CACHED=$(git diff --cached --numstat | wc -l)
TOTAL_CHANGES=$(($CHANGES + $CHANGES_CACHED))

# create the commit, tag the commit with the proper version
if [ $TOTAL_CHANGES -ne "0" ]
then
  git add --all
  git commit -am "README.md generation for $npm_package_version version."
fi

git tag $npm_package_version
git push
git push --tags

# publish to npm
npm publish
