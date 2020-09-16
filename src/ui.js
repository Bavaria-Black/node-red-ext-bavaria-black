var validator = require('./validators.js');
module.exports = {
    addNumInput: function(element){
        $(element).typedInput({
            type:"num",
            types:["num"],
        });
    },
    addNumInputs : function(elements){
        elements.forEach(addNumInput);
    },
    addNumRangeInput: function(element, min, max){
        addNumInput(element);
        var validateRange = validator.range(min, max);

        $(element).change(function(){
            var valid = validateRange($(this).val());
            var targetElement = $(this).parent().find('.red-ui-typedInput-container');
            if (!valid) {
                targetElement.addClass('input-error');
            } else {
                targetElement.removeClass('input-error');
            }
        });
    },
    addNumRangeInputs : function(elements, min, max){
        elements.forEach(element => {
            addNumRangeInput(element, min, max);
        });
    }
};