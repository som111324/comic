const express = require('express');
const { body } = require('express-validator');
const comicController = require('../controllers/comicController');
const router = express.Router();

// Validation rules for creating and editing comics
const comicValidationRules = [
    body('bookName').notEmpty().withMessage('Book Name is required'),
    body('authorName').notEmpty().withMessage('Author name is required'),
    body('yearOfPublication').isInt({ min: 1800, max: new Date().getFullYear() }).withMessage('Year must be a valid number'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
];

// Routes for comic book management
router.post('/comics', comicValidationRules, comicController.createComic);
router.put('/comics/:id', comicValidationRules, comicController.editComic);
router.delete('/comics/:id', comicController.deleteComic);

// Routes for comic book list and details
router.get('/comics', comicController.getComics);
router.get('/comics/:id', comicController.getComicById);

module.exports = router;
