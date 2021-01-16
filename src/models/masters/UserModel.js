const Model = require("../Model.js");
class UserModel extends Model {
  constructor(data) {
    super();
    this.
    this.user_id = data.user_id || "-";
    this.user_name = data.user_name || "-";
    this.level = data.level || "-";
    this.password = data.password;
  }

  async getResource(uriGenerator) {
    const resource = super.getResource({
      user_id: this.user_id,
      user_name: this.user_name,
      level: this.level
    });

    return resource;
  }
}

module.exports = UserModel;