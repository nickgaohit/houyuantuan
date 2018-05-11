
cc.Class({
    extends: cc.Component,

    properties: {
        game2:{
            default: null,
            serializable: false,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on('touchstart',this.onTouchStart,this);
    },
    onTouchStart: function(e){
        console.log('game2.spawnpoint:',this.game2.spawnPoint);
        this.game2.spawnPoint();
        this.game2.goSupporter1();
        this.game2.gainScore();
        this.node.destroy();
        
    },

    start () {

    },

    // update (dt) {},
});
