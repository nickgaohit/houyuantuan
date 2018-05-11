
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

   
    onLoad: function ()  {
        this.node.on('touchstart',this.onTouchStart,this);

    },

    onTouchStart: function(e){
        cc.director.loadScene('start');
    },
    start () {

    },

    // update (dt) {},
});

