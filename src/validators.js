module.exports ={
    range : function(min, max) {
        return function(v) { 
            return v <= max && v >= min;
        }   
    },
    test: function(){
        return 555;
    },
    leberkas: function(){
        return test();
    }
};