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

describe('HEX to RGB tests', () => {
    
    it('#555 be 85,85,85', () => {
        var result = converter.hexToRgb("#555");
        
        assert.equal(result.r, 85);
        assert.equal(result.g, 85);
        assert.equal(result.b, 85);
    });
    
    it('#555555 be 85,85,85', () => {
        var result = converter.hexToRgb("#555555");

        assert.equal(result.r, 85);
        assert.equal(result.g, 85);
        assert.equal(result.b, 85);
    });
    
    it('#5555 be 0,0,0', () => {
        var result = converter.hexToRgb("#5555");
        
        assert.equal(result.r, 0);
        assert.equal(result.g, 0);
        assert.equal(result.b, 0);
    });
});