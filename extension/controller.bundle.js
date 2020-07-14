!function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports.ViewState=Object.freeze({IN_LOBBY:1,OUT_LOBBY:0,CONNECT_LOBBY:2}),e.exports.ControllerState=Object.freeze({INACTIVE:-1,PENDING:0,PAUSE:1,PLAY:2}),e.exports.SyncState=Object.freeze({INACTIVE:-1,PENDING:0,SYNCED:1}),e.exports.Protocol=Object.freeze({SUCCESS:1,FAIL:0,Messages:{START_LOBBY:"start_lobby",START_LOBBY_ACK:"start_lobby_ack",DISCONNECT_LOBBY:"disconnect_lobby",DISCONNECT_LOBBY_ACK:"disconnect_lobby_ack",CONNECT_LOBBY:"connect_lobby",CONNECT_LOBBY_ACK:"connect_lobby_ack",SYNC_INIT:"sync_init",SYNC_INIT_ACK:"sync_init_ack",SYNC_TIME:"sync_time",SYNC_TIME_ACK:"sync_time_ack",SYNC_END:"sync_end",SYNC_END_ACK:"sync_end_ack",UPDATE_URL:"update_url",UPDATE_URL_ACK:"update_url_ack",UPDATE_CONTROL:"update_control",UPDATE_CONTROL_ACK:"update_control_ack",UPDATE_TIME:"update_time",UPDATE_TIME_ACK:"update_time_ack",UPDATE_SEEK:"update_seek",UPDATE_SEEK_ACK:"update_seek_ack",UPDATE_STATE:"update_state",UPDATE_STATE_ACK:"update_state_ack",UPDATE_CONTROL_SCRIPT:"update_control_script",UPDATE_CONTROL_SCRIPT_ACK:"update_control_script_ack",POPUP_LOADED:"popup_loaded",POPUP_LOADED_ACK:"popup_loaded_ack"}}),e.exports.WS_URL=Object.freeze("ws://10.0.0.47:3000/")},function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}e.exports=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;n(this,e),this.elapsed=t,this.duration=s}var t,o,r;return t=e,r=[{key:"fromJson",value:function(t){try{var n=JSON.parse(t);return new e(n.elapsed,n.duration)}catch(e){return console.log("<Error> Tried to instantiate progress state with corrupt data!"),null}}}],(o=null)&&s(t.prototype,o),r&&s(t,r),e}()},,function(e,t,n){"use strict";n.r(t);var s=n(0),o=n.n(s),r=n(1),a=n.n(r);function i(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var l=document.createElement("div");l.id="ldn-spinner",l.style.position="absolute",l.style.display="flex",l.style.alignItems="center",l.style.justifyContent="center",l.style.top="50%",l.style.left="50%",l.style.padding="2rem",l.style.transform="translate(-50%, -50%)",l.style.height="100%",l.style.width="100%",l.style.color="black",l.style.backgroundColor="white",l.style.zIndex="1000";function u(e){return'<div style="text-align: center;"><h1>'+e+'</h1><img src="https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif" /></div>'}new(function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.enabled=!1,this.syncing=!1,this.controllerProgress=new a.a,this.progressState=new a.a,this.ignoreQ=[],window.addEventListener("message",(function(e){t.onMessage(e.data)})),this._enable()}var t,n,s;return t=e,(n=[{key:"getVP",value:function(){return document.getElementsByTagName("video")[0]}},{key:"_enable",value:function(){var e=this;this.enabled||(this.lock("Please wait while Netflix loads."),new MutationObserver((function(t,n){t.forEach((function(t){"VideoContainer"===t.target.className&&(e.videoPlayer=netflix.appContext.state.playerApp.getAPI().videoPlayer,e.sessionId=e.videoPlayer.getAllPlayerSessionIds()[0],e.player=e.videoPlayer.getVideoPlayerBySessionId(e.sessionId),e.progressState.elapsed=e.player.getCurrentTime(),e.progressState.duration=e.player.getDuration(),e.getVP().addEventListener("play",(function(t){return e.userPlay(t)})),e.getVP().addEventListener("pause",(function(t){return e.userPause(t)})),e.getVP().addEventListener("timeupdate",(function(t){return e.timeUpdate(t)})),e.getVP().addEventListener("seeked",(function(t){return e.userSeek(t)})),console.log("<Controller> Script enabled!"),n.disconnect(),e.enabled=!0,e.pause(),l.innerHTML=u("Please wait while other members join."),e.init())}))})).observe(document.getElementById("appMountPoint"),{childList:!0,subtree:!0}))}},{key:"_disable",value:function(){this.enabled&&(this.unlock(),this.enabled=!1)}},{key:"seek",value:function(e){this.enabled&&(this.player.seek(e),this.ignoreQ.push("seek"))}},{key:"play",value:function(){this.enabled&&(this.player.play(),this.ignoreQ.push("play"))}},{key:"pause",value:function(){this.enabled&&(this.player.pause(),this.ignoreQ.push("pause"))}},{key:"lock",value:function(e){l.innerHTML=u(e),document.body.appendChild(l),this.syncing=!0}},{key:"unlock",value:function(){this.enabled&&(l.remove(),this.syncing=!1)}},{key:"_updateProgress",value:function(){this.progressState.elapsed=this.player.getCurrentTime(),this.progressState.duration=this.player.getDuration()}},{key:"_shouldIgnore",value:function(e){return!(this.ignoreQ.length<1||this.ignoreQ[0]!==e.type||(this.ignoreQ.splice(0,1),0))}},{key:"stateUpdate",value:function(e){var t={type:o.a.Protocol.Messages.UPDATE_STATE,controllerState:e};window.postMessage(t)}},{key:"timeUpdate",value:function(e){this._updateProgress();var t={type:o.a.Protocol.Messages.UPDATE_TIME,progressState:this.progressState};window.postMessage(t)}},{key:"seekUpdate",value:function(){this._updateProgress();var e={type:o.a.Protocol.Messages.UPDATE_SEEK,progressState:this.progressState};window.postMessage(e)}},{key:"userPlay",value:function(e){this._shouldIgnore(e)||(console.log("<Controller> Play!"),this.stateUpdate(o.a.ControllerState.PLAY))}},{key:"userPause",value:function(e){this._shouldIgnore(e)||(console.log("<Controller> Pause!"),this.stateUpdate(o.a.ControllerState.PAUSE))}},{key:"userSeek",value:function(e){this._shouldIgnore(e)||(console.log("<Controller> Seek!"),this.seekUpdate())}},{key:"init",value:function(){var e={type:o.a.Protocol.Messages.SYNC_INIT};window.postMessage(e)}},{key:"onMessage",value:function(e){switch(e.type){case o.a.Protocol.Messages.UPDATE_CONTROL_SCRIPT:console.log(e),e.code?this._enable():this._disable();break;case o.a.Protocol.Messages.SYNC_TIME:this.controllerProgress=e.progressState,this.seek(this.controllerProgress.elapsed);var t={type:o.a.Protocol.Messages.SYNC_TIME_ACK};window.postMessage(t);break;case o.a.Protocol.Messages.SYNC_END:this.unlock(),this.play()}if(this.enabled)switch(e.type){case o.a.Protocol.Messages.UPDATE_STATE:switch(e.controllerState){case o.a.ControllerState.PLAY:this.play();break;case o.a.ControllerState.PENDING:case o.a.ControllerState.PAUSE:this.pause()}break;case o.a.Protocol.Messages.UPDATE_SEEK:this.seek(e.progressState.elapsed)}else console.log("<Controller> Received a message <"+e.type+">  while disabled.")}},{key:"currentTime",get:function(){if(this.enabled)return this.player.getCurrentTime()}},{key:"duration",get:function(){return this.enabled&&!this._duration&&(this._duration=this.player.getDuration()),this._duration}}])&&i(t.prototype,n),s&&i(t,s),e}())}]);