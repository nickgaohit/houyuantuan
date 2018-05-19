const pointPrefab = require('pointPrefab');
const scoreFX = require('scoreFX');
var global = require('global');

cc.Class({
    extends: cc.Component,

    properties: {

        pointSpriteArray:{
            default: [],
            type: [cc.SpriteFrame],
        },
        pointPrefab:{
            default: null,
            type: cc.Prefab,
        },
        //背景音乐资源
        audio2BG:{
            default: null,
            url: cc.AudioClip,
        },
        //得分音效
        scoreAudio: {
            default: null,
            url: cc.AudioClip,
        },
        goSupporter:{
            default: null,
            type: cc.Animation,
        },
        showtimeAni:{
            default: null,
            type: cc.Animation,
        },
      
        scoreFXPrefab: {
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
        this.pointCount=1;
        this.pointDuration = 0;
      
        //播放背景音乐
        this.current=cc.audioEngine.play(this.audio2BG,true,2);
        //倒计时起始数字
        this.countdownNum=3;
        
        //调用倒计时方法
        this.schedule(this.startCountDown,1); 

        //初始化 触点图标对象池  
        this.pointPool = new cc.NodePool('pointPrefab');
        this.scorePool = new cc.NodePool('scoreFX');

         //初始化计分
         this.resetScore();
         this.scheduleOnce(this.spawnPoint,4);
        

    },
   
    //倒计时方法
    startCountDown: function(){
        this.timeCount.string=this.countdownNum;
        this.countdownNum--;     
           
        if(this.countdownNum==-2){        
            this.timeCount.destroy();
            this.unschedule(this.callback);
        }
    },

    //生成新的触点
    spawnPoint:function(){
        var newPoint = null;
        //使用给定的模板在场景中生成一个节点
        if(this.pointPool.size()>0){
            newPoint= this.pointPool.get(this);
        }else{
            //若没有，则生成一个新节点
            newPoint=cc.instantiate(this.pointPrefab);
        }
        //出现触点图标的变化  
        if(this.pointCount<=10){
            newPoint.getComponent(cc.Sprite).spriteFrame=this.pointSpriteArray[0];
        }else if((this.pointCount<=20)&&(this.pointCount>10)){     
            newPoint.getComponent(cc.Sprite).spriteFrame=this.pointSpriteArray[1];     
        }else if((this.pointCount<=30)&&(this.pointCount>20)){
            newPoint.getComponent(cc.Sprite).spriteFrame=this.pointSpriteArray[2]; 
        }else if((this.pointCount<=40)&&(this.pointCount>30)){
            newPoint.getComponent(cc.Sprite).spriteFrame=this.pointSpriteArray[3]; 
        }
       
        //把实例化的触点节点挂在根节点下
        this.node.addChild(newPoint);
        //设置触点节点的出现位置
        newPoint.setPosition(this.getNewPointPosition());
        //将game1_2组件的实例传入触点组件
        newPoint.getComponent('pointPrefab').game2=this;
          
        //初始化计时器
        this.timer=0;
       
       //重置计时器，根据消失时间范围随机取一个值
        this.pointDuration = this.minPointDuration + cc.random0To1()*(this.maxPointDuration-this.minPointDuration);      
        this.pointCount+=1;      
    
    },
    despawnPoint(point){
        this.pointPool.put(point);
        if((this.pointCount<=40)&&(this.pointCount!=30)){
            this.spawnPoint();
        }else if(this.pointCount==30){
            this.scheduleOnce(this.spawnPoint,10);
        }else if(this.pointCount==41){
            this.pointPool.clear();
            
            console.log('..........触点已经全部出完..............');
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
    //后援团动画3
     goSupporter3: function(){
        this.goSupporter.play('goSupporter3');
    },
    //后援团动画4
    goSupporter4: function(){
        this.goSupporter.play('goSupporter4');
    },
    //showtime动画 70分及以上
    showtime1: function(){
        this.showtimeAni.play('showtime1');
    },
    //showtime动画 70分以下
    showtime2: function(){
        this.showtimeAni.play('showtime2');
    },
    //结束，谢幕动画
    showtime3: function(){
        this.showtimeAni.play('showtime3');
    },

    //得分
    gainScore: function(pos){
        //不同阶段得分数不同
        console.log(this.pointCount);
        if(this.pointCount<=10){
            this.score+=1;
        }else if(this.pointCount>10&&this.pointCount<=20){
            this.score+=2;
        }else if(this.pointCount>20&&this.pointCount<=30){
            this.score+=3;
        }else if(this.pointCount>30&&this.pointCount<=40){
            this.score+=4;
        }else if(this.pointCount==41){
            this.score+=0;     
            this.scorePool.clear();
            this.scoreDisplay.string='';
        }  
        global.game1FinalScore=this.score;  
             
        //更新 score label上的分数
        this.scoreDisplay.string='Score: '+this.score.toString();
        //播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio,false);
        //播放触发动画
        var sfx = this.spawnScoreFX();
        this.node.addChild(sfx);
        sfx.setPosition(pos);
        sfx.getComponent('scoreFX').playAnim();

    },   
    resetScore: function(){
        this.score=0;
        this.scoreDisplay.string='Score: '+this.score.toString();        

    }, 
    spawnScoreFX: function(){
        var fx;
        //通过size接口判断对象池中是否有空闲对象
        if(this.scorePool.size>0){
            //获取对象池中的对象
            fx = this.scorePool.get();
        //    return fx.getComponent('scoreFX');
            return fx;
        }else{
            //若没有空闲对象，即对象池中备用对象不够时，重新创建，调用其身上的脚本，然后进行初始化
        //    fx = cc.instantiate(this.scoreFXPrefab).getComponent('scoreFX');
        //    fx.init(this);
            fx = cc.instantiate(this.scoreFXPrefab);
            fx.getComponent('scoreFX').game=this;     
            return fx;
        }

    },
    despawnScoreFX (scoreFX){
        //不用时，将节点放回对象池
        this.scorePool.put(scoreFX);
    },
    //动画播放调度
    animControl: function(){

        if(this.pointCount<=10){
            this.goSupporter1();
        }else if(this.pointCount>10&&this.pointCount<=20){
            this.goSupporter2();
        }else if(this.pointCount>20&&this.pointCount<30){
            this.goSupporter3();
        }else if(this.pointCount==30){
            if(this.score>=70){
                this.showtime1();
            }else if(this.score<70){
                this.showtime2();
            }
        }else if(this.pointCount>30&&this.pointCount<40){
            this.goSupporter4();
        }else if(this.pointCount==40){
            this.showtime3();
            this.scheduleOnce(this.endScene,7);
        }      

    },   
    //结局切换
    endScene: function(){
        if(this.score>=80){
            cc.director.loadScene('game1vic');
        }else if(this.score<80){
            cc.director.loadScene('game1over');
        }

    },
       
    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    },
    start () {

    },

    // update: function (dt) {
      
    // },




});
