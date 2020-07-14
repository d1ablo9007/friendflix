!function(e){var t={};function n(o){if(t[o])return t[o].exports;var c=t[o]={i:o,l:!1,exports:{}};return e[o].call(c.exports,c,c.exports,n),c.l=!0,c.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)n.d(o,c,function(t){return e[t]}.bind(null,c));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports.ViewState=Object.freeze({IN_LOBBY:1,OUT_LOBBY:0,CONNECT_LOBBY:2}),e.exports.ControllerState=Object.freeze({INACTIVE:-1,PENDING:0,PAUSE:1,PLAY:2}),e.exports.SyncState=Object.freeze({INACTIVE:-1,PENDING:0,SYNCED:1}),e.exports.Protocol=Object.freeze({SUCCESS:1,FAIL:0,Messages:{START_LOBBY:"start_lobby",START_LOBBY_ACK:"start_lobby_ack",DISCONNECT_LOBBY:"disconnect_lobby",DISCONNECT_LOBBY_ACK:"disconnect_lobby_ack",CONNECT_LOBBY:"connect_lobby",CONNECT_LOBBY_ACK:"connect_lobby_ack",SYNC_INIT:"sync_init",SYNC_INIT_ACK:"sync_init_ack",SYNC_TIME:"sync_time",SYNC_TIME_ACK:"sync_time_ack",SYNC_END:"sync_end",SYNC_END_ACK:"sync_end_ack",UPDATE_URL:"update_url",UPDATE_URL_ACK:"update_url_ack",UPDATE_CONTROL:"update_control",UPDATE_CONTROL_ACK:"update_control_ack",UPDATE_TIME:"update_time",UPDATE_TIME_ACK:"update_time_ack",UPDATE_SEEK:"update_seek",UPDATE_SEEK_ACK:"update_seek_ack",UPDATE_STATE:"update_state",UPDATE_STATE_ACK:"update_state_ack",UPDATE_CONTROL_SCRIPT:"update_control_script",UPDATE_CONTROL_SCRIPT_ACK:"update_control_script_ack",POPUP_LOADED:"popup_loaded",POPUP_LOADED_ACK:"popup_loaded_ack"}}),e.exports.WS_URL=Object.freeze("ws://10.0.0.47:3000/")},,,,function(e,t,n){"use strict";n.r(t);var o=n(0),c=n.n(o);function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}new(function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.views={},$((function(){t.views[c.a.ViewState.IN_LOBBY]=$("#in-lobby-container"),t.views[c.a.ViewState.OUT_LOBBY]=$("#out-lobby-container"),t.views[c.a.ViewState.CONNECT_LOBBY]=$("#connect-lobby-container"),$("#start-lobby-btn").on("click",(function(e){return t.startLobbyClicked(e)})),$("#disconnect-btn").on("click",(function(e){return t.disconnectLobbyClicked(e)})),$("#connect-btn").on("click",(function(e){return t.connectClicked(e)})),$("#connect-btn-back").on("click",(function(e){return t.connectBackClicked(e)})),$("#connect-confirm-btn").on("click",(function(e){return t.connectConfirmClicked(e)})),null!==t.getClient().user.lobbyId?t._updateViewState(c.a.ViewState.IN_LOBBY):t._updateViewState(c.a.ViewState.OUT_LOBBY)}))}var t,n,o;return t=e,(n=[{key:"getClient",value:function(){return chrome.extension.getBackgroundPage().ldn}},{key:"_getLobbyIdText",value:function(){return $("#lobby-id-text")[0]}},{key:"_updateViewState",value:function(e){for(var t in console.log("<Popup> Updating view state: "+e),this.views)t==e?this.views[t].appendTo("body"):this.views[t].detach();e==c.a.ViewState.IN_LOBBY?this._getLobbyIdText()&&(this._getLobbyIdText().innerHTML=this.getClient().user.lobbyId):this._getLobbyIdText()&&(this._getLobbyIdText().innerHTML="")}},{key:"startLobbyClicked",value:function(e){var t=this;this.getClient().startLobby({type:c.a.Protocol.Messages.START_LOBBY}).then((function(){t._updateViewState(c.a.ViewState.IN_LOBBY)})).catch((function(e){console.log(e)}))}},{key:"disconnectLobbyClicked",value:function(e){this.getClient().disconnectLobby({type:c.a.Protocol.Messages.DISCONNECT_LOBBY}),this._updateViewState(c.a.ViewState.OUT_LOBBY)}},{key:"connectClicked",value:function(){this._updateViewState(c.a.ViewState.CONNECT_LOBBY)}},{key:"connectConfirmClicked",value:function(e){var t=this;this.getClient().connectLobby({type:c.a.Protocol.Messages.CONNECT_LOBBY,lobbyId:$("#lobby-id").val()}).then((function(){t._updateViewState(c.a.ViewState.IN_LOBBY)})).catch((function(e){console.log(e)}))}},{key:"connectBackClicked",value:function(e){this._updateViewState(c.a.ViewState.OUT_LOBBY)}}])&&i(t.prototype,n),o&&i(t,o),e}())}]);