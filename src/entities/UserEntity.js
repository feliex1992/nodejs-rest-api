const { EntitySchema, ObjectID } = require("typeorm");

module.exports = new EntitySchema ({
  name: "tm_user",
  tableName: "tm_users",
  columns: {
    user_id: {
      primary: true,
      type: "varchar"
    },
    user_name: {
      type: "varchar"
    },
    level: {
      type: "varchar"
    },
    password: {
      type: "varchar"
    }
  }
});