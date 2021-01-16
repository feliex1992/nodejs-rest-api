class Security {
  authenticate() {
    return [
      (req, res, next) => {
        if (req.headers["x-auth-token"] !== "test") {
          return res.status(400).send("Un Authorization!!!");
        }

        next();
      }
    ]
  }
}

module.exports = Security;
