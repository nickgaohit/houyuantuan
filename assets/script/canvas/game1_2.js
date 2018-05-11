

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
        },
        //触点消失时间的随机范围
        maxPointDuration: 0,
        minPointDuration: 0,
      
    },

  

    onLoad: function () {
        this.pointCount=0;
        this.pointDuration = 0;
        //初始化计分
        this.score = 0;
        this.current=cc.audioEngine.play(this.audio2BG,true,2);
        this.countdownNum=3;
        this.callback=function(){this.timeCount.string=this.countdownNum;
            this.countdownNum--;     
             
            if(this.countdownNum==-2){        
                this.timeCount.destroy();
                this.unschedule(this.callback);
            };
           };
        this.schedule(this.callback,1); 
        //倒计时三秒后开始出现一个新触点 
        this.scheduleOnce(this.spawnPoint,4);
        
 
    },
    //生成新的触点
    spawnPoint:function(){
        
        //实例化一个触点
        var newPoint = cc.instantiate(this.pointPrefab);
        //把实例化的触点节点挂在根节点下
        this.node.addChild(newPoint);
        //设置触点节点的出现位置
        newPoint.setPosition(this.getNewPointPosition());
        //将game1_2组件的实例传入触点组件
        newPoint.getComponent('pointPrefab').game2=this;
 
       //重置计时器，根据消失时间范围随机取一个值
        this.pointDuration = this.minPointDuration + cc.random0To1()*(this.maxPointDuration-this.minPointDuration);
        console.log('pointduration:',this.pointDuration);
        
        this.pointCount+=1;
        console.log('pointcount:',this.pointCount);
        if(this.pointCount>=30){
            cc.director.loadScene('game1over');
        }
      
    },

    //获得新出现触点位置
    getNewPointPosition:function(){
        var randX = 0;
        var randY = 0;
        var maxX = this.node.width/2;
        var maxY = this.node.height/2;
        randX = cc.randomMinus1To1()*maxX*0.9;
        randY = cc.randomMinus1To1()*maxY*0.9;
        return cc.p(randX,randY);
    },
    //后援团动画1
    goSupporter1: function(){
        this.goSupporter.play('goSupporter1');
    },
    //后援团动画2
    goSupporter2: function(){
        this.goSupporter.play('goSupporter2');
    },
    //主角动画
    goRole1: function(){
        this.goRole.play('goRole1');
    },
    //得分
    gainScore: function(){
        this.score+=1;
        this.scoreDisplay.string='Score: '+this.score.toString();

        if(this.score==10){
            console.log('this.score:',this.score);
            this.goRole1();
        };
        if(this.score==20){
            cc.director.loadScene('game1vic');
        };
    },
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    start () {

    },

    // update: function (dt) {
      
    // },




});
