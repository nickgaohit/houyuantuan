
cc.Class({
    extends: cc.Component,

    properties: {
       
        scoreFX:{
            default: null,
            serializable: false,

        }
    },

    onLoad: function(){
        console.log('..................init scoreanim...............');
        this.scheduleOnce(this.hideFX,0.8);
        
    },
    // init (scoreFX) {
    //     this.scoreFX = scoreFX;
        
    // },
    
    hideFX: function(){
        console.log('..................hidefx.........................');
        this.scoreFX.despawn();
        
    },

   
});
