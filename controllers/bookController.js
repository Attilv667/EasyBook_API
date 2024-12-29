const Book = require('../models/bookModel');
const asyncHandler = require('../middlewares/asyncHandler');
const apiResponse = require('../utils/apiResponse');

// @desc    Récupère tous les livres
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = asyncHandler(async (req, res, next) => {
    const countBooks = await Book.countDocuments();
    const books = await Book.find().populate([
        { path: 'author', select: 'name -_id' },
        { path: 'gender', select: 'name -_id' }
    ]);
    apiResponse.success('Livres récupérés avec succès', {
        Quantité: countBooks,
        Livres: books, 
        }).send(res);
});

// @desc    Récupère un livre grâce à son id
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id).populate([
        { path: 'author', select: 'name -_id' },
        { path: 'gender', select: 'name -_id' }
    ]);
    apiResponse.success('Livres récupérés avec succès', book).send(res);
});

// @desc    Crée un livre
// @route   POST /api/v1/books
// @access  Public
exports.createBook = asyncHandler(async (req, res, next) => {
    const book = await Book.create(req.body);
    if (!book){
        return apiResponse.error("Impossible de créer un nouveau livre",500).send(res);
    }
    return apiResponse.success('Livre créé avec succès', book).send(res);
});

// @desc    Met à jour un livre grâce à son id
// @route   PUT /api/v1/books/:id
// @access  Public
exports.updateBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true 
    }).populate([
        { path: 'author', select: 'name -_id' },
        { path: 'gender', select: 'name -_id' }
    ]);
    if (!book){
        return apiResponse.error("Livre non trouvé",404).send(res);
    }
    return apiResponse.success('Livre mis à jour avec avec succès', book).send(res);
});

// @desc    Supprime un livre grâce à son id
// @route   DELETE /api/v1/books/:id
// @access  Public
exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book){
        return apiResponse.error("Livre non trouvé",404).send(res);
    }
    return apiResponse.success('Livre supprimé avec succès', book).send(res);
});