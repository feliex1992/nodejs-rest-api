const Model = require("../Model.js");

class UserModel extends Model {
  constructor(data) {
    super();
    this.id = data.id || "-";
    this.user_id = data.user_id || "-";
    this.name = data.name || "-";
    this.level = data.level || "-";
    this.kode_toko = data.kode_toko || "-"
  }

  async getResource(uriGenerator) {
    const resource = super.getResource({
      id: this.id,
      user_id: this.user_id,
      name: this.name,
      level: this.level,
      kode_toko: this.kode_toko
    });

    // await this.addLinks(resource, uriGenerator);
    return resource;
  }

  async addLinks(resource, uriGenerator) {
    const getUsers = await uriGenerator.getURI(
      "UserController_getUsers"
    );
    if (getUsers) resource.addLink(getUsers, getUsers);
  }
}

module.exports = UserModel;