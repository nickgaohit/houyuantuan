var supporter0 = require("supporter0");
cc.Class({
    extends: cc.Component,

    properties: {
       i: 0, 
       role0:{
            default: null,
            type: cc.Node,
       },
       sup0:{  //用于引用supporter0组件
            default: null,
            type:cc.Node,

       },
       gameAudio:{
            default: null,
            url: cc.AudioClip,
       },
       dialogueM0:{
            default: null,
            type: cc.Label,
       },
       dialogueW0:{
            default: null,
            type: cc.Label,
        },
        supporter0:{
            default:null,
            type: cc.Node,
        }
       
    },

 

    onLoad: function () {
       this.current=cc.audioEngine.play(this.gameAudio,true,1);
       this.dialogueSequence();

    },

    dialogueSequence: function(){
       this.node.on('touchend',this.onTouchEnd,this);  
    },
   
    onTouchEnd: function(e){
    
        this.i=this.i+1;

        switch(this.i){
            case 1: this.dialogueM0.string='新入学的小新刚来到学校。';
                    break;
            case 2: this.dialogueM0.string='学校的篮球场真棒！';
                    break;
            case 3: this.supporterMove();
          //          this.scheduleOnce(function(){this.dialogueW0.string='还有空场地！'},1);
                    this.dialogueM0.destroy();
                    break;
            case 4: this.dialogueW0.string='还有空场地！';
                    break;
            case 5: this.dialogueW0.string='趁着还没上课~';
                    break;
            default: this.dialogueW0.destroy();
                    this.role0.destroy();
                    this.supporter0.destroy();
                    cc.director.loadScene('game1');
                    break;
        };
   
    },
    //后援团出现    调用组件supporter0，
    supporterMove: function(){
        var supMove = this.sup0.getComponent(supporter0);
        supMove.moveToLeft();  
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },

    start () {

    },

    // update (dt) {},
});
