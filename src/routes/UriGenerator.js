const queryString = require("query-string");
const RoutesCollection = require("./RoutesCollection.js");

class URIGenerator {
  getURI(controllerAction, params, id) {
    const routeMeta = controllerAction.split("_");
    const routeData = RoutesCollection[routeMeta[0]][routeMeta[1]];
    const uri = params ? this._bindParams(routeData.uri, params) : routeData.uri;
    return {
      id: id || routeData.action,
      method: routeData.method,
      uri,
    };
  }

  _bindParams(uri, params) {
    let match;
    let replacement;
    let uriParam = uri;
    const replacedParams = [];

    while (match = /:([\w_]+)\??/ig.exec(uriParam)) {
      replacement = params[match[1]].toString() || '';
      if (replacement === '') {
        uriParam = uriParam.replace(`/${match[0]}`, '');
      } else {
        uriParam = uriParam.replace(match[0], replacement);
        replacedParams.push(match[1]);
      }
    }

    const paramsForQueryString = {};
    Object.keys(params).forEach((p) => {
      if (!replacedParams.includes(p)) {
        paramsForQueryString[p] = params[p];
      }
    });

    if (Object.keys(paramsForQueryString).length > 0) {
      uriParam = `${uriParam}?${queryString.stringify(paramsForQueryString)}`;
    }

    return uriParam;
  }
}

module.exports = URIGenerator;