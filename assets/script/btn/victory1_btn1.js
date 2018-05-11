
var global = require('global');
cc.Class({
    extends: cc.Component,

    properties: {
        story2: true,
      
    },



    onLoad: function () {
       
        
        this.node.on('touchstart',this.onTouchStart,this);
        
        
    },

    onTouchStart: function(e){
        global.story2Block = this.story2;
        cc.director.loadScene('start');
        

    },    
    start () {

    },

    // update (dt) {},
});
