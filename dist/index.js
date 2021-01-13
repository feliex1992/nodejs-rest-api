/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./database/mock/db.js":
/*!*****************************!*\
  !*** ./database/mock/db.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const users = __webpack_require__(/*! ./users.js */ \"./database/mock/users.js\");\n\nmodule.exports = {\n  users\n};\n\n//# sourceURL=webpack://nodejs-rest-api/./database/mock/db.js?");

/***/ }),

/***/ "./database/mock/users.js":
/*!********************************!*\
  !*** ./database/mock/users.js ***!
  \********************************/
/***/ ((module) => {

eval("module.exports = [\n  {\n    id: 1, \n    user_id: \"jafar\", \n    name: \"jafar pahrudin\", \n    level: \"OWN\"\n  },\n  {\n    id: 2, \n    user_id: \"eri\", \n    name: \"eri samsudin\", \n    level: \"admin\"\n  },\n  {\n    id: 3, \n    user_id: \"pangsonr\", \n    name: \"septiana pangsor\", \n    level: \"admin\"\n  },\n  {\n    id: 4, \n    user_id: \"octa\", \n    name: \"octavian\", \n    level: \"admin\"\n  }\n]\n\n//# sourceURL=webpack://nodejs-rest-api/./database/mock/users.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst Logger = __webpack_require__(/*! ./services/Logger.js */ \"./src/services/Logger.js\");\nconst URIGenerator = __webpack_require__(/*! ./routes/UriGenerator.js */ \"./src/routes/UriGenerator.js\");\n\nclass App {\n  constructor(router, repository, varEnv) {\n    this.app = express();\n    this.expressRouter = express.Router();\n    this.router = router;\n    this.repository = repository;\n    this.varEnv = varEnv.getVariable();\n    this.logger = new Logger();\n\n    this._registerRoute = this._registerRoute.bind(this);    \n    this._createRouteBoundAction = this._createRouteBoundAction.bind(this);\n  }\n\n  _registerRoute(uri, httpMethod, boundAction) {\n    this.expressRouter.route(uri)[httpMethod](boundAction);\n  }\n\n  _createRouteBoundAction(controllerClass, method) {\n    const result = [\n      (req, res) => {\n        this._buildControllerInstance(controllerClass, req, res)[method]();\n      }];\n\n    return result;\n  }\n\n  _buildControllerInstance(ControllerClass, req, res) {\n    return new ControllerClass(\n        {\n          params: req.params,\n          query: req.query,\n          headers: req.headers,\n          body: req.body,\n          repository: this.repository,\n          uriGenerator: new URIGenerator(),\n          send: (statusCode, resource, location) => {\n            if (location) {\n              res.location(location);\n            }\n            res.status(statusCode).send(resource);\n          }\n        }\n    );\n  }\n\n  start() {\n    this.app.use(express.json({ limit: '30mb' }));\n    this.app.use(express.urlencoded({ limit: '30mb', extended: true }))\n    this.app.use(function(req, res, next) {\n      res.header(\"Access-Control-Allow-Origin\", \"*\");\n      res.header(\"Access-Control-Allow-Headers\", \"Origin, X-Requested-With, Content-Type, Accept, x-auth-token\");\n      next();\n    });\n\n    this.repository.registerRepositories();\n    this.router.registerRoutes(this._registerRoute, this._createRouteBoundAction);\n    this.app.use(\"/api/v1\", this.expressRouter);\n    this.app.use((req, res) => {\n      res.status(404).send({ url: `${req.originalUrl} not found`});\n    });\n\n    const { port } = this.varEnv;\n    this.app.listen(port, () => this.logger.info(`Listening on port ${port}`));\n  }\n}\n\nmodule.exports = App;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/App.js?");

/***/ }),

/***/ "./src/config/VarEnv.js":
/*!******************************!*\
  !*** ./src/config/VarEnv.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const dotEnv = __webpack_require__(/*! dotenv */ \"dotenv\");\n\nclass VarEnv {\n  constructor() {\n    dotEnv.config();\n\n    this.port = process.env.PORT_KRN;\n    if (!this.port) throw new Error(`FATAL ERROR: PORT Server is not defined.`);\n  }\n\n  getVariable() {\n    return {\n      port: this.port\n    }\n  }\n}\n\nmodule.exports = VarEnv;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/config/VarEnv.js?");

