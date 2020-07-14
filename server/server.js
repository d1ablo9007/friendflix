const Lobby = require('./model/lobby');
const User = require('../shared/model/user');
const WebSocket = require('ws');
const Constants = require('../shared/constants');
// We use hri here because shared cannot import npm modules
const hri = require('human-readable-ids').hri;
const Util = require('../shared/util');
require('../shared/fills');

const PORT = 3000;

class LDNServer {
  constructor(start = true) {
    this.lobbies = {};
    this.sockets = {};
    process.on('exit', () => {
      this._exitHandler();
    });
    process.on('SIGINT', () => {
      this._exitHandler();
    });
    if (start) this.start();
  }

  // ===============
  // Handler Methods
  // ===============

  _exitHandler() {
    if (this.server) this.server.close();
  }

  _onConnection(socket, req) {
    console.log('\x1b[33m',
      '<Info> Connection received from: ',
      req.connection.remoteAddress
    );
    socket.on('message', (msg) => {
      this._onMessage(socket, msg);
    });
  }

  _onMessage(socket, msg) {
    const data = JSON.parse(msg);

    if (!data) {
      console.log('\x1b[31m', '<Error> Server received janky JSON data!');
      return;
    }

    console.log('\x1b[33m', '<Info> Received message with type: ', data.type);
    switch (data.type) {
      case Constants.Protocol.Messages.START_LOBBY:
        this._startLobby(socket, data);
        break;
      case Constants.Protocol.Messages.DISCONNECT_LOBBY:
        this._disconnectLobby(socket, data);
        break;
      case Constants.Protocol.Messages.CONNECT_LOBBY:
        this._connectLobby(socket, data);
        break;
      case Constants.Protocol.Messages.UPDATE_URL:
        this._updateUrl(socket, data);
        break;
      case Constants.Protocol.Messages.SYNC_INIT:
        this._sync(socket, data);
        break;
      case Constants.Protocol.Messages.SYNC_TIME_ACK:
        this._syncTimeAck(socket, data);
        break;
      case Constants.Protocol.Messages.UPDATE_STATE:
      case Constants.Protocol.Messages.UPDATE_SEEK:
        this.emitIfController(socket, data);
        break;
    }
  }

  _onClose(event) {
    // Do we do anything here ??
    console.log('\x1b[31m', '<Warning> A WebSocket client disconnected.');
    return;
  }

  // ===============
  // Private Methods
  // ===============
  _startLobby(socket, data) {
    const response = {
      type: Constants.Protocol.Messages.START_LOBBY_ACK,
    };

    try {
      const user = User.fromJson(data.user);

      if (this.isConnected(user)) {
        // Something went wrong here...
        console.log('\x1b[31m', 'User is already connected. ID: ' + user.id);
        return;
      }

      // Server provisions user ID if none is sent in response
      if (user.id === null) {
        user.id = Util.uuidv4();
        response.userId = user.id;
        console.log('\x1b[33m', '<Info> Provisioning new user: ' + user.id);
      }

      const lobby = new Lobby(hri.random(), user);
      user.lobbyId = lobby.id;
      this.addLobby(lobby);

      response.code = Constants.Protocol.SUCCESS;
      response.lobbyId = lobby.id;
      this.sockets[user.id] = socket;
      // Not really necessary
      user.controller = true;
    } catch (err) {
      response.code = Constants.Protocol.FAIL;
      console.log(err);
    }
    socket.send(JSON.stringify(response));
  }

  _connectLobby(socket, data) {
    const response = {
      type: Constants.Protocol.Messages.CONNECT_LOBBY_ACK,
    };

    try {
      const user = User.fromJson(data.user);
      const lobby = this.getLobby(data.lobbyId);

      if (user.id === null) {
        user.id = Util.uuidv4();
        response.userId = user.id;
        console.log('\x1b[33m', '<Info> Provisioning new user: ' + user.id);
      }

      lobby.add(user);
      response.code = Constants.Protocol.SUCCESS;
      this.sockets[user.id] = socket;
      // Send controller state if it is active?
      if (lobby.getController().urlParams.includes('watch/')) {
        response.controller = JSON.stringify(lobby.getController());
      }
    } catch (err) {
      response.code = Constants.Protocol.FAIL;
      console.log(err);
    }
    socket.send(JSON.stringify(response));
  }

