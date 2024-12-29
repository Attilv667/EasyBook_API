const mongoose = require("mongoose")
const genderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Veuillez renseigner le genre"],
        unique: [true, "Ce genre existe déjà dans la base de données"],
        trim: true
    },
    description:{
        type: String
    }
},{timestamps:true})

const genderModel = mongoose.model('Gender',genderSchema)
module.exports = genderModel