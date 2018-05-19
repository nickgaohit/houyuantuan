
cc.Class({
    extends: cc.Component,

    properties: {
        game2:{
            default: null,
            serializable: false,
        },
        pointSpriteFrame:{
            default: null,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.node.on('touchstart',this.onTouchStart,this); 
    },
    onTouchStart: function(e){
        var pos=this.node.getPosition();
        this.game2.gainScore(pos);
        this.game2.animControl();
        this.game2.despawnPoint(this.node);
        console.log('this.node.textureFilenameSetter:',this.node);
              
    },

    start :function() {
        
    },

    update: function (dt) {
        
        //每帧更新计时器，超过限度还没有生成新的触点，该触点就会消失
        if(this.game2.timer>this.game2.pointDuration){        
            this.game2.despawnPoint(this.node);  
            console.log('到40了，看你再出的')  
        }
        this.game2.timer+=dt;
        
        //根据计时器更新触点的透明度
        var opacityRatio = 1-this.game2.timer/this.game2.pointDuration;
        var minOpacity =50;
        this.node.opacity = minOpacity+Math.floor(opacityRatio*(255-minOpacity));


    },
});
