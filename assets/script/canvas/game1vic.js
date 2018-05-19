var global =require('global');

cc.Class({
    extends: cc.Component,

    properties: {
       game1FinalScore: null,
       anim1:{
           default: null,
           type: cc.Animation,
       },
       anim2:{
            default: null,
            type: cc.Animation,
       }
    },

    onLoad : function () {
       this.game1FinalScore=global.game1FinalScore;
       console.log('game1FinalScore:',this.game1FinalScore);
       if(this.game1FinalScore=100){
           console.log('perfect');
           this.anim1.play('game1vic1');
           
       }else{
           console.log('success');
           this.anim2.play('game1vic2');
       }


    },


    start () {

    },

    // update (dt) {},
});
