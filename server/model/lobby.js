module.exports = class Lobby {
  constructor(id, controller, users = {}) {
    this.id = id;
    this.controllerId = controller.id;
    this.users = users;
    this.add(controller);
    console.log('\x1b[32m', '<Lobby> New lobby created: ' + this.id);
  }

  isSynced() {
    if (this.users.length < 1) return false;
    let syncState = this.getController().syncState;
    for (let userId in this.users) {
      if (this.users[userId].syncState !== syncState) return false;
    }
    return true;
  }

  isController(user) {
    return this.isControllerId(user.id);
  }

  isControllerId(userId) {
    return userId === this.controllerId;
  }

  getController() {
    return this.users[this.controllerId];
  }

  updateUser(user) {
    this.users[user.id] = user;
  }

  contains(user) {
    return user.id in this.users;
  }

  add(user) {
    if (!this.contains(user)) this.users[user.id] = user;
  }

  remove(user) {
    if (this.contains(user)) {
      delete this.users[user.id];
      console.log('\x1b[32m', '<Lobby: ' + this.id + '> Removed user: ' + user.id);
    }
    if (this.isController(user)) {
      // Choose a different controller - this might be too complex
      if (this.size() > 0) {
        this.controllerId = this.users[Object.keys(this.users)[0]].id;
        console.log('\x1b[32m',
          '<Lobby: ' +
            this.id +
            '> Re-assigned controller to user: ' +
            this.controllerId
        );
      } else this.controllerId = null;
    }
  }

  size() {
    return Object.keys(this.users).length;
  }

  static fromJson(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      return new Lobby(data['id'], data['controller'], data['users']);
    } catch (err) {
      console.log('\x1b[31m', '<Error> Tried to instantiate lobby with corrupt data!');
      return null;
    }
  }
};
