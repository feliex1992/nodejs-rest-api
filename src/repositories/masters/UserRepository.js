const RepositoryBase = require("../RepositoryBase.js");

class UserRepository extends RepositoryBase {
  constructor(db) {
    super();
    this.userCollection = db.users;
  }

  getAll() {
    return this.userCollection;
  }

  getById(id) {
    return this.userCollection.find(user => user.id == id);
  }

  removeById(id) {
    this.userCollection = this.userCollection.filter(user => user.id != id);
  }

  renameUser(id, newName) {
    const user = this.getById(id);
    if (user) user.name = newName;
  }
}

module.exports = UserRepository;