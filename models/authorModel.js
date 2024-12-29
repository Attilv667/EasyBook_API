const mongoose = require("mongoose")
const {format} = require("date-fns")
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Veuillez renseigner le nom de l'auteur"],
        unique: [true, "Cet auteur exite déjà dans la base données"],
        trim: true
    },
    birthday:{
        type: Date,
        required: [true, "Veuillez renseigner la date d'anniversaire de l'auteur"]
    },
    nationality:{
        type: String,
        required: [true, "Veuillez renseigner la nationnalité de l'auteur"],
        trim:true
    },
    gender:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: [true, "Veuillez renseigner le(s) genre(s) d'ouvrages de l'auteur"]
    }],
    biography:{
        type: String
    }
},{timestamps:true})

const authorModel = mongoose.model('Author',authorSchema)
module.exports = authorModel;