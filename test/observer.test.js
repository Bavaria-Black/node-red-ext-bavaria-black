const assert = require('assert');
const bavaria = require('../src/index.js');

var observer = bavaria.observer;

beforeEach(function () {
    observer._subs = [];
});

describe('Observer tests', () => {
    
    it('should receive notification', () => {
        var result = "";
        observer.register("leberkas", function(msg){
            result = msg;
        });

        observer.notify("leberkas", "555");

        assert.strictEqual(result, "555");
    });

    it('should receive 1 notification', () => {
        var result = "";
        
        observer.register("leberkas", function(msg){
            result = msg;
        });

        observer.notify("leberkas", "555");
        observer.notify("blub", "666");

        assert.strictEqual(result, "555");
    });

    it('should receive 2 single notifications', () => {
        var result1 = "";
        var result2 = "";
        
        observer.register("leberkas", function(msg){
            result1 = msg;
        });
        
        observer.register("blub", function(msg){
            result2 = msg;
        });

        observer.notify("leberkas", "555");
        observer.notify("blub", "666");

        assert.strictEqual(observer._subs.length, 2);
        assert.strictEqual(result1, "555");
        assert.strictEqual(result2, "666");
    });
    it('register and unregister', () => {
        var a = observer.register("leberkas", function(msg){});
        var b = observer.register("blub", function(msg){});

        assert.strictEqual(observer._subs.length, 2);

        observer.unregister(a);
        assert.strictEqual(observer._subs.length, 1);

        observer.unregister(a);
        assert.strictEqual(observer._subs.length, 1);

        observer.unregister(b);
        assert.strictEqual(observer._subs.length, 0);
    });
    it('should not be notified', () => {
        var result = "";
        var a = observer.register("leberkas", function(msg){
            result = msg;
        });

        observer.unregister(a);
        observer.notify("leberkas", "555");
        assert.strictEqual("", result);
    });
});