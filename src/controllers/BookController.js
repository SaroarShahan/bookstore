const { BookServices } = require('../services/BookServices');

const bookServices = new BookServices();

class BookController {
  async getBooks(req, res, next) {
    try {
      const data = await bookServices.getBooks(req.query);

      res.json({
        success: true,
        message: 'Books retrieved successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBookById(req, res, next) {
    try {
      const book = await bookServices.getBookById(req.params.id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found',
        });
      }

      res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async createBook(req, res, next) {
    try {
      const newBook = await bookServices.createBook(req.body);

      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBook(req, res, next) {
    try {
      const book = await bookServices.updateBook(req.params.id, req.body);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found',
        });
      }

      res.json({
        success: true,
        message: 'Book updated successfully',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const book = await bookServices.deleteBook(req.params.id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found',
        });
      }

      res.json({
        success: true,
        message: 'Book deleted successfully',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { BookController };
