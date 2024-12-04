const express = require('express');
const {
    getAvailableBooks,
    getBookById,
    addBook,
    issueBook,
    returnBook,
    deleteBook,
} = require('../controllers/bookController');

const router = express.Router();

router.get('/available', getAvailableBooks);
router.get('/:id', getBookById);
router.post('/add', addBook);
router.post('/issue/:id', issueBook);
router.post('/return/:id', returnBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;
