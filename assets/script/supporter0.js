
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

  

    onLoad: function () {
       
    },

    moveToLeft: function(e){
        var moveToLeft= cc.moveTo(0.5,cc.p(200,26));
        this.node.runAction(moveToLeft);
    },

    start () {

    },

    // update (dt) {},
});
