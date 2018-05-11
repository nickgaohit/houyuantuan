
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
        //初始化计时器
        this.timer=0;
        this.node.on('touchstart',this.onTouchStart,this);

       
    },
    onTouchStart: function(e){
        this.game2.spawnPoint();
        this.game2.goSupporter1();
        this.game2.gainScore();
        this.node.destroy();
        
    },

    start () {

    },

    update: function (dt) {
        console.log('pointduarion2:',this.game2.pointDuration);
        //每帧更新计时器，超过限度还没有生成新的触点，该触点就会消失
        if(this.timer>this.game2.pointDuration){
            
            this.node.destroy();
            this.game2.goSupporter2();
            this.game2.spawnPoint();
         
        };
        this.timer+=dt;
        
        //根据计时器更新触点的透明度
        var opacityRatio = 1-this.timer/this.game2.pointDuration;
        var minOpacity =50;
        this.node.opacity = minOpacity+Math.floor(opacityRatio*(255-minOpacity));


    },
});
