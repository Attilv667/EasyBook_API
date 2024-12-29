const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{timestamps: true});
const memberModel = mongoose.model("Member",memberSchema)
module.exports = memberModel;