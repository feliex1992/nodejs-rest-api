const App = require("./App.js");
const VarEnv = require("./config/VarEnv.js");
const Router = require("./routes/Routes.js");
const db = require("../database/mock/db.js");
const Repository = require("./repositories/Repository.js");

class Server {
  constructor() {
    this.app = new App(new Router, new Repository(db), new VarEnv);
  }

  start() {
    this.app.start();
  }
}

const server = new Server();
server.start();