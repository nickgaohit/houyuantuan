cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },
    
        //退出游戏
    ExitScene: function(){
        cc.director.end();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
