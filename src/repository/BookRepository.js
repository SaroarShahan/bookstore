const { BookModel } = require('../models');

class BookRepository {
  constructor() {
    if (BookRepository.instance) return BookRepository.instance;

    BookRepository.instance = this;
  }

  findAndCountAll(options = {}) {
    return BookModel.findAndCountAll(options);
  }

  findById(id) {
    return BookModel.findByPk(id);
  }

  create(data) {
    return BookModel.create(data);
  }

  async update(id, data) {
    const book = await this.findById(id);

    if (!book) {
      return null;
    }

    return book.update(data);
  }

  async delete(id) {
    const book = await this.findById(id);

    if (!book) {
      return null;
    }

    await book.destroy();

    return book;
  }
}

module.exports = BookRepository;
