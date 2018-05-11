var supporter1 = require("supporter1");
cc.Class({
    extends: cc.Component,

    properties: {
       i: 0, 
       role1:{
            default: null,
            type: cc.Node,
       },
       sup1:{  //用于引用supporter1组件
            default: null,
            type:cc.Node,

       },
       audio1BG:{
            default: null,
            url: cc.AudioClip,
       },
       dialogueM1:{
            default: null,
            type: cc.Label,
       },
       dialogueW1:{
            default: null,
            type: cc.Label,
        },
        supporter1:{
            default:null,
            type: cc.Node,
        }
       
    },

 

    onLoad: function () {
       this.current=cc.audioEngine.play(this.audio1BG,true,1);
       this.dialogueSequence();

    },

    dialogueSequence: function(){
       this.node.on('touchend',this.onTouchEnd,this);  
    },
   
    onTouchEnd: function(e){
    
        this.i=this.i+1;

        switch(this.i){
            case 1: this.dialogueM1.string='为什么';
                    break;
            case 2: this.dialogueM1.string='又是我挨揍';
                    break;
            case 3: this.supporterMove();
          //          this.scheduleOnce(function(){this.dialogueW1.string='我年轻的时候也受过你这样的屈辱，当时没有勇气反抗，真是一生的遗憾。'},1);
                    this.dialogueM1.destroy();
                    break;
            case 4: this.dialogueW1.string='我年轻的时候也受过你这样的屈辱，当时没有勇气反抗，真是一生的遗憾。';
                    break;
            case 5: this.dialogueW1.string='小新，跟他决斗吧！Tina、桃子、田田，准备后援！';
                    break;
            default: this.dialogueW1.destroy();
                    this.role1.destroy();
                    this.supporter1.destroy();
                    cc.director.loadScene('game2');
                    break;
        };
   
    },
    //后援团出现    调用组件supporter1，
    supporterMove: function(){
        var supMove = this.sup1.getComponent(supporter1);
        supMove.moveToLeft();  
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },

    start () {

    },

    // update (dt) {},
});