/***/ }),

/***/ "./src/controllers/ControllerBase.js":
/*!*******************************************!*\
  !*** ./src/controllers/ControllerBase.js ***!
  \*******************************************/
/***/ ((module) => {

eval("class ControllerBase {\n  constructor({ params, query, headers, body, send, uriGenerator, repository }) {\n    this.uriGenerator = uriGenerator;\n    this.params = params;\n    this.query = query;\n    this.headers = headers;\n    this.body = body;\n    this.send = send;\n    this.repository = repository;\n  }\n\n  error(err) {\n    const status = err.statusCode || err.status;\n    const statusCode = status || 500;\n    this.send(statusCode, err);\n  }\n\n  success(data) {\n    this.send(200, data);\n  }\n}\n\nmodule.exports = ControllerBase;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/controllers/ControllerBase.js?");

/***/ }),

/***/ "./src/controllers/masters/UserController.js":
/*!***************************************************!*\
  !*** ./src/controllers/masters/UserController.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ControllerBase = __webpack_require__(/*! ../ControllerBase.js */ \"./src/controllers/ControllerBase.js\");\nconst UserModel = __webpack_require__(/*! ../../models/masters/UserModel.js */ \"./src/models/masters/UserModel.js\");\n\nclass UserController extends ControllerBase {\n  async getUsers() {\n    try {\n      const users = this.repository.users.getAll();\n      const resource = await Promise.all(users.map(async (user) => {\n        const model = new UserModel(user);\n        const resource = await model.getResource(this.uriGenerator);\n        return resource;\n      }));\n\n      this.success(resource);\n    } catch(err) {\n      console.log(err);\n      this.error(err);\n    }\n  }\n\n  async getUser() {\n    const { id } = this.params;\n\n    try {\n      const user = this.repository.users.getById(id);\n      const userModel = new UserModel(user);\n      const resource = await userModel.getResource(this.uriGenerator);\n      this.success(resource);\n    } catch(err) {\n      this.error(err);\n    }\n  }\n\n  \n}\n\nmodule.exports = UserController;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/controllers/masters/UserController.js?");

/***/ }),

/***/ "./src/models/Model.js":
/*!*****************************!*\
  !*** ./src/models/Model.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const halson = __webpack_require__(/*! halson */ \"halson\");\n\nclass Model {\n  getResource(data) {\n    return halson(data);\n  }\n}\n\nmodule.exports = Model\n\n//# sourceURL=webpack://nodejs-rest-api/./src/models/Model.js?");

/***/ }),

/***/ "./src/models/masters/UserModel.js":
/*!*****************************************!*\
  !*** ./src/models/masters/UserModel.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Model = __webpack_require__(/*! ../Model.js */ \"./src/models/Model.js\");\n\nclass UserModel extends Model {\n  constructor(data) {\n    super();\n    this.id = data.id || \"-\";\n    this.user_id = data.user_id || \"-\";\n    this.name = data.name || \"-\";\n    this.level = data.level || \"-\";\n    this.kode_toko = data.kode_toko || \"-\"\n  }\n\n  async getResource(uriGenerator) {\n    const resource = super.getResource({\n      id: this.id,\n      user_id: this.user_id,\n      name: this.name,\n      level: this.level,\n      kode_toko: this.kode_toko\n    });\n\n    // await this.addLinks(resource, uriGenerator);\n    return resource;\n  }\n\n  async addLinks(resource, uriGenerator) {\n    const getUsers = await uriGenerator.getURI(\n      \"UserController_getUsers\"\n    );\n    if (getUsers) resource.addLink(getUsers, getUsers);\n  }\n}\n\nmodule.exports = UserModel;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/models/masters/UserModel.js?");

/***/ }),

/***/ "./src/repositories/Repository.js":
/*!****************************************!*\
  !*** ./src/repositories/Repository.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const UserRepository = __webpack_require__(/*! ./masters/UserRepository.js */ \"./src/repositories/masters/UserRepository.js\");\n\nclass Repository {\n  constructor(db) {\n    this._db = db;\n  }\n\n  registerRepositories() {\n    this.users = new UserRepository(this._db);\n  }\n}\n\nmodule.exports = Repository;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/repositories/Repository.js?");

/***/ }),

/***/ "./src/repositories/RepositoryBase.js":
/*!********************************************!*\
  !*** ./src/repositories/RepositoryBase.js ***!
  \********************************************/
