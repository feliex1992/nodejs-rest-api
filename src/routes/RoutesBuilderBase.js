class RoutesBuilderBase {
  constructor(controllerClass) {
    this.routes = [];
    this.ControllerClass = controllerClass;
  }

  buildRoute(uri, httpMethod, action) {
    this.routes.push({
      controllerClass: this.ControllerClass,
      uri,
      httpMethod,
      action
    });
  }
}

module.exports = RoutesBuilderBase;