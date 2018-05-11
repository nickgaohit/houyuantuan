

cc.Class({
    extends: cc.Component,

    properties: {
        audio2BG:{
            default: null,
            url: cc.AudioClip,
        },
        goSupporter:{
            default: null,
            type: cc.Animation,
        },
        goRole:{
            default: null,
            type: cc.Animation,
        },
        pointPrefab:{
            default: null,
            type: cc.Prefab,
        },
        timeCount:{
            default:null,
            type: cc.Label,
        },
        scoreDisplay:{
            default: null,
            type: cc.Label,
        }
      
    },

  

    onLoad: function () {
        this.score = 0;
        cc.audioEngine.play(this.audio2BG,false,2);
        this.countdownNum=3;
        this.callback=function(){this.timeCount.string=this.countdownNum;
            this.countdownNum--;     
             
            if(this.countdownNum==-2){        
                this.timeCount.destroy();
                this.unschedule(this.callback);
            };
           };
        this.schedule(this.callback,1); 
         
        this.spawnPoint();
       
 
    },
    spawnPoint:function(){
        var newPoint = cc.instantiate(this.pointPrefab);
        this.node.addChild(newPoint);
        newPoint.setPosition(this.getNewPointPosition());
        newPoint.getComponent('pointPrefab').game2=this;
       
    },

   
    getNewPointPosition:function(){
        var randX = 0;
        var randY = 0;
        var maxX = this.node.width/2;
        var maxY = this.node.height/2;
        randX = cc.randomMinus1To1()*maxX*0.9;
        randY = cc.randomMinus1To1()*maxY*0.9;
        return cc.p(randX,randY);
    },
    
    start () {

    },

    // update (dt) {},
    gainScore: function(){
        this.score+=1;
        this.scoreDisplay.string='Score: '+this.score.toString();

        if(this.score==5){
            console.log('this.score:',this.score);
            this.goRole1();
        }
        if(this.score==10){
            cc.director.loadScene('vic1');
        }
    },

    goSupporter1: function(){
        this.goSupporter.play('goSupporter1');
    },
    goSupporter2: function(){
        this.goSupporter.play('goSupporter2');
    },
    goRole1: function(){
        this.goRole.play('goRole1');
    },

});
