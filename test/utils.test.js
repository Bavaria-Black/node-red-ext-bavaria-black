const assert = require('assert');
const bavaria = require('../src/index.js');

var utils = bavaria.utils;

describe('Utils.Map tests', () => {
    
    it('.5 should be 50', () => {
        var result = utils.map(0.5, 0, 1, 0, 100);
        assert.equal(result, 50);
    });
    it('.5 should be 50 (destination inverted)', () => {
        var result = utils.map(0.5, 0, 1, 100, 0);
        assert.equal(result, 50);
    });
    it('.5 should be 50 (source inverted)', () => {
        var result = utils.map(0.5, 1, 0, 0, 100);
        assert.equal(result, 50);
    });
    it('.5 should be 50 (both inverted)', () => {
        var result = utils.map(0.5, 1, 0, 100, 0);
        assert.equal(result, 50);
    });
    it('1.5 should be 150', () => {
        var result = utils.map(1.5, 1, 0, 100, 0);
        assert.equal(result, 150);
    });
});