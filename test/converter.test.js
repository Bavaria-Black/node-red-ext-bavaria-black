const assert = require('assert');
const chai = require('chai');
const chaiStats = require('chai-stats');
const bavaria = require('../src/index.js');

chai.use(chaiStats);
var expect = chai.expect; 

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

describe('CCT to XY Kang 2002', () => {
    
    it('1667 K should be 0.56,0.40', () => {
        const result = converter.cctToXyKang2002(1667);
        expect(result.x).to.almost.equal(0.5646383, 6);
        expect(result.y).to.almost.equal(0.40288714, 6);
    });

    it('2222 K should be 0.45,0.41', () => {
        const result = converter.cctToXyKang2002(2222);
        expect(result.x).to.almost.equal(0.50318753, 7);
        expect(result.y).to.almost.equal(0.41525093, 7);
    });

    it('2700 K should be 0.45,0.41', () => {
        const result = converter.cctToXyKang2002(2700);
        expect(result.x).to.almost.equal(0.45931395, 7);
        expect(result.y).to.almost.equal(0.41066025, 7);
    });

    it('4000 K should be 0.38,0.37', () => {
        const result = converter.cctToXyKang2002(4000);
        expect(result.x).to.almost.equal(0.38052828, 7);
        expect(result.y).to.almost.equal(0.37673353, 7);
    });

    it('25000 K should be 0.25,0.25', () => {
        const result = converter.cctToXyKang2002(25000);
        expect(result.x).to.almost.equal(0.25247299, 7);
        expect(result.y).to.almost.equal(0.25225479, 7);
    });

    it('25001 K should be a invalid temperature', () => {
        const conversion = () => converter.cctToXyKang2002(25001);
        expect(conversion).to.throw();
    });

    it('1666 K should be a invalid temperature', () => {
        const conversion = () => converter.cctToXyKang2002(25001);
        expect(conversion).to.throw();
    });
});

describe('CCT to RGB', () => {
    
    it('1667 K should be very warm white', () => {
        const result = converter.cctToRgb(1667);
        expect(result.r).to.equal(255);
        expect(result.g).to.equal(191);
        expect(result.b).to.equal(0);
    });

    it('2700 K should be warm white', () => {
        const result = converter.cctToRgb(2700);
        expect(result.r).to.equal(255, 6);
        expect(result.g).to.equal(232, 6);
        expect(result.b).to.equal(122, 6);
    });

    it('4000 K should be a medium white', () => {
        const result = converter.cctToRgb(4000);
        expect(result.r).to.equal(255);
        expect(result.g).to.equal(246);
        expect(result.b).to.equal(193);
    });

    it('6500 K should be a white', () => {
        const result = converter.cctToRgb(6500);
        expect(result.r).to.equal(255);
        expect(result.g).to.equal(253);
        expect(result.b).to.equal(255);
    });

    it('25000 K should be a very cold white', () => {
        const result = converter.cctToRgb(25000);
        expect(result.r).to.equal(222);
        expect(result.g).to.equal(254);
        expect(result.b).to.equal(255);
    });

    it('25001 K should be converted even though its a not supported temperature', () => {
        const conversion = () => converter.cctToRgb(25001);
        expect(conversion).to.not.throw();
    });

    it('1666 K should be converted even though its a not supported temperature', () => {
        const conversion = () => converter.cctToRgb(25001);
        expect(conversion).to.not.throw();
    });
});