const RoutesCollection = require("./RoutesCollection.js");
const UserListRoutes = require("./masters/UserListRoutes.js");

class Routes {
  constructor() {
    this.routeBuilders = [
      new UserListRoutes()
    ];
  }

  registerRoutes(registerRouteCallback, createRouteBoundAction) {
    this.routeBuilders.map((builder) => {
      const routes = builder.getRoutes();
      routes.map((routeData) => {
        RoutesCollection.addRouteData(routeData.controllerClass, routeData.action, {
          uri: routeData.uri, httpMethod: routeData.httpMethod
        });
        const boundAction = createRouteBoundAction(routeData.controllerClass, routeData.action, routeData.isSecure);
        registerRouteCallback(routeData.uri, routeData.httpMethod, boundAction);
      })
    })
  }
}

module.exports = Routes;