module.exports = {
    _idCounter: 0,
    _subs: [],
    register : function(topic, callback){
        var id = this._idCounter++
        this._subs.push({
            id: id,
            topic: topic,
            callback: callback,
        });

        return id;
    },
    unregister : function(id) {
        var index = -1;
        for(var  i= 0; i < this._subs.length; i++){
            if(this._subs[i].id === id) {
                index = i;
                break;
            }
        }

        if(index >= 0){
            this._subs.splice(index, 1);
        }
    },
    notify: function(topic, msg) {
        this._subs.forEach(element => {
            if(element.topic === topic) {
                element.callback(msg)
            }
        });
    }
};