const Author = require("../models/authorModel");
const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc Récupère tous les auteurs
// @route GET api/v1/author
// @access Public
exports.getAuthors = asyncHandler(async(req,res,next) =>{
    const countAuthors = await Author.countDocuments();
    const authors = await Author.find().populate({
        path:"gender",
        select: "name-_id"
        }
    )
    apiResponse.success("Auteurs récupérés avec succès", {
        Quantité: countAuthors,
        Auteurs:authors}).send(res)
})

// @desc Récupère un auteur grâce à son id
// @route GET api/v1/author/:id 
// @access Public
exports.getAuthor = asyncHandler(async(req,res,next) =>{
    const author = await Author.findById(req.params.id).populate({
        path:"gender",
        select: "name-_id"
        }
    )
    if(!author){
        return apiResponse.error("Auteur non trouvé",404).send(res)
    }
    return apiResponse.success("Auteur récupéré avec succès", author).send(res)
})

// @desc  Crée un nouvel auteur
// @route POST api/v1/author 
// @access Public
exports.createAuthor = asyncHandler(async(req,res,next)=>{
    const author = await Author.create(req.body);
    if(!author){
        return apiResponse.error("Impossible de créer un auteur",500).send(res)
    }
    return apiResponse.success("Auteur créé avec succès", author).send(res)
})

// @desc Mettre à jour un auteur grâce à son id
// @route PUT api/v1/author/:id 
// @access Public
exports.updateAuthor = asyncHandler(async(req,res,next) =>{
    const author = await Author.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    }).populate({
        path:"gender",
        select: "name-_id"
        }
    )
    if(!author){
        return apiResponse.error("Auteur non trouvé",404).send(res)
    }
    return apiResponse.success("Auteur mis à jour avec succès", author).send(res)
})

// @desc Supprimer un auteur grâce à son id
// @route DELETE api/v1/author/:id 
// @access Public
exports.deleteAuthor = asyncHandler(async(req,res,next) =>{
    const author = await Author.findByIdAndDelete(req.params.id)
    if(!author){
        return apiResponse.error("Auteur non trouvé",404).send(res)
    }
    return apiResponse.success("Auteur supprimé avec succès", author).send(res)
})