var utils = require('./utils.js');

module.exports = {
    xyToRgb: function (x, y) {

        function adj(v) {
            if (Math.abs(v) < 0.0031308) {
                return 12.92 * v;
            }

            return 1.055 * Math.pow(v, 0.41666) - 0.055;
        }

        var Y = 1;
        var X = (Y / y) * x;
        var Z = (Y / y) * (Y - x - y);

        // sRGB, Reference White D65
        var M = [
            [3.2410032, -1.5373990, -0.4986159],
            [-0.9692243, 1.8759300, 0.0415542],
            [0.0556394, -0.2040112, 1.0571490]
        ];

        var r = X * M[0][0] + Y * M[0][1] + Z * M[0][2];
        var g = X * M[1][0] + Y * M[1][1] + Z * M[1][2];
        var b = X * M[2][0] + Y * M[2][1] + Z * M[2][2];

        r = Math.max(0, Math.min(1, adj(r)));
        g = Math.max(0, Math.min(1, adj(g)));
        b = Math.max(0, Math.min(1, adj(b)));

        r = Math.round(utils.map(r, 0, 1, 0, 255)) || 0;
        g = Math.round(utils.map(g, 0, 1, 0, 255)) || 0;
        b = Math.round(utils.map(b, 0, 1, 0, 255)) || 0;

        return { r: r, g: g, b: b };
    },
    hexToRgb: function (hex) {
        if (hex.startsWith("#")) {
            hex = hex.substring(1);
        }

        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        if (hex.length != 6) {
            return {
                r: 0,
                g: 0,
                b: 0
            };
        }

        var int16 = parseInt(hex, 16);
        return {
            r: (int16 >> 16) & 255,
            g: (int16 >> 8) & 255,
            b: int16 & 255
        };
    },
    
    /**
     * Determines the two chromaticity coordinates (x, y) in the CIE xy color space for a given color temperature in Kelvin using the Kang et al. (2002) method.
     * 
     * References:
     * - Kang, B., Moon, O., Hong, C., Lee, H., Cho, B. and Kim, Y., 2002. Design of advanced color temperature control system for HDTV applications. Journal of the Korean Physical Society, 41(6), p.865.
     * @param {number} t Correlated color temperature (CCT, T_{cp}) from 1667 Kelvin to 25000 Kelvin {@link https://en.wikipedia.org/wiki/Color_temperature#Correlated_color_temperature}
     * @param {boolean} validateInput if set, the temperature is validated and the method throws an error.
     * @throws {TypeError} if the temperature is not in the supported range from 1667 K to 25000 K
     * @returns {{x: Number, y: Number}} chromaticity coordinates (x, y) in the CIE xy color space
     */
    cctToXyKang2002: function (t, validateInput = true) {
        if(validateInput && (t < 1667 || t > 25000)){
            throw new TypeError("Temperature not in supported range from 1667 K to 25000 K.")
        }
        
        const pix = (t > 4000) ? 
            -3.0258469 * 10 ** 9 / t ** 3 + 2.1070379 * 10 ** 6 / t ** 2 + 0.2226347 * 10 ** 3 / t + 0.24039 :
            -0.2661239 * 10 ** 9 / t ** 3 - 0.2343589 * 10 ** 6 / t ** 2 + 0.8776956 * 10 ** 3 / t + 0.179910;
        
        const ydd =
        (t > 4000) ? 
            3.0817580 * pix ** 3 - 5.8733867  * pix ** 2 + 3.75112997 * pix - 0.37001483 :
        (t > 2222) ?
            -0.9549476 * pix ** 3 - 1.37418593 * pix ** 2 + 2.09137015 * pix - 0.16748867 :
            -1.1063814 * pix ** 3 - 1.34811020 * pix ** 2 + 2.18555832 * pix - 0.20219683;
        
        return {
            x: pix,
            y: ydd
        };
    },

    /**
     * Determines the sRGB (Reference White D65) value for a given color temperature in Kelvin using the Kang et al. (2002) method.
     * @see cctToXyKang2002
     * @param {number} t Correlated color temperature (CCT, T_{cp}) from 1667 Kelvin to 25000 Kelvin {@link https://en.wikipedia.org/wiki/Color_temperature#Correlated_color_temperature}
     * @returns {{r: Number, g: Number, b: Number}} RGB colors
     */
    cctToRgb: function(t){
        const cie = this.cctToXyKang2002(t, false);
        return this.xyToRgb(cie.x, cie.y);
    }
};