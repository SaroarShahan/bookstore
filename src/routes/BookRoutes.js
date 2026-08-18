const express = require('express');

const { BookController } = require('../controllers/BookController');

class BookRoutes {
  static configureRoutes() {
    const router = express.Router();
    const bookController = new BookController();

    router.route('/').get(bookController.getBooks).post(bookController.createBook);

    router
      .route('/:id')
      .get(bookController.getBookById)
      .patch(bookController.updateBook)
      .delete(bookController.deleteBook);

    return router;
  }
}

module.exports = { BookRoutes };
