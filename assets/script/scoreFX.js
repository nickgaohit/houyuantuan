
cc.Class({
    extends: cc.Component,

    properties: {
        anim:{
            default: null,
            type:cc.Animation,
        },
        
        game:{
            default: null,
            serializable: false,

        }
    },

    onLoad: function(){
        console.log('................init scoreFX.....................');
        this.anim.getComponent('scoreAnim').scoreFX=this;
    },

    despawn(){
        this.game.despawnScoreFX(this.node);
    },
    playAnim: function(){
        console.log('点上有动画');
        this.anim.play('scorePop');
    },
    

    start () {

    },

    // update (dt) {},
});
