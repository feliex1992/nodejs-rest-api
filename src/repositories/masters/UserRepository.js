const RepositoryBase = require("../RepositoryBase.js");

class UserRepository extends RepositoryBase {
  constructor(db) {
    super();
    this.userCollection = db;
    this.db = db;
  }

  addUser(dataUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const { user_id, user_name, level, password } = dataUser;
        const userRepository = await this.db.getRepository("tm_user");
        
        userRepository.save({ user_id, user_name, level, password })
          .then((savedUser) => {
            return reject ("Simpan data user berhasil.", savedUser);
          })
          .catch((err) => {
            return reject(err);
          });
      } catch(err) {
        return reject(err);
      }
    });
  }

  getUsers() {
    return new Promise(async(resolve, reject) => {
      try {

      } catch(err) {
        return reject(err);
      }
    });
  }
}

module.exports = UserRepository;