const ComicBook = require('../models/ComicBook');
const { validationResult } = require('express-validator'); // For input validation

// Utility function for sending error responses
const sendErrorResponse = (res, message, status = 500) => res.status(status).json({ error: message });

// Create a comic book
exports.createComic = async (req, res) => {
    console.log("Request Body:", req.body);

  // Input validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendErrorResponse(res, errors.array(), 400);

  try {
    const comic = new ComicBook(req.body);
    await comic.save();
    res.status(201).json(comic);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

// Edit a comic book
exports.editComic = async (req, res) => {
  // Input validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) return sendErrorResponse(res, errors.array(), 400);

  try {
    const comic = await ComicBook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!comic) return sendErrorResponse(res, 'Comic book not found', 404);
    res.json(comic);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

// Delete a comic book
exports.deleteComic = async (req, res) => {
  try {
    const comic = await ComicBook.findByIdAndDelete(req.params.id);
    if (!comic) return sendErrorResponse(res, 'Comic book not found', 404);
    res.json({ message: 'Comic book deleted' });
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

// Get comic book list with pagination, filtering, and sorting
exports.getComics = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'price', sortOrder = 'asc', author, year, priceRange } = req.query;
    const filters = {};

    // Filters for author and year
    if (author) filters.authorName = { $regex: new RegExp(author, 'i') }; // Case-insensitive match
    if (year) filters.yearOfPublication = year;
    
    // Price range filter
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-');
      filters.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Sorting logic (default to ascending, but support descending too)
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const comics = await ComicBook.find(filters)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
      
    res.json(comics);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};

// Get comic book by ID
exports.getComicById = async (req, res) => {
  try {
    const comic = await ComicBook.findById(req.params.id);
    if (!comic) return sendErrorResponse(res, 'Comic book not found', 404);
    res.json(comic);
  } catch (err) {
    sendErrorResponse(res, err.message);
  }
};
