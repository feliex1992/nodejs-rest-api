const dotEnv = require("dotenv");

class VarEnv {
  constructor() {
    dotEnv.config();

    this.port = process.env.PORT_KRN;
    if (!this.port) throw new Error(`FATAL ERROR: PORT Server is not defined.`);

    this.typeDb = process.env.typedb_KRN;
    if (!this.typeDb) throw new Error(`FATAL ERROR: Type Database is not defined.`);

    this.hostDb = process.env.hostdb_KRN;
    if (!this.hostDb) throw new Error(`FATAL ERROR: Host Database is not defined.`);

    this.portDb = Number(process.env.portdb_KRN);
    if (!this.portDb || isNaN(this.portDb)) throw new Error(`FATAL ERROR: Port Database is not defined.`);

    this.userDb = process.env.userdb_KRN;
    if (!this.userDb) throw new Error(`FATAL ERROR: User Database is not defined.`);

    this.passDb = process.env.passdb_KRN;
    if (!this.passDb) throw new Error(`FATAL ERROR: Password Database is not defined.`);

    this.dbName = process.env.dbname_KRN;
    if (!this.dbName) throw new Error(`FATAL ERROR: Database Name is not defined.`);

  }

  getVariable() {
    return {
      port: this.port,
      typeDb: this.typeDb,
      hostDb: this.hostDb,
      portDb: this.portDb,
      userDb: this.userDb,
      passDb: this.passDb,
      dbName: this.dbName
    }
  }
}

module.exports = VarEnv;