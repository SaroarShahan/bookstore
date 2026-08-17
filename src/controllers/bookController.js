const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' }
]

exports.getBooks = (req, res) => {
    res.json({
        success: true,
        message: 'Books retrieved successfully',
        data: books
    })
}

exports.getBookById = (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }

    res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: book
    });
}

exports.createBook = (req, res) => {
    const { title, author } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
        author
    };

    books.push(newBook);
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook
    });
}

exports.updateBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author } = req.body;
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }

    books[bookIndex] = { id: bookId, title, author };

    res.json({
        success: true,
        message: 'Book updated successfully',
        data: books[bookIndex]
    });
}

exports.deleteBook = (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook[0]
    });
}