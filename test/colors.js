'use strict';

const fs = require('fs')
var assert = require('assert')

eval.apply(this, [fs.readFileSync('./static/actions/colors.js').toString()]);

describe('Colors', function() {
  describe('#hexToRgb()', function() {
    it('convert hexadecimal color to rgb', function() {
      assert.deepEqual(
        hexToRgb('#fff'),
        { r: 255, g: 255, b: 255 }
      );
    });
  });
  describe('#rgbToHsl()', function() {
    it('convert rgb color to hsl', function() {
      assert.equal(
        rgbToHsl(255, 255, 255),
        1
      );
    });
  });
  describe('#componentToHex()', function() {
    it('convert an rgb component to hexadecimal value', function() {
      assert.deepEqual(
        componentToHex(45),
        '2d'
      );
    });
  });
  describe('#rgbToHex()', function() {
    it('convert rgb color to hexadecimal', function() {
      assert.deepEqual(
        rgbToHex(125, 0, 255),
        '#7d00ff'
      );
    });
  });
});


