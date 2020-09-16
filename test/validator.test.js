const assert = require('assert');
const bavaria = require('../src/index.js');
console.log(bavaria);

describe('Range validator tests', () => {
    var validator = bavaria.validators.range(1,10);
    it('should between 1 and 10', () => {
        assert.equal(validator(5), true);
    });
    it('1 should be in range', () => {
        assert.equal(validator(1), true);
    });
    it('10 should be in range', () => {
        assert.equal(validator(10), true);
    });
    it('11 should be out of range', () => {
        assert.equal(validator(11), false);
    });
    it('-1 should be out of range', () => {
        assert.equal(validator(-1), false);
    });
});