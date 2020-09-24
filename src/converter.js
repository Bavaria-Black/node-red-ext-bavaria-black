var utils = require('./utils.js');

module.exports = {
    xyToRgb: function(x,y){
        
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
            [  3.2410032, -1.5373990, -0.4986159 ],
            [ -0.9692243,  1.8759300,  0.0415542 ],
            [  0.0556394, -0.2040112,  1.0571490 ]
        ];
        
        var r = X * M[0][0] + Y * M[0][1] + Z * M[0][2];
        var g = X * M[1][0] + Y * M[1][1] + Z * M[1][2];
        var b = X * M[2][0] + Y * M[2][1] + Z * M[2][2];

        r = Math.max(0, Math.min(1, adj(r)));
        g = Math.max(0, Math.min(1, adj(g)));
        b = Math.max(0, Math.min(1, adj(b)));

        r = Math.round(utils.map(r, 0,1,0,255)) || 0;
        g = Math.round(utils.map(g, 0,1,0,255)) || 0;
        b = Math.round(utils.map(b, 0,1,0,255)) || 0;
                    
        return {r : r, g : g, b : b};
    }
};