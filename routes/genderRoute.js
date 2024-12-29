const express = require("express");
const genderController = require("../controllers/genderController");
const router = express.Router();

router.route('/')
    .post(genderController.createGender)
    .get(genderController.getGenders);

router.route('/:id')
    .get(genderController.getGender)
    .put(genderController.updateGender)
    .delete(genderController.deleteGender)

module.exports = router;