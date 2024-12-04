const Book = require('../models/Book');
const Transaction = require('../models/Transaction');  

exports.getAvailableBooks = async (req, res) => {
    try {
        const books = await Book.find({ status: 'available' });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addBook = async (req, res) => {
    const { title, author, ISBN } = req.body;
    if (!title || !author || !ISBN) {
        return res.status(400).json({ error: "Title, author, ISBN fields not given...please give them" });
    }

    const existingBook = await Book.findOne({ ISBN });
    if (existingBook) {
        return res.status(400).json({ error: "Book with same ISBN no exists..so give different ISBN" });
    }

    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: "An error occurred while adding the book" });
    }
};


exports.issueBook = async (req, res) => {
    const { id } = req.params;
    const { borrower, dueDate } = req.body;

    try {
        const book = await Book.findById(id);
        if (book.status === 'issued') {
            return res.status(400).json({ error: 'Book already issued' });
        }
        book.status = 'issued';
        book.borrower = borrower;
        await book.save();

        const transaction = new Transaction({
            bookId: book._id,
            borrower: borrower,
            dueDate: dueDate,
        });
        await transaction.save();

        res.json({ book, transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.returnBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (book.status === 'available') {
            return res.status(400).json({ error: 'Book is already returned' });
        }
        book.status = 'available';
        book.borrower = null;
        await book.save();

        
        const transaction = await Transaction.findOneAndUpdate(
            { bookId: book._id, returnDate: null },  
            { returnDate: Date.now() }, 
            { new: true }
        );

        res.json({ book, transaction });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
