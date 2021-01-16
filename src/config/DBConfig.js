const typeorm = require("typeorm");

class DataBase {
  constructor(varEnv) {    
    const { typeDb, hostDb, portDb, userDb, passDb, dbName } = varEnv.getVariable();

    this.type = typeDb;
    this.host = hostDb;
    this.port = portDb;
    this.username = userDb;
    this.password = passDb;
    this.database = dbName;
  }

  connect() {
    typeorm.createConnection({
      // type: "mongodb",
      // url: "mongodb+srv://NagatechJP:B3r4sput1h@cluster0.zlko9.mongodb.net/db_grosir_ayu?retryWrites=true&w=majority",
      // useUnifiedTopology: true,
      type: "postgres",
      url: "postgresql://kresno:kresno@localhost:5432/db_nagagold_kresno",
      synchronize: true,
      entities: [
        require("../entities/UserEntity.js")
      ]
    })
      .then((connection) => {
        this.connection = connection;
        console.log("Success to connect database");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  async getRepository(repoName) {
    return typeorm.getConnection().getRepository(repoName);
  }

  getMongoManager() {
    return typeorm.getMongoManager();
  }
}

module.exports = DataBase;