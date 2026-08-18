const { limitAndOffsetBuilder } = require('../utils');
const BookRepository = require('../repository/BookRepository');

class BookServices {
  constructor() {
    if (BookServices.instance) return BookServices.instance;

    this.bookRepository = new BookRepository();
    BookServices.instance = this;
  }

  async getBooks(query) {
    const { page } = query;
    const { limit, offset } = limitAndOffsetBuilder(query);

    const { rows, count } = await this.bookRepository.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'desc']],
    });

    return {
      totalCount: count,
      books: rows,
      page: page ? +page : 1,
      limit: limit ? +limit : count,
      totalPage: limit ? Math.ceil(count / +limit) : 1,
    };
  }

  getBookById(id) {
    return this.bookRepository.findById(id);
  }

  createBook(payload) {
    const { slug, title, description, authorId } = payload;

    return this.bookRepository.create({ slug, title, description, authorId });
  }

  updateBook(id, payload) {
    return this.bookRepository.update(id, payload);
  }

  deleteBook(id) {
    return this.bookRepository.delete(id);
  }
}

module.exports = { BookServices };
