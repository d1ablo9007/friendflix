const ProgressState = require('./progressState');
const Constants = require('../constants');

module.exports = class User {
  constructor(
    urlParams = '',
    progressState = new ProgressState(),
    lobbyId = null,
    id = null,
    controller = false,
    controllerState = Constants.ControllerState.INACTIVE,
    syncState = Constants.SyncState.INACTIVE
  ) {
    this.lobbyId = lobbyId;
    this.id = id;
    this.controllerState = controllerState;
    this.urlParams = urlParams;
    this.progressState = progressState;
    this.controller = controller;
    this.syncState = syncState;
  }

  static fromJson(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      return new User(
        data['urlParams'],
        ProgressState.fromJson(JSON.stringify(data['progressState'])),
        data['lobbyId'],
        data['id'],
        data['controller'],
        data['controllerState'],
        data['syncState']
      );
    } catch (err) {
      throw new Error(err);
    }
  }
};
