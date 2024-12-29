const mongoose = require("mongoose");
const {format} = require("date-fns");

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Veuillez renseigner le nom du livre'],
        minLength:[3, 'Le livre doit avoir au minimum 3 caractères'],
        maxLength:[150, 'Le livre doit avoir au maximum 150']
    },
    year:{
        type:Number,
        required: [true, "Veuillez renseigner l'année de sortie du livre"],
        maxLength: [4, 'Une année a au maximum 4 caractères'],
        minLength: [4, 'Une année a au minimum 4 caractères']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: [true, "Veuillez renseigner l'auteur du livre"]
    },
    gender:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender',
        required: [true, "Veuillez renseigner le(s) genre(s) du livre"]
    }],
    quantity:{
        type: Number,
        required: [true, "Veuillez renseigner la quantité de livre"],
    }
}, {timestamps:true})

const bookModel = mongoose.model('Book',bookSchema)
module.exports = bookModel;