/***/ ((module) => {

eval("class RepositoryBase {\n  getById() {\n    throw new Error('Not Implemented Exception');\n  }\n}\n\nmodule.exports = RepositoryBase;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/repositories/RepositoryBase.js?");

/***/ }),

/***/ "./src/repositories/masters/UserRepository.js":
/*!****************************************************!*\
  !*** ./src/repositories/masters/UserRepository.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const RepositoryBase = __webpack_require__(/*! ../RepositoryBase.js */ \"./src/repositories/RepositoryBase.js\");\n\nclass UserRepository extends RepositoryBase {\n  constructor(db) {\n    super();\n    this.userCollection = db.users;\n  }\n\n  getAll() {\n    return this.userCollection;\n  }\n\n  getById(id) {\n    return this.userCollection.find(user => user.id == id);\n  }\n\n  removeById(id) {\n    this.userCollection = this.userCollection.filter(user => user.id != id);\n  }\n\n  renameUser(id, newName) {\n    const user = this.getById(id);\n    if (user) user.name = newName;\n  }\n}\n\nmodule.exports = UserRepository;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/repositories/masters/UserRepository.js?");

/***/ }),

/***/ "./src/routes/Routes.js":
/*!******************************!*\
  !*** ./src/routes/Routes.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const RoutesCollection = __webpack_require__(/*! ./RoutesCollection.js */ \"./src/routes/RoutesCollection.js\");\nconst UserListRoutes = __webpack_require__(/*! ./masters/UserListRoutes.js */ \"./src/routes/masters/UserListRoutes.js\");\n\nclass Routes {\n  constructor() {\n    this.routeBuilders = [\n      new UserListRoutes()\n    ];\n  }\n\n  registerRoutes(registerRouteCallback, createRouteBoundAction) {\n    this.routeBuilders.map((builder) => {\n      const routes = builder.getRoutes();\n      routes.map((routeData) => {\n        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action, {\n          uri: routeData.uri, httpMethod: routeData.httpMethod\n        });\n        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action);\n        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);\n      })\n    })\n  }\n}\n\nmodule.exports = Routes;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/routes/Routes.js?");

/***/ }),

/***/ "./src/routes/RoutesBuilderBase.js":
/*!*****************************************!*\
  !*** ./src/routes/RoutesBuilderBase.js ***!
  \*****************************************/
/***/ ((module) => {

eval("class RoutesBuilderBase {\n  constructor(controllerClass) {\n    this.routes = [];\n    this.ControllerClass = controllerClass;\n  }\n\n  buildRoute(uri, httpMethod, action) {\n    this.routes.push({\n      controllerClass: this.ControllerClass,\n      uri,\n      httpMethod,\n      action\n    });\n  }\n}\n\nmodule.exports = RoutesBuilderBase;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/routes/RoutesBuilderBase.js?");

/***/ }),

/***/ "./src/routes/RoutesCollection.js":
/*!****************************************!*\
  !*** ./src/routes/RoutesCollection.js ***!
  \****************************************/
/***/ ((module) => {

eval("class RoutesCollection {\n  static addRouteData(controller, action, routeData) {\n    routeData.controller = controller.name;\n    routeData.action = action;\n\n    if (!RoutesCollection[controller.name]) RoutesCollection[controller.name] = {};\n\n    RoutesCollection[controller.name] = Object.assign({}, RoutesCollection[controller.name], {\n      [action]: routeData\n    });\n  }\n}\n\nmodule.exports = RoutesCollection;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/routes/RoutesCollection.js?");

/***/ }),

