const assert = require('assert');
const bavaria = require('../src/index.js');

var converter = bavaria.converter;

describe('XY to RGB tests', () => {
    
    it('0.3227,0.329 should be 255,252,252', () => {
        var result = converter.xyToRgb(0.3227, 0.329);
        
        assert.equal(result.r, 255);
        assert.equal(result.g, 252);
        assert.equal(result.b, 252);
    });
});