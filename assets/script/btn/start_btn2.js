var global = require('global');
cc.Class({
    extends: cc.Component,

    properties: {
  
        deblock: null,
        btn2_label:{
            default: null,
            type: cc.Label,
        }
    },

    onLoad: function ()  {
        this.node.getComponent(cc.Button).interactable=false;

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target= this.node;
        clickEventHandler.component='start_btn2';
        clickEventHandler.handler='callback';
        clickEventHandler.customEventData='foobar';
        var btn = this.node.getComponent(cc.Button);
        btn.clickEvents.push(clickEventHandler);

        
        
        this.deblock = global.story2Block;
        console.log(this.deblock);
        if(this.deblock==true){
            this.node.getComponent(cc.Button).interactable=true;
            this.btn2_label.string='第二幕';
        }

    },

    callback: function(event,customEventData){
        cc.director.loadScene('game2_1');
    },

    start () {

    },

    // update (dt) {},
});
