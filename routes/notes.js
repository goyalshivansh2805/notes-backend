const express = require("express");
const router = express.Router();

const notesController =  require("../controllers/handleNotes");

router.route("/")
    .get(notesController.getAllNotes)
    .post(notesController.createNote);

router.route("/:id")
    .get(notesController.getNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote);

module.exports = router;