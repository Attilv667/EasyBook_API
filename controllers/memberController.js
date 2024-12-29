const asyncHandler = require("../middlewares/asyncHandler");
const Member = require("../models/memberModel");
const apiResponse = require("../utils/apiResponse");

// @desc    Récuperer tous les membres
// @route   GET api/v1/members 
// @access  Public
exports.getMembers= asyncHandler(async(req,res,next) =>{
    const countMember = await Member.countDocuments()
    const member = await Member.find();
    apiResponse.success("Membres récupérés avec succès",{
        Nombre: countMember,
        Membres: member
    }
    ).send(res)
})

// @desc    Récuperer un membre grâce à son id
// @route   GET api/v1/members/:id
// @access  Public
exports.getMember= asyncHandler(async(req,res,next) =>{
    const member = await Member.findById(req.params.id);
    if(!member){
        return apiResponse.error("Membre non trouvé", 404).send(res)
    }
    return apiResponse.success("Membre récupéré avec succès",member).send(res)
})

// @desc    Créer un nouveau membre
// @route   POST api/v1/members
// @access  Public
exports.createMember= asyncHandler(async(req,res,next) =>{
    const member = await Member.create(req.body);
    if(!member){
        return apiResponse.success("Impossible de créer un nouveau membre", 500).send(res)
    }
    return apiResponse.success("Membre créé avec succès",member).send(res)
})

// @desc    Mettre à jour un membre grâce à son id
// @route   PUT api/v1/members/:id
// @access  Public
exports.updateMember= asyncHandler(async(req,res,next) =>{
    const member = await Member.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    });
    if(!member){
        return apiResponse.success("Membre non trouvé", 404).send(res)
    }
    return apiResponse.success("Membre mis à jour avec succès",member).send(res)
})

// @desc    Supprimer un membre grâce à son id
// @route   DELETE api/v1/members/:id
// @access  Public
exports.deleteMember= asyncHandler(async(req,res,next) =>{
    const member = await Member.findByIdAndDelete(req.params.id);
    if(!member){
        return apiResponse.success("Membre non trouvé", 404).send(res)
    }
    return apiResponse.success("Membre supprimé avec succès",member).send(res);
})