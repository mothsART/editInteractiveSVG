'use strict';
const fs = require('fs')
const assert = require('assert')
const semver = require('semver')


eval.apply(this, [fs.readFileSync('./static/retro_compatibility.js').toString()])


describe('Retro compatibility', function() {
  describe('#__version__() => "' + __version__() + '"', function() {
    it('version is semver', function() {
      assert.notEqual(
        semver.valid(__version__()),
        null
      );
    });
  });

  describe('#greater then', function() {
    it('version 1.0.1 is greater then 1.0', function() {
      assert.deepEqual(
        greater_then('1.0.1', '1.0'),
        true
      );
    });
    it('version 1.8.2 is greater then 1.8.1', function() {
      assert.deepEqual(
        greater_then('1.8.2', '1.8.1'),
        true
      );
    });
  });
  
    describe('#__version__() => "' + __version__() + ' is stable ?"', function() {
    it('version is semver', function() {
      assert.equal(
        __version__() == semver.valid(semver.coerce(__version__())),
        true
      );
    });
  });
  
});