/***/ "./src/routes/UriGenerator.js":
/*!************************************!*\
  !*** ./src/routes/UriGenerator.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const queryString = __webpack_require__(/*! query-string */ \"query-string\");\nconst RoutesCollection = __webpack_require__(/*! ./RoutesCollection.js */ \"./src/routes/RoutesCollection.js\");\n\nclass URIGenerator {\n  getURI(controllerAction, params, id) {\n    const routeMeta = controllerAction.split(\"_\");\n    const routeData = RoutesCollection[routeMeta[0]][routeMeta[1]];\n    const uri = params ? this._bindParams(routeData.uri, params) : routeData.uri;\n    return {\n      id: id || routeData.action,\n      method: routeData.method,\n      uri,\n    };\n  }\n\n  _bindParams(uri, params) {\n    let match;\n    let replacement;\n    let uriParam = uri;\n    const replacedParams = [];\n\n    while (match = /:([\\w_]+)\\??/ig.exec(uriParam)) {\n      replacement = params[match[1]].toString() || '';\n      if (replacement === '') {\n        uriParam = uriParam.replace(`/${match[0]}`, '');\n      } else {\n        uriParam = uriParam.replace(match[0], replacement);\n        replacedParams.push(match[1]);\n      }\n    }\n\n    const paramsForQueryString = {};\n    Object.keys(params).forEach((p) => {\n      if (!replacedParams.includes(p)) {\n        paramsForQueryString[p] = params[p];\n      }\n    });\n\n    if (Object.keys(paramsForQueryString).length > 0) {\n      uriParam = `${uriParam}?${queryString.stringify(paramsForQueryString)}`;\n    }\n\n    return uriParam;\n  }\n}\n\nmodule.exports = URIGenerator;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/routes/UriGenerator.js?");

/***/ }),

/***/ "./src/routes/masters/UserListRoutes.js":
/*!**********************************************!*\
  !*** ./src/routes/masters/UserListRoutes.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const RoutesBuilderBase = __webpack_require__(/*! ../RoutesBuilderBase.js */ \"./src/routes/RoutesBuilderBase.js\");\nconst UserController = __webpack_require__(/*! ../../controllers/masters/UserController.js */ \"./src/controllers/masters/UserController.js\");\n\nclass UserListRoutes extends RoutesBuilderBase {\n  constructor() {\n    super(UserController);\n  }\n\n  getRoutes() {\n    this.buildRoute(\"/users\", \"get\", \"getUsers\");\n    this.buildRoute(\"/users/:id\", \"get\", \"getUser\");\n    return this.routes;\n  }\n}\n\nmodule.exports = UserListRoutes;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/routes/masters/UserListRoutes.js?");

/***/ }),

/***/ "./src/services/Logger.js":
/*!********************************!*\
  !*** ./src/services/Logger.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const winston = __webpack_require__(/*! winston */ \"winston\");\n\nclass Logger {\n  constructor() {\n    this.logger = winston.createLogger({\n      level: \"info\",\n      format: winston.format.json(),\n      transports: [\n        new winston.transports.File({ filename: \"log/error.log\", level: \"error\" }),\n        new winston.transports.Console({ level: \"info\", format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })\n      ],\n      exceptionHandlers: [\n        new winston.transports.File({ filename: \"log/exceptions.log\" }),\n        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })\n      ]\n    });\n  }  \n\n  info(message) {\n    this.logger.log({\n      level: \"info\",\n      message: message\n    });\n  }\n}\n\nmodule.exports = Logger;\n\n//# sourceURL=webpack://nodejs-rest-api/./src/services/Logger.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"dotenv\");;\n\n//# sourceURL=webpack://nodejs-rest-api/external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://nodejs-rest-api/external_%22express%22?");

/***/ }),

/***/ "halson":
/*!*************************!*\
  !*** external "halson" ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"halson\");;\n\n//# sourceURL=webpack://nodejs-rest-api/external_%22halson%22?");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"query-string\");;\n\n//# sourceURL=webpack://nodejs-rest-api/external_%22query-string%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"winston\");;\n\n//# sourceURL=webpack://nodejs-rest-api/external_%22winston%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
eval("const App = __webpack_require__(/*! ./App.js */ \"./src/App.js\");\nconst VarEnv = __webpack_require__(/*! ./config/VarEnv.js */ \"./src/config/VarEnv.js\");\nconst Router = __webpack_require__(/*! ./routes/Routes.js */ \"./src/routes/Routes.js\");\nconst db = __webpack_require__(/*! ../database/mock/db.js */ \"./database/mock/db.js\");\nconst Repository = __webpack_require__(/*! ./repositories/Repository.js */ \"./src/repositories/Repository.js\");\n\nclass Server {\n  constructor() {\n    this.app = new App(new Router, new Repository(db), new VarEnv);\n  }\n\n  start() {\n    this.app.start();\n  }\n}\n\nconst server = new Server();\nserver.start();\n\n//# sourceURL=webpack://nodejs-rest-api/./src/index.js?");
})();

/******/ })()
;