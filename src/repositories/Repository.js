const UserRepository = require("./masters/UserRepository.js");

class Repository {
  constructor(db) {
    this._db = db;
  }

  registerRepositories() {
    this.users = new UserRepository(this._db);
  }
}

module.exports = Repository;