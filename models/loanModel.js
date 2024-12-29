const mongoose = require("mongoose");
const {format} = require("date-fns")
const loanSchema = new mongoose.Schema({
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true,
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    dateLoan:{
        type: Date,
        required: [true, "Veuillez renseigner la date d'emprunt du livre"],
        // default: Date.now
    },
    dateReturn:{
        type: Date,
        required: [true, "Veuillez renseigner la date de retour du livre "],
        validate: {
            validator: function(value) {
                return value >= this.dateLoan;
            },
            message: "La date de retour doit être postérieure à la date d'emprunt"
        }
    },
}, {timestamps: true}
);
const loanModel = mongoose.model("Loan",loanSchema)
module.exports= loanModel;