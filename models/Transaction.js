const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrower: { type: String, required: true },
    issueDate: { type: Date, default: Date.now },
    returnDate: { type: Date, default: null },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
