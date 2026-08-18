const express = require('express');

const { BookRoutes } = require('./BookRoutes');

class RouteBinder {
  static bindRoutes() {
    const router = express.Router();

    router.use('/books', BookRoutes.configureRoutes());

    return router;
  }
}

module.exports = { RouteBinder };
