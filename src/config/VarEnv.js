const dotEnv = require("dotenv");

class VarEnv {
  constructor() {
    dotEnv.config();

    this.port = process.env.PORT_KRN;
    if (!this.port) throw new Error(`FATAL ERROR: PORT Server is not defined.`);
  }

  getVariable() {
    return {
      port: this.port
    }
  }
}

module.exports = VarEnv;