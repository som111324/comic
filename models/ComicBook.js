const mongoose = require('mongoose');

const ComicBookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    authorName: { type: String, required: true },
    yearOfPublication: { type: Number, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    numberOfPages: { type: Number },
    condition: { type: String, enum: ['new', 'used'], default: 'new' },
    description: { type: String, default: '' },
});

module.exports = mongoose.model('ComicBook', ComicBookSchema);