  _disconnectLobby(socket, data) {
    const response = {
      type: Constants.Protocol.Messages.DISCONNECT_LOBBY_ACK,
    };
    try {
      const user = User.fromJson(data.user);
      const lobby = this.getLobby(user.lobbyId);
      lobby.remove(user);
      // Remove the lobby from this.lobbies if empty
      if (lobby.controllerId === null && lobby.size() === 0) {
        console.log('\x1b[33m', '<Info> Deleting lobby: ' + user.lobbyId);
        delete this.lobbies[user.lobbyId];
      } else {
        // Send a control update to the new controller here?
        // Needs testing
        if (lobby.controllerId in this.sockets) {
          const controlUpdate = {
            type: Constants.Protocol.Messages.UPDATE_CONTROL,
            code: true,
          };
          this.sockets[lobby.controllerId].send(JSON.stringify(controlUpdate));
        }
      }

      response.code = Constants.Protocol.SUCCESS;
      if (user.id in this.sockets) delete this.sockets[user.id];
    } catch (err) {
      response.code = Constants.Protocol.FAIL;
      console.log(err);
    }
    socket.send(JSON.stringify(response));
  }

  _updateUrl(socket, data) {
    const response = {
      type: Constants.Protocol.Messages.UPDATE_URL_ACK,
    };
    try {
      const user = User.fromJson(data.user);
      const lobby = this.getLobby(user.lobbyId);
      if (lobby.isController(user)) {
        const updateRequest = {
          type: data.type,
          urlParams: data.urlParams,
        };
        lobby.updateUser(user);
        this._emit(lobby, updateRequest);
        response.code = Constants.Protocol.SUCCESS;
      } else {
        response.code = Constants.Protocol.FAIL;
      }
    } catch (err) {
      response.code = Constants.Protocol.FAIL;
      console.log(err);
    }
    socket.send(JSON.stringify(response));
  }

  _sync(socket, data) {
    // TODO urgent
    const response = {
      type: Constants.Protocol.Messages.SYNC_INIT_ACK,
    };
    try {
      const user = User.fromJson(data.user);
      const lobby = this.getLobby(user.lobbyId);
      user.syncState = Constants.SyncState.PENDING;
      lobby.updateUser(user);
      if (lobby.isSynced()) {
        // Emit sync_time
        const syncTime = {
          type: Constants.Protocol.Messages.SYNC_TIME,
          progressState: lobby.getController().progressState,
        };
        this._emit(lobby, syncTime);

        // Set controller sync state to synced?
        lobby.getController().syncState = Constants.SyncState.SYNCED;
      }
      response.syncState = user.syncState;
      response.code = Constants.Protocol.SUCCESS;
    } catch (err) {
      response.code = Constants.Protocol.FAIL;
      console.log(err);
    }
    socket.send(JSON.stringify(response));
  }

  _syncTimeAck(socket, data) {
    try {
      const user = User.fromJson(data.user);
      const lobby = this.getLobby(user.lobbyId);

      user.syncState = Constants.SyncState.SYNCED;
      lobby.updateUser(user);
      if (lobby.isSynced()) {
        // Emit sync_end to all
        const syncEnd = {
          type: Constants.Protocol.Messages.SYNC_END,
          syncState: user.syncState,
        };
        this._emit(lobby, syncEnd, true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  emitIfController(socket, data) {
    try {
      const user = User.fromJson(data.user);
      const lobby = this.getLobby(user.lobbyId);
      lobby.updateUser(user);
      if (lobby.isController(user)) {
        this._emit(lobby, data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  _emit(lobby, msg, sendController = false) {
    console.log('\x1b[33m', '<Info> Emitting a msg ' + msg.type + ' to ' + lobby.id);
    Object.keys(lobby.users).forEach((userId) => {
      if (userId in this.sockets) {
        if (lobby.isControllerId(userId) && !sendController) return;
        const socket = this.sockets[userId];
        socket.send(JSON.stringify(msg));
      } else {
        console.log('\x1b[33m', '<Warning> Failed to send ' + msg.type + ' to ' + userId);
      }
    });
  }

  // ==============
  // Public Methods
  // ==============

  start() {
    this.server = new WebSocket.Server({ port: PORT });
    console.log('\x1b[31m','Friendflix', '\x1b[32m', 'server successfully started on port:', PORT);
    this.server.on('connection', (socket, req) =>
      this._onConnection(socket, req)
    );
    this.server.on('close', (event) => this._onClose(event));
  }

  contains(lobbyId) {
    return lobbyId in this.lobbies;
  }

  addLobby(lobby) {
    if (!this.contains(lobby.id)) this.lobbies[lobby.id] = lobby;
  }

  getLobby(lobbyId) {
    if (this.contains(lobbyId)) return this.lobbies[lobbyId];
    else throw new Error('\x1b[31m', 'Could not find lobby in server.');
  }

  isConnected(user) {
    try {
      return (
        this.getLobby(user.lobbyId).contains(user) && user.id in this.sockets
      );
    } catch (err) {
      return false;
    }
  }
}

module.exports = new LDNServer(true);
