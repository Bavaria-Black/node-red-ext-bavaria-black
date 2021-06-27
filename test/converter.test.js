const assert = require('assert');
const bavaria = require('../src/index.js');

var converter = bavaria.converter;

describe('XY to RGB tests', () => {
    
    it('0.3227,0.329 should be 255,252,252', () => {
        var result = converter.xyToRgb(0.3227, 0.329);
        
        assert.strictEqual(result.r, 255);
        assert.strictEqual(result.g, 252);
        assert.strictEqual(result.b, 252);
    });
});

describe('HEX to RGB tests', () => {
    
    it('#555 be 85,85,85', () => {
        var result = converter.hexToRgb("#555");
        
        assert.strictEqual(result.r, 85);
        assert.strictEqual(result.g, 85);
        assert.strictEqual(result.b, 85);
    });
    
    it('#555555 be 85,85,85', () => {
        var result = converter.hexToRgb("#555555");

        assert.strictEqual(result.r, 85);
        assert.strictEqual(result.g, 85);
        assert.strictEqual(result.b, 85);
    });
    
    it('#5555 be 0,0,0', () => {
        var result = converter.hexToRgb("#5555");
        
        assert.strictEqual(result.r, 0);
        assert.strictEqual(result.g, 0);
        assert.strictEqual(result.b, 0);
    });
});