const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, unique: true, required: true },
    status: { type: String, enum: ['available', 'issued'], default: 'available' },
    borrower: { type: String, default: null },
});

module.exports = mongoose.model('Book', BookSchema);
