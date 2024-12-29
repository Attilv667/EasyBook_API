const asyncHandler = require("../middlewares/asyncHandler");
const apiResponse = require("../utils/apiResponse")
const Loan = require("../models/loanModel")
const Book = require("../models/bookModel")
// @desc Récupérer tous les emprunts
// @route GET api/v1/loans
// @access Public
exports.getLoans = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.find().populate([
        { path: 'member', select: 'name -_id' },
        { path: 'book', select: 'name -_id' }
    ]);
    apiResponse.success("Emprunts récupérés avec succès", loan).send(res)
})

// @desc Récupère un emprunt grâce à son id
// @route GET api/v1/loans/:id
// @access Public
exports.getLoan = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.findById(req.params.id).populate([
        { path: 'member', select: 'name -_id' },
        { path: 'book', select: 'name -_id' }
    ]);
    if(!loan){
        return apiResponse.error("Emprunt non trouvé",404).send(res)
    }
    return apiResponse.success("Emprunt récupéré avec succès", loan).send(res)
})

// @desc Crée un nouvel emprunt
// @route POST api/v1/loans
// @access Public
exports.createLoan = asyncHandler(async(req,res,next)=>{
    const { book } = req.body;

    // Vérifiez la disponibilité du livre
    const bookRecord = await Book.findById(book);
    if (!bookRecord) {
        return apiResponse.error("Livre non trouvé", 404).send(res);
    }
    if (bookRecord.quantity <= 0) {
        return apiResponse.error("Livre non disponible", 400).send(res);
    }

    // Créez l'emprunt
    const loan = await Loan.create(req.body)
    if(!loan){
        return apiResponse.error("Impossible de créer un nouvel emprunt",500).send(res)
    }

    // Mettez à jour la quantité du livre
    bookRecord.quantity -= 1;
    await bookRecord.save();

    apiResponse.success("Emprunt créé avec succès", loan).send(res)
})

// @desc Met à jour un emprunt grâce à son id
// @route PUT api/v1/loans/:id
// @access Public
exports.updateLoan = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    }).populate([
        { path: 'member', select: 'name -_id' },
        { path: 'book', select: 'name -_id' }
    ]);
    if(!loan){
        return apiResponse.error("Emprunt non trouvé",404).send(res)
    }
    return apiResponse.success("Emprunt mis à jour avec succès", loan).send(res)
})

// @desc Supprime un emprunt grâce à son id
// @route DELETE api/v1/loans/:id
// @access Public
exports.deleteLoan = asyncHandler(async(req,res,next)=>{
    const loan = await Loan.findByIdAndDelete(req.params.id)
    if(!loan){
        return apiResponse.error("Emprunt non trouvé",404).send(res)
    }
    return apiResponse.success("Emprunt supprimé avec succès", loan).send(res)
})