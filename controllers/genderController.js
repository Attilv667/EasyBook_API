const apiResponse = require("../utils/apiResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const Gender = require("../models/genderModel")

// @desc Récupère tous les genres
// @route GET api/v1/gender
// @access Public
exports.getGenders = asyncHandler(async(req, res,next)=>{
    const countGenders = await Gender.countDocuments();
    const genders = await Gender.find();
    apiResponse.success(
        "Genres récupérés avec succès", {
            Quantité: countGenders,
            Genres:genders}
    ).send(res)
})

// @desc Récupère un genre grâce à son id
// @route GET api/v1/gender/:id
// @access Public
exports.getGender = asyncHandler(async(req, res,next)=>{
    const gender = await Gender.findById(req.params.id);
    if(!gender){
        return apiResponse.error("Genre non trouvé", 404).send(res)
    }
    return apiResponse.success(
        "Genre récupérés avec succès",gender
    ).send(res)
})

// @desc Crée un nouveau genre 
// @route POST api/v1/gender
// @access Public
exports.createGender = asyncHandler(async(req, res,next)=>{
    const gender = await Gender.create(req.body);
    if(!gender){
        return apiResponse.error("Impossible de créer un genre", 500).send(res)
    }
    return apiResponse.success(
        "Genre créé avec succès",gender
    ).send(res)
})

// @desc Met à jour un genre grâce à son id
// @route PUT api/v1/gender/:id
// @access Public
exports.updateGender = asyncHandler(async(req, res,next)=>{
    const gender = await Gender.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    });
    if(!gender){
        return apiResponse.error("Genre non trouvé", 404).send(res)
    }
    return apiResponse.success(
        "Genre mis à jour avec succès",gender
    ).send(res)
})

// @desc Supprimé un genre grâce à son id
// @route DELETE api/v1/gender/:id
// @access Public
exports.deleteGender = asyncHandler(async(req, res,next)=>{
    const gender = await Gender.findByIdAndDelete(req.params.id);
    if(!gender){
        return apiResponse.error("Genre non trouvé", 404).send(res)
    }
    return apiResponse.success(
        "Genre supprimé avec succès",gender
    ).send(res)
})