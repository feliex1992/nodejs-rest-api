const RoutesBuilderBase = require("../RoutesBuilderBase.js");
const UserController = require("../../controllers/masters/UserController.js");

class UserListRoutes extends RoutesBuilderBase {
  constructor() {
    super(UserController);
  }

  getRoutes() {
    this.buildRoute("/users", "post", "addUser");
    this.buildRoute("/users", "get", "getUsers", true);
    this.buildRoute("/users/:id", "get", "getUser");

    return this.routes;
  }
}

module.exports = UserListRoutes;