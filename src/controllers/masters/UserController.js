const ControllerBase = require("../ControllerBase.js");
const UserModel = require("../../models/masters/UserModel.js");

class UserController extends ControllerBase {
  async getUsers() {
    try {
      const users = this.repository.users.getAll();
      const resource = await Promise.all(users.map(async (user) => {
        const model = new UserModel(user);
        const resource = await model.getResource(this.uriGenerator);
        return resource;
      }));

      this.success(resource);
    } catch(err) {
      console.log(err);
      this.error(err);
    }
  }

  async getUser() {
    const { id } = this.params;

    try {
      const user = this.repository.users.getById(id);
      const userModel = new UserModel(user);
      const resource = await userModel.getResource(this.uriGenerator);
      this.success(resource);
    } catch(err) {
      this.error(err);
    }
  }

  
}

module.exports = UserController;