class ControllerBase {
  constructor({ params, query, headers, body, send, uriGenerator, repository }) {
    this.uriGenerator = uriGenerator;
    this.params = params;
    this.query = query;
    this.headers = headers;
    this.body = body;
    this.send = send;
    this.repository = repository;
  }

  error(err) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    this.send(statusCode, err);
  }

  success(data) {
    this.send(200, data);
  }
}

module.exports = ControllerBase;