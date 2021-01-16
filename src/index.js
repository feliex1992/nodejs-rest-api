const App = require("./App.js");
const VarEnv = require("./config/VarEnv.js");
const Router = require("./routes/Routes.js");
const db = require("../database/mock/db.js");
const Repository = require("./repositories/Repository.js");
const Security = require("./security/Security.js");
const DataBase = require("./config/DBConfig.js");

class Server {
  constructor() {
    const dataBase = new DataBase(new VarEnv);
    dataBase.connect();

    this.security = new Security();
    this.app = new App(new Router, new Repository(dataBase), new VarEnv, this.security);
  }

  start() {
    this.app.start();
  }
}

const server = new Server();
server.start();